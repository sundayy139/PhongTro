import React, { useEffect, useState } from 'react'
import * as apis from '../../services/index'
import DataTable from "react-data-table-component";
import { Helmet } from 'react-helmet'
import logo from '../../assets/image/homestay.png';
import { formatMoney, getNumberFromString, removeVietnameseTones } from '../../utils/fn';
import icons from '../../utils/icons'
import * as actions from '../../store/actions';
import { BreadCrumb, UpdateUser } from '../../components/System';
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import { BottomBar } from '../../components/Public';
import { path } from '../../utils/path';
import { Link } from 'react-router-dom';


const { BsFillPenFill, BsTrashFill } = icons

const title = 'Quản lý người dùng - Phòng trọ';

const tableCustomStyles = {
    headCells: {
        style: {
            fontSize: '11px',
            fontWeight: 'bold',
            backgroundColor: '#e0e0e0',
            justifyContent: 'space-between'
        },
    },
    cells: {
        style: {
            padding: '10px',
            width: '100%',
            justifyContent: 'space-between',
        }
    },
    rows: {
        style: {
            borderRight: '2px solid #e0e0e0',
            borderLeft: '2px solid #e0e0e0',
        }
    },
    subHeader: {
        padding: '0 !important',
    }
}

const ManageUser = () => {
    const items = [
        { title: 'Trang chủ', link: '/' },
        { title: 'Quản lý', link: '/he-thong' },
        { title: 'Quản lý người dùng' }
    ];

    const [isShow, setIsShow] = useState(false)
    const [search, setSearch] = useState('')
    const [usersFilter, setUsersFilter] = useState([])
    const [status, setStatus] = useState('')
    const dispatch = useDispatch()
    const { usersData } = useSelector(state => state.admin)
    const { flag } = useSelector(state => state.app)

    useEffect(() => {
        dispatch(actions.getUsersAdmin())
    }, [flag])

    useEffect(() => {
        const result = usersData?.filter(value => {
            return removeVietnameseTones(value.name).toLowerCase().match(search.toLowerCase())
                || String(value.phone).match(search.toLowerCase())
                || String(value.zalo).match(search.toLowerCase())
                || String(value.fbUrl).match(search.toLowerCase())
                || String(value.email).match(search.toLowerCase())
                || String(value.role).match(search.toLowerCase())
                || String(getNumberFromString(value.id)).toLowerCase().match(search.toLowerCase())

        })
        setUsersFilter(result)
        setStatus('0')
    }, [search, usersData])

    const handleDeleteUser = async (row) => {
        Swal.fire({
            title: 'Xóa người dùng này?',
            text: "Bạn sẽ không thể hoàn tác sau khi xóa!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes'
        }).then(async (result) => {
            if (result.isConfirmed) {
                const res = await apis.apiDeleteUserAdmin(row.id)
                if (res?.data?.err === 0) {
                    dispatch(actions.setFlag(!flag))
                    Swal.fire(
                        'Deleted!',
                        res?.data?.msg,
                        'success'
                    )
                }
            }
        })
    }

    useEffect(() => {
        if (+status === 1) {
            const activeUser = usersData?.filter(item => item.statusCode === 'S5')
            setUsersFilter(activeUser)
        } else if (+status === 2) {
            const activeUser = usersData?.filter(item => item.statusCode === 'S6')
            setUsersFilter(activeUser)
        } else if (+status === 0) {
            setUsersFilter(usersData)
        }
    }, [status])

    const columns = [
        {
            name: "Hành động",
            cell: (row) => (
                <div className='flex gap-4'>
                    <button
                        className='bg-blue-500 p-2 rounded-[5px]'
                        onClick={() => {
                            setIsShow(true)
                            dispatch(actions.setDataUserEdit(row))
                        }}
                    >
                        <BsFillPenFill size={15} color="white" />
                    </button>
                    <button
                        className='bg-red-500 p-2 rounded-[5px]'
                        onClick={() => handleDeleteUser(row)}
                    >
                        <BsTrashFill size={15} color="white" />
                    </button>
                </div>
            ),
            minWidth: '150px',
        },
        {
            name: "Mã người dùng",
            selector: (row) => `#${getNumberFromString(row.id)}`,

        },
        {
            name: "Ảnh đại diện",
            selector: (row) => <img className="w-[50px] h-[50px] rounded-[5px] object-contain" src={row.avatar} />,
            sortable: true,
        },
        {
            name: "Tên",
            selector: (row) => row.name,
            sortable: true,
            minWidth: '200px',
        },
        {
            name: "Số tiền đã nạp",
            selector: (row) => row.paymentData.totalAmount === null ? 0 : formatMoney(row.paymentData.totalAmount + ''),
            sortable: true,
        },
        {
            name: "Số điện thoại",
            selector: (row) => <div className='cursor-pointer text-blue-400 hover:underline'><a href={`tel:${row.phone}`}>{row.phone}</a></div>,
            sortable: true,
        },
        {
            name: "Zalo",
            selector: (row) => <div className='cursor-pointer text-blue-400 hover:underline' onClick={() => window.open(`https://zalo.me/${row.zalo}`)} >{row.zalo}</div>,
            sortable: true,
        },
        {
            name: "Email",
            selector: (row) => <div className='cursor-pointer text-blue-400 hover:underline'><a href={`mailTo:${row.email}`}>{row.email}</a></div>,
            sortable: true,
            minWidth: '250px',
        },
        {
            name: "Facebook",
            selector: (row) => <div className='cursor-pointer text-blue-400 hover:underline' onClick={() => window.open(row.fbUrl)} >{row.fbUrl}</div>,
            sortable: true,
            minWidth: '250px',
        },
        {
            name: "Role",
            selector: (row) => row.role === 'admin'
                ? <div className=' text-[10px] text-red-600'>
                    Quản trị viên
                </div>
                : row.role === 'user'
                    ? <div className='text-[10px]'>
                        Người dùng
                    </div>
                    : '',
        },
        {
            name: "Trạng thái",
            selector: (row) => row.statusCode === 'S6'
                ? <div className='bg-red-500 text-[10px] text-white p-2 text-center rounded-md font-medium min-w-[100px]'>
                    Ngừng hoạt động
                </div>
                : row.statusCode === 'S5'
                    ? <div className='bg-green-500 text-[10px] text-white p-2 text-center  rounded-md font-medium min-w-[100px]'>
                        Đang hoạt động
                    </div>
                    : '',
            minWidth: '150px'
        },
    ]

    return (
        <div className='pc:px-8 pc:py-4 laptop:px-8 laptop:py-4 phone:px-2 phone:py-4 phone:relative tablet:px-2 tablet:py-4 tablet:relative'>
            <BottomBar />
            <Helmet>
                <title>{title}</title>
                <link rel="icon" href={logo} />
            </Helmet>
            <BreadCrumb
                items={items}
            />
            <h1 className='font-[600] pc:text-[35px] laptop:text-[35px] phone:text-[25px] tablet:text-[25px] py-4 border-b border-gray-200'>Quản lý người dùng</h1>
            <div className='py-6 bg-white rounded-[5px] phone:mb-10 tablet:mb-10'>
                {
                    usersFilter && (
                        <DataTable
                            columns={columns}
                            data={usersFilter}
                            customStyles={tableCustomStyles}
                            defaultSortFieldId
                            pagination={5}
                            highlightOnHover
                            // selectableRows
                            // onSelectedRowsChange={(rows) => handleSelectedRowsChange(rows)}
                            selectableRowsHighlight
                            subHeader
                            subHeaderComponent={
                                <div className='w-full flex pc:items-center pc:justify-between laptop:items-center laptop:justify-between mb-4 phone:flex-col gap-2'>
                                    <input
                                        type='text'
                                        className='outline-none border border-gray-300 p-2 rounded-[5px] text-sm min-w-[300px]'
                                        placeholder="Tìm kiếm"
                                        value={search}
                                        onChange={(e) => setSearch(e.target.value)}
                                    />
                                    <select
                                        className='outline-none border border-gray-300 p-2 rounded-[5px] text-xs'
                                        onChange={(e) => setStatus(e.target.value)}
                                        value={status}
                                    >
                                        <option
                                            value='0'
                                        >
                                            Lọc theo trạng thái
                                        </option>
                                        <option
                                            value='1'
                                        >
                                            Đang hoạt động
                                        </option>
                                        <option
                                            value='2'
                                        >
                                            Ngừng hoạt động
                                        </option>
                                    </select>
                                </div>
                            }
                            actions={
                                <Link
                                    to={`/he-thong/${path.STATISTICS_USER}`}
                                    className='text-sm py-2 px-4 bg-blue-400 rounded-[5px] text-white hover:bg-orange flex items-center gap-1'
                                >
                                    Thống kê
                                </Link>
                            }
                        />
                    )
                }
            </div>
            {
                isShow && (
                    <UpdateUser
                        setIsShow={setIsShow}
                    />
                )
            }
        </div>
    )
}

export default ManageUser
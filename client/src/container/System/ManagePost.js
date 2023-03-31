import React, { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet'
import { useDispatch, useSelector } from 'react-redux'
import { getNumberFromString, removeVietnameseTones } from '../../utils/fn';
import * as actions from '../../store/actions';
import DataTable from "react-data-table-component";
import moment from 'moment';
import icons from '../../utils/icons'
import { BreadCrumb, UpdatePost } from '../../components/System/index';
import * as apis from '../../services/index';
import logo from '../../assets/image/homestay.png';
import Swal from 'sweetalert2';
import { CSVLink } from 'react-csv'
import { BottomBar } from '../../components/Public';

const { BsFillPenFill, BsTrashFill, TiTick } = icons

const title = 'Quản lý tin - Phòng trọ';

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

const ManagePost = () => {

    const items = [
        { title: 'Trang chủ', link: '/' },
        { title: 'Quản lý', link: '/he-thong' },
        { title: 'Quản lý tin đăng' }
    ];

    const dispatch = useDispatch()
    const [search, setSearch] = useState('')
    const [isShow, setIsShow] = useState(false)
    const [postsFilter, setPostsFilter] = useState([])
    const [status, setStatus] = useState('')
    // const [postIdArr, setPostIdArr] = useState([])
    const { postsUser } = useSelector(state => state.post)
    const { flag } = useSelector(state => state.app)

    useEffect(() => {
        dispatch(actions.getPostsUser())
    }, [flag])

    useEffect(() => {
        setPostsFilter(postsUser)
    }, [postsUser])

    useEffect(() => {
        const result = postsUser.filter(value => {
            return removeVietnameseTones(value.title).toLowerCase().match(search.toLowerCase())
                || String(value.priceNumber * Math.pow(10, 6)).toLowerCase().match(search.toLowerCase())
                || String(moment(moment.utc(value.expiredAt)).local().format('dd DD/MM/YYYY')).match(search.toLowerCase())
                || String(moment(moment.utc(value.createdAt)).local().format('dd DD/MM/YYYY')).match(search.toLowerCase())
                || String(getNumberFromString(value.id)).toLowerCase().match(search.toLowerCase())
        })
        setPostsFilter(result)
        setStatus('0')
    }, [search])

    useEffect(() => {
        if (+status === 1) {
            const activePosts = postsUser?.filter(item => moment(moment.utc(item.expiredAt)).local().unix() > moment(new Date).unix())
            setPostsFilter(activePosts)
        } else if (+status === 2) {
            const expiredPost = postsUser?.filter(item => moment(moment.utc(item.expiredAt)).local().unix() < moment(new Date).unix())
            setPostsFilter(expiredPost)
        }
        else if (+status === 3) {
            const expiredPost = postsUser?.filter(item => item.statusCode === 'S4')
            setPostsFilter(expiredPost)
        }
        else if (+status === 0) {
            setPostsFilter(postsUser)
        }
    }, [status])

    const compareDateTime = (row) => {
        let today = moment(new Date).unix()
        let expiredDay = moment(moment.utc(row.expiredAt)).local().unix()

        if (today > expiredDay) {
            return (
                <div className='bg-red-500 text-[10px] text-white p-2 rounded-md font-medium min-w-[85px] text-center'>
                    Đã hết hạn
                </div>
            )
        } else {
            return (
                <div className='bg-green-500 text-[10px] text-white p-2 rounded-md font-medium min-w-[85px] text-center'>
                    Đang hiển thị
                </div>
            )
        }
    }

    const handleUpdateStatusPost = async (row) => {
        Swal.fire({
            title: 'Cập nhật trạng thái?',
            text: "Xác nhận bài đăng này là đã được thuê!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes'
        }).then(async (result) => {
            if (result.isConfirmed) {
                const res = await apis.apiUpdateStatusPost(row.id)
                if (res?.data?.err === 0) {
                    dispatch(actions.setFlag(!flag))
                    Swal.fire(
                        'Updated!',
                        res?.data?.msg,
                        'success'
                    )
                }
            }
        })
    }

    const columns = [
        {
            name: "Hành động",
            cell: (row) => (
                <div className='flex gap-4 justify-end'>
                    <button
                        className='bg-blue-500 p-2 rounded-[5px]'
                        title='Sửa bài đăng'
                        onClick={() => {
                            setIsShow(true)
                            dispatch(actions.setDataEdit(row))
                        }}
                    >
                        <BsFillPenFill size={15} color="white" />
                    </button>
                    <button
                        title='Xóa bài đăng'
                        className='bg-red-500 p-2 rounded-[5px]'
                        onClick={() => handleDeletePost(row)}
                    >
                        <BsTrashFill size={15} color="white" />
                    </button>
                    {
                        row.statusCode === 'S2' && (
                            <button
                                className='bg-green-500 p-2 rounded-[5px]'
                                title='Xác nhận đã được thuê'
                                onClick={() => handleUpdateStatusPost(row)}
                            >
                                <TiTick size={15} color="white" />
                            </button>
                        )
                    }
                </div>
            ),
            minWidth: '150px',
        },
        {
            name: "Mã tin",
            selector: (row) => `#${getNumberFromString(row.id)}`,

        },
        {
            name: "Ảnh đại diện",
            selector: (row) => <img className="w-[50px] h-[50px] rounded-[5px] object-contain" src={JSON.parse(row.imagesData.images)[0]} />,
            sortable: true,
        },
        {
            name: "Tiêu đề",
            selector: (row) => row.title,
            sortable: true,
            minWidth: '300px',
            style: {
                textTransform: 'uppercase',
            }
        },
        {
            name: "Giá",
            selector: (row) => row.priceNumber < 1 ? `${String(row.priceNumber * Math.pow(10, 6)).replace(/(.)(?=(\d{3})+$)/g, '$1.')} đồng/tháng` : `${row.priceNumber} triệu/tháng`,
            sortable: true,
        },
        {
            name: "Ngày bắt đầu",
            selector: (row) => moment(moment.utc(row.createdAt)).local().format('dd DD/MM/YYYY'),
            sortable: true,
        },
        {
            name: "Ngày hết hạn",
            selector: (row) => moment(moment.utc(row.expiredAt)).local().format('dd DD/MM/YYYY'),
            sortable: true,
        },
        {
            name: "Trạng thái thời gian",
            selector: (row) => compareDateTime(row),
        },
        {
            name: "Trạng thái tin đăng",
            selector: (row) => row.statusCode === 'S1'
                ? <div className='bg-yellow-500 text-[10px] text-white p-2 rounded-md font-medium min-w-[85px] text-center '>
                    Chờ duyệt
                </div>
                : row.statusCode === 'S2'
                    ? <div className='bg-green-500 text-[10px] text-white p-2 rounded-md font-medium min-w-[85px] text-center '>
                        Chưa cho thuê
                    </div>
                    : row.statusCode === 'S4'
                        ? <div className='bg-red-500 text-[10px] text-white p-2 rounded-md font-medium min-w-[85px] text-center '>
                            Đã cho thuê
                        </div>
                        : ''
            ,
            minWidth: '150px',
        },
    ]

    // const handleSelectedRowsChange = (rows) => {
    //     let arrSeleted = []
    //     rows?.selectedRows?.forEach(item => {
    //         arrSeleted.push(item.id)
    //     })
    //     setPostIdArr(arrSeleted)
    // }

    const handleDeletePost = async (row) => {
        Swal.fire({
            title: 'Xóa bài đăng này?',
            text: "Bạn sẽ không thể hoàn tác sau khi xóa!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes'
        }).then(async (result) => {
            if (result.isConfirmed) {
                const res = await apis.apiDeletePost(row.id)
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
            <h1 className='font-[600] pc:text-[35px] laptop:text-[35px] phone:text-[25px] tablet:text-[25px] py-4 border-b border-gray-200'>Quản lý tin đăng</h1>
            <div className='py-6 bg-white rounded-[5px] phone:mb-10 tablet:mb-10'>
                {
                    postsFilter && (
                        <DataTable
                            columns={columns}
                            data={postsFilter}
                            customStyles={tableCustomStyles}
                            defaultSortFieldId
                            pagination={5}
                            highlightOnHover
                            // actions={
                            //     <CSVLink
                            //         className='rounded-[5px] bg-blue-500 text-white text-sm py-1 px-2'
                            //         data={postsUser}
                            //     >
                            //         Export
                            //     </CSVLink>
                            // }
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
                                            Đang hiển thị
                                        </option>
                                        <option
                                            value='2'
                                        >
                                            Hết hạn
                                        </option>
                                        <option
                                            value='3'
                                        >
                                            Đã được thuê
                                        </option>
                                    </select>
                                </div>
                            }
                        />
                    )
                }
            </div>
            {
                isShow && (
                    <UpdatePost
                        setIsShow={setIsShow}
                    />
                )
            }
        </div>
    )
}

export default ManagePost
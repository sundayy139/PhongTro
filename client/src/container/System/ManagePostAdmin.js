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

const { BsFillPenFill, BsTrashFill, TiTick, TiTimes } = icons

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


const ManagePostAdmin = () => {

    const items = [
        { title: 'Trang chủ', link: '/' },
        { title: 'Quản lý', link: '/he-thong' },
        { title: 'Quản lý tất cả bài đăng' }
    ];

    const dispatch = useDispatch()
    const [search, setSearch] = useState('')
    const [isShow, setIsShow] = useState(false)
    const [postsFilter, setPostsFilter] = useState([])
    const [status, setStatus] = useState('')
    const { allPostsUser } = useSelector(state => state.admin)
    const { flag } = useSelector(state => state.app)

    useEffect(() => {
        dispatch(actions.getPostsAdmin())
    }, [flag])

    useEffect(() => {
        setPostsFilter(allPostsUser)
    }, [allPostsUser])

    useEffect(() => {
        const result = allPostsUser?.filter(value => {
            return removeVietnameseTones(value.title).toLowerCase().match(search.toLowerCase())
                || String(value.priceNumber * Math.pow(10, 6)).toLowerCase().match(search.toLowerCase())
                || String(moment(moment.utc(value.expiredAt)).local().format('dd DD/MM/YYYY')).match(search.toLowerCase())
                || String(moment(moment.utc(value.createdAt)).local().format('dd DD/MM/YYYY')).match(search.toLowerCase())
                || String(getNumberFromString(value.id)).toLowerCase().match(search.toLowerCase())
                || String(value.categoryCode).toLowerCase().match(search.toLowerCase())
        })
        setPostsFilter(result)
        setStatus('0')
    }, [search])

    useEffect(() => {
        if (+status === 1) {
            const activePosts = allPostsUser?.filter(item => moment(moment.utc(item.expiredAt)).local().unix() > moment(new Date).unix())
            setPostsFilter(activePosts)
        } else if (+status === 2) {
            const expiredPost = allPostsUser?.filter(item => moment(moment.utc(item.expiredAt)).local().unix() < moment(new Date).unix())
            setPostsFilter(expiredPost)
        } else if (+status === 0) {
            setPostsFilter(allPostsUser)
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

    const handleApprovePost = async (row) => {
        Swal.fire({
            title: 'Duyệt bài đăng này?',
            text: "Xác nhận duyệt bài đăng này lên trang chủ?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes'
        }).then(async (result) => {
            if (result.isConfirmed) {
                const res = await apis.apiApprovePost(row.id)
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

    const handleRefusePost = async (row) => {
        Swal.fire({
            title: 'Từ chối duyệt bài đăng này?',
            text: "Xác nhận từ chối duyệt bài đăng này lên trang chủ?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes'
        }).then(async (result) => {
            if (result.isConfirmed) {
                const res = await apis.apiApprovePost(row.id)
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
                <div className='flex gap-4 items-start'>
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
                        row.statusCode === 'S1' && (
                            <>
                                <button
                                    className='bg-green-500 p-2 rounded-[5px]'
                                    title='Duyệt bài đăng'
                                    onClick={() => handleApprovePost(row)}
                                >
                                    <TiTick size={15} color="white" />
                                </button>
                                <button
                                    className='bg-yellow-500 p-2 rounded-[5px]'
                                    title='Từ chối'
                                    onClick={() => handleRefusePost(row)}
                                >
                                    <TiTimes size={15} color="white" />
                                </button>
                            </>
                        )
                    }
                </div>
            ),
            minWidth: '200px',
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
            minWidth: '250px',
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
            name: "Chuyên mục",
            selector: (row) => row.categoryCode,
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
                    : row.statusCode === 'S6'
                        ? <div className='bg-red-500 text-[10px] text-white p-2 rounded-md font-medium min-w-[85px] text-center '>
                            Đã cho thuê
                        </div>
                        : ''
            ,
        },
    ]

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
        <div className='px-8 py-4'>
            <Helmet>
                <title>{title}</title>
                <link rel="icon" href={logo} />
            </Helmet>
            <BreadCrumb
                items={items}
            />
            <h1 className='font-[500] text-[35px] border-b border-gray-200 py-4'>Quản lý tin đăng</h1>
            <div className='py-6'>
                {
                    postsFilter && (
                        <DataTable
                            columns={columns}
                            data={postsFilter}
                            customStyles={tableCustomStyles}
                            defaultSortFieldId
                            pagination={5}
                            highlightOnHover
                            // selectableRows
                            // onSelectedRowsChange={(rows) => handleSelectedRowsChange(rows)}
                            selectableRowsHighlight
                            subHeader
                            subHeaderComponent={
                                <div className='w-full flex items-center justify-between mb-4'>
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

export default ManagePostAdmin
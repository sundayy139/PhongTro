import React, { useEffect, useState } from 'react'
import logo from '../../assets/image/homestay.png';
import { Helmet } from 'react-helmet'
import { BreadCrumb, UpdateBlog } from '../../components/System';
import DataTable from 'react-data-table-component';
import { Link } from 'react-router-dom';
import { path } from '../../utils/path';
import { BsPlusCircle } from 'react-icons/bs';
import { useDispatch, useSelector } from 'react-redux';
import * as actions from '../../store/actions'
import icons from '../../utils/icons'
import moment from 'moment';
import { removeVietnameseTones } from '../../utils/fn';
import * as apis from '../../services/index'
import Swal from 'sweetalert2';
import { BottomBar } from '../../components/Public';

const title = 'Quản lý blog - Phòng trọ';
const { BsFillPenFill, BsTrashFill } = icons

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

const ManageBlog = () => {
    const items = [
        { title: 'Trang chủ', link: '/' },
        { title: 'Quản lý', link: '/he-thong' },
        { title: 'Quản lý blog' }
    ];

    const dispatch = useDispatch()
    const { blogs } = useSelector(state => state.blog)
    const { flag } = useSelector(state => state.app)
    const [isShow, setIsShow] = useState(false)
    const [blogFilter, setBlogFilter] = useState([])
    const [search, setSearch] = useState('')

    useEffect(() => {
        dispatch(actions.getBlogs())
    }, [flag])

    useEffect(() => {
        const result = blogs?.filter(value => {
            return removeVietnameseTones(value.title).toLowerCase().match(search.toLowerCase())
                || String(moment(moment.utc(value.updatedAt)).local().format('dd DD/MM/YYYY')).match(search.toLowerCase())
                || String(moment(moment.utc(value.createdAt)).local().format('dd DD/MM/YYYY')).match(search.toLowerCase())
                || removeVietnameseTones(value.descMarkdown).toLowerCase().match(search.toLowerCase())
        })
        setBlogFilter(result)
    }, [search, blogs])


    const handleDeleteBlog = (row) => {
        Swal.fire({
            title: 'Xóa blog này?',
            text: "Bạn sẽ không thể hoàn tác sau khi xóa!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes'
        }).then(async (result) => {
            if (result.isConfirmed) {
                const res = await apis.apiDeleteBlogAdmin(row.id)
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

    const columns = [
        {
            name: "Hành động",
            cell: (row) => (
                <div className='flex gap-4'>
                    <button
                        className='bg-blue-500 p-2 rounded-[5px]'
                        onClick={() => {
                            setIsShow(true)
                            dispatch(actions.setDataBlogEdit(row))
                        }}
                    >
                        <BsFillPenFill size={15} color="white" />
                    </button>
                    <button
                        className='bg-red-500 p-2 rounded-[5px]'
                        onClick={() => handleDeleteBlog(row)}
                    >
                        <BsTrashFill size={15} color="white" />
                    </button>
                </div>
            ),
            minWidth: '150px',
        },
        {
            name: "Tiêu đề",
            selector: (row) => row.title,
            sortable: true,
            style: {
                fontWeight: '600'
            },
            minWidth: '300px'
        },
        {
            name: "Ảnh hiển thị",
            selector: (row) => <img className="w-[50px] h-[50px] rounded-[5px] object-contain" src={row.image} />,
        },
        {
            name: "Ngày tạo",
            selector: (row) => moment(moment.utc(row.createdAt)).local().format('dd DD/MM/YYYY'),
            sortable: true,
        },
        {
            name: "Ngày cập nhật",
            selector: (row) => moment(moment.utc(row.updatedAt)).local().format('dd DD/MM/YYYY'),
            sortable: true,
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
            <h1 className='font-[600] pc:text-[35px] laptop:text-[35px] phone:text-[25px] tablet:text-[25px] py-4 border-b border-gray-200'>
                Quản lý blog
            </h1>
            <div className='py-6 bg-white rounded-[5px] phone:mb-10 tablet:mb-10'>
                <DataTable
                    columns={columns}
                    data={blogFilter}
                    customStyles={tableCustomStyles}
                    defaultSortFieldId
                    pagination={5}
                    highlightOnHover
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
                        </div>
                    }
                    actions={
                        <Link
                            to={`/he-thong/${path.CREATE_BLOG}`}
                            className='text-sm py-2 px-4 bg-blue-400 rounded-[5px] text-white hover:bg-orange flex items-center gap-1'
                        >
                            <BsPlusCircle size={15} />
                            Tạo mới
                        </Link>
                    }
                />
                {
                    isShow && (
                        <UpdateBlog
                            setIsShow={setIsShow}
                        />
                    )
                }
            </div>
        </div>
    )
}

export default ManageBlog
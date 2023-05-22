import React, { useEffect, useState } from 'react'
import logo from '../../assets/image/homestay.png';
import { Helmet } from 'react-helmet'
import { BreadCrumb, UpdateBlog } from '../../components/System';
import DataTable from 'react-data-table-component';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import * as actions from '../../store/actions'
import icons from '../../utils/icons'
import moment from 'moment';
import { getNumberFromString, removeVietnameseTones } from '../../utils/fn';
import * as apis from '../../services/index'
import Swal from 'sweetalert2';
import { BottomBar } from '../../components/Public';

const title = 'Quản lý blog - Phòng trọ';
const { BsTrashFill, TiTick, TiTimes } = icons

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

const ManageReport = () => {
    const items = [
        { title: 'Trang chủ', link: '/' },
        { title: 'Quản lý', link: '/he-thong' },
        { title: 'Quản lý báo cáo' }
    ];

    const dispatch = useDispatch()
    const { flag } = useSelector(state => state.app)
    const [report, setReport] = useState()
    const [isShow, setIsShow] = useState(false)
    const [reportFillter, setReportFillter] = useState([])
    const [search, setSearch] = useState('')

    useEffect(() => {
        const fetchReport = async () => {
            const res = await apis.apiGetAllReport()
            if (res?.data?.err === 0) {
                setReport(res?.data?.reports)
            }
        }

        fetchReport()
    }, [flag])

    useEffect(() => {
        const result = report?.filter(value => {
            return removeVietnameseTones(value.content).toLowerCase().match(search.toLowerCase())
                || String(moment(moment.utc(value.updatedAt)).local().format('dd DD/MM/YYYY')).match(search.toLowerCase())
                || String(moment(moment.utc(value.createdAt)).local().format('dd DD/MM/YYYY')).match(search.toLowerCase())
        })
        setReportFillter(result)
    }, [search, report])


    const handleDeleteReport = (row) => {
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
                const res = await apis.apiDeleteReportAdmin({ reportId: row.id })
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

    const handleConfirmSucessReport = async (row) => {
        Swal.fire({
            title: 'Xác nhận đã xử lý report này ?',
            text: "Bạn sẽ không thể hoàn tác sau khi xác nhận!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes'
        }).then(async (result) => {
            if (result.isConfirmed) {
                const res = await apis.apiUpdateStatusReport({ reportId: row.id, status: 'S11' })
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

    const handleConfirmReport = async (row) => {
        Swal.fire({
            title: 'Xác nhận không xử lý report này ?',
            text: "Bạn sẽ không thể hoàn tác sau khi xác nhận!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes'
        }).then(async (result) => {
            if (result.isConfirmed) {
                const res = await apis.apiUpdateStatusReport({ reportId: row.id, status: 'S12' })
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
                <div className='flex gap-4'>
                    {
                        row.statusCode === 'S10' && (
                            <>
                                <button
                                    className='bg-green-500 p-2 rounded-[5px]'
                                    onClick={() => handleConfirmSucessReport(row)}
                                    title="Đã xử lý"
                                >
                                    <TiTick size={15} color="white" />
                                </button>
                                <button
                                    className='bg-blue-500 p-2 rounded-[5px]'
                                    onClick={() => handleConfirmReport(row)}
                                    title="Không xử lý"
                                >
                                    <TiTimes size={15} color="white" />
                                </button>
                            </>

                        )
                    }
                    <button
                        className='bg-red-500 p-2 rounded-[5px]'
                        onClick={() => handleDeleteReport(row)}
                        title="Xóa báo cáo"
                    >
                        <BsTrashFill size={15} color="white" />
                    </button>
                </div>
            ),
            minWidth: '150px',
        },
        {
            name: "Mã báo cáo",
            selector: (row) => `#${getNumberFromString(row.id)}`,
        },
        {
            name: "Mã tin",
            selector: (row) => <Link to={`/chi-tiet/${row.postId}`} className='cursor-pointer hover:underline text-blue-500' target='_blank'>
                {`#${getNumberFromString(row.postId)}`}
            </Link>
        },
        {
            name: "Mã người báo cáo",
            selector: (row) => `#${getNumberFromString(row.userId)}`,
            sortable: true,
        },
        {
            name: "Nội dung",
            selector: (row) => row.content,
            sortable: true,
            minWidth: '300px'
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
        {
            name: "Trạng thái",
            selector: (row) => row.statusCode === 'S10'
                ? <div className='bg-red-500 text-[10px] text-white p-2 text-center rounded-md font-medium min-w-[100px]'>
                    Chưa xử lý
                </div>
                : row.statusCode === 'S11'
                    ? <div className='bg-green-500 text-[10px] text-white p-2 text-center  rounded-md font-medium min-w-[100px]'>
                        Đã xử lý
                    </div>
                    : <div className='bg-blue-500 text-[10px] text-white p-2 text-center  rounded-md font-medium min-w-[100px]'>
                        Không xử lý
                    </div>,
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
            <h1 className='font-[600] pc:text-[35px] laptop:text-[35px] phone:text-[25px] tablet:text-[25px] py-4 border-b border-gray-200'>
                Quản lý báo cáo
            </h1>
            <div className='py-6 bg-white rounded-[5px] phone:mb-10 tablet:mb-10'>
                <DataTable
                    columns={columns}
                    data={reportFillter}
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

export default ManageReport
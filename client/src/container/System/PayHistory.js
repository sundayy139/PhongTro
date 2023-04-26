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
import moment from 'moment';


const { BsFillPenFill, BsTrashFill } = icons

const title = 'Lịch sử nạp tiền - Phòng trọ';

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

const PayHistory = () => {
    const items = [
        { title: 'Trang chủ', link: '/' },
        { title: 'Quản lý', link: '/he-thong' },
        { title: 'Lịch sử nạp tiền' }
    ];

    const [isShow, setIsShow] = useState(false)
    const [search, setSearch] = useState('')
    const [payHistoryFilter, setPayHistoryFilter] = useState([])
    const [status, setStatus] = useState('')
    const [dataHistory, setDataHistory] = useState()
    const dispatch = useDispatch()

    useEffect(() => {
        const result = dataHistory?.filter(value => {
            return removeVietnameseTones(value.paymentInfo).toLowerCase().match(search.toLowerCase())
                || String(value.id).match(search.toLowerCase())
                || String(moment(moment.utc(value.createdAt)).local().format('dd DD/MM/YYYY')).match(search.toLowerCase())
                || String(value.amount).match(search.toLowerCase())
        })
        setPayHistoryFilter(result)
        setStatus('0')
    }, [search, dataHistory])


    useEffect(() => {
        if (+status === 1) {
            const activeUser = dataHistory?.filter(item => item.statusCode === 'S8')
            setPayHistoryFilter(activeUser)
        } else if (+status === 2) {
            const activeUser = dataHistory?.filter(item => item.statusCode !== 'S8')
            setPayHistoryFilter(activeUser)
        } else if (+status === 0) {
            setPayHistoryFilter(dataHistory)
        }
    }, [status, dataHistory])

    const columns = [
        {
            name: "Ngày nạp",
            selector: (row) => moment(moment.utc(row.createdAt)).local().format('HH:SS DD/MM/YYYY'),
            sortable: true,
        },
        {
            name: "Mã giao dịch",
            selector: (row) => row.id,
            sortable: true,
        },
        {
            name: "Số tiền",
            selector: (row) => formatMoney(row.amount + ''),
            sortable: true,
        },
        {
            name: "Nội dung",
            selector: (row) => row.paymentInfo,
        },
        {
            name: "Trạng thái",
            selector: (row) => row.statusCode === 'S8'
                ? <div className='bg-green-500 text-[10px] text-white p-2 text-center  rounded-md font-medium min-w-[100px]'>
                    Thành công
                </div>
                : <div className='bg-red-500 text-[10px] text-white p-2 text-center rounded-md font-medium min-w-[100px]'>
                    Thất bại
                </div>,
            minWidth: '150px'
        },
    ]

    useEffect(() => {
        const fetchHistoryPay = async () => {
            const res = await apis.apiGetPaymentHistory()
            if (res?.data?.err === 0) {
                setDataHistory(res.data.history)
            }
        }

        fetchHistoryPay()
    }, [])


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
            <h1 className='font-[600] pc:text-[35px] laptop:text-[35px] phone:text-[25px] tablet:text-[25px] py-4 border-b border-gray-200'>Lịch sử nạp tiền</h1>
            <div className='py-6 bg-white rounded-[5px] phone:mb-10 tablet:mb-10'>
                {
                    payHistoryFilter && (
                        <DataTable
                            columns={columns}
                            data={payHistoryFilter}
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
                                            Thành công
                                        </option>
                                        <option
                                            value='2'
                                        >
                                            Thất bại
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
                    <UpdateUser
                        setIsShow={setIsShow}
                    />
                )
            }
        </div>
    )
}

export default PayHistory
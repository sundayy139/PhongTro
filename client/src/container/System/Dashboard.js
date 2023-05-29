import React, { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet'
import { BarChart, BreadCrumb, DoughnutChart, LineChart } from '../../components/System';
import { useDispatch, useSelector } from 'react-redux';
import { formatMoney, getNumberFromString } from '../../utils/fn';
import * as apis from '../../services/index'
import logo from '../../assets/image/homestay.png';
import * as actions from '../../store/actions'
import DataTable from "react-data-table-component";
import { BottomBar } from '../../components/Public';
import notepad from '../../assets/icon/notepad.png';
import user from '../../assets/icon/user.png';
import tick from '../../assets/icon/verified.png';
import money from '../../assets/icon/money.png';
import icons from '../../utils/icons'

const { BsArrowUp, BsArrowDown } = icons


const title = 'Tổng quan - Phòng trọ';

const tableCustomStyles = {
    headCells: {
        style: {
            fontSize: '11px',
            fontWeight: 'bold',
            backgroundColor: '#fafafa',
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
    subHeader: {
        padding: '0 !important',
    }
}

const Dashboard = () => {

    const items = [
        { title: 'Trang chủ', link: '/' },
        { title: 'Quản lý', link: '/he-thong' },
        { title: 'Tổng quan' }
    ];
    const dispatch = useDispatch()
    const [totalPayment, setTotalPayment] = useState()
    const [count, setCount] = useState('')
    const [label, setLabel] = useState('')
    const [count1, setCount1] = useState('')
    const [label1, setLabel1] = useState('')
    const [count2, setCount2] = useState('')
    const [postCurrentMonth, setPostCurrentMonth] = useState(null)
    const [postLastMonth, setPostLastMonth] = useState(null)
    const [userCurrentMonth, setUserCurrentMonth] = useState(null)
    const [userLastMonth, setUserLastMonth] = useState(null)
    const [postSuccessCurrentMonth, setPostSuccessCurrentMonth] = useState(null)
    const [postSuccessLastMonth, setPostSuccessLastMonth] = useState(null)
    const [totalPostSuccess, setTotalPostSuccess] = useState(null)
    const [paymentCurrentMonth, setPaymentCurrentMonth] = useState(null)
    const [paymentLastMonth, setPaymentLastMonth] = useState(null)
    const [chartData, setChartData] = useState([]);
    const [chartData1, setChartData1] = useState([]);
    const { allPostsUser, usersData } = useSelector(state => state.admin)
    const { categories, flag } = useSelector(state => state.app)

    useEffect(() => {
        dispatch(actions.getPostsAdmin())
        dispatch(actions.getUsersAdmin())
    }, [flag])

    useEffect(() => {
        const fetchDataNewPost = async () => {
            const res = await apis.apiGetCountPostByMonth()
            if (res?.data?.err === 0) {
                const data = res?.data.postCounts
                const count = data.map(obj => obj.count)
                const month = data.map(obj => obj.month)
                setCount1(count)
                setLabel1(month)
            };
        }

        const fetchDataNewUser = async () => {
            const res = await apis.apiGetCountUserByMonth()
            if (res?.data?.err === 0) {
                const data = res?.data.userCounts
                const count = data.map(obj => obj.count)
                setCount2(count)
            };
        }

        fetchDataNewPost()
        fetchDataNewUser()
    }, [])

    useEffect(() => {
        const chartData = {
            labels: label1,
            datasets: [
                {
                    label: 'Bài đăng mới',
                    data: count1,
                    fill: false,
                    borderColor: '#36a2eb',
                    backgroundColor: '#9ad0f5',
                    tension: 0.1,
                    pointStyle: 'rectRot',
                    pointRadius: 5,
                },
                {
                    label: 'Người dùng mới',
                    data: count2,
                    fill: false,
                    borderColor: '#ff6384',
                    backgroundColor: '#ffb1c1',
                    tension: 0.1,
                    pointStyle: 'rectRot',
                    pointRadius: 5,
                },
            ],
        };
        setChartData1(chartData)
    }, [count1, count2])

    useEffect(() => {
        const format = () => {
            const result = categories?.reduce((acc, curr) => {
                const filtered = allPostsUser?.filter(item => item.categoryCode === curr.code);
                const count = filtered?.length;
                acc[curr.value] = count;
                return acc;
            }, {});
            const category = Object.keys(result)
            const count = Object.values(result)

            setLabel(category)
            setCount(count)
        }

        format()
    }, [allPostsUser, categories])

    useEffect(() => {
        const chartData = {
            labels: label,
            datasets: [{
                label: 'Số lượng',
                data: count,
                backgroundColor: ['#FF6384', '#FF9F40', '#FFCD56', '#4BC0C0', '#36A2EB'],
                hoverBackgroundColor: ['#FF6384', '#FF9F40', '#FFCD56', '#4BC0C0', '#36A2EB'],
                borderColor: 'rgba(255,255,255)',
                borderWidth: 2,
            }]
        };
        setChartData(chartData)
    }, [count])

    useEffect(() => {
        const fetchPaymentSuccess = async () => {
            const res = await apis.apiGetTotalPayment()
            if (res?.data?.err === 0) {
                setTotalPayment(res.data.payments)
            }
        }

        const fetchPaymentCurentMonth = async () => {
            const res = await apis.apiGetPaymentByMonth({ year: new Date().getFullYear(), month: new Date().getMonth() + 1 })
            if (res?.data?.err === 0) {
                setPaymentCurrentMonth(res.data.payments != 0 ? res.data.payments : 1)
            }
        }

        const fetchPaymentLastMonth = async () => {
            const res = await apis.apiGetPaymentByMonth({ year: new Date().getFullYear(), month: new Date().getMonth() })
            if (res?.data?.err === 0) {
                setPaymentLastMonth(res.data.payments != 0 ? res.data.payments : 1)
            }
        }


        fetchPaymentCurentMonth()
        fetchPaymentLastMonth()
        fetchPaymentSuccess()
    }, [])

    console.log(totalPayment)

    const columns = [
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
        },
        {
            name: "Số điện thoại",
            selector: (row) => row.phone,
            sortable: true,
        },
        {
            name: "Zalo",
            selector: (row) => row.zalo,
            sortable: true,
        },
        {
            name: "Email",
            selector: (row) => row.email,
            sortable: true,
        },
        {
            name: "Trạng thái",
            selector: (row) => row.statusCode === 'S6'
                ? <div className='bg-red-500 text-[10px] text-white p-2 text-center rounded-md font-medium min-w-[100px]'>
                    Ngừng hoạt động
                </div>
                : row.statusCode === 'S5'
                    ? <div className='bg-green-500 text-[10px] text-white p-2 text-center rounded-md font-medium min-w-[100px]'>
                        Đang hoạt động
                    </div>
                    : '',
            minWidth: '150px'
        },
    ]

    useEffect(() => {
        const fetchDataPostCurrentMonth = async () => {
            const res = await apis.apiGetPostByMonth({ year: new Date().getFullYear(), month: new Date().getMonth() + 1 })
            if (res?.data?.err === 0) {
                setPostCurrentMonth(res?.data?.posts?.length > 0 ? res?.data?.posts?.length : res?.data?.posts?.length + 1)
            };
        }

        const fetchDataPostLastMonth = async () => {
            const res = await apis.apiGetPostByMonth({ year: new Date().getFullYear(), month: new Date().getMonth() })
            if (res?.data?.err === 0) {
                setPostLastMonth(res?.data?.posts?.length > 0 ? res?.data?.posts?.length : res?.data?.posts?.length + 1)
            };
        }

        fetchDataPostCurrentMonth()
        fetchDataPostLastMonth()

    }, [])

    useEffect(() => {
        const fetchDataUserCurrentMonth = async () => {
            const res = await apis.apiGetUserByMonth({ year: new Date().getFullYear(), month: new Date().getMonth() + 1 })
            if (res?.data?.err === 0) {
                setUserCurrentMonth(res?.data?.users?.length > 0 ? res?.data?.users?.length : res?.data?.users?.length + 1)
            };
        }

        const fetchDataUserLastMonth = async () => {
            const res = await apis.apiGetUserByMonth({ year: new Date().getFullYear(), month: new Date().getMonth() })
            if (res?.data?.err === 0) {
                setUserLastMonth(res?.data?.users?.length > 0 ? res?.data?.users?.length : res?.data?.users?.length + 1)
            };
        }

        fetchDataUserCurrentMonth()
        fetchDataUserLastMonth()

    }, [])

    useEffect(() => {
        if (allPostsUser) {
            const result = allPostsUser.filter(item => item.statusCode === 'S4')
            setTotalPostSuccess(result)
        }
    }, [allPostsUser])

    useEffect(() => {
        const fetchDataPostSuccessCurrentMonth = async () => {
            const res = await apis.apiGetPostByMonth({ status: 'S4', year: new Date().getFullYear(), month: new Date().getMonth() + 1 })
            if (res?.data?.err === 0) {
                setPostSuccessCurrentMonth(res?.data?.posts?.length > 0 ? res?.data?.posts?.length : res?.data?.posts?.length + 1)
            };
        }

        const fetchDataPostSuccessLastMonth = async () => {
            const res = await apis.apiGetPostByMonth({ status: 'S4', year: new Date().getFullYear(), month: new Date().getMonth() })
            if (res?.data?.err === 0) {
                setPostSuccessLastMonth(res?.data?.posts?.length > 0 ? res?.data?.posts?.length : res?.data?.posts?.length + 1)
            };
        }

        fetchDataPostSuccessCurrentMonth()
        fetchDataPostSuccessLastMonth()

    }, [])

    return (
        <div className='pc:px-8 pc:py-4 laptop:px-8 laptop:py-4 phone:px-2 phone:py-4 phone:mb-10 w-full phone:relative tablet:px-2 tablet:py-4 tablet:mb-10 tablet:relative'>
            <BottomBar />
            <Helmet>
                <title>{title}</title>
                <link rel="icon" href={logo} />
            </Helmet>
            <BreadCrumb
                items={items}
            />
            <h1 className='font-[600] pc:text-[35px] laptop:text-[35px] phone:text-[25px] tablet:text-[25px] py-4 border-b border-gray-200'>Tổng quan</h1>
            <div className='pc:py-5 pc:gap-6 laptop:gap-6 laptop:py-5 w-full phone:gap-4 phone:py-4 phone:flex-col tablet:gap-4 tablet:py-4 tablet:flex-col flex bg-white rounded-[5px] phone:px-2 tablet:px-2'>
                <div className='flex pc:w-1/2 h-auto pc:flex-none pc:flex-col laptop:w-1/2 laptop:flex-none laptop:flex-col gap-5 justify-between phone:flex-wrap'>
                    <div className='flex w-full h-[48%] items-center justify-between'>
                        <div className='bg-primary w-[48%] h-full py-5 px-4 rounded-[5px] flex flex-col gap-5 justify-between'>
                            <div className='flex justify-between items-center'>
                                <h3 className='text-sm'>Tổng người dùng</h3>
                                <img src={user} className='w-6 h-6 object-contain' />
                            </div>
                            <i className='text-2xl text-center'>
                                {usersData?.length}
                            </i>
                            <div className='flex items-center justify-between text-xs'>
                                {
                                    userCurrentMonth && userLastMonth && userCurrentMonth > userLastMonth
                                        ? (
                                            <i className='flex items-center gap-[2px] text-green-500'>
                                                {Math.round(userCurrentMonth / userLastMonth) * 100}%
                                                <BsArrowUp />
                                            </i>
                                        ) : (
                                            <i className='flex items-center gap-[2px] text-red-500'>
                                                {Math.round(userLastMonth / userCurrentMonth) * 100}%
                                                <BsArrowDown />
                                            </i>
                                        )
                                }
                                <span>So với tháng trước</span>
                            </div>
                        </div>
                        <div className='bg-primary w-[48%] h-full py-5 px-4 rounded-[5px] flex flex-col gap-5 justify-between'>
                            <div className='flex justify-between items-center'>
                                <h3 className='text-sm'>Tổng thu nhập</h3>
                                <img src={money} className='w-6 h-6 object-contain' />
                            </div>
                            <i className='text-2xl text-center'>
                                {`${formatMoney(totalPayment + '')} VNĐ`}
                            </i>
                            <div className='flex items-center justify-between text-xs'>
                                {
                                    paymentCurrentMonth && paymentLastMonth && paymentCurrentMonth > paymentLastMonth
                                        ? (
                                            <i className='flex items-center gap-[2px] text-green-500'>
                                                {Math.round(paymentCurrentMonth / paymentLastMonth) * 100}%
                                                <BsArrowUp />
                                            </i>
                                        ) : (
                                            <i className='flex items-center gap-[2px] text-red-500'>
                                                {Math.round(paymentLastMonth / paymentCurrentMonth) * 100}%
                                                <BsArrowDown />
                                            </i>
                                        )
                                }
                                <span>So với tháng trước</span>
                            </div>
                        </div>
                    </div>
                    <div className='flex w-full h-[48%] items-center justify-between'>
                        <div className='bg-primary w-[48%] h-full py-5 px-4 rounded-[5px] flex flex-col gap-5 justify-between'>
                            <div className='flex justify-between items-center'>
                                <h3 className='text-sm'>Tổng tin đăng</h3>
                                <img src={notepad} className='w-6 h-6 object-contain' />
                            </div>
                            <i className='text-2xl text-center'>
                                {allPostsUser?.length}
                            </i>
                            <div className='flex items-center justify-between text-xs'>
                                {
                                    postCurrentMonth && postLastMonth && postCurrentMonth > postLastMonth
                                        ? (
                                            <i className='flex items-center gap-[2px] text-green-500'>
                                                {Math.round(postCurrentMonth / postLastMonth) * 100}%
                                                <BsArrowUp />
                                            </i>
                                        ) : (
                                            <i className='flex items-center gap-[2px] text-red-500'>
                                                {Math.round(postLastMonth / postCurrentMonth) * 100}%
                                                <BsArrowDown />
                                            </i>
                                        )
                                }
                                <span>So với tháng trước</span>
                            </div>
                        </div>
                        <div className='bg-primary w-[48%] h-full py-5 px-4 rounded-[5px] flex flex-col gap-5 justify-between'>
                            <div className='flex justify-between items-center'>
                                <h3 className='text-sm'>Tổng tin hoàn thành</h3>
                                <img src={tick} className='w-6 h-6 object-contain' />
                            </div>
                            <i className='text-2xl text-center'>
                                {totalPostSuccess?.length}
                            </i>
                            <div className='flex items-center justify-between text-xs'>
                                {
                                    postSuccessCurrentMonth && postSuccessLastMonth && postSuccessCurrentMonth > postSuccessLastMonth
                                        ? (
                                            <i className='flex items-center gap-[2px] text-green-500'>
                                                {Math.round(postSuccessCurrentMonth / postSuccessLastMonth) * 100}%
                                                <BsArrowUp />
                                            </i>
                                        ) : (
                                            <i className='flex items-center gap-[2px] text-red-500'>
                                                {Math.round(postSuccessLastMonth / postSuccessCurrentMonth) * 100}%
                                                <BsArrowDown />
                                            </i>
                                        )
                                }
                                <span>So với tháng trước</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='flex-auto h-auto bg-primary  rounded-[5px] px-4 py-5'>
                    {
                        Object.entries(chartData1)?.length > 0 && (
                            <BarChart
                                text='Biểu đồ số người dùng và bài đăng mới theo tháng'
                                data={chartData1}
                            />
                        )
                    }
                </div>
            </div>
            <div className='pc:py-5 pc:gap-6 laptop:gap-6 laptop:py-5 w-full phone:gap-4 phone:py-4 phone:flex-col tablet:gap-4 tablet:py-4 tablet:flex-col flex bg-white rounded-[5px] phone:px-2 tablet:px-2 overflow-hidden'>
                <div className='pc:w-1/2 laptop:w-1/2 flex-none h-auto bg-primary rounded-[5px]  pc:px-4 pc:py-5 laptop:px-4 laptop:py-5'>
                    {
                        usersData && (
                            <DataTable
                                columns={columns}
                                data={usersData}
                                customStyles={tableCustomStyles}
                                defaultSortFieldId
                                pagination={true}
                                paginationPerPage={5}
                                highlightOnHover
                                selectableRowsHighlight
                            />
                        )
                    }
                </div>
                <div className='flex-auto h-auto bg-primary rounded-[5px] pc:px-4 pc:py-5 laptop:px-4 laptop:py-5'>
                    {
                        Object.entries(chartData)?.length > 0 && (
                            <DoughnutChart
                                text='Biểu đồ phân tích tin đăng theo danh mục'
                                data={chartData}
                            />
                        )
                    }
                </div>
            </div>
        </div>
    )
}

export default Dashboard
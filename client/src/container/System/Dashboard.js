import React, { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet'
import { Link } from 'react-router-dom';
import { BreadCrumb, Button, DoughnutChart, InputDisable, InputForm, LineChart, Loading } from '../../components/System';
import avatar from '../../assets/image/avatar-person.png'
import { useDispatch, useSelector } from 'react-redux';
import { getNumberFromString, validate } from '../../utils/fn';
import * as apis from '../../services/index'
import Swal from 'sweetalert2';
import logo from '../../assets/image/homestay.png';
import * as actions from '../../store/actions'
import { path } from '../../utils/path';
import icons from '../../utils/icons'
import DataTable from "react-data-table-component";

const { FaUserCircle } = icons

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
    const [count, setCount] = useState('')
    const [label, setLabel] = useState('')
    const [count1, setCount1] = useState('')
    const [label1, setLabel1] = useState('')
    const [count2, setCount2] = useState('')
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
            const res = await apis.apiGetPostByMonth()
            if (res?.data?.err === 0) {
                const data = res?.data.postCounts
                const count = data.map(obj => obj.count)
                const month = data.map(obj => obj.month)
                setCount1(count)
                setLabel1(month)
            };
        }

        const fetchDataNewUser = async () => {
            const res = await apis.apiGetUserByMonth()
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
                    label: 'người dùng mới',
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
            selector: (row) => row.status === 'S5'
                ? <div className='bg-red-500 text-[10px] text-white p-2 rounded-md font-medium min-w-[100px]'>
                    Ngừng hoạt động
                </div>
                : row.status === 'S4'
                    ? <div className='bg-green-500 text-[10px] text-white p-2 rounded-md font-medium min-w-[100px]'>
                        Đang hoạt động
                    </div>
                    : '',
            minWidth: '150px'
        },
    ]

    return (
        <div className='px-8 py-4 w-full'>
            <Helmet>
                <title>{title}</title>
                <link rel="icon" href={logo} />
            </Helmet>
            <BreadCrumb
                items={items}
            />
            <h1 className='font-[500] text-[35px] border-b border-gray-200 py-4'>Tổng quan</h1>
            <div className='w-full flex gap-6 py-10'>
                <div className='flex w-1/3 flex-none flex-col gap-5 justify-between'>
                    <div className='bg-primary py-5 px-4 rounded-[5px] flex flex-col gap-5'>
                        <div className='flex justify-between items-center'>
                            <h3 className='text-sm'>Tổng người dùng</h3>
                            <FaUserCircle size={25} color='#cca752' />
                        </div>
                        <i className='text-2xl text-center'>
                            {usersData?.length}
                        </i>
                        <div className='flex items-center justify-between text-sm'>
                            <i>14%</i>
                            <span>So với tháng trước</span>
                        </div>
                    </div>
                    <div className='bg-primary py-5 px-4 rounded-[5px] flex flex-col gap-5'>
                        <div className='flex justify-between items-center'>
                            <h3 className='text-sm'>Tổng tin đăng</h3>
                            <FaUserCircle size={25} color='#cca752' />
                        </div>
                        <i className='text-2xl text-center'>
                            {allPostsUser?.length}
                        </i>
                        <div className='flex items-center justify-between text-sm'>
                            <i>14%</i>
                            <span>So với tháng trước</span>
                        </div>
                    </div>
                    <div className='bg-primary py-5 px-4 rounded-[5px] flex flex-col gap-5'>
                        <div className='flex justify-between items-center'>
                            <h3 className='text-sm'>Tổng người dùng</h3>
                            <FaUserCircle size={25} color='#cca752' />
                        </div>
                        <i className='text-2xl text-center'>123</i>
                        <div className='flex items-center justify-between text-sm'>
                            <i>14%</i>
                            <span>So với tháng trước</span>
                        </div>
                    </div>
                </div>
                <div className='flex-auto h-auto bg-primary rounded-[5px] px-4 py-5'>
                    {
                        Object.entries(chartData1)?.length > 0 && (
                            <LineChart
                                text='Biểu đồ số người dùng và bài đăng mới theo tháng'
                                data={chartData1}
                            />
                        )
                    }
                </div>
            </div>
            <div className=' w-full flex gap-5 '>
                <div className='w-2/3 bg-primary rounded-[5px] px-4 py-5'>
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
                <div className='w-1/3 flex-none bg-primary rounded-[5px] px-4 py-5'>
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
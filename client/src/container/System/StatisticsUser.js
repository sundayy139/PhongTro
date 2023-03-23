import React, { useEffect, useState } from 'react'
import * as apis from '../../services/index'
import { Helmet } from 'react-helmet'
import logo from '../../assets/image/homestay.png';
import { BreadCrumb, LineChart } from '../../components/System';
import { BottomBar } from '../../components/Public';


const title = 'Thống kê người dùng - Phòng trọ';

const StatisticsUser = () => {
    const items = [
        { title: 'Trang chủ', link: '/' },
        { title: 'Quản lý', link: '/he-thong' },
        { title: 'Thống kê người dùng' }
    ];

    const [count1, setCount1] = useState('')
    const [label1, setLabel1] = useState('')
    const [count2, setCount2] = useState('')
    const [count3, setCount3] = useState('')
    const [label2, setLabel2] = useState('')
    const [count4, setCount4] = useState('')
    const [chartData1, setChartData1] = useState([]);
    const [chartData2, setChartData2] = useState([]);
    const [startDate, setStartDate] = useState('')
    const [endDate, setEndDate] = useState('')

    useEffect(() => {
        const fetchDataNewUser = async () => {
            const res = await apis.apiGetUserByMonth()
            if (res?.data?.err === 0) {
                const data = res?.data.userCounts
                const month = data.map(obj => obj.month)
                const count = data.map(obj => obj.count)
                setCount1(count)
                setLabel1(month)
            };
        }
        const fetchDataUserBlocked = async () => {
            const res = await apis.apiGetUserByMonth({ status: 'S5' })
            if (res?.data?.err === 0) {
                const data = res?.data.userCounts
                const count = data.map(obj => obj.count)
                setCount2(count)
            };
        }

        fetchDataNewUser();
        fetchDataUserBlocked();

    }, []);

    useEffect(() => {
        const chartData = {
            labels: label1,
            datasets: [
                {
                    label: 'Người dùng đăng kí mới',
                    data: count1,
                    fill: false,
                    borderColor: '#36a2eb',
                    backgroundColor: '#9ad0f5',
                    tension: 0.1,
                    pointStyle: 'rectRot',
                    pointRadius: 5,
                },
                {
                    label: 'Người dùng bị khóa',
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
        const fetchDataNewUser = async () => {
            const res = await apis.apiGetUserByDay({ startDate: startDate, endDate: endDate })
            if (res?.data?.err === 0) {
                const data = res?.data.userCounts
                const date = data.map(obj => obj.date)
                const count = data.map(obj => obj.count)
                setLabel2(date)
                setCount3(count)
            };
        }
        const fetchDataUserBlocked = async () => {
            const res = await apis.apiGetUserByDay({ status: 'S5', startDate: startDate, endDate: endDate })
            if (res?.data?.err === 0) {
                const data = res?.data.userCounts
                const count = data.map(obj => obj.count)
                setCount4(count)
            };
        }

        fetchDataNewUser();
        fetchDataUserBlocked();

    }, [startDate, endDate]);

    useEffect(() => {
        const chartData = {
            labels: label2,
            datasets: [
                {
                    label: 'Người dùng đăng kí mới',
                    data: count3,
                    fill: false,
                    borderColor: '#36a2eb',
                    backgroundColor: '#9ad0f5',
                    tension: 0.1,
                    pointStyle: 'rectRot',
                    pointRadius: 5,
                },
                {
                    label: 'Người dùng bị khóa',
                    data: count4,
                    fill: false,
                    borderColor: '#ff6384',
                    backgroundColor: '#ffb1c1',
                    tension: 0.1,
                    pointStyle: 'rectRot',
                    pointRadius: 5,
                },
            ],
        };
        setChartData2(chartData)
    }, [count3, count4])

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
            <h1 className='font-[600] pc:text-[35px] laptop:text-[35px] phone:text-[25px] tablet:text-[25px] py-4 border-b border-gray-200'>Thống kê người dùng</h1>
            <div className='pc:gap-10 pc:py-10 laptop:gap-10 laptop:py-10 phone:w-full phone:mb-10 tablet:mb-10 phone:gap-8 phone:py-4 tablet:w-full tablet:gap-8 tablet:py-4 flex flex-col bg-white rounded-[5px] phone:px-2 tablet:px-2'>
                <div className='w-full border p-5 bg-primary rounded-[5px]'>
                    {
                        Object.entries(chartData1)?.length > 0 && (
                            <LineChart
                                data={chartData1}
                            />
                        )
                    }
                </div>
                <div className='w-full border p-5 bg-primary rounded-[5px]'>
                    <div className='w-full mb-10 flex pc:justify-end laptop:justify-end phone:flex-col tablet:flex-col gap-4'>
                        <div className='flex flex-col gap-2'>
                            <label className='text-sm font-semibold'>
                                Ngày bắt đầu
                            </label>
                            <input
                                className='outline-none border border-gray-300 rounded-[5px] px-2 py-1'
                                type='date'
                                onChange={(e) => setStartDate(e.target.value)}
                            />
                        </div>
                        <div className='flex flex-col gap-2'>
                            <label className='text-sm font-semibold'>
                                Ngày kết thúc
                            </label>
                            <input
                                className='outline-none border  border-gray-300 rounded-[5px] px-2 py-1'
                                type='date'
                                onChange={(e) => setEndDate(e.target.value)}
                            />
                        </div>
                    </div>
                    {
                        Object.entries(chartData2)?.length > 0 && (
                            <LineChart
                                data={chartData2}
                            />
                        )
                    }
                </div>
            </div>
        </div>
    )
}

export default StatisticsUser
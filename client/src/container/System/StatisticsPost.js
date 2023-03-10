import React, { useEffect, useState } from 'react'
import * as apis from '../../services/index'
import { Helmet } from 'react-helmet'
import logo from '../../assets/image/homestay.png';
import { BreadCrumb, LineChart } from '../../components/System';
import { useSelector } from 'react-redux';



const title = 'Thống kê tin đăng - Phòng trọ';

const StatisticsPost = () => {
    const items = [
        { title: 'Trang chủ', link: '/' },
        { title: 'Quản lý', link: '/he-thong' },
        { title: 'Thống kê tin đăng' }
    ];

    const [count1, setCount1] = useState('')
    const [label1, setLabel1] = useState('')
    const [count2, setCount2] = useState('')
    const [count3, setCount3] = useState('')
    const [count4, setCount4] = useState('')
    const [count5, setCount5] = useState('')
    const [label2, setLabel2] = useState('')
    const [count6, setCount6] = useState('')
    const [count7, setCount7] = useState('')
    const [count8, setCount8] = useState('')
    const [count9, setCount9] = useState('')
    const [count10, setCount10] = useState('')
    const [chartData1, setChartData1] = useState([]);
    const [chartData2, setChartData2] = useState([]);
    const [selected1, setSelected1] = useState('')
    const [selected2, setSelected2] = useState('')
    const { categories } = useSelector(state => state.app)
    const [startDate, setStartDate] = useState('')
    const [endDate, setEndDate] = useState('')

    useEffect(() => {
        const fetchDataNewPost = async () => {
            const res = await apis.apiGetPostByMonth({ categoryCode: selected1 })
            if (res?.data?.err === 0) {
                const data = res?.data.postCounts
                const count = data.map(obj => obj.count)
                const month = data.map(obj => obj.month)
                setCount1(count)
                setLabel1(month)
            };
        }
        const fetchDataPostApprove = async () => {
            const res = await apis.apiGetPostByMonth({ status: 'S2', categoryCode: selected1 })
            if (res?.data?.err === 0) {
                const data = res?.data.postCounts
                const count = data.map(obj => obj.count)
                setCount2(count)
            };
        }

        const fetchDataPostRefuse = async () => {
            const res = await apis.apiGetPostByMonth({ status: 'S3', categoryCode: selected1 })
            if (res?.data?.err === 0) {
                const data = res?.data.postCounts
                const count = data.map(obj => obj.count)
                setCount3(count)
            };
        }

        const fetchDataPostPending = async () => {
            const res = await apis.apiGetPostByMonth({ status: 'S1', categoryCode: selected1 })
            if (res?.data?.err === 0) {
                const data = res?.data.postCounts
                const count = data.map(obj => obj.count)
                setCount4(count)
            };
        }

        const fetchDataPostSuccess = async () => {
            const res = await apis.apiGetPostByMonth({ status: 'S6', categoryCode: selected1 })
            if (res?.data?.err === 0) {
                const data = res?.data.postCounts
                const count = data.map(obj => obj.count)
                setCount5(count)
            };
        }

        fetchDataNewPost();
        fetchDataPostApprove();
        fetchDataPostRefuse();
        fetchDataPostPending();
        fetchDataPostSuccess();

    }, [selected1]);

    useEffect(() => {
        const chartData = {
            labels: label1,
            datasets: [
                {
                    label: 'Tất cả bài đăng',
                    data: count1,
                    fill: false,
                    borderColor: '#36a2eb',
                    backgroundColor: '#9ad0f5',
                    tension: 0.1,
                    pointStyle: 'rectRot',
                    pointRadius: 5,
                },
                {
                    label: 'Bài đăng được duyệt',
                    data: count2,
                    fill: false,
                    borderColor: '#4bc0c0',
                    backgroundColor: '#a5dfdf',
                    tension: 0.1,
                    pointStyle: 'rectRot',
                    pointRadius: 5,
                },
                {
                    label: 'Bài đăng bị từ chối',
                    data: count3,
                    fill: false,
                    borderColor: '#ff6384',
                    backgroundColor: '#ffb1c1',
                    tension: 0.1,
                    pointStyle: 'rectRot',
                    pointRadius: 5,
                },
                {
                    label: 'Bài đăng đợi duyệt',
                    data: count4,
                    fill: false,
                    borderColor: '#ffcd56',
                    backgroundColor: '#ffe6aa',
                    tension: 0.1,
                    pointStyle: 'rectRot',
                    pointRadius: 5,
                },
                {
                    label: 'Bài đăng đã được thuê',
                    data: count5,
                    fill: false,
                    borderColor: '#ff9f40',
                    backgroundColor: '#ffcf9f',
                    tension: 0.1,
                    pointStyle: 'rectRot',
                    pointRadius: 5,
                },
            ],
        };
        setChartData1(chartData)
    }, [count1, count2, count3, count4, count5])

    useEffect(() => {
        const fetchDataNewPost = async () => {
            const res = await apis.apiGetPostByDay({ categoryCode: selected2, startDate: startDate, endDate: endDate })
            if (res?.data?.err === 0) {
                const data = res?.data.postCounts
                const count = data.map(obj => obj.count)
                const date = data.map(obj => obj.date)
                setLabel2(date)
                setCount6(count)
            };
        }
        const fetchDataPostApprove = async () => {
            const res = await apis.apiGetPostByDay({ status: 'S2', categoryCode: selected2, startDate: startDate, endDate: endDate })
            if (res?.data?.err === 0) {
                const data = res?.data.postCounts
                const count = data.map(obj => obj.count)
                setCount7(count)
            };
        }

        const fetchDataPostRefuse = async () => {
            const res = await apis.apiGetPostByDay({ status: 'S3', categoryCode: selected2, startDate: startDate, endDate: endDate })
            if (res?.data?.err === 0) {
                const data = res?.data.postCounts
                const count = data.map(obj => obj.count)
                setCount8(count)
            };
        }

        const fetchDataPostPending = async () => {
            const res = await apis.apiGetPostByDay({ status: 'S1', categoryCode: selected2, startDate: startDate, endDate: endDate })
            if (res?.data?.err === 0) {
                const data = res?.data.postCounts
                const count = data.map(obj => obj.count)
                setCount9(count)
            };
        }

        const fetchDataPostSuccess = async () => {
            const res = await apis.apiGetPostByDay({ status: 'S6', categoryCode: selected2, startDate: startDate, endDate: endDate })
            if (res?.data?.err === 0) {
                const data = res?.data.postCounts
                const count = data.map(obj => obj.count)
                setCount10(count)
            };
        }

        fetchDataNewPost();
        fetchDataPostApprove();
        fetchDataPostRefuse();
        fetchDataPostPending();
        fetchDataPostSuccess();

    }, [selected2, startDate, endDate]);

    useEffect(() => {
        const chartData = {
            labels: label2,
            datasets: [
                {
                    label: 'Tất cả bài đăng',
                    data: count6,
                    fill: false,
                    borderColor: '#36a2eb',
                    backgroundColor: '#9ad0f5',
                    tension: 0.1,
                    pointStyle: 'rectRot',
                    pointRadius: 5,
                },
                {
                    label: 'Bài đăng được duyệt',
                    data: count7,
                    fill: false,
                    borderColor: '#4bc0c0',
                    backgroundColor: '#a5dfdf',
                    tension: 0.1,
                    pointStyle: 'rectRot',
                    pointRadius: 5,
                },
                {
                    label: 'Bài đăng bị từ chối',
                    data: count8,
                    fill: false,
                    borderColor: '#ff6384',
                    backgroundColor: '#ffb1c1',
                    tension: 0.1,
                    pointStyle: 'rectRot',
                    pointRadius: 5,
                },
                {
                    label: 'Bài đăng đợi duyệt',
                    data: count9,
                    fill: false,
                    borderColor: '#ffcd56',
                    backgroundColor: '#ffe6aa',
                    tension: 0.1,
                    pointStyle: 'rectRot',
                    pointRadius: 5,
                },
                {
                    label: 'Bài đăng đã được thuê',
                    data: count10,
                    fill: false,
                    borderColor: '#ff9f40',
                    backgroundColor: '#ffcf9f',
                    tension: 0.1,
                    pointStyle: 'rectRot',
                    pointRadius: 5,
                },
            ],
        };
        setChartData2(chartData)
    }, [count6, count7, count8, count9, count10])

    return (
        <div className='px-8 py-4'>
            <Helmet>
                <title>{title}</title>
                <link rel="icon" href={logo} />
            </Helmet>
            <BreadCrumb
                items={items}
            />
            <h1 className='font-[500] text-[35px] border-b border-gray-200 py-4'>Thống kê tin đăng</h1>
            <div className='w-full mt-10 mb-20 border p-5 bg-primary rounded-[5px]'>
                <div className='w-full mb-10 flex justify-end'>
                    <div className='flex flex-col gap-2'>
                        <label className='text-sm font-semibold'>
                            Danh mục
                        </label>
                        <select
                            className='outline-none border border-gray-300 p-2 rounded-[5px] text-xs'
                            onChange={(e) => setSelected1(e.target.value)}
                            defaultValue=''
                        >
                            <option value=''>
                                Tất cả
                            </option>
                            {
                                categories?.map(item => (
                                    <option
                                        value={item.code}
                                        key={item.code}
                                    >
                                        {item.value}
                                    </option>
                                ))
                            }
                        </select>
                    </div>
                </div>
                {
                    Object.entries(chartData1)?.length > 0 && (
                        <LineChart
                            data={chartData1}
                        />
                    )
                }
            </div>
            <div className='w-full mt-10 mb-20 border p-5 bg-primary rounded-[5px]'>
                <div className='w-full mb-10 flex justify-end gap-4'>
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
                    <div className='flex flex-col gap-2'>
                        <label className='text-sm font-semibold'>
                            Danh mục
                        </label>
                        <select
                            className='outline-none border border-gray-300 p-2 rounded-[5px] text-xs'
                            onChange={(e) => setSelected2(e.target.value)}
                            defaultValue=''
                        >
                            <option value=''>
                                Tất cả
                            </option>
                            {
                                categories?.map(item => (
                                    <option
                                        value={item.code}
                                        key={item.code}
                                    >
                                        {item.value}
                                    </option>
                                ))
                            }
                        </select>
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
    )
}

export default StatisticsPost
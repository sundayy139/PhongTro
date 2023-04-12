import React, { useEffect, useState } from 'react'
import { Navigate, useLocation, useNavigate } from 'react-router-dom'
import { apiVnpayReturn } from '../../services/paymentService'
import mark from '../../assets/icon/mark.png'
import logo from '../../assets/image/homestay.png';
import close from '../../assets/icon/close.png';
import { BottomBar } from '../../components/Public'
import { Helmet } from 'react-helmet'
import { BreadCrumb, Button } from '../../components/System'
import moment from 'moment';
import { path } from '../../utils/path';


const title = 'Thanh toán thành công - Phòng trọ';

const PaymentSuccess = () => {

    const items = [
        { title: 'Trang chủ', link: '/' },
        { title: 'Trang quản lý', link: '/he-thong' },
        { title: 'Trạng thái thanh toán' },
    ];

    const location = useLocation()
    const navigate = useNavigate()
    const [paymentInfo, setPaymentInfo] = useState()
    const [errCode, setErrCode] = useState()

    useEffect(() => {
        const fetchVnpayReturn = async () => {
            const res = await apiVnpayReturn(location?.search?.slice(1))
            setErrCode(res?.data?.code)
            if (res?.data?.code == '00') {
                setPaymentInfo(res.data.payment)
            }
        }
        fetchVnpayReturn()
    }, [])

    return (
        <div className='pc:px-8 pc:py-4 laptop:px-8 laptop:py-4 phone:px-[10px] tablet:px-[10px] relative'>
            <BottomBar />
            <Helmet>
                <title>{title}</title>
                <link rel="icon" href={logo} />
            </Helmet>
            <div className='phone:hidden tablet:hidden'>
                <BreadCrumb
                    items={items}
                />
            </div>
            {
                errCode !== '' && errCode == '00'
                    ? (
                        <>
                            {
                                paymentInfo && (
                                    <div className='pc:w-1/2 pc:mx-auto laptop:w-1/2 laptop:mx-auto phone:w-full phone:mb-10 phone:bg-white phone:mt-4 tablet:w-full tablet:bg-white tablet:mt-4 tablet:mb-10 py-10 flex flex-col gap-6'>
                                        <div className='flex w-full flex-col gap-4'>
                                            <div className='mx-auto w-[128px] h-[128px]'>
                                                <img src={paymentInfo.statusCode === 'S8' ? mark : close} className='w-full h-full object-contain' />
                                            </div>
                                            <h3 className={`text-center ${paymentInfo.statusCode === 'S8' ? 'text-[#14c18b]' : 'text-[#e04f5f]'} text-2xl font-semibold`}>
                                                {paymentInfo.statusCode === 'S8' ? 'Thanh toán thành công' : 'Thanh toán thất bại'}
                                            </h3>
                                        </div>
                                        <table className="text-sm w-2/3 mx-auto text-left">
                                            <tbody>
                                                <tr className="bg-white">
                                                    <td className="pc:px-6 pc:py-3 laptop:px-6 laptop:py-3 phone:py-2 phone:text-[#777777] tablet:py-2 tablet:text-[#777777] w-1/2">
                                                        Mã đơn hàng:
                                                    </td>
                                                    <td className="pc:px-6 pc:py-3 laptop:px-6 laptop:py-3">
                                                        {paymentInfo.id}
                                                    </td>
                                                </tr>
                                                <tr className="bg-white">
                                                    <td className="pc:px-6 pc:py-3 laptop:px-6 laptop:py-3 phone:py-2 phone:text-[#777777] tablet:py-2 tablet:text-[#777777] w-1/2 ">
                                                        Số tiền:
                                                    </td>
                                                    <td className="pc:px-6 pc:py-3 laptop:px-6 laptop:py-3">
                                                        {`${paymentInfo?.amount.toLocaleString('vi-VN')} VNĐ`}
                                                    </td>
                                                </tr>
                                                <tr className="bg-white">
                                                    <td className="pc:px-6 pc:py-3 laptop:px-6 laptop:py-3 phone:py-2 phone:text-[#777777] tablet:py-2 tablet:text-[#777777] w-1/2">
                                                        Nội dung:
                                                    </td>
                                                    <td className="pc:px-6 pc:py-3 laptop:px-6 laptop:py-3">
                                                        {paymentInfo.paymentInfo}
                                                    </td>
                                                </tr>
                                                <tr className="bg-white">
                                                    <td className="pc:px-6 pc:py-3 laptop:px-6 laptop:py-3 phone:py-2 phone:text-[#777777] tablet:py-2 tablet:text-[#777777] w-1/2">
                                                        Ngày thanh toán:
                                                    </td>
                                                    <td className="pc:px-6 pc:py-3 laptop:px-6 laptop:py-3">
                                                        {moment(moment.utc(paymentInfo.createdAt)).local().format('dddd, HH:SS DD/MM/YYYY')}
                                                    </td>
                                                </tr>
                                                <tr className="bg-white">
                                                    <td className="pc:px-6 pc:py-3 laptop:px-6 laptop:py-3 phone:py-2 phone:text-[#777777] tablet:py-2 tablet:text-[#777777] w-1/2">
                                                        Trạng thái:
                                                    </td>
                                                    <td className="pc:px-6 pc:py-3 laptop:px-6 laptop:py-3">
                                                        {paymentInfo.statusCode === 'S8' ? 'Thành công' : 'Thất bại'}
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                )
                            }
                        </>
                    )
                    : errCode == '02'
                        ? (
                            <div className='pc:w-1/2 pc:mx-auto laptop:w-1/2 laptop:mx-auto phone:w-full phone:bg-white phone:mt-4 tablet:w-full tablet:bg-white tablet:mt-4 py-10 flex flex-col gap-6'>
                                <div className='flex w-full flex-col gap-4'>
                                    <div className='mx-auto w-[128px] h-[128px]'>
                                        <img src={close} className='w-full h-full object-contain' />
                                    </div>
                                    <h3 className='text-center text-[#e04f5f] text-2xl font-semibold'>
                                        Thanh toán thất bại
                                    </h3>
                                </div>
                                <div className='text-center text-xl'>
                                    Giao dịch thanh toán này đã được cập nhật rồi !
                                </div>
                            </div>
                        )
                        : (
                            <div className='pc:w-1/2 pc:mx-auto laptop:w-1/2 laptop:mx-auto phone:w-full phone:bg-white phone:mt-4 tablet:w-full tablet:bg-white tablet:mt-4 py-10 flex flex-col gap-6'>
                                <div className='flex w-full flex-col gap-4'>
                                    <div className='mx-auto w-[128px] h-[128px]'>
                                        <img src={close} className='w-full h-full object-contain' />
                                    </div>
                                    <h3 className='text-center text-[#e04f5f] text-2xl font-semibold'>
                                        Thanh toán thất bại
                                    </h3>
                                </div>
                                <div className='text-center text-xl'>
                                    Giao dịch đã xảy ra lỗi gì đó, xin vui lòng thử lại !
                                </div>
                            </div>
                        )
            }
            <div className='w-1/2 mx-auto phone:hidden tablet:hidden'>
                <Button
                    text={'Về trang chủ'}
                    textStyle={'text-[17px] text-white'}
                    bgColor={'bg-[#007bff]'}
                    fullWidth
                    hover={'hover:bg-[#0069d9]'}
                    onClick={() => navigate('/he-thong')}
                />
            </div>
        </div>
    )
}

export default PaymentSuccess
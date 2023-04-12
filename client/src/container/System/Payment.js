import React, { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet'
import { BottomBar } from '../../components/Public'
import { BreadCrumb, Button, InputForm } from '../../components/System'
import logo from '../../assets/image/homestay.png';
import { inputPayment } from '../../utils/constant';
import { convertToText, formatMoney, validate } from '../../utils/fn';
import * as apis from '../../services'
import { useNavigate } from 'react-router-dom';
import icons from '../../utils/icons'

const { BiArrowBack } = icons
const title = 'Nạp tiền - Phòng trọ';

const Payment = () => {

    const items = [
        { title: 'Trang chủ', link: '/' },
        { title: 'Trang quản lý', link: '/he-thong' },
        { title: 'Nạp tiền' },
    ];
    const navigate = useNavigate()
    const [moneyText, setMonenyText] = useState()
    const [finalAmount, setFinalAmout] = useState()
    const [invalidFileds, setInvalidFileds] = useState([])
    const [payload, setPayload] = useState({
        amount: ''
    })

    useEffect(() => {
        setMonenyText(convertToText(+finalAmount))
    }, [finalAmount])

    useEffect(() => {
        setFinalAmout(parseFloat(payload.amount.replace(/\./g, '').replace(',', '.')))
    }, [payload.amount])

    const handleSubmit = async () => {
        let invalid = validate(payload, setInvalidFileds)
        if (invalid === 0) {
            const res = await apis.apiCreateVnpayUrl({ amount: +finalAmount })
            if (res?.data?.err === 0) {
                window.location.replace(res?.data?.vnpUrl);
            }
        }
    }

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
            <h1 className='font-[600] pc:text-[35px] laptop:text-[35px] phone:text-[25px] tablet:text-[25px] py-4 border-b border-gray-200'>
                Nạp tiền vào tài khoản
            </h1>
            <div className='pc:gap-6 pc:py-10 laptop:gap-6 laptop:py-10 phone:w-full phone:gap-4 phone:py-4 tablet:w-full tablet:gap-4 tablet:py-4 flex flex-col bg-white rounded-[5px] phone:px-2 tablet:px-2 phone:mb-10 tablet:mb-10'>
                <h2 className='font-semibold pc:text-2xl laptop:text-2xl phone:text-xl tablet:text-xl'>Chọn số tiền cần nạp</h2>
                <div className='flex flex-col gap-4 text-sm'>
                    <p>Chọn nhanh số tiền cần nạp</p>
                    <div className='flex gap-5 items-center phone:flex-wrap tablet:flex-wrap'>
                        {
                            inputPayment.map(item => (
                                <div key={item.id} className=' flex gap-1 items-center'>
                                    <input
                                        type='radio'
                                        name='payment'
                                        value={item.value}
                                        id={item.id}
                                        onClick={() => setPayload({ amount: item.value.toLocaleString('vi-VN') })}
                                    />
                                    <label htmlFor={item.id} className='cursor-pointer'>{`${item.text} đ`}</label>
                                </div>
                            ))
                        }
                    </div>
                </div>
                <div className='flex flex-col gap-4 text-sm'>
                    <p>Hoặc nhập số tiền cần nạp</p>
                    <div className='w-full max-w-[400px] flex flex-col gap-6'>
                        <div className='flex flex-col gap-2'>
                            <div className='relative'>
                                <input
                                    type='text'
                                    value={payload.amount}
                                    name='amount'
                                    className='outline-none border border-gray-300 p-2 rounded-[5px] w-full phone:font-semibold phone:text-[#007aff] phone:bg-[#e7f0fe] tablet:font-semibold tablet:text-[#007aff] tablet:bg-[#e7f0fe]'
                                    onChange={(e) => setPayload({ amount: formatMoney(e.target.value) })}
                                    onFocus={() => setInvalidFileds([])}
                                />
                                <span className='absolute top-0 right-0 bottom-0 px-2 bg-gray-200 rounded-r-[5px] flex items-center justify-center  border-l-[2px] border-l-gray-300'>
                                    vnđ
                                </span>
                            </div>
                            {
                                invalidFileds?.length > 0 && invalidFileds?.some(item => item.name === 'amount') && (
                                    <small className='text-[10px] text-red-500'>
                                        {
                                            invalidFileds?.find(item => item.name === 'amount')?.message
                                        }
                                    </small>
                                )
                            }
                            {
                                moneyText && payload.amount !== '' && (
                                    <p>{moneyText}</p>
                                )
                            }
                        </div>
                        <div className='w-full phone:hidden tablet:hidden'>
                            <Button
                                text={'Tiếp tục'}
                                textStyle={'text-[17px] text-white'}
                                bgColor={'bg-[#007bff]'}
                                fullWidth
                                hover={'hover:bg-[#0069d9]'}
                                onClick={handleSubmit}
                            />
                        </div>
                        <div className='h-[55px] fixed bottom-0 left-0 right-0 shadow-custom bg-white flex gap-2 px-4 py-2 pc:hidden laptop:hidden z-[99999]'>
                            <Button
                                text={'Quay lại'}
                                textStyle={'text-[17px] text-[#333333]'}
                                bgColor={'bg-white'}
                                fullWidth
                                iconBefore={<BiArrowBack />}
                                hover={'hover:bg-[#218838]'}
                                onClick={() => navigate(-1)}
                            />
                            <Button
                                text={'Tiếp tục'}
                                textStyle={'text-[17px] text-white'}
                                bgColor={'bg-[#007bff]'}
                                fullWidth
                                hover={'hover:bg-[#0069d9]'}
                                onClick={handleSubmit}
                            />
                        </div>
                    </div>
                </div>
                <div className='py-3 px-4 mt-4 rounded-[5px] text-sm bg-[#f8d7da] text-[#721c24] flex flex-col gap-2'>
                    <p>Lưu ý quan trọng: Trong quá trình thanh toán, bạn vui lòng <strong>KHÔNG ĐÓNG TRÌNH DUYỆT</strong></p>
                    <p>Nếu gặp khó khăn trong quá trình thanh toán, xin liên hệ 0917686101 để chúng tôi hỗ trợ bạn.</p>
                </div>
            </div>
        </div>
    )
}

export default Payment
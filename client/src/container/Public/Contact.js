import React, { useState } from 'react'
import { Button, InputForm } from '../../components/Public/index'
import { contactInfo } from '../../utils/constant'
import { validate } from '../../utils/fn'
import logo from '../../assets/image/homestay.png';
import { Helmet } from 'react-helmet'
import * as apis from '../../services'
import Swal from 'sweetalert2';


const title = 'Liên hệ - Phòng trọ';

const Contact = () => {
    const [invalidFileds, setInvalidFileds] = useState([])
    const [payload, setPayload] = useState({
        name: '',
        phone: '',
        email: '',
        content: ''
    })

    const handleSubmit = async () => {
        let invalid = validate(payload, setInvalidFileds)
        if (invalid === 0) {
            const res = await apis.apiCreateFeedback(payload)
            if (res?.data?.err === 0) {
                Swal.fire({
                    title: 'Yeahh..!',
                    text: res?.data?.msg,
                    icon: 'success',
                    showConfirmButton: false,
                    timer: 2000
                })
                setPayload({
                    name: '',
                    phone: '',
                    email: '',
                    content: ''
                })
            } else {
                Swal.fire({
                    position: 'center',
                    icon: 'error',
                    title: 'Oops...',
                    text: res?.data?.msg,
                    showConfirmButton: false,
                    timer: 2000
                })
            }
        }
    }

    return (
        <div className=''>
            <Helmet>
                <title>{title}</title>
                <link rel="icon" href={logo} />
            </Helmet>
            <h1 className='text-[28px] font-semibold my-2 phone:px-4 tablet:px-4'>Liên hệ với chúng tôi</h1>
            <div className='flex gap-10 pb-5 items-start phone:flex-col tablet:flex-col'>
                <div className='pc:text-[17px] laptop:text-[17px] phone:text-sm tablet:text-sm pc:text-white pc:bg-gradient-to-b pc:from-[#0039e4] pc:to-[#04dbf1] pc:p-8 pc:rounded-[50px] laptop:text-white laptop:bg-gradient-to-b laptop:from-[#0039e4] laptop:to-[#04dbf1] laptop:p-8 laptop:rounded-[50px] flex flex-col gap-4 flex-1 phone:py-5 phone:px-4 tablet:py-5 tablet:px-4'>
                    <h3 className='font-semibold text-lg'>Thông tin liên hệ</h3>
                    <p>Chúng tôi biết bạn có rất nhiều sự lựa chọn. Nhưng cảm ơn vì đã lựa chọn PhongTro123.Com</p>
                    {
                        contactInfo?.map(item => (
                            <span key={item.id}>
                                <span className='font-semibold'>
                                    {item.name}
                                </span>
                                {item.info}
                            </span>
                        ))
                    }
                </div>
                <div className='pc:flex-1 laptop:flex-1 phone:w-full tablet:w-full bg-white p-[30px] pc:border pc:border-[#dedede] pc:rounded-[10px] laptop:border laptoppc:border-[#dedede] laptop:rounded-[10px] phone:border-t-[5px] phone:border-t-[#f5f5f5] tablet:border-t-[5px] tablet:border-t-[#f5f5f5]'>
                    <h3 className='font-semibold text-lg mb-[15px]'>Liên hệ trực tuyến</h3>
                    <div className='flex flex-col gap-5'>
                        <InputForm
                            label={'HỌ TÊN CỦA BẠN'}
                            id='name'
                            name='name'
                            value={payload.name}
                            setValue={setPayload}
                            type={"name"}
                            invalidFileds={invalidFileds}
                            setInvalidFileds={setInvalidFileds}
                        />
                        <InputForm
                            label={'SỐ ĐIỆN THOẠI'}
                            id='phone'
                            name='phone'
                            value={payload.phone}
                            setValue={setPayload}
                            type={"phone"}
                            invalidFileds={invalidFileds}
                            setInvalidFileds={setInvalidFileds}
                        />
                        <InputForm
                            label={'email'}
                            id='email'
                            name='email'
                            value={payload.email}
                            setValue={setPayload}
                            type={"email"}
                            invalidFileds={invalidFileds}
                            setInvalidFileds={setInvalidFileds}
                        />
                        <div className='flex flex-col gap-2 w-full text-sm'>
                            <label htmlFor='content' className='text-xs uppercase'>
                                Nội dung
                            </label>
                            <textarea
                                onFocus={() => setInvalidFileds([])}
                                rows={3}
                                required
                                type='text'
                                id='content'
                                className='outline-none bg-[#e8f0fe] rounded-md tex-[16px] p-[10px] '
                                value={payload.content}
                                onChange={(e) => setPayload(prev => ({ ...prev, content: e.target.value }))}
                            />
                            <small className='text-[10px] text-red-500'>
                                {
                                    invalidFileds?.some(item => item.name === 'content') && invalidFileds?.find(item => item.name === 'content')?.message
                                }
                            </small>
                        </div>
                        <Button
                            text={'Gửi liên hệ'}
                            bgColor={'bg-secondary1'}
                            textStyle={'text-white font-semibold py-[10px]'}
                            fullWidth
                            onClick={handleSubmit}
                            hover={'hover:bg-orange'}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Contact
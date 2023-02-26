import React, { useState } from 'react'
import { Button, InputForm } from '../../components/Public/index'
import { contactInfo } from '../../utils/constant'
import { validate } from '../../utils/fn'
import logo from '../../assets/image/homestay.png';
import { Helmet } from 'react-helmet'


const title = 'Liên hệ - Phòng trọ';

const Contact = () => {
    const [invalidFileds, setInvalidFileds] = useState([])
    const [payload, setPayload] = useState({
        name: '',
        phone: '',
        email: '',
        content: ''
    })

    const handleSubmit = () => {
        let invalid = validate(payload, setInvalidFileds)
        if (invalid === 0) {
            console.log(payload);
        }
    }

    return (
        <div className=''>
            <Helmet>
                <title>{title}</title>
                <link rel="icon" href={logo} />
            </Helmet>
            <h1 className='text-[28px] font-semibold my-2'>Liên hệ với chúng tôi</h1>
            <div className='flex gap-10 pb-5 items-start'>
                <div className='text-[17px] text-white bg-gradient-to-b  from-[#0039e4] to-[#04dbf1] flex flex-col gap-4 flex-1 p-8 rounded-[50px]'>
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
                <div className='flex-1 bg-white p-[30px] border border-[#dedede] rounded-[10px]'>
                    <h3 className='font-semibold text-lg mb-[15px]'>Liên hệ trực tuyến</h3>
                    <div className='flex flex-col gap-5'>
                        <InputForm
                            label={'HỌ TÊN CỦA BẠN'}
                            id='name'
                            value={payload.name}
                            setValue={setPayload}
                            type={"name"}
                            invalidFileds={invalidFileds}
                            setInvalidFileds={setInvalidFileds}
                        />
                        <InputForm
                            label={'SỐ ĐIỆN THOẠI'}
                            id='phone'
                            value={payload.phone}
                            setValue={setPayload}
                            type={"phone"}
                            invalidFileds={invalidFileds}
                            setInvalidFileds={setInvalidFileds}
                        />
                        <InputForm
                            label={'email'}
                            id='email'
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
                            textStyle={'text-white font-semibold'}
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
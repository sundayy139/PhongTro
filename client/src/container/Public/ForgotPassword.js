import React, { useEffect, useState } from 'react'
import { Button, InputForm } from '../../components/Public/index'
import { Helmet } from 'react-helmet'
import { validate } from '../../utils/fn';
import * as apis from '../../services/index'
import Swal from 'sweetalert2';


const title = 'Quên mật khẩu - Phòng trọ';

const ForgotPassword = () => {
    const [invalidFileds, setInvalidFileds] = useState([])
    const [payload, setPayload] = useState({
        phone: '',
        email: ''
    })

    useEffect(() => {

    }, [])

    const handleSubmit = async () => {
        const invalid = validate(payload, setInvalidFileds)
        if (invalid === 0) {
            const res = await apis.apiForgotPassword(payload)
            if (res?.data?.err === 0) {
                setPayload({
                    phone: '',
                    email: ''
                })
                Swal.fire({
                    position: 'center',
                    title: 'Yeahh..!',
                    text: res?.data?.msg,
                    icon: 'success',
                    confirmButtonColor: '#3085d6',
                    confirmButtonText: 'OK'
                })
            } else {
                Swal.fire({
                    position: 'center',
                    title: 'Opps..!',
                    text: res?.data?.msg,
                    icon: 'error',
                    confirmButtonColor: '#3085d6',
                    confirmButtonText: 'OK'
                })
            }
        }
    }

    return (
        <div className='bg-white max-w-600 w-full p-[30px] pb-[100px] shadow-sm rounded-md mx-auto border boder-[#dedede]'>
            <Helmet>
                <title>{title}</title>
            </Helmet>
            <h3 className='font-semibold text-[28px] mb-[15px]'>Quên mật khẩu</h3>
            <div className='flex flex-col gap-5'>
                <InputForm
                    label={'SỐ ĐIỆN THOẠI'}
                    id='phone'
                    value={payload.phone}
                    setValue={setPayload}
                    type="text"
                    name='phone'
                    invalidFileds={invalidFileds}
                    setInvalidFileds={setInvalidFileds}
                />
                <InputForm
                    label={'Email'}
                    id='email'
                    name='email'
                    value={payload.email}
                    setValue={setPayload}
                    type="text"
                    invalidFileds={invalidFileds}
                    setInvalidFileds={setInvalidFileds}
                />
                <Button
                    text={'Xác nhận'}
                    bgColor={'bg-secondary1'}
                    textStyle={'text-white font-semibold'}
                    fullWidth
                    onClick={handleSubmit}
                    hover={'hover:bg-orange'}
                />
            </div>
        </div>
    )
}

export default ForgotPassword
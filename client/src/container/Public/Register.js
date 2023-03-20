import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, InputForm } from '../../components/Public/index';
import * as apis from '../../services';
import { isVietnamesePhoneNumber, validate, validateEmail } from '../../utils/fn';
import { Helmet } from 'react-helmet'
import Swal from 'sweetalert2'


const title = 'Đăng ký - Phòng trọ';

const Register = () => {
    const navigate = useNavigate();
    const [invalidFileds, setInvalidFileds] = useState([])
    const [payload, setPayload] = useState({
        name: '',
        phone: '',
        email: '',
        password: '',
        role: 'user'
    })

    const handleRegister = async () => {
        let invalid = validate(payload, setInvalidFileds)
        if (invalid === 0) {
            const response = await apis.apiRegister(payload)
            if (response?.data?.err === 0) {
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Yeah...',
                    text: response?.data?.msg,
                    showConfirmButton: false,
                    timer: 2000
                })
                navigate('/dang-nhap')
                // await apis.apiRegisterMail(payload)
            } else {
                Swal.fire({
                    position: 'center',
                    icon: 'error',
                    title: 'Oops...',
                    text: response?.data?.msg,
                    showConfirmButton: false,
                    timer: 2000
                })
            }
        }
    }

    return (
        <div className='bg-white max-w-600 w-full p-[30px] pb-[100px] mx-auto pc:shadow-sm pc:rounded-md pc:border pc:boder-[#dedede] laptop:shadow-sm laptop:rounded-md laptop:border laptop:boder-[#dedede]'>
            <Helmet>
                <title>{title}</title>
            </Helmet>
            <h3 className='font-semibold text-[28px] mb-[15px]'>Tạo tài khoản mới</h3>
            <div className='flex flex-col gap-5'>
                <InputForm
                    label={'HỌ TÊN'}
                    id='name'
                    value={payload.name}
                    setValue={setPayload}
                    type='text'
                    name='name'
                    invalidFileds={invalidFileds}
                    setInvalidFileds={setInvalidFileds}
                />
                <InputForm
                    label={'SỐ ĐIỆN THOẠI'}
                    id='phone'
                    value={payload.phone}
                    setValue={setPayload}
                    name='phone'
                    type='text'
                    invalidFileds={invalidFileds}
                    setInvalidFileds={setInvalidFileds}
                />
                <InputForm
                    label={'EMAIL'}
                    id='email'
                    name='email'
                    value={payload.email}
                    setValue={setPayload}
                    type='text'
                    invalidFileds={invalidFileds}
                    setInvalidFileds={setInvalidFileds}
                />
                <InputForm
                    label={'MẬT KHẨU'}
                    id='password'
                    name='password'
                    value={payload.password}
                    setValue={setPayload}
                    type="password"
                    invalidFileds={invalidFileds}
                    setInvalidFileds={setInvalidFileds}
                />
                <Button
                    text={'Tạo tài khoản'}
                    bgColor={'bg-secondary1'}
                    textStyle={'text-white font-semibold py-[10px]'}
                    fullWidth
                    onClick={handleRegister}
                    hover={'hover:bg-orange'}
                />
            </div>
            <div className='flex flex-col text-sm text mb-[20px] mt-[30px]'>
                <span className='mb-[20px]'>
                    Bấm vào nút đăng ký tức là bạn đã đồng ý với quy định sử dụng của chúng tôi
                </span>
                <span>
                    Bạn đã có tài khoản?
                    <span
                        onClick={() => {
                            navigate('/dang-nhap')
                            setPayload({})
                        }}
                        className='text-primary ml-2 hover:text-orange cursor-pointer'>
                        Đăng nhập ngay
                    </span>
                </span>
            </div>
        </div>
    )
}

export default Register
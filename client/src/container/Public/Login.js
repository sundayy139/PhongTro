import React from 'react'
import { useNavigate } from 'react-router-dom';
import { Button, InputForm } from '../../components/index'

const Login = () => {
    const navigate = useNavigate();
    return (
        <div className='bg-white max-w-600 w-full p-[30px] pb-[100px] shadow-sm rounded-md'>
            <h3 className='font-semibold text-[28px] mb-[15px]'>Đăng nhập</h3>
            <div className='flex flex-col gap-5'>
                <InputForm label='SỐ ĐIỆN THOẠI' />
                <InputForm label='MẬT KHẨU' />
                <Button
                    text='Đăng nhập'
                    bgColor='bg-secondary1'
                    textColor='text-white'
                    fulWidth
                />
            </div>
            <div className='flex items-center justify-between text-sm text mb-[20px] mt-[30px]'>
                <span className='hover:text-orange cursor-pointer'>
                    Bạn quên mật khẩu?
                </span>
                <span
                    onClick={() => navigate('/register')}
                    className='hover:text-orange cursor-pointer'
                >
                    Tạo tài khoản mới
                </span>
            </div>
        </div>
    )
}

export default Login
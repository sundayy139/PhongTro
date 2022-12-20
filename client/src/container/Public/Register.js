import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, InputForm } from '../../components/index';

const Register = () => {
    const navigate = useNavigate();
    return (
        <div className='bg-white max-w-600 w-full p-[30px] pb-[100px] shadow-sm rounded-md'>
            <h3 className='font-semibold text-[28px] mb-[15px]'>Tạo tài khoản mới</h3>
            <div className='flex flex-col gap-5'>
                <InputForm label='HỌ TÊN' />
                <InputForm label='SỐ ĐIỆN THOẠI' />
                <InputForm label='MẬT KHẨU' />
                <Button
                    text='Tạo tài khoản'
                    bgColor='bg-secondary1'
                    textColor='text-white'
                    fulWidth
                />
            </div>
            <div className='flex flex-col text-sm text mb-[20px] mt-[30px]'>
                <span className='mb-[20px]'>
                    Bấm vào nút đăng ký tức là bạn đã đồng ý với quy định sử dụng của chúng tôi
                </span>
                <span>
                    Bạn đã có tài khoản?
                    <span
                        onClick={() => navigate('/login')}
                        className='text-primary ml-2 hover:text-orange cursor-pointer'>
                        Đăng nhập ngay
                    </span>
                </span>

            </div>
        </div>
    )
}

export default Register
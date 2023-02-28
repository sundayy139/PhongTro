import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Button, InputForm } from '../../components/Public/index'
import * as actions from '../../store/actions';
import { Helmet } from 'react-helmet'
import Swal from 'sweetalert2'
import { path } from '../../utils/path';


const title = 'Đăng nhập - Phòng trọ';

const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { msg, update, isLoggedIn } = useSelector(state => state.auth)
    const [invalidFileds, setInvalidFileds] = useState([])
    const [payload, setPayload] = useState({
        phone: '',
        password: ''
    })

    useEffect(() => {
        msg && Swal.fire("Opps !", msg, "error")
    }, [msg, update])

    useEffect(() => {
        isLoggedIn && navigate('/')
    }, [isLoggedIn])


    const handleLogin = () => {
        dispatch(actions.login(payload))
    }

    return (
        <div className='bg-white max-w-600 w-full p-[30px] pb-[100px] shadow-sm rounded-md mx-auto border boder-[#dedede]'>
            <Helmet>
                <title>{title}</title>
            </Helmet>
            <h3 className='font-semibold text-[28px] mb-[15px]'>Đăng nhập</h3>
            <div className='flex flex-col gap-5'>
                <InputForm
                    label={'SỐ ĐIỆN THOẠI'}
                    id='phone'
                    name='phone'
                    value={payload.phone}
                    setValue={setPayload}
                    type="text"
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
                    text={'Đăng nhập'}
                    bgColor={'bg-secondary1'}
                    textStyle={'text-white font-semibold'}
                    fullWidth
                    onClick={handleLogin}
                    hover={'hover:bg-orange'}
                />
            </div>
            <div className='flex items-center justify-between text-sm text mb-[20px] mt-[30px]'>
                <span
                    onClick={() => navigate(`/${path.FORGOT_PASSWORD}`)}
                    className='hover:text-orange cursor-pointer'
                >
                    Bạn quên mật khẩu?
                </span>
                <span
                    onClick={() => {
                        navigate('/dang-ky-tai-khoan')
                        setPayload({})
                    }}
                    className='hover:text-orange cursor-pointer'
                >
                    Tạo tài khoản mới
                </span>
            </div>
        </div>
    )
}

export default Login
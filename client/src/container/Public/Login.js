import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Button, InputForm } from '../../components/Public/index'
import * as actions from '../../store/actions';
import { Helmet } from 'react-helmet'
import Swal from 'sweetalert2'
import { path } from '../../utils/path';
import { validate } from '../../utils/fn';


const title = 'Đăng nhập - Phòng trọ';

const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { msg, update, isLoggedIn, loading } = useSelector(state => state.auth)
    const [invalidFileds, setInvalidFileds] = useState([])
    const [isLoading, setIsLoading] = useState(false)
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
        let invalid = validate(payload, setInvalidFileds)
        if (invalid === 0) {
            setIsLoading(true)
            dispatch(actions.login(payload))
        }
    }

    useEffect(() => {
        setIsLoading(false)
    }, [loading])


    return (
        <div className='bg-white max-w-600 w-full p-[30px] pb-[100px] mx-auto pc:shadow-sm pc:rounded-md pc:border pc:boder-[#dedede] laptop:shadow-sm laptop:rounded-md laptop:border laptop:boder-[#dedede]'>
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
                    bgColor={`${isLoading ? 'bg-primary' : 'bg-secondary1'}`}
                    textStyle={'text-white font-semibold py-[10px]'}
                    fullWidth
                    onClick={handleLogin}
                    hover={`${isLoading ? '' : 'hover:bg-orange'}`}
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
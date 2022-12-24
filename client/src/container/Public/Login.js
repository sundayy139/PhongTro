import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Button, InputForm } from '../../components/index'
import * as actions from '../../store/actions';
import { Helmet } from 'react-helmet'
import Swal from 'sweetalert2'


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
        let invalid = validate(payload)
        if (invalid === 0) {
            dispatch(actions.login(payload))
        }
    }

    const validate = (payload) => {
        let invalid = 0;
        let fields = Object.entries(payload);
        fields.forEach(item => {
            if (item[1] === '') {
                setInvalidFileds(prev => [...prev, {
                    name: item[0],
                    message: 'Bạn không được để trống trường này'
                }])
                invalid++
            }
        })
        return invalid
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
                    value={payload.phone}
                    setValue={setPayload}
                    type={"phone"}
                    invalidFileds={invalidFileds}
                    setInvalidFileds={setInvalidFileds}
                />
                <InputForm
                    label={'MẬT KHẨU'}
                    value={payload.password}
                    setValue={setPayload}
                    type={"password"}
                    invalidFileds={invalidFileds}
                    setInvalidFileds={setInvalidFileds}
                />
                <Button
                    text={'Đăng nhập'}
                    bgColor={'bg-secondary1'}
                    textStyle={'text-white font-semibold'}
                    fulWidth
                    onClick={handleLogin}
                    hover={'hover:bg-orange'}
                />
            </div>
            <div className='flex items-center justify-between text-sm text mb-[20px] mt-[30px]'>
                <span className='hover:text-orange cursor-pointer'>
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
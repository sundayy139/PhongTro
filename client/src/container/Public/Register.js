import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Button, InputForm } from '../../components/index';
import * as actions from '../../store/actions';
import { isVietnamesePhoneNumber } from '../../utils/fn';
import { Helmet } from 'react-helmet'
import Swal from 'sweetalert2'


const title = 'Đăng ký - Phòng trọ';

const Register = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { msg, update, isLoggedIn } = useSelector(state => state.auth)
    const [invalidFileds, setInvalidFileds] = useState([])
    const [payload, setPayload] = useState({
        name: '',
        phone: '',
        password: '',
        role: 'user'
    })

    useEffect(() => {
        msg && Swal.fire("Opps !", msg, "error")
    }, [msg, update])

    useEffect(() => {
        isLoggedIn && navigate('/')
    }, [isLoggedIn])


    const handleRegister = () => {
        let invalid = validate(payload)
        if (invalid === 0) {
            dispatch(actions.register(payload))
        }
    }

    const handleChangeInputRadio = (e) => {
        setPayload({
            ...payload,
            role: e.target.value
        })
    }

    const validate = (payload) => {
        let invalids = 0;
        let fields = Object.entries(payload);
        fields.forEach(item => {
            if (item[1] === '') {
                setInvalidFileds(prev => [...prev, {
                    name: item[0],
                    message: 'Bạn không được để trống trường này'
                }])
                invalids++
            }
        })
        fields.forEach(item => {
            switch (item[0]) {
                case 'password':
                    if (item[1].length < 8) {
                        setInvalidFileds(prev => [...prev, {
                            name: item[0],
                            message: 'Mật khẩu phải tối thiểu 8 kí tự '
                        }])
                        invalids++
                    }
                    break;
                case 'phone':
                    let checkPhone = isVietnamesePhoneNumber(item[1])
                    if (checkPhone === false) {
                        setInvalidFileds(prev => [...prev, {
                            name: item[0],
                            message: 'Số điện thoại không tồn tại'
                        }])
                        invalids++
                    }
                    break;
                default:
                    break;
            }
        })
        return invalids
    }

    return (
        <div className='bg-white max-w-600 w-full p-[30px] pb-[100px] shadow-sm rounded-md mx-auto border boder-[#dedede]'>
            <Helmet>
                <title>{title}</title>
            </Helmet>
            <h3 className='font-semibold text-[28px] mb-[15px]'>Tạo tài khoản mới</h3>
            <div className='flex flex-col gap-5'>
                <InputForm
                    label={'HỌ TÊN'}
                    value={payload.name}
                    setValue={setPayload}
                    type={"name"}
                    invalidFileds={invalidFileds}
                    setInvalidFileds={setInvalidFileds}
                />
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
                <div className='flex flex-col gap-2'>
                    <label className='text-xs uppercase'>
                        LOẠI TÀI KHOẢN
                    </label>
                    <div className='w-full text-xs uppercase border-[6px] border-dashed border-[#e8eefc] rounded-md p-4 flex gap-8'>
                        <div className='flex items-center justify-center gap-2'>
                            <input name='role' id='user' type='radio' value="user" defaultChecked onChange={handleChangeInputRadio} />
                            <label htmlFor='user' >TÌM KIẾM</label>
                        </div>
                        <div className='flex items-center justify-center gap-2'>
                            <input name='role' id='post' type='radio' value="post" onChange={handleChangeInputRadio} />
                            <label htmlFor='post' >CHÍNH CHỦ ĐĂNG TIN</label>
                        </div>
                    </div>
                </div>
                <Button
                    text={'Tạo tài khoản'}
                    bgColor={'bg-secondary1'}
                    textStyle={'text-white font-semibold'}
                    fulWidth
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
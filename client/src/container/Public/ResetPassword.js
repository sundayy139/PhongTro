import React, { useEffect, useState } from 'react'
import { Button, InputForm } from '../../components/Public/index'
import { Helmet } from 'react-helmet'
import { validate } from '../../utils/fn';
import * as apis from '../../services/index'
import Swal from 'sweetalert2';
import { useNavigate, useParams } from 'react-router-dom';
import { path } from '../../utils/path';


const title = 'Cấp lại mật khẩu - Phòng trọ';

const ResetPassword = () => {
    const params = useParams()
    const [invalidFileds, setInvalidFileds] = useState([])
    const [payload, setPayload] = useState({
        password: '',
        confirmPassword: ''
    })

    const navigate = useNavigate()

    const handleSubmit = async () => {
        const invalid = validate(payload, setInvalidFileds)
        let finalPayload = {
            ...payload,
            token: params.token
        }
        if (invalid === 0) {
            const res = await apis.apiResetPassword(finalPayload)
            console.log(res);
            if (res?.data?.err === 0) {
                setPayload({
                    password: '',
                    confirmPassword: ''
                })
                Swal.fire({
                    position: 'center',
                    title: 'Yeahh..!',
                    text: res?.data?.msg,
                    icon: 'success',
                    confirmButtonColor: '#3085d6',
                    confirmButtonText: 'OK'
                })
                navigate(`/${path.LOGIN}`)
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
            <h3 className='font-semibold text-[28px] mb-[15px]'>Cấp lại mật khẩu</h3>
            <div className='flex flex-col gap-5'>
                <InputForm
                    label={'Mật khẩu mới'}
                    id='password'
                    name="password"
                    value={payload.password}
                    setValue={setPayload}
                    type="password"
                    invalidFileds={invalidFileds}
                    setInvalidFileds={setInvalidFileds}
                />
                <InputForm
                    label={'Nhập lại mật khẩu'}
                    id='confirmPassword'
                    name="confirmPassword"
                    value={payload.confirmPassword}
                    setValue={setPayload}
                    type="password"
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

export default ResetPassword
import React, { useState } from 'react'
import { Button, InputForm } from '../../components/Public/index'
import { Helmet } from 'react-helmet'
import { validateEmail } from '../../utils/fn';


const title = 'Quên mật khẩu - Phòng trọ';

const RecoveryPassword = () => {
    const [payload, setPayload] = useState({
        email: ''
    })
    const [invalidFileds, setInvalidFileds] = useState([])

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
            let checkEmail = validateEmail(item[1])
            if (checkEmail === false) {
                setInvalidFileds(prev => [...prev, {
                    name: item[0],
                    message: 'Email không tồn tại'
                }])
                invalids++
            }
        })
        return invalids
    }


    const handleRegister = () => {
        let invalid = validate(payload)
        if (invalid === 0) {
            console.log(
                1
            );
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
                    label={'OTP'}
                    value={payload.email}
                    setValue={setPayload}
                    type={"email"}
                    invalidFileds={invalidFileds}
                    setInvalidFileds={setInvalidFileds}
                />
                <Button
                    text={'Xác nhận'}
                    bgColor={'bg-secondary1'}
                    textStyle={'text-white font-semibold'}
                    fulWidth
                    onClick={handleRegister}
                    hover={'hover:bg-orange'}
                />
            </div>
            <div className='flex flex-col text-sm text mb-[20px] mt-[30px]'>
                <span>
                    Không nhận được OTP?
                    <span
                        onClick={() => { }}
                        className='text-primary ml-2 hover:text-orange cursor-pointer'>
                        Gửi lại
                    </span>
                </span>
            </div>
        </div >
    )
}

export default RecoveryPassword
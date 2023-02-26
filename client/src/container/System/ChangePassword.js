import React, { useState } from 'react'
import { Helmet } from 'react-helmet'
import logo from '../../assets/image/homestay.png';
import { BreadCrumb, Button, InputForm } from '../../components/System';
import { validate } from '../../utils/fn';
import * as apis from '../../services/index'
import Swal from 'sweetalert2';


const title = 'Đổi mật khẩu - Phòng trọ';

const ChangePassword = () => {
    const items = [
        { title: 'Trang chủ', link: '/' },
        { title: 'Quản lý', link: '/he-thong' },
        { title: 'Đổi mật khẩu' }
    ];

    const [invalidFileds, setInvalidFileds] = useState([])
    const [payload, setPayload] = useState({
        oldPassword: '',
        newPassword: '',
        confirmPassword: '',
    })

    const handleSubmit = async () => {
        let invalid = validate(payload, setInvalidFileds)
        if (invalid === 0) {
            const res = await apis.apiChangePassword(payload)
            if (res?.data?.err === 0) {
                Swal.fire({
                    position: 'center',
                    title: 'Yeahh..!',
                    text: res?.data?.msg,
                    icon: 'success',
                    confirmButtonColor: '#3085d6',
                    confirmButtonText: 'OK'
                })
                setPayload({
                    oldPassword: '',
                    newPassword: '',
                    confirmPassword: '',
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
        <div className='px-8 py-4'>
            <Helmet>
                <title>{title}</title>
                <link rel="icon" href={logo} />
            </Helmet>
            <BreadCrumb
                items={items}
            />
            <h1 className='font-[500] text-[35px] border-b border-gray-200 py-4'>Đổi mật khẩu</h1>
            <div className='w-2/3 mx-auto flex flex-col gap-6 py-10'>
                <InputForm
                    label='Mật khẩu cũ'
                    id='oldPassword'
                    name='oldPassword'
                    isRow
                    invalidFileds={invalidFileds}
                    setInvalidFileds={setInvalidFileds}
                    value={payload.oldPassword}
                    setValue={setPayload}
                />
                <InputForm
                    label='Mật khẩu mới'
                    id='newPassword'
                    name='newPassword'
                    isRow
                    invalidFileds={invalidFileds}
                    setInvalidFileds={setInvalidFileds}
                    value={payload.newPassword}
                    setValue={setPayload}
                />
                <InputForm
                    label='Nhập lại mật khẩu'
                    id='confirmPassword'
                    name='confirmPassword'
                    isRow
                    invalidFileds={invalidFileds}
                    setInvalidFileds={setInvalidFileds}
                    value={payload.confirmPassword}
                    setValue={setPayload}
                />
                <div className='flex justify-center w-full mt-10'>
                    <Button
                        text={'Lưu & cập nhật'}
                        textStyle={'text-[17px] text-white'}
                        bgColor={'bg-[#007bff]'}
                        fullWidth
                        hover={'hover:bg-[#0069d9]'}
                        onClick={handleSubmit}
                    />
                </div>
            </div>
        </div>
    )
}

export default ChangePassword
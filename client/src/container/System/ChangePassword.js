import React, { useState } from 'react'
import { Helmet } from 'react-helmet'
import logo from '../../assets/image/homestay.png';
import { BreadCrumb, Button, InputForm } from '../../components/System';
import { validate } from '../../utils/fn';
import * as apis from '../../services/index'
import Swal from 'sweetalert2';
import icons from '../../utils/icons'
import { useNavigate } from 'react-router-dom';

const { BiArrowBack } = icons

const title = 'Đổi mật khẩu - Phòng trọ';

const ChangePassword = () => {
    const items = [
        { title: 'Trang chủ', link: '/' },
        { title: 'Quản lý', link: '/he-thong' },
        { title: 'Đổi mật khẩu' }
    ];
    const navigate = useNavigate()
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
        <div className='pc:px-8 pc:py-4 laptop:px-8 laptop:py-4 phone:px-2 phone:py-4 phone:relative tablet:px-2 tablet:py-4 tablet:relative'>
            <Helmet>
                <title>{title}</title>
                <link rel="icon" href={logo} />
            </Helmet>
            <BreadCrumb
                items={items}
            />
            <h1 className='font-[600] pc:text-[35px] laptop:text-[35px] phone:text-[25px] tablet:text-[25px] py-4 border-b border-gray-200'>Đổi mật khẩu</h1>
            <div className='pc:w-2/3 pc:mx-auto pc:gap-6 laptop:w-2/3 laptop:mx-auto laptop:gap-6 phone:w-full phone:gap-4 tablet:w-full tablet:gap-4 flex flex-col py-10'>
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
                <div className='flex justify-center w-full mt-10 phone:hidden tablet:hidden'>
                    <Button
                        text={'Lưu & cập nhật'}
                        textStyle={'text-[17px] text-white'}
                        bgColor={'bg-[#007bff]'}
                        fullWidth
                        hover={'hover:bg-[#0069d9]'}
                        onClick={handleSubmit}
                    />
                </div>
                <div className='h-[55px] fixed bottom-0 left-0 right-0 shadow-custom bg-white flex gap-2 px-4 py-2 pc:hidden laptop:hidden z-[99999]'>
                    <Button
                        text={'Quay lại'}
                        textStyle={'text-[17px] text-[#333333]'}
                        bgColor={'bg-white'}
                        fullWidth
                        iconBefore={<BiArrowBack />}
                        hover={'hover:bg-[#218838]'}
                        onClick={() => navigate(-1)}
                    />
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
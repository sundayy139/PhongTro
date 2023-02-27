import React, { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet'
import { Link } from 'react-router-dom';
import { BreadCrumb, Button, InputDisable, InputForm, Loading } from '../../components/System';
import avatar from '../../assets/image/avatar-person.png'
import { useDispatch, useSelector } from 'react-redux';
import { getNumberFromString, validate } from '../../utils/fn';
import * as apis from '../../services/index'
import Swal from 'sweetalert2';
import logo from '../../assets/image/homestay.png';
import * as actions from '../../store/actions'
import { path } from '../../utils/path';

const title = 'Cập nhật thông tin cá nhân - Phòng trọ';

const ManageProfile = ({ isEdit, setIsShow }) => {

    const items = [
        { title: 'Trang chủ', link: '/' },
        { title: 'Quản lý', link: '/he-thong' },
        { title: 'Cập nhật thông tin cá nhân' }
    ];

    const [invalidFileds, setInvalidFileds] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [userData, setUserData] = useState(null)
    const { currentUserData } = useSelector(state => state.user)
    const { dataUserEdit } = useSelector(state => state.admin)
    const [payload, setPayload] = useState({
        name: '',
        email: '',
        zalo: '',
        fbUrl: '',
        avatar: '',
        id: ''
    })
    const dispatch = useDispatch()

    useEffect(() => {
        isEdit ? setUserData(dataUserEdit) : setUserData(currentUserData)
    }, [isEdit])



    useEffect(() => {
        setPayload({
            name: userData?.name || '',
            email: userData?.email || '',
            zalo: userData?.zalo || '',
            fbUrl: userData?.fbUrl || '',
            avatar: userData?.avatar || '',
            id: userData?.id || '',
            role: userData?.role || '',
            status: userData?.status || '',
        })
    }, [userData])


    const handleSubmit = async () => {
        let invalid = validate(payload, setInvalidFileds)
        if (invalid === 0) {
            const res = await apis.apiUpdateUserProfile(payload)
            if (res?.data?.err === 0) {
                dispatch(actions.getCurrentUser())
                Swal.fire({
                    position: 'center',
                    title: 'Yeahh..!',
                    text: res?.data?.msg,
                    icon: 'success',
                    confirmButtonColor: '#3085d6',
                    confirmButtonText: 'OK'
                })
                isEdit && setIsShow(false)
                isEdit && dispatch(actions.getUsersAdmin())
            } else {
                Swal.fire({
                    position: 'center',
                    icon: 'error',
                    title: 'Oops...',
                    text: res?.data?.msg,
                    confirmButtonColor: '#3085d6',
                    confirmButtonText: 'OK'
                })
            }
        }
    }

    const handleChangeFiles = async (e) => {
        e.stopPropagation()
        setIsLoading(true)
        const file = e.target.files[0]
        const formImage = new FormData()
        formImage.append("file", file);
        formImage.append("upload_preset", process.env.REACT_APP_UPLOAD_ACCESS_NAME);

        const res = await apis.apiUploadImages(formImage)
        if (res.status === 200) {
            setPayload(prev => ({ ...prev, avatar: res?.data?.secure_url }))
            setIsLoading(false)
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
            <h1 className='font-[500] text-[35px] border-b border-gray-200 py-4'>
                {
                    isEdit ? 'Cập nhật thông tin người dùng' : 'Cập nhật thông tin cá nhân'
                }
            </h1>
            <div className='w-2/3 mx-auto flex flex-col gap-6 py-10'>
                <InputDisable
                    label='Mã thành viên'
                    id='id'
                    isRow
                    value={`#${getNumberFromString(userData?.id)}`}
                />
                <InputDisable
                    label='Số điện thoại'
                    id='phone'
                    isRow
                    value={userData?.phone}
                />
                <InputForm
                    label='Tên hiển thị'
                    id='name'
                    name='name'
                    isRow
                    invalidFileds={invalidFileds}
                    setInvalidFileds={setInvalidFileds}
                    value={payload.name}
                    setValue={setPayload}
                />
                <InputForm
                    label='Email'
                    id='email'
                    name='email'
                    isRow
                    invalidFileds={invalidFileds}
                    setInvalidFileds={setInvalidFileds}
                    value={payload.email}
                    setValue={setPayload}
                />
                <InputForm
                    label='Số Zalo'
                    id='zalo'
                    name='zalo'
                    isRow
                    invalidFileds={invalidFileds}
                    setInvalidFileds={setInvalidFileds}
                    value={payload.zalo}
                    setValue={setPayload}
                />
                <InputForm
                    label='Facebook URL'
                    id='fbUrl'
                    name='fbUrl'
                    isRow
                    invalidFileds={invalidFileds}
                    setInvalidFileds={setInvalidFileds}
                    value={payload.fbUrl}
                    setValue={setPayload}
                />
                {
                    !isEdit && (
                        <div className='text-sm w-full flex items-center'>
                            <div className='font-semibold w-[200px]'>
                                Mật khẩu
                            </div>
                            <Link
                                to={`/he-thong/${path.CHANGE_PASSWORD}`}
                                className='text-[#007bff] hover:underline'
                            >
                                Đổi mật khẩu
                            </Link>
                        </div>
                    )
                }
                {
                    isEdit && (
                        <>
                            <div className='text-sm w-full flex items-center'>
                                <div className='font-semibold w-[200px]'>
                                    Vai trò
                                </div>
                                <select
                                    className='outline-none border border-gray-300 p-2 rounded-[5px] text-sm'
                                    value={payload.role}
                                    onChange={(e) => setPayload({ ...payload, role: e.target.value })}
                                >
                                    <option
                                        value='admin'
                                    >
                                        Quản trị viên
                                    </option>
                                    <option
                                        value='user'
                                    >
                                        Người dùng
                                    </option>
                                </select>
                            </div>
                            <div className='text-sm w-full flex items-center'>
                                <div className='font-semibold w-[200px]'>
                                    Trạng thái
                                </div>
                                <select
                                    className='outline-none border border-gray-300 p-2 rounded-[5px] text-sm'
                                    value={payload.status}
                                    onChange={(e) => setPayload({ ...payload, status: e.target.value })}
                                >
                                    <option
                                        value='S4'
                                    >
                                        Đang hoạt động
                                    </option>
                                    <option
                                        value='S5'
                                    >
                                        Ngừng hoạt động
                                    </option>
                                </select>
                            </div>
                        </>

                    )
                }
                <div className='text-sm w-full flex items-center'>
                    <div className='font-semibold w-[200px] flex-none'>
                        Ảnh đại diện
                    </div>
                    <div className='flex flex-col gap-4 items-center'>
                        <div className='w-[140px] h-[140px] rounded-full border-[5px] border-[#fafafa] overflow-hidden flex items-center justify-center'>
                            {
                                isLoading ? (
                                    <Loading />
                                ) : (
                                    <img
                                        src={payload.avatar || avatar}
                                        className='w-full h-full object-cover'
                                    />
                                )
                            }
                        </div>
                        <div className=''>
                            <label
                                className='px-5 py-2 bg-[#f5f5f5] rounded-md cursor-pointer font-semibold'
                                htmlFor='avatar'
                            >
                                Chọn ảnh
                            </label>
                            <input
                                id='avatar'
                                type='file'
                                hidden
                                onChange={handleChangeFiles}
                            />
                        </div>
                    </div>
                    <small className='text-[10px] text-red-500'>
                        {
                            invalidFileds?.some(item => item.name === 'image') && invalidFileds?.find(item => item.name === 'image')?.message
                        }
                    </small>
                </div>
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

export default ManageProfile
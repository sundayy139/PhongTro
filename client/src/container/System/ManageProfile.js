import React, { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet'
import { Link, useNavigate } from 'react-router-dom';
import { BreadCrumb, Button, InputDisable, InputForm, Loading } from '../../components/System';
import avatar from '../../assets/image/avatar-person.png'
import { useDispatch, useSelector } from 'react-redux';
import { getNumberFromString, validate } from '../../utils/fn';
import * as apis from '../../services/index'
import Swal from 'sweetalert2';
import logo from '../../assets/image/homestay.png';
import * as actions from '../../store/actions'
import { path } from '../../utils/path';
import icons from '../../utils/icons'

const { BiArrowBack } = icons

const ManageProfile = ({ isEdit, setIsShow }) => {

    const items = [
        { title: 'Trang chủ', link: '/' },
        { title: 'Quản lý', link: '/he-thong' },
        { title: isEdit ? 'Cập nhật thông tin người dùng' : 'Cập nhật thông tin cá nhân' }
    ];
    const navigate = useNavigate()
    const [invalidFileds, setInvalidFileds] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [title, setTitle] = useState([])
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
    }, [isEdit, currentUserData])


    useEffect(() => {
        setPayload({
            name: userData?.name || '',
            email: userData?.email || '',
            zalo: userData?.zalo || '',
            fbUrl: userData?.fbUrl || '',
            avatar: userData?.avatar || '',
            id: userData?.id || '',
            role: userData?.role || '',
            status: userData?.status || 'S4',
        })
    }, [userData])

    useEffect(() => {
        isEdit ? setTitle('Chỉnh sửa thông tin người dùng - Phòng trọ') : setTitle('Cập nhật thông tin cá nhân - Phòng trọ')
    }, [isEdit])



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
        <div className='pc:px-8 pc:py-4 laptop:px-8 laptop:py-4 phone:px-2 phone:py-4 phone:relative tablet:px-2 tablet:py-4 tablet:relative'>
            <Helmet>
                <title>{title}</title>
                <link rel="icon" href={logo} />
            </Helmet>
            <BreadCrumb
                items={items}
            />
            <h1 className='font-[600] pc:text-[35px] laptop:text-[35px] phone:text-[25px] tablet:text-[25px] py-4 border-b border-gray-200'>
                {
                    isEdit ? 'Cập nhật thông tin người dùng' : 'Cập nhật thông tin cá nhân'
                }
            </h1>
            <div className='pc:w-2/3 pc:mx-auto pc:gap-6 pc:py-10 laptop:w-2/3 laptop:mx-auto laptop:gap-6 laptop:py-10 phone:w-full phone:gap-4 phone:py-4 tablet:w-full tablet:gap-4 tablet:py-4 flex flex-col bg-white rounded-[5px] phone:px-2 tablet:px-2'>
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
                        <div className='flex gap-4 items-center text-sm'>
                            <div className='font-semibold pc:w-[200px] laptop:w-[200px] phone:w-[100px] tablet:w-[100px]'>
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
                                <div className='font-semibold pc:w-[200px] laptop:w-[200px] phone:w-[100px] tablet:w-[100px]'>
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
                                <div className='font-semibold pc:w-[200px] laptop:w-[200px] phone:w-[100px] tablet:w-[100px]'>
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
                <div className='text-sm w-full flex pc:items-center laptop:items-center phone:flex-col phone:gap-2 tablet:flex-col tablet:gap-2'>
                    <div className='font-semibold pc:w-[200px] pc:flex-none laptop:w-[200px] laptop:flex-none'>
                        Ảnh đại diện
                    </div>
                    <div className='flex flex-col gap-4 items-center '>
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

export default ManageProfile
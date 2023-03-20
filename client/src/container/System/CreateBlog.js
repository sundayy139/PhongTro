import React, { useState } from 'react'
import logo from '../../assets/image/homestay.png';
import { Helmet } from 'react-helmet'
import { BreadCrumb, Button, InputForm, Loading, RichEdittor } from '../../components/System';
import { validate } from '../../utils/fn';
import * as apis from '../../services/index'
import Swal from 'sweetalert2';
import { useDispatch, useSelector } from 'react-redux';
import * as actions from '../../store/actions'

const title = 'Tạo mới Blog - Phòng trọ';

const CreateBlog = ({ isEdit, setIsShow }) => {
    const items = [
        { title: 'Trang chủ', link: '/' },
        { title: 'Quản lý', link: '/he-thong' },
        { title: isEdit ? 'Chỉnh sửa blog' : 'Tạo mới blog' }
    ];
    const [invalidFileds, setInvalidFileds] = useState([])
    const { dataBlogEdit } = useSelector(state => state.admin)
    const [isLoading, setIsLoading] = useState(false)
    const [payload, setPayload] = useState({
        descHTML: dataBlogEdit?.descHTML ? dataBlogEdit.descHTML : "",
        title: dataBlogEdit?.title ? dataBlogEdit.title : "",
        image: dataBlogEdit?.image ? dataBlogEdit.image : "",
    })
    const dispatch = useDispatch()
    const { flag } = useSelector(state => state.app)



    const handleChangeFiles = async (e) => {
        e.stopPropagation()
        setIsLoading(true)
        const file = e.target.files[0]
        const formImage = new FormData()
        formImage.append("file", file);
        formImage.append("upload_preset", process.env.REACT_APP_UPLOAD_ACCESS_NAME);

        const res = await apis.apiUploadImages(formImage)
        if (res.status === 200) {
            setPayload(prev => ({ ...prev, image: res?.data?.secure_url }))
            setIsLoading(false)
        }
    }

    const handleSubmit = async () => {
        let invalid = validate(payload, setInvalidFileds)
        if (invalid === 0) {
            if (dataBlogEdit && isEdit) {
                let finalPayload = {
                    ...payload,
                    id: dataBlogEdit.id
                }
                const res = await apis.apiUpdateBlogAdmin(finalPayload)
                if (res?.data?.err === 0) {
                    dispatch(actions.setFlag(!flag))
                    dispatch(actions.clearDataBlogEdit())
                    Swal.fire({
                        title: 'Yeahh..!',
                        text: res?.data?.msg,
                        icon: 'success',
                        confirmButtonColor: '#3085d6',
                        confirmButtonText: 'OK'
                    }).then((result) => {
                        if (result.isConfirmed) {
                            setIsShow(false)
                        }
                    })
                } else {
                    Swal.fire({
                        position: 'center',
                        icon: 'error',
                        title: 'Oops...',
                        text: res?.data?.msg,
                        showConfirmButton: false,
                        timer: 2000
                    })
                }
            } else {
                const res = await apis.apiCreateBlog(payload)
                if (res?.data?.err === 0) {
                    setPayload({
                        descHTML: "",
                        title: "",
                        image: ""
                    })
                    Swal.fire({
                        position: 'center',
                        icon: 'success',
                        title: 'Yeah...',
                        text: res?.data?.msg,
                        showConfirmButton: false,
                        timer: 2000
                    })
                } else {
                    Swal.fire({
                        position: 'center',
                        icon: 'error',
                        title: 'Oops...',
                        text: res?.data?.msg,
                        showConfirmButton: false,
                        timer: 2000
                    })
                }
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
            <h1 className='font-[500] text-[35px] border-b border-gray-200 py-4'>
                {
                    isEdit ? 'Chỉnh sửa blog' : 'Tạo mới blog'
                }
            </h1>
            <div className='py-4 flex flex-col gap-20'>
                <div className='flex flex-col gap-10 w-full'>
                    <div className='flex gap-10 items-start'>
                        <InputForm
                            label={"Tiêu đề"}
                            name={'title'}
                            id='title'
                            value={payload.title}
                            setValue={setPayload}
                            invalidFileds={invalidFileds}
                            setInvalidFileds={setInvalidFileds}
                        />
                        <div className='text-sm w-full flex flex-col gap-2'>
                            <span className='font-semibold'>
                                Ảnh hiển thị
                            </span>
                            <div className='flex mt-1 flex-col gap-4 items-center border border-[#d1d5db] rounded-[5px]'>
                                {
                                    payload.image && (
                                        <div className='w-[140px] h-[140px] overflow-hidden flex items-center justify-center mt-4'>
                                            {
                                                isLoading ? (
                                                    <Loading />
                                                ) : (
                                                    <img
                                                        src={payload.image}
                                                        className='w-full h-full rounded-[5px] object-cover'
                                                    />
                                                )
                                            }
                                        </div>
                                    )
                                }
                                <div className='h-full w-full'>
                                    <label
                                        className='px-5 py-2 inline-block bg-[#f5f5f5] rounded-md cursor-pointer w-full text-center hover:underline'
                                        htmlFor='image'
                                    >
                                        Chọn ảnh
                                    </label>
                                    <input
                                        id='image'
                                        type='file'
                                        hidden
                                        onChange={handleChangeFiles}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='text-sm flex flex-col gap-2'>
                        <span className='font-semibold'>Mô tả chi tiết</span>
                        <RichEdittor
                            payload={payload}
                            setPayload={setPayload}
                        />
                        <small className='text-[10px] text-red-500'>
                            {
                                invalidFileds?.some(item => item.name === 'descHTML') && invalidFileds?.find(item => item.name === 'descHTML')?.message
                            }
                        </small>
                    </div>
                </div>
                <div className='flex justify-center'>
                    {
                        isEdit ? (
                            <Button
                                text={'Cập nhật'}
                                textStyle={'text-[17px] text-white'}
                                bgColor={'bg-[#28a745]'}
                                fullWidth
                                hover={'hover:bg-[#218838]'}
                                onClick={handleSubmit}
                            />
                        ) : (
                            <Button
                                text={'Xác nhận'}
                                textStyle={'text-[17px] text-white'}
                                bgColor={'bg-[#28a745]'}
                                fullWidth
                                hover={'hover:bg-[#218838]'}
                                onClick={handleSubmit}
                            />
                        )
                    }
                </div>
            </div>
        </div>
    )
}

export default CreateBlog
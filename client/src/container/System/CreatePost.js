import React, { useEffect } from 'react'
import { Helmet } from 'react-helmet';
import { Address, BreadCrumb, Description, Loading } from '../../components/System/index'
import uploadImg from '../../assets/image/upload-image.png'
import { useState } from 'react';
import { Button } from '../../components/System/index';
import * as apis from '../../services/index'
import icons from '../../utils/icons'
import { useDispatch, useSelector } from 'react-redux';
import { getCode, validate } from '../../utils/fn';
import Swal from 'sweetalert2'
import logo from '../../assets/image/homestay.png';
import * as actions from '../../store/actions'
import { Map } from '../../components/Public';
import { useNavigate } from 'react-router-dom';


const { BsTrashFill, BiArrowBack } = icons


const CreatePost = ({ isEdit, setIsShow }) => {
    const { prices, acreages, categories } = useSelector(state => state.app)
    const { dataEdit } = useSelector(state => state.post)
    const navigate = useNavigate()
    const [payload, setPayload] = useState(() => {
        const initialData = {
            address: dataEdit?.addressPostData ? `${dataEdit?.addressPostData?.value}, ${dataEdit?.wardPostData?.value}, ${dataEdit?.districtPostData?.value}, ${dataEdit?.provincePostData?.value}` : '',
            categoryCode: dataEdit?.categoryCode ? dataEdit.categoryCode : '',
            title: dataEdit?.title ? dataEdit.title : '',
            priceNumber: dataEdit?.priceNumber ? dataEdit.priceNumber * Math.pow(10, 6) : '',
            acreageNumber: dataEdit?.acreageNumber ? dataEdit.acreageNumber : '',
            priceCode: dataEdit?.priceCode ? dataEdit.priceCode : '',
            acreageCode: dataEdit?.acreageCode ? dataEdit.acreageCode : '',
            images: dataEdit?.imagesData?.images ? JSON.parse(dataEdit.imagesData.images) : '',
            description: dataEdit?.description ? JSON.parse(dataEdit?.description).join("\n") : '',
            target: dataEdit?.target ? dataEdit.target : '',
            expired: dataEdit?.expiredAt
                ? (new Date(Math.abs(new Date(dataEdit?.expiredAt) - new Date(dataEdit?.createdAt))).getDate() - 1)
                : ''
        }
        return initialData
    })

    const [invalidFileds, setInvalidFileds] = useState([])
    const [imagesPreview, setImagesPreview] = useState([])
    const [title, setTitle] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const dispatch = useDispatch()
    const { flag } = useSelector(state => state.app)

    const handleSubmit = async () => {
        let priceCodeArr = getCode((payload.priceNumber / Math.pow(10, 6)), prices, 'price', 1, 15)
        let acreageCodeArr = getCode(payload.acreageNumber, acreages, 'acreage', 20, 90)
        let priceCode = priceCodeArr[0]?.code
        let acreageCode = acreageCodeArr[0]?.code
        let arrProvinceString = payload.address?.split(', ')

        let finalPayload = {
            ...payload,
            priceCode: priceCode,
            acreageCode: acreageCode,
            label: `${categories?.find(item => item.code = payload?.categoryCode)?.value} ${payload?.address?.split(', ')[payload?.address?.split(',')?.length - 2]}`,
            province: arrProvinceString[arrProvinceString?.length - 1].includes('Thành phố')
                ? arrProvinceString[arrProvinceString?.length - 1].replace('Thành phố ', '')
                : arrProvinceString[arrProvinceString?.length - 1].replace('Tỉnh ', ''),
        }

        let invalid = validate(finalPayload, setInvalidFileds)

        if (invalid === 0) {
            if (dataEdit && isEdit) {
                finalPayload.postId = dataEdit.id
                const res = await apis.apiUpdatePost(finalPayload)
                if (res?.data?.err === 0) {
                    dispatch(actions.setFlag(!flag))
                    dispatch(actions.clearDataEdit())
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
                const res = await apis.apiCreateNewPost(finalPayload)
                if (res?.data?.err === 0) {
                    setPayload({
                        address: '',
                        categoryCode: '',
                        title: '',
                        priceNumber: '',
                        acreageNumber: '',
                        priceCode: '',
                        acreageCode: '',
                        images: '',
                        description: '',
                        target: '',
                        expired: ''
                    })
                    setImagesPreview([])
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

    const handleChangeFiles = async (e) => {
        e.stopPropagation()
        setIsLoading(true)
        let images = []
        const files = e.target.files
        const formImage = new FormData()
        for (let i = 0; i < files.length; i++) {
            let file = files[i];
            formImage.append("file", file);
            formImage.append("upload_preset", process.env.REACT_APP_UPLOAD_ACCESS_NAME);

            const res = await apis.apiUploadImages(formImage)
            if (res.status === 200) {
                images.push(res?.data?.secure_url)
            }
        }
        setIsLoading(false)
        setImagesPreview(prev => [...prev, ...images])
        setPayload(prev => ({ ...prev, images: [...payload.images, ...images] }))
    }

    const handleRemoveImage = (image) => {
        Swal.fire({
            title: 'Xóa ảnh này?',
            text: "Bạn sẽ không thể hoàn tác sau khi xóa!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes'
        }).then((result) => {
            if (result.isConfirmed) {
                setImagesPreview(prev => prev?.filter(item => item !== image))
                setPayload(prev => ({ ...prev, images: prev.images?.filter(item => item !== image) }))
                Swal.fire(
                    'Deleted!',
                    'Xóa ảnh thành công',
                    'success'
                )
            }
        })
    }

    useEffect(() => {
        if (dataEdit) {
            let images = dataEdit?.imagesData?.images && JSON.parse(dataEdit?.imagesData?.images)
            images && setImagesPreview(images)
        }
    }, [dataEdit])

    useEffect(() => {
        dataEdit ? setTitle('Chỉnh sửa tin - Phòng trọ') : setTitle('Đăng tin mới - Phòng trọ')
    }, [dataEdit])



    const items = [
        { title: 'Trang chủ', link: '/' },
        { title: 'Quản lý', link: '/he-thong' },
        { title: isEdit ? 'Chỉnh sửa tin' : 'Đăng tin mới' }
    ];

    useEffect(() => {
        if (isEdit === undefined) {
            dispatch(actions.clearDataEdit())
            setPayload({
                address: '',
                categoryCode: '',
                title: '',
                priceNumber: '',
                acreageNumber: '',
                priceCode: '',
                acreageCode: '',
                images: '',
                description: '',
                target: '',
                expired: ''
            })
            setImagesPreview([])
        }
    }, [isEdit])


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
                    !isEdit ? 'Đăng tin mới' : "Chỉnh sửa tin"
                }
            </h1>
            <div className='py-4 flex pc:gap-10 laptop:gap-10 phone:flex-col tablet:flex-col phone:mb-10 tablet:mb-10'>
                <div className='flex flex-col pc:gap-14 laptop:gap-14 phone:gap-5 tablet:gap-5 flex-auto mb-10'>
                    <Address
                        payload={payload}
                        setPayload={setPayload}
                        invalidFileds={invalidFileds}
                        setInvalidFileds={setInvalidFileds}
                    />
                    <Description
                        payload={payload}
                        setPayload={setPayload}
                        invalidFileds={invalidFileds}
                        setInvalidFileds={setInvalidFileds}
                    />
                    <div className='flex flex-col w-full gap-4 phone:px-2 phone:py-4 phone:bg-white phone:rounded-[5px]'>
                        <h2 className='font-semibold pc:text-2xl laptop:text-2xl phone:text-xl tablet:text-xl'>Hình ảnh</h2>
                        <p className='text-sm'>Cập nhật hình ảnh rõ ràng sẽ cho thuê nhanh hơn</p>
                        <div className='w-full border-[2px] border-dashed rounded-md h-[200px] text-sm'>
                            <label
                                className='flex flex-col gap-2 w-full h-full items-center justify-center cursor-crosshair'
                                htmlFor='file'
                            >
                                <div className='w-[90px] h-[90px] flex items-center justify-center'>
                                    {
                                        isLoading ? (
                                            <Loading />
                                        ) : (
                                            <div className='flex flex-col items-center justify-center gap-2'>
                                                <img
                                                    src={uploadImg}
                                                    className="w-full h-full object-contain"
                                                    alt='upload-img'
                                                />
                                                <label>
                                                    Thêm ảnh
                                                </label>
                                            </div>
                                        )
                                    }
                                </div>
                            </label>
                            <input
                                onFocus={() => setInvalidFileds([])}
                                type="file"
                                id='file'
                                multiple
                                hidden
                                onChange={handleChangeFiles}
                            />
                            <small className='text-[10px] text-red-500'>
                                {
                                    invalidFileds?.some(item => item.name === 'images') && invalidFileds?.find(item => item.name === 'images')?.message
                                }
                            </small>
                        </div>
                    </div>
                    {
                        imagesPreview?.length > 0 && (
                            <div className='flex flex-col gap-4'>
                                <h3 className='text-sm font-semibold'>Ảnh chọn</h3>
                                <div className='flex w-full gap-4 flex-wrap'>
                                    {
                                        imagesPreview?.map((item, i) => (
                                            <div
                                                className='w-[calc((100%-64px)/5)] h-[100px] relative'
                                                key={i}
                                            >
                                                <img
                                                    src={item}
                                                    className="w-full h-full object-contain"
                                                />
                                                <span
                                                    className='absolute top-0 right-0 p-2 bg-secondary rounded-full cursor-pointer hover:opacity-80'
                                                    title='Xóa ảnh này'
                                                    onClick={() => handleRemoveImage(item)}
                                                >
                                                    <BsTrashFill size={10} color='white' />
                                                </span>
                                            </div>
                                        ))
                                    }
                                </div>
                            </div>
                        )
                    }
                    <div className='flex justify-center phone:hidden tablet:hidden'>
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
                    {
                        isEdit ? (
                            <Button
                                text={'Cập nhật'}
                                textStyle={'text-[17px] text-white'}
                                bgColor={'bg-[#28a745]'}
                                fullWidth
                                iconBefore
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
                <div className='w-[30%] flex flex-col gap-5 flex-auto mb-[50px] phone:hidden tablet:hidden'>
                    <div className='w-full h-[400px]'>
                        <Map
                            address={payload.address}
                        />
                    </div>
                    <div className='w-full p-[17px] rounded-[5px] text-sm text-[#856404] bg-[#fff3cd]'>
                        <h3 className='text-[21px] font-semibold mb-4'>Lưu ý khi đăng tin</h3>
                        <ul className='list-disc pl-4 flex flex-col gap-2'>
                            <li>
                                Nội dung phải viết bằng tiếng Việt có dấu
                            </li>
                            <li>
                                Tiêu đề tin không dài quá 100 kí tự
                            </li>
                            <li>
                                Các bạn nên điền đầy đủ thông tin vào các mục để tin đăng có hiệu quả hơn.
                            </li>
                            <li>
                                Tin đăng có hình ảnh rõ ràng sẽ được xem và gọi gấp nhiều lần so với tin rao không có ảnh. Hãy đăng ảnh để được giao dịch nhanh chóng!
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CreatePost
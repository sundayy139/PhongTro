import React, { useState } from 'react'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Select, InputDisable, InputForm } from './index'
import * as apis from '../../services'

const Description = ({ payload, setPayload, invalidFileds, setInvalidFileds, isEdit }) => {
    const { categories } = useSelector(state => state.app)
    const { currentUserData } = useSelector(state => state.user)
    const { dataEdit } = useSelector(state => state.post)
    const [categoryCode, setCategoryCode] = useState(payload?.categoryCode)
    const [targetCode, setTargetCode] = useState(payload?.target)
    const [typeCode, setTypeCode] = useState(payload?.type)
    const [priceList, setPriceList] = useState([])

    useEffect(() => {
        setPayload((prev) => ({
            ...prev,
            categoryCode: categoryCode,
            target: targetCode,
            type: typeCode
        }))
    }, [categoryCode, targetCode, typeCode])

    useEffect(() => {
        payload.categoryCode === undefined || payload.categoryCode === '' && setCategoryCode('')
        payload.target === undefined || payload.target === '' && setTargetCode('')
    }, [payload.categoryCode, payload.target])

    useEffect(() => {
        payload.categoryCode === undefined || payload.categoryCode === '' && setCategoryCode('')
        payload.type === undefined || payload.type === '' && setTypeCode('')
    }, [payload.categoryCode, payload.type])

    const targets = [
        { id: 1, code: 'Tất cả', value: 'Tất cả' },
        { id: 2, code: 'Nam', value: 'Nam' },
        { id: 3, code: 'Nữ', value: 'Nữ' },
    ]

    useEffect(() => {
        const fetchPriceList = async () => {
            const res = await apis.apiGetPriceList()
            if (res?.data?.err === 0) {
                setPriceList(res?.data?.listPrice)
            }
        }

        fetchPriceList()
    }, [])

    return (
        <div className='flex flex-col w-full pc:gap-9 laptop:gap-9 phone:gap-4 phone:px-2 phone:py-4 phone:bg-white phone:rounded-[5px] tablet:gap-4'>
            <h2 className='font-semibold text-2xl'>Thông tin mô tả</h2>
            <div className='pc:w-[50%] laptop:w-[50%] phone:w-ful tablet:w-full'>
                <Select
                    label={"Loại danh mục"}
                    options={categories}
                    type={'categoryCode'}
                    value={categoryCode}
                    setValue={setCategoryCode}
                    invalidFileds={invalidFileds}
                    setInvalidFileds={setInvalidFileds}
                />
            </div>
            <div className='flex flex-col gap-2 w-full text-sm'>
                <InputForm
                    label={"Tiêu đề"}
                    name={'title'}
                    id='title'
                    value={payload.title}
                    setValue={setPayload}
                    invalidFileds={invalidFileds}
                    setInvalidFileds={setInvalidFileds}
                />
            </div>
            <div className='flex flex-col gap-2 w-full text-sm'>
                <label htmlFor='desc' className='font-semibold'>
                    Nội dung mô tả
                </label>
                <textarea
                    onFocus={() => setInvalidFileds([])}
                    rows={10}
                    required
                    type='text'
                    id='desc'
                    className='outline-none border border-gray-300 p-2 rounded-[5px] phone:font-semibold phone:text-[#007aff] phone:bg-[#e7f0fe] tablet:font-semibold tablet:text-[#007aff] tablet:bg-[#e7f0fe]'
                    value={payload.description}
                    onChange={(e) => setPayload(prev => ({ ...prev, description: e.target.value }))}
                />
                <small className='text-[10px] text-red-500'>
                    {
                        invalidFileds?.some(item => item.name === 'description') && invalidFileds?.find(item => item.name === 'description')?.message
                    }
                </small>
            </div>
            <div className='pc:w-[50%] laptop:w-[50%] phone:w-ful tablet:w-full flex flex-col pc:gap-9 laptop:gap-9 phone:gap-4 tablet:gap-4'>
                <InputDisable
                    label={"Thông tin liên hệ"}
                    value={dataEdit && Object.entries(dataEdit)?.length > 0 ? dataEdit?.userData?.name : currentUserData?.name}
                />

                <InputDisable
                    label={"Số điện thoại"}
                    value={dataEdit && Object.entries(dataEdit)?.length > 0 ? dataEdit?.userData?.phone : currentUserData?.phone}
                />
                <div>
                    <InputForm
                        label={"Giá cho thuê"}
                        name={'priceNumber'}
                        value={payload.priceNumber}
                        setValue={setPayload}
                        symbol={"đồng"}
                        id='priceNumber'
                        invalidFileds={invalidFileds}
                        setInvalidFileds={setInvalidFileds}
                    />
                    <small className='text-[11px]'>
                        Nhập đầy đủ số, ví dụ 1 triệu thì nhập là 1000000
                    </small>
                </div>
                <InputForm
                    label={"Diện tích"}
                    name={'acreageNumber'}
                    value={payload.acreageNumber}
                    setValue={setPayload}
                    symbol={"m2"}
                    id='acreageNumber'
                    invalidFileds={invalidFileds}
                    setInvalidFileds={setInvalidFileds}
                />
                <div className='flex flex-col gap-2 w-full text-sm'>
                    <label htmlFor='select-address' className='font-semibold'>
                        Loại tin
                    </label>
                    <select
                        value={typeCode || ''}
                        disabled={isEdit ? true : false}
                        className='outline-none border border-gray-300 p-2 rounded-[5px] phone:font-semibold phone:text-[#007aff] phone:bg-[#e7f0fe] tablet:font-semibold tablet:text-[#007aff] tablet:bg-[#e7f0fe]'
                        onChange={(e) => setTypeCode(e.target.value)}
                    >
                        <option
                            value=''
                        >
                            --Chọn loại tin--
                        </option>
                        {
                            priceList?.map(item => (
                                <option
                                    key={item?.id}
                                    value={item?.id}
                                >
                                    {`${item.title} (${item?.price} đồng/ngày)`}
                                </option>
                            ))
                        }
                    </select>
                    <small className='text-[10px] text-red-500'>
                        {
                            invalidFileds?.some(item => item.name === 'type') && invalidFileds?.find(item => item.name === 'type')?.message
                        }
                    </small>
                </div>
                <InputForm
                    disabled={isEdit ? true : false}
                    label={"Số ngày hiển thị tin"}
                    name={'expired'}
                    id='expired'
                    value={payload.expired}
                    setValue={setPayload}
                    invalidFileds={invalidFileds}
                    setInvalidFileds={setInvalidFileds}
                />
            </div>
            <div className='pc:w-[50%] laptop:w-[50%] phone:w-ful tablet:w-full'>
                <Select
                    label={"Đối tượng cho thuê"}
                    options={targets}
                    type={'target'}
                    value={targetCode}
                    setValue={setTargetCode}
                    invalidFileds={invalidFileds}
                    setInvalidFileds={setInvalidFileds}
                />
            </div>
        </div>
    )
}

export default Description
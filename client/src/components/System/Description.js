import React, { useState } from 'react'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Select, InputDisable, InputForm } from './index'

const Description = ({ payload, setPayload, invalidFileds, setInvalidFileds }) => {
    const { categories } = useSelector(state => state.app)
    const { currentUserData } = useSelector(state => state.user)
    const { dataEdit } = useSelector(state => state.post)
    const [categoryCode, setCategoryCode] = useState(payload?.categoryCode)
    const [targetCode, setTargetCode] = useState(payload?.target)

    useEffect(() => {
        setPayload((prev) => ({
            ...prev,
            categoryCode: categoryCode,
            target: targetCode
        }))
    }, [categoryCode, targetCode])

    useEffect(() => {
        payload.categoryCode === undefined || payload.categoryCode === '' && setCategoryCode('')
        payload.target === undefined || payload.target === '' && setTargetCode('')
    }, [payload.categoryCode, payload.target])

    const targets = [
        { id: 1, code: 'Tất cả', value: 'Tất cả' },
        { id: 2, code: 'Nam', value: 'Nam' },
        { id: 3, code: 'Nữ', value: 'Nữ' },
    ]

    return (
        <div className='flex flex-col gap-9'>
            <h2 className='font-semibold text-2xl'>Thông tin mô tả</h2>
            <div className='w-[50%]'>
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
                    className='outline-none border border-gray-300 p-2 rounded-[5px]'
                    value={payload.description}
                    onChange={(e) => setPayload(prev => ({ ...prev, description: e.target.value }))}
                />
                <small className='text-[10px] text-red-500'>
                    {
                        invalidFileds?.some(item => item.name === 'description') && invalidFileds?.find(item => item.name === 'description')?.message
                    }
                </small>
            </div>
            <div className='w-[50%] flex flex-col gap-9'>
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

                <InputForm
                    label={"Số ngày hiển thị tin"}
                    name={'expired'}
                    id='expired'
                    value={payload.expired}
                    setValue={setPayload}
                    invalidFileds={invalidFileds}
                    setInvalidFileds={setInvalidFileds}
                />
            </div>
            <div className='w-[50%]'>
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
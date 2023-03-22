import React, { useEffect, useState } from 'react'
import { Select, InputDisable } from './index'
import * as apis from '../../services/appService'
import { memo } from 'react'
import { useSelector } from 'react-redux'
import { Map } from '../Public'

const Address = ({ payload, setPayload, invalidFileds, setInvalidFileds }) => {

    const { dataEdit } = useSelector(state => state.post)

    const [provinces, setProvinces] = useState([])
    const [provinceId, setProvinceId] = useState('')
    const [districts, setDistricts] = useState([])
    const [districtId, setDistrictId] = useState('')
    const [wards, setWards] = useState([])
    const [wardId, setWardId] = useState('')
    const [address, setAddress] = useState(dataEdit ? dataEdit?.addressPostData?.value : '')
    const [ward, setWard] = useState(dataEdit ? dataEdit?.wardPostData?.value : '')
    const [district, setDistrict] = useState(dataEdit ? dataEdit?.districtPostData?.value : '')
    const [province, setProvince] = useState(dataEdit ? dataEdit?.provincePostData?.value : '')

    useEffect(() => {
        const fetchPublicProvince = async () => {
            const res = await apis.apiGetProvincesPublic()
            if (res.status === 200) {
                setProvinces(res?.data?.results)
            }
        }
        fetchPublicProvince()
    }, [])

    useEffect(() => {
        if (dataEdit) {
            let foundProvince = dataEdit?.provincePostData?.value && provinces?.find(item => item?.province_name.includes(province))
            setProvinceId(foundProvince ? foundProvince.province_id : '')
        }
    }, [provinces])

    useEffect(() => {
        if (dataEdit) {
            let foundDistrict = dataEdit?.districtPostData?.value && districts?.find(item => item?.district_name.includes(district))
            setDistrictId(foundDistrict ? foundDistrict.district_id : '')
        }
    }, [districts])

    useEffect(() => {
        if (dataEdit) {
            let foundWard = dataEdit?.wardPostData?.value && wards?.find(item => item?.ward_name.includes(ward))
            setWardId(foundWard ? foundWard.ward_id : '')
        }
    }, [wards])

    useEffect(() => {
        setDistrictId(null)
        const fetchPublicDistrict = async (provinceId) => {
            const res = await apis.apiGetDistrictPublic(provinceId)
            if (res.status === 200) {
                setDistricts(res?.data?.results)
            }
        }
        provinceId && fetchPublicDistrict(provinceId)
        !provinceId && setDistricts([]) && setWards([])
    }, [provinceId])

    useEffect(() => {
        setWardId(null)
        const fetchPublicWard = async (districtId) => {
            const res = await apis.apiGetWardPublic(districtId)
            if (res.status === 200) {
                setWards(res?.data?.results)
            }
        }
        districtId && fetchPublicWard(districtId)
        !districtId && setWards([])
    }, [districtId])

    useEffect(() => {
        setPayload((prev) => ({
            ...prev,
            address: `${address ? `${address}, ` : ''}${wardId ? `${wards?.find(item => item.ward_id === wardId)?.ward_name}, ` : ''}${districtId ? `${districts?.find(item => item.district_id === districtId)?.district_name}, ` : ''}${provinceId ? provinces?.find(item => item.province_id === provinceId)?.province_name : ''}`,
            province: provinceId ? provinces?.find(item => item?.province_id === provinceId)?.province_name : ''
        }))
    }, [provinceId, districtId, wardId, address])

    useEffect(() => {
        payload.address === '' && setProvinceId(null)
    }, [payload.address])


    return (
        <div className='flex flex-col w-full pc:gap-9 laptop:gap-9 phone:gap-4 phone:px-2 phone:py-4 phone:bg-white phone:rounded-[5px] tablet:gap-4'>
            <h2 className='font-semibold pc:text-2xl laptop:text-2xl phone:text-xl tablet:text-xl'>Địa chỉ cho thuê</h2>
            <div className='flex gap-[2%] flex-wrap'>
                <div className='pc:w-[32%] laptop:w-[32%] phone:w-full tablet:w-full'>
                    <Select
                        value={provinceId}
                        setValue={setProvinceId}
                        label={"Tỉnh/Thành phố"}
                        options={provinces}
                        type="province"
                        invalidFileds={invalidFileds}
                        setInvalidFileds={setInvalidFileds}
                    />
                </div>
                <div className='pc:w-[32%] laptop:w-[32%] phone:w-full tablet:w-full'>
                    <Select
                        value={districtId}
                        setValue={setDistrictId}
                        label={"Quận/Huyện"}
                        options={districts}
                        type="district"
                        invalidFileds={invalidFileds}
                        setInvalidFileds={setInvalidFileds}
                    />
                </div>
                <div className='pc:w-[32%] laptop:w-[32%] phone:w-full tablet:w-full'>
                    <Select
                        value={wardId}
                        setValue={setWardId}
                        label={"Phường/Xã"}
                        type="ward"
                        options={wards}
                        invalidFileds={invalidFileds}
                        setInvalidFileds={setInvalidFileds}
                    />
                </div>
            </div>
            <div className='flex flex-col gap-2 pc:w-[66%] laptop:w-[66%] phone:w-full tablet:w-full text-sm'>
                <label htmlFor="address" className='font-semibold'>
                    Địa chỉ cụ thể
                </label>
                <input
                    required
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    type='text'
                    id='address'
                    className='outline-none border border-gray-300 p-2 rounded-[5px] phone:font-semibold phone:text-[#007aff] phone:bg-[#e7f0fe]'
                    placeholder='Số nhà, tên đường'
                />
            </div>
            <div className='w-full'>
                <InputDisable
                    label={"Địa chỉ chính xác"}
                    value={
                        `${address ? `${address},` : ''} ${wardId ? `${wards?.find(item => item.ward_id === wardId)?.ward_name},` : ''} ${districtId ? `${districts?.find(item => item.district_id === districtId)?.district_name},` : ''} ${provinceId ? provinces?.find(item => item.province_id === provinceId)?.province_name : ''}`
                    }
                />
            </div>
            <div className='w-full flex flex-col gap-2 h-[400px] pc:hidden laptop:hidden'>
                <label className='text-sm font-semibold'>
                    Bản đồ
                </label>
                <Map
                    address={payload.address}
                />
            </div>
        </div >
    )
}

export default memo(Address)
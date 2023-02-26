import React, { useEffect, useState } from 'react'
import { Select, InputDisable } from './index'
import * as apis from '../../services/appService'
import { memo } from 'react'
import { useSelector } from 'react-redux'

const Address = ({ payload, setPayload, invalidFileds, setInvalidFileds }) => {

    const { dataEdit } = useSelector(state => state.post)


    const [provinces, setProvinces] = useState([])
    const [provinceId, setProvinceId] = useState('')
    const [districts, setDistricts] = useState([])
    const [districtId, setDistrictId] = useState('')
    const [wards, setWards] = useState([])
    const [wardId, setWardId] = useState('')
    const [address, setAddress] = useState(() => {
        let addressArr = dataEdit?.address?.split(", ")
        return addressArr && addressArr[addressArr?.length - 4] || ''
    })

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
            let addressArr = dataEdit?.address?.split(", ")
            let foundProvince = addressArr && provinces?.length > 0 && provinces?.find(item => item?.province_name.includes(addressArr[addressArr?.length - 1]))?.province_id
            setProvinceId(foundProvince ? foundProvince : '')
        }
    }, [provinces])


    useEffect(() => {
        if (dataEdit) {
            let addressArr = dataEdit?.address?.split(", ")
            let foundDistrict = addressArr && districts?.length > 0 && districts?.find(item => item?.district_name === addressArr[addressArr?.length - 2])?.district_id
            setDistrictId(foundDistrict ? foundDistrict : '')
        }
    }, [districts])

    useEffect(() => {
        if (dataEdit) {
            let addressArr = dataEdit?.address?.split(", ")
            let foundWard = addressArr && wards?.length > 0 && wards?.find(item => item?.ward_name === addressArr[addressArr?.length - 3])?.ward_id
            setWardId(foundWard ? foundWard : '')
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
        <div className='flex flex-col gap-9 w-full' >
            <h2 className='font-semibold text-2xl'>Địa chỉ cho thuê</h2>
            <div className='flex gap-[2%] flex-wrap'>
                <div className='w-[32%]'>
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
                <div className='w-[32%]'>
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
                <div className='w-[32%]'>
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
            <div className='flex flex-col gap-2 w-[66%] text-sm'>
                <label htmlFor="address" className='font-semibold'>
                    Địa chỉ cụ thể
                </label>
                <input
                    required
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    type='text'
                    id='address'
                    className='outline-none border border-gray-300 p-2 rounded-[5px]'
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
        </div >
    )
}

export default memo(Address)
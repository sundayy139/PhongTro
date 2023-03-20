import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { AddressMenu, ListPost, Pagination, NewPost, Sidebar } from '../../components/Public/index'
import logo from '../../assets/image/homestay.png';
import { Helmet } from 'react-helmet'
import { useSelector } from 'react-redux';
import * as apis from '../../services'

const title = 'Tìm kiếm - Phòng trọ';

const SearchDetail = () => {
    const location = useLocation()
    const [data, setData] = useState()
    const [data1, setData1] = useState()
    const [data2, setData2] = useState()
    const [name, setName] = useState()
    const [paramsObj, setParamsObj] = useState()
    const { count, posts, newPosts } = useSelector(state => state.post)

    useEffect(() => {
        const params = {};
        location?.search?.replace(/[?&]+([^=&]+)=([^&]*)/gi, function (match, key, value) {
            if (params.hasOwnProperty(key)) {
                if (!Array.isArray(params[key])) {
                    params[key] = [params[key]];
                }
                params[key].push(value);
            } else {
                params[key] = value;
            }
        });
        setParamsObj(params)
    }, [location])

    useEffect(() => {
        const fetchDistricts = async (provinceCode) => {
            const res1 = await apis.apiGetDistricts({ provinceCode: provinceCode })
            const res2 = await apis.apiGetPosts(paramsObj)
            if (res1?.data?.err === 0) {
                setData1(res1.data.districts)
            }
            if (res2?.data?.err === 0) {
                setData2(res2.data.posts)
            }
        }
        paramsObj?.provinceCode && !paramsObj?.districtCode && fetchDistricts(paramsObj?.provinceCode)
        paramsObj?.provinceCode && !paramsObj?.districtCode && setName('district')
    }, [paramsObj])

    useEffect(() => {
        const results = data1?.map(smallObj => {
            const matchingObjs = data2?.filter(
                bigObj =>
                    bigObj.districtCode === smallObj.code
            );
            return {
                ...smallObj,
                count: matchingObjs?.length,
            };
        });

        const dataEnd = results?.filter(result => result.count !== 0);
        paramsObj?.provinceCode && !paramsObj?.districtCode && setData(dataEnd)
    }, [data1, data2])


    useEffect(() => {
        const fetchWards = async (districtCode) => {
            const res1 = await apis.apiGetWards({ districtCode: districtCode })
            const res2 = await apis.apiGetPosts(paramsObj)
            if (res1?.data?.err === 0) {
                setData1(res1.data.wards)
            }
            if (res2?.data?.err === 0) {
                setData2(res2.data.posts)
            }
        }
        paramsObj?.provinceCode && paramsObj?.districtCode && !paramsObj?.wardCode && fetchWards(paramsObj?.districtCode)
        paramsObj?.provinceCode && paramsObj?.districtCode && !paramsObj?.wardCode && setName('ward')
    }, [paramsObj])

    useEffect(() => {
        const results = data1?.map(smallObj => {
            const matchingObjs = data2?.filter(
                bigObj =>
                    bigObj.wardCode === smallObj.code
            );
            return {
                ...smallObj,
                count: matchingObjs?.length,
            };
        });

        const dataEnd = results?.filter(result => result.count !== 0);
        paramsObj?.provinceCode && paramsObj?.districtCode && !paramsObj?.wardCode && setData(dataEnd)
    }, [data1, data2])

    useEffect(() => {
        paramsObj?.provinceCode && paramsObj?.districtCode && paramsObj?.wardCode && setData(null)
    }, [paramsObj])

    return (
        <div className='w-full flex flex-col gap-4'>
            <Helmet>
                <title>{title}</title>
                <link rel="icon" href={logo} />
            </Helmet>
            <div className='tablet:px-4 phone:px-4'>
                <h1 className='pc:text-[28px] laptop:text-[28px] phone:text-xl tablet:text-xl font-bold mb-2'>{`Kết quả tìm kiếm: ${location.state?.titleSearch}`} </h1>
                <p className='text-sm phone:text-[#777777] tablet:text-[#777777]'>Cho thuê phòng trọ - Kênh thông tin số 1 về phòng trọ giá rẻ, phòng trọ sinh viên, phòng trọ cao cấp mới nhất năm 2023. Tất cả nhà trọ cho thuê giá tốt nhất tại Việt Nam.</p>
            </div>
            {
                data?.length > 0 && (
                    <AddressMenu
                        address={data}
                        paramsObj={paramsObj}
                        name={name}
                    />
                )
            }
            <div className='w-full flex phone:flex-col tablet:flex-col gap-5'>
                <div className='pc:w-[67%] laptop:w-[67%] flex flex-col gap-5  mb-[50px] phone:w-full tablet:w-full'>
                    <ListPost />
                    <Pagination
                        count={count}
                        data={posts}
                    />
                </div>
                <div className='w-[33%] flex flex-col justify-start phone:hidden tablet:hidden'>
                    <Sidebar />
                </div>
                <div className='pc:hidden laptop:hidden phone:flex phone:flex-col phone:px-4 phone:py-5 phone:border-t-[5px] phone:border-t-[#f5f5f5]
                    tablet:border-t-[5px] tablet:border-t-[#f5f5f5] tablet:flex tablet:flex-col tablet:px-4 tablet:py-5'>
                    <NewPost
                        title={'Tin mới đăng'}
                        data={newPosts}
                    />
                </div>
            </div>
        </div>
    )
}

export default SearchDetail
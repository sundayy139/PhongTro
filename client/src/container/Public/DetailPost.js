import React, { useEffect, useState } from 'react'
import { createSearchParams, useNavigate, useParams } from 'react-router-dom'
import { Button, Map, NewPost, SidebarItem, Slick } from '../../components/Public/index';
import * as apis from '../../services';
import logo from '../../assets/image/homestay.png';
import { Helmet } from 'react-helmet'
import 'moment/locale/vi';
import icons from '../../utils/icons'
import moment from 'moment';
import { getNumberFromString } from '../../utils/fn';
import { useDispatch, useSelector } from 'react-redux';
import avatar from '../../assets/image/avatar-person.png';
import zalo from '../../assets/icon/zalo-icon.png';
import * as actions from '../../store/actions'
import { path } from '../../utils/path';
import ReleasePost from '../../components/Public/RelatePost';

const { BsFlagFill, MdLocationOn, BsClock, GiPriceTag, TbVectorOff, HiOutlineHashtag, BsDot, BsTelephone } = icons

const DetailPost = () => {
    const params = useParams()
    const [detailPost, setDetailPost] = useState(null)
    const [title, setTile] = useState('')
    const [labels, setLabels] = useState()
    const { newPosts } = useSelector(state => state.post)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        const fetchDetailPost = async (postId) => {
            const res = await apis.apiGetPostById({ id: postId })
            if (res?.data?.err === 0) {
                setDetailPost(res?.data?.post.rows[0])
            }
        }

        fetchDetailPost(params.postId)
    }, [params])

    useEffect(() => {
        setTile(`${detailPost?.title}`)
    }, [detailPost])

    useEffect(() => {
        dispatch(actions.getNewPosts())
    }, [])

    useEffect(() => {
        const fetchLabels = async (post) => {
            const res = await apis.apiGetLabels({ categoryCode: post.categoryCode, provinceCode: post.provinceCode })
            if (res?.data?.err === 0) {
                let rows = res?.data?.label?.rows
                let count = res?.data?.label?.count
                const mergedArray = count.reduce((acc, curr) => {
                    const matchingObject = rows.find((item) => item.labelCode === curr.labelCode);
                    if (matchingObject) {
                        acc.push({
                            code: curr.labelCode,
                            value: matchingObject.labelData.value,
                            count: curr.count
                        });
                    }
                    return acc;
                }, []);
                setLabels(mergedArray)
            }
        }

        detailPost && fetchLabels(detailPost)
    }, [detailPost])

    useEffect(() => {
        detailPost && dispatch(actions.getPostsLimit({ categoryCode: detailPost?.categoryCode, districtCode: detailPost.districtCode, provinceCode: detailPost.provinceCode }))
    }, [detailPost])


    const handleFilterLabel = (data) => {
        const titleSearch = data?.labelData?.value
        navigate({
            pathname: `/${path.SEARCH}`,
            search: createSearchParams({ labelCode: data?.labelData?.code }).toString(),
        }, { state: { titleSearch } })
    }

    return (
        <div className='flex gap-5 phone:flex-col tablet:flex-col relative'>
            <div className='w-full h-[50px] fixed left-0 bottom-0 z-[9999] bg-white flex gap-2 shadow-custom px-4 py-2 pc:hidden laptop:hidden'>
                <Button
                    text={detailPost?.userData?.phone}
                    fullWidth
                    textStyle={'text-md text-white font-bold'}
                    bgColor={'bg-[#16c784] py-1'}
                    icBefore={<BsTelephone size={15} />}
                    hover={'hover:bg-[#13bb7b]'}
                    onClick={() => window.open(`tel:${detailPost?.userData?.phone}`)}
                />
                <Button
                    text={'Zalo'}
                    fullWidth
                    textStyle={'text-md text-white font-bold'}
                    bgColor={'bg-secondary1 py-1'}
                    hover={'hover:bg-[#1f6ddb]'}
                    onClick={() => window.open(`https://zalo.me/${detailPost?.userData?.phone}`)}
                />
            </div>
            <Helmet>
                <title>{title}</title>
                <link rel="icon" href={logo} />
            </Helmet>
            <div className='pc:w-[67%] laptop:w-[67%] flex flex-col gap-5  mb-[50px] phone:w-full tablet:w-full'>
                <div className='w-full pc:border pc:border-[#dedede] pc:rounded-b-[10px] laptop:border laptop:border-[#dedede] laptop:rounded-b-[10px]  bg-white '>
                    <div className='w-full'>
                        {
                            detailPost?.imagesData?.images && (
                                <Slick
                                    imagesArr={detailPost && JSON.parse(detailPost?.imagesData?.images)}
                                />
                            )
                        }
                    </div>
                    <div className='pc:p-5 laptop:p-5 flex flex-col pc:gap-10 laptop:gap-10'>
                        <div className='flex flex-col gap-4 phone:px-4 phone:py-5 phone:mt-4 phone:border-t-[5px] phone:border-t-[#f5f5f5] phone:border-b-[5px] phone:border-b-[#f5f5f5] tablet:px-4 tablet:py-5 tablet:border-t-[5px] tablet:border-t-[#f5f5f5] tablet:border-b-[5px] tablet:border-b-[#f5f5f5]'>
                            <h2 className='text-[#E13427] pc:text-[24px] pc:mb-2 laptop:text-[24px] laptop:mb-2 font-bold uppercase phone:text-lg'>
                                {detailPost?.title}
                            </h2>
                            <span className='text-sm cursor-pointer text-[#777777]'>
                                Chuyên mục:
                                <span
                                    onClick={() => handleFilterLabel(detailPost)}
                                    className='text-[#1266dd] ml-2 underline font-semibold'
                                >
                                    {detailPost?.labelData?.value}
                                </span>
                            </span>
                            <span className='flex gap-2 items-center text-sm text-[#777777]'>
                                <MdLocationOn size={20} color='#1266dd' className='phone:hidden tablet:hidden' />
                                <p>
                                    {`Địa chỉ: ${detailPost?.addressPostData?.value}, ${detailPost?.wardPostData?.value}, ${detailPost?.districtPostData?.value}, ${detailPost?.provincePostData?.value}`}
                                </p>
                            </span>
                            <div className='flex flex-col'>
                                <div className='flex items-center justify-between'>
                                    <span className='flex gap-2 items-center'>
                                        <GiPriceTag size={15} color='#aaaaaa' />
                                        <span className='pc:text-[21px] laptop:text-[21px] phone:text-lg tablet:text-lg text-[#16c784] font-semibold'>
                                            {
                                                detailPost?.priceNumber < 1 ? `${String(detailPost?.priceNumber * Math.pow(10, 6)).replace(/(.)(?=(\d{3})+$)/g, '$1.')} đồng/tháng` : `${detailPost?.priceNumber} triệu/tháng`
                                            }
                                        </span>
                                    </span>
                                    <span className='flex items-center gap-1 pc:text-sm laptop:text-sm phone:text-xs tablet:text-xs text-[#777777]'>
                                        <TbVectorOff size={15} color='#aaaaaa' />
                                        <span>
                                            {detailPost?.acreageNumber}
                                            <span>
                                                m<sup>2</sup>
                                            </span>
                                        </span>
                                    </span>
                                    <span className='flex items-center gap-1 pc:text-sm laptop:text-sm phone:text-xs tablet:text-xs text-[#777777]'>
                                        <BsClock size={15} color='#aaaaaa' />
                                        <span>
                                            {
                                                moment(detailPost?.createdAt).locale('vi').fromNow()
                                            }
                                        </span>
                                    </span>
                                    <span className='flex items-center gap-1 text-sm text-[#777777] phone:hidden tablet:hidden'>
                                        <HiOutlineHashtag size={20} color='#aaaaaa' />
                                        <span>
                                            {
                                                getNumberFromString(detailPost?.id)
                                            }
                                        </span>
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className='flex gap-5 items-center px-4 py-5 border-b-[5px] border-b-[#f5f5f5] pc:hidden laptop:hidden'>
                            <div className='w-[50px] h-[50px] flex'>
                                <img
                                    className='w-full h-full object-contain rounded-full'
                                    src={avatar || detailPost?.userData?.avatar}
                                />
                            </div>
                            <div className='flex flex-col gap-1'>
                                <h4 className='text-[21px] text-[#000] font-semibold'>
                                    {detailPost?.userData?.name}
                                </h4>
                                <span className='flex items-center text-sm'>
                                    <BsDot size={24} color={detailPost?.userData?.statusCode === 'S5' ? '#14c683' : '#e13427'} />
                                    <span>{detailPost?.userData?.statusCode === 'S5' ? 'Đang hoạt động' : 'Ngừng hoạt động'}</span>
                                </span>
                                <div className='flex gap-2 items-center w-full text-sm text-[#777777]'>
                                    <span
                                        className='text-primary hover:underline cursor-pointer'
                                        onClick={() => window.open(`tel:${detailPost?.userData?.phone}`)}
                                    >
                                        {detailPost?.userData?.phone}
                                    </span>
                                    <BsDot size={15} />
                                    <span
                                        className='text-primary hover:underline cursor-pointer'
                                        onClick={() => window.open(`https://zalo.me/${detailPost?.userData?.phone}`)}
                                    >
                                        Nhắn zalo
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className='flex flex-col gap-5 phone:px-4 phone:py-5 phone:border-b-[5px] phone:border-b-[#f5f5f5] tablet:px-4 tablet:py-5  tablet:border-b-[5px] tablet:border-b-[#f5f5f5]'>
                            <h3 className='text-[21px] font-semibold'>Thông tin mô tả</h3>
                            <div className='text-sm w-full flex flex-col gap-4'>
                                {
                                    detailPost?.description && JSON.parse(detailPost?.description)?.map((item, index) => (
                                        <p
                                            key={index}
                                        >
                                            {item}
                                        </p>
                                    ))
                                }
                            </div>
                        </div>
                        <div className='flex flex-col gap-5 phone:px-4 phone:py-5 phone:border-b-[5px] phone:border-b-[#f5f5f5] tablet:px-4 tablet:py-5 tablet:border-b-[5px] tablet:border-b-[#f5f5f5]'>
                            <h3 className='text-lg font-semibold'>Đặc điểm tin đăng</h3>
                            <div className="relative overflow-x-auto">
                                <table className="w-full text-sm text-left">
                                    <tbody>
                                        <tr className="bg-white">
                                            <td className="pc:px-6 pc:py-3 laptop:px-6 laptop:py-3 phone:py-2 phone:text-[#777777] tablet:py-2 tablet:text-[#777777] w-1/3">
                                                Mã tin:
                                            </td>
                                            <td className="pc:px-6 pc:py-3 laptop:px-6 laptop:py-3">
                                                {`#${getNumberFromString(detailPost?.id)}`}
                                            </td>
                                        </tr>
                                        <tr className=" pc:bg-[#f5f5f5] laptop:bg-[#f5f5f5]">
                                            <td className="pc:px-6 pc:py-3 laptop:px-6 laptop:py-3 phone:py-2 phone:text-[#777777] tablet:py-2 tablet:text-[#777777]">
                                                Khu vực:
                                            </td>
                                            <td className="pc:px-6 pc:py-3 laptop:px-6 laptop:py-3">
                                                {detailPost?.labelData?.value}
                                            </td>
                                        </tr>
                                        <tr className="bg-white">
                                            <td className="pc:px-6 pc:py-3 laptop:px-6 laptop:py-3 phone:py-2 phone:text-[#777777] tablet:py-2 tablet:text-[#777777]">
                                                Loại tin rao:
                                            </td>
                                            <td className="pc:px-6 pc:py-3 laptop:px-6 laptop:py-3">
                                                {detailPost?.categoryData?.value}
                                            </td>
                                        </tr>
                                        <tr className=" pc:bg-[#f5f5f5] laptop:bg-[#f5f5f5]">
                                            <td className="pc:px-6 pc:py-3 laptop:px-6 laptop:py-3 phone:py-2 phone:text-[#777777] tablet:py-2 tablet:text-[#777777]">
                                                Đối tượng thuê:
                                            </td>
                                            <td className="pc:px-6 pc:py-3 laptop:px-6 laptop:py-3">
                                                {detailPost?.target}
                                            </td>
                                        </tr>
                                        <tr className="bg-white">
                                            <td className="pc:px-6 pc:py-3 laptop:px-6 laptop:py-3 phone:py-2 phone:text-[#777777] tablet:py-2 tablet:text-[#777777]">
                                                Ngày đăng:
                                            </td>
                                            <td className="pc:px-6 pc:py-3 laptop:px-6 laptop:py-3 capitalize">
                                                {moment(moment.utc(detailPost?.createdAt)).local().format('dddd, HH:SS DD/MM/YYYY')}
                                            </td>
                                        </tr>
                                        <tr className="pc:bg-[#f5f5f5] laptop:bg-[#f5f5f5]">
                                            <td className="pc:px-6 pc:py-3 laptop:px-6 laptop:py-3 phone:py-2 phone:text-[#777777] tablet:py-2 tablet:text-[#777777]">
                                                Ngày hết hạn:
                                            </td>
                                            <td className="pc:px-6 pc:py-3 laptop:px-6 laptop:py-3 capitalize">
                                                {moment(moment.utc(detailPost?.expiredAt)).local().format('dddd, HH:SS DD/MM/YYYY')}
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div className='flex flex-col gap-5 phone:px-4 phone:py-5 phone:border-b-[5px] phone:border-b-[#f5f5f5] tablet:px-4 tablet:py-5 tablet:border-b-[5px] tablet:border-b-[#f5f5f5]'>
                            <h3 className='text-lg font-semibold'>Thông tin liên hệ</h3>
                            <div className="relative overflow-x-auto">
                                <table className="w-full text-sm text-left">
                                    <tbody>
                                        <tr className="bg-white">
                                            <td className="pc:px-6 pc:py-3 laptop:px-6 laptop:py-3 phone:py-2 phone:text-[#777777] tablet:py-2 tablet:text-[#777777] w-1/3">
                                                Liên hệ:
                                            </td>
                                            <td className="pc:px-6 pc:py-3 laptop:px-6 laptop:py-3">
                                                {detailPost?.userData?.name}
                                            </td>
                                        </tr>
                                        <tr className=" pc:bg-[#f5f5f5] laptop:bg-[#f5f5f5] ">
                                            <td className="pc:px-6 pc:py-3 laptop:px-6 laptop:py-3 phone:py-2 phone:text-[#777777] tablet:py-2 tablet:text-[#777777]">
                                                Điện thoại:
                                            </td>
                                            <td className="pc:px-6 pc:py-3 laptop:px-6 laptop:py-3">
                                                {detailPost?.userData?.phone}
                                            </td>
                                        </tr>
                                        <tr className="bg-white">
                                            <td className="pc:px-6 pc:py-3 laptop:px-6 laptop:py-3 phone:py-2 phone:text-[#777777] tablet:py-2 tablet:text-[#777777]">
                                                Zalo:
                                            </td>
                                            <td className="pc:px-6 pc:py-3 laptop:px-6 laptop:py-3">
                                                {detailPost?.userData?.zalo}
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div className='flex flex-col gap-5 phone:px-4 phone:py-5 phone:border-b-[5px] phone:border-b-[#f5f5f5] tablet:px-4 tablet:py-5 tablet:border-b-[5px] tablet:border-b-[#f5f5f5]'>
                            <h3 className='text-lg font-semibold'>Bản đồ</h3>
                            <div className='w-full h-[400px]'>
                                {
                                    detailPost && detailPost.addressPostData && (
                                        <Map
                                            address={`${detailPost?.addressPostData?.value}, ${detailPost?.wardPostData?.value}, ${detailPost?.districtPostData?.value}, ${detailPost?.provincePostData?.value}`}
                                        />
                                    )
                                }
                            </div>
                            <p className='text-sm text-[#777]'>
                                Bạn đang xem nội dung tin đăng: "
                                <i className='uppercase'>
                                    {detailPost?.title}
                                </i>
                                <i>
                                    {` - Mã tin: ${getNumberFromString(detailPost?.id)}`}
                                </i>
                                ". Mọi thông tin liên quan đến tin đăng này chỉ mang tính chất tham khảo. Nếu bạn có phản hồi với tin đăng này (báo xấu, tin đã cho thuê, không liên lạc được,...), vui lòng thông báo để chúng tôi có thể xử lý.
                            </p>
                            <div className='pc:w-[150px] laptop:w-[150px] phone:w-full tablet:w-full pb-4'>
                                <Button
                                    text={'Gửi phản hồi'}
                                    fullWidth
                                    textStyle={'text-sm text-[#007aff] font-semibold'}
                                    bgColor={'bg-white p-2 border border-[#007aff]'}
                                    icBefore={<BsFlagFill size={20} color='#007aff' />}
                                    hover={'hover:underline'}
                                    onClick={() => navigate(`/${path.LIEN_HE}`)}
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <ReleasePost />
                </div>
                <div className='pc:hidden laptop:hidden phone:flex phone:flex-col phone:px-4 phone:py-5 phone:border-t-[5px] phone:border-t-[#f5f5f5]
                    tablet:border-t-[5px] tablet:border-t-[#f5f5f5] tablet:flex tablet:flex-col tablet:px-4 tablet:py-5'>
                    <NewPost
                        title={'Tin mới đăng'}
                        data={newPosts}
                    />

                </div>
                <div className='pc:hidden laptop:hidden phone:flex phone:flex-col phone:px-4 phone:py-5 phone:border-t-[5px] phone:border-t-[#f5f5f5]
                    tablet:border-t-[5px] tablet:border-t-[#f5f5f5] tablet:flex tablet:flex-col tablet:px-4 tablet:py-5'>
                    {
                        labels && (
                            <SidebarItem content={labels} type="labelCode" title={`Khu vực ${detailPost?.provincePostData?.value}`} />
                        )
                    }
                </div>
            </div>
            <div className='flex w-[33%] flex-col gap-5 phone:hidden tablet:hidden'>
                <div className='bg-[#febb02] rounded-[10px] flex flex-col items-center p-4 gap-2'>
                    <div className='w-[80px] h-[80px] flex m-auto'>
                        <img
                            className='w-full h-full object-contain rounded-full'
                            src={avatar || detailPost?.userData?.avatar}
                        />
                    </div>
                    <h4 className='text-[21px] text-[#000] font-semibold'>
                        {detailPost?.userData?.name}
                    </h4>
                    <span className='flex items-center text-sm'>
                        <BsDot size={24} color={detailPost?.userData?.statusCode === 'S5' ? '#14c683' : '#e13427'} />
                        <span>{detailPost?.userData?.statusCode === 'S5' ? 'Đang hoạt động' : 'Ngừng hoạt động'}</span>
                    </span>
                    <div className='flex flex-col gap-2 w-full'>
                        <Button
                            text={detailPost?.userData?.phone}
                            fullWidth
                            textStyle={'text-[21px] text-white font-bold'}
                            bgColor={'bg-[#16c784] py-1'}
                            icBefore={<BsTelephone size={20} />}
                            hover={'hover:bg-[#13bb7b]'}
                            onClick={() => window.open(`tel:${detailPost?.userData?.phone}`)}
                        />
                        <Button
                            text={'Nhắn Zalo'}
                            fullWidth
                            textStyle={'text-lg font-semibold'}
                            bgColor={'bg-white py-1 border border-[#333333]'}
                            hover={'hover:underline'}
                            icBefore={<img src={zalo} className='w-[25px] h-[25px] object-contain rounded-full' />}
                            onClick={() => window.open(`https://zalo.me/${detailPost?.userData?.phone}`)}
                        />
                    </div>
                </div>
                <div className='flex flex-col gap-5 min-w-[355px] flex-none'>
                    <NewPost
                        title={'Tin mới đăng'}
                        data={newPosts}
                    />
                    {
                        labels && (
                            <SidebarItem content={labels} type="labelCode" title={`Khu vực ${detailPost?.provincePostData?.value}`} />
                        )
                    }
                </div>
            </div>
        </div>
    )
}

export default DetailPost
import React, { useEffect, useState } from 'react'
import { createSearchParams, Link, Navigate, useNavigate, useParams } from 'react-router-dom'
import { Button, Map, ReleasePost, Slick } from '../../components/Public/index';
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

const { BsFlagFill, MdLocationOn, BsClock, GiPriceTag, TbVectorOff, HiOutlineHashtag, BsDot, BsTelephone } = icons

const DetailPost = () => {
    const params = useParams()
    const [detailPost, setDetailPost] = useState(null)
    const [title, setTile] = useState('')
    const { newPosts } = useSelector(state => state.post)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        const fetchDetailPost = async (postId) => {
            const res = await apis.apiGetPostById(postId)
            if (res?.data?.err === 0) {
                setDetailPost(res?.data?.post)
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

    const handleFilterLabel = (data) => {
        const titleSearch = data?.labelData?.value
        navigate({
            pathname: `/${path.SEARCH}`,
            search: createSearchParams({ labelCode: data?.labelData?.code }).toString(),
        }, { state: { titleSearch } })
    }

    return (
        <div className='flex gap-5'>
            <Helmet>
                <title>{title}</title>
                <link rel="icon" href={logo} />
            </Helmet>
            <div className='w-2/3 border border-[#dedede] bg-white rounded-b-[10px]'>
                <Slick
                    images={detailPost && JSON.parse(detailPost?.imagesData?.images)}
                />
                <div className='p-5 flex flex-col gap-10'>
                    <div className='flex flex-col gap-3'>
                        <h2 className='text-[#E13427] text-[24px] font-bold uppercase mb-2'>
                            {detailPost?.title}
                        </h2>
                        <span className='text-sm cursor-pointer'>
                            Chuy??n m???c:
                            <span
                                onClick={() => handleFilterLabel(detailPost)}
                                className='text-[#1266dd] ml-2 underline font-semibold'
                            >
                                {detailPost?.labelData?.value}
                            </span>
                        </span>
                        <span className='flex gap-2 items-center'>
                            <MdLocationOn size={20} color='#1266dd' />
                            <p>
                                {detailPost?.address}
                            </p>
                        </span>
                        <div className='flex flex-col'>
                            <div className='flex items-center justify-between'>
                                <span className='flex gap-2 items-center'>
                                    <GiPriceTag size={20} color='#aaaaaa' />
                                    <span className='text-[21px] text-[#16c784] font-semibold'>
                                        {
                                            detailPost?.priceNumber < 1 ? `${String(detailPost?.priceNumber * Math.pow(10, 6)).replace(/(.)(?=(\d{3})+$)/g, '$1.')} ?????ng/th??ng` : `${detailPost?.priceNumber} tri???u/th??ng`
                                        }
                                    </span>
                                </span>
                                <span className='flex items-center gap-1 text-sm'>
                                    <TbVectorOff size={20} color='#aaaaaa' />
                                    <span>
                                        {detailPost?.acreageNumber}
                                        <span>
                                            m<sup>2</sup>
                                        </span>
                                    </span>
                                </span>
                                <span className='flex items-center gap-1 text-sm'>
                                    <BsClock size={20} color='#aaaaaa' />
                                    <span>
                                        {
                                            moment(detailPost?.createdAt).locale('vi').fromNow()
                                        }
                                    </span>
                                </span>
                                <span className='flex items-center gap-1 text-sm'>
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
                    <div className='flex flex-col gap-5'>
                        <h3 className='text-[21px] font-semibold'>Th??ng tin m?? t???</h3>
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
                    <div className='flex flex-col gap-5'>
                        <h3 className='text-lg font-semibold'>?????c ??i???m tin ????ng</h3>
                        <div className="relative overflow-x-auto">
                            <table className="w-full text-sm text-left">
                                <tbody>
                                    <tr className="bg-white ">
                                        <td className="px-6 py-3">
                                            M?? tin:
                                        </td>
                                        <td className="px-6 py-3">
                                            {`#${getNumberFromString(detailPost?.id)}`}
                                        </td>
                                    </tr>
                                    <tr className=" bg-[#f5f5f5] ">
                                        <td className="px-6 py-3">
                                            Khu v???c:
                                        </td>
                                        <td className="px-6 py-3">
                                            {detailPost?.labelData?.value}
                                        </td>
                                    </tr>
                                    <tr className="bg-white">
                                        <td className="px-6 py-3">
                                            Lo???i tin rao:
                                        </td>
                                        <td className="px-6 py-3">
                                            {detailPost?.categoryData?.value}
                                        </td>
                                    </tr>
                                    <tr className=" bg-[#f5f5f5] ">
                                        <td className="px-6 py-3">
                                            ?????i t?????ng thu??:
                                        </td>
                                        <td className="px-6 py-3">
                                            {detailPost?.target}
                                        </td>
                                    </tr>
                                    <tr className="bg-white">
                                        <td className="px-6 py-3">
                                            Ng??y ????ng:
                                        </td>
                                        <td className="px-6 py-3 capitalize">
                                            {moment(moment.utc(detailPost?.createdAt)).local().format('dddd, HH:SS DD/MM/YYYY')}
                                        </td>
                                    </tr>
                                    <tr className=" bg-[#f5f5f5]">
                                        <td className="px-6 py-3">
                                            Ng??y h???t h???n:
                                        </td>
                                        <td className="px-6 py-3 capitalize">
                                            {moment(moment.utc(detailPost?.expiredAt)).local().format('dddd, HH:SS DD/MM/YYYY')}
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className='flex flex-col gap-5'>
                        <h3 className='text-lg font-semibold'>Th??ng tin li??n h???</h3>
                        <div className="relative overflow-x-auto">
                            <table className="w-full text-sm text-left">
                                <tbody>
                                    <tr className="bg-white ">
                                        <td className="px-6 py-3">
                                            Li??n h???:
                                        </td>
                                        <td className="px-6 py-3">
                                            {detailPost?.userData?.name}
                                        </td>
                                    </tr>
                                    <tr className=" bg-[#f5f5f5] ">
                                        <td className="px-6 py-3">
                                            ??i???n tho???i:
                                        </td>
                                        <td className="px-6 py-3">
                                            {detailPost?.userData?.phone}
                                        </td>
                                    </tr>
                                    <tr className="bg-white">
                                        <td className="px-6 py-3">
                                            Zalo:
                                        </td>
                                        <td className="px-6 py-3">
                                            {detailPost?.userData?.zalo}
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className='flex flex-col gap-5'>
                        <h3 className='text-lg font-semibold'>B???n ?????</h3>
                        <div className='w-full h-[400px]'>
                            {
                                detailPost && detailPost.address && (
                                    <Map
                                        address={detailPost.address}
                                    />
                                )
                            }
                        </div>
                        <p className='text-sm text-[#777]'>
                            B???n ??ang xem n???i dung tin ????ng: "
                            <i className='uppercase'>
                                {detailPost?.title}
                            </i>
                            <i>
                                {` - M?? tin: ${getNumberFromString(detailPost?.id)}`}
                            </i>
                            ". M???i th??ng tin li??n quan ?????n tin ????ng n??y ch??? mang t??nh ch???t tham kh???o. N???u b???n c?? ph???n h???i v???i tin ????ng n??y (b??o x???u, tin ???? cho thu??, kh??ng li??n l???c ???????c,...), vui l??ng th??ng b??o ????? ch??ng t??i c?? th??? x??? l??.
                        </p>
                        <div className='w-[150px] pb-4'>
                            <Button
                                text={'G???i ph???n h???i'}
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
            <div className='flex flex-col gap-5'>
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
                        <BsDot size={24} color='#14c683' />
                        <span>??ang ho???t ?????ng</span>
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
                            text={'Nh???n Zalo'}
                            fullWidth
                            textStyle={'text-lg font-semibold'}
                            bgColor={'bg-white py-1 border border-[#333333]'}
                            hover={'hover:underline'}
                            icBefore={<img src={zalo} className='w-[25px] h-[25px] object-contain rounded-full' />}
                            onClick={() => window.open(`https://zalo.me/${detailPost?.userData?.phone}`)}
                        />
                    </div>
                </div>
                <div>
                    <ReleasePost
                        title={'Tin m???i ????ng'}
                        data={newPosts}
                    />
                </div>
            </div>
        </div>
    )
}

export default DetailPost
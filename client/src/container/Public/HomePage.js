import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { ListPost, Pagination, Province, NewPost, Sidebar, SidebarItem } from '../../components/Public/index'
import { text } from '../../utils/constant'
import * as actions from '../../store/actions'
import * as apis from '../../services'

const HomePage = () => {
    const dispatch = useDispatch();
    const { count, posts, newPosts } = useSelector(state => state.post)
    const { categories } = useSelector(state => state.app)
    const [data, setData] = useState()
    const [dataPosts, setDataPosts] = useState()

    useEffect(() => {
        const fetchCategories = async () => {
            const res = await apis.apiGetPosts()
            if (res?.data?.err === 0) {
                setDataPosts(res.data.posts)
            }
        }
        fetchCategories()

    }, [])

    useEffect(() => {
        const results = categories?.map(smallObj => {
            const matchingObjs = dataPosts?.filter(
                bigObj =>
                    bigObj.categoryCode === smallObj.code
            );
            return {
                ...smallObj,
                count: matchingObjs?.length,
            };
        });

        setData(results)
    }, [categories, dataPosts])

    useEffect(() => {
        dispatch(actions.getNewPosts())
    }, [])
    return (
        <div className='w-full flex flex-col gap-10'>
            <div className='phone:text-white tablet:text-white tablet:px-4 phone:px-4'>
                <div className='phone:bg-secondary1 tablet:bg-secondary1 phone:p-[10px] phone:rounded-[5px] tablet:p-[10px] tablet:rounded-[5px] '>
                    <h1 className='pc:text-[28px] laptop:text-[28px] phone:text-xl tablet:text-xl font-bold mb-2'>{text.HOME_TITLE}</h1>
                    <p className='text-sm pc:text-gray-700 laptop:text-gray-700 phone:text-white tablet:text-white'>{text.HOME_DESCRIPTION}</p>
                </div>
            </div>
            <div className='phone:hidden tablet:hidden'>
                <Province />
            </div>
            <div className='w-full flex phone:flex-col tablet:flex-col gap-5 '>
                <div className='pc:hidden laptop:hidden tablet:px-4 phone:px-4'>
                    <SidebarItem content={data} type="categoryCode" title="Danh mục cho thuê" />
                </div>
                <div className='pc:hidden laptop:hidden phone:flex phone:flex-col phone:px-4 phone:py-5 phone:border-t-[5px] phone:border-t-[#f5f5f5] phone:border-b-[5px] phone:border-b-[#f5f5f5]
                    tablet:border-t-[5px] tablet:border-t-[#f5f5f5] tablet:border-b-[5px] tablet:border-b-[#f5f5f5] tablet:flex tablet:flex-col tablet:px-4 tablet:py-5'>
                    <h3 className='text-lg font-bold mb-2'>
                        Khu vực nổi bật
                    </h3>
                    <Province />
                </div>
                <div className='pc:w-[67%] laptop:w-[67%] flex flex-col gap-5 flex-auto mb-[50px] phone:w-full tablet:w-full'>
                    <ListPost />
                    <Pagination
                        count={count}
                        data={posts}
                    />
                </div>
                <div className='pc:hidden laptop:hidden phone:flex phone:flex-col phone:px-4 phone:py-5 phone:border-t-[5px] phone:border-t-[#f5f5f5]
                    tablet:border-t-[5px] tablet:border-t-[#f5f5f5] tablet:flex tablet:flex-col tablet:px-4 tablet:py-5'>
                    <NewPost
                        title={'Tin mới đăng'}
                        data={newPosts}
                    />
                </div>
                <div className='w-[33%] flex flex-col justify-start phone:hidden tablet:hidden'>
                    <Sidebar />
                </div>
            </div>
        </div>
    )
}

export default HomePage
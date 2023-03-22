import React from 'react'
import { useDispatch } from 'react-redux';
import { CreateBlog } from '../../container/System';
import * as actions from '../../store/actions';

const UpdateBlog = ({ setIsShow }) => {
    const dispatch = useDispatch()
    return (
        <div
            className='absolute top-0 bottom-0 left-0 right-0 bg-overlay-3 flex items-center justify-center '
            onClick={(e) => {
                e.stopPropagation();
                setIsShow(false);
                dispatch(actions.clearDataBlogEdit())
            }}
        >
            <div
                className='pc:bg-white laptop:bg-white phone:bg-[#f1f1f1] tablet:bg-[#f1f1f1] max-w-[1100px] w-full pc:h-4/5 pc:rounded-lg laptop:h-4/5 laptop:rounded-lg overflow-hidden phone:h-full tablet:h-full'
                onClick={(e) => e.stopPropagation()}
            >
                <div className='overflow-y-auto w-full h-full'>
                    <CreateBlog
                        isEdit
                        setIsShow={setIsShow}
                    />
                </div>
            </div>
        </div>
    )
}

export default UpdateBlog
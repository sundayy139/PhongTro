import React from 'react'
import { useDispatch } from 'react-redux';
import { ManageProfile } from '../../container/System';
import * as actions from '../../store/actions';

const UpdateUser = ({ setIsShow }) => {
    const dispatch = useDispatch()
    return (
        <div
            className='absolute top-0 bottom-0 left-0 right-0 bg-overlay-3 flex items-center justify-center '
            onClick={(e) => {
                e.stopPropagation();
                setIsShow(false);
                dispatch(actions.clearDataUserEdit())
            }}
        >
            <div
                className='bg-white max-w-[1100px] h-4/5 w-full rounded-lg overflow-hidden py-4'
                onClick={(e) => e.stopPropagation()}
            >
                <div className='overflow-y-auto w-full h-full'>
                    <ManageProfile
                        isEdit
                        setIsShow={setIsShow}
                    />
                </div>
            </div>
        </div>
    )
}

export default UpdateUser
import React from 'react'
import { Triangle } from 'react-loader-spinner'

const Loading = () => {
    return (
        <Triangle
            height="40"
            width="40"
            color="#1266dd"
            ariaLabel="triangle-loading"
            wrapperStyle={{}}
            wrapperClassName=""
            visible={true}
        />
    )
}

export default Loading
import React, { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet'
import { useNavigate } from 'react-router-dom';
import { BreadCrumb, Button, InputForm } from '../../components/System';
import { useDispatch, useSelector } from 'react-redux';
import { formatMoney } from '../../utils/fn';
import * as apis from '../../services/index'
import Swal from 'sweetalert2';
import logo from '../../assets/image/homestay.png';
import * as actions from '../../store/actions'
import icons from '../../utils/icons'
import DataTable from 'react-data-table-component';

const { BsFillPenFill, BiArrowBack } = icons
const tableCustomStyles = {
    headCells: {
        style: {
            fontSize: '11px',
            fontWeight: 'bold',
            backgroundColor: '#e0e0e0',
            justifyContent: 'space-between'
        },
    },
    cells: {
        style: {
            padding: '10px',
            width: '100%',
            justifyContent: 'space-between',
        }
    },
    rows: {
        style: {
            borderRight: '2px solid #e0e0e0',
            borderLeft: '2px solid #e0e0e0',
        }
    },

}

const PriceList = () => {

    const items = [
        { title: 'Trang chủ', link: '/' },
        { title: 'Quản lý', link: '/he-thong' },
        { title: 'Cập nhật bảng giá' }
    ];
    const { flag } = useSelector(state => state.app)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [invalidFileds, setInvalidFileds] = useState([])
    const [isShow, setIsShow] = useState(false)
    const [isLoadingBtn, setIsLoadingBtn] = useState(false)
    const [data, setData] = useState(null)
    const [payload, setPayload] = useState({
        title: '',
        price: '',
        id: ''
    })


    useEffect(() => {
        const fetch = async () => {
            const res = await apis.apiGetPriceList()
            if (res.data.err === 0) {
                setData(res.data.listPrice)
            }
        }

        fetch()
    }, [flag])


    const handleSubmit = async () => {
        setIsLoadingBtn(true)
        const res = await apis.apiUpdatePriceList(payload)
        if (res?.data?.err === 0) {
            dispatch(actions.setFlag(!flag))
            Swal.fire({
                title: 'Yeahh..!',
                text: res?.data?.msg,
                icon: 'success',
                confirmButtonColor: '#3085d6',
                confirmButtonText: 'OK'
            }).then((result) => {
                if (result.isConfirmed) {
                    setIsShow(false)
                }
            })
            setIsLoadingBtn(false)
        } else {
            Swal.fire({
                position: 'center',
                icon: 'error',
                title: 'Oops...',
                text: res?.data?.msg,
                showConfirmButton: false,
                timer: 2000
            })
            setIsLoadingBtn(false)
        }
    }

    const columns = [
        {
            name: "Hành động",
            cell: (row) => (
                <div className='flex gap-4'>
                    <button
                        className='bg-blue-500 p-2 rounded-[5px]'
                        onClick={() => {
                            setIsShow(true)
                            setPayload({
                                price: row.price,
                                title: row.title,
                                id: row.id
                            })
                        }}
                    >
                        <BsFillPenFill size={15} color="white" />
                    </button>
                </div>
            ),
            minWidth: '150px',
        },
        {
            name: "Tiêu đề",
            selector: (row) => row.title,
            sortable: true,
            style: {
                fontWeight: '600'
            },
            minWidth: '300px'
        },
        {
            name: "Giá",
            selector: (row) => formatMoney(row.price + ''),
            sortable: true,
            style: {
                fontWeight: '600'
            },
            minWidth: '300px'
        },
    ]

    return (
        <div className='pc:px-8 pc:py-4 laptop:px-8 laptop:py-4 phone:px-2 phone:py-4 phone:relative tablet:px-2 tablet:py-4 tablet:relative'>
            <Helmet>
                <title>Bảng giá</title>
                <link rel="icon" href={logo} />
            </Helmet>
            <BreadCrumb
                items={items}
            />
            <h1 className='font-[600] pc:text-[35px] laptop:text-[35px] phone:text-[25px] tablet:text-[25px] py-4 border-b border-gray-200'>
                Cập nhật bảng giá dịch vụ
            </h1>
            <div className='py-6 bg-white rounded-[5px] phone:mb-10 tablet:mb-10'>
                {
                    data && data?.length > 0 && (
                        <DataTable
                            columns={columns}
                            data={data}
                            customStyles={tableCustomStyles}
                            defaultSortFieldId
                            pagination={5}
                            highlightOnHover
                            selectableRowsHighlight
                        />
                    )
                }
                {
                    isShow && (
                        <div
                            className='absolute top-0 bottom-0 left-0 right-0 bg-overlay-3 flex items-center justify-center '
                            onClick={(e) => {
                                e.stopPropagation();
                                setIsShow(false);
                            }}
                        >
                            <div
                                className='pc:bg-white laptop:bg-white phone:bg-[#f1f1f1] tablet:bg-[#f1f1f1] w-[400px] pc:h-auto pc:rounded-lg laptop:h-auto laptop:rounded-lg overflow-hidden phone:h-auto tablet:h-auto phone:rounded-[5px] tablet:rounded-[5px]'
                                onClick={(e) => e.stopPropagation()}
                            >
                                <div className='overflow-y-auto w-full h-full'>
                                    <div className='pc:mx-auto pc:gap-6 pc:py-10 laptop:w-2/3 laptop:mx-auto laptop:gap-6 laptop:py-10 phone:w-full phone:gap-5 phone:py-10 tablet:w-full tablet:gap-5 tablet:py-10 flex flex-col bg-white rounded-[5px] phone:px-2 tablet:px-2'>
                                        <InputForm
                                            label='Title'
                                            id='title'
                                            name='title'
                                            invalidFileds={invalidFileds}
                                            setInvalidFileds={setInvalidFileds}
                                            value={payload.title}
                                            setValue={setPayload}
                                        />
                                        <InputForm
                                            label='Price'
                                            id='price'
                                            name='price'
                                            invalidFileds={invalidFileds}
                                            setInvalidFileds={setInvalidFileds}
                                            value={payload.price}
                                            setValue={setPayload}
                                        />
                                        <div className='flex justify-center w-full mt-10 phone:hidden tablet:hidden'>
                                            <Button
                                                text={'Lưu & cập nhật'}
                                                textStyle={'text-[17px] text-white'}
                                                bgColor={`${isLoadingBtn ? 'bg-primary' : 'bg-[#007bff]'}`}
                                                fullWidth
                                                hover={`${isLoadingBtn ? '' : 'hover:bg-[#0069d9]'}`}
                                                onClick={handleSubmit}
                                            />
                                        </div>
                                        <div className='h-[55px] fixed bottom-0 left-0 right-0 shadow-custom bg-white flex gap-2 px-4 py-2 pc:hidden laptop:hidden z-[99999]'>
                                            <Button
                                                text={'Quay lại'}
                                                textStyle={'text-[17px] text-[#333333]'}
                                                bgColor={'bg-white'}
                                                fullWidth
                                                iconBefore={<BiArrowBack />}
                                                hover={'hover:bg-[#218838]'}
                                                onClick={() => navigate(-1)}
                                            />
                                            <Button
                                                text={'Lưu & cập nhật'}
                                                textStyle={'text-[17px] text-white'}
                                                bgColor={`${isLoadingBtn ? 'bg-primary' : 'bg-[#007bff]'}`}
                                                fullWidth
                                                hover={`${isLoadingBtn ? '' : 'hover:bg-[#0069d9]'}`}
                                                onClick={handleSubmit}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                }
            </div >
        </div >
    )
}

export default PriceList
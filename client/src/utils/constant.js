import icons from "./icons"

const {
    BsFillPenFill,
    FaUserCircle,
    GiNotebook,
    MdAdminPanelSettings,
    BsFillChatFill,
    BsFillInfoCircleFill,
    BiNotepad,
    FaLock,
    BsBookHalf,
    BsCalendarMonth,
    BsCalendarDay
} = icons

export const text = {
    HOME_TITLE: 'Kênh thông tin Phòng Trọ số 1 Việt Nam',
    HOME_DESCRIPTION: 'Kênh thông tin Phòng Trọ số 1 Việt Nam - Website đăng tin cho thuê phòng trọ, nhà nguyên căn, căn hộ, ở ghép nhanh, hiệu quả với 100.000+ tin đăng và 2.500.000 lượt xem mỗi tháng.'
}


export const location = [
    {
        id: 'hcm',
        name: "Phòng trọ Hồ Chí Minh",
        image: 'https://phongtro123.com/images/location_hcm.jpg',
        provinceCode: 'CHNCT',
        categoryCode: 'CTPT'
    },
    {
        id: 'hn',
        name: "Phòng trọ Hà Nội",
        image: 'https://phongtro123.com/images/location_hn.jpg',
        provinceCode: 'NOPFU',
        categoryCode: 'CTPT'
    },
    {
        id: 'dn',
        name: "Phòng trọ Đà Nẵng",
        image: 'https://phongtro123.com/images/location_dn.jpg',
        provinceCode: 'NAPEU',
        categoryCode: 'CTPT'
    }
]

export const textIntro = {
    title: "Tại sao lại chọn PhongTro123.com?",
    desc: "Chúng tôi biết bạn có rất nhiều lựa chọn, nhưng Phongtro123.com tự hào là trang web đứng top google về các từ khóa: cho thuê phòng trọ, nhà trọ, thuê nhà nguyên căn, cho thuê căn hộ, tìm người ở ghép, cho thuê mặt bằng...Vì vậy tin của bạn đăng trên website sẽ tiếp cận được với nhiều khách hàng hơn, do đó giao dịch nhanh hơn, tiết kiệm chi phí hơn",
    statistic: [
        {
            name: "Thành viên",
            value: "116.998+"
        },
        {
            name: "Tin đăng",
            value: "103.348+"
        },
        {
            name: "Lượt truy cập/tháng",
            value: "300.000+"
        },
        {
            name: "Lượt xem/tháng",
            value: "2.500.000+"
        },
    ],
    price: "Chi phí thấp, hiệu quả tối đa",
    comment: "Trước khi biết website phongtro123, mình phải tốn nhiều công sức và chi phí cho việc đăng tin cho thuê: từ việc phát tờ rơi, dán giấy, và đăng lên các website khác nhưng hiệu quả không cao. Từ khi biết website phongtro123.com, mình đã thử đăng tin lên và đánh giá hiệu quả khá cao trong khi chi phí khá thấp, không còn tình trạng phòng trống kéo dài.",
    author: "Anh Khánh (chủ hệ thống phòng trọ tại Tp.HCM)",
    question: "Bạn đang có phòng trọ / căn hộ cho thuê?",
    answer: "Không phải lo tìm người cho thuê, phòng trống kéo dài."
}

export const supportText = {
    title: "Liên hệ với chúng tôi nếu bạn cần hỗ trợ:",
    info: [
        {
            name: "HỖ TRỢ THANH TOÁN",
            phone: "0917686101"
        },
        {
            name: "HỖ TRỢ ĐĂNG TIN",
            phone: "0902657123"
        },
        {
            name: "HOTLINE 24/7",
            phone: "0917686101"
        },
    ]
}

export const menuManage = [
    {
        id: 1,
        text: "Đăng tin cho thuê",
        path: '/he-thong/dang-tin-moi',
        icons: <BsFillPenFill size={16} />
    },
    {
        id: 2,
        text: "Quản lý tin đăng",
        path: '/he-thong/quan-ly-tin-dang',
        icons: <GiNotebook size={16} />

    },
    {
        id: 3,
        text: "Thông tin tài khoản",
        path: '/he-thong/sua-thong-tin',
        icons: <FaUserCircle size={16} />
    },
]

export const menuAdmin = [
    {
        id: 1,
        text: "Quản lý hệ thống (Admin)",
        path: '/he-thong/quan-ly-he-thong',
        icons: <MdAdminPanelSettings size={16} />
    },
    {
        id: 2,
        text: "Đăng tin cho thuê",
        path: '/he-thong/dang-tin-moi',
        icons: <BsFillPenFill size={16} />
    },
    {
        id: 3,
        text: "Quản lý tin đăng",
        path: '/he-thong/quan-ly-tin-dang',
        icons: <GiNotebook size={16} />

    },
    {
        id: 4,
        text: "Thông tin tài khoản",
        path: '/he-thong/sua-thong-tin',
        icons: <BsFillInfoCircleFill size={16} />
    },
]


export const menuManageSystem = [
    {
        id: 1,
        text: "Quản lý tin đăng",
        path: '/he-thong/quan-ly-tin-dang',
        icons: <GiNotebook size={16} />

    },
    {
        id: 2,
        text: "Thông tin tài khoản",
        path: '/he-thong/sua-thong-tin',
        icons: <BsFillInfoCircleFill size={16} />
    },
    {
        id: 3,
        text: "Đổi mật khẩu",
        path: '/he-thong/doi-mat-khau',
        icons: <FaLock size={16} />
    },
    {
        id: 4,
        text: "Liên hệ",
        path: '/lien-he',
        icons: <BsFillChatFill size={16} />
    },
]

export const menuManageSidebar = [
    {
        id: 1,
        text: "Đăng tin cho thuê",
        path: '/he-thong/dang-tin-moi',
        icons: <BsFillPenFill size={16} />
    },
    {
        id: 2,
        text: "Quản lý tin đăng",
        path: '/he-thong/quan-ly-tin-dang',
        icons: <GiNotebook size={16} />

    },
    {
        id: 3,
        text: "Sửa thông tin cá nhân",
        path: '/he-thong/sua-thong-tin',
        icons: <BsFillInfoCircleFill size={16} />
    },
    {
        id: 4,
        text: "Liên hệ",
        path: '/lien-he',
        icons: <BsFillChatFill size={16} />
    }
]

export const menuManageSidebarAdmin = [
    {
        id: 1,
        text: "Người dùng",
        path: '/he-thong/quan-ly-nguoi-dung',
        icons: <FaUserCircle size={16} />
    },
    {
        id: 2,
        text: "Tin đăng",
        path: '/he-thong/quan-ly-tat-ca-tin-dang',
        icons: <BiNotepad size={16} />
    },
    {
        id: 3,
        text: "Blog",
        path: '/he-thong/quan-ly-blog',
        icons: <BsBookHalf size={16} />
    },
]
export const menuStatisticsSidebarAdmin = [
    {
        id: 1,
        text: "Tổng quan",
        path: '/he-thong/tong-quan',
        icons: <FaUserCircle size={16} />
    },
    {
        id: 2,
        text: "Hàng tháng",
        path: '/he-thong/thong-ke-theo-thang',
        icons: <BsCalendarMonth size={16} />
    },
    {
        id: 3,
        text: "Hàng ngày",
        path: '/he-thong/thong-ke-theo-ngay',
        icons: <BsCalendarDay size={16} />
    },
]


export const contactInfo = [
    {
        id: 1,
        name: 'Điện thoại: ',
        info: '0917 686 101',
    },
    {
        id: 2,
        name: 'Email: ',
        info: 'cskh.phongtro123@gmail.com',
    },
    {
        id: 3,
        name: 'Zalo: ',
        info: ':0917 686 101',
    },
    {
        id: 4,
        name: 'Viber: ',
        info: ':0917 686 101',
    },
    {
        id: 5,
        name: 'Địa chỉ: ',
        info: 'LD-06.04, Toà nhà Lexington Residence, Số 67 Mai Chí Thọ, Phường An Phú, Quận 2, Tp. Hồ Chí Minh.',
    },

]

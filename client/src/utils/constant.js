import icons from "./icons"

const {
    BsFillPenFill,
    FaUserCircle,
    GiNotebook,
    MdAdminPanelSettings
} = icons

export const text = {
    HOME_TITLE: 'Kênh thông tin Phòng Trọ số 1 Việt Nam',
    HOME_DESCRIPTION: 'Kênh thông tin Phòng Trọ số 1 Việt Nam - Website đăng tin cho thuê phòng trọ, nhà nguyên căn, căn hộ, ở ghép nhanh, hiệu quả với 100.000+ tin đăng và 2.500.000 lượt xem mỗi tháng.'
}


export const location = [
    {
        id: 'hcm',
        name: "Phòng trọ Hồ Chí Minh",
        image: 'https://phongtro123.com/images/location_hcm.jpg'
    },
    {
        id: 'hn',
        name: "Phòng trọ Hà Nội",
        image: 'https://phongtro123.com/images/location_hn.jpg'
    },
    {
        id: 'dn',
        name: "Phòng trọ Đà Nẵng",
        image: 'https://phongtro123.com/images/location_dn.jpg'
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
        path: '/he-thong/thong-tin-tai-khoan',
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
        path: '/he-thong/thong-tin-tai-khoan',
        icons: <FaUserCircle size={16} />
    },
]
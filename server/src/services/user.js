import db from "../models/index";

export const getUserService = (uId) => {
    return new Promise(async (resolve, reject) => {
        try {
            const user = await db.User.findOne({
                where: {
                    id: uId
                },
                raw: true,
                attributes: {
                    exclude: ['password']
                }
            })
            resolve({
                err: user ? 0 : 1,
                msg: user ? "Thành công" : "Không lấy được người dùng",
                user
            })
        } catch (e) {
            reject(e);
        }
    })
}


export const updateUserProfileService = (payload) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!payload.id) {
                resolve({
                    err: 1,
                    msg: "Thiếu mất gì đó rồi",
                })
            } else {
                const user = await db.User.findOne({
                    where: {
                        id: payload.id
                    }
                })
                if (!user) {
                    resolve({
                        err: 2,
                        msg: "Không tìm thấy người dùng",
                    })
                } else {
                    user.name = payload.name
                    user.email = payload.email
                    user.fbUrl = payload.fbUrl
                    user.zalo = payload.zalo
                    user.role = payload.role
                    user.avatar = payload.avatar
                    user.status = payload.status

                    await user.save()
                    resolve({
                        err: 0,
                        msg: "Cập nhật thông tin thành công",
                    })
                }
            }
        } catch (e) {
            reject(e);
        }
    })
}
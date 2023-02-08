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
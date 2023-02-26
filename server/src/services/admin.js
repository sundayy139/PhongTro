import db from "../models/index";

// GET ALL USERS
export const getUsersService = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const users = await db.User.findAll({
                raw: true,
                nest: true,
                attributes: {
                    exclude: ['password']
                },
                order: [['createdAt', 'DESC']]
            })
            resolve({
                err: users ? 0 : 1,
                msg: users ? "Thành công" : "Không lấy được người dùng",
                users
            })
        } catch (e) {
            reject(e);
        }
    })
}

// GET ALL USERS
export const deleteUserService = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!id) {
                resolve({
                    err: 1,
                    msg: "Có lỗi gì đó rồi",
                })
            } else {
                const user = await db.User.findOne({
                    where: {
                        id: id,
                    }
                })
                if (!user) {
                    resolve({
                        err: 2,
                        msg: "Không tìm thấy người dùng",
                    })
                } else {
                    await user.destroy()
                    resolve({
                        err: 0,
                        msg: "Xóa người dùng thành công",
                    })
                }
            }
        } catch (e) {
            reject(e);
        }
    })
}

// GET ALL POSTS
export const getPostsService = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const posts = await db.Post.findAll({
                raw: true,
                nest: true,
                order: [['statusCode', 'ASC']],
                include: [
                    { model: db.Image, as: 'imagesData', attributes: ['images'] },
                    { model: db.User, as: 'userData', attributes: { exclude: ['password'] } },
                    { model: db.Province, as: 'provinceData', attributes: ['code', 'value'] },
                    { model: db.Category, as: 'categoryData', attributes: ['code', 'value'] },
                    { model: db.Label, as: 'labelData', attributes: ['code', 'value'] },
                ]
            })
            console.log(posts.length);
            resolve({
                err: posts ? 0 : 1,
                msg: posts ? "Thành công" : "Không lấy được bài đăng",
                posts
            })
        } catch (e) {
            reject(e);
        }
    })
}

export const approvePostService = (postId) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!postId) {
                resolve({
                    err: 1,
                    msg: "Có lỗi gì đó rồi",
                })
            } else {
                const post = await db.Post.findOne({
                    where: {
                        id: postId,
                    }
                })
                if (!post) {
                    resolve({
                        err: 2,
                        msg: "Không tìm thấy bài đăng",
                    })
                } else {
                    post.statusCode = 'S2'
                    await post.save()
                    resolve({
                        err: 0,
                        msg: "Phê duyệt bài đăng thành công",
                    })
                }
            }
        } catch (e) {
            reject(e);
        }
    })
}



import db from "../models/index";
import { v4 as generateId } from 'uuid'

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

// DELETE USER
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

// CREATE BLOG
export const createBlogService = (body, id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const { descHTML, descMarkdown, image, title } = body
            if (!id || !descHTML || !descMarkdown || !image || !title) {
                resolve({
                    err: 1,
                    msg: "Có lỗi gì đó rồi",
                })
            } else {
                const blog = await db.Blog.create({
                    id: generateId(),
                    descHTML: descHTML,
                    descMarkdown: descMarkdown,
                    userId: id,
                    image: image,
                    title: title
                })

                resolve({
                    err: blog ? 0 : 2,
                    msg: blog ? "Tạo mới blog thành công" : 'Tạo mới blog thất bại',
                })
            }
        } catch (e) {
            reject(e);
        }
    })
}

// UPDATE BLOG
export const updateBlogService = (payload) => {
    return new Promise(async (resolve, reject) => {
        try {
            const { id, descHTML, descMarkdown, title, image } = payload
            if (!id) {
                resolve({
                    err: 1,
                    msg: "Thiếu mất gì đó rồi",
                })
            } else {
                const blog = await db.Blog.findOne({
                    where: {
                        id: id
                    }
                })
                if (!blog) {
                    resolve({
                        err: 2,
                        msg: "Không tìm thấy blog",
                    })
                } else {
                    blog.title = title
                    blog.descHTML = descHTML
                    blog.descMarkdown = descMarkdown
                    blog.image = image

                    await blog.save()
                    resolve({
                        err: 0,
                        msg: "Cập nhật blog thành công",
                    })
                }
            }
        } catch (e) {
            reject(e);
        }
    })
}

// DELETE BLOG
export const deleteBlogService = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!id) {
                resolve({
                    err: 1,
                    msg: "Có lỗi gì đó rồi",
                })
            } else {
                const blog = await db.Blog.findOne({
                    where: {
                        id: id,
                    }
                })
                if (!blog) {
                    resolve({
                        err: 2,
                        msg: "Không tìm thấy blog",
                    })
                } else {
                    await blog.destroy()
                    resolve({
                        err: 0,
                        msg: "Xóa blog thành công",
                    })
                }
            }
        } catch (e) {
            reject(e);
        }
    })
}

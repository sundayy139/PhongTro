import db from "../models/index";

// GET ALL Blogs
export const getBlogsService = (page) => {
    return new Promise(async (resolve, reject) => {
        try {
            const blogs = await db.Blog.findAndCountAll({
                raw: true,
                nest: true,
                order: [['createdAt', 'DESC']],
                limit: +process.env.LIMIT,
                offset: (page - 1) * (+process.env.LIMIT) || 0,
                include: [
                    { model: db.User, as: 'userBlogData', attributes: ['name', 'avatar'] }
                ]
            })
            resolve({
                err: blogs ? 0 : 1,
                msg: blogs ? "Thành công" : "Không lấy được blog",
                blogs
            })
        } catch (e) {
            reject(e);
        }
    })
}

// GET ALL Blogs
export const getBlogByIdService = (id) => {
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
                        id: id
                    },
                    raw: true,
                    nest: true,
                    include: [
                        { model: db.User, as: 'userBlogData', attributes: ['name', 'avatar'] }
                    ]
                })

                resolve({
                    err: blog ? 0 : 2,
                    msg: blog ? "Thành công" : "Không lấy được blog",
                    blog
                })
            }
        } catch (e) {
            reject(e);
        }
    })
}
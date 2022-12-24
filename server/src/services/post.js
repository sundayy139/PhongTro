import db from "../models/index";
require('dotenv').config()


// GET ALL POSTS
export const getPostsService = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const posts = await db.Post.findAll({
                raw: true,
                nest: true,
                attributes: [
                    'id',
                    "star",
                    "title",
                    "address",
                    "description"
                ]
                ,
                include: [
                    { model: db.Image, as: 'imagesData', attributes: ['images'] },
                    { model: db.Attribute, as: 'attributesData', attributes: ['price', 'acreage', 'published', 'hashtag'] },
                    { model: db.User, as: 'userData', attributes: ['name', 'avatar', 'zalo', 'phone'] },
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

// GET POSTS LIMIT OR FILTER
export const getPostsLimitService = (page, query) => {
    return new Promise(async (resolve, reject) => {
        try {
            const posts = await db.Post.findAndCountAll({
                where: query,
                raw: true,
                nest: true,
                offset: +page === 1 ? 0 : page * (+process.env.LIMIT),
                limit: +process.env.LIMIT,
                attributes: [
                    'id',
                    "star",
                    "title",
                    "address",
                    "description"
                ]
                ,
                include: [
                    { model: db.Image, as: 'imagesData', attributes: ['images'] },
                    { model: db.Attribute, as: 'attributesData', attributes: ['price', 'acreage', 'published', 'hashtag'] },
                    { model: db.User, as: 'userData', attributes: ['name', 'avatar', 'zalo', 'phone'] },
                ],
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

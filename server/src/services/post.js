import db from "../models/index";
require('dotenv').config()
const { Op } = require("sequelize");
import { v4 as generateId } from 'uuid'
import generateCode from "../utils/fn";


// GET ALL POSTS
export const getPostsService = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const posts = await db.Post.findAll({
                where: {
                    statusCode: 'S2',
                },
                raw: true,
                nest: true,
                attributes: [
                    'id',
                    "title",
                    "description",
                    "address",
                    "acreageNumber",
                    "priceNumber",
                    "createdAt",
                ],
                include: [
                    { model: db.Image, as: 'imagesData', attributes: ['images'] },
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
export const getPostsLimitService = (page, { order, ...query }, { priceNumber, acreageNumber }) => {
    return new Promise(async (resolve, reject) => {
        const queries = { ...query }
        if (priceNumber) queries.priceNumber = { [Op.between]: priceNumber }
        if (acreageNumber) queries.acreageNumber = { [Op.between]: acreageNumber }
        queries.expiredAt = { [Op.gte]: new Date() }
        queries.statusCode = 'S2'
        try {
            const posts = await db.Post.findAndCountAll({
                where: queries,
                raw: true,
                nest: true,
                order: order ? [order] : '',
                offset: (page - 1) * (+process.env.LIMIT) || 0,
                limit: +process.env.LIMIT,
                attributes: [
                    'id',
                    "title",
                    "description",
                    "address",
                    "acreageNumber",
                    "priceNumber",
                    "createdAt",
                ],
                include: [
                    { model: db.Image, as: 'imagesData', attributes: ['images'] },
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

// GET NEW POSTS
export const getNewPostsService = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const newposts = await db.Post.findAll({
                where: {
                    statusCode: 'S2',
                    expiredAt: {
                        [Op.gte]: new Date()
                    }
                },
                raw: true,
                nest: true,
                limit: +process.env.LIMIT,
                order: [["createdAt", "DESC"]],
                attributes: [
                    'id',
                    "title",
                    "description",
                    "address",
                    "acreageNumber",
                    "priceNumber",
                    "createdAt",
                ],
                include: [
                    { model: db.Image, as: 'imagesData', attributes: ['images'] },
                ]
            })
            resolve({
                err: newposts ? 0 : 1,
                msg: newposts ? "Thành công" : "Không lấy được bài đăng",
                newposts
            })
        } catch (e) {
            reject(e);
        }
    })
}


// GET POST BY ID
export const getPostByIdService = (postId) => {
    return new Promise(async (resolve, reject) => {
        try {
            const post = await db.Post.findOne({
                where: {
                    id: postId,
                },
                raw: true,
                nest: true,
                include: [
                    { model: db.Image, as: 'imagesData', attributes: ['images'] },
                    {
                        model: db.User, as: 'userData', attributes: {
                            exclude: ['password']
                        }
                    },
                    { model: db.Province, as: 'provinceData', attributes: ['code', 'value'] },
                    { model: db.Category, as: 'categoryData', attributes: ['code', 'value'] },
                    { model: db.Label, as: 'labelData', attributes: ['code', 'value'] },
                ]
            })
            resolve({
                err: post ? 0 : 1,
                msg: post ? "Thành công" : "Không lấy được bài đăng",
                post
            })
        } catch (e) {
            reject(e);
        }
    })
}


// CREATE NEW POST
export const createNewPostService = (body, id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const {
                categoryCode,
                priceNumber,
                acreageNumber,
                description,
                title,
                label,
                address,
                province,
                target,
                expired
            } = body

            if (!categoryCode || !target || !expired || !description || !id || !priceNumber || !acreageNumber || !title || !label || !address || !province) {
                resolve({
                    err: 1,
                    msg: "Vui lòng điền đầy đủ thông tin",
                })
            } else {
                const imagesId = generateId()
                const labelCode = generateCode(body.label)
                const provinceCode = generateCode(body.province)

                const existingLabel = await db.Label.findOne({
                    where: {
                        value: body.label
                    }
                })

                if (!existingLabel) {
                    await db.Label.create({
                        code: labelCode,
                        value: body.label
                    })
                }

                const existingProvince = await db.Province.findOne({
                    where: {
                        value: body.province
                    }
                })

                if (!existingProvince) {
                    await db.Province.create({
                        code: provinceCode,
                        value: body.province
                    })
                }

                await db.Image.create({
                    id: imagesId,
                    images: JSON.stringify(body.images)
                })

                const newPosts = await db.Post.create({
                    id: generateId(),
                    title: body.title,
                    labelCode: existingLabel ? existingLabel.code : labelCode,
                    address: body.address || null,
                    categoryCode: body.categoryCode,
                    description: body.description || null,
                    userId: id,
                    imageId: imagesId,
                    priceCode: body.priceCode || null,
                    acreageCode: body.acreageCode || null,
                    provinceCode: existingProvince ? existingProvince.code : provinceCode,
                    statusCode: 'S1',
                    target: body?.target,
                    priceNumber: body.priceNumber / Math.pow(10, 6),
                    acreageNumber: body.acreageNumber,
                    expiredAt: new Date(Date.now() + body.expired * 24 * 60 * 60 * 1000)
                })

                resolve({
                    err: newPosts ? 0 : 2,
                    msg: newPosts ? "Tạo mới bài đăng thành công" : "Có lỗi gì đó rồi",
                })
            }
        } catch (e) {
            reject(e);
        }
    })
}


// GET POSTS USER
export const getPostsUserService = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            const posts = await db.Post.findAll({
                where: {
                    userId: userId,
                },
                raw: true,
                nest: true,
                order: [["createdAt", "DESC"]],
                include: [
                    { model: db.Image, as: 'imagesData', attributes: ['images'] },
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

// UPDATE POST
export const updatePostService = (body, id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const {
                categoryCode,
                priceNumber,
                acreageNumber,
                description,
                title,
                label,
                address,
                province,
                target,
                expired,
                postId,
                images,
                priceCode,
                acreageCode
            } = body

            if (!categoryCode || !target || !postId || !expired || !description || !id || !priceNumber || !acreageNumber || !title || !label || !address || !province) {
                resolve({
                    err: 1,
                    msg: "Vui lòng điền đầy đủ thông tin",
                })
            } else {
                const labelCode = generateCode(label)
                const provinceCode = generateCode(province)

                const existingLabel = await db.Label.findOne({
                    where: {
                        value: label
                    }
                })

                if (!existingLabel) {
                    await db.Label.create({
                        code: labelCode,
                        value: label
                    })
                }

                const existingProvince = await db.Province.findOne({
                    where: {
                        value: province
                    }
                })

                if (!existingProvince) {
                    await db.Province.create({
                        code: provinceCode,
                        value: province
                    })
                }

                const post = await db.Post.findOne({
                    where: {
                        id: postId
                    }
                })
                if (!post) {
                    resolve({
                        err: 2,
                        msg: "Không tìm thấy bài đăng"
                    })
                } else {
                    await db.Image.update({
                        images: JSON.stringify(images)
                    }, {
                        where: {
                            id: post.imageId,
                        }
                    })

                    const updatePost = await db.Post.update({
                        title: title,
                        labelCode: existingLabel ? existingLabel.code : labelCode,
                        address: address,
                        categoryCode: categoryCode,
                        description: description,
                        priceCode: priceCode,
                        acreageCode: acreageCode,
                        provinceCode: existingProvince ? existingProvince.code : provinceCode,
                        target: target,
                        priceNumber: +priceNumber / Math.pow(10, 6),
                        acreageNumber: acreageNumber,
                        expiredAt: new Date(new Date(post.createdAt).getTime() + +expired * 24 * 60 * 60 * 1000)
                    }, {
                        where: {
                            id: postId,
                        }
                    })

                    resolve({
                        err: 0,
                        msg: "Cập nhật bài đăng thành công",
                        updatePost
                    })
                }
            }
        } catch (e) {
            reject(e);
        }
    })
}

// DELETE POST
export const deletePostService = (postId, id) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!postId || !id) {
                resolve({
                    err: 1,
                    msg: "Có lỗi gì đó rồi",
                })
            } else {
                const post = await db.Post.findOne({
                    where: {
                        id: postId,
                        userId: id
                    }
                })
                if (!post) {
                    resolve({
                        err: 2,
                        msg: "Không tìm thấy bài đăng",
                    })
                } else {
                    await db.Image.destroy({
                        where: {
                            id: post.imageId
                        }
                    })
                    await post.destroy()
                    resolve({
                        err: 0,
                        msg: "Xóa bài đăng thành công",
                    })
                }
            }
        } catch (e) {
            reject(e);
        }
    })
}

// UPDATE STATUS POST
export const updateStatusPostService = (postId, id) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!postId || !id) {
                resolve({
                    err: 1,
                    msg: "Có lỗi gì đó rồi",
                })
            } else {
                const post = await db.Post.findOne({
                    where: {
                        id: postId,
                        userId: id
                    }
                })
                if (!post) {
                    resolve({
                        err: 2,
                        msg: "Không tìm thấy bài đăng",
                    })
                } else {
                    post.statusCode = 'S3'
                    await post.save()
                    resolve({
                        err: 0,
                        msg: "Cập nhật trạng thái bài đăng thành công",
                    })
                }
            }
        } catch (e) {
            reject(e);
        }
    })
}
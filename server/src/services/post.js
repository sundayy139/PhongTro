import db from "../models/index";
require('dotenv').config()
const { Op } = require("sequelize");


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
                    "star",
                    "title",
                    "address",
                    "description",
                    "createdAt"
                ]
                ,
                include: [
                    { model: db.Image, as: 'imagesData', attributes: ['images'] },
                    { model: db.Attribute, as: 'attributesData', attributes: ['price', 'acreage', 'hashtag'] },
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
export const getPostsLimitService = (page, query, { priceNumber, acreageNumber }) => {
    return new Promise(async (resolve, reject) => {
        const queries = { ...query }
        if (priceNumber) queries.priceNumber = { [Op.between]: priceNumber }
        if (acreageNumber) queries.acreageNumber = { [Op.between]: acreageNumber }

        try {
            const posts = await db.Post.findAndCountAll({
                where: {
                    statusCode: 'S2',
                },
                where: queries,
                raw: true,
                nest: true,
                offset: (page - 1) * (+process.env.LIMIT) || 0,
                limit: +process.env.LIMIT,
                attributes: [
                    'id',
                    "star",
                    "title",
                    "address",
                    "description",
                    "createdAt"
                ]
                ,
                include: [
                    { model: db.Image, as: 'imagesData', attributes: ['images'] },
                    { model: db.Attribute, as: 'attributesData', attributes: ['price', 'acreage', 'hashtag'] },
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
export const getNewPostsService = (query) => {
    return new Promise(async (resolve, reject) => {
        try {
            const newposts = await db.Post.findAll({
                where: {
                    statusCode: 'S2',
                },
                where: query,
                raw: true,
                nest: true,
                limit: +process.env.LIMIT,
                order: [["createdAt", "DESC"]],
                attributes: [
                    'id',
                    "star",
                    "title",
                    "description",
                    "createdAt"
                ]
                ,
                include: [
                    { model: db.Image, as: 'imagesData', attributes: ['images'] },
                    { model: db.Attribute, as: 'attributesData', attributes: ['price', 'published'] },
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

import db from "../models/index";
import bcrypt from 'bcryptjs';
require('dotenv').config()
import { v4 } from "uuid"
import generateCode, { getNumberFromString, getNumberFromStringAcreage, getNumberFromStringPrice } from '../utils/fn'
import chothuematbang from '../../data/chothuematbang.json'
import chothuecanho from '../../data/chothuecanho.json'
import nhachothue from '../../data/chothuenha.json'
import chothuephongtro from '../../data/chothuephongtro.json'
import { dataPrice, dataArea } from '../utils/data'


const dataBody = [
    {
        body: chothuephongtro.body,
        code: 'CTPT'
    },
    {
        body: chothuematbang.body,
        code: 'CTMB'
    },
    {
        body: chothuecanho.body,
        code: 'CTCH'
    },
    {
        body: nhachothue.body,
        code: 'NCT'
    },
]

const hashPassword = (password) => bcrypt.hashSync(password, bcrypt.genSaltSync(12))

export const insert = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const provinceCodes = []
            const labelCodes = []
            dataBody.forEach(async (cate) => {
                cate.body.forEach(async (item) => {

                    let areaCurrent = getNumberFromStringAcreage(item?.header?.attributes?.acreage)
                    let currentPrice = getNumberFromString(item?.header?.attributes?.price)
                    let imagesId = v4()
                    let postId = v4()
                    let attributeId = v4()
                    let userId = v4()
                    let overviewId = v4()
                    const labelcode = generateCode(item?.header?.class?.classType)?.trim();
                    labelCodes?.every(item => item?.code !== labelcode) && labelCodes.push({
                        code: labelcode,
                        value: item?.header?.class?.classType?.trim()
                    })
                    const provinceCode = generateCode(item?.header?.address?.split(',')?.slice(-1)[0]).trim();
                    provinceCodes?.every(item => item?.code !== provinceCode) && provinceCodes.push({
                        code: provinceCode,
                        value: item?.header?.address?.split(',')?.slice(-1)[0].trim()
                    })

                    await db.User.create({
                        id: userId,
                        name: item?.contact?.content?.find(i => i.name === "Liên hệ:")?.content,
                        password: hashPassword('123456'),
                        facebook: '1',
                        role: 'user',
                        email: '1',
                        avatar: '1',
                        phone: item?.contact?.content?.find(i => i.name === "Điện thoại:")?.content,
                        zalo: item?.contact?.content?.find(i => i.name === "Zalo")?.content,
                    })

                    await db.Image.create({
                        id: imagesId,
                        images: JSON.stringify(item?.images)
                    })

                    await db.Attribute.create({
                        id: attributeId,
                        price: item?.header?.attributes?.price,
                        acreage: item?.header?.attributes?.acreage,
                        published: item?.header?.attributes?.published,
                        hashtag: item?.header?.attributes?.hashtag
                    })
                    await db.Post.create({
                        id: postId,
                        title: item?.header?.title,
                        star: item?.header?.star,
                        labelCode: labelcode,
                        address: item?.header?.address,
                        attributeId: attributeId,
                        categoryCode: cate.code,
                        description: JSON.stringify(item?.mainContent?.content),
                        userId: userId,
                        overviewId: overviewId,
                        imageId: imagesId,
                        priceCode: dataPrice.find(price => price.max > +currentPrice && price.min <= +currentPrice)?.code,
                        acreageCode: dataArea.find(area => area.max > +areaCurrent && area.min <= +areaCurrent)?.code,
                        provinceCode,
                        statusCode: 'S2',
                        priceNumber: +currentPrice,
                        acreageNumber: +areaCurrent,
                    })

                    await db.Overview.create({
                        id: overviewId,
                        code: item?.overview?.content?.find(i => i.name === "Mã tin:")?.content,
                        area: item?.overview?.content?.find(i => i.name === "Khu vực")?.content,
                        type: item?.overview?.content?.find(i => i.name === "Loại tin rao:")?.content,
                        target: item?.overview?.content?.find(i => i.name === "Đối tượng thuê:")?.content,
                        bonus: item?.overview?.content?.find(i => i.name === "Gói tin:")?.content,
                        created: Date.now(),
                        expired: Date.now(),
                    })

                })
            })

            provinceCodes?.forEach(async (item) => {
                await db.Province.create(item)
            })
            labelCodes?.forEach(async (item) => {
                await db.Label.create(item)
            })
            resolve('done')
        }
        catch (e) {
            reject(e);
        }
    })
}

// // export const createPriceArea = () => {
// //     return new Promise(async (resolve, reject) => {
// //         try {
// //             dataPrice.forEach(async (item) => {
// //                 await db.Price.create({
// //                     code: item.code,
// //                     value: item.value
// //                 })
// //             })

// //             dataArea.forEach(async (item) => {
// //                 await db.Acreage.create({
// //                     code: item.code,
// //                     value: item.value
// //                 })
// //             })
// //             resolve('donePrice')
// //         }
// //         catch (e) {
// //             reject(e);
// //         }
// //     })
// // }

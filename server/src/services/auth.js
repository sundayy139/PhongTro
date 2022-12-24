import db from "../models/index";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { v4 } from 'uuid'
require('dotenv').config()

const hashPassword = (password) => bcrypt.hashSync(password, bcrypt.genSaltSync(12))

export const registerService = (body) => {
    return new Promise(async (resolve, reject) => {
        try {
            const user = await db.User.findOne({
                where: {
                    phone: body.phone
                },
                raw: true
            })
            if (user) {
                resolve({
                    err: 1,
                    msg: 'Số điện thoại đã được sử dụng'
                })
            } else {
                const respone = await db.User.create({
                    id: v4(),
                    phone: body.phone,
                    name: body.name,
                    role: body.role,
                    password: hashPassword(body.password)
                })

                const token = jwt.sign({ id: respone.id, phone: respone.phone, role: respone.role }, process.env.SECRET_KEY, { expiresIn: "2d" })
                resolve({
                    err: 0,
                    msg: "Đăng ký tài khoản thành công",
                    token
                })
            }
        } catch (e) {
            reject(e);
        }
    })
}

export const loginService = (body) => {
    return new Promise(async (resolve, reject) => {
        try {
            const user = await db.User.findOne({
                where: {
                    phone: body.phone
                },
                raw: true
            })
            if (user) {
                let check = bcrypt.compareSync(body.password, user.password);
                if (check) {
                    const token = jwt.sign({ id: user.id, phone: user.phone, role: user.role }, process.env.SECRET_KEY, { expiresIn: "2d" })
                    resolve({
                        err: 0,
                        msg: 'Đăng nhập thành công',
                        token
                    })
                } else {
                    resolve({
                        err: 2,
                        msg: 'Sai số điện thoại hoặc mật khẩu'
                    })
                }
            } else {
                resolve({
                    err: 1,
                    msg: 'Người dùng không tồn tại'
                })
            }
        } catch (e) {
            reject(e);
        }
    })
}




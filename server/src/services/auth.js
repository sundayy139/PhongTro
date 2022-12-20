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
                    msg: 'Phone already exists'
                })
            } else {
                const respone = await db.User.create({
                    id: v4(),
                    phone: body.phone,
                    name: body.name,
                    role: 'user',
                    password: hashPassword(body.password)
                })

                const token = jwt.sign({ id: respone.id, phone: respone.phone }, process.env.SECRET_KEY, { expiresIn: "2d" })
                resolve({
                    err: 0,
                    msg: "Register is successfully",
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
                        msg: 'Login success',
                        token
                    })
                } else {
                    resolve({
                        err: 2,
                        msg: 'Wrong password'
                    })
                }
            } else {
                resolve({
                    err: 1,
                    msg: 'User not found'
                })
            }
        } catch (e) {
            reject(e);
        }
    })
}


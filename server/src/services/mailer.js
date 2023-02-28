require('dotenv').config();
import nodemailer from 'nodemailer';
const Mailgen = require('mailgen')


export const sendMailService = (email, name, link) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!email || !link) {
                resolve({
                    err: 1,
                    msg: "Có lỗi gì đó rồi",
                })
            } else {
                let transporter = nodemailer.createTransport({
                    host: "smtp.gmail.com",
                    port: 587,
                    secure: false, // true for 465, false for other ports
                    auth: {
                        user: process.env.EMAIL_APP, // generated ethereal user
                        pass: process.env.PASSWORD_APP, // generated ethereal password
                    },
                });

                let MailGenerator = new Mailgen({
                    theme: 'default',
                    product: {
                        name: 'Phòng trọ 123',
                        link: process.env.CLIENT_URL
                    }
                })

                let response = {
                    body: {
                        name: name,
                        intro: 'Bạn đã yêu cầu đặt lại mật khẩu cho tài khoản của bạn tại Phongtro123.com ',
                        action: {
                            instructions: 'Vui lòng nhấp vào nút bên dưới để đặt lại mật khẩu của bạn. Link sẽ hết hạn sau 15 phút.',
                            button: {
                                color: '#22BC66',
                                text: 'Đặt lại mật khẩu',
                                link: link
                            }
                        }
                    },
                    outro: 'Nếu bạn không yêu cầu đặt lại mật khẩu, vui lòng bỏ qua email này.',
                }

                let mail = MailGenerator.generate(response)

                let message = {
                    from: 'Phòng Trọ', // sender address
                    to: email, // list of receivers
                    subject: 'Cấp lại mật khẩu', // Subject line,
                    html: mail
                }

                await transporter.sendMail(message)
                resolve({
                    err: 0,
                    msg: "Gửi email thành công",
                })
            }

        } catch (e) {
            reject(e);
        }
    })
}
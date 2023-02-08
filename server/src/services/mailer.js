require('dotenv').config();
import nodemailer from 'nodemailer';
import Mailgen from 'mailgen'

export const registerMailService = async (dataSend) => {

    const { name, email, text, subject } = dataSend

    let transporter = nodemailer.createTransport({
        host: "smtp.ethereal.email",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: process.env.EMAIL_APP, // generated ethereal user
            pass: process.env.PASSWORD_APP, // generated ethereal password
        },
    });

    let MailGennerator = new Mailgen({
        theme: 'default',
        product: {
            name: 'Mailgen',
            link: 'https://mailgen.js/'
        }
    })

    var emailBody = MailGennerator.generate({
        body: {
            name: name || email,
            intro: text || 'Chào mừng bạn đến với Phongtro123',
            outro: 'Nếu cần hỗ trợ hoặc có câu hỏi, hãy liên hệ lại với chúng tôi!'
        }
    })

    let message = {
        from: process.env.EMAIL_APP,
        to: email,
        subject: subject || "Đăng ký tài khoản thành công",
        html: emailBody
    }

    // send mail with defined transport object

    await transporter.sendMail(message)
}

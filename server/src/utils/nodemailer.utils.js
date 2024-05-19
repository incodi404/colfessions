import nodemail from "nodemailer"
import {asynchandler} from "../utils/asynchandler.utils.js"
import { BASE_LINK } from "../constant.js"

const transport = nodemail.createTransport({
    service: "gmail",
    auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS
    }
})


const mailSend = asynchandler(async (email, link, purpose="Verify Your Email") => {
    const mailOptions = {
        from: process.env.MAIL_USER,
        to: email,
        subject: purpose,
        html: `<a href="${BASE_LINK}/${link}"><button>Verify Email</button></a>`
    }

    try {
        transport.sendMail(mailOptions)
        return true
    } catch (error) {
        console.log("Error: Email sent failed!")
        return false
    }
})

export {mailSend}



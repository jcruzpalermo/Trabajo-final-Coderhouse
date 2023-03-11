import { createTransport } from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

const EMAIL = process.env.EMAIL;
const PASS = process.env.PASS_EMAIL_API;

const transporter = createTransport({
    host: `smtp.gmail.com`,
    port: 465,
    auth: {
        user: EMAIL,
        pass: PASS
    }
});

const sendEmail = async (options) => {
    try {
        const response = await transporter.sendMail(options);
    } catch (e) {
        console.error(e);
    }
}

export default sendEmail;
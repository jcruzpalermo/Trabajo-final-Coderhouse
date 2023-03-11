import twilio from "twilio";
import dotenv from "dotenv";
dotenv.config();

const accountSid = ''
const authToken = ''

const client = twilio(accountSid, authToken);

const sendSMS = async (body, from, to) => {
    try {
        const message = await client.messages.create({
            body: body,
            from: from,
            to: to
        })
        console.log(message);
    } catch (error) {
        console.log(error);
    }
}

export default sendSMS;
import twilio from "twilio";

const ACCOUNT_SID = ``;
const AUTH_TOKEN = ``;
const PHONE_NUMBER_WHATSAPP = ``;

const client = twilio(ACCOUNT_SID, AUTH_TOKEN);

const sendWhatsApp = async (body, from, to) => {
    try {
        const message = await client.messages.create({
            body: body,
            from: from,
            to: to
        })
        console.log(message);

    } catch (e) {
        console.error(e.message);
    }

}

export default sendWhatsApp;
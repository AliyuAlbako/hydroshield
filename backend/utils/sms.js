const africastalking = require("africastalking");

const client = africastalking({
    apiKey: process.env.AT_API_KEY,
    username: process.env.AT_USERNAME
});

const sms = client.SMS;

async function sendSMS(to, message) {
    try {
        const response = await sms.send({
            to: [to],
            message
        });

        return response;
    } catch (error) {
        console.error("SMS Error:", error);
        throw error;
    }
}

module.exports = sendSMS;

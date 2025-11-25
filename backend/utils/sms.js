const provider = process.env.SMS_PROVIDER || "mock";

async function sendSMSMock(phone, message) {
  console.log(`[MOCK SMS] To: ${phone} | Message: ${message}`);
  return { success: true };
}

async function sendSMS(phone, message) {
  if (provider === "mock") {
    return sendSMSMock(phone, message);
  }
  // Twilio or Africa's Talking can be plugged in here:
  if (provider === "twilio") {
    const Twilio = require("twilio");
    const client = new Twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
    return client.messages.create({ body: message, from: process.env.TWILIO_FROM, to: phone });
  }
  if (provider === "africastalking") {
    const africastalking = require("africastalking")({
      apiKey: process.env.AT_API_KEY,
      username: process.env.AT_USERNAME
    });
    const sms = africastalking.SMS;
    return sms.send({ to: [phone], message });
  }
  return sendSMSMock(phone, message);
}

module.exports = { sendSMS };

import twilio from "twilio";

const accountSid = process.env.TWILIO_SID;
const authToken = process.env.TWILIO_TOKEN;
const YOUR_TWILIO_PHONE_NUMBER = process.env.YOUR_TWILIO_PHONE_NUMBER;

const client = twilio(accountSid, authToken);

const sendOTP = async (phoneNumber, otp, data) => {
  try {
    const message = `${data?.username || "Your"} OTP is ${otp}.`;
    await client.messages.create({
      body: message,
      from: YOUR_TWILIO_PHONE_NUMBER,
      to: phoneNumber,
    });
    console.log(`OTP sent to ${phoneNumber}`);
  } catch (err) {
    console.error(err);
  }
};

////usage example
// sendOTP("+1234567890", "123456");
export default sendOTP;

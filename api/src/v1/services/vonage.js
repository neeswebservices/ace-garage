import { Vonage } from "@vonage/server-sdk";

const vonage = new Vonage({
  apiKey: "c5bbd5c5",
  apiSecret: "x9dGlx2tzuMYY6hs",
});

const from = "Ace Garage";

async function sendSMS(to, text) {
  await vonage.sms
    .send({ to, from, text })
    .then((resp) => {
      console.log("Message sent successfully");
      console.log(resp);
    })
    .catch((err) => {
      console.log("There was an error sending the messages.");
      console.error(err);
    });
}

export default sendSMS;

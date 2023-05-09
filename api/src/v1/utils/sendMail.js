import sgMail from "@sendgrid/mail"

sgMail.setApiKey(process.env.SENDGRID_API_KEY)

export const sendMail = async (email, link) => {
	const mail = {
		to: email,
		from: process.env.EMAIL_FROM, // Change to your verified sender
		subject: "Please Activate your Account !",
		text: `Please refer to this link to activate your account : ${link} `,
		html: `<strong> <a href='${link}'>Activate</a></strong> <br> if button doesn't work ${link}`,
	}

	return await sgMail
		.send(mail)
		.then((response) => {
			return response[0].headers
		})
		.catch((error) => {
			return error
		})
}

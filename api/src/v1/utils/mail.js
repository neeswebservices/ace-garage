import nodemailer from 'nodemailer';

const SendMail = async (subject, message, sendTo, sendFrom, replyTo) => {
    try {
        // email transporter
        const transporter = nodemailer.createTransport({
            host: process.env.EMAIL_HOST,
            port: 587,
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
            tls: {
                rejectUnauthorized: false,
            },
        });

        // Options
        const options = {
            from: sendFrom,
            to: sendTo,
            replyTo: replyTo,
            subject: subject,
            html: message,
        };

        await transporter.sendMail(options);
        return true;
    } catch (err) {
        console.log(err.message);
        return false;
    }
};

export default SendMail;

import 'dotenv/config';
import nodemailer from 'nodemailer';

const { HOST, SERVICE, USER, PASS } = process.env;

export const sendEmail = async (email, subject, text) => {
  try {
    const transporter = nodemailer.createTransport({
      host: HOST,
      service: SERVICE,
      port: 587,
      secure: true,
      auth: {
        user: USER,
        pass: PASS
      }
    });

    await transporter.sendMail({
      from: USER,
      to: email,
      subject: subject,
      text: text
    });

    console.log('Email was sucessfully sent!');
  } catch (error) {
    console.log(error, 'Email was not sent');
  }
};

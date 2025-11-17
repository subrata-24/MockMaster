import nodemailer from "nodemailer";

/* 
    - A transporter is like a “mailman”  → it knows how to connect to  Gmail’s SMTP server.
    - service: "Gmail" → tells Nodemailer you’re using Gmail as the provider.
    - port: 465, secure: true → means it uses SSL encryption (the secure way).
    - auth → your Gmail credentials are pulled from.env.
*/
const transporter = nodemailer.createTransport({
  host: "smtp.ethereal.email",
  port: 465,
  secure: true, // true for 465, false for other ports
  auth: {
    user: process.env.EMAIL,
    pass: process.env.APP_PASSWORD,
  },
});

export const sendSignUpOTP = async ({ to, otp }) => {
  await transporter.sendMail({
    from: process.env.EMAIL,
    to,
    subject: "Verify your sign up otp",
    html: `Your OTP for sign up verification is ${otp}.It will expires in 5 minutes`,
  });
};

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
    user: "maddison53@ethereal.email",
    pass: "jn7jnAPss4f63QBp6D",
  },
});

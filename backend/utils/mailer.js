import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

/* 
    - A transporter is like a “mailman”  → it knows how to connect to  Gmail’s SMTP server.
    - service: "Gmail" → tells Nodemailer you’re using Gmail as the provider.
    - port: 465, secure: true → means it uses SSL encryption (the secure way).
    - auth → your Gmail credentials are pulled from.env.
*/
const transporter = nodemailer.createTransport({
  service: "Gmail",
  port: 465,
  secure: true, // true for 465, false for other ports
  auth: {
    user: process.env.EMAIL,
    pass: process.env.APP_PASSWORD,
  },
});

export const sendSignUpOTP = async ({ to, otp }) => {
  const htmlTemplate = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Verify Your Account</title>
    </head>
    <body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f4f4f4;">
      <table role="presentation" style="width: 100%; border-collapse: collapse;">
        <tr>
          <td align="center" style="padding: 40px 0;">
            <table role="presentation" style="width: 600px; border-collapse: collapse; background-color: #ffffff; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
              
              <!-- Header -->
              <tr>
                <td style="padding: 40px 40px 20px 40px; text-align: center; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border-radius: 8px 8px 0 0;">
                  <h1 style="margin: 0; color: #ffffff; font-size: 28px; font-weight: 600;">MockMaster</h1>
                  <p style="margin: 10px 0 0 0; color: #f0f0f0; font-size: 14px;">Account Verification</p>
                </td>
              </tr>
              
              <!-- Content -->
              <tr>
                <td style="padding: 40px;">
                  <h2 style="margin: 0 0 20px 0; color: #333333; font-size: 24px; font-weight: 600;">Verify Your Email Address</h2>
                  <p style="margin: 0 0 20px 0; color: #666666; font-size: 16px; line-height: 1.6;">
                    Thank you for signing up with MockMaster! To complete your registration, please use the verification code below:
                  </p>
                  
                  <!-- OTP Box -->
                  <table role="presentation" style="width: 100%; margin: 30px 0;">
                    <tr>
                      <td align="center">
                        <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border-radius: 8px; padding: 20px; display: inline-block;">
                          <p style="margin: 0; color: #ffffff; font-size: 14px; font-weight: 500; letter-spacing: 1px; text-transform: uppercase;">Your Verification Code</p>
                          <p style="margin: 10px 0 0 0; color: #ffffff; font-size: 36px; font-weight: 700; letter-spacing: 8px; font-family: 'Courier New', monospace;">${otp}</p>
                        </div>
                      </td>
                    </tr>
                  </table>
                  
                  <p style="margin: 20px 0; color: #666666; font-size: 16px; line-height: 1.6;">
                    This code will expire in <strong style="color: #333333;">2 minutes</strong> for your security.
                  </p>
                  
                  <!-- Security Notice -->
                  <div style="background-color: #fff3cd; border-left: 4px solid #ffc107; padding: 15px; margin: 20px 0; border-radius: 4px;">
                    <p style="margin: 0; color: #856404; font-size: 14px; line-height: 1.5;">
                      <strong>Security Tip:</strong> Never share this code with anyone. MockMaster will never ask for your verification code.
                    </p>
                  </div>
                  
                  <p style="margin: 20px 0 0 0; color: #666666; font-size: 14px; line-height: 1.6;">
                    If you didn't request this code, please ignore this email or contact our support team.
                  </p>
                </td>
              </tr>
              
              <!-- Footer -->
              <tr>
                <td style="padding: 30px 40px; background-color: #f8f9fa; border-radius: 0 0 8px 8px; text-align: center;">
                  <p style="margin: 0 0 10px 0; color: #999999; font-size: 14px;">
                    © 2025 MockMaster. All rights reserved.
                  </p>
                  <p style="margin: 0; color: #999999; font-size: 12px;">
                    This is an automated email. Please do not reply to this message.
                  </p>
                </td>
              </tr>
              
            </table>
          </td>
        </tr>
      </table>
    </body>
    </html>
  `;

  await transporter.sendMail({
    from: process.env.EMAIL, //`"MockMaster" <${process.env.EMAIL}>`,
    to,
    subject: "Verify Your MockMaster Account - OTP Inside",
    html: htmlTemplate,
  });
};

export const sendPasswordResetOTP = async ({ to, otp }) => {
  const htmlTemplate = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Password Reset Request</title>
    </head>
    <body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f4f4f4;">
      <table role="presentation" style="width: 100%; border-collapse: collapse;">
        <tr>
          <td align="center" style="padding: 40px 0;">
            <table role="presentation" style="width: 600px; border-collapse: collapse; background-color: #ffffff; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
              
              <!-- Header -->
              <tr>
                <td style="
                    padding: 40px 40px 20px 40px; 
                    text-align: center; 
                    background: linear-gradient(135deg, #ff5f6d 0%, #ffc371 100%);
                    border-radius: 8px 8px 0 0;
                ">
                  <h1 style="margin: 0; color: #ffffff; font-size: 28px; font-weight: 600;">MockMaster</h1>
                  <p style="margin: 10px 0 0 0; color: #f0f0f0; font-size: 14px;">Password Reset Request</p>
                </td>
              </tr>
              
              <!-- Content -->
              <tr>
                <td style="padding: 40px;">
                  <h2 style="margin: 0 0 20px 0; color: #333333; font-size: 24px; font-weight: 600;">Reset Your Password</h2>
                  <p style="margin: 0 0 20px 0; color: #666666; font-size: 16px; line-height: 1.6;">
                    We received a request to reset your MockMaster account password.
                    Use the verification code below to continue with the reset process:
                  </p>
                  
                  <!-- OTP BOX -->
                  <table role="presentation" style="width: 100%; margin: 30px 0;">
                    <tr>
                      <td align="center">
                        <div style="
                            background: linear-gradient(135deg, #ff5f6d 0%, #ffc371 100%);
                            border-radius: 8px; 
                            padding: 20px; 
                            display: inline-block;
                        ">
                          <p style="margin: 0; color: #ffffff; font-size: 14px; font-weight: 500; letter-spacing: 1px; text-transform: uppercase;">
                            Your Reset Code
                          </p>
                          <p style="
                              margin: 10px 0 0 0; 
                              color: #ffffff; 
                              font-size: 36px; 
                              font-weight: 700; 
                              letter-spacing: 8px; 
                              font-family: 'Courier New', monospace;
                          ">
                            ${otp}
                          </p>
                        </div>
                      </td>
                    </tr>
                  </table>

                  <p style="margin: 20px 0; color: #666666; font-size: 16px; line-height: 1.6;">
                    This code will expire in <strong style="color: #333333;">2 minutes</strong>.
                  </p>

                  <!-- Security Notice -->
                  <div style="
                      background-color: #f8d7da;
                      border-left: 4px solid #dc3545;
                      padding: 15px;
                      margin: 20px 0;
                      border-radius: 4px;
                  ">
                    <p style="margin: 0; color: #721c24; font-size: 14px; line-height: 1.5;">
                      <strong>Important:</strong> If you did not request a password reset,
                      please secure your account immediately or contact our support team.
                    </p>
                  </div>

                  <p style="margin: 20px 0 0 0; color: #666666; font-size: 14px; line-height: 1.6;">
                    If this request wasn't made by you, simply ignore this email—your password will remain unchanged.
                  </p>
                </td>
              </tr>

              <!-- Footer -->
              <tr>
                <td style="
                    padding: 30px 40px; 
                    background-color: #f8f9fa; 
                    border-radius: 0 0 8px 8px; 
                    text-align: center;
                ">
                  <p style="margin: 0 0 10px 0; color: #999999; font-size: 14px;">
                    © 2025 MockMaster. All rights reserved.
                  </p>
                  <p style="margin: 0; color: #999999; font-size: 12px;">
                    This is an automated email. Do not reply.
                  </p>
                </td>
              </tr>
              
            </table>
          </td>
        </tr>
      </table>
    </body>
    </html>
  `;

  await transporter.sendMail({
    from: process.env.EMAIL,
    to,
    subject: "MockMaster Password Reset - OTP Code",
    html: htmlTemplate,
  });
};

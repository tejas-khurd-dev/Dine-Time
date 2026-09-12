const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

const sendOTP = async (email, otp) => {
  try {
    await transporter.sendMail({
      from: `"DineTime" <${process.env.SMTP_USER}>`,
      to: email,
      subject: "Your DineTime verification code",
      text: `Your DineTime verification code is ${otp}. This code is valid for 5 minutes. If you did not request this code, please ignore this email.`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <title>DineTime Verification</title>
        </head>
        <body style="margin:0;padding:0;background-color:#f4f4f5;font-family:Arial,Helvetica,sans-serif;">
            <div style="max-width:600px;margin:40px auto;background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 4px 15px rgba(0,0,0,0.08);">
                <div style="background:#1f4d3a;padding:28px 30px;text-align:center;">
                    <h1 style="margin:0;color:#f4a261;font-size:30px;letter-spacing:1px;">DineTime</h1>
                    <p style="margin:8px 0 0;color:#d1d5db;font-size:14px;">Your gateway to amazing dining</p>
                </div>
                <div style="padding:35px 30px;">
                    <h2 style="margin:0 0 15px;color:#111827;font-size:24px;">Verify your account</h2>
                    <p style="color:#4b5563;font-size:15px;line-height:1.6;">Hello,</p>
                    <p style="color:#4b5563;font-size:15px;line-height:1.6;">Use the verification code below to complete your DineTime account verification.</p>
                    <div style="margin:30px 0;padding:20px;background:#f9fafb;border:1px solid #e5e7eb;border-radius:10px;text-align:center;">
                        <div style="color:#6b7280;font-size:13px;margin-bottom:10px;">Your verification code</div>
                        <div style="color:#111827;font-size:34px;font-weight:bold;letter-spacing:10px;">${otp}</div>
                    </div>
                    <p style="color:#4b5563;font-size:14px;line-height:1.6;">This code will expire in <strong>5 minutes</strong>.</p>
                    <p style="color:#6b7280;font-size:13px;line-height:1.6;">If you did not request this verification code, you can safely ignore this email.</p>
                </div>
                <div style="background:#f9fafb;padding:22px 30px;text-align:center;border-top:1px solid #e5e7eb;">
                    <p style="margin:0;color:#6b7280;font-size:12px;">© ${new Date().getFullYear()} DineTime. All rights reserved.</p>
                    <p style="margin:8px 0 0;color:#9ca3af;font-size:11px;">This is an automated email. Please do not reply.</p>
                </div>
            </div>
        </body>
        </html>
      `,
    });

  } catch (error) {
    console.error("Error sending OTP email:", error);
    throw error;
  }
};

module.exports = { sendOTP };

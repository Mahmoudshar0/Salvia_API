const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: process.env.SMTP_SECURE === "true", // true for 465, false for other ports
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

/**
 * Send an email using NodeMailer
 * @param {Object} options - { to, subject, text, html }
 * @returns {Promise}
 */
async function sendMail(options) {
  const mailOptions = {
    from: process.env.SMTP_FROM || process.env.SMTP_USER,
    ...options,
  };
  return transporter.sendMail(mailOptions);
}

module.exports = { sendMail };

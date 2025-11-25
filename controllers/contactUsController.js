const ContactUs = require('../models/contactUs.model');
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER, // ضع في .env
    pass: process.env.APP_PASS  // ضع في .env
  }
});

exports.getSiteInfo = async (req, res) => {
  try {
    let contact = await ContactUs.findOne();
    if (!contact) {
      contact = new ContactUs();
      await contact.save();
      console.log('Created default Contact Us document');
    }
    res.status(200).json({ pageTitle: contact.pageTitle, description: contact.description, address: contact.address, phone: contact.phone, email: contact.email });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateSiteInfo = async (req, res) => {
  try {
    const { pageTitle, description, address, phone, email } = req.body;
    let contact = await ContactUs.findOne();
    if (!contact) {
      contact = new ContactUs();
    }
    contact.pageTitle = pageTitle || contact.pageTitle;
    contact.description = description || contact.description;
    contact.address = address || contact.address;
    contact.phone = phone || contact.phone;
    contact.email = email || contact.email;
    await contact.save();
    res.status(200).json({ message: 'Site info updated successfully', pageTitle: contact.pageTitle, description: contact.description, address: contact.address, phone: contact.phone, email: contact.email });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.sendInquiry = async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    const mailOptions = {
      from: email,
      to: process.env.EMAIL_USER, 
      subject: `New Inquiry: ${subject}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 8px; background-color: #f9f9f9; }
            .header { background-color: #4E6347; color: #fff; padding: 15px; text-align: center; border-radius: 8px 8px 0 0; }
            .content { padding: 20px; background-color: #fff; }
            .field { margin-bottom: 15px; }
            .label { font-weight: bold; color: #555; display: block; margin-bottom: 5px; }
            .value { background-color: #f5f5f5; padding: 10px; border-radius: 4px; border: 1px solid #eee; }
            .footer { text-align: center; margin-top: 20px; font-size: 12px; color: #888; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h2>New Inquiry Received</h2>
            </div>
            <div class="content">
              <div class="field">
                <span class="label">Name:</span>
                <div class="value">${name}</div>
              </div>
              <div class="field">
                <span class="label">Email:</span>
                <div class="value">${email}</div>
              </div>
              <div class="field">
                <span class="label">Subject:</span>
                <div class="value">${subject}</div>
              </div>
              <div class="field">
                <span class="label">Message:</span>
                <div class="value" style="white-space: pre-wrap;">${message}</div>
              </div>
            </div>
            <div class="footer">
              <p>&copy; ${new Date().getFullYear()} Salvia Naturals. All rights reserved.</p>
            </div>
          </div>
        </body>
        </html>
      `
    };

    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: 'Inquiry sent successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
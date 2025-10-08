const ContactUs = require('../models/contactUs.model');
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER, // ضع في .env
    pass: process.env.EMAIL_PASS  // ضع في .env
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
    const contact = await ContactUs.findOne();
    if (!contact) {
      return res.status(404).json({ message: 'Contact info not found' });
    }

    const mailOptions = {
      from: email,
      to: contact.email, 
      subject: subject,
      text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`
    };

    await transporter.sendMail(mailOptions);
    contact.inquiries.push({ name, email, subject, message });
    await contact.save();
    res.status(200).json({ message: 'Inquiry sent successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "0xzeous@gmail.com",
    pass: "vsyp qewe rkxu hkrp",
  },
});

let options = {
  from: "test125x@gmail.com",
  to: "0xzeous@gmail.com",
  subject: "Salvia API Contact Form",
  text: `<h1><strong>Test Email</strong><br/>This is a test email sent from Salvia API. </h1>`,
};

transporter.sendMail(options, (err, res) => {
  if (err) {
    console.log(err);
  } else {
    console.log("Email Sent");
    console.log(res.response);
  }
})
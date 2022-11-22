const functions = require("firebase-functions");
const admin = require("firebase-admin");
const nodemailer = require("nodemailer");

//Initializing Firebase Admin SDK
admin.initializeApp();

//Creating Nodemailer transporter using your Mailtrap SMTP details
var transport = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "e38d670e319986",
    pass: "0cf4776b9fbf72",
  },
});

//Creating a Firebase Cloud Function
exports.emailSender = functions.https.onRequest((req, res) => {
  //Defining mailOptions
  const mailOptions = {
    from: "saqlainshahbaltee@gmail.com", //Adding sender's email
    to: req.query.dest, //Getting recipient's email by query string
    subject: "Email Sent via Firebase and Nodemailer", //Email subject
    html: "<b>Congrats on having an account with us!</b>", //Email content in HTML
  };

  //Returning result
  return transport.sendMail(mailOptions, (err, info) => {
    if (err) {
      return res.send(err.toString());
    }
    return res.send("Email sent succesfully");
  });
});

const express = require('express');
const nodemailer = require('nodemailer');
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 8000;
// Middleware to parse JSON bodies
app.use(express.json());
console.log(PORT , ".................. || PORT ||.................");

// Create a transporter object using SMTP transport
const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOSTNAME, // SMTP server hostname
    port: process.env.SMTP_PORT, // SMTP port
    secure: true, // true for secure connection (SSL/TLS)
    auth: {
        user: process.env.SMTP_EMAIL, // Your email address
        pass: process.env.SMTP_PASSWORD // Your email password
    }
});
console.log(transporter , "++++++++++++++++++ |SMTP Details| ++++++++++++++");
// Define a route to send email
app.post('/send-email', (req, res) => {
    // Extract recipient email from request body
    const recipientEmail = req.body.email;

    if (!recipientEmail) {
        return res.status(400).send('Recipient email is required.');
    }

    // Email options
    const mailOptions = {
        from: process.env.FROM_EMAIL, // Sender address
        to: recipientEmail, // List of recipients
        subject: 'Test Email', // Subject line
        text: 'This is a test email sent from Node.js.' // Plain text body
    };
    console.log(mailOptions , "mailOptions");
    console.log('Sending email..............');

    // Send email
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error occurred:', error);
            res.status(500).send('Error occurred while sending email.');
        } else {
            console.log('Email sent:', info.response);
            res.send(`Email sent successfully to ${recipientEmail}. Now check your email.`);
        }
    });    
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

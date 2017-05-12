const nodemailer = require('nodemailer');

const myEmail = 'arnavaggrwl@gmail.com';

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: myEmail,
        pass: process.env.EMAIL_APP_PASSWORD
    }
});

const mailOptions = {
    from: myEmail,
    to: myEmail,
    subject: 'test email',
    text: 'test...'
};

transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
        console.log(error);
    } else {
        console.log('Email sent:', info.response);
    }
});

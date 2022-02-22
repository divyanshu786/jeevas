var nodemailer = require('nodemailer');

module.exports = {
    /**
     * [Check post key validation]
     */
    checkRequest: (array, obj) => {
        for (let j of array) {
            if (obj[j] == undefined || obj[j] == "")
                return j;
        }
        return true;
    },
    sendEmail: async (name, email) => {
        console.log(name,"userData  userData", email);
        var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.GMAIL_EMAIL,
            pass: process.env.GMAIL_PASSWORD
        }
        });

        var mailOptions = {
            from: 'div94gaur@gmail.com',
            to: email,
            subject: 'Welcome Email',
            text: 'Thanks you for signing up, '+name
        };

        transporter.sendMail(mailOptions, function(error, info){
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        });
    }
}
var nodemailer = require('nodemailer');

module.exports = {
    sendHtmlMail(from, to, subjectText, htmlBody){
        // setup email data with unicode symbols
        let mailOptions = {
            from: '"BlackJack Game" ' + from, // sender address
            to: to, // list of receivers
            subject: subjectText, // Subject line
            html: htmlBody // html body
        };

        sendMail(mailOptions);
    },

    sendTextMail(from, to, subjectText, message){
        // setup email data with unicode symbols
        let mailOptions = {
            from: '"BlackJack Game" ' + from, // sender address
            to: to, // list of receivers
            subject: subjectText, // Subject line
            text: message, // plain text body
        };

        sendMail(mailOptions);
    }
}

function sendMail(mailOptions){
    // Generate SMTP service account from ethereal.email
    nodemailer.createTestAccount((err, account) => {
        if (err) {
            console.error('NODEMAILER:: Failed to create a testing account. ' + err.message);
        }

        console.log('NODEMAILER:: Credentials obtained, sending message...');

        // Create a SMTP transporter object
        let transporter = nodemailer.createTransport({
            host: account.smtp.host,
            port: account.smtp.port,
            secure: account.smtp.secure,
            auth: {
                user: account.user,
                pass: account.pass
            }
        });

        // send mail with defined transport object
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return console.log(error);
            }
            console.log('NODEMAILER:: Message sent: %s', info.messageId);
            // Preview only available when sending through an Ethereal account
            console.log('NODEMAILER:: Preview URL: %s', nodemailer.getTestMessageUrl(info));
        });
    });
}
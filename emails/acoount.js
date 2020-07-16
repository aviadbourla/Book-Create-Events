
const sgMail = require('@sendgrid/mail');
const { emailPassword, myEmail } = require('./keys');

const sendgridAPIKey = emailPassword

sgMail.setApiKey(sendgridAPIKey)

const sendWelcomeEmail = (email, name) => {
    sgMail.send({
        to: email,
        from: myEmail,
        subject: 'Thanks for joinin in !',
        text: `Hey friend, Welcome to BookinEvent, Let me know how you get Along With the app!`
    })
}

module.exports = {
    sendWelcomeEmail
}
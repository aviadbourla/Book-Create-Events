
const sgMail = require('@sendgrid/mail');
const { myEmail } = require('../keys');

const sendgridAPIKey = process.env.EMAIL_API
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
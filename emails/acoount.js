
const sgMail = require('@sendgrid/mail');
const sendgridAPIKey = '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'

sgMail.setApiKey(sendgridAPIKey)

const sendWelcomeEmail = (email, name) => {
    sgMail.send({
        to: email,
        from: 'aviad.bourla@gmail.com',
        subject: 'Thanks for joinin in !',
        text: `Hey friend, Welcome to BookinEvent, Let me know how you get Along With the app!`
    })
}

module.exports = {
    sendWelcomeEmail
}
const sgEmail = require('@sendgrid/mail')
require('dotenv').config();

const { SENDGRID_API_KEY } = process.env;

sgEmail.setApiKey(SENDGRID_API_KEY);

const sendEmail = async (data) => {
    try {
        const email = { ...data, from: 'andreybaranyuk86@gmail.com' };
        await sgEmail.send(email)
        return true;
    } catch (error) {
        console.log(error.message)
    }
};


module.exports = sendEmail;
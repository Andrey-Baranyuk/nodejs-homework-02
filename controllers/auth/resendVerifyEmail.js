const { createError, sendEmail } = require('../../helpers');
const {User, schemas} = require('../../models/users')

const resendVerifyEmail = async (req, res) => {
    const { email } = req.body;
    const { error } = schemas.email.validate(email);
    if (error) {
        throw createError(400, error.message);
    }
    const user = await User.findOne({ email });
    if (!user) {
        throw createError(404);
    }
    if (user.verify) {
        throw createError(400, 'Verification has already been passed')
    }
    const mail = {
        to: email,
        subject: 'Підтвердження реєстрації на сайті',
        html: `<a target="_blank" href='http://localhost3000/api/auth/verify/${user.verificationToken}'>Натисніть для підтвердження</a>`
    };

    await sendEmail(mail);
    res.json({
        message: 'Verification email sent'
    })
}

module.exports = resendVerifyEmail;
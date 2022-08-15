const { User } = require('../../models');
const bcrypt = require('bcryptjs');
const gravatar = require('gravatar');
const nanoid = require('nanoid');
const { sendEmail } = require('../../helpers');

const signup = async (req, res, next) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (user) {
        res.status(409).json({
            status: 'conflict',
            code: 409,
            message: 'Email in use'
        });
    }
    const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
    const avatarURL = gravatar.url(email)
    const verificationToken = nanoid();
    await User.create({ email, password: hashPassword, avatarURL, verificationToken })
    const mail = {
        to: email,
        subject: 'Підтвердження реєстрації на сайті',
        html: `<a target="_blank" href='http://localhost3000/api/auth/verify/${verificationToken}'>Натисніть для підтвердження</a>`
    };
    await sendEmail(mail);
    res.status(201).json({
        status: 'success',
        code: 201,
        data: {
            user: {
                email,
                'subscription': 'starter'
            }
        }
    })
}

module.exports = signup;

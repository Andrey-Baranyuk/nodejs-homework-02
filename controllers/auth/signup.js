const { User } = require('../../models');
const bcrypt = require('bcryptjs');

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

    await User.create({ email, password: hashPassword })
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

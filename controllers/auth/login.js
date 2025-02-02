const { User } = require('../../models')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { createError } = require('../../helpers');
const { SECRET_KEY } = process.env;

const login = async (req, res, next) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email })
    const passCompare = bcrypt.compareSync(password, user.password);
    
    if (!user || !passCompare) {
        throw createError(401, 'Email or password is wrong')
    };

    if (!user.verify) {
        throw createError(401, 'Email not verify')
    }

    const payload = { id: user._id };

    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '1h' });
    await User.findByIdAndUpdate(user._id, { token })
    res.status(200).json({
        status: 'success',
        code: 200,
        data: {
            email,
            token,
            subscription: 'starter'
        }
    })
}

module.exports = login;

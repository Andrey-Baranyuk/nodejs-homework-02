const { User } = require('../../models')

const subscriptionUpdate = async (req, res, next) => {
    const { email, subscription } = req.user;
    const user = await User.findOne({ email });
    const result = await User.findByIdAndUpdate(user._id, req.body, { new: true });
    if (!result) {
        res.status(404).json({
            status: 'error',
            code: 404,
            message: 'Not found'
        })
    }

    res.status(200).json({
        message: 'subscription successfully updated',
        code: 200,
        data: {
            email,
            subscription
        }
    })
}

module.exports = subscriptionUpdate;
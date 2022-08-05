const getCurrent = async (req, res, next) => {
    const { email, subscription, avatar } = req.user;
    res.status(200).json({
        status: 'success',
        code: 200,
        data: {
            user: {
                email,
                subscription,
                avatar
            }
        }
    })
}

module.exports = getCurrent;

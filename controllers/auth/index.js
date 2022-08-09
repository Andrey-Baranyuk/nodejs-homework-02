const login = require('./login')
const signup = require('./signup')
const logout = require('./logout')
const setAvatar = require('./setAvatar')
const verifyEmail = require('./verifyEmail')
const resendVerifyEmail = require('./resendVerifyEmail')

module.exports = {
    login,
    signup,
    logout,
    setAvatar,
    verifyEmail,
    resendVerifyEmail,
}
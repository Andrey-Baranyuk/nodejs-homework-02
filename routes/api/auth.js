const express = require('express');
const router = express.Router();

const { ctrlWrapper } = require('../../middlewares/ctrlWrapper');
const { auth } = require('../../middlewares/auth');

const { userAuthValidation } = require('../../middlewares/validation');
const { auth: ctrl } = require('../../controllers');

router.post('/signup', userAuthValidation, ctrlWrapper(ctrl.signup));
router.get('/verify/:verificationToken', ctrlWrapper(ctrl.verifyEmail));
router.post('/verify', ctrlWrapper(ctrl.resendVerifyEmail));
router.post('/login', ctrlWrapper(ctrl.login));
router.get('/logout', auth, ctrlWrapper(ctrl.logout));

module.exports = router;

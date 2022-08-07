const express = require('express');
const router = express.Router();

const { ctrlWrapper } = require('../../middlewares/ctrlWrapper');
const { auth } = require('../../middlewares/auth');
const { subscriptionValidation } = require('../../middlewares/validation')
const { users: ctrl } = require('../../controllers');
const { upload } = require('../../middlewares/upload');

router.get('/current', auth, ctrlWrapper(ctrl.getCurrent));
router.patch('/subscription', auth, subscriptionValidation, ctrlWrapper(ctrl.subscriptionUpdate));
router.patch('/avatars', auth, upload.single('avatar'), ctrlWrapper(ctrl.setAvatar));
 
module.exports = router;
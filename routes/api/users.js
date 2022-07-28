const express = require('express');
const router = express.Router;

const { ctrlWrapper } = require('../../middlewares/ctrlWrapper');
const { auth } = require('../../middlewares/auth');
const { subscriptionValidation } = require('../../middlewares/validation');
const { user: ctrl } = require('../../controllers');

router.get('/current', auth, ctrlWrapper(ctrl.getCurrent));
router.patch('/subscription', auth, subscriptionValidation, ctrlWrapper(ctrl.subscriptionUpdate));

 
module.exports = router;
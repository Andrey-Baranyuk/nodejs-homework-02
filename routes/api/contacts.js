const express = require('express')
// const { basedir } = global;
const router = express.Router()

// const { ctrlWrapper } = require(`${basedir}/middlewares/ctrlWrapper`)
const { ctrlWrapper } = require('../../middlewares/ctrlWrapper');

const { contactValidation, statusValidation } = require('../../middlewares/validation.js')
const { contacts:ctrl } = require('../../controllers');

router.get('/', ctrlWrapper(ctrl.listContacts));

router.get('/:id', ctrlWrapper(ctrl.getContactById));

router.post('/', contactValidation, ctrlWrapper(ctrl.addContact));

router.delete('/:id', ctrlWrapper(ctrl.removeContact));

router.put('/:id', contactValidation, ctrlWrapper(ctrl.updateContact));

router.patch('/:id/favorite', statusValidation, ctrlWrapper(ctrl.updateStatusContact));

module.exports = router;

const express = require('express')
const router = express.Router()

const {getContacts, getOneContactById, addNewContact, deleteContactById, updateExistingContact} = require('../../controllers/contactController')

router.get('/', getContacts);

router.get('/', getOneContactById);

router.post('/', addNewContact);

router.delete('/', deleteContactById);

router.put('/', updateExistingContact)

module.exports = router;

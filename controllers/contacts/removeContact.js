const { Contact } = require('../../models/contacts/contact')

const removeContact = async (req, res, next) => {
    const { id } = req.params;
    const result = await Contact.findByIdDelete(id);
    if (!result) {
        res.status(404)({
            status: 'error',
            code: 404,
            message: 'not found'
        })
    }
    res.status(200).json({
        status: 'success',
        code: 200,
        message: 'contact deleted',
        data: {result}
    })
}

module.exports = removeContact;
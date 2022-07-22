const { Contact } = require('../../models/contacts/contact')

const updateStatusContact = async (req, res, next) => {
    const { id } = req.params;
    const { favorite } = req.body;

    const result = await Contact.findByIdAndUpdate(id, { favorite }, { new: true })
    if (!result) {
        res.status(404).json({
            status: 'error',
            code: 404,
            message: 'Not found'
        })
    }
    res.status(200).json({
        message: 'contact successfully update',
        code: 200,
        data: {result}
    })
}

module.exports = updateStatusContact;

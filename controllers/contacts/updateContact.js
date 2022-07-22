const { Contact } = require('../../models/contacts')

const updateContact = async (req, res, next) => {
    const { id } = req.params;
    const result = await Contact.findByIdAndUpdate(id, req.body, { new: true })
    
    if (result) {
        res.status(200).json({
            message: 'contact successfully updated',
            code: 200,
            data: {result}
        })
    }
}

module.exports = updateContact;

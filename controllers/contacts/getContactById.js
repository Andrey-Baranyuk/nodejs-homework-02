const { Contact } = require('../../models/contacts/contact')

const getContactById = async (req, res, next) => {
    const { id } = req.params;
    const result = await Contact.findById(id);
    console.log(result)
    if (!result) {
        res.status(404).json({
            status: 'error',
            code: 404,
            message: `Contact with id=${id} not found`
        })
    }
    res.status(200).json({
        status: 'success',
        code: 200,
        data: {result}
    })
}

module.exports = getContactById;

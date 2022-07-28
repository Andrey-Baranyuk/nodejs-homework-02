const { Contact } = require('../../models/contacts')

const listContacts = async (req, res, next) => {
    const { page = 1, limit = 20 } = req.query;
    const skip = (page - 1) * limit;
    const result = await Contact.find({}, '', {skip, limit: Number(limit)})
    res.status(200).json({
        status: 'success',
        code: 200,
        data: {result},
    })
}

module.exports = listContacts;

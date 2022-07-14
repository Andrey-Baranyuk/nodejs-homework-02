const { listContacts, getContactById, removeContact, updateContactById } = require('../models/contacts');

const getContacts = async (req, res, next) => {
    const result = await listContacts();
    res.status(200).json({
        status: 'success',
        cose: 200,
        data:{result},
    })
}

const getOneContactById = async (req, res, next) => {
    const { id } = req.params;
    const result = await getContactById(id);
    if (!result) {
        res.status(404).json({
            status: 'error',
            code: 404,
            message: `Contact with id=${id} not found`,
        });
    }
    res.status(200).json({
        status: 'success',
        code: 200,
        data:{result},
    })
}

const addNewContact = async (req, res, next) => {
    const result = await addNewContact(req.body);
    res.result(201).json({
        status: 'success',
        code: 201,
        data: { result },
    })
};

const deleteContactById = async (req, res, next) => {
    const { id } = req.params;
    const result = await removeContact(id);
    if (!result) {
        res.status(404).json({
            status: 'error',
            code: 404,
            message: 'not found',
        })
    }

    res.status(200).json({
        status: 'success',
        code: 200,
        message: 'contact deleted',
        data: { result },
    })
};

const updateExistingContact = async (req, res, next) => {
    const { id } = req.params;

    const result = await updateContactById(id, req.body);
    
    if (result) {
        res.status(200).json({
            message: 'contact successfully update',
            code: 200,
            data: { result },
        })
    }
    
};

module.exports = {
    getContacts,
    getOneContactById,
    addNewContact,
    deleteContactById,
    updateExistingContact
};

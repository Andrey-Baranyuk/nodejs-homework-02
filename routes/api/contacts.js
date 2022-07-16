const express = require('express')
const router = express.Router()
const Joi = require('joi')

const { createError } = require('../../helpers/createError')

const contacts = require('../../models/contacts')

const contactAddSchema = Joi.object({
            name: Joi.string()
                .min(3)
                .max(30)
                .required(),
            email: Joi.string()
                .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
                .required(),
            phone: Joi.string()
                .length(10)
                .pattern(/^[0-9]+$/)
                .required(),
        });

router.get('/', async (req, res, next) => {
    try {
        const result = await contacts.listContacts();
        res.json(result)
    } catch (error) {
        next(error)
    }
});

router.get('/:id', async (req, res, next) => {
    try {
        const { id } = req.params;
        const result = await contacts.getContactById(id)
        if (!result) {
            throw createError(404);
        }
        res.json(result)
    } catch (error) {
        next(error)
    }
});

router.post('/', async (req, res, next) => {
    try {
        const { error } = contactAddSchema.validate(req.body);
        if (error) {
            throw createError(400, error.message)
        }
        const result = await contacts.addContact(req.body)
        res.status(201).json(result)
    } catch (error) {
        next(error);
    }
});

router.delete('/:id', async (req, res, next) => {
    try {
        const { id } = req.params;
        const result = await contacts.removeContact(id);
        if (!result) {
            throw createError(404)
        }
        res.json({message:"Book deleted"})
    } catch (error) {
        next(error);
    }
});

router.put('/:id', async (req, res, next) => {
    try {
        const { error } = contactAddSchema.validate(req.body);
        if (error) {
            throw createError(400, error.message)
        }
        const { id } = req.params;
        const result = await contacts.updateContactById(id, req.body);
        if (!result) {
            throw createError(404);
        }
        res.json(result);
    } catch (error) {
        next(error)
    }
})

module.exports = router;

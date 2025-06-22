import {addContact, deleteContact, getContactById, getContacts, updateContact} from "../services/contacts.js";
import createHttpError from "http-errors";
import {paginationParams} from "../filters/paginationParams.js";
import {sortParams} from "../filters/sortParams.js";
import {contactsSortFields} from "../models/contact.js";
import contactsFilterParams from "../filters/contactsFilterParams.js";
import {saveToCloudinary} from "../filters/saveFileToCloudinary.js";

export const getContactsController = async (req, res) => {
    const parsePaginationParams = paginationParams(req.query);
    const parseSortParams = sortParams(req.query, contactsSortFields);
    const filters = contactsFilterParams(req.query);
    filters.userId = req.user._id
    const data = await getContacts({...parsePaginationParams, ...parseSortParams, filters});

    if (!data) {
        throw createHttpError(400, "Could not find contacts");
    }

    res.json({
        status: 200,
        message: "Successfully found contacts!",
        data,
    });
}

export const getContactByIdController = async (req, res) => {
    const {id} = req.params;
    const userId = req.user._id;
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
        throw createHttpError(404, `Invalid ID format. Must be a 24-character hex string.`);
    }
    console.log(userId);
    const data = await getContactById(id, userId);

    if (!data) {
        throw createHttpError(404, `Could not find ${id}`);
    }

    res.json({
        status: 200,
        message: `Successfully found contact with id ${id}!`,
        data,
    });
}

export const addContactController = async (req, res) => {
    try {
        const { _id: userId } = req.user;
        const contactData = { ...req.body, userId };

        if (req.file) {
            const cloudUrl = await saveToCloudinary(req.file);
            contactData.photo = cloudUrl;
        }

        const newContact = await addContact(contactData);

        res.status(201).json({
            status: 201,
            message: "Successfully created a contact!",
            data: newContact,
        });
    } catch (error) {
        throw createHttpError(500, "Failed to create contact");
    }
};



export const upsertContactController = async (req, res) => {
    const {id} = req.params;
    const userId = req.user._id;
    const data = await updateContact(id, userId, req.body)

    res.status(200).json({
        status: 200,
        message: "Successfully upserted contact!",
        data,
    })
}

export const patchContactController = async (req, res) => {
    const { id } = req.params;
    const userId = req.user._id;
    const updateData = { ...req.body };

    if (req.file) {
        const photo = await saveToCloudinary(req.file);
        updateData.photo = photo;
    }

    const data = await updateContact(id, userId, updateData);

    if (!data) {
        throw createHttpError(404, `Contact not found`);
    }

    res.status(200).json({
        status: 200,
        message: "Contact updated successfully!",
        data,
    });
};

export const deleteContactController = async (req, res) => {
  const { id } = req.params;
  const userId = req.user._id;

  const data = await deleteContact(id, userId);

  if (!data) {
    throw createHttpError(404, `Contact not found`);
  }

  res.status(204).json({
    status: 204,
    message: "Successfully deleted contact!",
    data,
  })
}

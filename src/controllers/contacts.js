import {
  getAllContacts,
  getContactById,
  createContact,
  updateContact,
  deleteContact,
} from "../services/contacts.js";
import createError from "http-errors";

// GET /contacts
export const getContacts = async (req, res, next) => {
  try {
    const result = await getAllContacts(req.user._id);
    res.status(200).json({
      status: 200,
      message: "Successfully found contacts!",
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

// GET /contacts/:id
export const getContact = async (req, res, next) => {
  try {
    const contact = await getContactById(req.params.id, req.user._id);
    if (!contact) throw createError(404, "Contact not found");

    res.status(200).json({
      status: 200,
      message: "Successfully found contact!",
      data: contact,
    });
  } catch (err) {
    next(err);
  }
};

// POST /contacts
export const addContact = async (req, res, next) => {
  try {
    const newContact = await createContact({ ...req.body, userId: req.user._id });

    res.status(201).json({
      status: 201,
      message: "Successfully created contact!",
      data: newContact,
    });
  } catch (err) {
    next(err);
  }
};

// PATCH /contacts/:id
export const updateContactById = async (req, res, next) => {
  try {
    const updated = await updateContact(req.params.id, req.user._id, req.body);
    if (!updated) throw createError(404, "Contact not found");

    res.status(200).json({
      status: 200,
      message: "Successfully updated contact!",
      data: updated,
    });
  } catch (err) {
    next(err);
  }
};

// DELETE /contacts/:id
export const deleteContactById = async (req, res, next) => {
  try {
    const deleted = await deleteContact(req.params.id, req.user._id);
    if (!deleted) throw createError(404, "Contact not found");

    res.status(200).json({
      status: 200,
      message: "Successfully deleted contact!",
      data: deleted,
    });
  } catch (err) {
    next(err);
  }
};

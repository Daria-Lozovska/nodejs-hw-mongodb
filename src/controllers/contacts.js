import createError from "http-errors";
import {
  getAllContacts,
  getContactById,
  createContact,
  updateContact,
  deleteContact,
} from "../services/contacts.js";

export const getContacts = async (req, res) => {
  const { page = 1, perPage = 10, sortBy = 'name', sortOrder = 'asc', type, isFavourite } = req.query;

  const filters = {};
  if (type) filters.contactType = type;
  if (isFavourite !== undefined) filters.isFavourite = isFavourite === "true";

  const result = await getAllContacts({
    page: Number(page),
    perPage: Number(perPage),
    sortBy,
    sortOrder,
    filters,
  });

  res.status(200).json({
    status: 200,
    message: "Successfully found contacts!",
    data: result,
  });
};

export const getContact = async (req, res) => {
  const contact = await getContactById(req.params.contactId);
  if (!contact) throw createError(404, "Contact not found");
  res.json({ status: 200, data: contact });
};

export const addContact = async (req, res) => {
  const contact = await createContact(req.body);
  res.status(201).json({
    status: 201,
    message: "Successfully created a contact!",
    data: contact,
  });
};

export const patchContact = async (req, res) => {
  const contact = await updateContact(req.params.contactId, req.body);
  if (!contact) throw createError(404, "Contact not found");

  res.json({
    status: 200,
    message: "Successfully patched a contact!",
    data: contact,
  });
};

export const removeContact = async (req, res) => {
  const contact = await deleteContact(req.params.contactId);
  if (!contact) throw createError(404, "Contact not found");

  res.status(204).send();
};

import Contact from '../models/contact.js';
import createHttpError from 'http-errors';

export const listContacts = async (userId) => {
  return await Contact.find({ userId });
};

export const getContactById = async (contactId, userId) => {
  const contact = await Contact.findOne({ _id: contactId, userId });
  if (!contact) throw createHttpError(404, 'Contact not found');
  return contact;
};

export const addContact = async (body, userId) => {
  return await Contact.create({ ...body, userId });
};

export const removeContact = async (contactId, userId) => {
  const deletedContact = await Contact.findOneAndDelete({ _id: contactId, userId });
  if (!deletedContact) throw createHttpError(404, 'Contact not found');
  return deletedContact;
};

export const updateContact = async (contactId, body, userId) => {
  const updatedContact = await Contact.findOneAndUpdate(
    { _id: contactId, userId },
    body,
    { new: true }
  );
  if (!updatedContact) throw createHttpError(404, 'Contact not found');
  return updatedContact;
};

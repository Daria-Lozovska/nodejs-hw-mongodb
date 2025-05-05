import Contact from '../models/contact.js';
import createHttpError from 'http-errors';

export const listContacts = async (userId, { page = 1, limit = 10 }) => {
  const skip = (page - 1) * limit;
  const [contacts, total] = await Promise.all([
    Contact.find({ userId }).skip(skip).limit(Number(limit)),
    Contact.countDocuments({ userId }),
  ]);

  return { contacts, total, page: Number(page), limit: Number(limit) };
};

export const getContactById = async (contactId, userId) => {
  const contact = await Contact.findOne({ _id: contactId, userId });
  if (!contact) throw createHttpError(404, 'Contact not found');
  return contact;
};

export const addContact = async (contactData, userId) => {
  const newContact = await Contact.create({ ...contactData, userId });
  return {
    id: newContact._id,
    name: newContact.name,
    email: newContact.email,
    phone: newContact.phone,
  };
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

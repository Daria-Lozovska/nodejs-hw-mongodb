import Contact from "../models/contact.js";

export const getAllContacts = async (userId) => {
  return Contact.find({ userId });
};

export const getContactById = (id, userId) =>
  Contact.findOne({ _id: id, userId });

export const createContact = (data) => Contact.create(data);

export const updateContact = (id, userId, data) =>
  Contact.findOneAndUpdate({ _id: id, userId }, data, { new: true });

export const deleteContact = (id, userId) =>
  Contact.findOneAndDelete({ _id: id, userId });

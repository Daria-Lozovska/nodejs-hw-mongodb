import Contact from "../models/contact.js";

export const getAllContacts = async ({ page = 1, perPage = 10, sortBy = 'name', sortOrder = 'asc', filters = {} }) => {
  const skip = (page - 1) * perPage;
  const sortOption = { [sortBy]: sortOrder === 'desc' ? -1 : 1 };

  const totalItems = await Contact.countDocuments(filters);
  const contacts = await Contact.find(filters)
    .sort(sortOption)
    .skip(skip)
    .limit(perPage);

  return {
    data: contacts,
    page,
    perPage,
    totalItems,
    totalPages: Math.ceil(totalItems / perPage),
    hasPreviousPage: page > 1,
    hasNextPage: page * perPage < totalItems,
  };
};

export const getContactById = (id) => Contact.findById(id);

export const createContact = (data) => Contact.create(data);

export const updateContact = (id, data) =>
  Contact.findByIdAndUpdate(id, data, { new: true });

export const deleteContact = (id) => Contact.findByIdAndDelete(id);


import * as contactsService from '../services/contacts.js';

export const getAllContacts = async (req, res, next) => {
  try {
    const contacts = await contactsService.listContacts(req.user.id);
    res.json(contacts);
  } catch (error) {
    next(error);
  }
};

export const getContactById = async (req, res, next) => {
  try {
    const contact = await contactsService.getContactById(req.params.id, req.user.id);
    res.json(contact);
  } catch (error) {
    next(error);
  }
};

export const addContact = async (req, res, next) => {
  try {
    const newContact = await contactsService.addContact(req.body, req.user.id);
    res.status(201).json(newContact);
  } catch (error) {
    next(error);
  }
};

export const updateContact = async (req, res, next) => {
  try {
    const updatedContact = await contactsService.updateContact(req.params.id, req.body, req.user.id);
    res.json(updatedContact);
  } catch (error) {
    next(error);
  }
};

export const deleteContact = async (req, res, next) => {
  try {
    const deletedContact = await contactsService.removeContact(req.params.id, req.user.id);
    res.json(deletedContact);
  } catch (error) {
    next(error); 
  }
};

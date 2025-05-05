import * as contactsService from '../services/contacts.js';

export const getAllContacts = async (req, res, next) => {
  try {
    const { contacts, total, page, limit } = await contactsService.listContacts(req.user.id, req.query);
    res.status(200).json({
      status: '200',
      message: 'Contacts retrieved successfully',
      data: {
        contacts,
        total,
        page,
        limit,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const getContactById = async (req, res, next) => {
  try {
    const contact = await contactsService.getContactById(req.params.id, req.user.id);
    res.status(200).json({
      status: '200',
      message: 'Contact retrieved successfully',
      data: contact,
    });
  } catch (error) {
    next(error);
  }
};

export const addContact = async (req, res, next) => {
  try {
    const newContact = await contactsService.addContact(req.body, req.user.id);
    res.status(201).json({
      status: '201',
      message: 'Contact created successfully',
      data: newContact,
    });
  } catch (error) {
    next(error);
  }
};

export const updateContact = async (req, res, next) => {
  try {
    const updatedContact = await contactsService.updateContact(req.params.id, req.body, req.user.id);
    res.status(200).json({
      status: '200',
      message: 'Contact updated successfully',
      data: updatedContact,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteContact = async (req, res, next) => {
  try {
    await contactsService.removeContact(req.params.id, req.user.id);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};

export const logoutController = async (req, res, next) => {
  try {
    const { refreshToken } = req.cookies;
    await contactsService.logout(refreshToken);
    res.clearCookie('refreshToken');
    res.status(200).json({
      status: '200',
      message: 'Successfully logged out!',
    });
  } catch (err) {
    next(err);
  }
};

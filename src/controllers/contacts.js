import { getAllContacts, getContactById } from '../services/contacts.js';

const getContacts = async (req, res) => {
  try {
    const contacts = await getAllContacts();
    res.json({ status: 200, message: 'Successfully found contacts!', data: contacts });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

const getContact = async (req, res) => {
  try {
    const contact = await getContactById(req.params.contactId);
    if (!contact) {
      return res.status(404).json({ message: 'Contact not found' });
    }
    res.json({ status: 200, message: `Successfully found contact with id ${req.params.contactId}!`, data: contact });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

export { getContacts, getContact };



import Contact from '../models/contact.js';

export const getContacts = async (req, res, next) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const contacts = await Contact.find({ owner: req.user.id })
      .skip((page - 1) * limit)
      .limit(Number(limit));

    const total = await Contact.countDocuments({ owner: req.user.id });

    res.status(200).json({
      status: 200,
      message: 'Successfully found contacts!',
      data: contacts,
      pagination: {
        total,
        page: Number(page),
        limit: Number(limit),
      },
    });
  } catch (err) {
    next(err);
  }
};

export const createContact = async (req, res, next) => {
  try {
    const contact = await Contact.create({ ...req.body, owner: req.user.id });
    res.status(200).json({
      status: 200,
      message: 'Successfully created contact!',
      data: contact,
    });
  } catch (err) {
    next(err);
  }
};

export const updateContact = async (req, res, next) => {
  try {
    const contact = await Contact.findOneAndUpdate(
      { _id: req.params.id, owner: req.user.id },
      req.body,
      { new: true }
    );
    if (!contact) return res.status(404).json({ message: 'Contact not found' });

    res.status(200).json({
      status: 200,
      message: 'Successfully updated contact!',
      data: contact,
    });
  } catch (err) {
    next(err);
  }
};

export const deleteContact = async (req, res, next) => {
  try {
    const contact = await Contact.findOneAndDelete({ _id: req.params.id, owner: req.user.id });
    if (!contact) return res.status(404).json({ message: 'Contact not found' });

    res.status(204).send();
  } catch (err) {
    next(err);
  }
};

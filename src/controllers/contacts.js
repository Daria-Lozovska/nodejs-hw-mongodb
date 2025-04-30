import Contact from "../models/contact.js";

export const getContacts = async (req, res, next) => {
  const contacts = await Contact.find({ owner: req.user._id });
  res.status(200).json({ status: 200, message: "Successfully found contacts!", data: contacts });
};

export const getContact = async (req, res, next) => {
  const contact = await Contact.findOne({ _id: req.params.id, owner: req.user._id });
  if (!contact) return res.status(404).json({ message: "Contact not found" });
  res.json(contact);
};

export const addContact = async (req, res, next) => {
  const contact = await Contact.create({ ...req.body, owner: req.user._id });
  res.status(201).json(contact);
};

export const updateContact = async (req, res, next) => {
  const updated = await Contact.findOneAndUpdate(
    { _id: req.params.id, owner: req.user._id },
    req.body,
    { new: true }
  );
  if (!updated) return res.status(404).json({ message: "Contact not found" });
  res.json(updated);
};

export const deleteContact = async (req, res, next) => {
  const deleted = await Contact.findOneAndDelete({ _id: req.params.id, owner: req.user._id });
  if (!deleted) return res.status(404).json({ message: "Contact not found" });
  res.json({ message: "Contact deleted" });
};

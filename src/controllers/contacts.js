import { getAllContacts } from "../services/contacts.js"

const getContacts = async (req, res) => {
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

export default getContacts;
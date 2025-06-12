function contactsFilterParams(query = {}) {
  const {
    page = 1,
    limit = 20,
    sortBy,
    sortByDesc,
    filter,
    favorite,
  } = query;

  const skip = (Number(page) - 1) * Number(limit);

  const sort = {};
  if (sortBy) sort[sortBy] = 1;
  if (sortByDesc) sort[sortByDesc] = -1;

  const select = filter ? filter.split('|').join(' ') : null;

  const filterQuery = {};
  if (favorite !== undefined) {
    filterQuery.favorite = favorite === 'true';
  }

  return {
    skip,
    limit: Number(limit),
    sort,
    select,
    filter: filterQuery,
  };
}

export default contactsFilterParams
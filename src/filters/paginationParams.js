const Number = (value, defaultValue) => {
    if (typeof value !== 'string' ) return defaultValue;

    const parsedValue = parseInt(value);

    if (Number.isNaN(parsedValue)) return defaultValue;

    return parsedValue;
}

export const PaginationParams = ({page, perPage}) => {
    const parsedPage = Number(page, 1);
    const parsedPerPage = Number(perPage, 10);

    return {
        page: parsedPage,
        perPage: parsedPerPage,
    }
}
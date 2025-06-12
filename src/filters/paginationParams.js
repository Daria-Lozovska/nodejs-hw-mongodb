const Number = (value, defaultValue) => {
    if (typeof value !== 'string' ) return defaultValue;

    const parsedValue = parseInt(value);

    if (Number.isNaN(parsedValue)) return defaultValue;

    return parsedValue;
}

const paginationParams = ({page, perPage}) => {
    const parsedPage = Number(page, 1);
    const parsedPerPage = Number(perPage, 10);

    return {
        page: parsedPage,
        perPage: parsedPerPage,
    }
}

export default paginationParams
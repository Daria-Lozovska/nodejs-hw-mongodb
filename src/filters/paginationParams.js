const paramsNumber = (value, defaultValue) => {
    if (typeof value !== 'string' ) return defaultValue;

    const parsedValue = parseInt(value);

    if (Number.isNaN(parsedValue)) return defaultValue;

    return parsedValue;
}

const paginationParams = ({page, perPage}) => {
    const parsedPage = paramsNumber(page, 1);
    const parsedPerPage = paramsNumber(perPage, 10);

    return {
        page: parsedPage,
        perPage: parsedPerPage,
    }
}

export default paginationParams 
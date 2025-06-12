import {sortList} from "../constans/index.js";

export const sortParams = ({sortBy, sortOrder}, contactsSortFields) => {
    const parsedSortOrder = sortList.includes(sortOrder) ? sortOrder : sortList[0];
    const parsedSortBy = contactsSortFields.includes(sortBy) ? sortBy : "_id";

    return {
        sortBy: parsedSortBy,
        sortOrder: parsedSortOrder,
    };
}
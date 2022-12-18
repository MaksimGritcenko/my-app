export const generateEntryId = (arr: any[]): number => {
    return arr.reduce((acc, { id = 0 }) => {
        if (id > acc) {
            acc = id;
        }

        return acc + 1;
    }, 0);
};

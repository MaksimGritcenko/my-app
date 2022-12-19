export const generateEntryId = (
	arr: Array<{id: number}>,
): number => arr.reduce((acc, {id = 0}) => {
	if (id > acc) {
		acc = id;
	}

	return acc + 1;
}, 0);

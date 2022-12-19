export const composeClassName = (
	block: string,
	elem = '',
	mods: Record<string, boolean> = {},
): string => {
	const baseClassName = elem ? `${block}-${elem}` : block;
	let className = baseClassName;

	Object.entries(mods).forEach(([modName, isModActive]) => {
		if (!isModActive) {
			return;
		}

		className = `${className} ${baseClassName}_${modName}`;
	});

	return className;
};

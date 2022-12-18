/* eslint-disable @typescript-eslint/ban-types */
import {
	Children,
	cloneElement,
	useEffect,
	useRef,
	memo,
	type ReactElement,
	type FC,
	type RefObject,
} from 'react';

export type PropsType = {
	children: ReactElement | ReactElement[];
	onClick: Function;
};

export const ClickOutside: FC<PropsType> = props => {
	const {children, onClick} = props;

	const childrenRefs: Array<RefObject<HTMLElement | undefined>> = Children.map(children, () => useRef());

	useEffect(() => {
		document.addEventListener('click', handleClick);
		return () => {
			document.removeEventListener('click', handleClick);
		};
	});

	function handleClick(e: MouseEvent) {
		const {target} = e ?? {};

		if (target === null) {
			return;
		}

		if (childrenRefs.every(({current}) => current && !current.contains(target as Node))) {
			onClick();
		}
	}

	return <>
		{Children.map(children, (element, i) => cloneElement(element, {ref: childrenRefs[i]}))}
	</>;
};

export default memo(ClickOutside);

import {memo, type FC} from 'react';

import ClickOutside from '@component/ClickOutside';
import CloseBtn from '@component/CloseBtn';

import {type PropsType as ContainerPropsType} from './Popup.container';

import './Popup.scss';

export type PropsType = ContainerPropsType & {
	closePopup: () => void;
};

export const Popup: FC<PropsType> = ({
	popupId,
	activePopupId,
	children,
	closePopup,
	isClosable = true,
}) => {
	const isActive = popupId === activePopupId;

	function renderCloseBtn() {
		if (!isClosable) {
			return null;
		}

		return <CloseBtn onClick={closePopup} />;
	}

	const activeWrapperClassName = isActive ? 'Popup-Wrapper_isActive' : '';
	// eslint-disable-next-line @typescript-eslint/no-empty-function
	const onClick = isClosable ? closePopup : () => {};

	return (
		<div className={`Popup-Wrapper ${activeWrapperClassName}`}>
			<ClickOutside onClick={onClick}>
				<div className='Popup-Content'>
					{ children }
					{ renderCloseBtn() }
				</div>
			</ClickOutside>
		</div>
	);
};

export default memo(Popup);

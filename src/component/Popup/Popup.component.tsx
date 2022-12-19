import {memo, type FC} from 'react';

import ClickOutside from '@component/ClickOutside';
import CloseBtn from '@component/CloseBtn';

import {type PropsType as ContainerPropsType} from './Popup.container';

import './Popup.scss';
import {composeClassName} from '@util/class';

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

	const popupWrapperClass = `${composeClassName('Popup', 'Wrapper')} ${composeClassName('Popup', 'Wrapper', {isActive})}`;
	const onClick = isClosable ? closePopup : () => undefined;

	return (
		<div className={popupWrapperClass}>
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

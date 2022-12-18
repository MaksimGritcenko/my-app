import {memo, useEffect, type FC, type ReactElement} from 'react';
import {compose} from 'redux';
import {connect, useDispatch} from 'react-redux';

import {setActivePopup} from '@store/popupSlice';
import {type AppDispatch, type RootState} from '@store/index';

import {ESCAPE_CODE} from './Popup.config';

import Popup from './Popup.component';

export const mapStateToProps = (state: RootState) => ({
	activePopupId: state.popupReducer.activePopupId,
});

export type MstpType = ReturnType<typeof mapStateToProps>;
export type SelfProps = {
	children: ReactElement | ReactElement[];
	popupId: string;
};
export type PropsType = MstpType & SelfProps;

export const PopupContainer: FC<PropsType> = props => {
	const {activePopupId, popupId} = props;

	const dispatch: AppDispatch = useDispatch();

	useEffect(() => {
		document.addEventListener('keyup', onEscUp);
	});

	const containerFunctions = {
		closePopup,
	};

	function onEscUp(e: KeyboardEvent) {
		const {key} = e;

		if (key === ESCAPE_CODE) {
			closePopup();
		}
	}

	function closePopup() {
		if (popupId !== activePopupId) {
			return;
		}

		dispatch(setActivePopup(''));
	}

	return (
		<Popup
			{...props}
			{...containerFunctions}
		/>
	);
};

export default compose<
FC<SelfProps>
>(memo, connect(mapStateToProps))(PopupContainer);

import {type FC} from 'react';

import Popup from '@component/Popup';
import {NOTE_EDIT_POPUP_ID} from './NoteEditPopup.config';

export const NoteEditPopupComponent: FC = () => {
	function renderContent() {
		return <div>HELLO</div>;
	}

	return <Popup popupId={NOTE_EDIT_POPUP_ID}>
		{renderContent()}
	</Popup>;
};

export default NoteEditPopupComponent;

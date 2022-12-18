import Popup from '@component/Popup';
import {useState, type FormEvent, memo, type FC, type ChangeEvent} from 'react';
import {LOGIN_POPUP_ID} from './LoginPopup.config';

export type FormDataType = {
	username: '';
};

export const LoginPopupComponent: FC = () => {
	const [formData, setFormData] = useState<FormDataType>({
		username: '',
	});

	function handleChange(e: ChangeEvent<HTMLInputElement>) {
		setFormData({
			...formData,
			[e.target.name]: e.target.value,
		});
	}

	function onSubmit(e: FormEvent) {
		e.preventDefault();
		console.log(formData);
	}

	return (
		<Popup popupId={LOGIN_POPUP_ID}>
			<div className='LoginPopup'>
				<form onSubmit={onSubmit}>
					<input name='username' onChange={handleChange} />
					<button type='submit' >
                        Submit
					</button>
				</form>
			</div>
		</Popup>
	);
};

export default memo(LoginPopupComponent);

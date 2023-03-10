import Popup from '@component/Popup';
import {type AppDispatch} from '@store/index';
import {login} from '@store/userSlice';
import {composeClassName} from '@util/class';
import {useState, type FormEvent, memo, type FC, type ChangeEvent} from 'react';
import {useDispatch} from 'react-redux';
import {LOGIN_POPUP_ID} from './LoginPopup.config';

import './LoginPopup.scss';

export type FormDataType = {
	username: '';
};

export const LoginPopupComponent: FC = () => {
	const dispatch: AppDispatch = useDispatch();
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
		const {username} = formData;

		e.preventDefault();

		void dispatch(login(username));
	}

	return (
		<Popup popupId={LOGIN_POPUP_ID} isClosable={false}>
			<div className='LoginPopup'>
				<form className={composeClassName('LoginPopup', 'Form')} onSubmit={onSubmit}>
					<h3 className={composeClassName('LoginPopup', 'FormHeader')}>Log in</h3>
					<input className={composeClassName('LoginPopup', 'FormInput')} name='username' onChange={handleChange} />
					<button className={composeClassName('LoginPopup', 'FormSubmit')} type='submit' >
                        Submit
					</button>
				</form>
			</div>
		</Popup>
	);
};

export default memo(LoginPopupComponent);

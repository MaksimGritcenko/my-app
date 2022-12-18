import {useEffect, useState} from 'react';
import {useDispatch} from 'react-redux';
import {type AppDispatch} from '@store/index';
import {login} from '@store/userSlice';
import Board from '@component/Board';

import './App.scss';
import LoginPopup from '@component/LoginPopup';
import {setActivePopup} from '@store/popupSlice';
import {LOGIN_POPUP_ID} from '@component/LoginPopup/LoginPopup.config';

function App() {
	const dispatch: AppDispatch = useDispatch();

	useEffect(() => {
		dispatch(setActivePopup(LOGIN_POPUP_ID));
		// void dispatch(login('maksim'));
	}, []);

	return (
		<div className='App'>
			<Board />
			<LoginPopup />
		</div>
	);
}

export default App;

/* eslint-disable @typescript-eslint/no-floating-promises */
import {useEffect, useState, type FC} from 'react';
import {connect, useDispatch} from 'react-redux';
import {type RootState, type AppDispatch} from '@store/index';
import Board from '@component/Board';

import './App.scss';
import LoginPopup from '@component/LoginPopup';
import {getUser} from '@store/userSlice';

export const mapStateToProps = (state: RootState) => ({
	user: state.userReducer.user,
});

export type MstpType = ReturnType<typeof mapStateToProps>;

export const App: FC<MstpType> = ({user}) => {
	const dispatch: AppDispatch = useDispatch();
	const [isAppInitialized, setIsAppInitialized] = useState<boolean>(false);

	useEffect(() => {
		dispatch(getUser()).then(() => {
			setIsAppInitialized(true);
		});
	}, []);

	function renderBoard() {
		if (!user?.id) {
			return null;
		}

		return <Board />;
	}

	function renderLoginPopup() {
		if (user?.id) {
			return null;
		}

		return <LoginPopup />;
	}

	if (!isAppInitialized) {
		return null;
	}

	return (
		<div className='App'>
			{renderBoard()}
			{renderLoginPopup()}
		</div>
	);
};

export default connect(mapStateToProps)(App);

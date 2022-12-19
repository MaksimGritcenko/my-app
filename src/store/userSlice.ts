import {LOGIN_POPUP_ID} from '@component/LoginPopup/LoginPopup.config';
import {createAsyncThunk, createSlice, type PayloadAction} from '@reduxjs/toolkit';
import {getFetch, postFetch} from '@util/Request';
import {setActivePopup} from './popupSlice';

export type UserType = {
	id: number;
	username: string;
	token: string;
};

export const login = createAsyncThunk<void, string>(
	'user/login',
	async (username, {dispatch}) => {
		try {
			const user: UserType = await (
				await postFetch('/api/login', {username})
			).json() as UserType;
			const {token} = user;

			dispatch(setUser(user));
			dispatch(setActivePopup(''));
			localStorage.setItem('token', token);
		} catch (e) {
			console.error(e);
		}
	},
);

export const getUser = createAsyncThunk<void, undefined>(
	'user/user',
	async (_, {dispatch}) => {
		try {
			const user: UserType | false = await (
				await getFetch('/api/user')
			).json() as UserType;

			if (user) {
				dispatch(setUser(user));
				return;
			}

			dispatch(setActivePopup(LOGIN_POPUP_ID));
		} catch (e) {
			console.error(e);
		}
	},
);

export const initialState = {
	user: undefined as UserType | undefined,
	isAppInitialized: false,
};

export const userSlice = createSlice({
	name: 'userReducer',
	initialState,
	reducers: {
		setUser(state, action: PayloadAction<UserType>) {
			state.user = action.payload;
		},
		setIsAppInitialized(state, action: PayloadAction<boolean>) {
			state.isAppInitialized = action.payload;
		},
	},
});

export const {setUser, setIsAppInitialized} = userSlice.actions;

export default userSlice.reducer;

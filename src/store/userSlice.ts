import {createAsyncThunk, createSlice, type PayloadAction} from '@reduxjs/toolkit';
import {postFetch} from '@util/Request';

export type UserType = {
	id: number;
	username: string;
	token: string;
};

export const login = createAsyncThunk<void, string>(
	'user/login',
	async (username: string, {dispatch}) => {
		try {
			const user: UserType = await (
				await postFetch('/api/login', {username})
			).json() as UserType;
			const {token}: {token: string} = user;

			dispatch(setUser(user));
			sessionStorage.setItem('token', token);
		} catch (e) {
			console.error(e);
		}
	},
);

export const initialState = {
	user: undefined as UserType | undefined,
};

export const userSlice = createSlice({
	name: 'userReducer',
	initialState,
	reducers: {
		setUser(state, action: PayloadAction<UserType>) {
			state.user = action.payload;
		},
	},
});

export const {setUser} = userSlice.actions;

export default userSlice.reducer;

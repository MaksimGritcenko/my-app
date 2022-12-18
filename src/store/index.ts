import {configureStore, type ThunkAction, type Action} from '@reduxjs/toolkit';
import userReducer from './userSlice';
import notesReducer from './notesSlice';
import popupReducer from './popupSlice';

export const store = configureStore({
	reducer: {
		userReducer,
		notesReducer,
		popupReducer,
	},
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
ReturnType,
RootState,
unknown,
Action<string>
>;

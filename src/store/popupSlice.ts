import {createSlice, type PayloadAction} from '@reduxjs/toolkit';

export const initialState = {
	activePopupId: '',
};

export const popupSlice = createSlice({
	name: 'popupReducer',
	initialState,
	reducers: {
		setActivePopup(state, action: PayloadAction<string>) {
			state.activePopupId = action.payload;
		},
	},
});

export const {setActivePopup} = popupSlice.actions;

export default popupSlice.reducer;

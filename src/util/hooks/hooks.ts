import type {TypedUseSelectorHook} from 'react-redux';
import type {RootState, AppDispatch} from 'store/index';
import {useDispatch, useSelector} from 'react-redux';

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = (): AppDispatch => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
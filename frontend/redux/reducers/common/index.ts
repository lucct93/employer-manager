import {
	configureStore,
	createSlice,
	ThunkAction,
	PayloadAction,
} from '@reduxjs/toolkit';
import { Action } from 'redux';
import { RootState } from 'config/configureStore';
import { InitialStateProps, UserInformationProps } from './model';
import LocalStorageClass from 'config/localStorage';
const nameReducers = 'commonReducers';
const initialState: InitialStateProps<string> = {
	userInformation: LocalStorageClass?.getLocalUserInformation() || {},
};
const commonReducers = createSlice({
	name: nameReducers,
	initialState: initialState,
	reducers: {
		setUserInformation: (
			state,
			action: PayloadAction<UserInformationProps<string>>
		) => {
			state.userInformation = action.payload;
			LocalStorageClass.updateLocalUserInformation(action.payload);
		},
	},
	extraReducers: {},
});
const makeStore = () =>
	configureStore({
		reducer: {
			[commonReducers.name]: commonReducers.reducer,
		},
		devTools: true,
	});
export type AppStore = ReturnType<typeof makeStore>;
export type AppState = ReturnType<AppStore['getState']>;
export type AppThunk<ReturnType = void> = ThunkAction<
	ReturnType,
	AppState,
	unknown,
	Action
>;
const { reducer, actions } = commonReducers;
export const { setUserInformation } = actions;
export const userInformationReducer = (state: RootState) =>
	state[nameReducers].userInformation;
export default reducer;
// export const wrapper = createWrapper<AppStore>(makeStore);

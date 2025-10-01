import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface profileInterface {
    userdata: any;
}

const initialState: profileInterface = {
    userdata: null,
};

const profileSlice = createSlice({
    name: 'profile',
    initialState,
    reducers: {
        setUserData(state, action: PayloadAction<profileInterface['userdata']>) {
            state.userdata = action.payload
        },
        clearProfileData(state) {
            state.userdata = null;
        },
    },
});

export const { setUserData, clearProfileData } = profileSlice.actions;
export default profileSlice.reducer;
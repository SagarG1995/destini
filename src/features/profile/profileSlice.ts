import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface profileInterface {
    userdata: any;
    allProfessions: Array<any>
}

const initialState: profileInterface = {
    userdata: null,
    allProfessions: []
};

const profileSlice = createSlice({
    name: 'profile',
    initialState,
    reducers: {
        setUserData(state, action: PayloadAction<profileInterface['userdata']>) {
            state.userdata = action.payload
        },
        setAllProfessions(state, action: PayloadAction<profileInterface['allProfessions']>) {
            state.allProfessions = action.payload
        },
        clearProfileData(state) {
            state.userdata = null;
        },
    },
});

export const { setUserData, setAllProfessions, clearProfileData } = profileSlice.actions;
export default profileSlice.reducer;
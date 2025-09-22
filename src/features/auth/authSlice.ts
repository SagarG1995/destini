import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type UserAuthDataType = null | {
    access_token: string;
    refresh_token?: string,
    isGoogleLogin?: boolean;
    isAppleLogin?: boolean;
    completeProfile?: boolean,
}

interface accountInterface {
    authdata: UserAuthDataType;
    showOnboarding?: boolean
}

const initialState: accountInterface = {
    authdata: null,
    showOnboarding: true
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setShowOnboarding(state, action: PayloadAction<accountInterface['showOnboarding']>) {
            state.showOnboarding = action.payload
        },
        setAuthData(state, action: PayloadAction<accountInterface['authdata']>) {
            state.authdata = action.payload;
        },
        clearAuth(state) {
            state.authdata = null;
        },
    },
});

export const { setAuthData, setShowOnboarding, clearAuth } = authSlice.actions;
export default authSlice.reducer;
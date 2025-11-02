import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type UserAuthDataType = null | {
    access_token?: string;
    refresh_token?: string,
    isGoogleLogin?: boolean;
    isAppleLogin?: boolean;
    completeProfile?: boolean,
}

interface authInterface {
    authdata: UserAuthDataType;
    showOnboarding?: boolean,
    resetToken?: string | null
}

const initialState: authInterface = {
    authdata: null,
    resetToken: null,
    showOnboarding: true
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setShowOnboarding(state, action: PayloadAction<authInterface['showOnboarding']>) {
            state.showOnboarding = action.payload
        },
        setResetToken(state, action: PayloadAction<authInterface['resetToken']>) {
            state.resetToken = action.payload
        },
        setAuthData(state, action: PayloadAction<authInterface['authdata']>) {
            state.authdata = action.payload;
        },
        clearAuth(state) {
            state.authdata = null;
            state.resetToken = null
        },
    },
});

export const { setAuthData, setResetToken, setShowOnboarding, clearAuth } = authSlice.actions;
export default authSlice.reducer;
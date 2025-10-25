import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface locationInterface {
    locationGranted: boolean,
    isGPSon: boolean,
    coords: any
}

const initialState: locationInterface = {
    locationGranted: false,
    isGPSon: false,
    coords: null
};

const locationSlice = createSlice({
    name: 'location',
    initialState,
    reducers: {
        setLocationGranted(state, action: PayloadAction<locationInterface['locationGranted']>) {
            state.locationGranted = action.payload
        },
        setIsGPSon(state, action: PayloadAction<locationInterface['isGPSon']>) {
            state.isGPSon = action.payload
        },
        setCoords(state, action: PayloadAction<locationInterface['coords']>) {
            state.coords = action.payload
        },
        clearLocation() {
            return initialState
        },
    },
});

export const { setIsGPSon, setLocationGranted, setCoords, clearLocation } = locationSlice.actions;
export default locationSlice.reducer;
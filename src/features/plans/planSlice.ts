import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface planInterface {
    createPlanLocation: { currentLocation: string, currentLocId: string, planLocation: string, planLocId: string }
}

const initialState: planInterface = {
    createPlanLocation: { currentLocation: '', currentLocId: '', planLocation: '', planLocId: '' }
};

const planSlice = createSlice({
    name: 'plan',
    initialState,
    reducers: {
        setCreatePlanLocation(state, action: PayloadAction<planInterface['createPlanLocation']>) {
            state.createPlanLocation = action.payload
        },
        clearPlan() {
            return initialState
        },
    },
});

export const { setCreatePlanLocation, clearPlan } = planSlice.actions;
export default planSlice.reducer;
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface planInterface {
    createPlanLocation: { currentLocation: string, currentLocId: string, planLocation: string, planLocId: string },
    myPlans: Array<any>
}

const initialState: planInterface = {
    createPlanLocation: { currentLocation: '', currentLocId: '', planLocation: '', planLocId: '' },
    myPlans: []
};

const planSlice = createSlice({
    name: 'plan',
    initialState,
    reducers: {
        setCreatePlanLocation(state, action: PayloadAction<planInterface['createPlanLocation']>) {
            state.createPlanLocation = action.payload
        },
        clearCreatePlanLocation(state) {
            state.createPlanLocation = initialState?.createPlanLocation
        },
        setMyPlans(state, action: PayloadAction<planInterface['myPlans']>) {
            state.myPlans = action.payload
        },
        clearPlan() {
            return initialState
        },
    },
});

export const { setCreatePlanLocation, clearCreatePlanLocation, setMyPlans, clearPlan } = planSlice.actions;
export default planSlice.reducer;
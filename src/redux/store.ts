import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authReducer from '../features/auth/authSlice'
import profileReducer from '../features/profile/profileSlice'
import locationReducer from '../features/location/locationSlice'
import planReducer from '../features/plans/planSlice'
import AsyncStorage from "@react-native-async-storage/async-storage";
import { persistReducer, persistStore } from 'redux-persist';
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

// 1. Combine reducers
export const rootReducer = combineReducers({
    auth: authReducer,
    profile: profileReducer,
    location: locationReducer,
    plan: planReducer
});

// 2. Set up persist config
const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
    whitelist: ['auth', 'profile', 'location', 'plan'], // persist only these slices
    blacklist: ['navigation']
};

// 3. Create persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// 4. Create store with persisted reducer
export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false, // ⚠️ disable serializableCheck for redux-persist
        }),
})

// 5. Create persistor
export const persistor = persistStore(store);

export type RootStoreType = ReturnType<typeof store.getState>;
export type DispatchType = typeof store.dispatch;

export const useAppDispatch = (): DispatchType => {
    return useDispatch<DispatchType>()
};

export const useAppSelector = <TSelected>(
    selector: (state: RootStoreType) => TSelected
): TSelected => {

    const typedSelector: TypedUseSelectorHook<RootStoreType> = useSelector;

    return typedSelector(selector as any)
};
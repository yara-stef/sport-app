import { configureStore } from '@reduxjs/toolkit';
import athletReducer from '../features/AthletSlice';

export const store = configureStore({
    reducer: {
        athletes: athletReducer
    }
})
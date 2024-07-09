import { configureStore } from '@reduxjs/toolkit';
import profileReducer from './slices/profileReducer';

const store = configureStore({
  reducer: {
    profile: profileReducer,
  },
});

export type AppDispatch = typeof store.dispatch;

export default store;

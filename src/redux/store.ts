import { configureStore } from '@reduxjs/toolkit';
import authReducer from './features/auth/authSlice';
import resetReducer from './features/reset-pswd/resetSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    reset: resetReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;

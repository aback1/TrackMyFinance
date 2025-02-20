import { configureStore } from '@reduxjs/toolkit';
import loginReducer from '../features/Login/loginSlice.js';
import { loginApi } from '../features/Login/loginApi.js';
import { setupListeners } from '@reduxjs/toolkit/query';

const store = configureStore({
    reducer: {
        login: loginReducer,
        [loginApi.reducerPath]: loginApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware()
            .concat(loginApi.middleware)
});

setupListeners(store.dispatch);

export default store;



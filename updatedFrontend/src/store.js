import { configureStore } from '@reduxjs/toolkit';
import loginReducer from './features/login/loginSlice.js';
import transactionReducer from './features/transaction/transactionSlice.js';
import { loginApi } from './features/login/loginApi.js';
import { setupListeners } from '@reduxjs/toolkit/query';
import {transactionApi} from "./features/transaction/transactionApi.js";
import {userApi} from "./features/userdata/userApi.js";
import notificationReducer from './features/notification/notificationSlice.js';


const store = configureStore({
    reducer: {
        login: loginReducer,
        notification: notificationReducer,
        transaction: transactionReducer,
        [loginApi.reducerPath]: loginApi.reducer,
        [transactionApi.reducerPath]: transactionApi.reducer,
        [userApi.reducerPath]: userApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware()
            .concat(loginApi.middleware).concat(transactionApi.middleware).concat(userApi.middleware)
});

setupListeners(store.dispatch);

export default store;



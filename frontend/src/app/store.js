import { configureStore } from '@reduxjs/toolkit';
import loginReducer from '../features/Login/loginSlice.js';
import { loginApi } from '../features/Login/loginApi.js';
import { setupListeners } from '@reduxjs/toolkit/query';
import { historyApi } from '../features/History/historyApi.js';
import comparisonReducer from '../features/Comparison/comparisonSlice.js';
import budgetReducer from '../features/BudgetForm/budgetSlice.js';

const store = configureStore({
  reducer: {
    login: loginReducer,
    comparison: comparisonReducer,
    budget: budgetReducer,
    [loginApi.reducerPath]: loginApi.reducer,
    [historyApi.reducerPath]: historyApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(loginApi.middleware)
      .concat(historyApi.middleware),
});

setupListeners(store.dispatch);

export default store;

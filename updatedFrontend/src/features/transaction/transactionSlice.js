import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    currency: "USD",
    period: "this month",
    useFirstNameForGreeting: false,
    userName: "John Doe",
}

//period: "this month" all entries 02.2025 "last 3 months": 12.24 01.25 02.25 and "last 12 months": 02.24 - 02.25

export const transactionSlice = createSlice({
    name: 'transaction',
    initialState,
    reducers: {

        setCurrency: (state, action) => {
            state.currency = action.payload;
        },

        setPeriod: (state, action) => {
            state.period = action.payload;
        },

        setGreeting: (state, action) => {
            state.greeting = action.payload;
        },

        setUserName: (state, action) => {
            state.userName = action.payload;
        },

    }
});

export const {setCurrency, setPeriod, setGreeting, setUserName} = transactionSlice.actions;

export default transactionSlice.reducer;
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    showLoginForm: false,
    userName: 'John Doe',
    password: '',
    isLoggedIn: true,
};

export const loginSlice = createSlice({
    name: 'login',
    initialState,
    reducers: {
        setShowLoginForm: (state, action) => {
            state.showLoginForm = action.payload;
        },
        setUserName: (state, action) => {
            state.userName = action.payload;
        },
        setPassword: (state, action) => {
            state.password = action.payload;
        },
        setIsLoggedIn: (state, action) => {
            state.isLoggedIn = action.payload;
        },
        logout: () => {
            return initialState;
        },
    },
});

export const {
    setShowLoginForm,
    setUserName,
    setPassword,
    setIsLoggedIn,
    logout,
} = loginSlice.actions;

export default loginSlice.reducer;

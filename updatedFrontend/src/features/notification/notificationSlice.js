import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    notifications: []
}

export const notificationSlice = createSlice({
    name: 'notification',
    initialState,
    reducers: {

        addNotification: (state, action) => {
            state.notifications.push(action.payload);
        },
        deleteNotification: (state, action) => {
            state.notifications.filter((notification) => notification.id !== action.payload);
        }
    }
});

export const {
    addNotification,
    deleteNotification
} = loginSlice.actions;

export default notificationSlice.reducer;
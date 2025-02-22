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
           state.notifications = state.notifications.filter((notification) => notification.id !== action.payload);
        }
    }
});

export const {
    addNotification,
    deleteNotification
} = notificationSlice.actions;

export default notificationSlice.reducer;
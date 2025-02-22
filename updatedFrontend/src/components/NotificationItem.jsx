import React from "react";
import { useDispatch } from "react-redux";
import { deleteNotification } from "../features/notification/notificationSlice.js";

export default function NotificationItem({ notification }) {
    const dispatch = useDispatch();
    const { id, text } = notification;

    const handleDelete = () => {
        dispatch(deleteNotification(id));
    };

    return (
        <div className="notification-item">
            <p>{text}</p>
            <button onClick={handleDelete}>X</button>
        </div>
    );
}

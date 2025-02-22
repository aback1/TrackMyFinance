import React from "react";
import { useSelector } from "react-redux";
import NotificationItem from "./NotificationItem";

export default function Notifications() {
    const notifications = useSelector((state) => state.notification.notifications) || [];

    if (notifications.length === 0) {
        return (
            <div className="notifications">
                <p>No notifications available</p>
            </div>
        );

    }
    return (
        <div className="notifications-container">
            {notifications.map((notification) => (
                <NotificationItem key={notification.id} notification={notification} />
            ))}
        </div>
    );
}

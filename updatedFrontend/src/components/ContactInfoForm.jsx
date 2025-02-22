import React, { useState } from "react";
import { useGetUserDataQuery, useUpdateUserDataMutation } from "../features/userdata/userApi.js";
import "../styles/ContactInfoForm.css";
import {useDispatch, useSelector} from "react-redux";
import {addNotification} from "../features/notification/notificationSlice.js";
import {v4 as uuid} from "uuid";

export default function ContactInfoForm() {

    const username = useSelector((state) => state.login.userName) || "";

    // Fetch user data; note that our API returns an array, so we extract the first element.
    const { data, isLoading, error } = useGetUserDataQuery(username);
    const [updateUserData, { isLoading: isUpdating }] = useUpdateUserDataMutation();
    const dispatch = useDispatch();

    // Assume that if data exists, it’s an array with one object.
    const userData = data && data.length > 0 ? data[0] : {};

    // Local state for form inputs; we let the placeholders display the fetched values.
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        address: "",
        email: "",
        phone: "",
    });

    // Handle input changes.
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    // On form submit, build the payload so that if a field was left empty, we fall back on the fetched data.
    const handleSubmit = async (e) => {
        e.preventDefault();

        const finalData = {
            // Map formData keys to the keys expected by your API.
            name: username,
            firstname: formData.firstName || userData.firstname || "",
            lastname: formData.lastName || userData.lastname || "",
            address: formData.address || userData.address || "",
            email: formData.email || userData.email || "",
            phonenumber: formData.phone || userData.phoneNumber || ""
        };

        try {
            await updateUserData(finalData).unwrap();
            alert("Updated contact information:");
            dispatch(addNotification({
                id: uuid(), text: "Updated contact information"
            }));


        } catch (err) {
            console.error("Failed to update contact info:", err);
        }
    };

    return (
        <div className="contact-info-container">
            <h2 className="form-title">Your Data</h2>
            {isLoading ? (
                <p>Loading...</p>
            ) : error ? (
                <p>Error loading user data</p>
            ) : (
                <form onSubmit={handleSubmit} className="contact-info-form">
                    <div className="form-row">
                        {/* First Name */}
                        <div className="form-group">
                            <label>First name</label>
                            <input
                                type="text"
                                name="firstName"
                                placeholder={userData.firstname || "First name"}
                                value={formData.firstName}
                                onChange={handleChange}
                            />
                        </div>
                        {/* Last Name */}
                        <div className="form-group">
                            <label>Last name</label>
                            <input
                                type="text"
                                name="lastName"
                                placeholder={userData.lastname || "Last name"}
                                value={formData.lastName}
                                onChange={handleChange}
                            />
                        </div>
                    </div>

                    {/* Address */}
                    <div className="form-group">
                        <label>Address</label>
                        <input
                            type="text"
                            name="address"
                            placeholder={userData.address || "Street number, City Zipcode"}
                            value={formData.address}
                            onChange={handleChange}
                        />
                    </div>

                    {/* Email */}
                    <div className="form-group">
                        <label>Email</label>
                        <input
                            type="email"
                            name="email"
                            placeholder={userData.email || "Email address"}
                            value={formData.email}
                            onChange={handleChange}
                        />
                    </div>

                    {/* Phone */}
                    <div className="form-group">
                        <label>Phone</label>
                        <input
                            type="tel"
                            name="phone"
                            placeholder={userData.phoneNumber || "Phone number: +XX0123456789"}
                            value={formData.phone}
                            onChange={handleChange}
                        />
                    </div>

                    {/* Submit */}
                    <button type="submit" className="submit-btn" disabled={isUpdating}>
                        {isUpdating ? "Updating..." : "Update"}
                    </button>
                </form>
            )}
        </div>
    );
}

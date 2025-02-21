import React, { useState } from "react";
import "../styles/ContactInfoForm.css";

export default function ContactInfoForm() {
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        address: "",
        email: "",
        phone: "",
    });

    // Handle input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        // Perform update or send data to server
        console.log("Updated contact info:", formData);
    };

    return (
        <div className="contact-info-container">
            <h2 className="form-title">Billing details</h2>
            <form onSubmit={handleSubmit} className="contact-info-form">
                <div className="form-row">
                    {/* First Name */}
                    <div className="form-group">
                        <label>First name</label>
                        <input
                            type="text"
                            name="firstName"
                            placeholder="First name"
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
                            placeholder="Last name"
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
                        placeholder="Address"
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
                        placeholder="Email address"
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
                        placeholder="Phone number"
                        value={formData.phone}
                        onChange={handleChange}
                    />
                </div>

                {/* Submit */}
                <button type="submit" className="submit-btn">
                    Update
                </button>
            </form>
        </div>
    );
}

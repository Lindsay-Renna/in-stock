import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./AddNewWarehouse.scss";
import ContentBox from "../ContentBox/ContentBox";
import BackArrow from "../../assets/icons/arrow_back-24px.svg";
import { postWarehouseEndpoint, convertFormToJson } from "../../utilities/api_utility";
import axios from "axios";

const AddNewWarehouse = () => {
	const [formData, setFormData] = useState({
		warehouseName: "",
		streetAddress: "",
		city: "",
		country: "",
		contactName: "",
		position: "",
		phoneNumber: "",
		email: "",
	});

	const [errors, setErrors] = useState({});

	const navigator = useNavigate();

	const handleChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const validate = () => {
		let formErrors = {};
		if (!formData.warehouseName)
			formErrors.warehouseName = "This field is required";
		if (!formData.streetAddress)
			formErrors.streetAddress = "This field is required";
		if (!formData.city) formErrors.city = "This field is required";
		if (!formData.country) formErrors.country = "This field is required";
		if (!formData.contactName)
			formErrors.contactName = "This field is required";
		if (!formData.position) formErrors.position = "This field is required";
		if (!formData.phoneNumber)
			formErrors.phoneNumber = "This field is required";
		else if (!(formData.phoneNumber.match(/\d/g).length >= 10 && formData.phoneNumber.match(/\d/g).length <= 11))
			formErrors.phoneNumber = "Invalid Phone Number";
		if (!formData.email) formErrors.email = "This field is required";
		else if (!/\S+@\S+\.\S+/.test(formData.email))
			formErrors.email = "Invalid Email";
		return formErrors;
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		const formErrors = validate();
		if (Object.keys(formErrors).length === 0) {
			const res = await axios.post(postWarehouseEndpoint(), convertFormToJson(formData));
			if(res.status != 201){
				console.error("Something went wrong during Warehouse POST operation! (%d) %s", res.status, res.data);
			} else {
				console.debug("Warehouse posted successfully: %s", JSON.stringify(res.data));
				navigator(`/warehouses/${res.data.id}`);
			}
		} else {
			setErrors(formErrors);
		}
	};

	return (
		<>
			<ContentBox>
				<div className="warehouse">
					<div className="warehouse__header">
						<Link to="/warehouses" className="warehouse__back-link">
							<img
								src={BackArrow}
								alt="Back"
								className="warehouse__back-icon"
							/>
						</Link>
						<h1 className="warehouse__title">Add New Warehouse</h1>
					</div>
					<div className="warehouse__divider"></div>
					<form onSubmit={handleSubmit}>
						<div className="warehouse__details-container">
							<div className="warehouse__section">
								<h2 className="warehouse__section-title">Warehouse Details</h2>
								<div className="warehouse__form-group">
									<label>Warehouse Name</label>
									<input
										type="text"
										name="warehouseName"
										value={formData.warehouseName}
										onChange={handleChange}
										placeholder="Warehouse Name"
										className={errors.warehouseName ? "error" : ""}
									/>
									{errors.warehouseName && (
										<div className="error-message__wrapper">
											<img
												className="error-message__icon"
												src="/src/assets/icons/error-24px.svg"
												alt="error icon"
											/>
											<span className="error-message">
												{errors.warehouseName}
											</span>
										</div>
									)}
								</div>
								<div className="warehouse__form-group">
									<label>Street Address</label>
									<input
										type="text"
										name="streetAddress"
										value={formData.streetAddress}
										onChange={handleChange}
										placeholder="Street Address"
										className={errors.streetAddress ? "error" : ""}
									/>
									{errors.streetAddress && (
										<div className="error-message__wrapper">
											<img
												className="error-message__icon"
												src="/src/assets/icons/error-24px.svg"
												alt="error icon"
											/>
											<span className="error-message">
												{errors.streetAddress}
											</span>
										</div>
									)}
								</div>
								<div className="warehouse__form-group">
									<label>City</label>
									<input
										type="text"
										name="city"
										value={formData.city}
										onChange={handleChange}
										placeholder="City"
										className={errors.city ? "error" : ""}
									/>
									{errors.city && (
										<div className="error-message__wrapper">
											<img
												className="error-message__icon"
												src="/src/assets/icons/error-24px.svg"
												alt="error icon"
											/>
											<span className="error-message">{errors.city}</span>
										</div>
									)}
								</div>
								<div className="warehouse__form-group">
									<label>Country</label>
									<input
										type="text"
										name="country"
										value={formData.country}
										onChange={handleChange}
										placeholder="Country"
										className={errors.country ? "error" : ""}
									/>
									{errors.country && (
										<div className="error-message__wrapper">
											<img
												className="error-message__icon"
												src="/src/assets/icons/error-24px.svg"
												alt="error icon"
											/>
											<span className="error-message">{errors.country}</span>
										</div>
									)}
								</div>
							</div>
							<div className="warehouse__divider warehouse__divider--vertical"></div>
							<div className="warehouse__section">
								<h2 className="warehouse__section-title">Contact Details</h2>
								<div className="warehouse__form-group">
									<label>Contact Name</label>
									<input
										type="text"
										name="contactName"
										value={formData.contactName}
										onChange={handleChange}
										placeholder="Contact Name"
										className={errors.contactName ? "error" : ""}
									/>
									{errors.contactName && (
										<div className="error-message__wrapper">
											<img
												className="error-message__icon"
												src="/src/assets/icons/error-24px.svg"
												alt="error icon"
											/>
											<span className="error-message">
												{errors.contactName}
											</span>
										</div>
									)}
								</div>
								<div className="warehouse__form-group">
									<label>Position</label>
									<input
										type="text"
										name="position"
										value={formData.position}
										onChange={handleChange}
										placeholder="Position"
										className={errors.position ? "error" : ""}
									/>
									{errors.position && (
										<div className="error-message__wrapper">
											<img
												className="error-message__icon"
												src="/src/assets/icons/error-24px.svg"
												alt="error icon"
											/>
											<span className="error-message">{errors.position}</span>
										</div>
									)}
								</div>
								<div className="warehouse__form-group">
									<label>Phone Number</label>
									<input
										type="text"
										name="phoneNumber"
										value={formData.phoneNumber}
										onChange={handleChange}
										placeholder="Phone Number"
										className={errors.phoneNumber ? "error" : ""}
									/>
									{errors.phoneNumber && (
										<div className="error-message__wrapper">
											<img
												className="error-message__icon"
												src="/src/assets/icons/error-24px.svg"
												alt="error icon"
											/>
											<span className="error-message">
												{errors.phoneNumber}
											</span>
										</div>
									)}
								</div>
								<div className="warehouse__form-group">
									<label>Email</label>
									<input
										type="email"
										name="email"
										value={formData.email}
										onChange={handleChange}
										placeholder="Email"
										className={errors.email ? "error" : ""}
									/>
									{errors.email && (
										<div className="error-message__wrapper">
											<img
												className="error-message__icon"
												src="/src/assets/icons/error-24px.svg"
												alt="error icon"
											/>
											<span className="error-message">{errors.email}</span>
										</div>
									)}
								</div>
							</div>
						</div>
						<div className="warehouse__form-actions">
							<Link to="/warehouses" className="warehouse__cancel-link ">
								<button type="button" className="warehouse__cancel-button">
									Cancel
								</button>
							</Link>
							<button type="submit" className="warehouse__submit-button">
								+ Add Warehouse
							</button>
						</div>
					</form>
				</div>
			</ContentBox>
			<div className="spacer2"></div>
		</>
	);
};

export default AddNewWarehouse;

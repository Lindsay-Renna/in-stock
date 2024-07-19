import React, { useState, useEffect } from "react";
import { Link, useParams, useLocation, useNavigate } from "react-router-dom";
import "./EditWarehouse.scss";
import axios from "axios";
import ContentBox from "../ContentBox/ContentBox";
import BackArrow from "../../assets/icons/arrow_back-24px.svg";
import {
	getWarehouseEndpoint,
	putWarehouseEndpoint,
	convertFormToJson
} from "../../utilities/api_utility";

const EditWarehouse = () => {
	const navigate = useNavigate();
	const { warehouseId } = useParams();
	const location = useLocation();
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

	useEffect(() => {
		if (location.state && location.state.warehouse) {
			const { warehouse } = location.state;
			setFormData({
				warehouseName: warehouse.warehouse_name,
				streetAddress: warehouse.address,
				city: warehouse.city,
				country: warehouse.country,
				contactName: warehouse.contactName,
				position: warehouse.position,
				phoneNumber: warehouse.phoneNumber,
				email: warehouse.email,
			});
		} else {
			fetchWarehouse();
		}
	}, [location.state, warehouseId]);

	const fetchWarehouse = async () => {
		try {
			const result = await axios.get(getWarehouseEndpoint(warehouseId));
			const data = result.data;
			setFormData({
				warehouseName: data.warehouse_name,
				streetAddress: data.address,
				city: data.city,
				country: data.country,
				contactName: data.contact_name,
				position: data.contact_position,
				phoneNumber: data.contact_phone,
				email: data.contact_email,
			});
		} catch (error) {
			console.error("Error fetching warehouse data:", error);
			navigate("/404");
		}
	};

	const handleChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const validate = () => {
		let formErrors = {};
		if (!formData.warehouseName)
			formErrors.warehouseName = "Warehouse Name is required";
		if (!formData.streetAddress)
			formErrors.streetAddress = "Street Address is required";
		if (!formData.city) formErrors.city = "City is required";
		if (!formData.country) formErrors.country = "Country is required";
		if (!formData.contactName)
			formErrors.contactName = "Contact Name is required";
		if (!formData.position) formErrors.position = "Position is required";
		if (!formData.phoneNumber)
			formErrors.phoneNumber = "Phone Number is required";
		else if (
			formData.phoneNumber.match(/\d/g).length < 10 ||
			formData.phoneNumber.match(/\d/g).length > 11
		)
			formErrors.phoneNumber = "Invalid Phone Number";
		if (!formData.email) formErrors.email = "Email is required";
		else if (!/\S+@\S+\.\S+/.test(formData.email))
			formErrors.email = "Invalid Email";
		return formErrors;
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		const formErrors = validate();
		if (Object.keys(formErrors).length === 0) {
			const res = await axios.put(
				putWarehouseEndpoint(warehouseId),
				convertFormToJson(formData)
			);
			if (res.status == 200) {
				console.debug("PUT successful!");
				navigate(`/warehouses/${warehouseId}`)
			} else {
				console.error(
					"Received error during update operation: (%d - %s) %s",
					res.status,
					res.statusText,
					res.data
				);
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
						<h1 className="warehouse__title">Edit Warehouse</h1>
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
										<span className="error-message">
											{errors.warehouseName}
										</span>
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
										<span className="error-message">
											{errors.streetAddress}
										</span>
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
										<span className="error-message">{errors.city}</span>
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
										<span className="error-message">{errors.country}</span>
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
										<span className="error-message">{errors.contactName}</span>
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
										<span className="error-message">{errors.position}</span>
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
										<span className="error-message">{errors.phoneNumber}</span>
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
										<span className="error-message">{errors.email}</span>
									)}
								</div>
							</div>
						</div>
						<div className="warehouse__form-actions">
							<Link
								className="warehouse__cancel-link"
								to={`/warehouses/${warehouseId}`}
							>
								<button type="button" className="warehouse__cancel-button">
									Cancel
								</button>
							</Link>
							<button type="submit" className="warehouse__save-button">
								Save
							</button>
						</div>
					</form>
				</div>
			</ContentBox>
			<div className="spacer2"></div>
		</>
	);
};

export default EditWarehouse;

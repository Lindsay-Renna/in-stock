import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./AddNewItem.scss";
import ContentBox from "../ContentBox/ContentBox";
import BackArrow from "../../assets/icons/arrow_back-24px.svg";
import {
	postItemEndpoint,
	getWarehouseListEndpoint,
} from "../../utilities/api_utility";

const AddNewItem = () => {
	const navigate = useNavigate();

	const [formData, setFormData] = useState({
		warehouse_id: "",
		item_name: "",
		description: "",
		category: "",
		status: "",
		quantity: 0,
	});

	const [warehouses, setWarehouses] = useState([]);
	const [errors, setErrors] = useState({});

	useEffect(() => {
		const fetchWarehouses = async () => {
			try {
				const warehousesResponse = await axios.get(getWarehouseListEndpoint());
				setWarehouses(warehousesResponse.data);
			} catch (err) {
				console.error("Error retrieving warehouse data:", err);
			}
		};

		fetchWarehouses();
	}, []);

	const handleChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const validate = () => {
		let formErrors = {};
		if (!formData.warehouse_id)
			formErrors.warehouse_id = "This field is required";
		if (!formData.item_name) formErrors.item_name = "This field is required";
		if (!formData.description)
			formErrors.description = "This field is required";
		if (!formData.category) formErrors.category = "This field is required";
		if (!formData.status) formErrors.status = "This field is required";
		return formErrors;
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		const formErrors = validate();
		if (Object.keys(formErrors).length === 0) {
			const response = await axios.post(postItemEndpoint(), formData);
            const idNum = response.data.match(/\d+/);
			navigate(`/inventory/${idNum}`);
		} else {
			setErrors(formErrors);
		}
	};

	return (
		<ContentBox>
			<div className="add-item">
				<div className="add-item__header">
					<Link to="/inventory" className="add-item__back-link">
						<img src={BackArrow} alt="Back" className="add-item__back-icon" />
					</Link>
					<h1 className="add-item__title">Add New Inventory Item</h1>
				</div>
				<div className="add-item__divider"></div>
				<form onSubmit={handleSubmit}>
					<div className="add-item__details-container">
						<div className="add-item__section">
							<h2 className="add-item__section-title">Item Details</h2>
							<div className="add-item__form-group">
								<label className="add-item__label">Item Name</label>
								<input
									type="text"
									name="item_name"
									value={formData.item_name}
									onChange={handleChange}
									placeholder="Item Name"
									className={`add-item__input ${
										errors.description ? "error" : ""
									}`}
								/>
								{errors.item_name && (
									<div className="error-message__wrapper">
										<img
											className="error-message__icon"
											src="/src/assets/icons/error-24px.svg"
											alt="error icon"
										/>
										<span className="error-message">{errors.item_name}</span>
									</div>
								)}
							</div>
							<div className="add-item__form-group">
								<label className="add-item__label">Description</label>
								<textarea
									name="description"
									rows="5"
									value={formData.description}
									onChange={handleChange}
									placeholder="Please enter a brief item description..."
									className={`add-item__textarea ${
										errors.description ? "error" : ""
									}`}
									required
								/>
								{errors.description && (
									<div className="error-message__wrapper">
										<img
											className="error-message__icon"
											src="/src/assets/icons/error-24px.svg"
											alt="error icon"
										/>
										<span className="error-message">{errors.description}</span>
									</div>
								)}
							</div>
							<div className="add-item__form-group">
								<label className="add-item__label">Category</label>
								<select
									name="category"
									value={formData.category}
									onChange={handleChange}
									className={`add-item__select ${
										errors.category ? "error" : ""
									}`}
									required
								>
									<option value="">Please select</option>
									<option value="Electronics">Electronics</option>
									<option value="Gear">Gear</option>
									<option value="Apparel">Apparel</option>
									<option value="Accessories">Accessories</option>
									<option value="Health">Health</option>
								</select>
								{errors.category && (
									<div className="error-message__wrapper">
										<img
											className="error-message__icon"
											src="/src/assets/icons/error-24px.svg"
											alt="error icon"
										/>
										<span className="error-message">{errors.category}</span>
									</div>
								)}
							</div>
						</div>
						<div className="add-item__divider add-item__divider--vertical"></div>
						<div className="add-item__section">
							<h2 className="add-item__section-title">Item Availability</h2>
							<div className="add-item__form-group">
								<label className="add-item__label">Status</label>
								<div className="add-item__radio-group">
									<label className="add-item__radio-label">
										<input
											type="radio"
											name="status"
											value="In Stock"
											checked={formData.status === "In Stock"}
											onChange={handleChange}
											className="add-item__radio-btn"
										/>{" "}
										In stock
									</label>
									<label className="add-item__radio-label">
										<input
											type="radio"
											name="status"
											value="Out of Stock"
											checked={formData.status === "Out of Stock"}
											onChange={handleChange}
											className="add-item__radio-btn"
										/>{" "}
										Out of stock
									</label>
								</div>
								{errors.status && (
									<div className="error-message__wrapper">
										<img
											className="error-message__icon"
											src="/src/assets/icons/error-24px.svg"
											alt="error icon"
										/>
										<span className="error-message">{errors.status}</span>
									</div>
								)}
							</div>
							{formData.status === "In Stock" && (
								<div className="add-item__form-group">
									<label className="add-item__label">Quantity</label>
									<input
										className="add-item__input"
										type="number"
										name="quantity"
										value={formData.quantity}
										onChange={handleChange}
										required={formData.status === "In Stock"}
									/>
								</div>
							)}
							<div className="add-item__form-group">
								<label className="add-item__label">Warehouse</label>
								<select
									name="warehouse_id"
									value={formData.warehouse_id}
									onChange={handleChange}
									className={`add-item__select ${
										errors.warehouse_id ? "error" : ""
									}`}
									required
								>
									<option>Please select</option>
									{warehouses.map((warehouse) => (
										<option key={warehouse.id} value={warehouse.id}>
											{warehouse.warehouse_name}
										</option>
									))}
								</select>
								{errors.category && (
									<div className="error-message__wrapper">
										<img
											className="error-message__icon"
											src="/src/assets/icons/error-24px.svg"
											alt="error icon"
										/>
										<span className="error-message">{errors.warehouse}</span>
									</div>
								)}
							</div>
						</div>
					</div>
					<div className="add-item__form-actions">
						<Link to="/inventory">
							<button type="button" className="add-item__cancel-button">
								Cancel
							</button>
						</Link>
						<button type="submit" className="add-item__submit-button">
							+ Add Item
						</button>
					</div>
				</form>
			</div>
		</ContentBox>
	);
};

export default AddNewItem;

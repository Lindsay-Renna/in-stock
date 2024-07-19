import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import axios from "axios";
import "./EditInventoryItem.scss";
import {
	getItemEndpoint,
	getWarehouseListEndpoint,
	putItemEndpoint,
} from "../../utilities/api_utility";
import BackArrow from "../../assets/icons/arrow_back-24px.svg";
import ContentBox from "../ContentBox/ContentBox";

const EditInventoryItem = () => {
	const { itemId } = useParams();
	const navigate = useNavigate();

	const [item, setItem] = useState({
		item_name: "",
		description: "",
		category: "",
		status: "In Stock",
		quantity: 0,
		warehouse_id: "",
	});
	const [warehouses, setWarehouses] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		const fetchItemDetails = async () => {
			try {
				const itemResponse = await axios.get(getItemEndpoint(itemId));
				setItem(itemResponse.data);
				setLoading(false);
			} catch (error) {
				console.error("Error loading data:", error);
				setError(error);
				setLoading(false);
			}
		};

		const fetchWarehouses = async () => {
			try {
				const warehousesResponse = await axios.get(getWarehouseListEndpoint());

				setWarehouses(warehousesResponse.data);
			} catch (error) {
				console.error("Error loading warehouses:", error);
			}
		};

		fetchItemDetails();
		fetchWarehouses();
	}, [itemId]);

	const handleChange = (e) => {
		const { name, value } = e.target;
		if (name === "warehouse_id") {
			const wh = warehouses.find((w) => w.id == value);
			if (wh === undefined) {
				console.error(
					"Could not find an associated warehouse for ID %s! =( ",
					value
				);
			} else {
				setItem((prevItem) => ({
					...prevItem,
					["warehouse_name"]: wh.warehouse_name,
				}));
			}
		}
		setItem((prevItem) => ({ ...prevItem, [name]: value }));
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		try {
			await axios.put(putItemEndpoint(itemId), item);
			navigate(`/inventory/${itemId}`);
		} catch (error) {
			console.error("Error updating item:", error);
			setError(error);
		}
	};

	if (loading) return <p>Loading...</p>;
	if (error) return <p>Error loading data: {error.message}</p>;
	return (
		<>
			<ContentBox>
				<div className="edit-item">
					<div className="edit-item__header">
						<Link to="/inventory" className="edit-item__back-link">
							<img
								src={BackArrow}
								alt="Back"
								className="edit-item__back-icon"
							/>
						</Link>
						<h1 className="edit-item__title">Edit Inventory Item</h1>
					</div>
					<div className="edit-item__divider"></div>
					<form onSubmit={handleSubmit}>
						<div className="edit-item__columns">
							<div className="edit-item__column">
								<div className="edit-item__section">
									<h2 className="edit-item__section-title">Item Details</h2>
									<div className="edit-item__form-group">
										<label className="edit-item__label">Item Name</label>
										<input
											className="edit-item__input"
											type="text"
											name="item_name"
											value={item.item_name}
											onChange={handleChange}
											required
										/>
									</div>
									<div className="edit-item__form-group">
										<label className="edit-item__label">Description</label>
										<textarea
											className="edit-item__textarea"
											name="description"
											value={item.description}
											onChange={handleChange}
											required
										/>
									</div>
									<div className="edit-item__form-group">
										<label className="edit-item__label">Category</label>
										<select
											className="edit-item__select"
											name="category"
											value={item.category}
											onChange={handleChange}
											required
										>
											<option value="Electronics">Electronics</option>
											<option value="Gear">Gear</option>
											<option value="Apparel">Apparel</option>
											<option value="Accessories">Accessories</option>
											<option value="Health">Health</option>
										</select>
									</div>
								</div>
							</div>
							<div className="warehouse__divider warehouse__divider--vertical"></div>
							<div className="edit-item__column">
								<div className="edit-item__section">
									<h2 className="edit-item__section-title">
										Item Availability
									</h2>
									<div className="edit-item__form-group">
										<label className="edit-item__label">Status</label>
										<div className="edit-item__radio-group">
											<label className="edit-item__radio-label">
												<input
													type="radio"
													name="status"
													value="In Stock"
													checked={item.status === "In Stock"}
													onChange={handleChange}
												/>{" "}
												In stock
											</label>
											<label className="edit-item__radio-label">
												<input
													type="radio"
													name="status"
													value="Out of Stock"
													checked={item.status === "Out of Stock"}
													onChange={handleChange}
												/>{" "}
												Out of stock
											</label>
										</div>
									</div>
									{item.status === "In Stock" && (
										<div className="edit-item__form-group">
											<label className="edit-item__label">Quantity</label>
											<input
												className="edit-item__input"
												type="number"
												name="quantity"
												value={item.quantity}
												onChange={handleChange}
												required={item.status === "In Stock"}
											/>
										</div>
									)}
									<div className="edit-item__form-group">
										<label className="edit-item__label">Warehouse</label>
										<select
											className="edit-item__select"
											name="warehouse_id"
											value={item.warehouse_id}
											onChange={handleChange}
											required
										>
											{warehouses.map((warehouse) => (
												<option key={warehouse.id} value={warehouse.id}>
													{warehouse.warehouse_name}
												</option>
											))}
										</select>
									</div>
								</div>
							</div>
						</div>
						<div className="edit-item__buttons">
							<button
								type="button"
								className="edit-item__button edit-item__button--cancel"
								onClick={() => navigate(`/inventory/${itemId}`)}
							>
								Cancel
							</button>
							<button
								type="submit"
								className="edit-item__button edit-item__button--save"
							>
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

export default EditInventoryItem;

import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import ContentBox from "../ContentBox/ContentBox";
import BackArrow from "../../assets/icons/arrow_back-24px.svg";
import EditIcon from "../../assets/icons/edit-24px white.svg";
import "./InventoryItemDetails.scss";
import { getItemEndpoint } from "../../utilities/api_utility";

const InventoryItemDetails = () => {
	const { itemId } = useParams();
	const [item, setItem] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		const fetchItemDetails = async () => {
			try {
				const response = await axios.get(getItemEndpoint(itemId));
				setItem(response.data);
				setLoading(false);
			} catch (error) {
				console.error("Error loading data:", error);
				setError(error);
				setLoading(false);
			}
		};

		fetchItemDetails();
	}, [itemId]);

	if (loading) return <p>Loading...</p>;
	if (error) return <p>Error loading data: {error.message}</p>;

	return (
		<>
			<ContentBox className="content-details">
				<div className="item-details">
					<div className="item-details__header">
						<Link to="/inventory" className="item-details__back-link">
							<img
								src={BackArrow}
								alt="Back"
								className="item-details__back-icon"
							/>
						</Link>
						<h1 className="item-details__title">{item.item_name}</h1>
						<Link
							to={`/inventory/${item.id}/edit`}
							className="item-details__edit-link"
						>
							<img
								src={EditIcon}
								alt="Edit"
								className="item-details__edit-icon"
							/>
							<span className="edit-text">Edit</span>
						</Link>
					</div>
					<div className="item-details__divider"></div>
					<div className="item-details__content">
						<div className="item-details__description">
							<div className="item-details__info-item">
								<strong>ITEM DESCRIPTION:</strong>
								<span className="item-details__info-item2">
									{item.description}
								</span>
							</div>

							<div className="item-details__info-item">
								<strong>CATEGORY:</strong>
								<span className="item-details__info-item2">
									{item.category}
								</span>
							</div>
						</div>

						<div className="item-details__divider item-details__divider--vertical"></div>
						<div className="item-details__info">
							<div className="item-details__status-quantity">
								<div className="item-details__info-item item-details__status-item">
									<strong>STATUS:</strong>
									<span
										className={`item-details__status ${
											item.status === "In Stock"
												? "item-details__status--in-stock"
												: "item-details__status--out-of-stock"
										}`}
									>
										{item.status.toUpperCase()}
									</span>
								</div>
								<div className="item-details__info-item item-details__quantity-item">
									<strong>QUANTITY:</strong>
									<span className="item-details__info-item2">
										{item.quantity}
									</span>
								</div>
							</div>
							<div className="item-details__info-item item-details__warehouse-item">
								<strong>WAREHOUSE:</strong>
								<span className="item-details__info-item2">
									{item.warehouse_name}
								</span>
							</div>
						</div>
					</div>
				</div>
			</ContentBox>
			<div className="spacer"></div>
		</>
	);
};

export default InventoryItemDetails;

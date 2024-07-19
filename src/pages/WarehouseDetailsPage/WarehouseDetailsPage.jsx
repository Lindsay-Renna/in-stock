import { useParams, Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import "./WarehouseDetailsPage.scss";
import {
	getWarehouseEndpoint,
	getWarehouseInventoryEndpoint,
} from "../../utilities/api_utility";
import ContentBox from "../../components/ContentBox/ContentBox";
import WarehouseDetailCard from "../../components/WarehouseDetailCard/WarehouseDetailCard";
import WarehouseInventoryCard from "../../components/WarehouseInventoryCard/WarehouseInventoryCard";

function WarehouseDetailsPage() {
	const [warehouse, setWarehouse] = useState(null);
	const [inventory, setInventory] = useState(null);
	const { warehouseId } = useParams();
	const navigate = useNavigate();

	async function getSelectedWarehouse() {
		try {
			let result = await axios.get(getWarehouseEndpoint(warehouseId));
			let data = result.data;
			setWarehouse(data);
		} catch (error) {
			console.error(error);
			navigate("/404");
		}
	}

	async function getWarehouseInventory() {
		try {
			let result = await axios.get(getWarehouseInventoryEndpoint(warehouseId));
			let data = result.data;
			setInventory(data);
		} catch (error) {
			console.error(error);
			navigate("/404");
		}
	}

	useEffect(() => {
		getSelectedWarehouse(warehouseId);
		getWarehouseInventory(warehouseId);
	}, [warehouseId]);

	const headerLabels = ["INVENTORY ITEM", "CATEGORY", "STATUS", "QUANTITY"];

	if (warehouse === null || inventory === null) {
		return <p>loading...</p>;
	}

	return (
		<>
			<ContentBox>
				<div className="title-box">
					<Link to="/">
						<img src="/src/assets/icons/arrow_back-24px.svg" alt="back arrow" />
					</Link>
					<h1>{warehouse.warehouse_name}</h1>
					<Link className="edit-link" to={`/warehouses/${warehouse.id}/edit`}>
						<button>
							<img
								src="/src/assets/icons/edit-24px white.svg"
								alt="pencil icon"
							/>
							<p className="edit-text">Edit</p>
						</button>
					</Link>
				</div>
				<WarehouseDetailCard warehouse={warehouse} />
				<div className="table-header">
					<ul>
						{headerLabels.map((label, index) => {
							return (
								<li key={index} className={`col-${index + 1}`}>
									<p>{label}</p>
									<img
										className="sort-button"
										src="/src/assets/icons/sort-24px.svg"
										alt=""
									/>
								</li>
							);
						})}
						<li className="action col-5">
							<p>ACTIONS</p>
						</li>
					</ul>
				</div>
				<WarehouseInventoryCard
					inventory={inventory}
					warehouse={warehouse}
					setInventory={setInventory}
				/>
			</ContentBox>
		</>
	);
}

export default WarehouseDetailsPage;

import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import "./InventoryPage.scss";
import { getInventoryEndpoint } from "../../utilities/api_utility";
import { getWarehouseListEndpoint } from "../../utilities/api_utility";
import data from "../../data/fakeinventorydata.json";
import ContentBox from "../../components/ContentBox/ContentBox";
import InventoryCard from "../../components/InventoryCard/InventoryCard";

function InventoryPage() {
	const [inventory, setInventory] = useState(data);

	async function getInventory() {
		try {
			let inventory = await axios.get(getInventoryEndpoint());
			convertWarehouseIDstoNames(inventory.data);
		} catch (error) {
			console.error(error);
		}
	}

	async function convertWarehouseIDstoNames(inventoryData) {
	    let warehouses = await axios.get(getWarehouseListEndpoint());
		let warehouseIDsAndNames = {}
		for (let wh of warehouses.data) {
			warehouseIDsAndNames[wh.id] = wh.warehouse_name
		}
		for (let item of inventoryData) {
			let itemWarehouseID = item.warehouse_id;
			let itemWarehouseName = warehouseIDsAndNames[itemWarehouseID]
			item.warehouse_id = itemWarehouseName;
		}
		setInventory(inventoryData);
	}


	useEffect(() => {
		getInventory();
	}, []);

	const headerLabels = [
		"INVENTORY ITEM",
		"CATEGORY",
		"STATUS",
		"QTY",
		"WAREHOUSE",
	];

	return (
		<>
			<ContentBox>
				<div className="inventory-page-title-box">
					<h1>Inventory</h1>

					<div className="inventory-page-search-bar">
						<input
							name="search"
							className="inventory-page-search-bar__input"
							placeholder="Search..."
						/>
						<img
							src="/src/assets/icons/search-24px.svg"
							className="inventory-page-search-bar__icon"
							alt="magnifying glass"
						/>
					</div>

					<Link to="/inventory/add-new">
						<button className="inventory-page-add-item-btn">
							+ Add New Item
						</button>
					</Link>
					
				</div>

				<div className="inventory-page-table-header">
					<ul>
						{headerLabels.map((label, index) => {
							return (
								<li key={index} className={`inventory-page-col-${index + 1}`}>
									<p>{label}</p>
									<img
										className="sort-button"
										src="/src/assets/icons/sort-24px.svg"
										alt=""
									/>
								</li>
							);
						})}
						<li className="spacer inventory-page-col-6"></li>
						<li className="inventory-page-actions inventory-page-col-7">
							<p>ACTIONS</p>
						</li>
					</ul>
				</div>
				<InventoryCard inventory={inventory} setInventory={setInventory}/>
			</ContentBox>
		</>
	);
}

export default InventoryPage;

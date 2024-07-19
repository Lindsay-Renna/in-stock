import { Link } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import "./WarehouseInventoryCard.scss";
import Modal from "../../components/Modal/Modal";
import { deleteItemEndpoint } from "../../utilities/api_utility.js";

function WarehouseInventoryCard({ inventory, warehouse, setInventory }) {
	const [modalOpen, setModalOpen] = useState(false);
	const [selectedItemId, setSelectedItemId] = useState(null);
	const warehouseId = warehouse.id;

	async function handleDelete(id) {
		if (id) {
			try {
				await axios.delete(deleteItemEndpoint(id));
				setInventory((prevInventory) =>
					prevInventory.filter((inventory) => inventory.id !== id)
				);
				setModalOpen(false);
			} catch (error) {
				console.error("Failed to delete inventory item:", error);
			}
		}
	}

	const selectedItem = inventory.find((item) => item.id === selectedItemId);

	if (inventory.length === 0) {
		return (
			<div className="inventory">
				<h3 className="inventory__empty-header">
					This warehouse currently has no inventory
				</h3>
			</div>
		);
	}

	return (
		<div className="inventory">
			{inventory.map((item) => {
				return (
					<div key={item.id} className="inventory-item">
						<div className="inventory-item__wrapper flex-0 col-1">
							<h4 className="inventory-item__header">INVENTORY ITEM</h4>
							<Link to={`/inventory/${item.id}`}>
								<p>{item.item_name}</p>
								<img
									className="inventory-item__chevron"
									src="/src/assets/icons/chevron_right-24px.svg"
									alt="right arrow"
								/>
							</Link>
						</div>
						<div className="inventory-item__wrapper flex-2 col-3">
							<h4 className="inventory-item__header">STATUS</h4>
							<button
								className={
									item.status === "In Stock" ? "in-stock" : "out-stock"
								}
							>
								{item.status.toUpperCase()}
							</button>
						</div>
						<div className="inventory-item__wrapper flex-1 col-2">
							<h4 className="inventory-item__header">CATEGORY</h4>
							<p>{item.category}</p>
						</div>
						<div className="inventory-item__wrapper flex-2 col-4">
							<h4 className="inventory-item__header">QTY</h4>
							<p>{item.quantity}</p>
						</div>
						<div className="action-buttons flex-2 col-5">
							<img
								className="delete-icon"
								id={item.id}
								onClick={() => {
									setSelectedItemId(item.id);
									setModalOpen(true);
								}}
								src="/src/assets/icons/delete_outline-24px.svg"
								alt=""
							/>
							<Link to={`/inventory/${item.id}/edit`}>
								<img
									className="edit-icon"
									src="/src/assets/icons/edit-24px.svg"
									alt="pencil icon"
								/>
							</Link>
						</div>
					</div>
				);
			})}
			{selectedItem && (
				<Modal
					modalOpen={modalOpen}
					setModalOpen={setModalOpen}
					id={selectedItemId}
					handleDelete={handleDelete}
					selectedItem={selectedItem}
					warehouseId={warehouseId}
				>
					<h1 className="modal__header">{`Delete ${selectedItem.item_name} inventory item?`}</h1>
					<p className="modal__text">
						{`Please confirm that you'd like to delete ${selectedItem.item_name} from the inventory list. `}
						<br className="line-break" />
						You won't be able to undo this action.
					</p>
				</Modal>
			)}
		</div>
	);
}

export default WarehouseInventoryCard;

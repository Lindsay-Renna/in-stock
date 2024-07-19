import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import ContentBox from "../../components/ContentBox/ContentBox";
import InputField from "../../components/InputField/InputField";
import SearchIcon from "../../assets/icons/search-24px.svg?react";
import ChevronIcon from "../../assets/icons/chevron_right-24px.svg?react";
import DynamicTable from "../../components/DynamicTable/DynamicTable";
import "./WarehousesPage.scss";
import Actions from "../../components/Actions/Actions";
import Modal from "../../components/Modal/Modal";

import {
	deleteWarehouseEndpoint,
	getWarehouseListEndpoint,
} from "../../utilities/api_utility";

const columns = [
	{ Header: "Warehouse", accessor: "warehouse" },
	{ Header: "Address", accessor: "address" },
	{ Header: "Contact Name", accessor: "contactName" },
	{ Header: "Contact Information", accessor: "contactInfo" },
	{ Header: "Actions", accessor: "actions" },
];

const WarehousesPage = () => {
	const [records, setRecords] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const [modalOpen, setModalOpen] = useState(false);
	const [selectedItemId, setSelectedItemId] = useState(null);

	useEffect(() => {
		const fetchWarehouses = async () => {
			try {
				const response = await axios.get(getWarehouseListEndpoint());
				setRecords(formatData(response.data));
				setLoading(false);
			} catch (err) {
				setError(err);
				setLoading(false);
			}
		};

		fetchWarehouses();
	}, []);

	const formatData = (data) => {
		return data.map((record) => ({
			id: record.id,
			name: record.warehouse_name,
			warehouse: (
				<div>
					<Link to={`/warehouses/${record.id}`}>{record.warehouse_name}</Link>
					<ChevronIcon />
				</div>
			),
			address: (
				<p>
					{record.address}, {record.city}, {record.country}
				</p>
			),
			contactName: <p>{record.contact_name}</p>,
			contactInfo: (
				<>
					<p>{record.contact_phone}</p>
					<p>{record.contact_email}</p>
				</>
			),
			actions: (
				<Actions record={record} onDelete={() => handleDelete(record.id)} />
			),
		}));
	};

	const getWarehouseNameByID = (id) => {
		const match = records.find((rec) => rec.id === id);
		if (match) {
			return <span>{match.name}</span>;
		} else {
			return <span>ERR_WAREHOUSE_NAME_NOT_FOUND</span>;
		}
	};

	const handleDelete = (id) => {
		setSelectedItemId(id);
		setModalOpen(true);
	};

	const confirmDelete = async () => {
		try {
			if (!selectedItemId) {
				console.error("No warehouse ID selected for deletion.");
				return;
			}

			const response = await axios.delete(
				deleteWarehouseEndpoint(selectedItemId)
			);
			if (response.status === 204) {
				setRecords(records.filter((record) => record.id !== selectedItemId));
			} else {
				alert(
					"Something went wrong during the delete operation! The record may not have been deleted. " +
						response.data.message
				);
			}
		} catch (error) {
			console.error("There was an error deleting the record!", error);
		} finally {
			setModalOpen(false);
		}
	};

	if (loading) return <p>Loading...</p>;
	if (error) return <p>Error loading data: {error.message}</p>;

	return (
		<ContentBox>
			<div className="warehouses-page__title-box">
				<h1 className="warehouses-page__title-box__heading">Warehouses</h1>
				<InputField
					className="warehouses-page__title-box__search-box"
					placeholder="Search..."
					icon={<SearchIcon />}
				/>
				<Link to="/warehouses/add-new">
					<button className="warehouses-page__title-box__button">
						+ Add New Warehouse
					</button>
				</Link>
			</div>
			<DynamicTable
				columns={columns}
				records={records}
				onDelete={handleDelete}
			/>
			<Modal
				modalOpen={modalOpen}
				setModalOpen={setModalOpen}
				selectedItemId={selectedItemId}
				handleDelete={confirmDelete}
			>
				<h2 className="modal__header">
					Delete {getWarehouseNameByID(selectedItemId)} warehouse?
				</h2>
				<p className="modal__text">
					Please confirm that you’d like to delete{" "}
					{getWarehouseNameByID(selectedItemId)} from the list of warehouses.
					You won’t be able to undo this action.
				</p>
			</Modal>
		</ContentBox>
	);
};

export default WarehousesPage;

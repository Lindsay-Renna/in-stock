import React from "react";
import PropTypes from "prop-types";
import DeleteIcon from "../../assets/icons/delete_outline-24px.svg?react";
import EditIcon from "../../assets/icons/edit-24px.svg?react";
import "./Actions.scss";
import { Link } from "react-router-dom";

const Actions = ({ record, onDelete }) => {
	return (
		<div className="actions">
			<button
				className="actions__button actions__button--delete"
				onClick={() => onDelete(record)}
			>
				<DeleteIcon />
			</button>
			<Link to={`/warehouses/${record.id}/edit`}>
				<button className="actions__button actions__button--edit">
					<EditIcon />
				</button>
			</Link>
		</div>
	);
};

Actions.propTypes = {
	record: PropTypes.object.isRequired,
	onDelete: PropTypes.func.isRequired,
};

export default Actions;

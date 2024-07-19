import "./WarehouseDetailCard.scss";

function WarehouseDetailCard({ warehouse }) {
	return (
		<div className="details">
			<div className="details__address">
				<h4 className="details__header">WAREHOUSE ADDRESS:</h4>
				<p>{warehouse.address}, </p>
				<p>
					{warehouse.city}, {warehouse.country}
				</p>
			</div>

			<div className="details__wrapper">
				<div className="details__contact">
					<h4 className="details__header">CONTACT NAME:</h4>
					<p>{warehouse.contact_name}</p>
					<p>{warehouse.contact_position}</p>
				</div>
				<div className="details__contact">
					<h4 className="details__header">CONTACT INFORMATION:</h4>
					<p>{warehouse.contact_phone}</p>
					<p>{warehouse.contact_email}</p>
				</div>
			</div>
		</div>
	);
}

export default WarehouseDetailCard;

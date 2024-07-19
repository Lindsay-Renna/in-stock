const API_URL = "http://localhost:3000/api/";

export function convertFormToJson(data) {
	const MAP_FORM_TO_JSON_BODY = {
		city: "city",
		country: "country",
		warehouseName: "warehouse_name",
		streetAddress: "address",
		contactName: "contact_name",
		position: "contact_position",
		phoneNumber: "contact_phone",
		email: "contact_email",
	};
	let toRet = {};
	for (let key of Object.keys(data)) {
		toRet[MAP_FORM_TO_JSON_BODY[key]] = data[key];
	};
	return toRet;
};

export function getWarehouseListEndpoint() {
  return API_URL + "warehouses";
}

export function getWarehouseEndpoint(id) {
  return API_URL + "warehouses/" + id;
}

export function getWarehouseInventoryEndpoint(id) {
  return API_URL + "warehouses/" + id + "/inventories";
}

export function postWarehouseEndpoint() {
  return API_URL + "warehouses/";
}

export function putWarehouseEndpoint(id) {
	return API_URL + "warehouses/" + id;
}

export function deleteWarehouseEndpoint(id) {
  return API_URL + "warehouses/" + id;
}

export function getInventoryEndpoint() {
	return API_URL + "inventories/";
}

export function getItemEndpoint(id) {
	return API_URL + "inventories/" + id;
}

export function postItemEndpoint() {
	return API_URL + "inventories/";
}

export function putItemEndpoint(id) {
	return API_URL + "inventories/" + id;
}

export function deleteItemEndpoint(id) {
	return API_URL + "inventories/" + id;
}

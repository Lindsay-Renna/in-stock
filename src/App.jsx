import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import "./App.scss";
import WarehouseDetailsPage from "./pages/WarehouseDetailsPage/WarehouseDetailsPage";
import WarehousesPage from "./pages/WarehousesPage/WarehousesPage";
import InventoryPage from "./pages/InventoryPage/InventoryPage";
import ItemDetailsPage from "./pages/ItemDetailsPage/ItemDetailsPage";
import AddNewItem from "./components/AddNewItem/AddNewItem";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage";
import AddNewWarehouse from "./components/AddNewWarehouse/AddNewWarehouse";
import EditWarehouse from "./components/EditWarehouse/EditWarehouse";
import EditInventoryItem from "./components/EditInventoryItem/EditInventoryItem";

function App() {
	return (
		<>
			<BrowserRouter>
				<Header />
				<Routes>
					<Route path="/" element={<WarehousesPage />} />
					<Route path="/warehouses" element={<WarehousesPage />} />
					<Route
						path="/warehouses/:warehouseId"
						element={<WarehouseDetailsPage />}
					/>
					<Route
						path="/warehouses/:warehouseId/edit"
						element={<EditWarehouse />}
					/>
					<Route path="/inventory/" element={<InventoryPage />} />
					<Route path="/inventory/:itemId" element={<ItemDetailsPage />} />
					<Route path="/inventory/:itemId/edit" element={<EditInventoryItem />} />
          			<Route path="/inventory/add-new" element={<AddNewItem />} />
					<Route path="/warehouses/add-new" element={<AddNewWarehouse />} />
					<Route path="/*" element={<NotFoundPage />} />
				</Routes>
				<Footer />
			</BrowserRouter>
		</>
	);
}
export default App;

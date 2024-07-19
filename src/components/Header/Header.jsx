import React from "react";
import { NavLink, useLocation, Link } from "react-router-dom";
import Logo from "../../assets/logo/InStock-Logo_2x.png";
import "./Header.scss";

const Header = () => {
	const location = useLocation();

	return (
		<div className="navbar">
			<div className="navbar__container">
				<div className="navbar__logo-container">
					<Link to="/">
						<img src={Logo} className="navbar__img" alt="InStock" />
					</Link>
				</div>
				<div className="navbar__links">
					<ul className="navbar__list">
						<li
							className={
								location.pathname.startsWith("/warehouses") ||
								location.pathname === "/"
									? "active"
									: ""
							}
						>
							<NavLink
								to="/warehouses"
								className={
									location.pathname === "/"
										? "navbar__link active"
										: "navbar__link"
								}
							>
								Warehouses
							</NavLink>
						</li>
						<li
							className={
								location.pathname.startsWith("/inventory") ? "active" : ""
							}
						>
							<NavLink to="/inventory" className="navbar__link">
								Inventory
							</NavLink>
						</li>
					</ul>
				</div>
			</div>
		</div>
	);
};

export default Header;

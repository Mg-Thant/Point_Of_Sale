import React from "react";
import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <nav>
      <Link to={"/"}>Dashboard</Link>
      <Link to={"/sales"}>Sales</Link>
      <Link to={"/inventory"}>Inventory</Link>
      <Link to={"/reports"}>Reports</Link>
      <Link to={"/settings"}>Settings</Link>
    </nav>
  );
};

export default NavBar;

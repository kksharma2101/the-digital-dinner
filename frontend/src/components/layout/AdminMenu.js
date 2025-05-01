import React from "react";
import { NavLink } from "react-router-dom";

const AdminMenu = () => {
  return (
    <div className="flex justify-center items-center gap-5">
      <NavLink
        to="/dashboard/admin/create-category"
        className="py-1 px-2 bg-gray-300 rounded-md"
      >
        Create Category
      </NavLink>
      <NavLink
        to="/dashboard/admin/create-product"
        className="py-1 px-2 bg-gray-300 rounded-md"
      >
        Create Product
      </NavLink>
    </div>
  );
};

export default AdminMenu;

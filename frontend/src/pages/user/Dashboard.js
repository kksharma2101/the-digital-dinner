import React from "react";
import Layout from "../../components/layout/Layout";
import { useAuth } from "../../context/Auth";
import { NavLink } from "react-router-dom";

const Dashboard = () => {
  const [auth] = useAuth();

  return (
    <Layout title={"Dashboard - Ecommerce App"}>
      <h1 className="text-lg font-bold my-3 text-center">Dashboard</h1>
      <div className="grid grid-cols-2 mt-10">
        <div className="p-2">
          <h2 className="font-mono text-black">
            Your name: {auth?.user?.name}
          </h2>
          <h4 className="font-mono text-black">
            Your Email: {auth?.user?.email}
          </h4>
          <h4 className="font-mono text-black">
            Your number: {auth?.user?.phone}
          </h4>
          <h4 className="font-mono text-black">
            Your Role: {auth?.user?.role}
          </h4>
        </div>

        <div className="text-center">
          <NavLink to="/dashboard/user/orders" className="font-mono text-black">
            Total Orders
          </NavLink>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;

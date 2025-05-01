import React from "react";
import Layout from "../../components/layout/Layout";
import AdminMenu from "../../components/layout/AdminMenu";
import { useAuth } from "../../context/Auth";

const AdminDashboard = () => {
  const [auth] = useAuth();

  return (
    <Layout>
      <div className="flex justify-center items-center flex-col gap-10 md:grid-cols-2 md:grid">
        <div className="p-4">
          <h2 className="text-center font-bold mb-4 underline">
            Admin Details
          </h2>
          <h3 className="text-sm font-mono">Admin name: {auth?.user?.name}</h3>
          <h4 className="text-sm font-mono">
            Admin contact: {auth?.user?.phone}
          </h4>
          <h4 className="text-sm font-mono">Admin Role: {auth?.user?.role}</h4>
        </div>
        <div className="p-4">
          <h2 className="text-center font-bold mb-4 underline">
            Admin Actvity
          </h2>
          <AdminMenu />
        </div>
      </div>
    </Layout>
  );
};

export default AdminDashboard;

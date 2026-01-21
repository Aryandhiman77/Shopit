import DashboardHeader from "./Header";
import Layout from "./Layout";
import useAuth from "../../hooks/useAuth";
import { useEffect } from "react";

const Dashboard = () => {
  const { user } = useAuth();
  return (
    <Layout>
      <h1 className="text-2xl font-semibold">Welcome {user.name} 👋</h1>
      <p className="text-gray-500 mt-2">
        Manage your products, orders and analytics here.
      </p>
    </Layout>
  );
};

export default Dashboard;

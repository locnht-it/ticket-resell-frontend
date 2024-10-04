import React from "react";
import DashboardStatsGrid from "./DashboardStatsGrid";
import CustomerProfileChart from "./CustomerProfileChart";
import CustomerNumberChart from "./CustomerNumberChart";
import RecentTransaction from "./RecentTransaction";
import PopularPlatformFee from "./BestSellers";
import BestSellers from "./BestSellers";

const Dashboard = () => {
  return (
    <div className="flex flex-col gap-4">
      <DashboardStatsGrid />
      <div className="flex flex-row gap-4 w-full">
        <CustomerNumberChart />
        <CustomerProfileChart />
      </div>
      <div className="flex flex-row gap-4 w-full">
        <RecentTransaction />
        <BestSellers />
      </div>
    </div>
  );
};

export default Dashboard;

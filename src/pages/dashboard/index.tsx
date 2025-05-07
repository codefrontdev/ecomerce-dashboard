// import { Link } from 'react-router-dom'
import DashboardCard from "../../components/DashboardCard";
import { SiAutodeskrevit } from "react-icons/si";
import Analytics from "../../components/Analytics";
import SalesByCategory from "../../components/SalesByCategory";
import TopSelling from "../../components/TopSelling";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { useEffect } from "react";
import {
  getOverview,
} from "../../features/analyticsSlice";

const Dashboard = () => {
  const dispatch: AppDispatch = useDispatch();
  const  overview  = useSelector(
    (state: RootState) => state.analytics.overview
  );

  console.log("overview", overview);

  useEffect(() => {
    dispatch(getOverview());
  }, []);
  return (
    <div className="flex-1 flex gap-5 flex-col">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <DashboardCard
          title="Today revenue"
          value={`$${overview.revenue.value}`}
          percentage={overview.revenue.percentage}
          data={overview.revenue.chart}
          icon={<SiAutodeskrevit size={10} color="white" />}
        />
        <DashboardCard
          title="Visitors"
          value={`${overview.visitors.value}`}
          percentage={overview.visitors.percentage}
          data={overview.visitors.chart}
          icon={<SiAutodeskrevit size={10} color="white" />}
        />
        <DashboardCard
          title="Transactions"
          value={`${overview.transactions.value}`}
          percentage={overview.transactions.percentage}
          data={overview.transactions.chart}
          icon={<SiAutodeskrevit size={10} color="white" />}
        />
        <DashboardCard
          title="inventory"
          value={`${overview.inventory.value}`}
          percentage={overview.inventory.percentage}
          data={overview.inventory.chart}
          icon={<SiAutodeskrevit size={10} color="white" />}
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white dark:bg-gray-700 p-4 rounded-lg">
          <Analytics
            title="Sales Analytics"
            options={["weekly", "monthly", "yearly"]}
          />
        </div>
        <div className="bg-white dark:bg-gray-700 p-4 rounded-lg">
          <SalesByCategory />
        </div>
      </div>
      <div className="">
        <TopSelling />
        <div className=""></div>
      </div>
    </div>
  );
};

export default Dashboard;

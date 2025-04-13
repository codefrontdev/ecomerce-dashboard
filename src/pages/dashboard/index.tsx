
// import { Link } from 'react-router-dom'
import DashboardCard from '../../components/DashboardCard'
import { SiAutodeskrevit } from 'react-icons/si'
import Analytics from '../../components/Analytics';
import SalesByCategory from '../../components/SalesByCategory';
import TopSelling from '../../components/TopSelling';


// const salesData = [
//   { month: "Jan", sales: 500 },
//   { month: "Feb", sales: 800 },
//   { month: "Mar", sales: 1200 },
//   { month: "Apr", sales: 1500 },
//   { month: "May", sales: 1700 },
//   { month: "Jun", sales: 2100 },
//   { month: "Jul", sales: 2500 },
//   { month: "Aug", sales: 2800 },
//   { month: "Sep", sales: 3000 },
//   { month: "Oct", sales: 3200 },
//   { month: "Nov", sales: 3500 },
//   { month: "Dec", sales: 4000 },
// ];
const Dashboard = () => {
  return (
    <div className='flex-1 flex gap-5 flex-col'>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4'>
        <DashboardCard
          title='Today revenue'
          value={100}
          percentage={20}
          icon={<SiAutodeskrevit size={10} color='white' />}
        />
        <DashboardCard
          title='Visitors'
          value={100}
          percentage={20}
          icon={<SiAutodeskrevit size={10} color='white' />}
        />
        <DashboardCard
          title='Transactions'
          value={100}
          percentage={20}
          icon={<SiAutodeskrevit size={10} color='white' />}
        />
        <DashboardCard
          title='inventory'
          value={100}
          percentage={20}
          icon={<SiAutodeskrevit size={10} color='white' />}
        />
      </div>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
        <div className='bg-white dark:bg-gray-700 p-4 rounded-lg'>
          <Analytics
            title='Sales Analytics'
            options={["weekly", "monthly", "yearly"]}
          />
        </div>
        <div className='bg-white dark:bg-gray-700 p-4 rounded-lg'>
          <SalesByCategory />
        </div>
      </div>
      <div className=''>
        <TopSelling />
        <div className=''></div>
      </div>
    </div>
  );
}

export default Dashboard
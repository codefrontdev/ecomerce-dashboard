import { SiAutodeskrevit } from "react-icons/si";
import DashboardCard from "../../components/DashboardCard";
import Card from "../../components/orders/Card";
import Btn from "../../components/Btn";
import "@schedule-x/theme-default/dist/index.css";



 

const SalesPage = () => {
    // const eventsService = useState(() => createEventsServicePlugin())[0];

    // const calendar = useCalendarApp({
    //   views: [viewDay, viewWeek, viewMonthGrid, viewMonthAgenda],

    //   events: [
    //     {
    //       id: "1",
    //       title: "Event 1",
    //       start: "2023-12-16",
    //       end: "2023-12-16",
    //     },
    //   ],
    //   plugins: [eventsService],
    // });

    // useEffect(() => {
    //   eventsService.getAll();
    // }, []);
 
  return (
    <div className='flex gap-5'>
      <div className='w-[73%] flex flex-col gap-5'>
        <Card>
          <div className=''>
            <div className='flex justify-between items-center'>
              <h2 className='text-2xl font-semibold dark:text-white'>
                Order #M11986
              </h2>
              <Btn
                path='/sales/create-sale'
                className={
                  "bg-orange-400 text-white font-medium text-sm px-6 py-2.5 rounded-md"
                }
                text='Add Sale'
              />
            </div>
          </div>
        </Card>
      </div>

      <div className='flex-1 flex flex-col gap-5'>
        <DashboardCard
          title='Today revenue'
          value={100}
          percentage={20}
          icon={<SiAutodeskrevit size={10} color='white' />}
        />
      </div>
    </div>
  );
}

export default SalesPage
/** @format */

import { EllipsisVertical, Funnel } from "lucide-react";
import Nav from "../../components/Nav";
import Header from "../../components/Header";
import LayoutTable from "../../components/table/LayoutTable";
import Thead from "../../components/table/Thead";
import ReviewTbody from "../../components/table/reviewTbody";

const btnData = [
  {
    text: "Bulk Actions",
    className:
      "bg-gray-50 border text-teal-700 flex items-center gap-2 border-gray-300 font-medium text-sm px-4 py-2.5 rounded-md",
    icon: <EllipsisVertical size={16} />,
  },
  {
    path: "/reviews/create-review",
    text: "Add Review",
    className:
      "bg-orange-400 text-white font-medium text-sm px-6 py-2.5 rounded-md",
  },
];

const dataFilters = [
  {
    id: 1,
    name: "All Reviews",
    items: 34,
  },
  {
    id: 2,
    name: "Rending",
    items: 34,
  },
  {
    id: 3,
    name: "Approved",
    items: 54,
  },
  {
    id: 4,
    name: "Trash",
    items: 65,
  },
];

const btnDataFilter = {
  text: "Filters",
  icon: <Funnel size={20} />,
};

const reviewsData = [
    {
        id: 1,
        type: "Replies",
        product: {
            id: 1,
            name: "Laptop",
            image: "https://via.placeholder.com/150",
            category: "Laptops"
        },
        rating: "4.5",
        review: "Good product",
        author: "John Doe",
        submittedOn: "2023-01-01",
    }
]

const reviewColumns = [
    "checkbox",
  "type",
  " product",
  "rating",
  "review",
  "author",
  "submitted on",
];

const ReviewsPage = () => {
  return (
    <div className='flex flex-col gap-10'>
      {/* <h2 className='font-normal text-base uppercase text-white'>
            order statuses
          </h2> */}

      <div className='flex flex-col bg-white dark:bg-gray-700 gap-5 px-6 py-5 rounded-lg'>
        <Nav dataBtn={btnData} searchPlaceholder='Search Order...' />
        <Header dataBtn={[btnDataFilter]} dataFilters={dataFilters} />
        <LayoutTable>
          <Thead columns={reviewColumns} />
          <ReviewTbody data={reviewsData} />
        </LayoutTable>
      </div>
    </div>
  );
};

export default ReviewsPage;

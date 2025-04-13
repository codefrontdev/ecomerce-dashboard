/** @format */

import { ArrowDownToLine } from "lucide-react";
import Nav from "../../components/Nav";
import Card from "../../components/orders/Card";
import OrderTable from "../../components/orders/OrderTable";
import ClientDetails from "../../components/orders/ClientDetails";
import PaymentDetails from "../../components/orders/PaymentDetails";
import Btn from "../../components/Btn";
import Comment from "../../components/orders/Comment";
import OrderSummary from "../../components/orders/OrderSummary";

const btnData = [
  {
    text: "Manege Invoice",
    className:
      "bg-gray-50 text-teal-700 flex items-center gap-2 border border-gray-300 font-medium text-sm px-4 py-2.5 rounded-md",
    icon: <ArrowDownToLine size={16} />,
  },
  {
    path: "/orders/create-order",
    text: "Add New",
    className:
      "bg-orange-400 text-white font-medium text-sm px-6 py-2.5 rounded-md",
  },
];

const Invoice = () => {
  const paymentDetails = {
    transactions: "#TXN123456",
    paymentMethod: "Credit Card",
    cardHolderName: "John Doe",
    cardNumber: "**** **** **** 1234",
  };
  return (
    <div className="space-y-5">
      <Nav dataBtn={btnData} searchPlaceholder='Search for Product...' />
      <div className='flex gap-5'>
        <div className=' w-[65%]'>
          <div className=''>{/* cards */}</div>
          <div className=''>
            <Card className='!px-0 !py-0'>
              {/* Order Table */}
              <OrderTable />
              <div className='p-5 grid grid-cols-1 md:grid-cols-2 gap-5'>
                <Comment />
                <OrderSummary
                inputWithBtn={false}
                  btn={
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-4">
                      
                      <Btn
                        className={
                          "bg-gray-50 w-full text-teal-700 flex items-center justify-center gap-2 border border-gray-300 font-medium text-sm px-4 py-2 rounded-md"
                        }
                        text='Share'
                      />
                      <Btn
                        className={
                          "bg-orange-400 text-white font-medium text-sm px-6 py-2 rounded-md"
                        }
                        text='Download'
                      />
                    </div>
                  }
                />
              </div>
            </Card>
          </div>
        </div>
        <div className='flex-1 space-y-5'>
          <Card>
            <ClientDetails />
          </Card>
          <Card>
            <PaymentDetails
              className=' border-b last:border-0 p-3 border-gray-300 dark:border-gray-600'
              cardNumber={paymentDetails.cardNumber}
              cardHolderName={paymentDetails.cardHolderName}
            />
          </Card>
          <Card>
            <div className='space-y-3'>
              <h2 className='text-lg font-semibold dark:text-white mb-1'>
                Send Invoice
              </h2>
              {/* <TextAreaField
                placeholder='Thank You For Your Order~ Payment Is Expected Within 31 Day, Please Process This Invoice Within Thant Time'
                rows={3}
              /> */}
              <div className='flex justify-between'>
                <span className='dark:text-white'>
                  Also attach pdf in email
                </span>
                <div className='w-10 h-5 bg-gray-600 rounded-full flex items-center px-px cursor-pointer border border-gray-300 dark:border-gray-400'>
                  <span className='block w-4 h-4 rounded-full bg-gray-300'></span>
                </div>
              </div>
              <Btn
                text='Send Invoice'
                className='bg-orange-400 w-full text-white font-medium text-sm px-6 py-2.5 rounded-md'
              />
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Invoice;

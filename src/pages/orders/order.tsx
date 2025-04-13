import Btn from "../../components/Btn";
import Card from "../../components/orders/Card";
import Comment from "../../components/orders/Comment";
import DesignerBrand from "../../components/orders/DesignerBrand";
import OrderSummary from "../../components/orders/OrderSummary";
import OrderTable from "../../components/orders/OrderTable";
import PaymentDetails from "../../components/orders/PaymentDetails";
import ShoppingInfo from "../../components/orders/ShoppingInfo";
import TrackOrder from "../../components/orders/TrackOrder";


const OrderDetails = () => {
   const paymentDetails = {
     transactions: "#TXN123456",
     paymentMethod: "Credit Card",
     cardHolderName: "John Doe",
     cardNumber: "**** **** **** 1234",
   };
  return (
    <div className='flex gap-5'>
      <div className='w-2/3 flex flex-col gap-5'>
        <Card className='!px-0 !py-0'>
          {/* Order Table */}
          <OrderTable />
        </Card>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
          <Card>
            {/* Comment */}
            <Comment />
          </Card>
          <Card>
            {/* Shopping Info */}
            <ShoppingInfo />
          </Card>
          <Card>
            {/* Designer Brand */}
            <DesignerBrand />
          </Card>
          <Card>
            {/* Payment Details */}
            <PaymentDetails
              cardNumber={paymentDetails.cardNumber}
              cardHolderName={paymentDetails.cardHolderName}
              paymentMethod={paymentDetails.paymentMethod}
              transactions={paymentDetails.transactions}
            />
          </Card>
        </div>
      </div>
      <div className='flex-1 flex flex-col gap-5'>
        <Card>
          {/* Order Summary */}
          <OrderSummary
          inputWithBtn={true}
            title='Order Summary'
            btn={
              <Btn
                className={
                  "absolute top-0.5 right-1 bg-orange-400 text-white font-medium text-sm px-6 py-2 rounded-md"
                }
                text='Apply'
              />
            }
          />
        </Card>
        <Card>
          {/* Track Order */}
          <TrackOrder />
        </Card>
      </div>
    </div>
  );
};

export default OrderDetails;

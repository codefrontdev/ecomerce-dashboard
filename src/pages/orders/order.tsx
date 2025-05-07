import { useDispatch, useSelector } from "react-redux";
import Btn from "../../components/Btn";
import Card from "../../components/orders/Card";
import Comment from "../../components/orders/Comment";
import DesignerBrand from "../../components/orders/DesignerBrand";
import OrderSummary from "../../components/orders/OrderSummary";
import OrderTable from "../../components/orders/OrderTable";
import PaymentDetails from "../../components/orders/PaymentDetails";
import ShoppingInfo from "../../components/orders/ShoppingInfo";
import TrackOrder from "../../components/orders/TrackOrder";
import { useEffect } from "react";
import { AppDispatch, RootState } from "../../redux/store";
import { getOrderById } from "../../features/ordersSlice";
import { useParams } from "react-router-dom";

const OrderDetails = () => {
  const { id } = useParams();
  const dispatch: AppDispatch = useDispatch();
  const order = useSelector((state: RootState) => state.orders.order.data);
  console.log(order);
  useEffect(() => {
    if (id) dispatch(getOrderById(id));
  }, []);
  const paymentDetails = {
    transactions: "#TXN123456",
    paymentMethod: "Credit Card",
    cardHolderName: "John Doe",
    cardNumber: "**** **** **** 1234",
  };

  const shippingCharge = order?.total && order.total > 100 ? 0 : 15; // فرض شحن 15 إذا لم تتجاوز القيمة 100.
  const estimatedTax = order?.total && order.total * 0.05; 
const data = [
  {
    title: "Sub Total",
    value: `$${order?.total}`,
  },
  {
    title: "Discount",
    value: order?.items
      ? `$${order.items
          .filter((item) => item.product)
          .reduce((acc, item) => {
            const price = item.product.price || 0;
            const discount = item.product.discount || 0;
            const qty = item.quantity || 1;
            const discountAmount = price * (discount / 100) * qty;
            return acc + discountAmount;
          }, 0)
          .toFixed(2)}`
      : "$0.00",
  },

  {
    title: "Shipping charge",
    value: `$${shippingCharge}`,
  },
  {
    title: "estimated tax",
    value: `$${estimatedTax}`,
  },
];

  return (
    <div className="flex gap-5">
      <div className="w-2/3 flex flex-col gap-5">
        <Card className="!px-0 !py-0">
          {/* Order Table */}
          <OrderTable
            productItems={order?.items || []}
            title={`Order #${id?.slice(0, 8)}`}
            btn={
              <Btn
                path={`/orders/${id}/invoice`}
                className={
                  "bg-orange-400 text-white font-medium text-sm px-6 py-2.5 rounded-md"
                }
                text="Invoice"
              />
            }
          />
        </Card>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <Card>
            {/* Comment */}
            <Comment />
          </Card>
          <Card>
            {/* Shopping Info */}
            <ShoppingInfo
              userInfo={{
                phone: order?.user?.phone ?? null,
                address: order?.user?.address ?? null,
                email: order?.user?.email ?? "",
                name: order?.user?.name ?? "",
              }}
            />
          </Card>
          <Card>
            {/* Designer Brand */}
            <DesignerBrand />
          </Card>
          <Card>
            {/* Payment Details */}
            <PaymentDetails
              cardNumber={order?.paymentDetails.cardNumber || ""}
              cardHolderName={order?.paymentDetails.cardHolderName || ""}
              paymentMethod={order?.paymentMethod}
              transactions={paymentDetails.transactions}
            />
          </Card>
        </div>
      </div>
      <div className="flex-1 flex flex-col gap-5">
        <Card>
          {/* Order Summary */}
          <OrderSummary
            inputWithBtn={true}
            title="Order Summary"
            data={data}
            btn={
              <Btn
                className={
                  "absolute top-0.5 right-1 bg-orange-400 text-white font-medium text-sm px-6 py-2 rounded-md"
                }
                text="Apply"
              />
            }
          />
        </Card>
        <Card>
          {/* Track Order */}
          {order?.tracking &&
            order.tracking.steps &&
            order.tracking.steps.length > 0 && (
              <TrackOrder tracking={order.tracking} />
            )}
        </Card>
      </div>
    </div>
  );
};

export default OrderDetails;

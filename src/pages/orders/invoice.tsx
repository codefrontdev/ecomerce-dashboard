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
import { useParams } from "react-router-dom";
import { AppDispatch, RootState } from "../../redux/store";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
  createInvoice,
  getInvoiceByOrderId,
  getOrderById,
  sendInvoice,
} from "../../features/ordersSlice";
import { Role } from "../../types/users";
import { formatDate } from "../../utils/functions";
import { format } from "date-fns";
import { z } from "zod";
import { FieldError, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Form from "../../components/Form";
import TextAreaField from "../../components/fields/TextAreaField";
import { toast } from "react-toastify";

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

const invoiceSchema = z.object({
  message: z.string().min(10, "Message is too short"),
  attachPdf: z.boolean(),
});

type InvoiceSchema = z.infer<typeof invoiceSchema>;

const Invoice = () => {
  const { id } = useParams();
  const dispatch: AppDispatch = useDispatch();
  const order = useSelector((state: RootState) => state.orders.order.data);
  
  useEffect(() => {
    if (id) {
      dispatch(getOrderById(id));
    }

    window.scrollTo(0, 0);
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm<InvoiceSchema>({
    resolver: zodResolver(invoiceSchema),
    defaultValues: {
      message: "",
      attachPdf: false,
    },
  });

  const onSubmit = (data: InvoiceSchema) => {
    console.log("Invoice data:", data);
    dispatch(sendInvoice({...data, orderId: id})).then((result) => {
      if (result.meta.requestStatus === "fulfilled") {
        toast.success(result.payload?.message || "", {
          position: "top-right",
          autoClose: 3000,
        });
      }
    });
  };
  console.log(errors);


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
  const paymentDetails = {
    transactions: "#TXN123456",
    paymentMethod: "Credit Card",
    cardHolderName: "John Doe",
    cardNumber: "**** **** **** 1234",
  };

  return (
    <div className="space-y-5">
      <Nav dataBtn={btnData} searchPlaceholder="Search for Product..." />
      <div className="flex gap-5">
        <div className="w-[65%]">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 py-10">
            {/* cards */}
            <div className="p-5 rounded-2xl bg-blue-500 text-white">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="">
                  <h2 className="mb-3 text-xl font-semibold">Invoice Number</h2>
                  <h3>No: #{order?.invoice?.invoiceNumber?.slice(0, 8)}</h3>
                  <h3>
                    Issued Date:{" "}
                    {order?.invoice?.issuedAt &&
                      format(order?.invoice?.issuedAt || "", "MMM dd, yyyy")}
                  </h3>
                  <h3>
                    Due Date:{" "}
                    {order?.invoice?.dueAt &&
                      format(order?.invoice?.dueAt || "", "MMM dd, yyyy")}
                  </h3>
                </div>
                <div className="flex items-center justify-end gap-2">
                  <img
                    src={order?.invoice?.QRCode}
                    alt="QR Code"
                    className="w-32 "
                  />
                </div>
              </div>
            </div>
            <div className="p-5 rounded-2xl bg-orange-400 text-white">
              <h2 className="mb-3 text-xl font-semibold">invoice To</h2>
              <div className="">
                <h3>{order?.user?.firstName + " " + order?.user?.lastName || "No Name"}</h3>
                <h3>{order?.user?.address || "No Address"}</h3>
                <h3>{order?.user?.phone || "No Phone"}</h3>
              </div>
            </div>
          </div>
          <div className="">
            <Card className="!px-0 !py-0">
              {/* Order Table */}
              <OrderTable
                productItems={order?.items || []}
                title="Items Details"
                btn={
                  <Btn
                    path={id ? `/orders/edit-order/${id}` : ""}
                    className="bg-gray-50 border  dark:bg-gray-800 text-teal-700 flex items-center gap-2 border-gray-300 dark:border-gray-600 font-medium text-sm px-4 py-2 rounded-md"
                    text="Edit"
                  />
                }
              />
              <div className="p-5 grid grid-cols-1 md:grid-cols-2 gap-5">
                <Comment />
                <OrderSummary
                  title="Order Summary"
                  data={data}
                  inputWithBtn={false}
                  btn={
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-4">
                      <Btn
                        className="bg-gray-50 w-full text-teal-700 flex items-center justify-center gap-2 border border-gray-300 font-medium text-sm px-4 py-2 rounded-md"
                        text="Share"
                        onClick={() => {
                          if (order?.invoice?.invoicePDF) {
                            const pdfBuffer = order?.invoice?.invoicePDF;
                            const pdfString = pdfBuffer.toString(); // Convert Buffer to string
                            const blob = new Blob(
                              [
                                Uint8Array.from(atob(pdfString), (c) =>
                                  c.charCodeAt(0)
                                ),
                              ],
                              {
                                type: "application/pdf",
                              }
                            );
                            const url = URL.createObjectURL(blob);

                            // انسخ الرابط إلى الحافظة
                            navigator.clipboard.writeText(url);
                            alert("Invoice link copied to clipboard!");
                          } else {
                            alert("No invoice available to share.");
                          }
                        }}
                      />

                      <Btn
                        className={
                          "bg-orange-400 text-white font-medium text-sm px-6 py-2 rounded-md"
                        }
                        onClick={() => {
                          if (!order?.invoice?.invoicePDF) {
                            alert("No invoice PDF available.");
                            return;
                          }
                          const pdfBuffer = order?.invoice?.invoicePDF;
                          const pdfString = pdfBuffer.toString(); // Convert Buffer to string
                          const byteCharacters = atob(pdfString);
                          const byteNumbers = new Array(byteCharacters.length)
                            .fill(null)
                            .map((_, i) => byteCharacters.charCodeAt(i));
                          const byteArray = new Uint8Array(byteNumbers);
                          const blob = new Blob([byteArray], {
                            type: "application/pdf",
                          });

                          // إنشاء رابط وتحميل
                          const link = document.createElement("a");
                          link.href = URL.createObjectURL(blob);
                          link.download = `invoice-${order.invoice.invoiceNumber}.pdf`;
                          link.click();

                          // تحرير الرابط بعد التحميل
                          URL.revokeObjectURL(link.href);
                        }}
                        text="Download"
                      />
                    </div>
                  }
                />
              </div>
            </Card>
          </div>
        </div>
        <div className="flex-1 space-y-5">
          <Card>
            <ClientDetails
              user={
                order?.user ?? {
                  firstName: "",
                  lastName: "",
                  email: "",
                  phone: "",
                  address: "",
                  profilePicture: { url: "", publicId: "" },
                  role: Role.CUSTOMER,
                  
                }
              }
            />
          </Card>
          <Card>
            <PaymentDetails
              className=" border-b last:border-0 p-3 border-gray-300 dark:border-gray-600"
              cardNumber={order?.paymentDetails.cardNumber || ""}
              cardHolderName={order?.paymentDetails.cardHolderName || ""}
              paymentMethod={order?.paymentMethod}
              transactions={paymentDetails.transactions}
            />
          </Card>

          <Form<InvoiceSchema> onSubmit={onSubmit} handleSubmit={handleSubmit}>
            <Card>
              <div className="space-y-3">
                <h2 className="text-lg font-semibold dark:text-white mb-1">
                  Send Invoice
                </h2>
                <TextAreaField
                  name="message"
                  label="Message"
                  register={register}
                  errors={errors.message as FieldError}
                  placeholder="Thank You For Your Order~ Payment Is Expected Within 31 Day, Please Process This Invoice Within Thant Time"
                  rows={3}
                />
                <div className="flex justify-between">
                  <span className="dark:text-white">
                    Also attach pdf in email
                  </span>
                  <div
                    onClick={() => setValue("attachPdf", !watch("attachPdf"))}
                    className="w-10 h-5 bg-gray-600 rounded-full flex items-center px-px cursor-pointer border border-gray-300 dark:border-gray-400"
                  >
                    {" "}
                    <span
                      className={`block w-4 h-4 rounded-full transition-all duration-200 ${
                        watch("attachPdf")
                          ? "translate-x-5 bg-green-400"
                          : "bg-gray-300"
                      }`}
                    ></span>
                  </div>
                </div>
                <Btn
                  type="submit"
                  text="Send Invoice"
                  className="bg-orange-400 w-full text-white font-medium text-sm px-6 py-2.5 rounded-md"
                />
              </div>
            </Card>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Invoice;

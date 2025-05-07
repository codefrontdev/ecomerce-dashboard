// src/pages/orders/AddOrderPage.tsx
import { useForm, useFieldArray, FieldError } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { useNavigate } from "react-router-dom";
import Section from "../../components/fields/Section";
import InputField from "../../components/fields/InputField";
import SelectField from "../../components/fields/SelectField";
import Btn from "../../components/Btn";
import Form from "../../components/Form";
import { createOrder } from "../../features/ordersSlice";
import { useEffect } from "react";
import { getAllUsers } from "../../features/usersSlice";
import { getAllProducts } from "../../features/productSlice";

const orderSchema = z.object({
  status: z.enum([
    "pending",
    "completed",
    "canceled",
    "damaged",
    "returned",
    "aborted",
    "progress",
  ]),

  amount: z.coerce.number().min(0.01, "Amount is required"), // حقل المبلغ
  paymentMethod: z.string().min(1, "Payment method is required"), // حقل طريقة الدفع

    paymentDetails: z.object({
    cardHolderName: z.string().min(1, "Card holder name is required"), // حقل اسم صاحب البطاقة
    cardNumber: z.string().min(16, "Card number must be 16 digits").max(16), // حقل رقم البطاقة
  }),
  userId: z.string().min(1, "User is required"),
  items: z
    .array(
      z.object({
        productId: z.string().min(1, "Product is required"),
        quantity: z.coerce.number().min(1, "Quantity is required"),
        price: z.coerce.number().min(0.01, "Price is required"),
      })
    )
    .min(1, "At least one item is required"),
});

type OrderFormData = z.infer<typeof orderSchema>;

const statusOptions = [
  { label: "Pending", value: "pending" },
  { label: "Completed", value: "completed" },
  { label: "Canceled", value: "canceled" },
  { label: "Damaged", value: "damaged" },
  { label: "Returned", value: "returned" },
  { label: "Aborted", value: "aborted" },
  { label: "In Progress", value: "progress" },
];

export const CreateOrderPage = () => {
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  const users = useSelector((state: RootState) => state.users.users.users);
  const products = useSelector(
    (state: RootState) => state.products.products.products
  );

  const {
    register,
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<OrderFormData>({
    resolver: zodResolver(orderSchema),
    defaultValues: {
      status: "pending",
      items: [{ productId: "", quantity: 1, price: 0 }],
    },
  });

  const { fields, append, remove } = useFieldArray({ control, name: "items" });
  const items = watch("items");

  const total = items
    .reduce((sum, item) => sum + item.quantity * item.price, 0)
    .toFixed(2);

  const onSubmit = (data: OrderFormData) => {
    dispatch(createOrder({ ...data, total: parseFloat(total) }))
      .unwrap()
      .then(() => navigate("/orders"));
  };

  useEffect(() => {
    dispatch(getAllUsers({ query: "" }));
    dispatch(getAllProducts({ query: "" }));
  }, [dispatch]);

  return (
    <Form onSubmit={onSubmit} handleSubmit={handleSubmit}>
      <Section title="Order Details">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <SelectField
            label="User"
            name="userId"
            id="userId"
            defaultValue="Select User"
            register={register}
            options={
              users?.length > 0
                ? users.map((u) => ({ label: u.firstName + " " + u.lastName, value: u.id }))
                : []
            }
            errors={errors.userId as FieldError}
          />
          <SelectField
            label="Status"
            name="status"
            id="status"
            defaultValue="Select Status"
            register={register}
            options={statusOptions}
            errors={errors.status as FieldError}
          />
          {/* إضافة حقل المبلغ */}
          <InputField
            label="Amount"
            type="number"
            placeholder="Enter amount"
            name="amount"
            register={register}
            errors={errors.amount as FieldError}
          />
          {/* إضافة حقل طريقة الدفع */}
          <InputField
            label="Payment Method"
            type="text"
            placeholder="Enter payment method"
            name="paymentMethod"
            register={register}
            errors={errors.paymentMethod as FieldError}
          />
        </div>
      </Section>

      <Section title="Payment Details">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <InputField
            label="Card Holder Name"
            type="text"
            placeholder="Enter card holder name"
            name="paymentDetails.cardHolderName"
            register={register}
            errors={errors.paymentDetails?.cardHolderName as FieldError}
          />
          <InputField
            label="Card Number"
            type="text"
            placeholder="Enter card number"
            name="paymentDetails.cardNumber"
            register={register}
            errors={errors.paymentDetails?.cardNumber as FieldError}
          />
        </div>
      </Section>

      <Section title="Order Items">
        {fields.map((field, index) => (
          <div
            key={field.id}
            className={`grid grid-cols-1 md:grid-cols-4 gap-4 items-${
              errors?.items?.[index]?.productId ? "center" : "end"
            } mb-4`}
          >
            <div className="flex w-full justify-between md:col-span-3">
              <SelectField
                label="Product"
                defaultValue="Select Product"
                name={`items.${index}.productId`}
                id={`items.${index}.productId`}
                register={register}
                options={
                  products.length > 0
                    ? products.map((p) => ({ label: p.name, value: p.id }))
                    : []
                }
                errors={errors.items?.[index]?.productId as FieldError}
              />
              <InputField
                label="Quantity"
                type="number"
                placeholder="Enter quantity"
                name={`items.${index}.quantity`}
                register={register}
                errors={errors.items?.[index]?.quantity as FieldError}
              />
              <InputField
                label="Price"
                type="number"
                name={`items.${index}.price`}
                placeholder="Enter price"
                register={register}
                errors={errors.items?.[index]?.price as FieldError}
              />
            </div>
            <Btn
              type="button"
              onClick={() => remove(index)}
              className="bg-red-500 rounded-lg dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900 dark:text-white p-2.5"
              text="Remove"
            />
          </div>
        ))}
        <Btn
          type="button"
          onClick={() => append({ productId: "", quantity: 1, price: 0 })}
          className="bg-teal-500 rounded-lg dark:bg-teal-600 dark:hover:bg-teal-700 dark:focus:ring-teal-900 dark:text-white h-10"
          text="Add Item"
        />
      </Section>

      <Section title="Summary">
        <p className="font-semibold">Total: ${total}</p>
      </Section>

      <div className="flex items-center justify-end gap-3">
        <Btn
          className="bg-transparent border border-gray-300 text-white font-medium text-sm px-6 py-2.5 rounded-md"
          text="Cancel"
        />
        <Btn
          type="submit"
          className="bg-orange-400 dark:text-white font-medium text-sm px-6 py-2.5 rounded-md"
          text="Submit"
        />
      </div>
    </Form>
  );
};

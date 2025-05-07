import { TrackingRes } from "./tracking";
import { User, UserInfo } from "./users";

export type orderFailedStatus =
  | "returned"
  | "returned"
  | "canceled"
  | "damaged";

export type orderStatus = "pending" | "completed" | "progress";

export type OrderStatusCount = {
  failed: {
    abanded: number;
    returned: number;
    canceled: number;
    damaged: number;
  };
  succeeded: {
    total: number;
    pending: number;
    completed: number;
    progress: number;
  };
};

export type OrderStatusCounts = {
  orderStatusCounts: OrderStatusCount;
};

export type OrderStatus = {
  status: orderStatus | orderFailedStatus;
};

export type OrderItems = {

    product: {
      id: string;
      name: string;
      image: {
        publicId: string;
        url: string;
      };
      discount: number;
      price: number;
    };
    quantity: number;
    price: number;
  
};

export interface Invoice {
  id: string;
  invoiceNumber: string;
  issuedAt: string;
  dueAt: string;
  QRCode: string;
  invoicePDF: Buffer;
}

export interface Order {
  id: string;
  user: UserInfo;
  amount: string;
  paymentMethod: string;
  createdAt: string;
  status: orderStatus;
  items: OrderItems[];
  paymentDetails: {
    cardHolderName: string;
    cardNumber: string;
  };
  total: number;
  tracking: TrackingRes;
  invoice: Invoice | null;
}

export interface OrderState {
  invoice: Invoice | null;
  orders: {
    data: Order[];
    success: boolean;
    message: string;
    total: number;
    page: number;
    totalPages: number;
    pageSize: number;
    orderStatusCounts: OrderStatusCount;
  };
  order: {
    data: Order | null;
    success: boolean;
    message: string;
  };
  loading: boolean;
  error: string | null;
  status: "idle" | "loading" | "succeeded" | "failed";
}

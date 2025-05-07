import apiClient from "./apiClient";

export const ordersService = {
  getOrders: async (query?: string) => {
    const response = await apiClient.get(`/orders${query}`);
    return response.data;
  },
  getOrderById: async (id: string) => {
    const response = await apiClient.get(`/orders/${id}`);
    return response.data;
  },

  createInvoice: async (id: string) => {
    const response = await apiClient.post(`/orders/${id}/invoice`, {orderId: id});
    return response.data;
  },

  sendInvoice: async (data: any) => {
    const response = await apiClient.post(`/orders/${data.id}/invoice/send`, data);
    return response.data;
  },

  getInvoiceByOrderId: async (id: string) => {
    const response = await apiClient.get(`/orders/${id}/invoice`);
    return response.data;
  },
  createOrder: async (order: any) => {
    console.log(order);
    const response = await apiClient.post("/orders", order);
    console.log(response);
    return response.data;
  },

  updateOrder: async (id: string, order: any) => {
    const response = await apiClient.put(`/orders/${id}`, order);
    return response.data;
  },

  deleteOrder: async (id: string) => {
    const response = await apiClient.delete(`/orders/${id}`);
    return response.data;
  },
};

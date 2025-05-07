import { AnalyticsSales } from "../types/analytics";
import apiClient from "./apiClient";


export const analyticsService = {
  getOverview: async () => {
    const res = await apiClient.get("/analytics/overview");
    return res.data;
  },
  getSales: async (period: AnalyticsSales) => {
    const res = await apiClient.get(`/analytics/sales?period=${period}`);
    return res.data;
  },
  getSalesByCategory: async (period: AnalyticsSales) => {
    const res = await apiClient.get(`/analytics/sales-by-category?period=${period}`);
    return res.data;
  },
  getTopSellingProducts: async (sortBy: string) => {
    const res = await apiClient.get(`/analytics/top-selling?sortBy=${sortBy}`);
    return res.data;
  },
};

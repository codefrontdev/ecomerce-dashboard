export interface AnalyticsData {
  totalOrders: number;
  totalUsers: number;
  totalRevenue: number;
  topSellingProducts: {
    id: string;
    name: string;
    totalSold: number;
  }[];
  monthlyRevenue: {
    month: string;
    revenue: number;
  }[];
}

export interface AnalyticsState {
  overview: {
    revenue: {
      value: number;
      percentage: number;
      chart: { name: string; uv: number }[];
    };
    visitors: {
      value: number;
      percentage: number;
      chart: { name: string; uv: number }[];
    };
    transactions: {
      value: number;
      percentage: number;
      chart: { name: string; uv: number }[]; // يمكن ملؤه لاحقًا
    };
    inventory: {
      value: number;
      percentage: number;
      chart: { name: string; uv: number }[]; // يمكن ملؤه لاحقًا
    };
  };

  sales: {
    message: string;
    success: boolean;
    data: {
      period: string;
      sales: { date: string; sales: number }[];
    };
  };
  salesByCategory: {
    message: string;
    success: boolean;
    data: {
      period: string;
      sales: { name: string; value: number; productsCount: number }[];
    };
  };
  topSelling: {
    message: string;
    success: boolean;
    data: any[];
  };
  loading: boolean;
  error: string | null;
}

export enum AnalyticsSales {
  weekly = "weekly",
  monthly = "monthly",
  yearly = "yearly",
}

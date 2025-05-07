export interface Steps {
  status: string;
  description: string;
  date: string; // ISO format
  time: string;
}

export interface TrackingRes {
  id: string;
  trackingNumber: string;
  steps: Steps[];
  createdAt: string;
}

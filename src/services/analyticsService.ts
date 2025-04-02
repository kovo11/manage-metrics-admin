
import { apiClient } from "./apiClient";

export const getMetrics = async () => {
  const response = await apiClient.get('/api/metrics');
  return response.data;
};

export const getMetricByNameAndDate = async (metricName: string, metricDate: string) => {
  const response = await apiClient.get(`/api/metric/${metricName}/${metricDate}`);
  return response.data;
};

export const createMetric = async (metricData: any) => {
  const response = await apiClient.post('/api/create-metric', metricData);
  return response.data;
};


import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { getMetrics } from "@/services/adminService";
import { 
  BarChart, 
  Bar, 
  LineChart, 
  Line, 
  PieChart, 
  Pie, 
  Cell,
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer 
} from 'recharts';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface Metric {
  id: string;
  name: string;
  value: number;
  date: string;
}

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const AnalyticsPage = () => {
  const [metrics, setMetrics] = useState<Metric[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [salesData, setSalesData] = useState<any[]>([]);
  const [usersData, setUsersData] = useState<any[]>([]);
  const [ordersData, setOrdersData] = useState<any[]>([]);

  useEffect(() => {
    const fetchMetrics = async () => {
      try {
        const response = await getMetrics();
        setMetrics(response.metrics);
        
        // Process metrics
        const salesMetrics = response.metrics.filter((metric: Metric) => metric.name === "sales");
        const usersMetrics = response.metrics.filter((metric: Metric) => metric.name === "users");
        const ordersMetrics = response.metrics.filter((metric: Metric) => metric.name === "orders");
        
        // Format data for charts
        const formatData = (metrics: Metric[]) => metrics.map((metric) => ({
          date: new Date(metric.date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
          value: metric.value
        }));
        
        setSalesData(formatData(salesMetrics));
        setUsersData(formatData(usersMetrics));
        setOrdersData(formatData(ordersMetrics));
        
      } catch (error) {
        console.error("Error fetching metrics:", error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchMetrics();
  }, []);

  // Prepare distribution data for pie chart
  const distributionData = [
    { name: "Sales", value: salesData.reduce((sum, item) => sum + item.value, 0) },
    { name: "Users", value: usersData.reduce((sum, item) => sum + item.value, 0) },
    { name: "Orders", value: ordersData.reduce((sum, item) => sum + item.value, 0) }
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Analytics</h1>
        <p className="text-muted-foreground">
          Visualize and analyze your business metrics
        </p>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="sales">Sales</TabsTrigger>
          <TabsTrigger value="users">Users</TabsTrigger>
          <TabsTrigger value="orders">Orders</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview">
          <div className="grid gap-6 grid-cols-1 md:grid-cols-2">
            <Card className="glass-card md:col-span-2">
              <CardHeader>
                <CardTitle>Overview</CardTitle>
                <CardDescription>
                  Summary of all metrics over time
                </CardDescription>
              </CardHeader>
              <CardContent className="h-80">
                {isLoading ? (
                  <div className="flex h-full items-center justify-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                  </div>
                ) : (
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={[...salesData, ...usersData, ...ordersData].sort((a, b) => 
                        new Date(a.date).getTime() - new Date(b.date).getTime()
                      )}
                      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line 
                        type="monotone" 
                        dataKey="value" 
                        name="All Metrics" 
                        stroke="#3B82F6" 
                        strokeWidth={2}
                        dot={{ r: 4 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                )}
              </CardContent>
            </Card>
            
            <Card className="glass-card">
              <CardHeader>
                <CardTitle>Metric Distribution</CardTitle>
              </CardHeader>
              <CardContent className="h-72">
                {isLoading ? (
                  <div className="flex h-full items-center justify-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                  </div>
                ) : (
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={distributionData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      >
                        {distributionData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                )}
              </CardContent>
            </Card>
            
            <Card className="glass-card">
              <CardHeader>
                <CardTitle>Metrics Comparison</CardTitle>
              </CardHeader>
              <CardContent className="h-72">
                {isLoading ? (
                  <div className="flex h-full items-center justify-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                  </div>
                ) : (
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={[
                        { 
                          name: "Q1", 
                          Sales: salesData[0]?.value || 0, 
                          Users: usersData[0]?.value || 0, 
                          Orders: ordersData[0]?.value || 0
                        },
                        { 
                          name: "Q2", 
                          Sales: salesData[1]?.value || 0, 
                          Users: usersData[1]?.value || 0, 
                          Orders: ordersData[1]?.value || 0
                        },
                      ]}
                      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="Sales" fill="#0088FE" />
                      <Bar dataKey="Users" fill="#00C49F" />
                      <Bar dataKey="Orders" fill="#FFBB28" />
                    </BarChart>
                  </ResponsiveContainer>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="sales">
          <Card className="glass-card">
            <CardHeader>
              <CardTitle>Sales Analytics</CardTitle>
              <CardDescription>
                Track sales performance over time
              </CardDescription>
            </CardHeader>
            <CardContent className="h-96">
              {isLoading ? (
                <div className="flex h-full items-center justify-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                </div>
              ) : (
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={salesData}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line 
                      type="monotone" 
                      dataKey="value" 
                      name="Sales" 
                      stroke="#0088FE" 
                      strokeWidth={2}
                      dot={{ r: 4 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="users">
          <Card className="glass-card">
            <CardHeader>
              <CardTitle>User Growth</CardTitle>
              <CardDescription>
                Track user acquisition over time
              </CardDescription>
            </CardHeader>
            <CardContent className="h-96">
              {isLoading ? (
                <div className="flex h-full items-center justify-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                </div>
              ) : (
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={usersData}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="value" name="Users" fill="#00C49F" />
                  </BarChart>
                </ResponsiveContainer>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="orders">
          <Card className="glass-card">
            <CardHeader>
              <CardTitle>Order Metrics</CardTitle>
              <CardDescription>
                Track order volume over time
              </CardDescription>
            </CardHeader>
            <CardContent className="h-96">
              {isLoading ? (
                <div className="flex h-full items-center justify-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                </div>
              ) : (
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={ordersData}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="value" name="Orders" fill="#FFBB28" />
                  </BarChart>
                </ResponsiveContainer>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AnalyticsPage;

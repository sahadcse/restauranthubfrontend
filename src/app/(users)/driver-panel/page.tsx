// 'use client';

// import React, { useState, useEffect } from 'react';
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
// import { Button } from '@/components/ui/button';
// import { Badge } from '@/components/ui/badge';
// import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
// import {
//     Truck,
//     Clock,
//     DollarSign,
//     MapPin,
//     CheckCircle,
//     XCircle,
//     AlertCircle,
//     Package,
//     Navigation
// } from 'lucide-react';

// interface Order {
//     id: string;
//     customerName: string;
//     restaurantName: string;
//     address: string;
//     orderTotal: number;
//     status: 'pending' | 'accepted' | 'picked_up' | 'delivered' | 'cancelled';
//     estimatedTime: string;
//     distance: string;
// }

// interface DriverStats {
//     totalDeliveries: number;
//     todayEarnings: number;
//     completionRate: number;
//     averageRating: number;
// }

// export default function DriverPanelPage() {
//     const [activeOrders, setActiveOrders] = useState<Order[]>([]);
//     // const [orderHistory, setOrderHistory] = useState<Order[]>([]);
//     const [stats, setStats] = useState<DriverStats>({
//         totalDeliveries: 0,
//         todayEarnings: 0,
//         completionRate: 0,
//         averageRating: 0
//     });
//     const [isOnline, setIsOnline] = useState(false);

//     // Mock data - replace with actual API calls
//     useEffect(() => {
//         setActiveOrders([
//             {
//                 id: '1',
//                 customerName: 'John Doe',
//                 restaurantName: 'Pizza Palace',
//                 address: '123 Main St, City',
//                 orderTotal: 25.99,
//                 status: 'pending',
//                 estimatedTime: '15 min',
//                 distance: '2.3 km'
//             },
//             {
//                 id: '2',
//                 customerName: 'Jane Smith',
//                 restaurantName: 'Burger Barn',
//                 address: '456 Oak Ave, City',
//                 orderTotal: 18.50,
//                 status: 'accepted',
//                 estimatedTime: '8 min',
//                 distance: '1.1 km'
//             }
//         ]);

//         setStats({
//             totalDeliveries: 127,
//             todayEarnings: 156.75,
//             completionRate: 96,
//             averageRating: 4.8
//         });
//     }, []);

//     const handleOrderAction = (orderId: string, action: string) => {
//         setActiveOrders(prev =>
//             prev.map(order => {
//                 if (order.id === orderId) {
//                     let newStatus: Order['status'];
//                     switch (action) {
//                         case 'accept':
//                             newStatus = 'accepted';
//                             break;
//                         case 'pickup':
//                             newStatus = 'picked_up';
//                             break;
//                         case 'deliver':
//                             newStatus = 'delivered';
//                             break;
//                         case 'cancel':
//                             newStatus = 'cancelled';
//                             break;
//                         default:
//                             newStatus = order.status;
//                     }
//                     return { ...order, status: newStatus };
//                 }
//                 return order;
//             })
//         );
//     };

//     const getStatusColor = (status: Order['status']) => {
//         switch (status) {
//             case 'pending': return 'bg-yellow-500';
//             case 'accepted': return 'bg-blue-500';
//             case 'picked_up': return 'bg-purple-500';
//             case 'delivered': return 'bg-green-500';
//             case 'cancelled': return 'bg-red-500';
//             default: return 'bg-gray-500';
//         }
//     };

//     const getActionButton = (order: Order) => {
//         switch (order.status) {
//             case 'pending':
//                 return (
//                     <div className="flex gap-2">
//                         <Button
//                             size="sm"
//                             onClick={() => handleOrderAction(order.id, 'accept')}
//                             className="bg-green-600 hover:bg-green-700"
//                         >
//                             Accept
//                         </Button>
//                         <Button
//                             size="sm"
//                             variant="outline"
//                             onClick={() => handleOrderAction(order.id, 'cancel')}
//                         >
//                             Decline
//                         </Button>
//                     </div>
//                 );
//             case 'accepted':
//                 return (
//                     <Button
//                         size="sm"
//                         onClick={() => handleOrderAction(order.id, 'pickup')}
//                         className="bg-blue-600 hover:bg-blue-700"
//                     >
//                         Mark Picked Up
//                     </Button>
//                 );
//             case 'picked_up':
//                 return (
//                     <Button
//                         size="sm"
//                         onClick={() => handleOrderAction(order.id, 'deliver')}
//                         className="bg-purple-600 hover:bg-purple-700"
//                     >
//                         Mark Delivered
//                     </Button>
//                 );
//             default:
//                 return null;
//         }
//     };

//     return (
//         <div className="container mx-auto p-6 space-y-6">
//             {/* Header */}
//             <div className="flex justify-between items-center">
//                 <div>
//                     <h1 className="text-3xl font-bold">Driver Dashboard</h1>
//                     <p className="text-muted-foreground">Manage your deliveries and track earnings</p>
//                 </div>
//                 <div className="flex items-center gap-4">
//                     <div className="flex items-center gap-2">
//                         <div className={`w-3 h-3 rounded-full ${isOnline ? 'bg-green-500' : 'bg-red-500'}`} />
//                         <span className="text-sm font-medium">
//                             {isOnline ? 'Online' : 'Offline'}
//                         </span>
//                     </div>
//                     <Button
//                         onClick={() => setIsOnline(!isOnline)}
//                         variant={isOnline ? 'destructive' : 'default'}
//                     >
//                         {isOnline ? 'Go Offline' : 'Go Online'}
//                     </Button>
//                 </div>
//             </div>

//             {/* Stats Cards */}
//             <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
//                 <Card>
//                     <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//                         <CardTitle className="text-sm font-medium">Today&apos;s Earnings</CardTitle>
//                         <DollarSign className="h-4 w-4 text-muted-foreground" />
//                     </CardHeader>
//                     <CardContent>
//                         <div className="text-2xl font-bold">${stats.todayEarnings}</div>
//                     </CardContent>
//                 </Card>

//                 <Card>
//                     <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//                         <CardTitle className="text-sm font-medium">Total Deliveries</CardTitle>
//                         <Package className="h-4 w-4 text-muted-foreground" />
//                     </CardHeader>
//                     <CardContent>
//                         <div className="text-2xl font-bold">{stats.totalDeliveries}</div>
//                     </CardContent>
//                 </Card>

//                 <Card>
//                     <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//                         <CardTitle className="text-sm font-medium">Completion Rate</CardTitle>
//                         <CheckCircle className="h-4 w-4 text-muted-foreground" />
//                     </CardHeader>
//                     <CardContent>
//                         <div className="text-2xl font-bold">{stats.completionRate}%</div>
//                     </CardContent>
//                 </Card>

//                 <Card>
//                     <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//                         <CardTitle className="text-sm font-medium">Average Rating</CardTitle>
//                         <Truck className="h-4 w-4 text-muted-foreground" />
//                     </CardHeader>
//                     <CardContent>
//                         <div className="text-2xl font-bold">{stats.averageRating}/5</div>
//                     </CardContent>
//                 </Card>
//             </div>

//             {/* Main Content */}
//             <Tabs defaultValue="active" className="space-y-4">
//                 <TabsList>
//                     <TabsTrigger value="active">Active Orders</TabsTrigger>
//                     <TabsTrigger value="history">Order History</TabsTrigger>
//                 </TabsList>

//                 <TabsContent value="active" className="space-y-4">
//                     <Card>
//                         <CardHeader>
//                             <CardTitle>Active Deliveries</CardTitle>
//                             <CardDescription>
//                                 Manage your current delivery orders
//                             </CardDescription>
//                         </CardHeader>
//                         <CardContent>
//                             {activeOrders.length === 0 ? (
//                                 <div className="text-center py-8">
//                                     <AlertCircle className="mx-auto h-12 w-12 text-muted-foreground" />
//                                     <h3 className="mt-2 text-sm font-semibold">No active orders</h3>
//                                     <p className="mt-1 text-sm text-muted-foreground">
//                                         {isOnline ? 'Waiting for new orders...' : 'Go online to receive orders'}
//                                     </p>
//                                 </div>
//                             ) : (
//                                 <div className="space-y-4">
//                                     {activeOrders.map((order) => (
//                                         <Card key={order.id} className="border-l-4 border-l-blue-500">
//                                             <CardContent className="pt-6">
//                                                 <div className="flex justify-between items-start">
//                                                     <div className="space-y-2">
//                                                         <div className="flex items-center gap-2">
//                                                             <h3 className="font-semibold">{order.customerName}</h3>
//                                                             <Badge className={`${getStatusColor(order.status)} text-white`}>
//                                                                 {order.status.replace('_', ' ').toUpperCase()}
//                                                             </Badge>
//                                                         </div>
//                                                         <p className="text-sm text-muted-foreground">
//                                                             From: {order.restaurantName}
//                                                         </p>
//                                                         <div className="flex items-center gap-4 text-sm">
//                                                             <div className="flex items-center gap-1">
//                                                                 <MapPin className="h-4 w-4" />
//                                                                 {order.address}
//                                                             </div>
//                                                             <div className="flex items-center gap-1">
//                                                                 <Clock className="h-4 w-4" />
//                                                                 {order.estimatedTime}
//                                                             </div>
//                                                             <div className="flex items-center gap-1">
//                                                                 <Navigation className="h-4 w-4" />
//                                                                 {order.distance}
//                                                             </div>
//                                                         </div>
//                                                         <p className="font-semibold text-lg">
//                                                             ${order.orderTotal.toFixed(2)}
//                                                         </p>
//                                                     </div>
//                                                     <div className="flex flex-col gap-2">
//                                                         {getActionButton(order)}
//                                                         <Button size="sm" variant="outline">
//                                                             <MapPin className="h-4 w-4 mr-1" />
//                                                             Navigate
//                                                         </Button>
//                                                     </div>
//                                                 </div>
//                                             </CardContent>
//                                         </Card>
//                                     ))}
//                                 </div>
//                             )}
//                         </CardContent>
//                     </Card>
//                 </TabsContent>

//                 <TabsContent value="history">
//                     <Card>
//                         <CardHeader>
//                             <CardTitle>Delivery History</CardTitle>
//                             <CardDescription>
//                                 View your completed deliveries
//                             </CardDescription>
//                         </CardHeader>
//                         <CardContent>
//                             <div className="text-center py-8">
//                                 <Package className="mx-auto h-12 w-12 text-muted-foreground" />
//                                 <h3 className="mt-2 text-sm font-semibold">No delivery history</h3>
//                                 <p className="mt-1 text-sm text-muted-foreground">
//                                     Your completed deliveries will appear here
//                                 </p>
//                             </div>
//                         </CardContent>
//                     </Card>
//                 </TabsContent>
//             </Tabs>
//         </div>
//     );
// }

export default function DriverPanelPage() {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">Driver Dashboard</h1>
      <p className="text-gray-600 mb-6">
        Manage your deliveries and track earnings
      </p>
      {/* Additional content can be added here */}
    </div>
  );
}

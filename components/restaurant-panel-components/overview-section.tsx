"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Clock, Package, CheckCircle, CircleX, TrendingUp } from "lucide-react"

type OrderStatus = "pending" | "in-progress" | "completed" | "cancelled"

interface Order {
  id: string
  items: string[]
  customerName: string
  totalPrice: number
  time: string
  status: OrderStatus
}

interface MenuItem {
  id: string
  name: string
  category: string
  price: number
  available: boolean
  image: string
}

interface OverviewSectionProps {
  orders: Order[]
  menuItems: MenuItem[]
}

export function OverviewSection({ orders, menuItems }: OverviewSectionProps) {
  const getOrdersByStatus = (status: OrderStatus) => {
    return orders.filter((order) => order.status === status)
  }

  const orderStats = [
    {
      title: "Pending Orders",
      status: "pending",
      icon: Clock,
      iconWrapper: "bg-orange-100 p-2 rounded-full",
      iconColor: "text-orange-600",
    },
    {
      title: "In Progress",
      status: "in-progress",
      icon: Package,
      iconWrapper: "bg-amber-100 p-2 rounded-full",
      iconColor: "text-amber-600",
    },
    {
      title: "Completed",
      status: "completed",
      icon: CheckCircle,
      iconWrapper: "bg-green-100 p-2 rounded-full",
      iconColor: "text-green-600",
    },
    {
      title: "Cancelled",
      status: "cancelled",
      icon: CircleX,
      iconWrapper: "bg-orange-100 p-2 rounded-full",
      iconColor: "text-orange-600",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {orderStats.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <Card key={index} className="border-primary/50 bg-white">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-foreground">
                {stat.title}
              </CardTitle>
              <div className={stat.iconWrapper}>
                <Icon className={`h-4 w-4 ${stat.iconColor}`} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">
                {getOrdersByStatus(stat.status).length}
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="border-primary/50 bg-white">
          <CardHeader>
            <CardTitle className="text-foreground">Today's Earnings</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold  text-primary mb-2">$342.50</div>
            <div className="text-sm text-green-600 flex items-center">
              <TrendingUp className="h-4 w-4 mr-1" />
              +12% from yesterday
            </div>
          </CardContent>
        </Card>

        <Card className="border-primary/50 bg-white">
          <CardHeader>
            <CardTitle className="text-foreground">Weekly Earnings</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-primary mb-2">$1,250.00</div>
            <div className="text-sm text-green-600 flex items-center">
              <TrendingUp className="h-4 w-4 mr-1" />
              +8% from last week
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="border-primary/50 bg-white">
        <CardHeader>
          <CardTitle className="text-primary">Top Selling Dishes</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {menuItems.slice(0, 3).map((item, index) => (
              <div key={item.id} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="bg-orange-100 text-orange-700 rounded-full w-6 h-6 flex items-center justify-center text-sm font-medium">
                    {index + 1}
                  </div>
                  <span className="font-medium text-orange-700">{item.name}</span>
                </div>
                <span className="text-orange-600 font-medium">${item.price}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

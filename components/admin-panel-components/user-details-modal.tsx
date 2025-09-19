"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  MapPin,
  Phone,
  Mail,
  Calendar,
  ShoppingBag,
  DollarSign,
  Star,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Store,
  Clock,
} from "lucide-react"

interface UserDetails {
  id: string
  name: string
  email: string
  phone: string
  address: string
  status: string
  joinDate: string
  lastOrder: string
  totalOrders: number
  totalSpent: number
  averageOrder: number
  favoriteRestaurant: string
  avatar: string
}

interface UserDetailsModalProps {
  user: UserDetails
  isOpen: boolean
  onClose: () => void
}

const recentOrders = [
  {
    id: "ORD-001",
    restaurant: "Udupi Kitchen",
    items: ["Jollof Rice", "Egusi Soup"],
    amount: 31.0,
    status: "delivered",
    date: "2024-01-14",
    time: "14:30",
  },
  {
    id: "ORD-002",
    restaurant: "African Delights",
    items: ["Pepper Soup", "Plantain"],
    amount: 24.5,
    status: "delivered",
    date: "2024-01-12",
    time: "19:15",
  },
  {
    id: "ORD-003",
    restaurant: "Spice Garden",
    items: ["Curry Rice"],
    amount: 18.75,
    status: "delivered",
    date: "2024-01-10",
    time: "13:20",
  },
  {
    id: "ORD-004",
    restaurant: "Curry House",
    items: ["Biryani", "Samosa"],
    amount: 42.2,
    status: "delivered",
    date: "2024-01-08",
    time: "20:45",
  },
  {
    id: "ORD-005",
    restaurant: "Jollof Palace",
    items: ["Jollof Rice", "Grilled Chicken"],
    amount: 28.9,
    status: "cancelled",
    date: "2024-01-06",
    time: "18:30",
  },
]

export function UserDetailsModal({ user, isOpen, onClose }: UserDetailsModalProps) {
  const [currentStatus, setCurrentStatus] = useState(user.status)

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "active":
        return <CheckCircle className="w-5 h-5 text-green-600" />
      case "inactive":
        return <XCircle className="w-5 h-5 text-amber-600" />
      case "banned":
        return <AlertTriangle className="w-5 h-5 text-red-600" />
      default:
        return <Clock className="w-5 h-5 text-gray-600" />
    }
  }

  const getOrderStatusBadge = (status: string) => {
    switch (status) {
      case "delivered":
        return <Badge className="bg-green-100 text-green-800">Delivered</Badge>
      case "cancelled":
        return <Badge className="bg-red-100 text-red-800">Cancelled</Badge>
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  const handleStatusUpdate = (newStatus: string) => {
    setCurrentStatus(newStatus)
    console.log(`Updating user ${user.id} status to ${newStatus}`)
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-h-[90vh] bg-background overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl  text-primary flex items-center">
            <Avatar className="h-8 w-8 mr-3">
              <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
              <AvatarFallback className="bg-primary text-white ">
                {user.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            {user.name}
          </DialogTitle>
          <DialogDescription className="text-foreground/80">
            Complete user profile and activity information
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="profile" className="mt-6">
          <TabsList className="grid w-full grid-cols-4 bg-primary ">
            <TabsTrigger
              value="profile"
              className="data-[state=active]:bg-white data-[state=active]:text-foreground text-white rounded-lg"
            >
              Profile
            </TabsTrigger>
            <TabsTrigger
              value="orders"
              className="data-[state=active]:bg-white data-[state=active]:text-foreground text-white rounded-lg"
            >
              Order History
            </TabsTrigger>
            <TabsTrigger
              value="analytics"
              className="data-[state=active]:bg-white data-[state=active]:text-foreground text-white rounded-lg"
            >
              Analytics
            </TabsTrigger>
            <TabsTrigger
              value="settings"
              className="data-[state=active]:bg-white data-[state=active]:text-foreground text-white rounded-lg"
            >
              Settings
            </TabsTrigger>
          </TabsList>

          <TabsContent value="profile" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Personal Information */}
              <Card className="border border-primary/50 bg-white">
                <CardHeader>
                  <CardTitle className="flex items-center text-primary">
                    <Avatar className="w-5 h-5 mr-2">
                      <AvatarImage src="/user-icon.svg" alt="User" />
                      <AvatarFallback className="bg-primary text-white">UI</AvatarFallback>
                    </Avatar>
                    Personal Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <Avatar className="h-16 w-16">
                      <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
                      <AvatarFallback className="bg-primary text-white text-lg">
                        {user.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="text-lg font-bold text-primary">{user.name}</h3>
                      <p className="text-sm text-foreground/80">{user.id}</p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <Mail className="w-5 h-5 text-primary" />
                      <span className="text-sm text-foreground/80">{user.email}</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Phone className="w-5 h-5 text-primary" />
                      <span className="text-sm text-foreground/80">{user.phone}</span>
                    </div>
                    <div className="flex items-start space-x-3">
                      <MapPin className="w-5 h-5 text-primary mt-0.5" />
                      <span className="text-sm text-foreground/80">{user.address}</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Calendar className="w-5 h-5 text-primary" />
                      <span className="text-sm text-foreground/80">Joined {user.joinDate}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Account Statistics */}
              <Card className="border border-primary/50 bg-white">
                <CardHeader>
                  <CardTitle className="flex gap-2 items-center text-primary">
                    <div className="bg-primary w-10 h-10 flex justify-center items-center rounded-full">
                    <ShoppingBag className="w-5 h-5  text-white" />
                    </div>
                    Account Statistics
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-4 border border-primary/50 rounded-lg">
                      <div className="text-2xl font-bold text-primary">{user.totalOrders}</div>
                      <div className="text-sm text-foreground">Total Orders</div>
                    </div>
                    <div className="text-center p-4 border border-primary/50 rounded-lg">
                      <div className="text-2xl font-bold text-primary">£{user.totalSpent.toFixed(2)}</div>
                      <div className="text-sm text-foreground">Total Spent</div>
                    </div>
                    <div className="text-center p-4 border border-primary/50 rounded-lg">
                      <div className="text-2xl font-bold text-primary">£{user.averageOrder.toFixed(2)}</div>
                      <div className="text-sm text-foreground">Avg Order</div>
                    </div>
                    <div className="text-center p-4 border border-primary/50 rounded-lg">
                      <div className="text-2xl font-bold text-primary">4.8</div>
                      <div className="text-sm text-foreground">Avg Rating</div>
                    </div>
                  </div>

                  <Separator className="bg-primary/50" />

                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-foreground">Last Order:</span>
                      <span className="font-medium text-primary">{user.lastOrder}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-foreground">Favorite Restaurant:</span>
                      <span className="font-medium text-primary">{user.favoriteRestaurant}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-foreground">Account Status:</span>
                      <Badge
                        className={
                          user.status === "active"
                            ? "bg-green-100 text-green-800"
                            : user.status === "inactive"
                              ? "bg-amber-100 text-amber-800"
                              : "bg-red-100 text-red-800"
                        }
                      >
                        {user.status}
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="orders" className="space-y-6">
            <Card className="border border-primary/50 bg-white">
              <CardHeader>
                <CardTitle className="text-primary">Recent Orders</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentOrders.map((order) => (
                    <div key={order.id} className="flex items-center justify-between p-4 border border-primary/50 rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center">
                          <Store className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <p className="font-medium text-primary">{order.id}</p>
                          <p className="text-sm text-primary/80">{order.restaurant}</p>
                          <p className="text-xs text-secondary">{order.items.join(", ")}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-foreground">£{order.amount.toFixed(2)}</p>
                        <p className="text-xs text-secondary">
                          {order.date} at {order.time}
                        </p>
                        {getOrderStatusBadge(order.status)}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="border border-primary/50 bg-white">
                <CardContent className="p-6">
                  <div className="flex items-center gap-2 justify-between">
                    <div>
                      <p className="text-sm text-foreground">This Month Orders</p>
                      <p className="text-2xl font-bold text-primary">12</p>
                    </div>
                    <ShoppingBag className="w-8 h-8 text-primary" />
                  </div>
                </CardContent>
              </Card>
              <Card className="border border-primary/50 bg-white">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-foreground">This Month Spent</p>
                      <p className="text-2xl font-bold text-primary">£324</p>
                    </div>
                    <DollarSign className="w-8 h-8 text-primary" />
                  </div>
                </CardContent>
              </Card>
              <Card className="border border-primary/50 bg-white">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-primary">Customer Rating</p>
                      <p className="text-2xl font-bold text-primary">4.8</p>
                    </div>
                    <Star className="w-8 h-8 text-primary" />
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="settings" className="space-y-6">
            <Card className=" border border-primary/50 bg-white">
              <CardHeader>
                <CardTitle className="flex items-center text-primary">
                  {getStatusIcon(currentStatus)}
                  <span className="ml-2 text-primary">Account Status</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-4">
                  <Select value={currentStatus} onValueChange={handleStatusUpdate}>
                    <SelectTrigger className="w-48 border border-primary/50">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-white border border-primary/50">
                      <SelectItem value="active" className="text-foreground">Active</SelectItem>
                      <SelectItem value="inactive" className="text-foreground">Inactive</SelectItem>
                      <SelectItem value="banned" className="text-foreground">Banned</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button className="bg-secondary hover:bg-secondary/50 cursor-pointer text-white">Update Status</Button>
                </div>
              </CardContent>
            </Card>

            <Card className="border border-primary/50 bg-white">
              <CardHeader>
                <CardTitle className="text-primary">Account Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button
                  variant="outline"
                  className="w-full border border-primary/50 text-foreground hover:bg-primary hover:text-white bg-transparent"
                >
                  Send Password Reset Email
                </Button>
                <Button
                  variant="outline"
                  className="w-full border border-primary/50 text-foreground hover:bg-primary hover:text-white bg-transparent"
                >
                  Send Welcome Email
                </Button>
                <Button
                  variant="outline"
                  className="w-full border border-primary/50 text-foreground hover:bg-primary hover:text-white bg-transparent"
                >
                  Generate Account Report
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Action Buttons */}
        <div className="flex justify-end space-x-3 pt-4 border-t border-orange-200">
          <Button
            variant="outline"
            onClick={onClose}
            className="border border-secondary hover:bg-secondary bg-transparent"
          >
            Close
          </Button>
          <Button className="bg-secondary hover:bg-secondary/80 text-white">Edit User</Button>
          <Button variant="outline" className="bg-secondary hover:bg-secondary/80 text-white">
            Send Message
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Store,
  MapPin,
  Phone,
  Mail,
  Star,
  Clock,
  DollarSign,
  ShoppingBag,
  Percent,
  CheckCircle,
  XCircle,
  AlertCircle,
} from "lucide-react"

interface Restaurant {
  id: string
  name: string
  cuisine: string
  address: string
  phone: string
  email: string
  status: string
  rating: number
  totalOrders: number
  revenue: number
  joinDate: string
  deliveryTime: string
  commission: number
  image: string
  description: string
  openingHours: string
  minimumOrder: number
}

interface RestaurantDetailsModalProps {
  restaurant: Restaurant
  isOpen: boolean
  onClose: () => void
}

export function RestaurantDetailsModal({ restaurant, isOpen, onClose }: RestaurantDetailsModalProps) {
  const [currentStatus, setCurrentStatus] = useState(restaurant.status)

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "active":
        return <CheckCircle className="w-5 h-5 text-green-600" />
      case "pending":
        return <AlertCircle className="w-5 h-5 text-amber-600" />
      case "inactive":
        return <XCircle className="w-5 h-5 text-red-600" />
      default:
        return <Clock className="w-5 h-5 text-gray-600" />
    }
  }

  const handleStatusUpdate = (newStatus: string) => {
    setCurrentStatus(newStatus)
    console.log(`Updating restaurant ${restaurant.id} status to ${newStatus}`)
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl text-orange-800">{restaurant.name}</DialogTitle>
          <DialogDescription className="text-amber-600">
            Complete restaurant information and management
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="details" className="mt-6">
          <TabsList className="grid w-full grid-cols-4 bg-primary rounded-xl">
            <TabsTrigger
              value="details"
              className="data-[state=active]:bg-white data-[state=active]:text-foreground text-white  rounded-lg"
            >
              Details
            </TabsTrigger>
            <TabsTrigger
              value="performance"
              className="data-[state=active]:bg-white data-[state=active]:text-foreground  text-white rounded-lg"
            >
              Performance
            </TabsTrigger>
            <TabsTrigger
              value="orders"
              className="data-[state=active]:bg-white data-[state=active]:text-foreground  text-white rounded-lg"
            >
              Recent Orders
            </TabsTrigger>
            <TabsTrigger
              value="settings"
              className="data-[state=active]:bg-white data-[state=active]:text-foreground  text-white rounded-lg"
            >
              Settings
            </TabsTrigger>
          </TabsList>

          <TabsContent value="details" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Basic Information */}
              <Card className="border border-primary/50 bg-white">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3 text-priamry">
                    <div className="bg-primary flex justify-center items-center rounded-full w-10 h-10">
                    <Store className="w-5 h-5 text-white" />
                    </div>
                    Basic Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <img
                      src={restaurant.image || "/placeholder.svg"}
                      alt={restaurant.name}
                      className="w-16 h-16 rounded-full object-cover"
                    />
                    <div>
                      <h3 className="text-lg font-bold text-primary">{restaurant.name}</h3>
                      <Badge variant="outline" className="border border-primary/50 text-foreground">
                        {restaurant.cuisine}
                      </Badge>
                    </div>
                  </div>

                  <p className="text-foreground">{restaurant.description}</p>

                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <MapPin className="w-5 h-5 text-primary" />
                      <span className="text-sm text-foreground">{restaurant.address}</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Phone className="w-5 h-5 text-primary" />
                      <span className="text-sm text-foreground">{restaurant.phone}</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Mail className="w-5 h-5 text-primary" />
                      <span className="text-sm text-foreground">{restaurant.email}</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Clock className="w-5 h-5 text-primary" />
                      <span className="text-sm text-foreground">{restaurant.openingHours}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Business Metrics */}
              <Card className="border border-primary/50 bg-white">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3 text-primary">
                  <div className="bg-primary flex justify-center items-center rounded-full w-10 h-10">
                    <Star className="w-5 h-5 text-white" />
                    </div>
                    Business Metrics
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-4  rounded-lg border border-primary/50 bg-white">
                      <div className="text-2xl font-bold text-primary">{restaurant.rating}</div>
                      <div className="text-sm text-foreground">Rating</div>
                    </div>
                    <div className="text-center p-4  rounded-lg border border-primary/50 bg-white">
                      <div className="text-2xl font-bold text-primary">{restaurant.totalOrders}</div>
                      <div className="text-sm text-foreground">Total Orders</div>
                    </div>
                    <div className="text-center p-4  rounded-lg border border-primary/50 bg-white">
                      <div className="text-2xl font-bold text-primary">£{restaurant.revenue.toLocaleString()}</div>
                      <div className="text-sm text-foreground">Revenue</div>
                    </div>
                    <div className="text-center p-4  rounded-lg border border-primary/50 bg-white">
                      <div className="text-2xl font-bold text-primary">{restaurant.commission}%</div>
                      <div className="text-sm text-foreground">Commission</div>
                    </div>
                  </div>

                  <Separator className="bg-primary/50" />

                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-foreground">Delivery Time:</span>
                      <span className="font-medium text-primary">{restaurant.deliveryTime}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-foreground">Minimum Order:</span>
                      <span className="font-medium text-primary">£{restaurant.minimumOrder}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-foreground">Join Date:</span>
                      <span className="font-medium text-primary">{restaurant.joinDate}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="performance" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="border border-primary/50 bg-white">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 justify-between">
                    <div>
                      <p className="text-sm text-foreground">Monthly Orders</p>
                      <p className="text-2xl font-bold text-primary">247</p>
                    </div>
                    <ShoppingBag className="w-8 h-8 text-primary" />
                  </div>
                </CardContent>
              </Card>
              <Card className="border border-primary/50 bg-white">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-foreground">Monthly Revenue</p>
                      <p className="text-2xl font-bold text-primary">£3,240</p>
                    </div>
                    <DollarSign className="w-8 h-8 text-primary" />
                  </div>
                </CardContent>
              </Card>
              <Card className="border border-primary/50 bg-white">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-foreground">Avg Order Value</p>
                      <p className="text-2xl font-bold text-priamryorange-800">£28.50</p>
                    </div>
                    <Percent className="w-8 h-8 text-primary" />
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
                  {[1, 2, 3, 4, 5].map((i) => (
                    <div key={i} className="flex items-center justify-between p-4 border-primary/50 border rounded-lg">
                      <div>
                        <p className="font-medium text-primary">#ORD-00{i}</p>
                        <p className="text-sm text-secondary">Customer Name • 2 items</p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-foreground">£{(25 + i * 3).toFixed(2)}</p>
                        <Badge className="bg-green-100 text-green-800">Delivered</Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings" className="space-y-6">
            <Card className="border border-primary/50 bg-white">
              <CardHeader>
                <CardTitle className="flex items-center text-primary">
                  {getStatusIcon(currentStatus)}
                  <span className="ml-2">Restaurant Status</span>
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
                      <SelectItem value="pending" className="text-foreground">Pending</SelectItem>
                      <SelectItem value="inactive" className="text-foreground">Inactive</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button className="bg-secondary hover:bg-secondary/80 cursor-pointer text-white">Update Status</Button>
                </div>
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
          <Button className="bg-secondary hover:bg-secondary/80 text-white">Edit Restaurant</Button>
          <Button variant="outline" className="bg-secondary hover:bg-secondary/80 text-white">
            Contact Restaurant
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

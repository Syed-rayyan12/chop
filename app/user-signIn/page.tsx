"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Eye, EyeOff, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function Page() {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      const res = await fetch("http://localhost:4000/api/user/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      const data = await res.json()
      if (!res.ok) throw new Error(data.message || "Something went wrong")

      if (data.token) localStorage.setItem("token", data.token)

      // Redirect based on role
      if (data.user?.role === "USER") {
        router.push("/customer-panel")
      } else {
        router.push("/") // fallback
      }
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex justify-center bg-white items-center min-h-screen">
      <Card className="w-full max-w-md border bg-white max-sm:mx-4 border-primary/40">
        <CardHeader className="text-center space-y-4">
          <Link href="/">
            <img
              src="/chopNow.png"
              alt="ChopNow Logo"
              className="mx-auto w-32 object-cover"
            />
          </Link>
          <p className="text-gray-600">Login to your User account</p>
        </CardHeader>

        <CardContent>
          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email */}
            <div className="space-y-2 relative">
              <label className="text-sm font-medium text-gray-700">Email</label>
              <User className="absolute top-6 inset-y-0 left-3 my-auto h-4 w-4 text-gray-400" />
              <Input
                type="email"
                name="email"
                placeholder="john@example.com"
                value={formData.email}
                onChange={handleChange}
                className="pl-10 border border-primary/40"
                required
              />
            </div>

            {/* Password */}
            <div className="space-y-2 relative">
              <label className="text-sm font-medium text-gray-700">Password</label>
              <Input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                className="pr-10 border border-primary/40"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute top-6 inset-y-0 right-3 my-auto text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>

            {/* Login Button */}
            <Button
              type="submit"
              className="w-full bg-primary cursor-pointer hover:bg-primary/90 text-white rounded-lg px-2 py-2"
            >
              {loading ? "Signing in..." : "Sign In"}
            </Button>

            {error && <p className="text-red-500 mt-3 text-center">{error}</p>}
          </form>

          {/* Divider */}
          <div className="flex items-center my-6">
            <div className="flex-grow border-t border-gray-300"></div>
            <span className="mx-4 text-gray-500 text-sm">OR</span>
            <div className="flex-grow border-t border-gray-300"></div>
          </div>

          {/* Secondary Options */}
          <div className="space-y-3">
            <Button
              onClick={() => router.push("/rider-signup")}
              className="w-full bg-indigo-500 hover:bg-indigo-600 text-white"
            >
              Sign Up as Rider
            </Button>

            <Button
              onClick={() => router.push("/restaurant-signup")}
              className="w-full bg-green-500 hover:bg-green-600 text-white"
            >
              Sign Up as Restaurant
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

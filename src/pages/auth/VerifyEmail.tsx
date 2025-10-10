// src/pages/auth/VerifyEmail.tsx
import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { toast } from "sonner"
import apiClient from "@/lib/apiClient"
import { useNavigate } from "react-router-dom"

export default function VerifyEmail() {
  const [email, setEmail] = useState("")
  const [otp, setOtp] = useState("")
  const navigate = useNavigate()

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await apiClient.post("/auth/verify-email", { email, otp })
      toast.success("Email verified! You can now login.")
      navigate("/auth/login");
    } catch (err: any) {
      toast.error(err.response?.data?.detail || "Verification failed")
    }
  }

  return (
    <Card className="max-w-md mx-auto mt-20 p-4">
      <CardHeader>
        <CardTitle>Verify Email</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleVerify} className="space-y-4">
          <Input
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          <Input
            placeholder="OTP Code"
            value={otp}
            onChange={e => setOtp(e.target.value)}
          />
          <Button type="submit" className="w-full">
            Verify
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}

// src/pages/auth/ConfirmPasswordReset.tsx
import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { toast } from "sonner"
import apiClient from "@/lib/apiClient"
import { useNavigate } from "react-router-dom"

export default function ConfirmPasswordReset() {
  const [email, setEmail] = useState("")
  const [otp, setOtp] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const navigate = useNavigate();

  const handleConfirm = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await apiClient.post("/auth/password-reset/confirm", { email, otp, new_password: newPassword })
      toast.success("Password reset successful. You can now login.")
      navigate("/auth/login")
    } catch (err: any) {
      toast.error(err.response?.data?.detail || "Reset failed")
    }
  }

  return (
    <Card className="max-w-md mx-auto mt-20 p-4">
      <CardHeader>
        <CardTitle>Confirm Password Reset</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleConfirm} className="space-y-4">
          <Input placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
          <Input placeholder="OTP Code" value={otp} onChange={e => setOtp(e.target.value)} />
          <Input
            type="password"
            placeholder="New Password"
            value={newPassword}
            onChange={e => setNewPassword(e.target.value)}
          />
          <Button type="submit" className="w-full">
            Reset Password
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}

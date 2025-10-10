// src/pages/auth/ConfirmEmailUpdate.tsx
import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { toast } from "sonner"
import apiClient from "@/lib/apiClient"

export default function ConfirmEmailUpdate() {
  const [email, setEmail] = useState("")
  const [otp, setOtp] = useState("")

  const handleConfirm = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await apiClient.post("/auth/email/update/confirm", { email, otp })
      toast.success("Email updated successfully")
    } catch (err: any) {
      toast.error(err.response?.data?.detail || "Update failed")
    }
  }

  return (
    <Card className="max-w-md mx-auto mt-20 p-4">
      <CardHeader>
        <CardTitle>Confirm Email Update</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleConfirm} className="space-y-4">
          <Input placeholder="New Email" value={email} onChange={e => setEmail(e.target.value)} />
          <Input placeholder="OTP Code" value={otp} onChange={e => setOtp(e.target.value)} />
          <Button type="submit" className="w-full">
            Confirm Update
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}

// src/pages/auth/ChangePassword.tsx
import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { toast } from "sonner"
import apiClient from "@/lib/apiClient"

export default function ChangePassword() {
  const [currentPassword, setCurrentPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")

  const handleChange = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await apiClient.post("/auth/password/change", {
        current_password: currentPassword,
        new_password: newPassword,
      })
      toast.success("Password updated successfully")
    } catch (err: any) {
      toast.error(err.response?.data?.detail || "Change failed")
    }
  }

  return (
    <Card className="max-w-md mx-auto mt-20 p-4">
      <CardHeader>
        <CardTitle>Change Password</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleChange} className="space-y-4">
          <Input
            type="password"
            placeholder="Current Password"
            value={currentPassword}
            onChange={e => setCurrentPassword(e.target.value)}
          />
          <Input
            type="password"
            placeholder="New Password"
            value={newPassword}
            onChange={e => setNewPassword(e.target.value)}
          />
          <Button type="submit" className="w-full">
            Change Password
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}

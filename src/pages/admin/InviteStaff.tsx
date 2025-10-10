// src/pages/auth/CreateMinor.tsx
import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { toast } from "sonner"
import apiClient from "@/lib/apiClient"
import { useNavigate } from "react-router-dom"

export default function InviteStaff() {
  const [email, setEmail] = useState("")
  const [name, setName] = useState("")
  const navigate = useNavigate()

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await apiClient.post("/auth/minors", { email, name })
      toast.success("Minor account created")
      navigate("/dashboard")
    } catch (err: any) {
      toast.error(err.response?.data?.detail || "Creation failed")
    }
  }

  return (
    <Card className="max-w-md mx-auto mt-20 p-4">
      <CardHeader>
        <CardTitle>Invite Staff</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleCreate} className="space-y-4">
          <Input placeholder="Staff's Email" value={email} onChange={e => setEmail(e.target.value)} />
          <Input placeholder="Staff's Name" value={name} onChange={e => setName(e.target.value)} />
          <Button type="submit" className="w-full">
            Invite
          </Button>
        </form>
      </CardContent>
    </Card>
  )
};

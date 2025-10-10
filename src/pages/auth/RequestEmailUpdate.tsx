// src/pages/auth/RequestEmailUpdate.tsx
import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { toast } from "sonner"
import apiClient from "@/lib/apiClient"

export default function RequestEmailUpdate() {
    const [newEmail, setNewEmail] = useState("")

    const handleRequest = async (e: React.FormEvent) => {
        e.preventDefault()
        try {
            await apiClient.post("/auth/email/update/request", { new_email: newEmail })
            toast.success("OTP sent to new email")
        } catch (err: any) {
            toast.error(err.response?.data?.detail || "Update request failed")
        }
    }

    return (
        <Card className="max-w-md mx-auto mt-20 p-4">
            <CardHeader>
                <CardTitle>Request Email Update</CardTitle>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleRequest} className="space-y-4">
                    <Input
                        placeholder="New Email"
                        value={newEmail}
                        onChange={e => setNewEmail(e.target.value)}
                    />
                    <Button type="submit" className="w-full">
                        Request Update
                    </Button>
                </form>
            </CardContent>
        </Card>
    )
}

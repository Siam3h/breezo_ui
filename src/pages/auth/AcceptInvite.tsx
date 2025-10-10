// src/pages/auth/AcceptInvite.tsx
import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { toast } from "sonner"
import apiClient from "@/lib/apiClient"
import { useNavigate } from "react-router-dom"

export default function AcceptInvite() {
    const [token, setToken] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate()

    const handleAccept = async (e: React.FormEvent) => {
        e.preventDefault()
        try {
            await apiClient.post("/auth/accept-invite", { token, password })
            toast.success("Invite accepted, account created.")
            navigate("/auth/login");
        } catch (err: any) {
            toast.error(err.response?.data?.detail || "Invite failed")
        }
    }

    return (
        <Card className="max-w-md mx-auto mt-20 p-4">
            <CardHeader>
                <CardTitle>Accept Invite</CardTitle>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleAccept} className="space-y-4">
                    <Input placeholder="Invite Token" value={token} onChange={e => setToken(e.target.value)} />
                    <Input
                        type="password"
                        placeholder="Set Password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    />
                    <Button type="submit" className="w-full">
                        Accept Invite
                    </Button>
                </form>
            </CardContent>
        </Card>
    )
}

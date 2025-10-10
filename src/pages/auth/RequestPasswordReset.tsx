// src/pages/auth/RequestPasswordReset.tsx
import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { toast } from "sonner"
import apiClient from "@/lib/apiClient"
import { useNavigate } from "react-router-dom"

export default function RequestPasswordReset() {
    const [email, setEmail] = useState("")
    const navigate = useNavigate();

    const handleRequest = async (e: React.FormEvent) => {
        e.preventDefault()
        try {
            await apiClient.post("/auth/password-reset/request", email)
            toast.success("Password reset OTP sent to your email")
            navigate("/auth/password-reset/confirm");
        } catch (err: any) {
            toast.error(err.response?.data?.detail || "Request failed")
        }
    }

    return (
        <Card className="max-w-md mx-auto mt-20 p-4">
            <CardHeader>
                <CardTitle>Reset Password</CardTitle>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleRequest} className="space-y-4">
                    <Input
                        placeholder="Email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                    <Button type="submit" className="w-full">
                        Send Reset OTP
                    </Button>
                </form>
            </CardContent>
        </Card>
    )
}

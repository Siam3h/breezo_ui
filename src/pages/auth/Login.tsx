// src/pages/auth/Login.tsx
import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { toast } from "sonner"
import apiClient from "@/lib/apiClient"
import { useAuth } from "@/context/AuthContext"
import { useNavigate, Link } from "react-router-dom"

export default function Login() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const { login } = useAuth()
    const navigate = useNavigate()

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault()
        try {
            const res = await apiClient.post("/auth/login", { email, password })
            const { access_token, refresh_token, user } = res.data

            // Use context login
            login(user, { access: access_token, refresh: refresh_token })

            toast.success("Login successful!")
            navigate("/") // redirect to dashboard (or home)
        } catch (err: any) {
            toast.error(err.response?.data?.detail || "Login failed")
        }
    }

    return (
        <Card className="max-w-md mx-auto mt-20 p-4">
            <CardHeader>
                <CardTitle>Login</CardTitle>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleLogin} className="space-y-4">
                    <Input
                        placeholder="Email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                    <Input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    />
                    <Button type="submit" className="w-full">
                        Login
                    </Button>
                </form>
                <div className="mt-4 text-center text-sm space-y-1">
                    <div>
                        Don't have an account?{" "}
                        <Link to="/auth/register" className="text-blue-500 hover:underline">
                            Register
                        </Link>
                    </div>
                    <div>
                        Forgot password?{" "}
                        <Link to="/auth/password-reset" className="text-blue-500 hover:underline">
                            Reset Password
                        </Link>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}

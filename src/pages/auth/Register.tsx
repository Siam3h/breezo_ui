// src/pages/auth/Register.tsx
import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { toast } from "sonner"
import apiClient from "@/lib/apiClient"
import { useNavigate, Link } from "react-router-dom"

export default function Register() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [role, setRole] = useState("personal")
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await apiClient.post("/auth/register", { email, password, role })
      toast.success("Account created. Check your email for OTP.")
      navigate("/auth/verify-email");
    } catch (err: any) {
      toast.error(err.response?.data?.detail || "Registration failed")
    }
  }

  return (
    <Card className="max-w-md mx-auto mt-20 p-4">
      <CardHeader>
        <CardTitle>Create Account</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
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
          <select
            value={role}
            onChange={e => setRole(e.target.value)}
            className="w-full p-2 border rounded-md"
          >
            <option value="personal">Personal</option>
            <option value="business_admin">Business</option>
          </select>

          <Button type="submit" className="w-full">
            Register
          </Button>
        </form>
        <div className="mt-4 text-center text-sm">
          Already have an account?{" "}
          <Link to="/auth/login" className="text-blue-500 hover:underline">
            Login
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}

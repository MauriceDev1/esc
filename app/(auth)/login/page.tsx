"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import Link from "next/link";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Perform the login logic here, e.g., using next-auth signIn function
    // const res = await signIn("credentials", {
    //   email,
    //   password,
    //   redirect: true,
    //   callbackUrl: "/profile",
    // });
  };

  return (
    <div className="min-h-screen flex justify-center items-center w-full fixed top-0 left-0 bg-black px-2 md:px-0">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader>
          <CardTitle className="text-center">Login</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button type="submit" className="w-full">
              Login
            </Button>
          </form>
          <div className="flex justify-between mt-4 text-sm text-gray-500">
            <Link href="/register" className="hover:underline">
              Sign Up
            </Link>
            <Link href="/forgot-password" className="hover:underline">
              Forgot Password?
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation"; // Use this for app router
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/firebase";
import { FirebaseError } from "firebase/app";

export default function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("client");
  const [errors, setErrors] = useState({
    username: "",
    email: "",
    password: "",
  });
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Clear previous errors
    setErrors({
      username: "",
      email: "",
      password: "",
    });

    // Validation
    let isValid = true;
    const validationErrors = {
      username: "",
      email: "",
      password: "",
    };

    // Username validation (min length 4)
    if (username.length < 4) {
      isValid = false;
      validationErrors.username = "Username must be at least 4 characters.";
    }

    // Email validation (valid email format)
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
      isValid = false;
      validationErrors.email = "Please enter a valid email address.";
    }

    // Password validation (min length 6)
    if (password.length < 6) {
      isValid = false;
      validationErrors.password = "Password must be at least 6 characters.";
    }

    // If there are validation errors, set them and return early
    if (!isValid) {
      setErrors(validationErrors);
      return;
    }

    try {
      // Firebase Authentication: Register user
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);

      // Add additional user details to the database if needed
      const user = userCredential.user;

      console.log("User registered:", user);

      // Redirect based on role
      if (role === "client") {
        router.push("/login");
      } else if (role === "escort") {
        router.push("/register-profile");
      }
    } catch (error: unknown) { // Use `unknown` instead of `any`
      if (error instanceof FirebaseError) { // Check if the error is a FirebaseError
        console.error("Firebase registration error:", error);

        // Handle Firebase errors
        if (error.code === "auth/email-already-in-use") {
          setErrors((prevErrors) => ({ ...prevErrors, email: "Email is already in use." }));
        } else if (error.code === "auth/weak-password") {
          setErrors((prevErrors) => ({ ...prevErrors, password: "Password is too weak." }));
        } else {
          setErrors((prevErrors) => ({ ...prevErrors, email: "Registration failed. Please try again." }));
        }
      } else {
        console.error("Unexpected error:", error);
        setErrors((prevErrors) => ({ ...prevErrors, email: "An unexpected error occurred." }));
      }
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-black fixed top-0 w-full left-0 px-2 md:px-0">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader>
          <CardTitle className="text-center">Register</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                type="text"
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              {errors.username && <p className="text-red-500 text-sm">{errors.username}</p>}
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
            </div>
            <div>
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
            </div>
            <div>
              <Label htmlFor="role">Role</Label>
              <Select value={role} onValueChange={setRole}>
                <SelectTrigger id="role">
                  <SelectValue placeholder="Select a role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="client">Client</SelectItem>
                  <SelectItem value="escort">Escort</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button type="submit" className="w-full">
              Register
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

"use client"

import { Input } from '@/components/ui/input'
import React, { useState } from 'react'
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const RegisterProfile = () => {
    const { user, loading } = useAuth();
    const router = useRouter();

    useEffect(() => {
      if (!loading && !user) {
        router.push("/login");
      }
    }, [user, loading, router]);

  const [name,setName] = useState("");
  const [surname,setSurname] = useState("");
  const [age,setAge] = useState("");

  const handleSubmit = () => {

  }

  return (
    <div>
        {user
            ?
                <form onSubmit={handleSubmit} className="grid grid-rows-1 md:grid-rows-2 grid-flow-col md:gap-2 gap-1">
                    <Input
                    type="text"
                    placeholder="Name"
                    value={name}
                    className='text-white'
                    onChange={(e) => setName(e.target.value)}
                    />
                    <Input
                    type="text"
                    placeholder="Surname"
                    value={surname}
                    className='text-white'
                    onChange={(e) => setSurname(e.target.value)}
                    />
                    <Input
                    type="text"
                    placeholder="age"
                    value={age}
                    className='text-white'
                    onChange={(e) => setAge(e.target.value)}
                    />
                    <Input
                    type="text"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    />
                </form>
            :
                <div>Nothing</div>
        }
    </div>
  )
}

export default RegisterProfile


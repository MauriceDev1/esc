"use client"

import { Button } from '@/components/ui/button'
import React, { useState } from 'react'

const HowWeWork = () => {
  const [type, setType] = useState<string>("client");
  return (
    <div className='text-white'>
      <div className='w-full flex gap-3'>
        <Button className='w-1/2 py-7' onClick={() => setType("client")}>Client</Button>
        <Button className='w-1/2 py-7' onClick={() => setType("worker")}>Worker</Button>
      </div>
      {type === 'client'
        ?
          <div>Client</div>
        :
          <div>Worker</div>
      }
    </div>
  )
}

export default HowWeWork

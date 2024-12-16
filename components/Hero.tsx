import React from 'react'
import { Button } from './ui/button'
import Link from 'next/link'

const Hero = () => {
  return (
    <div className='w-full flex h-96 bg-custom-image'>
        <Link href="/book/city" className='m-auto'>
            <Button className='rounded-sm text-md px-10 py-3 h-12 rounded-full'>
                Book Now
            </Button>
        </Link>
    </div>
  )
}

export default Hero
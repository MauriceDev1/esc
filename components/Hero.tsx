import React from 'react'
import { Button } from './ui/button'
import Link from 'next/link'

const Hero = () => {
  return (
    <div className='hidden w-full md:flex h-96 bg-gray-200'>
        <Link href="/book/city" className='m-auto'>
            <Button className='sm-rounded text-md px-10 py-3 h-12 rounded-full'>
                Book An Worker
            </Button>
        </Link>
    </div>
  )
}

export default Hero

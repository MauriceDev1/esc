"use client"

import { Button } from '@headlessui/react';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'

const Time = () => {
    const router = useRouter();
    const now = new Date();
    const [hour, setHour] = useState(now.getHours()); // Gets the hour (0-23)
    const [minutes, setMinutes] = useState(now.getMinutes()); // Gets the minutes (0-59)

    const increaseMinutes = () => {
        setMinutes((prev) => {
            const newMinutes = prev + 15;
            if (newMinutes >= 60) {
                setHour((prevHour) => (prevHour + 1) % 24); // Increment hour, wrap around at 24
                return newMinutes - 60; // Wrap minutes back to 0
            }
            return newMinutes;
        });
    };

    const decreaseMinutes = () => {
        setMinutes((prev) => {
            const newMinutes = prev - 15;
            if (newMinutes < 0) {
                setHour((prevHour) => {
                    const newHour = (prevHour - 1 + 24) % 24;
                    if (newHour < now.getHours() || (newHour === now.getHours() && newMinutes + 60 < now.getMinutes())) {
                        return prevHour; // Prevent decrement below current time
                    }
                    return newHour;
                });
                return newMinutes + 60; // Wrap minutes back to 59
            }
            if (hour === now.getHours() && newMinutes < now.getMinutes()) {
                return prev; // Prevent decrement below current time
            }
            return newMinutes;
        });
    };

    const increaseHour = () => {
        setHour((prevHour) => (prevHour + 1) % 24); // Increment hour, wrap around at 24
    };

    const decreaseHour = () => {
        setHour((prevHour) => {
            const newHour = (prevHour - 1 + 24) % 24;
            if (newHour < now.getHours() || (newHour === now.getHours() && minutes < now.getMinutes())) {
                return prevHour; // Prevent decrement below current time
            }
            return newHour;
        });
    };

    const increaseFourHours = () => {
        setHour((prevHour) => (prevHour + 4) % 24); // Increment by 4 hours, wrap around at 24
    };

    const decreaseFourHours = () => {
        setHour((prevHour) => {
            const newHour = (prevHour - 4 + 24) % 24;
            if (newHour < now.getHours() || (newHour === now.getHours() && minutes < now.getMinutes())) {
                return prevHour; // Prevent decrement below current time
            }
            return newHour;
        });
    };

    const handleSelect = () => {
        const formattedTime = `${hour.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`; // Format time as "HH:MM"
    
        // Retrieve existing data from localStorage
        const existingData = localStorage.getItem('selectedCity'); // Adjust the key if needed
        if (existingData) {
            const parsedData = JSON.parse(existingData);
    
            // Add time to the existing object
            const updatedData = {
                ...parsedData,
                time: formattedTime, // Add the formatted time as a single string
            };
    
            // Save the updated object back to localStorage
            localStorage.setItem('selectedCity', JSON.stringify(updatedData));
    
            console.log('Updated data:', updatedData);
            router.push(`/book/duration`);
        } else {
            console.error('No existing data found in localStorage');
        }
    };

    return (
        <div className='w-full flex flex-col gap-10'>
            <h1 className='mx-auto text-xl'>Today</h1>     
            <div className='text-6xl font-bold text-gray-700 m-auto'>
                {hour.toString().padStart(2, '0')}:{minutes.toString().padStart(2, '0')}
            </div>
            <div className="m-auto flex w-36 justify-between">
                <button className='border px-2' onClick={() => increaseMinutes()}>
                    +
                </button>
                <h3>
                    15 m
                </h3>
                <button className='border px-2' onClick={() => decreaseMinutes()}>
                    -
                </button>
            </div>   
            <div className="m-auto flex w-36 justify-between">
                <button className='border px-2' onClick={() => increaseHour()}>
                    +
                </button>
                <h3>
                    1 h
                </h3>
                <button className='border px-2' onClick={() => decreaseHour()}>
                    -
                </button>
            </div>   
            <div className="m-auto flex w-36 justify-between">
                <button className='border px-2' onClick={() => increaseFourHours()}>
                    +
                </button>
                <h3>
                    4 h
                </h3>
                <button className='border px-2' onClick={() => decreaseFourHours()}>
                    -
                </button>
            </div>   
            <div className='flex m-auto'>        
                <button onClick={handleSelect} className="bg-blue-500 text-white px-4 py-2 rounded">
                Next
                </button>
            </div>
        </div>
    );
}

export default Time;

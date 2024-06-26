import React from 'react'
import { useState, useEffect } from 'react'

const Greeting = () => {
  const [greeting, setGreeting] = useState('')

  useEffect(() => {
    const getCurrentTime = () => {
      const date = new Date()
      const hours = date.getHours()
      if (hours >= 5 && hours < 12) {
        setGreeting('Good morning')
      } else if (hours >= 12 && hours < 17) {
        setGreeting('Good afternoon')
      } else {
        setGreeting('Good night')
      }
    }

    getCurrentTime()
  }, [])

  return (
    <div>
      <h1
        style={{
          fontFamily: 'satoshi, sans-serif',
          fontWeight: 700,
          fontSize: '36px',
        }}
        className="font-bold text-4xl"
      >
        {greeting}, Admin
      </h1>
    </div>
  )
}

export default Greeting

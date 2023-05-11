import React from 'react'

export default function TopButtons({setQuery}) {
  const cities = [
    {
      id:1,
      title: "Delhi"
    },
    {
      id:2,
      title: "Mumbai"
    },
    {
      id:3,
      title: "Bangalore"
    },
    {
      id:4,
      title: "Hyderabad"
    },
    {
      id:5,
      title: "Pune"
    }
  ]

  return (
    <div className='flex items-center justify-around '>
      {cities.map((city) => (
        <button key={city.id} className='text-white text-md font-medium mx-10 hover:scale-125 transition ease-in-out' 
        onClick={() => setQuery({q: city.title})}>
          {city.title}
        </button>
      ))}
    </div>
  )
}

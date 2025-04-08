'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

export default function Courses() {
  const [courses, setCourses] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // TODO: Fetch courses data
    setIsLoading(false)
  }, [])

  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    <div className='min-h-screen p-8'>
      <div className='flex justify-between items-center mb-6'>
        <h1 className='text-2xl font-bold'>My Courses</h1>
        <Link 
          href='/dashboard/courses/add'
          className='bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700'
        >
          Add New Course
        </Link>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
        {/* Course cards will go here */}
      </div>
    </div>
  )
}


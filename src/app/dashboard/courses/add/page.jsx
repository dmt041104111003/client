'use client'

import { useState } from 'react'

export default function AddCourse() {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
  })

  const handleSubmit = async (e) => {
    e.preventDefault()
    // TODO: Implement course creation
  }

  return (
    <div className='min-h-screen p-8'>
      <h1 className='text-2xl font-bold mb-6'>Add New Course</h1>
      
      <form onSubmit={handleSubmit} className='max-w-2xl space-y-6'>
        <div>
          <label htmlFor='title' className='block text-sm font-medium text-gray-700'>
            Course Title
          </label>
          <input
            type='text'
            id='title'
            name='title'
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500'
            required
          />
        </div>

        <div>
          <label htmlFor='description' className='block text-sm font-medium text-gray-700'>
            Description
          </label>
          <textarea
            id='description'
            name='description'
            rows={4}
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500'
            required
          />
        </div>

        <div>
          <label htmlFor='price' className='block text-sm font-medium text-gray-700'>
            Price
          </label>
          <input
            type='number'
            id='price'
            name='price'
            value={formData.price}
            onChange={(e) => setFormData({ ...formData, price: e.target.value })}
            className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500'
            required
          />
        </div>

        <button
          type='submit'
          className='bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700'
        >
          Create Course
        </button>
      </form>
    </div>
  )
}


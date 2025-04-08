'use client'

import { useEffect, useState } from 'react'

export default function Notifications() {
  const [notifications, setNotifications] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // TODO: Fetch notifications data
    setIsLoading(false)
  }, [])

  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    <div className='min-h-screen p-8'>
      <h1 className='text-2xl font-bold mb-6'>Notifications</h1>

      <div className='space-y-4'>
        {notifications.map((notification) => (
          <div
            key={notification.id}
            className='bg-white p-4 rounded-lg shadow border-l-4 border-blue-500'
          >
            <div className='flex justify-between items-start'>
              <div>
                <h3 className='text-lg font-medium text-gray-900'>
                  {notification.title}
                </h3>
                <p className='mt-1 text-sm text-gray-500'>
                  {notification.message}
                </p>
              </div>
              <span className='text-sm text-gray-400'>
                {notification.timestamp}
              </span>
            </div>
          </div>
        ))}

        {notifications.length === 0 && (
          <div className='text-center py-8 text-gray-500'>
            No notifications yet
          </div>
        )}
      </div>
    </div>
  )
}


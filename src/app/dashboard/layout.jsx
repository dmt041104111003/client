'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const navigation = [
  { name: 'Dashboard', href: '/dashboard' },
  { name: 'My Courses', href: '/dashboard/courses' },
  { name: 'Add Course', href: '/dashboard/courses/add' },
  { name: 'Students', href: '/dashboard/students' },
  { name: 'Notifications', href: '/dashboard/notifications' },
]

export default function DashboardLayout({ children }) {
  const pathname = usePathname()

  return (
    <div className="flex min-h-screen bg-gray-50">
      <nav className="w-64 bg-white border-r border-gray-200 p-4">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-800">LMS Cardano</h2>
        </div>
        
        <div className="space-y-1">
          {navigation.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center px-4 py-2 text-sm font-medium rounded-md
                  ${isActive
                    ? 'bg-blue-50 text-blue-600'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`}
              >
                {item.name}
              </Link>
            )
          })}
        </div>
      </nav>
      
      <main className="flex-1 overflow-y-auto">
        {children}
      </main>
    </div>
  )
}


'use client'

import { useContext, useEffect, useState } from 'react'
import { AppContext } from '../../context/AppContext'
import { assets } from '../../assets/assets'
import Loading from '../../components/student/Loading'
import axios from 'axios'
import { toast } from 'react-toastify'
import Image from 'next/image'

export default function Dashboard() {
  const [dashboardData, setDashboardData] = useState(null)
  const { currency, backendUrl, isEducator, getToken } = useContext(AppContext)

  const fetchDashboardData = async () => {
    try {
      const token = await getToken()
      const { data } = await axios.get(`${backendUrl}/api/educator/dashboard`,
        { headers: { Authorization: `Bearer ${token}` } }
      )
      if (data.success) {
        // Reverse array and take first 5 items
        const modifiedData = {
          ...data.dashboardData,
          enrolledStudentsData: [...data.dashboardData.enrolledStudentsData]
            .reverse()
            .slice(0, 5)
        }
        setDashboardData(modifiedData)
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  // Handle visibility change to update dashboard when tab becomes visible
  const handleVisibilityChange = () => {
    if (!document.hidden && isEducator) {
      fetchDashboardData()
    }
  }

  useEffect(() => {
    if (!isEducator) return

    // Initial fetch
    fetchDashboardData()
    
    // Set up polling interval (every 2 seconds)
    const intervalId = setInterval(fetchDashboardData, 2000)
    
    // Set up visibility change listener
    document.addEventListener('visibilitychange', handleVisibilityChange)
    
    // Cleanup
    return () => {
      clearInterval(intervalId)
      document.removeEventListener('visibilitychange', handleVisibilityChange)
    }
  }, [isEducator])

  if (!dashboardData) return <Loading />

  return (
    <div className='min-h-screen flex flex-col items-start justify-between gap-8
    md:p-8 md:pb-0 p-4 pt-8 pb-0'>
      <div className='space-y-5'>
        <div className='flex flex-wrap gap-5 items-center'>
          <div className='flex items-center gap-3 shadow-card border border-blue-500
          p-4 w-56 rounded-md'>
            <Image 
              src={assets.appointments_icon} 
              alt="appointments icon"
              width={32}
              height={32}
            />
            <div>
              <p className='text-2xl font-medium text-gray-600'>{dashboardData.totalCourses}</p>
              <p className='text-base text-gray-500'>Total Courses</p>
            </div>
          </div>

          <div className='flex items-center gap-3 shadow-card border border-blue-500
          p-4 w-56 rounded-md'>
            <Image 
              src={assets.patients_icon} 
              alt="patients icon"
              width={32}
              height={32}
            />
            <div>
              <p className='text-2xl font-medium text-gray-600'>{dashboardData.enrolledStudentsData.length}</p>
              <p className='text-base text-gray-500'>Total Enrolments</p>
            </div>
          </div>

          <div className='flex items-center gap-3 shadow-card border border-blue-500
          p-4 w-56 rounded-md'>
            <Image 
              src={assets.earning_icon} 
              alt="earning icon"
              width={32}
              height={32}
            />
            <div>
              <p className='text-2xl font-medium text-gray-600'>{currency}{Number(dashboardData.totalEarnings).toFixed(2)}</p>
              <p className='text-base text-gray-500'>Total Earnings</p>
            </div>
          </div>
        </div>

        <div>
          <h2 className='pb-4 text-lg font-medium'>Latest Enrolments</h2>
          <div className='flex flex-col items-center max-w-4xl w-full overflow-hidden
          rounded-md bg-white border border-gray-500/20'>
            <table className="table-fixed md:table-auto w-full overflow-hidden">
              <thead className="text-gray-900 border-b border-gray-500/20 text-sm text-left">
                <tr>
                  <th className="px-4 py-3 font-semibold text-center hidden sm:table-cell">#</th>
                  <th className="px-4 py-3 font-semibold">Student Name</th>
                  <th className="px-4 py-3 font-semibold">Course Title</th>
                </tr>
              </thead>
              <tbody className="text-sm text-gray-500">
                {dashboardData.enrolledStudentsData.map((item, index) => (
                  <tr key={index} className="border-b border-gray-500/20">
                    <td className="px-4 py-3 text-center hidden sm:table-cell">{index + 1}</td>
                    <td className="md:px-4 px-2 py-3 flex items-center space-x-3">
                      <Image
                        src={item.student.imageUrl}
                        alt="Profile"
                        width={36}
                        height={36}
                        className="rounded-full"
                      />
                      <span className='truncate'>{item.student.name}</span>
                    </td>
                    <td className="px-4 py-3 truncate">{item.courseTitle}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}


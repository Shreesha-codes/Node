import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import Navbar from '../components/Navbar'
import { companyAPI, jobAPI } from '../services/api'
import { getCompanyToken, isCompanyAuthenticated } from '../utils/auth'

const ManageJobs = () => {
  const navigate = useNavigate()
  const [jobs, setJobs] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!isCompanyAuthenticated()) {
      toast.error('Please login as a company to manage jobs')
      navigate('/')
      return
    }
    fetchCompanyJobs()
  }, [navigate])

  const fetchCompanyJobs = async () => {
    try {
      setLoading(true)
      const token = getCompanyToken()
      const response = await companyAPI.getManageJobs(token)
      
      if (response.success) {
        setJobs(response.data)
      }
    } catch (error) {
      console.error('Error fetching jobs:', error)
      toast.error('Failed to load jobs')
    } finally {
      setLoading(false)
    }
  }

  const formatDate = (timestamp) => {
    const date = new Date(timestamp)
    return date.toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })
  }

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this job?')) {
      try {
        const token = getCompanyToken()
        const response = await jobAPI.deleteJob(id, token)
        
        if (response.success) {
          toast.success('Job deleted successfully')
          setJobs(jobs.filter(job => job._id !== id))
        }
      } catch (error) {
        console.error('Error deleting job:', error)
        toast.error('Failed to delete job')
      }
    }
  }

  if (loading) {
    return (
      <>
        <Navbar />
        <div className='container px-4 min-h-[65vh] 2xl:px-20 mx-auto my-10 flex items-center justify-center'>
          <div className='text-center'>
            <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto'></div>
            <p className='text-gray-600 mt-4'>Loading jobs...</p>
          </div>
        </div>
      </>
    )
  }

  return (
    <>
      <Navbar />
      <div className='container px-4 min-h-[65vh] 2xl:px-20 mx-auto my-10'>
        {/* Header */}
        <div className='flex justify-between items-center mb-8'>
          <div>
            <h1 className='text-3xl font-bold text-gray-800'>Manage Jobs</h1>
            <p className='text-gray-600 mt-1'>View and manage all your posted jobs</p>
          </div>
          <Link to='/add-job' className='bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-lg font-medium shadow-md transition-all duration-200 inline-flex items-center gap-2'>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Post New Job
          </Link>
        </div>

        {/* Stats Cards */}
        <div className='grid grid-cols-1 md:grid-cols-4 gap-4 mb-8'>
          <div className='bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow duration-300'>
            <div className='flex items-center justify-between'>
              <div>
                <p className='text-gray-600 text-sm font-medium'>Total Jobs</p>
                <h3 className='text-3xl font-bold text-gray-800 mt-1'>{jobs.length}</h3>
              </div>
              <div className='bg-blue-100 p-3 rounded-lg'>
                <svg className="w-6 h-6 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                  <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
          </div>

          <div className='bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow duration-300'>
            <div className='flex items-center justify-between'>
              <div>
                <p className='text-gray-600 text-sm font-medium'>Total Applicants</p>
                <h3 className='text-3xl font-bold text-gray-800 mt-1'>
                  {jobs.reduce((sum, job) => sum + job.applicants, 0)}
                </h3>
              </div>
              <div className='bg-green-100 p-3 rounded-lg'>
                <svg className="w-6 h-6 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
                </svg>
              </div>
            </div>
          </div>

          <div className='bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow duration-300'>
            <div className='flex items-center justify-between'>
              <div>
                <p className='text-gray-600 text-sm font-medium'>Active Jobs</p>
                <h3 className='text-3xl font-bold text-gray-800 mt-1'>{jobs.length}</h3>
              </div>
              <div className='bg-purple-100 p-3 rounded-lg'>
                <svg className="w-6 h-6 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
          </div>

          <div className='bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow duration-300'>
            <div className='flex items-center justify-between'>
              <div>
                <p className='text-gray-600 text-sm font-medium'>Avg Applicants</p>
                <h3 className='text-3xl font-bold text-gray-800 mt-1'>
                  {Math.round(jobs.reduce((sum, job) => sum + job.applicants, 0) / jobs.length) || 0}
                </h3>
              </div>
              <div className='bg-orange-100 p-3 rounded-lg'>
                <svg className="w-6 h-6 text-orange-600" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Jobs Table */}
        <div className='bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden'>
          <div className='overflow-x-auto'>
            <table className='w-full'>
              <thead className='bg-gray-50 border-b border-gray-200'>
                <tr>
                  <th className='px-6 py-4 text-left text-sm font-semibold text-gray-700'>#</th>
                  <th className='px-6 py-4 text-left text-sm font-semibold text-gray-700'>Job Title</th>
                  <th className='px-6 py-4 text-left text-sm font-semibold text-gray-700'>Location</th>
                  <th className='px-6 py-4 text-left text-sm font-semibold text-gray-700'>Date Posted</th>
                  <th className='px-6 py-4 text-left text-sm font-semibold text-gray-700'>Applicants</th>
                  <th className='px-6 py-4 text-left text-sm font-semibold text-gray-700'>Actions</th>
                </tr>
              </thead>
              <tbody className='divide-y divide-gray-200'>
                {jobs.length > 0 ? (
                  jobs.map((job, index) => (
                    <tr key={job._id} className='hover:bg-gray-50 transition-colors duration-150'>
                      <td className='px-6 py-4 text-gray-600'>{index + 1}</td>
                      <td className='px-6 py-4'>
                        <div className='font-medium text-gray-800'>{job.title}</div>
                        <div className='text-sm text-gray-500'>{job.category}</div>
                      </td>
                      <td className='px-6 py-4 text-gray-700'>{job.location}</td>
                      <td className='px-6 py-4 text-gray-700'>{formatDate(job.date || job.createdAt)}</td>
                      <td className='px-6 py-4'>
                        <span className='inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800'>
                          {job.applicants || 0} applicants
                        </span>
                      </td>
                      <td className='px-6 py-4'>
                        <div className='flex gap-2'>
                          <button
                            onClick={() => navigate(`/add-job?id=${job._id}`)}
                            className='text-blue-600 hover:text-blue-700 font-medium text-sm px-3 py-1 rounded hover:bg-blue-50 transition-colors'
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDelete(job._id)}
                            className='text-red-600 hover:text-red-700 font-medium text-sm px-3 py-1 rounded hover:bg-red-50 transition-colors'
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan='6' className='px-6 py-12 text-center'>
                      <div className='text-gray-500'>
                        <svg className="w-16 h-16 mx-auto mb-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        <p className='text-lg font-medium'>No jobs posted yet</p>
                        <p className='text-sm text-gray-400 mt-1'>Start by posting your first job</p>
                        <Link to='/add-job' className='inline-block mt-4 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium'>
                          Post New Job
                        </Link>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  )
}

export default ManageJobs

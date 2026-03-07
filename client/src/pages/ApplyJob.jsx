import React, { useContext, useMemo, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useUser } from '@clerk/clerk-react'
import { toast } from 'react-toastify'
import { AppContext } from '../context/AppContext'
import { assets } from '../assets/assets'
import { applicationAPI } from '../services/api'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const ApplyJob = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { jobs } = useContext(AppContext)
  const { user, isSignedIn } = useUser()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: user?.fullName || '',
    email: user?.primaryEmailAddress?.emailAddress || '',
    coverLetter: '',
    resume: null
  })

  const jobData = useMemo(() => {
    if (jobs && jobs.length > 0) {
      return jobs.find(j => j._id === id) || null
    }
    return null
  }, [id, jobs])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      // Validate file type
      const validTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document']
      if (!validTypes.includes(file.type)) {
        toast.error('Please upload a PDF or Word document')
        e.target.value = ''
        return
      }
      // Validate file size (5MB)
      if (file.size > 5 * 1024 * 1024) {
        toast.error('File size should not exceed 5MB')
        e.target.value = ''
        return
      }
      setFormData(prev => ({
        ...prev,
        resume: file
      }))
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!isSignedIn) {
      toast.error('Please sign in to apply for jobs')
      return
    }

    if (!formData.resume) {
      toast.error('Please upload your resume')
      return
    }

    setLoading(true)

    try {
      // Create FormData for file upload
      const submitData = new FormData()
      submitData.append('jobId', id)
      submitData.append('userId', user.id)
      submitData.append('name', formData.name)
      submitData.append('email', formData.email)
      submitData.append('coverLetter', formData.coverLetter)
      submitData.append('resume', formData.resume)
      submitData.append('imgSrc', user.imageUrl || '')

      const response = await applicationAPI.submitApplication(submitData)

      if (response.success) {
        toast.success('Application submitted successfully!')
        navigate('/applications')
      }
    } catch (error) {
      console.error('Error submitting application:', error)
      toast.error(error.message || 'Failed to submit application')
    } finally {
      setLoading(false)
    }
  }

  if (!jobData) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen flex items-center justify-center">
          <p className="text-gray-500">Loading job details...</p>
        </div>
        <Footer />
      </>
    )
  }

  return (
    <>
      <Navbar />
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Job Details Section */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-6">
          <div className="flex items-center gap-4 mb-6">
            <img src={assets.company_icon} alt="Company Logo" className="h-16 w-16 rounded-full shadow" />
            <div>
              <h1 className="text-3xl font-bold text-gray-800">{jobData.title}</h1>
              <p className="text-gray-600 mt-1">{jobData.companyId?.name || 'Company Name'}</p>
            </div>
          </div>

          <div className="flex flex-wrap gap-3 mb-6">
            <span className="bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-medium">
              {jobData.location}
            </span>
            <span className="bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-medium">
               {jobData.level}
            </span>
            <span className="bg-purple-100 text-purple-700 px-4 py-2 rounded-full text-sm font-medium">
               {jobData.salary || 'Competitive'}
            </span>
          </div>

          <div className="mb-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-3">Job Description</h2>
            <div className="text-gray-700 leading-relaxed" dangerouslySetInnerHTML={{ __html: jobData.description }}></div>
          </div>

          {jobData.responsibilities && (
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-3">Responsibilities</h2>
              <div className="text-gray-700 leading-relaxed" dangerouslySetInnerHTML={{ __html: jobData.responsibilities }}></div>
            </div>
          )}

          {jobData.requirements && (
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-3">Requirements</h2>
              <div className="text-gray-700 leading-relaxed" dangerouslySetInnerHTML={{ __html: jobData.requirements }}></div>
            </div>
          )}
        </div>

        {/* Application Form */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Apply for this Position</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-gray-700 font-medium mb-2">Full Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your full name"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-2">Email Address</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-2">Resume/CV *</label>
              <input
                type="file"
                accept=".pdf,.doc,.docx"
                onChange={handleFileChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                required
              />
              <p className="text-sm text-gray-500 mt-1">Upload PDF or Word document (Max 5MB)</p>
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-2">Cover Letter</label>
              <textarea
                name="coverLetter"
                value={formData.coverLetter}
                onChange={handleChange}
                rows="5"
                placeholder="Tell us why you're a great fit for this role..."
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none resize-none"
              ></textarea>
            </div>

            <button
              type="submit"
              disabled={loading || !isSignedIn}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg shadow-lg transition-all duration-200 transform hover:scale-[1.02] disabled:bg-blue-400 disabled:cursor-not-allowed disabled:transform-none"
            >
              {loading ? 'Submitting...' : (!isSignedIn ? 'Sign In to Apply' : 'Submit Application')}
            </button>
          </form>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default ApplyJob
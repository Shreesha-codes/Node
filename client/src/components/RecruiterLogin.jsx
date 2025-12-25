import React, { useState } from 'react'
import { assets } from '../assets/assets'

const RecruiterLogin = ({ isOpen, onClose }) => {
  const [isSignUp, setIsSignUp] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    companyName: ''
  })

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Form submitted:', formData)
  }

  if (!isOpen) return null

  return (
    <div 
      className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 px-4'
      onClick={onClose}
    >
      <div 
        className='bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 relative'
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className='absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors'
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Header */}
        <div className='text-center mb-6'>
          <h2 className='text-2xl font-bold text-gray-800 mb-2'>
            {isSignUp ? 'Create Recruiter Account' : 'Recruiter Login'}
          </h2>
          <p className='text-gray-600 text-sm'>
            {isSignUp ? 'Join us to find great talents' : 'Welcome back! Please sign in to continue'}
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className='space-y-4'>
          {isSignUp && (
            <>
              <div>
                <label className='block text-gray-700 font-medium mb-2 text-sm'>
                  Full Name
                </label>
                <input
                  type='text'
                  name='name'
                  value={formData.name}
                  onChange={handleChange}
                  placeholder='Enter your full name'
                  className='w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all'
                  required={isSignUp}
                />
              </div>
              <div>
                <label className='block text-gray-700 font-medium mb-2 text-sm'>
                  Company Name
                </label>
                <input
                  type='text'
                  name='companyName'
                  value={formData.companyName}
                  onChange={handleChange}
                  placeholder='Enter your company name'
                  className='w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all'
                  required={isSignUp}
                />
              </div>
            </>
          )}

          <div>
            <label className='block text-gray-700 font-medium mb-2 text-sm'>
              Email
            </label>
            <div className='relative'>
              <img src={assets.email_icon} alt="" className='absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 opacity-60' />
              <input
                type='email'
                name='email'
                value={formData.email}
                onChange={handleChange}
                placeholder='Email id'
                className='w-full pl-11 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all'
                required
              />
            </div>
          </div>

          <div>
            <label className='block text-gray-700 font-medium mb-2 text-sm'>
              Password
            </label>
            <div className='relative'>
              <img src={assets.lock_icon} alt="" className='absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 opacity-60' />
              <input
                type='password'
                name='password'
                value={formData.password}
                onChange={handleChange}
                placeholder='Password'
                className='w-full pl-11 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all'
                required
              />
            </div>
          </div>

          {!isSignUp && (
            <div className='text-right'>
              <a href='#' className='text-sm text-blue-600 hover:text-blue-700 font-medium'>
                Forgot password?
              </a>
            </div>
          )}

          <button
            type='submit'
            className='w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 rounded-lg shadow-md transition-all duration-200 mt-2'
          >
            {isSignUp ? 'Create Account' : 'Login'}
          </button>
        </form>

        {/* Toggle between Login and SignUp */}
        <div className='mt-5 text-center'>
          <p className='text-sm text-gray-600'>
            {isSignUp ? 'Already have an account?' : "Don't have an account?"}
            <button
              onClick={() => setIsSignUp(!isSignUp)}
              className='ml-1 text-blue-600 hover:text-blue-700 font-semibold'
            >
              {isSignUp ? 'Login' : 'Sign up'}
            </button>
          </p>
        </div>
      </div>
    </div>
  )
}

export default RecruiterLogin

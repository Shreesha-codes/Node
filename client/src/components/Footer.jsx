import React from 'react'
import { assets } from '../assets/assets.js'

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-purple-300 to-blue-200 text-white py-8 mt-12 shadow-lg">
      <div className="container mx-auto flex flex-col items-center justify-center gap-4">
        <img width={160} src={assets.logo} alt="logo" className="mb-2 drop-shadow-lg" />
        <p className="text-sm font-light mb-2">Copyright &copy; Shreesha Sathish | All rights reserved.</p>
        <div className="flex gap-6 mt-2">
          <a href="#" aria-label="Facebook" className="hover:scale-110 transition-transform duration-200">
            <img width={38} src={assets.facebook_icon} alt="facebook" className="rounded-full shadow-md" />
          </a>
          <a href="#" aria-label="Twitter" className="hover:scale-110 transition-transform duration-200">
            <img width={38} src={assets.twitter_icon} alt="twitter" className="rounded-full shadow-md" />
          </a>
          <a href="#" aria-label="Instagram" className="hover:scale-110 transition-transform duration-200">
            <img width={38} src={assets.instagram_icon} alt="instagram" className="rounded-full shadow-md" />
          </a>
        </div>
      </div>
    </footer>
  )
}

export default Footer

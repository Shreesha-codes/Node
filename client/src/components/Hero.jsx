import React, { useContext, useRef } from 'react'
import { assets } from '../assets/assets'
import { AppContext } from '../context/AppContext'
const Hero = () => {
    const { setIsSearched, setSearchfilter } = useContext(AppContext)

    const titleRef = useRef(null)
    const locationRef = useRef(null)

    const onSearch = () => {
        setSearchfilter({
            title: titleRef.current.value,
            location: locationRef.current.value
        })
        setIsSearched(true)
    }
    return (
        <div className='container 2xl:px-20 mx-auto my-10'>
            <div className='bg-gradient-to-r from-purple-300 to-blue-200 p-12 rounded-2xl text-gray-900 py-16 text-center mx-2 shadow-xl transition-all duration-300'>
                <h2 className='text-3xl md:text-4xl lg:text-5xl font-bold mb-4 tracking-tight'>Over 10,000+ jobs to apply</h2>
                <p className='mb-8 max-w-xl mx-auto text-base font-light px-5'>Find your dream job and apply now</p>
                <div className='flex flex-col sm:flex-row items-center justify-center bg-white/80 rounded-xl text-gray-700 max-w-xl mx-auto shadow-md p-4 gap-4'>
                    <div className='flex items-center w-full sm:w-auto gap-2'>
                        <img className="h-5" src={assets.search_icon} alt="search icon" />
                        <input type="text" placeholder='Search jobs'
                            className='text-sm p-2 rounded-lg outline-none w-full border border-gray-200 focus:border-blue-400 transition-all duration-200'
                            ref={titleRef}
                        />
                    </div>
                    <div className='flex items-center w-full sm:w-auto gap-2'>
                        <img className="h-5" src={assets.location_icon} alt="location icon" />
                        <input type="text"
                            placeholder='Location'
                            className='text-sm p-2 rounded-lg outline-none w-full border border-gray-200 focus:border-blue-400 transition-all duration-200'
                            ref={locationRef}
                        />
                    </div>
                    <button onClick={onSearch} className='bg-blue-500 hover:bg-blue-600 text-white rounded-lg px-4 py-2 font-semibold shadow transition-all duration-200'>Search</button>
                </div>
            </div>

            <div className='bg-white shadow-lg mx-2 mt-7 p-6 rounded-xl flex items-center justify-center gap-8 flex-wrap'>
                <p className='font-medium text-gray-700'>Trusted by</p>
                <img className='h-8' src={assets.microsoft_logo} alt="microsoft logo" />
                <img className='h-8' src={assets.walmart_logo} alt="walmart logo" />
                <img className='h-8' src={assets.samsung_logo} alt="samsung logo" />
                <img className='h-8' src={assets.accenture_logo} alt="accenture logo" />
                <img className='h-8' src={assets.amazon_logo} alt="amazon logo" />
                <img className='h-8' src={assets.adobe_logo} alt="adobe logo" />
            </div>
        </div>
    )
}

export default Hero

import React from 'react'
import { assets } from '../assets/assets'

const Hero = () => {
    return (
        <div className='py-16'>
            <div className='container mx-auto'>
                <h2 className='text-4xl font-bold'>Over 10000+ jobs to apply</h2>
                <p className='text-gray-600 mt-4'>Find your dream job and apply now</p>
                <div>
                    <div>
                        <img src={assets.search_icon} alt="" />
                        <input type="text" placeholder='Search jobs'
                            className='max-sm:text-xs p-2 rounded outline-none w-full '
                        />

                    </div>
                </div>
            </div>
        </div>
    )
}

export default Hero

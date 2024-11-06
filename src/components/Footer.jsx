import React from 'react'

const Footer = () => {
    return (
        <div className=' bottom-0 w-full flex flex-col justify-center items-center bg-purple-600 text-white'>
            <div>
                <div className="logo font-bold text-2xl">
                    <span>Pass</span>
                    <span className='text-gray-400'>Manager 🔑</span>
                </div>
            </div>
            <div className="flex justify-center items-center text-lg">
                Created with <img className='w-8 mx-2' src="icons/heart.png" alt="" /> by Mohit Muktikant
            </div>
        </div>
    )
}

export default Footer

import React from 'react'

const Navbar = () => {
    return (
        <nav className='bg-purple-600 '>
            <div className="mycontainer flex justify-between items-center px-4 h-4">

                <div className="logo font-bold text-2xl text-white">
                    <span>Pass</span> 
                    <span className='text-gray-400'>Manager 🔑</span>
                </div>
                
                <button className='flex justify-center items-center'>
                    <img className='w-10' src="/icons/github.svg" alt="Github logo" />
                </button>
            </div>
        </nav>
    )
}

export default Navbar

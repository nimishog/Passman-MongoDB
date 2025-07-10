import React from 'react'

const Navbar = () => {
    return (
        <nav className='bg-slate-800 text-white'>
            <div className='mx-auto container  flex justify-between items-center  px-4 py-5 h-14'>

                <div className="logo font-bold ">
                    <span className="text-green-500">&lt;</span>
                    Pass
                    <span className='text-green-500'>MAN/ &gt;</span>

                </div>
                <ul>
                    <li className='flex gap-4'>
                        <a className='hover:font-bold cursor-pointer' href="/">Home</a>
                        <a className='hover:font-bold cursor-pointer' href="#">About</a>
                        <a className='hover:font-bold cursor-pointer' href="#">Contact</a>
                    </li>
                </ul>
                <a href="https://github.com/nimishog?tab=repositories" target='_blank'>
                    <button className='cursor-pointer'>
                        <img className='invert p-5 w-16' src="icons/github.svg" alt="f" />
                    </button>
                </a>
            </div>
        </nav>
    )
}

export default Navbar

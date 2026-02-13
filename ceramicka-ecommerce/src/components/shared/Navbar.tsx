import React from 'react'
import { navbarLinks }from '../../constants/links'
import { NavLink, Link } from 'react-router-dom'
import { HiOutlineSearch } from 'react-icons/hi'

export const Navbar = () => {
  return (
    <header className='bg-white text-black py-4 flex items-center justify-between px-5 border-b border-slate-200 lg:px-12'>
        <nav>
           {
            navbarLinks.map(link => (
                <NavLink 
                    key={link.id}
                    to={link.href}
                    className={({isActive}) =>  `${isActive ? 'text-cyan-600 underline': ''} transition-all duration-300 font-medium hover:text-cyan-600
                    hover:underline ` 
                }
                >
                    {link.title}
                 </NavLink>
            ))
           }
        </nav>
        <div className="flex gap-5 items-center">
            <button>
                <HiOutlineSearch size={20} />
            </button>
        </div>
        <div className="relative">
            <Link to="/account" className='border-2 border-slate-700 w-9 h-9 rounded-full grid place-items-center text-lg font-bold'>
            r
            </Link>
        </div>
    </header>
  )
}

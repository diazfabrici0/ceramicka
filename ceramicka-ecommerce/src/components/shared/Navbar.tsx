//import React from 'react'
import { navbarLinks }from '../../constants/links'
import { NavLink, Link } from 'react-router-dom'
import { HiOutlineSearch, HiOutlineShoppingBag } from 'react-icons/hi'
import { FaBarsStaggered } from 'react-icons/fa6'
import { Logos } from './Logos'

export const Navbar = () => {
  return (
    <header className='bg-white text-black py-4 flex items-center justify-between px-5 border-b border-slate-200 lg:px-12'>
        <Logos />
        <nav className='space-x-5 hiddem md:flex'>
           {
            navbarLinks.map(link => (
                <NavLink 
                    key={link.id}
                    to={link.href}
                    className={({isActive}) =>  `${isActive ? 'text-[#f880b8] underline': ''} transition-all duration-300 font-medium hover:text-[#f880b8]
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
                <HiOutlineSearch size={20} color="#f880b8" />
            </button>
        <div className="relative">
            <Link to="/account" className='border-2 border-[#f880b8] w-9 h-9 rounded-full grid place-items-center text-sm font-bold text-[#f880b8]'>
            M.B
            </Link>
        </div>
<button className="md:hidden"><FaBarsStaggered size={20} color="#f880b8" /></button>
    </div>

    </header>
  )
}

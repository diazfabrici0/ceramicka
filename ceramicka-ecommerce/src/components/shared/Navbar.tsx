import { navbarLinks } from '../../constants/links'
import { NavLink, Link } from 'react-router-dom'
import { HiOutlineSearch } from 'react-icons/hi'
import { FaBarsStaggered } from 'react-icons/fa6'
import { Logos } from './Logos'
import { useAuth } from '../../context/AuthContext'


export const Navbar = () => {
    const { isAuthenticated, isRecovering, user, logout } = useAuth();

    const adminIintial = user?.email?.charAt(0).toUpperCase() || "A";

    return (
        <header className='bg-white text-black py-4 flex items-center justify-between px-5 border-b border-slate-200 lg:px-12'>
            <Logos />

            <nav className='space-x-5 hiddem md:flex'>
                {
                    navbarLinks.map(link => (
                        <NavLink
                            key={link.id}
                            to={link.href}
                            className={({ isActive }) => `${isActive ? 'text-[#f880b8] ' : ''} transition-all duration-300 font-medium hover:text-[#f880b8]
                    `
                            }
                        >
                            {link.title}
                        </NavLink>
                    ))
                }

                {isAuthenticated && !isRecovering && (
                    <>
                        <NavLink
                            to="/adminPanel"
                            className={({ isActive }) => `${isActive ? 'text-[#f880b8] underline' : ''} transition-all duration-300 font-medium hover:text-[#f880b8]`}
                        >
                            Panel Admin
                        </NavLink>
                        <NavLink
                            to="/productList"
                            className={({ isActive }) => `${isActive ? 'text-[#f880b8] underline' : ''} transition-all duration-300 font-medium hover:text-[#f880b8]`}
                        >
                            Lista de productos
                        </NavLink>
                    </>

                )}
            </nav>
            <div className="flex gap-5 items-center">
                <button>
                    <HiOutlineSearch size={20} color="#f880b8" />
                </button>

                <div className='relative flex items-center gap-4'>
                    {isAuthenticated && !isRecovering ? (
                        <div className='flex items-center gap-3'>
                            <Link to="/account" className="w-8 h-8 bg-[#f880b8] text-white rounded-full flex items-center justify-center font-bold text-xs">
                                {adminIintial}
                            </Link>
                            <button onClick={logout}
                                className='text-xs text-gray-500 hover:text-red-500 font-medium'>
                                Salir
                            </button>
                        </div>
                    ) : (
                        <Link
                            to="/loginAdmin"
                            className="text-sm font-medium hover:text-[#f880b8] transition-colors"
                        >
                            Acceder
                        </Link>
                    )}
                </div>

                <button className="md:hidden">
                    <FaBarsStaggered size={20} color="#f880b8" />
                </button>
            </div>
        </header>
)
}

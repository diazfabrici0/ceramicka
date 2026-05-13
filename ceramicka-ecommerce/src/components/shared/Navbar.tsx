import { useState, useEffect, useRef } from 'react';
import { navbarLinks } from '../../constants/links'
import { NavLink, Link, useNavigate } from 'react-router-dom'
import { HiOutlineSearch, HiX } from 'react-icons/hi'
import { FaBarsStaggered } from 'react-icons/fa6'
import { Logos } from './Logos'
import { useAuth } from '../../context/AuthContext'
import { getProducts, type Product } from '../../services/productService'


export const Navbar = () => {
    const { isAuthenticated, isRecovering, user, logout } = useAuth();
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState<Product[]>([]);
    const [loading, setLoading] = useState(false);
    const searchRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const navigate = useNavigate();

    const adminIintial = user?.email?.charAt(0).toUpperCase() || "A";

    useEffect(() => {
        if (isSearchOpen && inputRef.current) {
            inputRef.current.focus();
        }
    }, [isSearchOpen]);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
                setIsSearchOpen(false);
                setSearchQuery('');
                setSearchResults([]);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    useEffect(() => {
        const searchProducts = async () => {
            if (searchQuery.length < 2) {
                setSearchResults([]);
                return;
            }

            setLoading(true);
            try {
                const allProducts = await getProducts();
                const filtered = allProducts.filter(product =>
                    product.name.toLowerCase().includes(searchQuery.toLowerCase())
                );
                setSearchResults(filtered.slice(0, 5));
            } catch (error) {
                console.error('Error buscando productos:', error);
            } finally {
                setLoading(false);
            }
        };

        const debounce = setTimeout(searchProducts, 300);
        return () => clearTimeout(debounce);
    }, [searchQuery]);

    const handleProductClick = (productId: string | number) => {
        setIsSearchOpen(false);
        setSearchQuery('');
        setSearchResults([]);
        navigate(`/product/${productId}`);
    };

    const handleLinkClick = () => {
        setIsMenuOpen(false);
    };

    const handleLogout = async () => {
        setIsMenuOpen(false);
        await logout();
        navigate('/');
    };

    return (
        <header className='bg-white text-black py-3 md:py-4 flex items-center justify-between px-4 md:px-5 border-b border-slate-200 lg:px-12 relative'>
            <Logos />

            <nav className={`hidden lg:flex space-x-5`}>
                {
                    navbarLinks.map(link => (
                        <NavLink
                            key={link.id}
                            to={link.href}
                            className={({ isActive }) => `${isActive ? 'text-[#f880b8] ' : ''} transition-all duration-300 font-medium hover:text-[#f880b8]`
                            }
                        >
                            {link.title}
                        </NavLink>
                    ))
                }

                {isAuthenticated && !isRecovering && (
                    <>

                        <NavLink
                            to="/productList"
                            className={({ isActive }) => `${isActive ? 'text-[#f880b8] underline-none' : ''} transition-all duration-300 font-medium hover:text-[#f880b8]`}
                        >
                            Inventario
                        </NavLink>
                    </>

                )}
            </nav>

            <div className="flex gap-3 md:gap-5 items-center">
                <div ref={searchRef} className="relative flex items-center">
                    <div
                        className={`flex items-center gap-2 overflow-hidden transition-all duration-300 ease-out origin-right ${
                            isSearchOpen ? 'w-40 md:w-64 opacity-100' : 'w-0 opacity-0'
                        }`}
                    >
                        <input
                            ref={inputRef}
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Buscar..."
                            className="w-full p-2 border border-[#f880b8] rounded-full outline-none text-sm"
                        />
                    </div>
                    <button
                        onClick={() => setIsSearchOpen(!isSearchOpen)}
                        className={`p-1 transition-opacity duration-300 ${isSearchOpen ? 'opacity-0 pointer-events-none absolute' : 'opacity-100 relative'}`}
                    >
                        <HiOutlineSearch size={20} color="#f880b8" />
                    </button>
                    {isSearchOpen && (
                        <button
                            onClick={() => {
                                setIsSearchOpen(false);
                                setSearchQuery('');
                                setSearchResults([]);
                            }}
                            className="text-gray-500 hover:text-gray-700 ml-1"
                        >
                            ✕
                        </button>
                    )}

                    {isSearchOpen && searchQuery.length >= 2 && (
                        <div className="absolute top-full left-0 mt-2 w-72 md:w-80 bg-white rounded-lg shadow-lg border border-gray-200 max-h-80 overflow-y-auto z-50 animate-fadeIn">
                            {loading ? (
                                <div className="p-4 text-center text-gray-500 text-sm">
                                    Buscando...
                                </div>
                            ) : searchResults.length > 0 ? (
                                searchResults.map((product) => (
                                    <button
                                        key={product.id}
                                        onClick={() => handleProductClick(product.id)}
                                        className="w-full flex items-center gap-3 p-3 hover:bg-gray-50 border-b border-gray-100 last:border-b-0 text-left"
                                    >
                                        <img
                                            src={typeof product.images === 'string' ? product.images : product.images?.[0]}
                                            alt={product.name}
                                            className="w-10 h-10 object-cover rounded"
                                        />
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm font-medium text-gray-800 truncate">{product.name}</p>
                                            {product.price && (
                                                <p className="text-sm text-[#f880b8]">${product.price.toLocaleString()}</p>
                                            )}
                                        </div>
                                    </button>
                                ))
                            ) : (
                                <div className="p-4 text-center text-gray-500 text-sm">
                                    No se encontraron productos
                                </div>
                            )}
                        </div>
                    )}
                </div>

                <div className='relative flex items-center gap-2 md:gap-4'>
                    {isAuthenticated && !isRecovering ? (
                        <div className='flex items-center gap-2 md:gap-3'>
                            <Link to="/account" className="w-8 h-8 bg-[#f880b8] text-white rounded-full flex items-center justify-center font-bold text-xs">
                                {adminIintial}
                            </Link>
                            <button onClick={logout}
                                className='text-xs text-gray-500 hover:text-red-500 font-medium hidden md:block'>
                                Salir
                            </button>
                        </div>
                    ) : (
                        <Link
                            to="/loginAdmin"
                            className="text-sm font-medium hover:text-[#f880b8] transition-colors hidden md:block"
                        >
                            Acceder
                        </Link>
                    )}
                </div>

                <button
                    className="lg:hidden p-1"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                >
                    {isMenuOpen ? (
                        <HiX size={24} color="#f880b8" />
                    ) : (
                        <FaBarsStaggered size={20} color="#f880b8" />
                    )}
                </button>
            </div>

            <div className={`lg:hidden absolute top-full left-0 w-full bg-white border-b border-slate-200 shadow-lg transition-all duration-300 ease-in-out z-40 ${
                isMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4 pointer-events-none'
            }`}>
                <div className="flex flex-col p-4 space-y-3">
                    {navbarLinks.map(link => (
                        <NavLink
                            key={link.id}
                            to={link.href}
                            onClick={handleLinkClick}
                            className={({ isActive }) => `${isActive ? 'text-[#f880b8] font-semibold' : ''} text-base font-medium hover:text-[#f880b8] transition-colors py-2 border-b border-gray-100`}
                        >
                            {link.title}
                        </NavLink>
                    ))}

                    {isAuthenticated && !isRecovering && (
                        <>
                            <NavLink
                                to="/productList"
                                onClick={handleLinkClick}
                                className={({ isActive }) => `${isActive ? 'text-[#f880b8] font-semibold' : ''} text-base font-medium hover:text-[#f880b8] transition-colors py-2 border-b border-gray-100`}
                            >
                                Inventario
                            </NavLink>
                            <button
                                onClick={handleLogout}
                                className="text-left text-base font-medium text-gray-500 hover:text-red-500 transition-colors py-2"
                            >
                                Salir
                            </button>
                        </>
                    )}

                    {!isAuthenticated && (
                        <NavLink
                            to="/loginAdmin"
                            onClick={handleLinkClick}
                            className="text-base font-medium hover:text-[#f880b8] transition-colors py-2 border-b border-gray-100"
                        >
                            Acceder
                        </NavLink>
                    )}
                </div>
            </div>
        </header>
    )
}

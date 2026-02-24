import { BiChevronRight } from "react-icons/bi"
import { Link } from "react-router-dom"

export const Footer = () => {
    return 
        <footer className="py-16 bg-gray-950 px-12 flex justify-between gap-10 text-sm text-slate-200 flex-wrap
        md:flex-nowrap">
            <Link to="/" className={`text-2xl font-bold tracking-tighter transition-all text-white flex-1`}>
                <p className="hidden lg:block">Cera</p>
                <span className="text-cyan-600">Micka</span>
            </Link>
            <div className="flex flex-col gap-4 flex-1">
                <p className="fonr-semibold uppercase tracking-tighter">
                    Suscribite
                </p>
                <p className="text-xs-font-medium">
                    Recibi descuentos!
                </p>
                <div className="border border-gray-800 flex items-center gap-2 px-3 py-2 rounded-full">
                    <input type="email" placeholder="Correo Electronico"
                    className="pl-2 bg-gray-950 text-slate-200 w-full focus:outline-none"/>

                    <button className="text-slate-200">
                        <BiChevronRight size={20} />
                    </button>
                </div>
            </div>
            <div className="flex flex-col gap-4 flex-1">
                <p className="font-semibold uppercase tracking tighter">
                    Politicas
                </p>
                <nav className="flex flex-col gap-2 text-xs font-medium">
                    <Link to="/stock">Productos</Link>
                    <Link to="#">Politicas de privacidad</Link>
                    <Link to="#">Terminos de uso</Link>
                </nav>
            </div>
            <div className="flex flex-col gap-4 flex-1">
                <p className="font-semibold uppercase tracking-tighter">
                    Seguinos
                </p>
                <p className="text-xs leading-6">
                    No te pierdas las nuevas piezas!
                </p>

                <div className="flex"></div>
            </div>
        </footer>
}
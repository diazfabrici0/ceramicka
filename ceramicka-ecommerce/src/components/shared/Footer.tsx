import { BiChevronRight } from "react-icons/bi"
import { Link } from "react-router-dom"
import { socialLinks } from "../../constants/links"

export const Footer = () => {
    return (
        <footer className="py-8 md:py-16 bg-[#f880b8] px-4 md:px-8 lg:px-12 flex flex-col md:flex-row justify-between gap-8 text-sm text-slate-200">
            <div className="flex-1 flex flex-col items-center md:items-start text-center md:text-left">
                <Link to="/" className="text-2xl font-bold tracking-tighter transition-all text-white">
                    <img src="../../../img/ceramickaLogo.png" alt="Logo" className="w-32 md:w-45 h-auto" />
                </Link>
            </div>

            <div className="flex flex-col gap-4 flex-1 w-full md:w-auto">
                <p className="font-semibold uppercase tracking-tighter text-center md:text-left">
                    Contacto
                </p>
                <p className="text-xs font-medium text-center md:text-left">
                    ¡Enviame un mensaje!
                </p>
                <div className="flex flex-col sm:flex-row gap-2">
                    <div className="flex items-center gap-2 px-3 py-2 border border-gray-800 rounded-full flex-1">
                        <input type="email" placeholder="Correo Electrónico"
                        className="bg-transparent text-slate-200 w-full focus:outline-none text-sm" />
                        <button className="text-slate-200">
                            <BiChevronRight size={20} />
                        </button>
                    </div>
                    <div className="flex items-center gap-2 px-3 py-2 border border-gray-800 rounded-full flex-1">
                        <input type="text" placeholder="WhatsApp"
                        className="bg-transparent text-slate-200 w-full focus:outline-none text-sm" />
                        <button className="text-slate-200">
                            <BiChevronRight size={20} />
                        </button>
                    </div>
                </div>
            </div>

            <div className="flex flex-col gap-4 flex-1 w-full md:w-auto">
                <p className="font-semibold uppercase tracking-tighter text-center md:text-left">
                    Seguime!
                </p>
                <p className="text-xs leading-6 text-center md:text-left">
                    ¡No te pierdas las nuevas piezas!
                </p>

                <div className="flex justify-center md:justify-start gap-4">
                    {
                        socialLinks.map((link) => (
                            <a
                                key={link.id}
                                href={link.href}
                                target="_blank"
                                rel="noreferrer"
                                className="text-slate-300 border border-gray-800 px-4 py-2 rounded-full flex items-center justify-center transition-all hover:bg-white hover:text-gray-950"
                            >
                                {link.icon}
                            </a>
                        ))
                    }
                </div>
            </div>
        </footer>
    )
}
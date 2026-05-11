import { BiChevronRight } from "react-icons/bi"
import { Link } from "react-router-dom"
import { socialLinks } from "../../constants/links"

export const Footer = () => {
    return (
        <footer className="py-16 bg-[#f880b8] px-12 flex justify-between gap-10 text-sm text-slate-200 flex-wrap
        md:flex-nowrap">
            
            <Link to="/" className={`text-2xl font-bold tracking-tighter transition-all text-white flex-1`}>    
            <div className="relative z-10 flex flex-col items-center justify-center py-20 lg:py-4 text-center lg:px-8">
                <img src="../../../img/ceramickaLogo.png" alt="Logo" className="w-45 h-45 mr-2" />
            </div>
            </Link>
            <div className="flex flex-col gap-4 flex-1">
                <p className="fonr-semibold uppercase tracking-tighter">
                    Contacto
                </p>
                <p className="text-xs-font-medium">
                    Enviame un mensaje!
                </p>
                <div className="border border-#f1317b-800 flex items-center gap-2 px-3 py-2 rounded-full">
                    <input type="email" placeholder="Correo Electronico"
                    className="pl-2 bg-[gray-950] text-slate-200 w-full focus:outline-none"/>

                    <button className="text-slate-200">
                        <BiChevronRight size={20} />
                    </button>
                </div>
                <div className="border border-#f1317b-800 flex items-center gap-2 px-3 py-2 rounded-full">
                    <input type="email" placeholder="Whatsapp"
                    className="pl-2 bg-[gray-950] text-slate-200 w-full focus:outline-none"/>

                    <button className="text-slate-200">
                        <BiChevronRight size={20} />
                    </button>
                </div>
            </div>

            <div className="flex flex-col gap-4 flex-1">
                <p className="font-semibold uppercase tracking-tighter">
                    Seguime!
                </p>
                <p className="text-xs leading-6">
                    No te pierdas las nuevas piezas!
                </p>

                <div className="flex">
                    {
                        socialLinks.map((link) => (
                            <a
                                key={link.id}
                                href={link.href}
                                target="_blank"
                                rel="noreferrer"
                                className="text-slate-300 border rounded-3xl m-2 border-#f1317b-800 w-full h-full py-3.5 flex items-center justify-center transition-all
                                 hover:bg-white hover:text-gray-950 "
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
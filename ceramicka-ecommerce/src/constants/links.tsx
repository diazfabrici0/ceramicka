//import { href } from "react-router-dom";

//import { title } from "process"
import { FaInstagram, FaWhatsapp } from "react-icons/fa6"

export const navbarLinks = [
    {
        id: 1,
        title: "Inicio",
        href: "/",
    },
    {
        id: 2,
        title: "Productos",
        href: "/stock",
    },
]

export const socialLinks = [
    {
        id: 1,
        title: "Instagram",
        href: "https://www.instagram.com/c.eramicka/",
        icon: <FaInstagram size={20} />
    },
    {
        id: 2,
        title: "Whatsapp",
        href: "https://wa.me/5492995774749",
        icon: <FaWhatsapp size={20} />
    }

]
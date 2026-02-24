import { Link } from "react-router-dom"

export const Logos = () => {
  return (
    <Link to="/" className={`text-2xl font-bold tracking-tighter transition-all `}>
        <p className="hidden lg:block">Cera</p>
        <span className="text-cyan-600">Micka</span>
    </Link>
  )
}

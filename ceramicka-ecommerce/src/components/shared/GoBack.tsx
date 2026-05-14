import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

export const GoBack = () => {
    const navigate = useNavigate();

    return (
        <button
            onClick={() => navigate(-1)}
            className="fixed top-20 left-4 z-40 bg-white/80 backdrop-blur-sm hover:bg-white md:p-1 p-1 rounded shadow-sm transition-all border border-gray-200 text-gray-700 hover:text-[#f880b8]"
            aria-label="Volver atrás"
        >
            <ArrowLeft size={22} />
        </button>
    );
};

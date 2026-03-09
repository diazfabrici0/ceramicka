import { FiPlus } from "react-icons/fi";
import { Link } from "react-router-dom";

interface Props {
    img: string;
    name: string;
    //price: number;
    slug: string;
}

export const CardProduct = ({
    img,
    name,
    //price, 
    slug
}:Props) => {
    return(
        <div className="flex flex-col gap-6 relative">
            <Link to={`/stock/${slug}`}>
                <div className="flex h-[350px] w-full items-center justify-center py-2 lg:h-[250px]">
                    <img 
                        src={img} 
                        alt={name} 
                        className="object-contain h-full w-full" 
                    />
                </div>
            </Link>
         <button>
            <FiPlus/>
            
         </button>
        </div>
    )
}
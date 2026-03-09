import { Link } from "react-router-dom";
interface Props {
    title: string;
    products: any[];
}

export const ProductGrid = ({ title, products }: Props) => {
return (
        <div className="my-12 max-w-7xl mx-auto px- place-content-center">
            <h2 className="text-3xl font-semibold text-center mb-10 md:text-4xl">
                {title}
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4  gap-6 gap-y-10 ">
                {products.map((product) => {
                    const displayImage = Array.isArray(product.images) 
                        ? product.images[0] 
                        : product.images;

                    return (
                        /* 2. Cambiamos el div por Link y añadimos la ruta dinámica */
                        <Link 
                            to={`/product/${product.id}`} 
                            key={product.id} 
                            className="flex flex-col group cursor-pointer "
                        >
                            <div className="relative aspect-square overflow-hidden rounded-xl bg-gray-100 mb-4">
                                <img 
                                    src={displayImage || 'https://via.placeholder.com/400'} 
                                    alt={product.name}
                                    className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105 rounded-xl border-[#f880b8] border-2"
                                />
                                {product.price && (
                                    <span className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-bold shadow-sm">
                                        ${product.price}
                                    </span>
                                )}
                            </div>

                            <div className="flex flex-col gap-1">
                                <h3 className="text-lg font-medium text-gray-800">
                                    {product.name}
                                </h3>
                            </div>
                        </Link>
                    );
                })}
            </div>
            
            {products.length === 0 && (
                <div className="text-center py-20">
                    <p className="text-gray-400">No se encontraron productos.</p>
                    <p className="text-xs text-gray-300 mt-2">Revisa las políticas RLS en Supabase.</p>
                </div>
            )}
        </div>
    );
};
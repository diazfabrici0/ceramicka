import { Link } from "react-router-dom";
interface Props {
    title: string;
    products: any[];
}

export const ProductGrid = ({ title, products }: Props) => {
return (
        <div className="my-8 md:my-12 max-w-7xl mx-auto px-4">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-semibold text-center mb-6 md:mb-10">
                {title}
            </h2>

            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
                {products.map((product) => {
                    const displayImage = Array.isArray(product.images)
                        ? product.images[0]
                        : product.images;

                    return (
                        <Link
                            to={`/product/${product.id}`}
                            key={product.id}
                            className="flex flex-col group cursor-pointer"
                        >
                            <div className="relative aspect-square overflow-hidden rounded-xl bg-gray-100 mb-2 md:mb-4">
                                <img
                                    src={displayImage || 'https://via.placeholder.com/400'}
                                    alt={product.name}
                                    className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105 rounded-xl border-2 border-[#f880b8]"
                                />
                                {product.price && (
                                    <span className="absolute bottom-2 md:bottom-3 left-2 md:left-3 bg-white/90 backdrop-blur-sm px-2 md:px-3 py-1 rounded-full text-xs md:text-sm font-bold shadow-sm">
                                        ${product.price.toLocaleString()}
                                    </span>
                                )}
                            </div>

                            <div className="flex flex-col gap-1">
                                <h3 className="text-sm md:text-lg font-medium text-gray-800 truncate">
                                    {product.name}
                                </h3>
                            </div>
                        </Link>
                    );
                })}
            </div>

            {products.length === 0 && (
                <div className="text-center py-12 md:py-20">
                    <p className="text-gray-400">No se encontraron productos.</p>
                    <p className="text-xs text-gray-300 mt-2">Revisa las políticas RLS en Supabase.</p>
                </div>
            )}
        </div>
    );
};
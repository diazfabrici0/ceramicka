interface Props {
    title: string;
    products: any[];
}

export const ProductGrid = ({ title, products }: Props) => {
    return (
        <div className="my-12 max-w-7xl mx-auto px-4">
            <h2 className="text-3xl font-semibold text-center mb-10 md:text-4xl">
                {title}
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 gap-y-10">
                {products.map((product) => {
                    // Si 'images' es un array, tomamos la primera. Si es un string, lo usamos directo.
                    const displayImage = Array.isArray(product.images) 
                        ? product.images[0] 
                        : product.images;

                    return (
                        <div className="flex flex-col group cursor-pointer" key={product.id}>
                            <div className="relative aspect-square overflow-hidden rounded-xl bg-gray-100 mb-4">
                                <img 
                                    src={displayImage || 'https://via.placeholder.com/400'} 
                                    alt={product.name}
                                    className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
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
                                <p className="text-sm text-gray-500 line-clamp-2">
                                    {product.description}
                                </p>
                            </div>
                        </div>
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
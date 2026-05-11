import { useEffect, useState } from 'react';
import Carousel from './Carousel';
import { getProducts, type Product } from '../../../services/productService';

export const Newsletter = () => {
    const [products, setProducts] = useState<Product[]>([]);

    useEffect(() => {
        const loadProducts = async () => {
            const data = await getProducts();
            setProducts(data);
        };
        loadProducts();
    }, []);

    const carouselData = products.map(product => ({
        id: product.id,
        url: typeof product.images === 'string' ? product.images : product.images?.[0] || '',
        name: product.name,
        price: product.price
    }));

    return (
        <div className="relative bg-gray-500 text-white py-16">
            <div className="absolute inset-0 bg-cover opacity-90 h-full"
                style={{ backgroundImage: "url('/img/background-newsletter.jpeg')",
                        backgroundPosition: 'center 22%',
                }}>
            </div>
            <div className="relative z-10 max-w-4xl mx-auto px-4">
                <h2 className="text-3xl font-bold text-center mb-8">Algunos de mis productos!</h2>
                {carouselData.length > 0 && (
                    <Carousel data={carouselData} />
                )}
            </div>
        </div>
    )
}
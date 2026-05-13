// @ts-ignore

import { useEffect, useState } from "react";
import { ProductGrid } from "../components/shared/home/ProductGrid.tsx";
import { getProducts } from '../services/productService.ts';

export const HomePage = () => {
    const [products, setProducts] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAllProducts = async () => {
            try {
                setLoading(true);
                const data = await getProducts(4);
                setProducts(data || []);
            } catch (error) {
                return <p>Error obteniendo los productos</p>
            } finally {
                setLoading(false);
            }
        };

        fetchAllProducts();
    }, []);

    if (loading) return <div className="text-center py-20"><p>Cargando...</p></div>;

    return (
        <div className="w-screen">
            <ProductGrid
                title="¡Nuevas Piezas!"
                products={products}
            />
        </div>
    );
};
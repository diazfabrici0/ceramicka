// @ts-ignore

import { useEffect, useState } from "react";
import { ProductGrid } from "../components/shared/home/ProductGrid";
import { getProducts } from '../services/getProducts.ts';

export const HomePage = () => {
    const [products, setProducts] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAllProducts = async () => {
            try {
                setLoading(true);
                const data = await getProducts(); // <--- Aquí invocas la función
                setProducts(data || []);
            } catch (error) {
                // Manejo de errores visuales si fuera necesario
            } finally {
                setLoading(false);
            }
        };

        fetchAllProducts();
    }, []);

    if (loading) return <p>Cargando...</p>;

    return (
        <div className="w-screen">
            {/* <FeatureGrid /> */}

            {/* Mostramos los productos reales traídos de Supabase */}
            <ProductGrid
                title="Nuevas Piezas!"
                products={products} 
            />

            {/* Si quieres filtrar por categorías en los otros grids, 
                podrías usar products.filter(p => p.categoria === 'joyas') */}
            <ProductGrid
                title="Stock"
                products={products.slice(0, 4)} // Ejemplo: solo los primeros 4
            />
        </div>
    );
};
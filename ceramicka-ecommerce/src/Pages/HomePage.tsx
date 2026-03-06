// @ts-ignore

import { useEffect, useState } from "react";
import  {supabase} from "../lib/supabaseClient.ts";
import { FeatureGrid } from "../components/shared/home/FeatureGrid";
import { ProductGrid } from "../components/shared/home/ProductGrid";

export const HomePage = () => {
    const [products, setProducts] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            setLoading(true);
            // 'productos' debe ser el nombre exacto de tu tabla en Supabase
            const { data, error } = await supabase
                .from('product') 
                .select('*')
                .order('created_at', { ascending: false }); // Los más nuevos primero

                console.log("Datos de Supabase:", data); // <--- AGREGA ESTO
            if (error) throw error;
            setProducts(data);
        } catch (error: any) {
            console.error("Error cargando productos:", error.message);
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <p className="text-center">Cargando piezas únicas...</p>;

    return (
        <div>
            <FeatureGrid />

            {/* Mostramos los productos reales traídos de Supabase */}
            <ProductGrid
                title="Nuevas Piezas"
                products={products} 
            />

            {/* Si quieres filtrar por categorías en los otros grids, 
                podrías usar products.filter(p => p.categoria === 'joyas') */}
            <ProductGrid
                title="Colección Destacada"
                products={products.slice(0, 4)} // Ejemplo: solo los primeros 4
            />
        </div>
    );
};
import { useEffect, useState } from "react";
import { ProductGrid } from "../components/shared/home/ProductGrid";
import { getProducts } from "../services/getProducts";

export const Stock = () => {
    const [products, setProducts] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(()=>{
        const fetchAllProducts = async () => {
            try{
                setLoading(true);
                const data = await getProducts();
                setProducts(data || []);
            } catch (error){
                return <p>Error obteniendo los productos</p> 
            } finally {
                setLoading(false);
            }
        };

        fetchAllProducts();
    }, []);

    if (loading) return <p>Cargando...</p>

    return (
        <div className="w-screen">
            <ProductGrid title="Stock disponible" products={products}/>
        </div>
    )
}
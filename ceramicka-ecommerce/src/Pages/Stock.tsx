import { useEffect, useState } from "react";
import { ProductGrid } from "../components/shared/home/ProductGrid";
import { getProducts } from "../services/productService";
import { ProductFilters } from "../components/products/ProductFilters";

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

    const handleSort = (criteria: string ) => {
        const sorted = [...products].sort((a,b) => {
            if (criteria === 'price-asc') return a.price - b.price;
            if (criteria === 'price-desc') return b.price - a.price;
            if (criteria === 'name-asc') return a.name.localeCompare(b.name);
            return 0;
        });
        setProducts(sorted);
    };

    if (loading) return <p>Cargando...</p>

    return (
        <div className="w-screen">
            <ProductFilters onSortChange={handleSort} />
            <ProductGrid title="Stock disponible" products={products}/>
        </div>
    )
}
import { useEffect, useState } from "react";
import { ProductGrid } from "../components/shared/home/ProductGrid";
import { getProducts } from "../services/productService";
import { getCategories } from "../services/categoryService";
import type { Category } from "../services/categoryService"; // Importamos el servicio
import { ProductFilters } from "../components/products/ProductFilters";
import { GoBack } from "../components/shared/GoBack";

export const Stock = () => {
    const [allProducts, setAllProducts] = useState<any[]>([]);
    const [filteredProducts, setFilteredProducts] = useState<any[]>([]);
    const [categories, setCategories] = useState<Category[]>([]); // Estado para las categorías reales
    const [loading, setLoading] = useState(true);
    const [selectedCategory, setSelectedCategory] = useState("all");

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                // Cargamos productos y categorías en paralelo para ganar velocidad
                const [productsData, categoriesData] = await Promise.all([
                    getProducts(),
                    getCategories()
                ]);
                
                setAllProducts(productsData || []);
                setFilteredProducts(productsData || []);
                setCategories(categoriesData || []);
            } catch (error) {
                console.error("Error cargando datos:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    // Lógica de filtrado: comparamos el p.category_id con el id seleccionado
    useEffect(() => {
        if (selectedCategory === "all") {
            setFilteredProducts(allProducts);
        } else {
            // Asegúrate de que el nombre del campo en tu producto sea 'category_id' o 'id_categoria'
            const filtered = allProducts.filter(
                (p) => String(p.category_id) === String(selectedCategory)
            );
            setFilteredProducts(filtered);
        }
    }, [selectedCategory, allProducts]);

    const handleSort = (criteria: string) => {
        const sorted = [...filteredProducts].sort((a, b) => {
            if (criteria === 'price-asc') return a.price - b.price;
            if (criteria === 'price-desc') return b.price - a.price;
            if (criteria === 'name-asc') return a.name.localeCompare(b.name);
            return 0;
        });
        setFilteredProducts(sorted);
    };

    if (loading) return <div className="text-center py-20"><p className="text-gray-600">Cargando catálogo...</p></div>;

    return (
        <div className="w-screen px-4 md:px-10 py-6 bg-[url(../../../img/patron.jpg)] bg-repeat bg-contain">
            <GoBack />
            <ProductFilters
                onSortChange={handleSort}
                onCategoryChange={setSelectedCategory}
                categories={categories}
                selectedCategory={selectedCategory}
            />
            <div className="">
                <ProductGrid title="Stock disponible" products={filteredProducts}/>
            </div>
        </div>
    );
};
import type { Category } from "../../services/categoryService";

interface ProductFiltersProps {
    onSortChange: (criteria: string) => void;
    onCategoryChange: (category: string) => void;
    categories: Category[]; // Ahora es un array de objetos
    selectedCategory: string;
}

export const ProductFilters = ({ 
    onSortChange, 
    onCategoryChange, 
    categories = [], 
    selectedCategory 
}: ProductFiltersProps) => {
    return (
        <div className="flex flex-wrap justify-end gap-4 p-4">
            {/* Filtro de Categorías */}
            <select 
                value={selectedCategory}
                onChange={(e) => onCategoryChange(e.target.value)}
                className="p-2 border border-pink-200 rounded-full bg-white shadow-sm outline-none focus:ring-2 focus:ring-pink-300 text-gray-700"
            >
                <option value="all">Todas las categorías</option>
                {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                        {cat.name}
                    </option>
                ))}
            </select>

            {/* Ordenar por */}
            <select 
                onChange={(e) => onSortChange(e.target.value)}
                className="p-2 border border-pink-200 rounded-full bg-white shadow-sm outline-none focus:ring-2 focus:ring-pink-300 text-gray-700"
            >
                <option value="">Ordenar por</option>
                <option value="price-asc">Precio: Menor a Mayor</option>
                <option value="price-desc">Precio: Mayor a Menor</option>
                <option value="name-asc">Nombre: A-Z</option>
            </select>
        </div>
    );
};
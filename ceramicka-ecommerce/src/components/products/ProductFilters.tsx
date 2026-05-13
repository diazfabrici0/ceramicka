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
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 p-4">
            <h2 className="text-xl md:text-2xl font-semibold text-gray-800">
                Catálogo
            </h2>
            <div className="flex flex-wrap justify-center gap-3">
                <select
                    value={selectedCategory}
                    onChange={(e) => onCategoryChange(e.target.value)}
                    className="px-3 py-2 border border-[#f880b8] rounded-full bg-white shadow-sm outline-none focus:ring-2 focus:ring-[#f880b8] text-gray-700 text-sm w-full sm:w-auto"
                >
                    <option value="all">Todas las categorías</option>
                    {categories.map((cat) => (
                        <option key={cat.id} value={cat.id}>
                            {cat.name}
                        </option>
                    ))}
                </select>

                <select
                    onChange={(e) => onSortChange(e.target.value)}
                    className="px-3 py-2 border border-[#f880b8] rounded-full bg-white shadow-sm outline-none focus:ring-2 focus:ring-[#f880b8] text-gray-700 text-sm w-full sm:w-auto"
                >
                    <option value="">Ordenar por</option>
                    <option value="price-asc">Precio: Menor a Mayor</option>
                    <option value="price-desc">Precio: Mayor a Menor</option>
                    <option value="name-asc">Nombre: A-Z</option>
                </select>
            </div>
        </div>
    );
};
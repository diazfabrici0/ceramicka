export const ProductFilters = ({ onSortChange } : { onSortChange: (criteria:string) => void}) => {
    return (
        <div className="flex justify-end p-4">
            <select 
                onChange={(e) => onSortChange(e.target.value)}
                className="p-2 border rounded-md bg-white shadow-sm">
                    <option value="">Ordenar por</option>
                    <option value="price-asc">Precio: Menor a Mayor</option>
                    <option value="price-desc">Precio: Mayor a Menor</option>
                    <option value="name-asc">Nombre: A-Z</option>

                </select>
        </div>
    )
}
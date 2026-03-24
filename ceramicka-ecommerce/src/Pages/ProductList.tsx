import { useEffect, useState } from "react"
import { getProducts, updateProduct, deleteProduct } from "../services/productService";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export const ProductList = () => {
    const [products, setProducts] = useState<any[]>([]);
    const [loadingProducts, setLoadingProducts] = useState(true);
    const [editingProduct, setEditingProduct] = useState<any | null>(null);
    const [isSaving, setIsSaving] = useState(false);
    const { user, loading } = useAuth();
    const navigate = useNavigate();

    useEffect(()=>{
        if (!loading && !user) {
            navigate('/loginAdmin');
        }
    }, [user, loading, navigate])


    const fetchProducts = async () => {
        const data = await getProducts();
        setProducts(data);
        setLoadingProducts(false);
    }

    useEffect(() => {
        fetchProducts(); []
    })

    const handleUpdate = async (e: React.FormEvent) => {
        e.preventDefault();
        if(!editingProduct) return;

        setIsSaving(true);
        try{
            await updateProduct(editingProduct.id, {
                name: editingProduct.name,
                description: editingProduct.description,
                price: Number(editingProduct.price),
                stock: Number(editingProduct.stock),
            });

            setProducts((prevProducts) =>
                prevProducts.map((p)=>
                    p.id === editingProduct.id ? {...editingProduct} : p
                )
            );

            setEditingProduct(null);
            fetchProducts();
            alert("¡Producto actualizado con éxito!");
        } catch (error) {
            console.error("Error al guardar:", error);
            alert ("Error al actualizar");
        }
    };

    const handleDelete = async (id: number) => {
        if(confirm("Estas seguro de eliminar este producto?")){
            await deleteProduct(id);
            fetchProducts();
        }
    }

    if (loading) return <p className="p-4 text-pink-500">Cargando productos...</p>

   return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4 text-[#f880b8]">Panel de Administración</h1>
      
      {/* Tabla de Productos */}
      <div className="bg-white shadow-md rounded-lg overflow-hidden border border-gray-200">
        <table className="min-w-full text-sm text-left">
          <thead className="bg-gray-100 text-gray-700 uppercase font-semibold">
            <tr>
              <th className="px-6 py-3">Producto</th>
              <th className="px-6 py-3">Precio</th>
              <th className="px-6 py-3">Stock</th>
              <th className="px-6 py-3 text-center">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {products.map((p) => (
              <tr key={p.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 font-medium text-gray-900">{p.name}</td>
                <td className="px-6 py-4">${p.price}</td>
                <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-full text-xs ${p.stock > 0 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                        {p.stock > 0 ? `En stock: ${p.stock}` : 'Agotado'}
                    </span>
                </td>
                <td className="px-6 py-4 flex justify-center gap-3">
                  <button 
                    onClick={() => setEditingProduct(p)}
                    className="text-blue-600 hover:underline font-medium"
                  >
                    Editar
                  </button>
                  <button 
                    onClick={() => { if(confirm("¿Eliminar?")) handleDelete(p.id).then(fetchProducts) }}
                    className="text-red-600 hover:underline font-medium"
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* MODAL DE EDICIÓN */}
      {editingProduct && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-2xl p-6 w-full max-w-md border-t-4 border-[#f880b8]">
            <h2 className="text-xl font-bold mb-4 text-gray-800">Editar Producto</h2>
            
            <form onSubmit={handleUpdate} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase text-gray-500 mb-1">Nombre</label>
                <input 
                  type="text" 
                  className="w-full border p-2 rounded focus:ring-2 focus:ring-[#f880b8] outline-none"
                  value={editingProduct.name}
                  onChange={(e) => setEditingProduct({...editingProduct, name: e.target.value})}
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-gray-500 mb-1">Descripción</label>
                <textarea 
                  className="w-full border p-2 rounded focus:ring-2 focus:ring-[#f880b8] outline-none"
                  value={editingProduct.description || ''}
                  onChange={(e) => setEditingProduct({...editingProduct, description: e.target.value})}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase text-gray-500 mb-1">Precio ($)</label>
                  <input 
                    type="number" 
                    className="w-full border p-2 rounded focus:ring-2 focus:ring-[#f880b8] outline-none"
                    value={editingProduct.price}
                    onChange={(e) => setEditingProduct({...editingProduct, price: Number(e.target.value)})}
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase text-gray-500 mb-1">Stock</label>
                  <input 
                    type="number" 
                    className="w-full border p-2 rounded focus:ring-2 focus:ring-[#f880b8] outline-none"
                    value={editingProduct.stock}
                    onChange={(e) => setEditingProduct({...editingProduct, stock: Number(e.target.value)})}
                    required
                  />
                </div>
              </div>

              <div className="flex gap-2 pt-4">
                <button 
                  type="button"
                  onClick={() => setEditingProduct(null)}
                  className="flex-1 bg-gray-200 py-2 rounded font-medium hover:bg-gray-300 transition-colors"
                  disabled={isSaving}
                >
                  Cancelar
                </button>
<button 
            type="submit"
            disabled={isSaving}
            className={`flex-1 text-white py-2 rounded font-medium transition-colors ${
                isSaving ? 'bg-gray-400 cursor-not-allowed' : 'bg-[#f880b8] hover:bg-[#d9679c]'
            }`}
        >
            {isSaving ? 'Guardando...' : 'Guardar Cambios'}
        </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
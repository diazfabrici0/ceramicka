import { useEffect, useState } from "react"
import { getProducts, updateProduct, deleteProduct } from "../services/productService";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { FiEdit2, FiTrash2, FiPlus, FiSearch } from "react-icons/fi";
import Swal from 'sweetalert2';
import 'sweetalert2/src/sweetalert2.scss';

export const ProductList = () => {
    const [products, setProducts] = useState<any[]>([]);
    const [editingProduct, setEditingProduct] = useState<any | null>(null);
    const [isSaving, setIsSaving] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
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
        //setLoadingProducts(false);
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
            Swal.fire({
              position: "center",
              icon: "success",
              title: "Guardado con exito!",
              showConfirmButton: false,
              timer: 3000
            });
        } catch (error) {
            //console.error("Error al guardar:", error);
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "Ocurrio un error al guardar :(",
            });
        } finally {
          setIsSaving(false);
        }
    };

    const handleDelete = async (id: number) => {
      const result = await Swal.fire({
        title: "Seguro que quieres eliminar este producto?",
        showDenyButton: true,
        confirmButtonText: "Eliminar",
        denyButtonText: `Cancelar`
      });

      if (result.isConfirmed) {
        try {
          await deleteProduct(id);
          await fetchProducts();
        } catch (error){
          console.error(error);

        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Ocurrio un error al eliminar el producto :(",
        });
        }
      }
        
      };

    if (loading) return <p className="p-4 text-pink-500">Cargando productos...</p>

    const filteredProducts = products.filter(p =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

return (
     <div className="p-4 md:p-6 w-screen bg-[url(../../../img/patron.jpg)] bg-repeat bg-contain h-screen">
       <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
         <h1 className="text-xl md:text-2xl font-bold text-[#f880b8]">Panel de Administración</h1>
         <Link
           to="/adminPanel"
           className="flex items-center gap-2 bg-[#f880b8] hover:bg-[#e0609a] text-white px-4 py-2 rounded-full transition-all text-sm font-medium"
         >
           <FiPlus size={18} />
           <span>Crear Producto o Categoría</span>
         </Link>
       </div>

       {/* Barra de búsqueda */}
       <div className="mb-4 bg-white">
         <div className="relative">
           <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
           <input
             type="text"
             placeholder="Buscar productos por nombre..."
             value={searchQuery}
             onChange={(e) => setSearchQuery(e.target.value)}
             className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-full focus:ring-2 focus:ring-[#f880b8] outline-none text-sm"
           />
         </div>
       </div>
      
      {/* Tabla de Productos */}
      <div className="bg-white shadow-md rounded-lg border border-gray-200 overflow-x-auto">
        <table className="w-full text-sm text-center table-fixed">
          <thead className="bg-gray-100 text-gray-700 uppercase font-semibold">
            <tr>
              <th className="px-2 md:px-6 py-3">Producto</th>
              <th className="px-1 md:px-6 py-3">Precio</th>
              <th className="px-1 md:px-6 py-3">Stock</th>
              <th className="px-1 md:px-6 py-3 text-center">Acciones</th>
            </tr>
          </thead>
<tbody className="divide-y divide-gray-200">
      {filteredProducts.length > 0 ? filteredProducts.map((p) => (
        <tr key={p.id} className="hover:bg-gray-50 transition-colors">
          <td className="text-left px-2 md:px-6 py-3 font-medium text-gray-900 min-w-[50px] max-w-[50px] whitespace-normal break-words">{p.name}</td>
          <td className="px-1 md:px-6 py-3">${p.price}</td>
          <td className="px-1 md:px-6 py-3 text-center">
            <span className={`px-1 py-1 rounded-full text-xs ${p.stock > 0 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
              {p.stock > 0 ? p.stock : '0'}
            </span>
          </td>
          <td className="px-1 md:px-6 py-3 text-center">
            <div className="flex justify-center gap-2 md:gap-3">
              <button
                onClick={() => setEditingProduct(p)}
                className="text-blue-600 hover:text-blue-800 transition-colors flex items-center gap-1"
              >
                <FiEdit2 size={18} className="md:hidden" />
                <span className="hidden md:inline hover:underline font-medium">Editar</span>
              </button>
              <button
                onClick={() => { handleDelete(p.id).then(fetchProducts) }}
                className="text-red-600 hover:text-red-800 transition-colors flex items-center gap-1"
              >
                <FiTrash2 size={18} className="md:hidden" />
                <span className="hidden md:inline hover:underline font-medium">Eliminar</span>
              </button>
            </div>
          </td>
        </tr>
      )) : (
        <tr>
          <td colSpan={4} className="px-6 py-8 text-center text-gray-500">
            {searchQuery ? `No hay resultados` : 'Sin productos'}
          </td>
        </tr>
      )}
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
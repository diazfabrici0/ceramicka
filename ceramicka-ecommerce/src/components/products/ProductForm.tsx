import { useState, type ChangeEvent, type FormEvent, useEffect } from 'react';
import { supabase } from '../../lib/supabaseClient';

interface Category {
  id: string,
  name:string
}

interface Producto {
  name: string;
  description: string;
  price: number;
  images: string;
  category_id?: string;
  stock: number;
}

export function ProductsForm() {
  const [name, setName] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [price, setPrice] = useState<string>();
  const [stock, setStock] = useState<string>('1');
  const [images, setImages] = useState<File | null>(null);
  const [categoryId, setCategoryId] = useState<string>('');
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() =>{
    const fetchCategories = async () =>{
      const { data, error } = await supabase
        .from('category')
        .select('id, name');

      if (error) console.error("Error cargando categorias:", error.message);
      else if (data) setCategories(data);
    };
    fetchCategories();
  }, []);

  const uploadImage = async (file: File): Promise<string | null> => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'ceramicka_images')

    try {
      const resp = await fetch(
        `https://api.cloudinary.com/v1_1/dv7n8xmar/image/upload`,
        { method: 'POST', body: formData }
      );
      const data = await resp.json();
      return data.secure_url
    } catch (err){
      console.error("error de cloudinary", err);
      return null;
    }
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!images || !categoryId) return alert("Por favor ingrese una imagen y una categoria");

    setLoading(true);

    const imageUrl = await uploadImage(images);
    
    if (imageUrl) {
      const {error} = await supabase
        .from('product')
        .insert([
          {
            name, 
            description,
            price: parseFloat(price || '0'),
            images: imageUrl,
            category_id: categoryId,
            stock: parseInt(stock || '0', 10)
          } as Producto
        ]);

      if (error) alert("Error" + error.message);
      else {
        alert("Producto creado!");
        setName('');
        setDescription('');
        setPrice('');
        setStock('1');
        setCategoryId('');
        setImages(null);
      }
    }

    setLoading(false);
  };

  return(
    <form onSubmit={handleSubmit} className='p-6 border rounded-2xl shadow-sm bg-white max-w-md mx-auto'>
      <h2 className='text-2xl font-bold mb-4 text-gray-800'>
        Nuevo Producto
      </h2>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">Nombre</label>
        <input
          type='text'
          placeholder='Maceta cactus'
          value={name}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
          className='w-full p-2 border border-gray-300 rounded-full focus:ring-2 focus:ring-[#f880b8] outline-none'
          required
        />
      </div>

      <div className="flex gap-4 mb-4">
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700 mb-1">Precio</label>
          <input
            type='number'
            placeholder='10000'
            value={price}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setPrice(e.target.value)}
            className='w-full p-2 border border-gray-300 rounded-full focus:ring-2 focus:ring-[#f880b8] outline-none'
            required
          />
        </div>

        <div className="w-32">
          <label className="block text-sm font-medium text-gray-700 mb-1">Stock</label>
          <input
            type='number'
            min="0"
            placeholder='1'
            value={stock}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setStock(e.target.value)}
            className='w-full p-2 border border-gray-300 rounded-full focus:ring-2 focus:ring-[#f880b8] outline-none'
            required
          />
        </div>
      </div>

      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-1">Descripción</label>
        <textarea
          placeholder="Breve descripción de la pieza..."
          value={description}
          onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setDescription(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-[#f880b8] outline-none h-32"
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">Categoría</label>
        <select
          value={categoryId}
          onChange={(e: ChangeEvent<HTMLSelectElement>) => setCategoryId(e.target.value)}
          className='w-full p-2 border border-gray-300 rounded-full outline-none focus:ring-2 focus:ring-[#f880b8]'
          required
        >
          <option value="">Selecciona una categoría</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-1">Imagen</label>
        <input
          type="file"
          accept='image/*'
          onChange={(e: ChangeEvent<HTMLInputElement>) => setImages(e.target.files?.[0] || null)}
          className='w-full text-sm file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-[#f880b8] file:text-white hover:file:bg-[#e0609a]'
          required
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-[#f880b8] hover:bg-[#e0609a] text-white p-2 rounded-full transition-all disabled:bg-gray-400"
      >
        {loading ? 'Subiendo...' : 'Crear Producto'}
      </button>
    </form>
  );
}



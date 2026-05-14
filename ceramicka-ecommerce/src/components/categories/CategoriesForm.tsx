import { useState, type ChangeEvent, type FormEvent } from 'react';
import { supabase } from '../../lib/supabaseClient';
import Swal from 'sweetalert2';
import 'sweetalert2/src/sweetalert2.scss';

interface Categoria {
    name: string;
    description: string;
}

export function CategoriesForm() {
    const [name, setName] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);

        const { error } = await supabase
            .from('category')
            .insert([
                {
                    name,
                    description
                } as Categoria
            ]);

        setLoading(false);

        if (error) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Ocurrio un error al subir la categoria!",
            });
        } else {
            Swal.fire({
                position: "center",
                icon: "success",
                title: "Guardado con exito!",
                showConfirmButton: false,
                timer: 3000
            });
            setName('');
            setDescription('');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="p-6 border rounded-2xl shadow-sm bg-white max-w-md mx-auto">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">Nueva Categoría</h2>

            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Nombre</label>
                <input
                    type="text"
                    placeholder="Ej: Jarrones de cerámica"
                    value={name}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-full focus:ring-2 focus:ring-[#f880b8] outline-none"
                    required
                />
            </div>

            <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-1">Descripción</label>
                <textarea
                    placeholder="Breve descripción de la categoría..."
                    value={description}
                    onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setDescription(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-[#f880b8] outline-none h-32"
                />
            </div>

            <button
                type="submit"
                disabled={loading}
                className={`w-full py-2 px-4 rounded-full font-semibold text-white transition-all
            ${loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-[#f880b8] hover:bg-[#e0609a]'}`}
            >
                {loading ? 'Guardando...' : 'Crear Categoría'}
            </button>
        </form>
    );
}
import { useState, type ChangeEvent, type FormEvent } from 'react';
import { supabase } from '../../lib/supabaseClient';

interface Categoria {
    name: string;
    description: string;
}

export function CategoriesForm() {
    const [name, setName] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);

    // Tipamos el evento del formulario
    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);

        // Supabase infiere los tipos si generaste los tipos con su CLI, 
        // si no, podemos pasarle la interfaz manualmente
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
            alert("Error: " + error.message);
        } else {
            alert("¡Categoría guardada con éxito!");
            setName('');
            setDescription('');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="p-6 border rounded-lg shadow-sm bg-white max-w-md mx-auto">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">Nueva Categoría</h2>

            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Nombre</label>
                <input
                    type="text"
                    placeholder="Ej: Jarrones de cerámica"
                    value={name}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 outline-none"
                    required
                />
            </div>

            <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-1">Descripción</label>
                <textarea
                    placeholder="Breve descripción de la categoría..."
                    value={description}
                    onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setDescription(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 outline-none h-32"
                />
            </div>

            <button
                type="submit"
                disabled={loading}
                className={`w-full py-2 px-4 rounded font-semibold text-white transition-colors 
            ${loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'}`}
            >
                {loading ? 'Guardando...' : 'Crear Categoría'}
            </button>
        </form>
    );
}
import { supabase } from '../lib/supabaseClient.ts';

// Esto le dice a TS qué campos esperar de Supabase
export interface Product {
    id: string | number;
    name: string;
    description?: string;
    price?: number;

    images?: string | string[];

    created_at?: string;
    deleted_at?: string | null;

    stock: number;

    category_id?: string;
}

export const getProducts = async (limit: number | null = null): Promise<Product[]> => {
    try {
        let query = supabase 
            .from('product')
            .select('*')
            .order('created_at', { ascending: false })
            .is('deleted_at', null)
            .gt('stock', 0);

        if (limit){
            query = query.limit(limit)
        }

        const { data, error } = await query;

        if (error) throw error;
        // Retornamos los datos asegurando que cumplen con la interfaz Product
        return (data as Product[]) || [];
    } catch (error: any) {
        console.error("Error cargando productos:", error.message);
        return []; // Retornamos un array vacío en caso de error para evitar que el .map falle
    }
};

export const updateProduct = async (id: number, updates: Partial<Product>) => {
    const {data, error} = await supabase
        .from('product')
        .update(updates)
        .eq('id', id)
        .select();
    if(error) throw error;
    return (data);    
}

export const deleteProduct = async (id: number) => {
    const {error} = await supabase
        .from('product')
        .update({ delete_at: new Date().toISOString() })
        .eq('id', id)
    if(error) throw error;
};
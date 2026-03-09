import { supabase } from '../lib/supabaseClient.ts';

// Esto le dice a TS qué campos esperar de Supabase
export interface Product {
    id: string | number;
    name: string;
    description?: string;
    price?: number;
    images?: string | string[];
    created_at?: string;
}

export const getProducts = async (): Promise<Product[]> => {
    try {
        const { data, error } = await supabase
            .from('product')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) throw error;

        // Retornamos los datos asegurando que cumplen con la interfaz Product
        return (data as Product[]) || [];
    } catch (error: any) {
        console.error("Error cargando productos:", error.message);
        return []; // Retornamos un array vacío en caso de error para evitar que el .map falle
    }
};
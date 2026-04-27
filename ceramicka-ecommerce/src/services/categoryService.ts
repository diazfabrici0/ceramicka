import { supabase } from '../lib/supabaseClient.ts';

export interface Category {
    id: string | number;
    name: string;
    description?: string;
}

export const getCategories = async (limit: number | null = null): Promise<Category[]> =>{
    try {
        let query = supabase 
            .from('category')
            .select('*')
            .order('created_at', {ascending: false})

        if(limit){
            query = query.limit(limit)
        }

        const {data, error} = await query;

        if(error) throw error;

        return (data as Category[]) || [];
    } catch (error: any) {
        console.error("Error cargando categorias:", error.message);
        return [];
    }
};

export const getCategoryById = async (id: number | string) => {
    const {data, error} = await supabase
        .from('category')
        .select('*')
        .eq('id', id)
        .is('deleted_at', null)
        .single();

    if(error) {
        throw new Error(error.message);
    }
    return data;
}


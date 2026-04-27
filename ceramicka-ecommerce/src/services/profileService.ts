// src/services/profileService.ts
import { supabase } from '../lib/supabaseClient';

export const getAdminPhone = async (): Promise<string> => {
    try {
        // Consultamos la tabla profiles de forma directa
        const { data, error } = await supabase
            .from('profiles')
            .select('phone_number')
            .limit(1)
            .maybeSingle();

        if (error) throw error;

        if (data && data.phone_number) {
            return data.phone_number;
        }

        // Si no hay datos, devolvemos un número de emergencia (fallback)
        // Asegúrate de que este número tenga código de país y ningún símbolo
        return "5491100000000"; 

    } catch (error) {
        console.error("Error obteniendo el teléfono:", error);
        return "5491100000000";
    }
};

//5491100000000
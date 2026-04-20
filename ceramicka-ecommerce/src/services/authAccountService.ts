import { supabase } from "../lib/supabaseClient";

export const accountService = {
    getProfile: async () => {
        const { data: { user } } = await supabase.auth.getUser();

        if (!user) throw new Error("No hay sesión activa");

        const { data: profile, error } = await supabase
            .from('profiles')
            .select('full_name, phone_number')
            .eq('id', user.id)
            .single();

        return { user, profile, error};
    },

    updateAccount: async (userId: string, updates: any, authUpdates?: { email?: string; password?:string}) => {
        const { error: profileError } = await supabase
            .from('profiles')
            .update(updates)
            .eq('id', userId)
        
        if (profileError) throw profileError;

        if(authUpdates) {
            const { error: authError } = await supabase.auth.updateUser(authUpdates);
            if(authError) throw authError;
        };
    },

    updateEmail : async (newEmail: string) => {
        const {data, error } = await supabase.auth.updateUser({
            email: newEmail
        });

        if(error) throw error;
        return data;
    }
}
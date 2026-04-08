import { supabase } from "../lib/supabaseClient";

export const accountService = {
    getProfile: async () => {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) throw new Error("No hay sesión activa");

        const { data, error } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', user.id)
            .single();

        return { user, profile: data, error};
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
}
import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";
import { type User } from "@supabase/supabase-js";


//esto es para controlar la reaccion de react cuando cierre sesion el usuario
//asi no quedan pantallas que no deberian cuando no esta en una sesion
export function useAuth() {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getInitialSession = async () => {
            const { data: { session } } = await supabase.auth.getSession();
            setUser(session?.user ?? null);
            setLoading(false);
        };

        getInitialSession();

        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            setUser(session?.user ?? null);
            setLoading(false);
        })
        return () => {
            subscription.unsubscribe();
        };
    }, []);

    return { user, loading };
}
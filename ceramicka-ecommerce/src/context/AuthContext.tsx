import { createContext, useState, useEffect, useContext, type ReactNode } from "react";
import { supabase } from "../lib/supabaseClient";
import { type User } from "@supabase/supabase-js";

interface AuthContextType {
    user: User | null;
    isAuthenticated: boolean;
    isRecovering: boolean;
    logout: () => void;
    setRecovering: (value: boolean) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode}) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const [isRecovering, setRecovering] = useState(false);

    useEffect(() =>{
        // Cargar sesión inicial
        supabase.auth.getSession().then(({ data: { session } }) => {
            setUser(session?.user ?? null);
            setLoading(false);
        });

        // Detectar PASSWORD_RECOVERY para activar modo recuperación
        const { data: { subscription} } = supabase.auth.onAuthStateChange((event, session) => {
            if (event === 'PASSWORD_RECOVERY') {
                setRecovering(true);
                setUser(session?.user ?? null);
            } else {
                setUser(session?.user ?? null);
                if (isRecovering) setRecovering(false);
            }
        });

        return () => subscription.unsubscribe();
    }, []);

    const logout = async () => {
        await supabase.auth.signOut();
        setRecovering(false);
    }

    const isAuthenticated = !!user;

    return (
        <AuthContext.Provider value={{ user, isAuthenticated, isRecovering: isRecovering, logout, setRecovering: setRecovering }}>
            {!loading && children}
        </AuthContext.Provider>
    );

}

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth debe ser usado dentro de un AuthProvider");
    }
    return context;
}

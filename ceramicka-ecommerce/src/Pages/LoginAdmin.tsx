import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabaseClient';
import { GoBack } from '../components/shared/GoBack';

export const LoginAdmin = () =>{
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [resetSent, setResetSent] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async (e: React.FormEvent)=> {
        e.preventDefault();
        setLoading(true);
        setError('');

        const {error: authError} = await supabase.auth.signInWithPassword({
            email, 
            password,
        });

        setLoading(false);

        if (authError) {
            setError(authError.message);
        } else{
            navigate("/account");
        }
    }

    const handleResetPassword = async () => {
        if (!email) {
            setError('Por favor ingresa tu email primero');
            return;
        }

        setLoading(true);
        setError('');

        const siteUrl = import.meta.env.VITE_SITE_URL || window.location.origin;

        const { error: resetError } = await supabase.auth.resetPasswordForEmail(email, {
            redirectTo: `${siteUrl}/reset-password`,
        });

        setLoading(false);

        if (resetError) {
            setError(resetError.message);
        } else {
            setResetSent(true);
        }
    }

    return (
        <div className="min-h-screen w-screen flex items-center justify-center bg-gray-50 p-4">
            <GoBack />
            <form onSubmit={handleLogin} className="bg-white p-6 md:p-8 rounded-2xl shadow-md w-full max-w-md">
                <h1 className="text-xl md:text-2xl font-bold mb-4 md:mb-6 text-gray-800 text-center">Iniciar Sesión</h1>

                {error && (
                    <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-full text-red-600 text-sm text-center">
                        {error}
                    </div>
                )}

                {resetSent && (
                    <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-full text-green-600 text-sm text-center">
                        Se ha enviado un correo de recuperación a tu email.
                    </div>
                )}

                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-full focus:ring-2 focus:ring-[#f880b8] outline-none"
                        required
                    />
                </div>

                <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Contraseña</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-full focus:ring-2 focus:ring-[#f880b8] outline-none"
                        required
                    />
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-[#f880b8] text-white py-3 rounded-full hover:bg-[#e0609a] transition-all disabled:bg-gray-400"
                >
                    {loading ? 'Cargando...' : 'Entrar'}
                </button>

                <div className="mt-4 text-center">
                    <button
                        type="button"
                        onClick={handleResetPassword}
                        disabled={loading}
                        className="text-sm text-[#f880b8] hover:text-[#e0609a] hover:underline"
                    >
                        ¿Olvidaste tu contraseña?
                    </button>
                </div>
            </form>
        </div>
    );
};

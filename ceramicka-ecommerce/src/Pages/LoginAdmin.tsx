import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabaseClient';

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
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <form onSubmit={handleLogin} className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
                <h1 className="text-2xl font-bold mb-6 text-gray-800">Iniciar Sesión</h1>
                
                {error && (
                    <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded text-red-600 text-sm">
                        {error}
                    </div>
                )}

                {resetSent && (
                    <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded text-green-600 text-sm">
                        Se ha enviado un correo de recuperación a tu email.
                    </div>
                )}

                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <input 
                        type="email" 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 outline-none"
                        required
                    />
                </div>

                <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Contraseña</label>
                    <input 
                        type="password" 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 outline-none"
                        required
                    />
                </div>

                <button 
                    type="submit" 
                    disabled={loading}
                    className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 disabled:bg-gray-400"
                >
                    {loading ? 'Cargando...' : 'Entrar'}
                </button>

                <div className="mt-4 text-center">
                    <button 
                        type="button"
                        onClick={handleResetPassword}
                        disabled={loading}
                        className="text-sm text-blue-600 hover:text-blue-700 hover:underline"
                    >
                        ¿Olvidaste tu contraseña? Has click aquí para recuperarla
                    </button>
                </div>
            </form>
        </div>
    );
};

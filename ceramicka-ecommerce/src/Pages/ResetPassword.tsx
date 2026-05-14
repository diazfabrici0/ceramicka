import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabaseClient';
import { useAuth } from '../context/AuthContext';
import { GoBack } from '../components/shared/GoBack';

export const ResetPassword = () => {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const navigate = useNavigate();
    const { setRecovering } = useAuth();

    const handleReset = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (password !== confirmPassword) {
            setError('Las contraseñas no coinciden');
            return;
        }

        if (password.length < 6) {
            setError('La contraseña debe tener al menos 6 caracteres');
            return;
        }

        setLoading(true);
        setError('');

        const { error: resetError } = await supabase.auth.updateUser({
            password: password
        });

        setLoading(false);

        if (resetError) {
            setError(resetError.message);
        } else {
            setSuccess(true);
            await supabase.auth.signOut();
            setRecovering(false);
            setTimeout(() => {
                navigate('/loginAdmin');
            }, 2000);
        }
    }

    return (
        <div className="min-h-screen w-full flex items-center justify-center bg-gray-50 p-4">
            <GoBack />
            <form onSubmit={handleReset} className="bg-white p-6 md:p-8 rounded-2xl shadow-md w-full max-w-md">
                <h1 className="text-xl md:text-2xl font-bold mb-4 md:mb-6 text-gray-800 text-center">Nueva Contraseña</h1>

                {error && (
                    <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-full text-red-600 text-sm text-center">
                        {error}
                    </div>
                )}

                {success && (
                    <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-full text-green-600 text-sm text-center">
                        Contraseña actualizada. Serás redirigido al login...
                    </div>
                )}

                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Nueva Contraseña</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-full focus:ring-2 focus:ring-[#f880b8] outline-none"
                        required
                        minLength={6}
                    />
                </div>

                <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Confirmar Contraseña</label>
                    <input
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-full focus:ring-2 focus:ring-[#f880b8] outline-none"
                        required
                        minLength={6}
                    />
                </div>

                <button
                    type="submit"
                    disabled={loading || success}
                    className="w-full bg-[#f880b8] text-white py-3 rounded-full hover:bg-[#e0609a] transition-all disabled:bg-gray-400"
                >
                    {loading ? 'Cambiando...' : 'Cambiar Contraseña'}
                </button>
            </form>
        </div>
    );
};
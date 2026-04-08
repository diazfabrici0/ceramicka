import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import { accountService } from '../services/authAccountService';

export const Account = () => {
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState({
    full_name: '',
    phone_number: '',
    email: '' // El email viene de Auth
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const { user, profile } = await accountService.getProfile();
      setProfile({
        full_name: profile?.full_name || '',
        phone_number: profile?.phone_number || '',
        email: user.email || ''
      });
    } catch (error) {
      console.error("Error cargando perfil", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        await accountService.updateAccount(user.id, {
          full_name: profile.full_name,
          phone_number: profile.phone_number,
          updated_at: new Date()
        });
        alert("¡Perfil actualizado!");
      }
    } catch (error: any) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <p>Cargando datos de cuenta...</p>;

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-4">Mi Cuenta</h2>
      <form onSubmit={handleSave} className="space-y-4">
        <div>
          <label className="block text-sm">Email (No editable aquí)</label>
          <input 
            type="text" 
            value={profile.email} 
            disabled 
            className="w-full p-2 bg-gray-100 border rounded"
          />
        </div>
        <div>
          <label className="block text-sm">Nombre Completo</label>
          <input 
            type="text" 
            value={profile.full_name} 
            onChange={e => setProfile({...profile, full_name: e.target.value})}
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label className="block text-sm">Teléfono</label>
          <input 
            type="text" 
            value={profile.phone_number} 
            onChange={e => setProfile({...profile, phone_number: e.target.value})}
            className="w-full p-2 border rounded"
          />
        </div>
        <button 
          type="submit" 
          disabled={loading}
          className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
        >
          {loading ? 'Guardando...' : 'Guardar Cambios'}
        </button>
      </form>
    </div>
  );
};
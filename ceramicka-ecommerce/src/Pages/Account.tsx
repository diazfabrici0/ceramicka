import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import { accountService } from '../services/authAccountService';

export const Account = () => {
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
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
      if (!user) return;

        await accountService.updateAccount(user.id, {
          full_name: profile.full_name,
          phone_number: profile.phone_number,
          updated_at: new Date()
        });

        if(profile.email !== user.email) {
          await accountService.updateEmail(profile.email);
          alert("Perfil actualizado. Se envio un correo de confirmacion a tu neuva direccion de correo electronico");
        } else {
          alert("Perfil actualizado con exito!");
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

      <section className='space-y-4'>
        <header >
          <div className="text-xl font-semibold">
            <h1>{profile.full_name || 'Sin nombre'}</h1>
          </div>
        </header>

        <div className="flex flex-col">
          <label className='text-gray-500 text-sm'>Correo Electronico</label>
          <span className='text-gray-800'>{profile.email}</span>
        </div>

        <div className="flex flex-col">
          <label className=' text-gray-500 text-sm'>Numero de telefono</label>
          <span className='text-gray-800'>{profile.phone_number || 'No registrado'}</span>
        </div>
      </section>

      <footer className='pt-4'>
        <button onClick={()=> setIsModalOpen(true)}
          className='bg-blue-800 text-white rounded px-4 py-2 hover:bg-blue-900 transition-colors'>Editar perfil</button>
      </footer>

      {isModalOpen && (
        <div className='fixed inset-0 z-50 flex items-center justify-center bg-black'>
          <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-sm mx-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold">
                Editar Perfil
              </h3>
              <button onClick={() => setIsModalOpen(false)}
                className="text-gray-500 hover:text-black">✕
              </button>
            </div>

            <form onSubmit={async (e) => {
              await handleSave(e);
              setIsModalOpen(false);
            }} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium">Nombre Completo</label>
                  <input 
                  type="text" 
                  value={profile.full_name} 
                  onChange={e => setProfile({...profile, full_name: e.target.value})}
                  className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>

              {/* Campo de Email - YA NO ESTÁ DISABLED */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Correo Electrónico</label>
              <input 
                type="email" 
                value={profile.email} 
                onChange={e => setProfile({...profile, email: e.target.value})}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none transition-all"
              />
              <p className="text-[11px] text-amber-600 mt-1 leading-tight">
                ⚠️ Si cambias el correo, deberás confirmarlo en tu nueva bandeja de entrada para que el cambio sea efectivo.
              </p>
            </div>

              <div>
                <label className="block text-sm font-medium">Teléfono</label>
                <input 
                  type="text" 
                  value={profile.phone_number} 
                  onChange={e => setProfile({...profile, phone_number: e.target.value})}
                  className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>

              <div className="flex gap-2 pt-2">
                <button 
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 bg-gray-200 text-gray-800 p-2 rounded hover:bg-gray-300"
                >
                  Cancelar
                </button>
                <button 
                  type="submit" 
                  disabled={loading}
                  className="flex-1 bg-blue-600 text-white p-2 rounded hover:bg-blue-700 disabled:bg-blue-300"
                >
                  {loading ? 'Guardando...' : 'Guardar'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
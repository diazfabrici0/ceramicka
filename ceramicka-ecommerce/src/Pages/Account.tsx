import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import { accountService } from '../services/authAccountService';
import { useAuth } from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import 'sweetalert2/src/sweetalert2.scss';

export const Account = () => {
  const [load, setLoad] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const [profile, setProfile] = useState({
    full_name: '',
    phone_number: '',
    email: '' // El email viene de Auth
  });

  const adminIintial = user?.email?.charAt(0).toUpperCase() || "A";


  useEffect(() => {
    if(!loading && !user) {
      navigate('/loginAdmin');
    }
    fetchData();
  }, [user, loading, navigate]);

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
      setLoad(false);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoad(true);
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
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Perfil actualizado. Se envio un correo de confirmacion a tu nueva direccion de correo electronico",
            showConfirmButton: false,
            timer: 3000
          });
        } else {
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Perfil actualizado con exito!",
            showConfirmButton: false,
            timer: 3000
          });
        }

      
    } catch (error: any) {
      Swal.fire({
        icon: "error",
          title: "Oops...",
          text: "Ocurrio un error :(",
      });
    } finally {
      setLoad(false);
    }
  };

if (load) return <div className="text-center py-20"><p>Cargando datos de cuenta...</p></div>;

  return (
    <div className="w-screen bg-[url(../../../img/patron.jpg)] bg-repeat bg-contain h-screen">
      <div className="max-w-md mx-auto p-4 md:p-6 bg-white rounded-2xl shadow-xl">
      <h2 className="text-xl md:text-2xl font-bold mb-4 text-center">Mi Cuenta</h2>
      <div className='mx-auto m-4 w-20 h-20 bg-[#f880b8] text-white rounded-full flex items-center justify-center font-thin text-3xl'>
        {adminIintial}
      </div>
      <section className='space-y-4'>
        <header >
          <div className="text-lg md:text-xl font-semibold text-center">
            <h1>{profile.full_name || 'Sin nombre'}</h1>
          </div>
        </header>

        <div className="flex flex-col">
          <label className='text-gray-500 text-sm'>Correo Electrónico</label>
          <span className='text-gray-800'>{profile.email}</span>
        </div>

        <div className="flex flex-col">
          <label className='text-gray-500 text-sm'>Número de teléfono</label>
          <span className='text-gray-800'>{profile.phone_number || 'No registrado'}</span>
        </div>
      </section>

      <footer className='pt-4 text-center'>
        <button onClick={()=> setIsModalOpen(true)}
          className='bg-[#f880b8] text-white px-6 py-2 rounded-full hover:bg-[#e0609a] transition-all'>
            Editar perfil
        </button>
      </footer>

      {isModalOpen && (
        <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4'>
          <div className="bg-white p-6 rounded-2xl shadow-xl w-full max-w-sm">
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
                  className="w-full p-3 border border-gray-300 rounded-full focus:ring-2 focus:ring-[#f880b8] outline-none"
                />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Correo Electrónico</label>
                  <input
                    type="email"
                    value={profile.email}
                    onChange={e => setProfile({...profile, email: e.target.value})}
                    className="w-full p-3 border border-gray-300 rounded-full focus:ring-2 focus:ring-[#f880b8] outline-none transition-all"
                  />
                  <p className="text-[11px] text-amber-600 mt-1 leading-tight">
                    ⚠️ Si cambias el correo, deberías confirmarlo en tu nueva bandeja de entrada.
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium">Teléfono</label>
                  <input
                    type="text"
                    value={profile.phone_number}
                    onChange={e => setProfile({...profile, phone_number: e.target.value})}
                    className="w-full p-3 border border-gray-300 rounded-full focus:ring-2 focus:ring-[#f880b8] outline-none"
                  />
                </div>

                <div className="flex gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="flex-1 bg-gray-200 text-gray-800 p-3 rounded-full hover:bg-gray-300 transition-all"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    className="flex-1 bg-[#f880b8] text-white p-3 rounded-full hover:bg-[#e0609a] transition-all disabled:bg-gray-400"
                  >
                    {loading ? 'Guardando...' : 'Guardar'}
                  </button>
                </div>
            </form>
          </div>
        </div>
      )}
    </div>
  </div>
  );
};
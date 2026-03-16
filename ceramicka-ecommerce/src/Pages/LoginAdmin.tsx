import { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Para el redireccionamiento
import { supabase } from '../lib/supabaseClient'; // Ajusta la ruta a tu archivo de configuración de Supabase  

export const LoginAdmin = () =>{
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e: React.FormEvent)=> {
        e.preventDefault();

        const {error} = await supabase.auth.signInWithPassword({
            email, 
            password,
        });

        if (error) {
            alert("error" + error.message);
        } else{
            navigate("/account");
        }
    }

    return (
        <form onSubmit={handleLogin}>
       <input type="email" onChange={(e) => setEmail(e.target.value)} value={email} className='bg-red-200'/>
       <input type="password" onChange={(e) => setPassword(e.target.value)} value={password} className='bg-red-100'/>
       <button type="submit" className='bg-green-200'>Entrar</button>
    </form>
    );
};

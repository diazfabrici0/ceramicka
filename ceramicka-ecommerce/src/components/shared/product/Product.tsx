import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getProdductById } from '../../../services/productService';
import { getAdminPhone } from '../../../services/profileService'; // Importamos el nuevo servicio

export const Product = () => {
    const { id } = useParams();
    const [producto, setProducto] = useState<any>();
    const [adminPhone, setAdminPhone] = useState<string>("");
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!id) return;

        // Cargamos el producto y el teléfono del admin
        Promise.all([
            getProdductById(id),
            getAdminPhone()
            
        ])
        .then(([productData, phone]) => {
            setProducto(productData);
            setAdminPhone(phone);
        })
        .catch(err => setError(err.message));
    }, [id]);

        const handleWhatsAppRedirect = () => {
        if (!producto || !adminPhone) {
            alert("Lo sentimos, el número de contacto no está disponible.");
            return;
        }
        console.log("Teléfono cargado para el cliente:", adminPhone);
        // 1. Limpiamos el número de cualquier caracter no numérico
        const cleanPhone = adminPhone.replace(/\D/g, '');

        // 2. Obtenemos la URL actual del producto
        const productUrl = window.location.href;

        // 3. Construimos el mensaje con el enlace incluido
        const message = `¡Hola! Me interesa comprar esta pieza: *${producto.name}*.\n\nAquí tienes el enlace del producto:\n${productUrl}`;
        
        const whatsappUrl = `https://api.whatsapp.com/send?phone=${cleanPhone}&text=${encodeURIComponent(message)}`;
        
        window.open(whatsappUrl, '_blank');
    };

    if (error) return <p className="text-center mt-10 text-red-500 font-bold italic">Error: {error}</p>;
    if (!producto) return <p className="text-center mt-10 text-pink-300 animate-pulse">Cargando pieza única...</p>;

    return (
        <div className="min-h-screen bg-white/50 flex items-center justify-center p-4">
            <div className="bg-white rounded-[40px] shadow-sm overflow-hidden max-w-5xl w-full flex flex-col md:flex-row items-center p-6 md:p-12 relative border border-pink-50">
                
                {/* Imagen Cuadrada */}
                <div className="w-full md:w-1/2 flex justify-center">
                    <div className="border-2 border-pink-400 p-1 rounded-xl w-full max-w-[400px]">
                        <div className="aspect-square w-full overflow-hidden rounded-lg bg-gray-100">
                            <img 
                                src={producto.images} 
                                alt={producto.name} 
                                className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                            />
                        </div>
                    </div>
                </div>

                {/* Información del Producto */}
                <div className="w-full md:w-1/2 mt-8 md:mt-0 md:pl-12 flex flex-col space-y-4">
                    <p className="text-pink-400 text-sm font-semibold uppercase tracking-widest">
                        {producto.category?.name || "Colección Artesanal"}
                    </p>
                    
                    <h1 className="text-3xl md:text-5xl font-bold text-gray-700 tracking-tight">
                        {producto.name}
                    </h1>

                    <p className="text-4xl text-slate-400 font-light italic">
                        ${producto.price}
                    </p>

                    <p className="text-gray-400 leading-relaxed text-base">
                        {producto.description}
                    </p>

                    <div className="pt-6">
                        <button 
                            onClick={handleWhatsAppRedirect}
                            className='bg-[#f880b8] hover:bg-[#d9679c] px-10 py-4 text-white rounded-full font-medium transition-all shadow-lg transform hover:-translate-y-1 flex items-center justify-center gap-3'
                        >
                            <span className="text-xl">Comprar por WhatsApp</span>
                        </button>
                    </div>
                </div>

                {/* Marca de agua decorativa */}
                <div className="hidden lg:block absolute -right-16 top-1/2 -translate-y-1/2 opacity-[0.03] pointer-events-none select-none">
                    <span className="text-[120px] font-black text-pink-900 rotate-90 inline-block">
                        CERÁMICKA
                    </span>
                </div>
            </div>
        </div>
    );
};
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getProdductById } from '../../../services/productService';

export const Product = () => {
    const { id } = useParams();
    const [producto, setProducto] = useState<any>();
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!id) return;

        getProdductById(id)
            .then(data => setProducto(data))
            .catch(err => setError(err.message));  
    }, [id]);

    if (error) return <p>Error: {error}</p>;
    if (!producto) return <p>Cargando producto...</p>;

    return(
        <div>
            <div>nombre {producto.name}</div>
            <p>Descripcion {producto.description}</p>
            <p>precio {producto.price}</p>
            {/* Renderizado de la imagen */}
            <div className="product-image-container">
                <img 
                    src={producto.images} 
                    alt={producto.name} 
                    style={{ maxWidth: '100%', height: 'auto', borderRadius: '8px' }} 
                />
            </div>
        </div>
    )
}
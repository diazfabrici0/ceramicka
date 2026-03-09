import { useParams } from 'react-router-dom';

export const Product = () => {
    const { id } = useParams();
    //const product = products.find(p => p.id === id);
    return(
        <div>producto {id}</div>
    )
}
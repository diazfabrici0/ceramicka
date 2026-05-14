import { useNavigate } from "react-router-dom";
import { CategoriesForm } from "../components/categories/CategoriesForm";
import { ProductsForm } from "../components/products/ProductForm";
import { useAuth } from "../hooks/useAuth";
import { useEffect } from "react";
import { GoBack } from "../components/shared/GoBack";

export const AdminPanel = () => {
    const { user, loading } = useAuth();
    const navigate = useNavigate();

    useEffect(()=>{
        if (!loading && !user) {
            navigate('/loginAdmin');
        }
    }, [user, loading, navigate])

    if(loading) return <p className="text-center text-gray-600">Autenticando...</p>;

    if(!user) return null;
    return (
        <div className="min-h-screen w-screen bg-white p-8 bg-[url(../../../img/patron.jpg)] bg-repeat bg-contain h-screen">
            <GoBack />
            <header className="max-w-4xl mx-auto mb-10 text-left">
                <h1 className="text-3xl font-bold text-[#f880b8]">Panel de Administración</h1>
                <p className="text-gray-600">Gestiona las categorías y productos de tu tienda.</p>
            </header>

            <main className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
                <section>
                    <h2 className="text-xl font-semibold mb-4 text-gray-700">Gestión de Productos</h2>
                    <ProductsForm />
                </section>

                <section>
                    <h2 className="text-xl font-semibold mb-4 text-gray-700">Gestión de Categorías</h2>
                    <CategoriesForm />
                </section>

            </main>
        </div>
    );
}
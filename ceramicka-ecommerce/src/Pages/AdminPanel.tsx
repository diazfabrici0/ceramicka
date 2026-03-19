import { useNavigate } from "react-router-dom";
import { CategoriesForm } from "../components/categories/CategoriesForm";
import { ProductsForm } from "../components/products/ProductForm";
import { useAuth } from "../hooks/useAuth";
import { useEffect } from "react";

export const AdminPanel = () => {
    const { user, loading } = useAuth();
    const navigate = useNavigate();

    useEffect(()=>{
        if (!loading && !user) {
            navigate('/loginAdmin');
        }
    }, [user, loading, navigate])

    if(loading) return <p>Autenticando...</p>;

    if(!user) return null;
    return (
        <div className="min-h-screen bg-gray-50 p-8">
            <header className="max-w-4xl mx-auto mb-10">
                <h1 className="text-3xl font-bold text-gray-900">Panel de Administración</h1>
                <p className="text-gray-600">Gestiona las categorías y productos de tu tienda.</p>
            </header>

            <main className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Sección de Categorías */}
                <section>
                    <h2 className="text-xl font-semibold mb-4 text-gray-700">Gestión de Categorías</h2>
                    <CategoriesForm />
                </section>

                {/* Aquí irá el formulario de Productos más adelante */}
                <section>
                    <ProductsForm />
                </section>
            </main>
        </div>
    );
}
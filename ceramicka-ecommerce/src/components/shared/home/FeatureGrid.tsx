import { MdLocalShipping } from "react-icons/md"

export const FeatureGrid = () => {
    return (
        <div className="grid grid-cols-2 gap-8 mt-6 bm-16 lg:grid-cols-4 lg:gap-5">
            <div className="flex items-center gap-6">
                <MdLocalShipping size={40} className="text-slate-600"/>

                <div className="space-y-1">
                    <p className="font-semibold">Envío Gratis</p>
                    <p className="text-sm">Envío gratuito en pedidos superiores a $50</p>
                </div>
            </div>

             <div className="flex items-center gap-6">
                <MdLocalShipping size={40} className="text-slate-600"/>

                <div className="space-y-1">
                    <p className="font-semibold">Envío Gratis</p>
                    <p className="text-sm">Envío gratuito en pedidos superiores a $50</p>
                </div>
            </div>

             <div className="flex items-center gap-6">
                <MdLocalShipping size={40} className="text-slate-600"/>

                <div className="space-y-1">
                    <p className="font-semibold">Envío Gratis</p>
                    <p className="text-sm">Envío gratuito en pedidos superiores a $50</p>
                </div>
            </div>
            
             <div className="flex items-center gap-6">
                <MdLocalShipping size={40} className="text-slate-600"/>

                <div className="space-y-1">
                    <p className="font-semibold">Envío Gratis</p>
                    <p className="text-sm">Envío gratuito en pedidos superiores a $50</p>
                </div>
            </div>
        </div>
    )
}
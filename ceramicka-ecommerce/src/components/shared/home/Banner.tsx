
export const Banner = () => {
    return (
        <div className="relative bg-gray-900 text-white p-10">
<div className="absolute inset-0 bg-cover bg-center opacity-90 h-full"
    style={{ 
        backgroundImage: "url('/img/bannerCactus2.png')",
        // Mantenemos tu posición personalizada para ajustar la "altura" del zoom
        backgroundPosition: 'center 56%', 
        backgroundSize: '100%'
    }}
>
</div>
            <div className="absolute inset-0 bg-black opacity-10">

            </div>

            <div className="relative z-10 flex flex-col items-center justify-center py-20 lg:py-4 text-center lg:px-8">
                <img src="../../../img/ceramickaLogo.png" alt="Logo" className="w-45 h-45 mr-2" />
            </div>
        </div>
    )
}
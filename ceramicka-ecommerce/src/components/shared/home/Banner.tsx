
export const Banner = () => {
    return (
        <div className="relative bg-gray-900 text-white p-4 md:p-10">
            <div className="absolute inset-0 bg-cover bg-center opacity-90 h-full"
                style={{
                    backgroundImage: "url('/img/bannerCactus2.png')",
                    backgroundPosition: 'center 56%',
                    backgroundSize: 'cover'
                }}
            >
            </div>
            <div className="absolute inset-0 bg-black opacity-10">
            </div>

            <div className="relative z-10 flex flex-col items-center justify-center py-12 md:py-20 lg:py-4 text-center px-4">
                <img src="../../../img/ceramickaLogo.png" alt="Logo" className="w-40 md:w-52 lg:w-64 h-auto" />
            </div>
        </div>
    )
}
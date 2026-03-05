export const Newsletter = () => {
    return (
        <div className="relative bg-gray-500 text-white py-20">
            <div className="absolute inset-0 bg-cover opacity-90 h-full"
                style={{ backgroundImage: "url('/img/background-newsletter.jpeg')",
                        backgroundPosition: 'center 22%',
                 }}>

            </div>
            <div className="container z-10 relative p-5 md:p-0">
                <div className="w-full text-black bg-white p-12 space-y-5 md:w-[50%] lg:w-[40%]">
                    <p className="text-xs uppercase font-semibold">Texto newsletter de ejemplo para ver</p>
                                    <p className="text-xs font-medium w-[80%] leading-5">
                    recibi noticias texto ejemplo
                </p>
                                    <form action="" className="flex flex-col gap-5 xl:flex-row">
                    <input type="email" className="border border-slate200 rounded-full focus-outline-none py-3 px-5 w-full text-xs font-medium"
                    placeholder="Correo Electronico" />

                 <button className="bg-black text-white font-semibold rounded-full uppercase traching-wider
                 py-3 text-xs xl:px-5"></button>
                </form>
                </div>


            </div>
        </div>
    )
}
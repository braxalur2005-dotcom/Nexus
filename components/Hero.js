function Hero({ setCurrentView }) {
    return (
        <div className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
            {/* Background Blobs */}
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-nexus-purple rounded-full mix-blend-screen filter blur-[100px] opacity-30 animate-blob"></div>
            <div className="absolute top-20 right-1/4 w-96 h-96 bg-nexus-blue rounded-full mix-blend-screen filter blur-[100px] opacity-30 animate-blob" style={{animationDelay: '2s'}}></div>
            <div className="absolute -bottom-32 left-1/3 w-96 h-96 bg-nexus-accent rounded-full mix-blend-screen filter blur-[100px] opacity-20 animate-blob" style={{animationDelay: '4s'}}></div>

            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <h1 className="text-5xl md:text-7xl font-bold mb-6">
                    Construimos el <span className="gradient-text">Futuro Digital</span>
                </h1>
                <p className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto">
                    Desarrollamos aplicaciones web profesionales, escalables y orientadas al usuario que impulsan tu negocio al siguiente nivel.
                </p>
                <div className="flex justify-center space-x-4">
                    <button onClick={() => setCurrentView('packages')} className="btn-primary">Ver Paquetes</button>
                    <button onClick={() => setCurrentView('contact')} className="btn-secondary">Contáctanos</button>
                </div>
            </div>
        </div>
    );
}
function Catalog() {
    // OJO: "pageUrl" es la página a la que se abre cada tarjeta al hacer clic en "Ver Detalles".
    // Por ahora apuntan a páginas de ejemplo en la carpeta /paginas. Sustituye cada URL por
    // la ruta o link real de la página que ya hiciste para ese proyecto (puede ser un archivo
    // local como "paginas/mi-pagina.html" o un link externo como "https://tusitio.com/proyecto").
    const items = [
        {
            id: 1,
            title: "Casa Mexa",
            description: "Restaurante moderno con diseño contemporáneo y ambiente acogedor y comida deliciosa.",
            image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRRiMw2Yu6w_1tFB83bgpugTFYzmzZBDonk3w&s",
            pageUrl: "https://braxalur2005-dotcom.github.io/Restaurante/"
        },
        {
            id: 2,
            title: "Finanzas",
            description: "Sistema de gestión financiera con reportes detallados y análisis de rendimiento.",
            image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            pageUrl: "https://avilamiguel1007.github.io/Finanzas/"
        },
        {
            id: 3,
            title: "Juego Retro",
            description: "Juego de arcade clásico con gráficos retro y gameplay emocionante.",
            image: "img/game.png",
            pageUrl: "https://braxalur2005-dotcom.github.io/Game/"
        },
        {
            id: 4,
            title: "Sports",
            description: "Plataforma de deportes con estadísticas en tiempo real y análisis de rendimiento.",
            image: "https://images.unsplash.com/photo-1556817411-31ae72fa3ea0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
            pageUrl: "https://braxalur2005-dotcom.github.io/sport/"
        },
        {
            id: 5,
            title: "Portafolio Creativo",
            description: "Diseño minimalista para artistas, fotógrafos y diseñadores que buscan mostrar su trabajo.",
            image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            pageUrl: "https://braxalur2005-dotcom.github.io/Portafolio/"
        },
        {
            id: 6,
            title: "CardioDx",
            description: "Sistema de diagnóstico cardiovascular con productos de análisis avanzado y reportes detallados.",
            image: "https://images.unsplash.com/photo-1551076805-e1869033e561?auto=format&fit=crop&q=80&w=1200",
            pageUrl: "https://braxalur2005-dotcom.github.io/CardioDx/"
        }
    ];

    return (
        <div className="pt-32 pb-20 px-4 max-w-7xl mx-auto">
            <div className="text-center mb-16">
                <h2 className="text-4xl font-bold mb-4">Nuestro <span className="gradient-text">Catálogo</span></h2>
                <p className="text-gray-400 max-w-2xl mx-auto">Explora algunos de nuestros diseños y soluciones digitales más recientes.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {items.map((item) => (
                    <div key={item.id} className="glass-panel group overflow-hidden flex flex-col">
                        <div className="relative h-48 overflow-hidden">
                            <img 
                                src={item.image} 
                                alt={item.title} 
                                className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-nexus-dark to-transparent opacity-80"></div>
                        </div>
                        <div className="p-6 flex-1 flex flex-col relative z-10 -mt-10 bg-nexus-dark/80 backdrop-blur-sm">
                            <h3 className="text-2xl font-bold mb-2">{item.title}</h3>
                            <p className="text-gray-400 text-sm mb-6 flex-1">{item.description}</p>
                            <button
                                onClick={() => window.open(item.pageUrl, '_blank')}
                                className="btn-secondary w-full group-hover:border-nexus-accent group-hover:bg-nexus-accent/10"
                            >
                                Ver Detalles
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
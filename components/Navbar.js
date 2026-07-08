function Navbar({ currentView, setCurrentView, user, setShowAuth }) {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const handleNavClick = (view) => {
        setCurrentView(view);
        setIsMobileMenuOpen(false);
    };

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 bg-nexus-dark/50 backdrop-blur-md border-b border-white/10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-20">
                    <div className="flex items-center cursor-pointer group" onClick={() => handleNavClick('home')}>
            <img src="img/WhatsApp Image 2026-06-28 at 4.27.02 PM.png" className="h-10" />
                        <span className="ml-2 text-3xl font-heading font-black tracking-widest group-hover:text-nexus-accent transition-colors">NEXUS</span>
                    </div>
                    
                    <div className="hidden md:block">
                        <div className="flex items-baseline space-x-8">
                            <button onClick={() => handleNavClick('home')} className={`hover:text-nexus-accent transition-all duration-300 hover:drop-shadow-[0_0_8px_rgba(59,130,246,0.8)] ${currentView==='home' ? 'text-nexus-accent font-semibold drop-shadow-[0_0_5px_rgba(59,130,246,0.5)]' : 'text-gray-300'}`}>Inicio</button>
                            <button onClick={() => handleNavClick('catalog')} className={`hover:text-nexus-accent transition-all duration-300 hover:drop-shadow-[0_0_8px_rgba(59,130,246,0.8)] ${currentView==='catalog' ? 'text-nexus-accent font-semibold drop-shadow-[0_0_5px_rgba(59,130,246,0.5)]' : 'text-gray-300'}`}>Catálogo</button>
                            <button onClick={() => handleNavClick('packages')} className={`hover:text-nexus-accent transition-all duration-300 hover:drop-shadow-[0_0_8px_rgba(59,130,246,0.8)] ${currentView==='packages' ? 'text-nexus-accent font-semibold drop-shadow-[0_0_5px_rgba(59,130,246,0.5)]' : 'text-gray-300'}`}>Paquetes</button>
                            <button onClick={() => handleNavClick('contact')} className={`hover:text-nexus-accent transition-all duration-300 hover:drop-shadow-[0_0_8px_rgba(59,130,246,0.8)] ${currentView==='contact' ? 'text-nexus-accent font-semibold drop-shadow-[0_0_5px_rgba(59,130,246,0.5)]' : 'text-gray-300'}`}>Contacto</button>
                        </div>
                    </div>
                    
                    <div className="hidden md:flex items-center">
                        {user ? (
                            <button onClick={() => handleNavClick('profile')} className="flex items-center space-x-2 bg-white/10 px-4 py-2 rounded-full hover:bg-white/20 transition">
                                <div className="icon-user text-xl"></div>
                                <span>{user.objectData.name.split(' ')[0]}</span>
                            </button>
                        ) : (
                            <button onClick={() => { setShowAuth(true); setIsMobileMenuOpen(false); }} className="btn-secondary py-2">
                                Iniciar Sesión
                            </button>
                        )}
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden flex items-center">
                        <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-gray-300 hover:text-white focus:outline-none">
                            <div className={isMobileMenuOpen ? "icon-x text-2xl" : "icon-menu text-2xl"}></div>
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu Dropdown */}
            {isMobileMenuOpen && (
                <div className="md:hidden bg-nexus-dark border-b border-white/10 absolute top-20 left-0 w-full animate-in slide-in-from-top-4 duration-300">
                    <div className="px-4 pt-2 pb-6 space-y-4 shadow-xl">
                        <button onClick={() => handleNavClick('home')} className="block w-full text-left px-3 py-2 text-base font-medium text-white hover:bg-white/5 rounded-md">Inicio</button>
                        <button onClick={() => handleNavClick('catalog')} className="block w-full text-left px-3 py-2 text-base font-medium text-white hover:bg-white/5 rounded-md">Catálogo</button>
                        <button onClick={() => handleNavClick('packages')} className="block w-full text-left px-3 py-2 text-base font-medium text-white hover:bg-white/5 rounded-md">Paquetes</button>
                        <button onClick={() => handleNavClick('contact')} className="block w-full text-left px-3 py-2 text-base font-medium text-white hover:bg-white/5 rounded-md">Contacto</button>
                        
                        <div className="pt-4 border-t border-white/10">
                            {user ? (
                                <button onClick={() => handleNavClick('profile')} className="w-full flex items-center justify-center space-x-2 bg-white/10 px-4 py-3 rounded-lg hover:bg-white/20 transition text-white">
                                    <div className="icon-user text-xl"></div>
                                    <span>Mi Perfil ({user.objectData.name.split(' ')[0]})</span>
                                </button>
                            ) : (
                                <button onClick={() => { setShowAuth(true); setIsMobileMenuOpen(false); }} className="w-full btn-primary py-3">
                                    Iniciar Sesión
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </nav>
    );
}

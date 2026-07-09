function Footer({ setCurrentView }) {
    return (
        <footer className="bg-nexus-dark border-t border-white/10 pt-16 pb-8 mt-auto relative z-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
                    <div className="md:col-span-2">
                        <div className="flex items-center cursor-pointer mb-4" onClick={() => setCurrentView('home')}>
                            <img src="img/WhatsApp Image 2026-06-28 at 4.27.02 PM.png" className="h-10" />
                            <span className="ml-2 text-3xl font-heading font-black tracking-widest">NEXUS</span>
                        </div>
                        <p className="text-gray-400 max-w-sm mb-6">
                            Transformando ideas en experiencias digitales extraordinarias. Construimos el futuro de la web, un píxel a la vez.
                        </p>
                        <div className="flex space-x-4">
                            <a href="https://www.instagram.com/nexus.atencion?igsh=eXZmdHE3eDNqcXEy&utm_source=qr" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-nexus-purple transition text-gray-400 hover:text-white">
                                <div className="icon-instagram text-xl"></div>
                            </a>
                            <a href="https://www.tiktok.com/@nexusshzbpq?_r=1&_d=f36ah91mcme50a&sec_uid=MS4wLjABAAAAlRJUd0X_Jkh5zuL2M9EFLWEyxf1RYNLqJwGO_JxJDcBWXEX2K43CGGUtXSlY7gaj&share_author_id=7659853509491819541&sharer_language=es&source=h5_m&u_code=f4c54jbkkdda01&item_author_type=1&utm_source=copy&tt_from=copy&enable_checksum=1&utm_medium=ios&share_link_id=010BBCDE-B373-4177-A28D-05B115B55BF0&user_id=7659853509491819541&sec_user_id=MS4wLjABAAAAlRJUd0X_Jkh5zuL2M9EFLWEyxf1RYNLqJwGO_JxJDcBWXEX2K43CGGUtXSlY7gaj&social_share_type=4&ug_btm=b8727,b0&utm_campaign=client_share&share_app_id=1233" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-black transition text-gray-400 hover:text-white">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-tiktok text-xl" viewBox="0 0 16 16">
                                    <path d="M9 0h1.98c.144.715.54 1.617 1.235 2.512C12.895 3.389 13.797 4 15 4v2c-1.753 0-3.07-.814-4-1.829V11a5 5 0 1 1-5-5v2a3 3 0 1 0 3 3z"/>
                                </svg>
                            </a>
                            <button onClick={() => setCurrentView('contact')} className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-nexus-blue transition text-gray-400 hover:text-white">
                                <div className="icon-mail text-xl"></div>
                            </button>
                        </div>
                    </div>
                    
                    <div>
                        <h4 className="text-white font-semibold mb-4">Enlaces Rápidos</h4>
                        <ul className="space-y-2">
                            <li><button onClick={() => setCurrentView('home')} className="text-gray-400 hover:text-nexus-accent transition">Inicio</button></li>
                            <li><button onClick={() => setCurrentView('catalog')} className="text-gray-400 hover:text-nexus-accent transition">Catálogo</button></li>
                            <li><button onClick={() => setCurrentView('packages')} className="text-gray-400 hover:text-nexus-accent transition">Paquetes</button></li>
                            <li><button onClick={() => setCurrentView('contact')} className="text-gray-400 hover:text-nexus-accent transition">Contacto</button></li>
                        </ul>
                    </div>
                    
                    <div>
                        <h4 className="text-white font-semibold mb-4">Legal</h4>
                        <ul className="space-y-2 text-gray-400">
                            <li className="hover:text-white cursor-pointer transition">Términos de Servicio</li>
                            <li className="hover:text-white cursor-pointer transition">Política de Privacidad</li>
                            <li className="hover:text-white cursor-pointer transition">Cookies</li>
                        </ul>
                    </div>
                </div>
                
                <div className="pt-8 border-t border-white/10 text-center">
                    <p className="text-gray-500">© 2026 Nexus Web Agency. Todos los derechos reservados.</p>
                </div>
            </div>
        </footer>
    );
}

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
                            <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-nexus-accent transition text-gray-400 hover:text-white">
                                <div className="icon-facebook text-xl"></div>
                            </a>
                            <a href="https://www.instagram.com/nexus.atencion?igsh=eXZmdHE3eDNqcXEy&utm_source=qr" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-nexus-purple transition text-gray-400 hover:text-white">
                                <div className="icon-instagram text-xl"></div>
                            </a>
                            <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-green-500 transition text-gray-400 hover:text-white">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-whatsapp" viewBox="0 0 16 16">
                                  <path d="M13.601 2.326A7.85 7.85 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.9 7.9 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.9 7.9 0 0 0 13.6 2.326zM7.994 14.521a6.6 6.6 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.56 6.56 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592m3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.73.73 0 0 0-.529.247c-.182.198-.691.677-.691 1.654s.71 1.916.81 2.049c.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232"/>
                                </svg>
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
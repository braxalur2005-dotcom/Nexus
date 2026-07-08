function Packages({ user, setShowAuth, onPurchaseSuccess }) {
    const [selectedPackage, setSelectedPackage] = useState(null);
    const [showPaymentModal, setShowPaymentModal] = useState(false);
    const [paymentMethod, setPaymentMethod] = useState('tarjeta');
    const [isProcessing, setIsProcessing] = useState(false);

    const packages = [
        {
            id: 'basico',
            name: 'Básico',
            price: 499,
            description: 'Ideal para pequeños negocios o portafolios personales.',
            features: [
                'Diseño Responsivo',
                'Unicamente 1 página',
                'Formulario de contacto',
                'SEO Básico',
                'Soporte por email (2 meses)'
            ]
        },
        {
            id: 'profesional',
            name: 'Profesional',
            price: 999,
            description: 'Para empresas en crecimiento que buscan destacar.',
            features: [
                'Todo lo del plan Básico',
                'Hasta 3 páginas',
                'Integración con redes sociales',
                'Blog autoadministrable',
                'SEO Avanzado',
                'Soporte prioritario (3 meses)'
            ],
            popular: true
        },
        {
            id: 'ecommerce',
            name: 'E-Commerce',
            price: 1899,
            description: 'Tienda en línea completa y escalable.',
            features: [
                'Todo lo del plan Profesional',
                'Catálogo de productos ilimitados',
                'Carrito de compras',
                'Pasarela de pagos',
                'Panel de administración',
                'Soporte continuo (6 meses)'
            ]
        }
    ];

    const handleAcquire = (pkg) => {
        if (!user) {
            setShowAuth(true);
        } else {
            setSelectedPackage(pkg);
            setShowPaymentModal(true);
        }
    };

    const handlePaymentSubmit = async (e) => {
        e.preventDefault();
        setIsProcessing(true);
        
        try {
            // Simulate payment processing
            await new Promise(resolve => setTimeout(resolve, 2000));

            // Registrar la compra y actualizar el paquete activo en nuestro servidor local
            await createPurchase({
                userId: user.objectId,
                packageId: selectedPackage.id,
                packageName: selectedPackage.name,
                amount: selectedPackage.price,
                paymentMethod: paymentMethod
            });

            onPurchaseSuccess(selectedPackage);
            setShowPaymentModal(false);
            
            // Simulate sending emails
            console.log(`Email enviado a ${user.objectData.email}: ¡Gracias por su compra!`);
            console.log(`Email enviado a empresa: Nueva compra del paquete ${selectedPackage.name} por ${user.objectData.name}`);
            
            alert('¡Pago exitoso! Hemos enviado un correo con los detalles de tu compra.');
            
        } catch (error) {
            console.error('Payment error:', error);
            alert('Hubo un error al procesar el pago. Inténtalo de nuevo.');
        } finally {
            setIsProcessing(false);
        }
    };

    return (
        <div className="pt-32 pb-20 px-4 max-w-7xl mx-auto">
            <div className="text-center mb-16">
                <h2 className="text-4xl font-bold mb-4">Nuestros <span className="gradient-text">Paquetes</span></h2>
                <p className="text-gray-400 max-w-2xl mx-auto">Selecciona el plan que mejor se adapte a las necesidades de tu proyecto.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {packages.map((pkg) => (
                    <div key={pkg.id} className={`glass-panel p-8 relative flex flex-col ${pkg.popular ? 'border-nexus-purple shadow-[0_0_30px_rgba(109,40,217,0.3)] transform scale-105 z-10' : ''}`}>
                        {pkg.popular && (
                            <div className="absolute top-0 right-0 bg-gradient-to-r from-nexus-blue to-nexus-purple text-white text-xs font-bold px-4 py-1.5 rounded-bl-xl rounded-tr-xl shadow-lg">
                                MÁS POPULAR
                            </div>
                        )}
                        <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-500"></div>
                        <h3 className="text-2xl font-bold mb-2 relative z-10">{pkg.name}</h3>
                        <p className="text-gray-400 mb-6 flex-1 relative z-10">{pkg.description}</p>
                        <div className="mb-6 relative z-10">
                            <span className="text-4xl font-bold">${pkg.price}</span>
                            <span className="text-gray-400">/proyecto</span>
                        </div>
                        <ul className="space-y-4 mb-8 flex-1 relative z-10">
                            {pkg.features.map((feature, i) => (
                                <li key={i} className="flex items-center text-sm text-gray-300">
                                    <div className="icon-circle-check text-nexus-accent mr-3 drop-shadow-[0_0_8px_rgba(59,130,246,0.6)]"></div>
                                    {feature}
                                </li>
                            ))}
                        </ul>
                        <button 
                            onClick={() => handleAcquire(pkg)}
                            className={pkg.popular ? 'btn-primary w-full' : 'btn-secondary w-full'}
                        >
                            Adquirir Paquete
                        </button>
                    </div>
                ))}
            </div>

            {/* Payment Modal */}
            {showPaymentModal && selectedPackage && (
                <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
                    <div className="glass-panel w-full max-w-md p-8 relative animate-in fade-in zoom-in duration-200">
                        <button 
                            onClick={() => setShowPaymentModal(false)}
                            className="absolute top-4 right-4 text-gray-400 hover:text-white"
                            disabled={isProcessing}
                        >
                            <div className="icon-x text-2xl"></div>
                        </button>
                        
                        <h2 className="text-2xl font-bold mb-6">Completar Compra</h2>
                        <div className="bg-white/5 p-4 rounded-xl mb-6">
                            <p className="text-sm text-gray-400">Paquete seleccionado:</p>
                            <p className="text-xl font-semibold text-nexus-pink">{selectedPackage.name}</p>
                            <p className="text-lg font-bold mt-2">Total: ${selectedPackage.price}</p>
                        </div>

                        <form onSubmit={handlePaymentSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-1">Método de Pago</label>
                                <select 
                                    className="w-full bg-nexus-dark/50 border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-nexus-accent focus:shadow-[0_0_15px_rgba(59,130,246,0.3)] transition-all"
                                    value={paymentMethod}
                                    onChange={(e) => setPaymentMethod(e.target.value)}
                                    disabled={isProcessing}
                                >
                                    <option value="tarjeta">Tarjeta de Crédito/Débito</option>
                                    <option value="paypal">PayPal</option>
                                    <option value="transferencia">Transferencia Bancaria</option>
                                </select>
                            </div>

                            {paymentMethod === 'tarjeta' && (
                                <div className="space-y-4">
                                    <input 
                                        type="text" 
                                        placeholder="Número de tarjeta" 
                                        required 
                                        className="w-full bg-nexus-dark/50 border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-nexus-pink"
                                        disabled={isProcessing}
                                    />
                                    <div className="flex space-x-4">
                                        <input 
                                            type="text" 
                                            placeholder="MM/AA" 
                                            required 
                                            className="w-1/2 bg-nexus-dark/50 border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-nexus-pink"
                                            disabled={isProcessing}
                                        />
                                        <input 
                                            type="text" 
                                            placeholder="CVC" 
                                            required 
                                            className="w-1/2 bg-nexus-dark/50 border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-nexus-pink"
                                            disabled={isProcessing}
                                        />
                                    </div>
                                    <input 
                                        type="text" 
                                        placeholder="Nombre en la tarjeta" 
                                        required 
                                        className="w-full bg-nexus-dark/50 border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-nexus-pink"
                                        disabled={isProcessing}
                                    />
                                </div>
                            )}

                            {paymentMethod === 'paypal' && (
                                <p className="text-sm text-gray-400 p-4 text-center">Serás redirigido a PayPal para completar tu pago de forma segura.</p>
                            )}

                            <button 
                                type="submit" 
                                disabled={isProcessing}
                                className="btn-primary w-full mt-6 flex justify-center items-center"
                            >
                                {isProcessing ? (
                                    <span className="flex items-center">
                                        <div className="icon-loader animate-spin mr-2"></div>
                                        Procesando...
                                    </span>
                                ) : (
                                    `Pagar $${selectedPackage.price}`
                                )}
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
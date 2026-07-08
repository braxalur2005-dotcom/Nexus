function AuthModal({ onClose, onLogin }) {
    const [isLogin, setIsLogin] = useState(true);
    const [formData, setFormData] = useState({ name: '', email: '', password: '' });
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setError('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        try {
            if (isLogin) {
                const user = await loginUser(formData.email, formData.password);
                if (user) {
                    onLogin(user);
                } else {
                    setError('Credenciales incorrectas');
                }
            } else {
                const user = await registerUser(formData.name, formData.email, formData.password);
                onLogin(user);
            }
        } catch (err) {
            setError(err.message || 'Ocurrió un error. Inténtalo de nuevo.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <div className="glass-panel w-full max-w-md p-8 relative animate-in fade-in zoom-in duration-200">
                <button 
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-400 hover:text-white"
                >
                    <div className="icon-x text-2xl"></div>
                </button>
                
                <div className="text-center mb-8">
                    <div className="flex justify-center mb-4">
                        <img src="img/WhatsApp Image 2026-06-28 at 4.27.02 PM.png" className="h-10" />
                    </div>
                    <h2 className="text-2xl font-bold">{isLogin ? 'Bienvenido de Nuevo' : 'Crear Cuenta'}</h2>
                    <p className="text-gray-400 text-sm mt-2">
                        {isLogin ? 'Inicia sesión para acceder a tu panel' : 'Únete a Nexus para gestionar tus proyectos'}
                    </p>
                </div>

                {error && (
                    <div className="bg-red-500/10 border border-red-500/50 text-red-400 px-4 py-3 rounded-lg mb-6 text-sm text-center">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                    {!isLogin && (
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-1">Nombre Completo</label>
                            <input 
                                type="text" 
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required 
                                className="w-full bg-nexus-dark/50 border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-nexus-pink"
                            />
                        </div>
                    )}
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1">Correo Electrónico</label>
                        <input 
                            type="email" 
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required 
                            className="w-full bg-nexus-dark/50 border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-nexus-pink"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1">Contraseña</label>
                        <input 
                            type="password" 
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            required 
                            className="w-full bg-nexus-dark/50 border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-nexus-pink"
                        />
                    </div>

                    <button 
                        type="submit" 
                        disabled={isLoading}
                        className="btn-primary w-full mt-6 flex justify-center items-center"
                    >
                        {isLoading ? (
                            <div className="icon-loader animate-spin text-xl"></div>
                        ) : (
                            isLogin ? 'Iniciar Sesión' : 'Registrarse'
                        )}
                    </button>
                </form>

                <div className="mt-6 text-center text-sm text-gray-400">
                    {isLogin ? '¿No tienes cuenta?' : '¿Ya tienes cuenta?'}
                    <button 
                        onClick={() => {setIsLogin(!isLogin); setError('');}}
                        className="text-nexus-pink font-semibold ml-2 hover:underline"
                    >
                        {isLogin ? 'Regístrate aquí' : 'Inicia Sesión'}
                    </button>
                </div>
            </div>
        </div>
    );
}
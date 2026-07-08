class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo.componentStack);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-nexus-dark text-white">
          <div className="text-center p-8 glass-panel">
            <h1 className="text-2xl font-bold mb-4">Algo salió mal</h1>
            <p className="text-gray-400 mb-4">Lo sentimos, ocurrió un error inesperado.</p>
            <button onClick={() => window.location.reload()} className="btn-primary">
              Recargar Página
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

function App() {
  const [currentView, setCurrentView] = useState('home');
  const [user, setUser] = useState(null);
  const [showAuth, setShowAuth] = useState(false);

  const handleLogin = (userData) => {
      setUser(userData);
      setShowAuth(false);
  };

  const handleLogout = () => {
      setUser(null);
      setCurrentView('home');
  };

  const handleUpdateUser = (updatedUser) => {
      setUser(updatedUser);
  };

  const handlePurchaseSuccess = (pkg) => {
      // Refresh user state with updated active package
      if (user) {
          setUser({
              ...user,
              objectData: {
                  ...user.objectData,
                  activePackage: pkg.name
              }
          });
      }
      setCurrentView('profile');
  };

  return (
    <div className="min-h-screen flex flex-col relative" data-name="app" data-file="app.js">
      <Navbar currentView={currentView} setCurrentView={setCurrentView} user={user} setShowAuth={setShowAuth} />
      
      <main className="flex-1">
        {currentView === 'home' && (
            <div>
                <Hero setCurrentView={setCurrentView} />
                <div className="max-w-7xl mx-auto px-4 py-20">
                    <h2 className="text-3xl font-bold text-center mb-12">Nuestros Servicios Destacados</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="glass-panel p-8 text-center group">
                            <div className="w-16 h-16 mx-auto bg-nexus-accent/10 rounded-2xl flex items-center justify-center mb-6 border border-nexus-accent/20 group-hover:bg-nexus-accent/20 transition-all duration-300">
                                <div className="icon-monitor text-nexus-accent text-3xl group-hover:scale-110 transition-transform"></div>
                            </div>
                            <h3 className="text-xl font-semibold mb-3">Desarrollo a Medida</h3>
                            <p className="text-gray-400">Aplicaciones construidas desde cero con las últimas tecnologías y arquitectura robusta.</p>
                        </div>
                        <div className="glass-panel p-8 text-center group">
                            <div className="w-16 h-16 mx-auto bg-nexus-purple/10 rounded-2xl flex items-center justify-center mb-6 border border-nexus-purple/20 group-hover:bg-nexus-purple/20 transition-all duration-300">
                                <div className="icon-smartphone text-nexus-purple text-3xl group-hover:scale-110 transition-transform"></div>
                            </div>
                            <h3 className="text-xl font-semibold mb-3">Diseño Responsivo</h3>
                            <p className="text-gray-400">Experiencias fluidas y adaptables en dispositivos móviles, tablets y escritorio.</p>
                        </div>
                        <div className="glass-panel p-8 text-center group">
                            <div className="w-16 h-16 mx-auto bg-nexus-blue/10 rounded-2xl flex items-center justify-center mb-6 border border-nexus-blue/20 group-hover:bg-nexus-blue/20 transition-all duration-300">
                                <div className="icon-rocket text-nexus-blue text-3xl group-hover:scale-110 transition-transform"></div>
                            </div>
                            <h3 className="text-xl font-semibold mb-3">Alto Rendimiento</h3>
                            <p className="text-gray-400">Carga ultra rápida y optimización extrema de SEO para destacar en buscadores.</p>
                        </div>
                    </div>
                </div>
            </div>
        )}
        
        {currentView === 'catalog' && <Catalog />}
        {currentView === 'packages' && <Packages user={user} setShowAuth={setShowAuth} onPurchaseSuccess={handlePurchaseSuccess} />}
        {currentView === 'contact' && <Contact />}
        {currentView === 'profile' && <Profile user={user} onLogout={handleLogout} onUpdateUser={handleUpdateUser} />}
      </main>

      <Footer setCurrentView={setCurrentView} />

      {showAuth && <AuthModal onClose={() => setShowAuth(false)} onLogin={handleLogin} />}
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ErrorBoundary>
    <App />
  </ErrorBoundary>
);
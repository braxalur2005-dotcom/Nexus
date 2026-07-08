function Profile({ user, onLogout, onUpdateUser }) {
    const [isEditing, setIsEditing] = useState(false);
    const [editForm, setEditForm] = useState({
        name: user?.objectData?.name || '',
        phone: user?.objectData?.phone || '',
        avatarUrl: user?.objectData?.avatarUrl || ''
    });
    const [isSaving, setIsSaving] = useState(false);

    if (!user) return null;

    const handleSaveProfile = async () => {
        setIsSaving(true);
        try {
            const updatedData = {
                ...user.objectData,
                name: editForm.name,
                phone: editForm.phone,
                avatarUrl: editForm.avatarUrl
            };
            const updatedUser = await updateUserProfile(user.objectId, updatedData);
            onUpdateUser(updatedUser);
            setIsEditing(false);
            alert('Perfil actualizado con éxito');
        } catch (error) {
            console.error(error);
            alert('Error al actualizar el perfil');
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <div className="pt-32 pb-20 px-4 max-w-4xl mx-auto min-h-screen">
            <div className="glass-panel p-8 md:p-12">
                <div className="flex flex-col md:flex-row justify-between items-center mb-10 pb-10 border-b border-white/10">
                    <div className="flex items-center space-x-6 mb-6 md:mb-0">
                        <div className="relative w-24 h-24 rounded-full overflow-hidden flex items-center justify-center text-4xl font-bold shadow-lg border-2 border-nexus-accent/30 bg-gradient-to-r from-nexus-blue to-nexus-purple">
                            {user.objectData.avatarUrl ? (
                                <img src={user.objectData.avatarUrl} alt="Avatar" className="w-full h-full object-cover" />
                            ) : (
                                <span>{user.objectData.name.charAt(0).toUpperCase()}</span>
                            )}
                        </div>
                        <div>
                            <h2 className="text-3xl font-bold">{user.objectData.name}</h2>
                            <p className="text-gray-400">{user.objectData.email}</p>
                            {user.objectData.phone && <p className="text-gray-500 text-sm">{user.objectData.phone}</p>}
                        </div>
                    </div>
                    <button onClick={onLogout} className="btn-secondary flex items-center space-x-2 text-red-400 border-red-400/30 hover:bg-red-400/10">
                        <div className="icon-log-out"></div>
                        <span>Cerrar Sesión</span>
                    </button>
                </div>

                {isEditing ? (
                    <div className="mb-10 p-6 bg-white/5 rounded-xl border border-white/10 animate-in fade-in duration-300">
                        <h3 className="text-xl font-bold mb-4">Editar Información</h3>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm text-gray-400 mb-1">Nombre Completo</label>
                                <input 
                                    type="text" 
                                    value={editForm.name} 
                                    onChange={(e) => setEditForm({...editForm, name: e.target.value})}
                                    className="w-full bg-nexus-dark/50 border border-white/20 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-nexus-accent"
                                />
                            </div>
                            <div>
                                <label className="block text-sm text-gray-400 mb-1">Teléfono</label>
                                <input 
                                    type="text" 
                                    value={editForm.phone} 
                                    onChange={(e) => setEditForm({...editForm, phone: e.target.value})}
                                    className="w-full bg-nexus-dark/50 border border-white/20 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-nexus-accent"
                                />
                            </div>
                            <div>
                                <label className="block text-sm text-gray-400 mb-1">URL Foto de Perfil (Opcional)</label>
                                <input 
                                    type="text" 
                                    value={editForm.avatarUrl} 
                                    onChange={(e) => setEditForm({...editForm, avatarUrl: e.target.value})}
                                    placeholder="https://ejemplo.com/mifoto.jpg"
                                    className="w-full bg-nexus-dark/50 border border-white/20 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-nexus-accent"
                                />
                            </div>
                            <div className="flex space-x-4 pt-4">
                                <button onClick={handleSaveProfile} disabled={isSaving} className="btn-primary">
                                    {isSaving ? 'Guardando...' : 'Guardar Cambios'}
                                </button>
                                <button onClick={() => setIsEditing(false)} className="btn-secondary">Cancelar</button>
                            </div>
                        </div>
                    </div>
                ) : null}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                        <h3 className="text-xl font-semibold mb-6 flex items-center">
                            <div className="icon-package text-nexus-pink mr-2"></div>
                            Estado de Cuenta
                        </h3>
                        <div className="bg-white/5 p-6 rounded-xl border border-white/10">
                            <p className="text-gray-400 mb-2">Paquete Activo</p>
                            <div className="flex items-end justify-between">
                                <h4 className="text-2xl font-bold text-nexus-purple">{user.objectData.activePackage || 'Gratis'}</h4>
                                {user.objectData.activePackage === 'Gratis' && (
                                    <span className="text-xs bg-gray-600 px-2 py-1 rounded text-white">Básico</span>
                                )}
                            </div>
                            <p className="text-sm text-gray-500 mt-4">
                                {user.objectData.activePackage === 'Gratis' 
                                    ? 'Actualiza tu paquete para obtener más beneficios.' 
                                    : 'Disfrutando de los beneficios premium.'}
                            </p>
                        </div>
                    </div>

                    <div>
                        <h3 className="text-xl font-semibold mb-6 flex items-center">
                            <div className="icon-settings text-nexus-blue mr-2"></div>
                            Opciones
                        </h3>
                        <div className="space-y-4">
                            <button onClick={() => setIsEditing(true)} className="w-full bg-white/5 hover:bg-white/10 p-4 rounded-xl border border-white/10 flex justify-between items-center transition text-left">
                                <span>Editar Perfil</span>
                                <div className="icon-chevron-right text-gray-400"></div>
                            </button>
                            <button className="w-full bg-white/5 hover:bg-white/10 p-4 rounded-xl border border-white/10 flex justify-between items-center transition text-left">
                                <span>Historial de Compras</span>
                                <div className="icon-chevron-right text-gray-400"></div>
                            </button>
                            <button className="w-full bg-white/5 hover:bg-white/10 p-4 rounded-xl border border-white/10 flex justify-between items-center transition text-left">
                                <span>Agregar Método de Pago</span>
                                <div className="icon-chevron-right text-gray-400"></div>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
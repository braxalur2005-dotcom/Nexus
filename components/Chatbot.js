function Chatbot() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        { role: 'assistant', text: '¡Hola! Soy el asistente de Nexus. ¿En qué puedo ayudarte hoy?' }
    ]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [leadMode, setLeadMode] = useState(false);
    const [leadData, setLeadData] = useState({ nombre: '', correo: '', duda: '' });
    const scrollRef = useRef(null);

    const getSessionId = () => {
        let id = localStorage.getItem('nexus_session_id');
        if (!id) {
            id = `sess_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;
            localStorage.setItem('nexus_session_id', id);
        }
        return id;
    };

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages, isOpen]);

    const handleSend = async (e) => {
        e.preventDefault();
        const text = input.trim();
        if (!text || isLoading) return;

        setMessages(prev => [...prev, { role: 'user', text }]);
        setInput('');
        setIsLoading(true);

        try {
            const sessionId = getSessionId();
            const result = await sendChatMessage(sessionId, text);
            setMessages(prev => [...prev, { role: 'assistant', text: result.reply }]);
        } catch (err) {
            setMessages(prev => [...prev, {
                role: 'assistant',
                text: 'No pude conectarme con el asistente. ¿Quieres dejar tu duda para que un asesor te contacte?'
            }]);
            setLeadMode(true);
        } finally {
            setIsLoading(false);
        }
    };

    const handleLeadSubmit = async (e) => {
        e.preventDefault();
        if (!leadData.duda.trim()) return;
        setIsLoading(true);
        try {
            await sendLead(leadData);
            setMessages(prev => [...prev, {
                role: 'assistant',
                text: '¡Gracias! Un asesor humano revisará tu duda y te contactará pronto.'
            }]);
            setLeadMode(false);
            setLeadData({ nombre: '', correo: '', duda: '' });
        } catch (err) {
            setMessages(prev => [...prev, { role: 'assistant', text: 'No se pudo enviar tu duda. Intenta de nuevo.' }]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="fixed bottom-6 right-6 z-50" data-name="chatbot" data-file="components/Chatbot.js">
            {isOpen && (
                <div className="glass-panel w-[90vw] max-w-sm mb-4 flex flex-col h-[28rem] shadow-2xl">
                    <div className="flex items-center justify-between p-4 border-b border-white/10">
                        <div className="flex items-center gap-2">
                            <div className="icon-bot text-nexus-accent text-xl"></div>
                            <span className="font-semibold">Asistente Nexus</span>
                        </div>
                        <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-white">
                            <div className="icon-x text-lg"></div>
                        </button>
                    </div>

                    <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-3">
                        {messages.map((m, i) => (
                            <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                                <div className={`max-w-[80%] px-3 py-2 rounded-xl text-sm ${
                                    m.role === 'user'
                                        ? 'bg-gradient-to-r from-nexus-blue to-nexus-purple text-white'
                                        : 'bg-white/10 text-gray-200'
                                }`}>
                                    {m.text}
                                </div>
                            </div>
                        ))}
                        {isLoading && (
                            <div className="flex justify-start">
                                <div className="bg-white/10 text-gray-400 px-3 py-2 rounded-xl text-sm">Escribiendo…</div>
                            </div>
                        )}
                    </div>

                    {leadMode ? (
                        <form onSubmit={handleLeadSubmit} className="p-3 border-t border-white/10 space-y-2">
                            <input
                                type="text"
                                placeholder="Tu nombre"
                                value={leadData.nombre}
                                onChange={e => setLeadData({ ...leadData, nombre: e.target.value })}
                                className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm outline-none focus:border-nexus-accent"
                            />
                            <input
                                type="email"
                                placeholder="Tu correo"
                                value={leadData.correo}
                                onChange={e => setLeadData({ ...leadData, correo: e.target.value })}
                                className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm outline-none focus:border-nexus-accent"
                            />
                            <textarea
                                placeholder="Cuéntanos tu duda"
                                value={leadData.duda}
                                onChange={e => setLeadData({ ...leadData, duda: e.target.value })}
                                className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm outline-none focus:border-nexus-accent resize-none"
                                rows="2"
                            />
                            <button type="submit" className="btn-primary w-full text-sm py-2" disabled={isLoading}>
                                Enviar a un asesor
                            </button>
                        </form>
                    ) : (
                        <form onSubmit={handleSend} className="p-3 border-t border-white/10 flex gap-2">
                            <input
                                type="text"
                                value={input}
                                onChange={e => setInput(e.target.value)}
                                placeholder="Escribe tu mensaje…"
                                className="flex-1 bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm outline-none focus:border-nexus-accent"
                                disabled={isLoading}
                            />
                            <button type="submit" className="btn-primary px-4 py-2 text-sm" disabled={isLoading}>
                                <div className="icon-send text-base"></div>
                            </button>
                        </form>
                    )}
                </div>
            )}

            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-14 h-14 rounded-full bg-gradient-to-r from-nexus-blue to-nexus-purple flex items-center justify-center shadow-[0_0_25px_rgba(109,40,217,0.6)] hover:scale-110 transition-transform"
            >
                <div className={`icon-${isOpen ? 'x' : 'message-circle'} text-2xl text-white`}></div>
            </button>
        </div>
    );
}

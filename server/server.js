// server.js
// Mini servidor proxy para el proyecto Nexus.
//
// ¿Por qué existe este servidor?
// El proyecto original fue exportado desde la plataforma Trickle.so y usaba funciones
// globales (invokeAIAgent, trickleListObjects, trickleCreateObject, trickleUpdateObject)
// que sólo funcionan DENTRO de esa plataforma. Fuera de ahí (por ejemplo, ejecutando estos
// archivos localmente o en tu propio hosting) esas funciones no existen y el sitio no
// funciona: el chat no responde, el login/registro no guarda nada, las compras no se
// procesan, etc.
//
// Este servidor reemplaza todo eso por algo real y autocontenido:
//  - /api/chat        -> llama de verdad a la IA de Anthropic (Claude), con memoria persistente
//  - /api/auth/*       -> login / registro con una base de datos en archivos JSON
//  - /api/users/:id    -> actualizar perfil
//  - /api/purchases    -> registrar compras y actualizar el paquete activo del usuario
//  - /api/leads        -> guarda las dudas que la IA no pudo resolver (modo "Automático")
//
// Cómo usarlo:
//   1) cd server && npm install
//   2) copia .env.example a .env y coloca tu ANTHROPIC_API_KEY
//   3) npm start
//   4) abre http://localhost:3000

require('dotenv').config();
const express = require('express');
const path = require('path');
const bcrypt = require('bcryptjs');

const store = require('./store');
const { chatWithAI } = require('./ai');

const app = express();
const PORT = process.env.PORT || 3000;
const PROJECT_ROOT = path.join(__dirname, '..');

app.use(express.json());

// Sirve todo el sitio estático (index.html, app.js, components/, paginas/, etc.)
app.use(express.static(PROJECT_ROOT));

// ---------- Utilidad ----------
function safeUser(user) {
    if (!user) return null;
    const { password, ...rest } = user.objectData;
    return { objectId: user.objectId, objectData: rest };
}

// ---------- CHAT (IA real con memoria persistente) ----------
app.post('/api/chat', async (req, res) => {
    try {
        const { sessionId, message } = req.body;
        if (!sessionId || !message) {
            return res.status(400).json({ error: 'Faltan sessionId o message' });
        }
        const result = await chatWithAI(sessionId, message);
        res.json(result);
    } catch (err) {
        console.error('Error en /api/chat:', err);
        res.status(500).json({ error: 'Error al hablar con el asistente' });
    }
});

// ---------- LEADS (dudas enviadas por el modo "Automático" del chat) ----------
app.post('/api/leads', (req, res) => {
    try {
        const { nombre, correo, duda } = req.body;
        const lead = store.createObject('nexus_lead', {
            nombre: nombre || '',
            correo: correo || '',
            duda: duda || '',
            fecha: new Date().toISOString(),
        });
        console.log('📩 Nuevo lead recibido para un asesor:', lead.objectData);
        res.json({ ok: true, lead });
    } catch (err) {
        console.error('Error en /api/leads:', err);
        res.status(500).json({ ok: false, error: 'No se pudo guardar la duda' });
    }
});

// ---------- AUTH ----------
app.post('/api/auth/register', async (req, res) => {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            return res.status(400).json({ error: 'Nombre, correo y contraseña son requeridos' });
        }
        const existing = store.findOne('nexus_user', u => u.objectData.email === email);
        if (existing) {
            return res.status(409).json({ error: 'Ese correo ya está registrado' });
        }
        const hashed = await bcrypt.hash(password, 10);
        const user = store.createObject('nexus_user', {
            name, email, password: hashed, activePackage: 'Gratis',
        });
        res.json({ user: safeUser(user) });
    } catch (err) {
        console.error('Error en /api/auth/register:', err);
        res.status(500).json({ error: 'Error al registrar usuario' });
    }
});

app.post('/api/auth/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = store.findOne('nexus_user', u => u.objectData.email === email);
        if (!user) return res.status(401).json({ error: 'Credenciales incorrectas' });

        const valid = await bcrypt.compare(password, user.objectData.password);
        if (!valid) return res.status(401).json({ error: 'Credenciales incorrectas' });

        res.json({ user: safeUser(user) });
    } catch (err) {
        console.error('Error en /api/auth/login:', err);
        res.status(500).json({ error: 'Error al iniciar sesión' });
    }
});

// ---------- USUARIOS ----------
app.put('/api/users/:id', (req, res) => {
    try {
        const items = store.readCollection('nexus_user');
        const existing = items.find(u => u.objectId === req.params.id);
        if (!existing) return res.status(404).json({ error: 'Usuario no encontrado' });

        const updatedData = { ...existing.objectData, ...req.body };
        delete updatedData.password; // el password no se toca desde este endpoint
        const updated = store.updateObject('nexus_user', req.params.id, {
            ...existing.objectData,
            ...updatedData,
        });
        res.json({ user: safeUser(updated) });
    } catch (err) {
        console.error('Error en PUT /api/users/:id:', err);
        res.status(500).json({ error: 'Error al actualizar usuario' });
    }
});

// ---------- COMPRAS ----------
app.post('/api/purchases', (req, res) => {
    try {
        const { userId, packageId, packageName, amount, paymentMethod } = req.body;
        const items = store.readCollection('nexus_user');
        const existing = items.find(u => u.objectId === userId);
        if (!existing) return res.status(404).json({ error: 'Usuario no encontrado' });

        const purchase = store.createObject('nexus_purchase', {
            userId, packageId, amount, paymentMethod, date: new Date().toISOString(),
        });

        const updatedUser = store.updateObject('nexus_user', userId, {
            ...existing.objectData,
            activePackage: packageName,
        });

        console.log(`✅ Compra registrada: usuario ${userId} adquirió ${packageName} por $${amount}`);
        res.json({ purchase, user: safeUser(updatedUser) });
    } catch (err) {
        console.error('Error en /api/purchases:', err);
        res.status(500).json({ error: 'Error al procesar la compra' });
    }
});

app.get('/api/purchases/:userId', (req, res) => {
    const items = store.readCollection('nexus_purchase').filter(p => p.objectData.userId === req.params.userId);
    res.json({ items });
});

app.listen(PORT, () => {
    console.log(`\n🚀 Servidor Nexus corriendo en http://localhost:${PORT}`);
});

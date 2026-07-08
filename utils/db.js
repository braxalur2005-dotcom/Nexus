// db.js
// Estas funciones hablan con nuestro propio mini servidor (server/server.js),
// que guarda todo en archivos JSON locales. No dependen de ninguna plataforma
// externa: el proyecto es 100% autocontenido.

const parseJsonSafe = async (res) => {
    const text = await res.text();
    try {
        return text ? JSON.parse(text) : {};
    } catch (e) {
        return { __raw: text };
    }
};

const loginUser = async (email, password) => {
    try {
        const res = await fetch('/api/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });
        const data = await parseJsonSafe(res);
        if (!res.ok) return null;
        return data.user;
    } catch (e) {
        console.error(e);
        return null;
    }
};

const registerUser = async (name, email, password) => {
    const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password })
    });
    const data = await parseJsonSafe(res);
    if (!res.ok) {
        throw new Error(data.error || data.__raw || 'No se pudo registrar');
    }
    return data.user;
};

const updateUserProfile = async (userId, updatedFields) => {
    const res = await fetch(`/api/users/${userId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedFields)
    });
    const data = await parseJsonSafe(res);
    if (!res.ok) {
        throw new Error(data.error || data.__raw || 'No se pudo actualizar el perfil');
    }
    return data.user;
};

const createPurchase = async ({ userId, packageId, packageName, amount, paymentMethod }) => {
    const res = await fetch('/api/purchases', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, packageId, packageName, amount, paymentMethod })
    });
    const data = await parseJsonSafe(res);
    if (!res.ok) {
        throw new Error(data.error || data.__raw || 'No se pudo procesar la compra');
    }
    return data;
};

const sendChatMessage = async (sessionId, message) => {
    const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sessionId, message })
    });
    const data = await parseJsonSafe(res);
    if (!res.ok) {
        throw new Error(data.error || data.__raw || 'No se pudo contactar al asistente');
    }
    return data;
};

const sendLead = async ({ nombre, correo, duda }) => {
    const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nombre, correo, duda })
    });
    const data = await parseJsonSafe(res);
    if (!res.ok) {
        throw new Error(data.error || data.__raw || 'No se pudo enviar la duda');
    }
    return data;
};

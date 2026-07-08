// ai.js
// Lógica del chat con IA real (Claude, de Anthropic) + memoria persistente por usuario.
// Llama directamente a la API pública de Anthropic (api.anthropic.com), sin pasar
// por ninguna plataforma intermedia. No depende de Trickle.so ni de invokeAIAgent.

const fs = require('fs');
const path = require('path');

const MEMORY_FILE = path.join(__dirname, 'data', 'memory.json');
const ANTHROPIC_API_URL = 'https://api.anthropic.com/v1/messages';
const MODEL = process.env.ANTHROPIC_MODEL || 'claude-sonnet-5';

function ensureMemoryFile() {
    const dir = path.dirname(MEMORY_FILE);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    if (!fs.existsSync(MEMORY_FILE)) fs.writeFileSync(MEMORY_FILE, '{}', 'utf8');
}

function readMemory() {
    ensureMemoryFile();
    try {
        return JSON.parse(fs.readFileSync(MEMORY_FILE, 'utf8') || '{}');
    } catch (e) {
        console.error('Error leyendo memory.json:', e);
        return {};
    }
}

function writeMemory(allMemory) {
    ensureMemoryFile();
    fs.writeFileSync(MEMORY_FILE, JSON.stringify(allMemory, null, 2), 'utf8');
}

function getSessionMemory(sessionId) {
    const all = readMemory();
    return all[sessionId] || { facts: {}, history: [] };
}

function saveSessionMemory(sessionId, sessionMemory) {
    const all = readMemory();
    all[sessionId] = sessionMemory;
    writeMemory(all);
}

const SYSTEM_PROMPT = `Eres el asistente virtual de Nexus, una empresa de desarrollo web.
Ayudas a los visitantes a entender los servicios, el catálogo y los paquetes disponibles,
y respondes dudas frecuentes sobre desarrollo web. Sé breve, claro y amable, en español.

Si aprendes algo relevante sobre el usuario durante la conversación (su nombre, el tipo de
proyecto que busca, su presupuesto aproximado, o dudas recurrentes), inclúyelo al FINAL de tu
respuesta en un bloque oculto con este formato exacto, en su propia línea:
[[MEMORY: {"clave": "valor", "otraClave": "otroValor"}]]
Si no aprendiste nada nuevo, no incluyas ese bloque. El usuario nunca ve ese bloque, así que
nunca lo menciones ni le hables sobre él.

Si no puedes resolver la duda del usuario, sugiere amablemente que puede dejar sus datos para
que un asesor humano lo contacte.`;

function extractMemoryBlock(text) {
    const match = text.match(/\[\[MEMORY:\s*(\{[\s\S]*?\})\s*\]\]/);
    if (!match) return { cleanText: text.trim(), newFacts: {} };
    let newFacts = {};
    try {
        newFacts = JSON.parse(match[1]);
    } catch (e) {
        console.error('No se pudo parsear el bloque de memoria:', e);
    }
    const cleanText = text.replace(match[0], '').trim();
    return { cleanText, newFacts };
}

async function chatWithAI(sessionId, userMessage) {
    const apiKey = process.env.ANTHROPIC_API_KEY;
    if (!apiKey) {
        return {
            reply: 'El asistente todavía no está conectado a la IA. Configura ANTHROPIC_API_KEY en server/.env para activarlo.',
            aiEnabled: false,
        };
    }

    const sessionMemory = getSessionMemory(sessionId);
    const factsText = Object.keys(sessionMemory.facts).length
        ? `Datos ya conocidos sobre este usuario: ${JSON.stringify(sessionMemory.facts)}`
        : 'Todavía no sabes nada sobre este usuario.';

    const messages = [
        ...sessionMemory.history.slice(-10),
        { role: 'user', content: userMessage },
    ];

    const res = await fetch(ANTHROPIC_API_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'x-api-key': apiKey,
            'anthropic-version': '2023-06-01',
        },
        body: JSON.stringify({
            model: MODEL,
            max_tokens: 500,
            system: `${SYSTEM_PROMPT}\n\n${factsText}`,
            messages,
        }),
    });

    if (!res.ok) {
        const errText = await res.text();
        console.error('Error de la API de Anthropic:', res.status, errText);
        return {
            reply: 'Hubo un problema al conectar con el asistente. Intenta de nuevo en un momento.',
            aiEnabled: true,
            error: true,
        };
    }

    const data = await res.json();
    const rawText = (data.content || [])
        .filter(block => block.type === 'text')
        .map(block => block.text)
        .join('\n');

    const { cleanText, newFacts } = extractMemoryBlock(rawText);

    sessionMemory.history = [
        ...messages,
        { role: 'assistant', content: rawText },
    ].slice(-20);
    sessionMemory.facts = { ...sessionMemory.facts, ...newFacts };
    saveSessionMemory(sessionId, sessionMemory);

    return { reply: cleanText, aiEnabled: true };
}

module.exports = { chatWithAI };

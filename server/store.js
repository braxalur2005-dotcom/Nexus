// store.js
// Mini "base de datos" basada en archivos JSON.
// Sustituye a las funciones trickleListObjects / trickleCreateObject / trickleUpdateObject
// que sólo existían dentro de la plataforma Trickle.so y no venían incluidas en el proyecto.

const fs = require('fs');
const path = require('path');

const DATA_DIR = path.join(__dirname, 'data');

function ensureDataDir() {
    if (!fs.existsSync(DATA_DIR)) {
        fs.mkdirSync(DATA_DIR, { recursive: true });
    }
}

function filePath(name) {
    return path.join(DATA_DIR, `${name}.json`);
}

function readCollection(name) {
    ensureDataDir();
    const file = filePath(name);
    if (!fs.existsSync(file)) {
        fs.writeFileSync(file, '[]', 'utf8');
    }
    try {
        const raw = fs.readFileSync(file, 'utf8');
        return JSON.parse(raw || '[]');
    } catch (e) {
        console.error(`Error leyendo colección ${name}:`, e);
        return [];
    }
}

function writeCollection(name, items) {
    ensureDataDir();
    fs.writeFileSync(filePath(name), JSON.stringify(items, null, 2), 'utf8');
}

function genId() {
    return `obj_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;
}

// Emula trickleListObjects(collection, limit, includeAll)
function listObjects(name, limit = 100) {
    const items = readCollection(name).slice(0, limit);
    return { items, total: items.length };
}

// Emula trickleCreateObject(collection, data)
function createObject(name, objectData) {
    const items = readCollection(name);
    const newObj = { objectId: genId(), objectData, createdAt: new Date().toISOString() };
    items.push(newObj);
    writeCollection(name, items);
    return newObj;
}

// Emula trickleUpdateObject(collection, objectId, newData)
function updateObject(name, objectId, objectData) {
    const items = readCollection(name);
    const idx = items.findIndex(i => i.objectId === objectId);
    if (idx === -1) throw new Error('Objeto no encontrado');
    items[idx] = { ...items[idx], objectData, updatedAt: new Date().toISOString() };
    writeCollection(name, items);
    return items[idx];
}

function findOne(name, predicate) {
    const items = readCollection(name);
    return items.find(predicate) || null;
}

module.exports = {
    listObjects,
    createObject,
    updateObject,
    findOne,
    readCollection,
    writeCollection,
};

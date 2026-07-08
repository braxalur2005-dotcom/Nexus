# Nexus – Sitio + Mini Servidor Proxy con IA real

## ¿Qué cambió respecto al proyecto original?

El proyecto venía exportado de Trickle.so y usaba funciones globales que **no existen
fuera de esa plataforma**: `invokeAIAgent`, `trickleListObjects`, `trickleCreateObject`,
`trickleUpdateObject`, además de cargar React/Babel/íconos desde `resource.trickle.so`.
Por eso el chat, el login/registro y las compras no funcionaban al abrir el sitio por
tu cuenta. Todo eso fue reemplazado y el proyecto ahora es 100% independiente:
las librerías de frontend se cargan desde unpkg (CDN público), y toda la base de datos
e IA corren en el mini servidor propio descrito abajo. Ya no queda ninguna referencia
a Trickle.so en el código.

Se agregó un **mini servidor proxy** (`/server`) en Node/Express que reemplaza todo eso:

- **`/api/chat`** → el asistente ahora es una IA real (Claude, de Anthropic), no un simulador.
  Además tiene **memoria persistente por usuario**: cada dato relevante que aprende
  (nombre, tipo de proyecto que busca, presupuesto, dudas frecuentes...) se guarda en
  `server/data/memory.json` y se vuelve a usar en la próxima conversación, así que
  literalmente "va aprendiendo" de cada usuario con el que habla.
- **`/api/auth/register` y `/api/auth/login`** → base de datos local en `server/data/nexus_user.json`
  (contraseñas guardadas con hash, nunca en texto plano).
- **`/api/purchases`** → registra compras y actualiza el paquete activo del usuario.
- **`/api/leads`** → guarda las dudas que la IA no pudo resolver (modo "Automático" del chat),
  en `server/data/nexus_lead.json`, para que un asesor humano las revise.

También se modificaron las tarjetas del **Catálogo**: cada botón "Ver Detalles" ahora
abre una página propia en una pestaña nueva (ver sección "Conectar tus propias páginas" abajo).

## ⚠️ Seguridad: rota tu API key

Si en algún momento tuviste una API key de Anthropic escrita directamente en
`server/.env.example` o en cualquier archivo dentro de este repositorio, considérala
comprometida y revócala en https://console.anthropic.com/settings/keys, luego genera una
nueva y colócala **solo** en tu `server/.env` local (ese archivo nunca se sube a git,
está en `.gitignore`).

## Cómo correrlo

```bash
cd server
npm install
cp .env.example .env
```

Edita `server/.env` y coloca tu API key de Anthropic:

```
ANTHROPIC_API_KEY=sk-ant-...
```

(Consíguela en https://console.anthropic.com/settings/keys — sin esto el chat responderá
con un mensaje de aviso en vez de conectarse a la IA, pero el resto del sitio funciona igual).

Luego arranca el servidor:

```bash
npm start
```

Y abre **http://localhost:3000** en el navegador. Este mismo servidor sirve el sitio
completo (HTML/JS/CSS) y la API, así que no necesitas nada más corriendo en paralelo.

## Conectar tus propias páginas a las tarjetas del catálogo

En `components/Catalog.js`, cada tarjeta tiene un campo `pageUrl`:

```js
{
    id: 1,
    title: "Web Corporativa",
    ...
    pageUrl: "paginas/web-corporativa.html"
}
```

Ahora mismo apuntan a páginas de ejemplo dentro de la carpeta `/paginas` (solo para que
los botones funcionen desde ya). Reemplaza cada archivo `.html` de esa carpeta por tu
página real, **o** cambia directamente el valor de `pageUrl` por la ruta/URL de la página
que ya hiciste (puede ser un archivo local o un link externo, por ejemplo
`"https://tusitio.com/proyecto-1"`). El botón abre esa página en una pestaña nueva.

## Cómo "aprende" el asistente

1. El usuario escribe algo en el chat.
2. El servidor le pasa a Claude toda la conversación **más** lo que ya sabe de ese usuario
   (guardado en `server/data/memory.json`, identificado por un `sessionId` guardado en el
   `localStorage` del navegador).
3. Claude responde y, de forma oculta al usuario, indica qué datos nuevos aprendió.
4. El servidor guarda esos datos nuevos en la memoria de ese usuario para la próxima vez.

Puedes ver la memoria acumulada de cualquier sesión abriendo `server/data/memory.json`
mientras el servidor corre.

## Estructura del proyecto

```
index.html, app.js, components/    → Frontend (React vía Babel, sin build step)
utils/db.js                        → Llama a la API del servidor (antes llamaba a Trickle)
server/
  server.js                        → Servidor Express (sirve el sitio + expone la API)
  ai.js                             → Lógica del chat con IA real + memoria
  store.js                         → Mini "base de datos" en archivos JSON
  data/                             → Se genera automáticamente al usar el sitio
paginas/                           → Páginas de destino de las tarjetas del catálogo (reemplázalas)
```

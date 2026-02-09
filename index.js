const wppconnect = require('@wppconnect-team/wppconnect');
const fs = require('fs');

wppconnect.create({
  session: 'bot-comandos',
  catchQR: (base64Qr, asciiQR) => {
    console.log('📱 Escanea el QR que aparece en la terminal');
    console.log(asciiQR); // Esto imprime el QR en la consola
  },
  statusFind: (statusSession) => {
    console.log('📡 Estado de sesión:', statusSession);
  },
  puppeteerOptions: {
    headless: true, // Cambia a false si quieres ver la ventana del navegador
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-dev-shm-usage'
    ]
  }
})
.then(client => {
  console.log('✅ Cliente iniciado correctamente');
  start(client);
})
.catch(err => {
  console.error('❌ Error al iniciar WPPConnect:', err);
});

function start(client) {
  // Las respuestas deben estar DENTRO de start
  const comandos = {
    "#8": "⚠️ Atención: 28 requiere apoyo visual, alerta y pendientes. Indica tu D y confirma 15 👀🚨",
    "#18": "🚨 URGENTE: 28 en problemas. Se requiere escucha inmediata para indicaciones. Si estás cerca indica VOY 📢⚠️",
    "mamá": "🆘 Bajen urgentemente al pasajero 28. Se encuentra en peligro inmediato 🚨🚗",
    "claves": `🚨 CLAVES NECESARIAS PARA UNA EMERGENCIA 🚨\n\n... (tu lista de claves)`
  };

  client.onMessage(async (message) => {
    // Evita responderse a sí mismo o mensajes vacíos
    if (!message.body || message.from === 'status@broadcast') return;

    const texto = message.body.toLowerCase().trim();

    // 📁 LOG DE MENSAJES
    try {
      fs.appendFileSync(
        'log.txt',
        `${new Date().toLocaleString()} | ${message.from} | ${message.body}\n`
      );
    } catch (e) {
      console.error("Error escribiendo log:", e);
    }

    // 🔑 LÓGICA DE RESPUESTA
    // 1. Comando exacto
    if (comandos[texto]) {
      await client.sendText(message.from, comandos[texto]);
      return;
    }

    // 2. Detección por palabras clave (contiene)
    if (texto.includes('#8')) {
      await client.sendText(message.from, comandos['#8']);
    } 
    else if (texto.includes('#18')) {
      await client.sendText(message.from, comandos['#18']);
    } 
    else if (texto.includes('mamá') || texto.includes('mama')) {
      await client.sendText(message.from, comandos['mamá']);
    }
    else if (texto === 'claves') {
      await client.sendText(message.from, comandos['claves']);
    }
  });
}

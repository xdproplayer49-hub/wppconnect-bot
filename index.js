const wppconnect.create({
  session: 'bot-comandos',
  catchQR: () => {
    console.log('📱 Escanea el QR con WhatsApp');
  },
  puppeteerOptions: {
    headless: true,
    executablePath: process.env.CHROME_BIN,
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-dev-shm-usage'
    ]
  }
}).then(client => start(client));


function start(client) {

  const comandos = {

    "#8": "⚠️ Atención: 28 requiere apoyo visual, alerta y pendientes. Indica tu D y confirma 15 👀🚨",

    "#18": "🚨 URGENTE: 28 en problemas. Se requiere escucha inmediata para indicaciones. Si estás cerca indica VOY 📢⚠️",

    "mamá": "🆘 Bajen urgentemente al pasajero 28. Se encuentra en peligro inmediato 🚨🚗",

    "claves": `🚨 CLAVES NECESARIAS PARA UNA EMERGENCIA 🚨

🚻 00 BAÑO
🍽️ 04 COMIDA
⚡ 06 RÁPIDO
⚠️ 07 PRECAUCIÓN
👂 08 A LA ESCUCHA
✅ 10 LIBRE
🚗 11 SERVICIO PLATAFORMA
🚶 12 SERVICIO POR FUERA
🍽️ 13 SERVICIO BANQUETERO
🛡️ 14 MONITOREAR / ESCOLTAR
📍 15 DESTINO
🔫 16 PISTOLA
🚨 18 EMERGENCIA
📌 20 UBICACIÓN
✔️ 21 SI / PROCEDER
❌ 23 NO / CANCELAR
💊 25 DROGADO
🕵️ 26 SOSPECHOSO
👥 28 COMPAÑERO
🦹 30 LADRÓN
ℹ️ 40 INFORMACIÓN
🏳️‍🌈 41 GAY
🔒 50 MENSAJE PRIVADO
👨 51 HOMBRE
👩 52 MUJER
👨‍👩‍👧 53 FAMILIA
📦 54 PAQUETE
🍺 55 BORRACHO
🛣️ 57 CARRETERA FORÁNEA
🚫 69 ACOSO
🚶‍♂️ 73 MOVILIDAD
🏨 81 HOTEL
🏠 85 CASA
🎡 100 FERIA
💼 400 TRABAJO
🥊 600 PELEA
😴 ZZZ DORMIR
🎯 CC CENTRAL
🏙️ 1ER CUADRO: CENTRO
🚓 10200 POLICÍA`
  };

  client.onMessage(message => {
    if (!message.body) return;

    const texto = message.body.toLowerCase().trim();

    // 📁 LOG DE MENSAJES
    fs.appendFileSync(
      'log.txt',
      `${new Date().toISOString()} | ${message.from} | ${message.body}\n`
    );

    // 🔑 RESPUESTA POR COMANDO
    if (comandos[texto]) {
      client.sendText(message.from, comandos[texto]);
    }

    // 🚨 DETECCIÓN DENTRO DE FRASES
    if (texto.includes("8")) {
      client.sendText(message.from, comandos["#8"]);
    }

    if (texto.includes("18")) {
      client.sendText(message.from, comandos["#18"]);
    }
  });
}

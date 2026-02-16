const http = require('http');
const fs = require('fs');
const path = require('path');
const os = require('os');

const PORT = 8080;

// MIME types
const mimeTypes = {
    '.html': 'text/html',
    '.js': 'text/javascript',
    '.css': 'text/css',
    '.json': 'application/json',
    '.png': 'image/png',
    '.jpg': 'image/jpg',
    '.gif': 'image/gif',
    '.svg': 'image/svg+xml',
    '.ico': 'image/x-icon'
};

// Get local IP
function getLocalIP() {
    const interfaces = os.networkInterfaces();
    for (const name of Object.keys(interfaces)) {
        for (const iface of interfaces[name]) {
            if (iface.family === 'IPv4' && !iface.internal) {
                return iface.address;
            }
        }
    }
    return 'localhost';
}

const server = http.createServer((req, res) => {
    console.log(`📥 ${req.method} ${req.url}`);

    let filePath = '.' + req.url;
    if (filePath === './') {
        filePath = './index.html';
    }

    const extname = String(path.extname(filePath)).toLowerCase();
    const contentType = mimeTypes[extname] || 'application/octet-stream';

    fs.readFile(filePath, (error, content) => {
        if (error) {
            if (error.code === 'ENOENT') {
                res.writeHead(404, { 'Content-Type': 'text/html' });
                res.end('<h1>404 - Arquivo não encontrado</h1>', 'utf-8');
            } else {
                res.writeHead(500);
                res.end(`Erro no servidor: ${error.code}`, 'utf-8');
            }
        } else {
            res.writeHead(200, { 'Content-Type': contentType });
            res.end(content, 'utf-8');
        }
    });
});

server.listen(PORT, () => {
    const localIP = getLocalIP();
    console.log('\n🌍 ================================');
    console.log('   LinguaAI - Servidor Local PWA');
    console.log('================================\n');
    console.log(`✅ Servidor rodando em:\n`);
    console.log(`   🖥️  Local:   http://localhost:${PORT}`);
    console.log(`   📱 Rede:    http://${localIP}:${PORT}\n`);
    console.log('📱 PARA ACESSAR NO IPHONE:\n');
    console.log(`   1. Conecte o iPhone na MESMA rede Wi-Fi`);
    console.log(`   2. Abra o Safari no iPhone`);
    console.log(`   3. Digite: http://${localIP}:${PORT}`);
    console.log(`   4. Toque em "Compartilhar" ⎋`);
    console.log(`   5. "Adicionar à Tela de Início" ➕\n`);
    console.log('⏹️  Para parar: Ctrl+C\n');
    console.log('================================\n');
});

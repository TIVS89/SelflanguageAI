#!/bin/bash

# LinguaAI PWA - Script de Servidor Local
echo "🌍 LinguaAI - Iniciando Servidor PWA..."
echo "======================================"
echo ""

# Verificar Node.js
if ! command -v node &> /dev/null; then
    echo "❌ Node.js não encontrado!"
    echo "📥 Instale Node.js: https://nodejs.org/"
    echo ""
    echo "Ou use Python (já vem no Windows/Mac):"
    echo "   python -m http.server 8080"
    exit 1
fi

echo "✅ Node.js encontrado: $(node --version)"
echo ""

# Iniciar servidor
echo "🚀 Iniciando servidor..."
echo ""

node server.js

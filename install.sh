#!/bin/bash

# --- Termux Symbiont Installer ---
# Script ini akan mengatur seluruh lingkungan pengembangan.

# Warna untuk output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${GREEN}Memulai instalasi Termux Symbiont...${NC}"

# Langkah 1: Memeriksa dan menginstal dependensi dasar
echo -e "\n${YELLOW}--> Langkah 1: Memeriksa dependensi...${NC}"
pkg install nodejs git -y

# Langkah 2: Instalasi code-server dari repositori TUR
echo -e "\n${YELLOW}--> Langkah 2: Menginstal code-server...${NC}"
pkg install tur-repo -y
pkg install code-server -y

# Langkah 3: Instalasi dependensi untuk proyek
echo -e "\n${YELLOW}--> Langkah 3: Menginstal dependensi proyek...${NC}"
echo "Menginstal dependensi untuk Jembatan API..."
cd ./bridge && npm install && cd ..

echo "Menginstal dependensi untuk Ekstensi VS Code..."
cd ./extension && npm install && cd ..

# Langkah 4: Melakukan Sideloading Ekstensi secara otomatis
echo -e "\n${YELLOW}--> Langkah 4: Menghubungkan ekstensi ke code-server (Sideloading)...${NC}"
EXTENSION_DIR="$HOME/.local/share/code-server/extensions"
PROJECT_DIR=$(pwd)
EXTENSION_NAME="antonpras.termux-symbiont-0.0.1"

# Membuat direktori ekstensi jika belum ada
mkdir -p "$EXTENSION_DIR"

# Membuat symbolic link
if [ -L "${EXTENSION_DIR}/${EXTENSION_NAME}" ]; then
    echo "Symbolic link sudah ada. Melewati."
else
    ln -s "${PROJECT_DIR}/extension" "${EXTENSION_DIR}/${EXTENSION_NAME}"
    echo "Ekstensi berhasil di-sideload."
fi

echo -e "\n${GREEN}=== INSTALASI SELESAI ===${NC}"
echo "Anda sekarang siap untuk memulai."
echo "Untuk menjalankan, buka dua sesi Termux:"
echo "1. Jalankan code-server dengan perintah: ${YELLOW}code-server${NC}"
echo "2. Jalankan Jembatan API dengan perintah: ${YELLOW}node ~/termux-symbiont/bridge/server.js${NC}"

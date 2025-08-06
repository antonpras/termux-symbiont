const vscode = require('vscode');
const fetch = require('node-fetch'); // Import modul untuk membuat permintaan HTTP

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
    console.log('Ekstensi "Termux Symbiont" sekarang aktif!');

    // Ganti perintah 'helloWorld' dengan 'pingApiBridge'
    let disposable = vscode.commands.registerCommand('termux-symbiont.pingApiBridge', async function () {
        // Tampilkan pesan bahwa kita sedang mencoba...
        vscode.window.showInformationMessage('Menghubungi Jembatan API...');

        try {
            // Buat permintaan ke server backend kita
            const response = await fetch('http://localhost:3001/api/ping');
            const data = await response.json();

            // Tampilkan pesan sukses dengan data dari server
            vscode.window.showInformationMessage(`Sukses! Pesan dari Jembatan: "${data.message}"`);

        } catch (error) {
            // Jika gagal, tampilkan pesan error
            console.error('Gagal menghubungi Jembatan API:', error);
            vscode.window.showErrorMessage('Gagal menghubungi Jembatan API. Pastikan server bridge sudah berjalan.');
        }
    });

    context.subscriptions.push(disposable);
}

function deactivate() {}

module.exports = {
    activate,
    deactivate
}

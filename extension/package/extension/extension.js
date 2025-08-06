const vscode = require('vscode');

/**
 * @param {vscode.ExtensionContext} context
  */
  function activate(context) {
      console.log('Ekstensi "Termux Symbiont" sekarang aktif!');

	      let disposable = vscode.commands.registerCommand('termux-symbiont.helloWorld', function () {
		          vscode.window.showInformationMessage('Hello from Termux Symbiont!');
				      });

					      context.subscriptions.push(disposable);
						  }

						  function deactivate() {}

						  module.exports = {
						      activate,
							      deactivate
								  }
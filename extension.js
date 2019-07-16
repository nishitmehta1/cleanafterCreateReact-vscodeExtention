// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');
const fs = require('fs');
const path = require('path');
// this method is called when your extension is activated
// your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
  // Use the console to output diagnostic information (console.log) and errors (console.error)
  // This line of code will only be executed once when your extension is activated
  console.log(
    'Congratulations, your extension "cleanup-after-react" is now active!'
  );

  // The command has been defined in the package.json file
  // Now provide the implementation of the command with  registerCommand
  // The commandId parameter must match the command field in package.json
  let disposable = vscode.commands.registerCommand(
    'extension.createAppjs',
    function() {
      // The code you place here will be executed every time your command is executed
      const app = `import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

class App extends Component {
	render() {
		return (
			<div>
				
			</div>
		);
	}
}

export default App;			
			`;

      const folderPath = vscode.workspace.rootPath;

      console.log(folderPath);

      fs.writeFile(path.join(folderPath, '/src/App.js'), app, err => {
        if (err) {
          console.log(err);
          return vscode.window.showErrorMessage(
            'Failed to create cleaned App.js'
          );
        }
        vscode.window.showInformationMessage('Created Cleaned App.js');
      });

      fs.unlink(path.join(folderPath, '/src/logo.svg'), err => {
        if (err) {
          console.log(err, 'Could not delete logo.svg');
        }
      });
    }
  );

  context.subscriptions.push(disposable);
}
exports.activate = activate;

// this method is called when your extension is deactivated
function deactivate() {}

module.exports = {
  activate,
  deactivate
};

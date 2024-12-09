import * as vscode from 'vscode';
import { generateTestFile } from './testGenerator';

export function activate(context: vscode.ExtensionContext) {
    // Register the command
    let disposable = vscode.commands.registerCommand(
        'chatgptTestGenerator.generateTests', 
        generateTestFile
    );

    // Add the command to the subscriptions
    context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivated
export function deactivate() {}
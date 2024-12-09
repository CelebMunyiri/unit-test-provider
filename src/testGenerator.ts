import * as vscode from 'vscode';
import * as path from 'path';
import * as fs from 'fs';
import { OpenAIService } from './utils/openaiService';

export async function generateTestFile() {
    // Get the current active text editor
    const editor = vscode.window.activeTextEditor;
    if (!editor) {
        vscode.window.showErrorMessage('No active file');
        return;
    }

    // Get the current file details
    const currentFilePath = editor.document.fileName;
    const fileContent = editor.document.getText();
    
    // Ask for test requirements
    const requirements = await vscode.window.showInputBox({
        prompt: 'Enter test requirements for this file',
        placeHolder: 'Describe the specific test cases and scenarios you want to cover'
    });

    if (!requirements) {
        vscode.window.showWarningMessage('No requirements provided. Test generation cancelled.');
        return;
    }

    // Get OpenAI API Key from configuration
    const config = vscode.workspace.getConfiguration('chatgptTestGenerator');
    const apiKey = config.get<string>('openaiApiKey');

    if (!apiKey) {
        vscode.window.showErrorMessage('OpenAI API Key not configured. Please set it in VS Code settings.');
        return;
    }

    try {
        // Create OpenAI service
        const openaiService = new OpenAIService(apiKey);

        // Generate tests
        const generatedTests = await openaiService.generateTests(fileContent, requirements);

        // Determine test file path (next to the original file)
        const testFilePath = path.join(
            path.dirname(currentFilePath), 
            `${path.basename(currentFilePath, path.extname(currentFilePath))}.test${path.extname(currentFilePath)}`
        );

        // Write tests to file
        fs.writeFileSync(testFilePath, generatedTests);

        // Open the new test file
        const testDocument = await vscode.workspace.openTextDocument(testFilePath);
        await vscode.window.showTextDocument(testDocument);

        vscode.window.showInformationMessage('Tests generated successfully!');
    } catch (error) {
        vscode.window.showErrorMessage(`Failed to generate tests: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
}
"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateTestFile = generateTestFile;
const vscode = __importStar(require("vscode"));
const path = __importStar(require("path"));
const fs = __importStar(require("fs"));
const openaiService_1 = require("./utils/openaiService");
async function generateTestFile() {
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
    const apiKey = config.get('openaiApiKey');
    if (!apiKey) {
        vscode.window.showErrorMessage('OpenAI API Key not configured. Please set it in VS Code settings.');
        return;
    }
    try {
        // Create OpenAI service
        const openaiService = new openaiService_1.OpenAIService(apiKey);
        // Generate tests
        const generatedTests = await openaiService.generateTests(fileContent, requirements);
        // Determine test file path (next to the original file)
        const testFilePath = path.join(path.dirname(currentFilePath), `${path.basename(currentFilePath, path.extname(currentFilePath))}.test${path.extname(currentFilePath)}`);
        // Write tests to file
        fs.writeFileSync(testFilePath, generatedTests);
        // Open the new test file
        const testDocument = await vscode.workspace.openTextDocument(testFilePath);
        await vscode.window.showTextDocument(testDocument);
        vscode.window.showInformationMessage('Tests generated successfully!');
    }
    catch (error) {
        vscode.window.showErrorMessage(`Failed to generate tests: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
}
//# sourceMappingURL=testGenerator.js.map
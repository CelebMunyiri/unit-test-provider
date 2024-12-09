import OpenAI from 'openai';
import * as vscode from 'vscode';

export class OpenAIService {
    private openai: OpenAI;

    constructor(apiKey: string = "") {
        this.openai = new OpenAI({ apiKey });
    }

    async generateTests(fileContent: string, requirements: string): Promise<string> {
        try {
            const response = await this.openai.chat.completions.create({
                model: "gpt-4.o-turbo",
                messages: [
                    {
                        role: "system",
                        content: "You are an expert in generating unit tests for Node.js and mongodb applications. Provide comprehensive test cases based on the given requirements."
                    },
                    {
                        role: "user",
                        content: `File Content:
${fileContent}

Requirements: 
${requirements}

Please generate comprehensive unit tests using Jest framework that cover the requirements and test various scenarios.`
                    }
                ],
                max_tokens: 2500
            });

            const generatedTests = response.choices[0].message.content?.trim() || '';
            return generatedTests;
        } catch (error) {
            vscode.window.showErrorMessage(`Error generating tests: ${error instanceof Error ? error.message : 'Unknown error'}`);
            throw error;
        }
    }
}
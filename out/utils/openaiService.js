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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OpenAIService = void 0;
const openai_1 = __importDefault(require("openai"));
const vscode = __importStar(require("vscode"));
class OpenAIService {
    constructor(apiKey = "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") {
        this.openai = new openai_1.default({ apiKey });
    }
    async generateTests(fileContent, requirements) {
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
        }
        catch (error) {
            vscode.window.showErrorMessage(`Error generating tests: ${error instanceof Error ? error.message : 'Unknown error'}`);
            throw error;
        }
    }
}
exports.OpenAIService = OpenAIService;
//# sourceMappingURL=openaiService.js.map
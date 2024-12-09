# ChatGPT Test Generator

## Overview
This VS Code extension helps developers generate unit tests using ChatGPT based on specific requirements. It streamlines the test creation process by leveraging AI to generate comprehensive test cases.

## Features
- Generate unit tests for your Node.js files
- Provide specific requirements for test generation
- Supports multiple JavaScript/TypeScript test scenarios

## Prerequisites
- VS Code 1.80.0 or higher
- OpenAI API Key

## Installation
1. Install the extension from the VS Code Marketplace
2. Configure your OpenAI API Key in VS Code Settings

## Configuration
1. Open VS Code Settings
2. Search for "ChatGPT Test Generator"
3. Enter your OpenAI API Key in the "Chatgpt Test Generator: Openai Api Key" field

## Usage
1. Open the file you want to generate tests for
2. Press `Ctrl+Shift+P` (Windows/Linux) or `Cmd+Shift+P` (Mac)
3. Type "Generate Tests with ChatGPT"
4. Enter the specific requirements for your tests
5. The extension will generate a test file next to your original file

## Example
- Open `userService.js`
- Run the command
- Enter requirements: "Test user authentication, validation, and error handling"
- A `userService.test.js` will be generated with comprehensive tests

## Limitations
- Requires an active OpenAI API subscription
- Test quality depends on the clarity of your requirements
- May require manual refinement of generated tests

## Troubleshooting
- Ensure your API Key is correctly configured
- Check that you have an active OpenAI subscription
- Verify internet connectivity

## License
[Nathan Digital Licence]

## Support
For issues or feature requests, please contact [support@nathandigital.com]
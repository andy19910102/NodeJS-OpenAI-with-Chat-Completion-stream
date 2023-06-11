# NodeJS OpenAI with Chat Completion stream

This project simply demo an example for using NodeJS OpenAI with Chat Completion stream.

This demo showcases a conversation with the GPT-3.5-turbo model. It requests a poem from the AI, and the AI's response is streamed back in real-time, with each chunk of data logged to the console as it arrives.

Please note: The project is a basic demo designed for educational purposes, and may need modifications to handle production-level traffic or handle edge cases.

## Installation & Usage

Clone this repository and install the dependencies by running `npm install`.

Next, create an .env file in the root directory of the project, and add your OpenAI API key:

```
OPENAI_ORGANIZATION_ID=your-organization-id
OPENAI_API_KEY=your-api-key-here
```
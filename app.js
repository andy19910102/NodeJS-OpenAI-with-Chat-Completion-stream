const { Configuration, OpenAIApi } = require("openai");
require('dotenv').config();

const configuration = new Configuration({
    organization: process.env.OPENAI_ORGANIZATION_ID,
    apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

const fetchData = async () => {
    const prompt = "Please help me write a poem with the theme of Ho Chi Minh";
    const res = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [
            { "role": "user", "content": prompt }
        ],
        stream: true
    }, { responseType: 'stream' });

    // console.log("res", res);

    const stream = res.data;

    let data = '';

    stream.on('data', (chunk) => {
        // Add the delimiter "\n\n" to the end of the chunk
        const chunkString = chunk.toString() + "\n\n";
        // Split the chunk into data elements
        const chunkElements = chunkString.split("\n\n");

        chunkElements.forEach((element) => {
            // Ignore empty elements
            if (element.trim() === "") return;

            // Remove the "data: " prefix and parse the JSON
            const jsonStr = element.replace('data: ', '');

            if (jsonStr === '[DONE]') {
                console.log('Streaming completed');
                return;
            }

            let chunkObject;
            try {
                chunkObject = JSON.parse(jsonStr);
            } catch (err) {
                console.error('Failed to parse JSON:', err);
                return;
            }

            if (chunkObject.choices && chunkObject.choices[0].delta.content) {
                const deltaContent = chunkObject.choices[0].delta.content;
                // console.log(deltaContent);
                data += deltaContent;
                process.stdout.write(deltaContent);
            }
        });
    });

    stream.on('end', () => {
        console.log('Stream has ended');
        console.log('Final data:', data);
    });

    stream.on('error', (err) => {
        console.error('An error has occurred: ', err);
    });

}

fetchData();
const { GoogleGenAI } = require("@google/genai") ;
require("dotenv").config();
const ai = new GoogleGenAI({ apiKey: process.env.google_key });
console.log(process.env.google_key);
async function mainss(prompt) {
  const response = await ai.models.generateContent({
    model: "gemini-2.0-flash",
    systemInstruction: "You are a Code Reviewer and you analyse the problem and suggest best solution.you also optimize the code and give other suggestion in short points making it faster and easy to read and understand you provide the best and optimise code for the given code",
    contents: prompt,
  });
  console.log(response.text);
  return response.text;
}
module.exports = mainss; 


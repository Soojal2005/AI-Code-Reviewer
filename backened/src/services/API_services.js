const { GoogleGenAI } = require("@google/genai") ;
require("dotenv").config();
const ai = new GoogleGenAI({ apiKey: process.env.google_key });
console.log(process.env.google_key);
async function mainss(prompt) {
  const response = await ai.models.generateContent({
    model: "gemini-2.0-flash",
    systemInstruction: "You are a Code Reviewer and you analyse the problem and suggest best solution.you also optimize the code and give onthe suggestion in shoort points making it faster and easy to read and understand you provide the best and optimise code for the given code",
    contents: prompt,
  });
  console.log(response.text);
  return response.text;
}
module.exports = mainss; 


// const {GoogleGenerativeAI} = require('@google/generative-ai');
// const genAI = new GoogleGenerativeAI(process.env.google_key);
// const model = genAI.getGenereativeModel({model:"gemini-2.0-flash"});
// // const prompt = "What is the capital of France?";
// // const result = await model.generateContent(prompt);
// console.log(result.response.text);
// async function generateContent(prompt) {
//   const result = await model.generateContent(prompt);
//   return result.response.text;
// }
// module.exports = generateContent;
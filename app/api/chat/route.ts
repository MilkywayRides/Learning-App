import { GoogleGenerativeAI } from "@google/generative-ai";
import { GoogleGenerativeAIStream, Message, StreamingTextResponse } from "ai";

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY || "");

// IMPORTANT! Set the runtime to edge
export const runtime = "edge";
const buildGoogleGenAIPrompt = (messages: Message[]) => ({
  contents: messages
    .filter(
      (message) => message.role === "user" || message.role === "assistant"
    )
    .map((message) => ({
      role: message.role === "user" ? "user" : "model",
      parts: [{ text: message.content }],
    })),
});

export async function POST(req: Request) {
  // Extract the `prompt` from the body of the request
  const { messages } = await req.json();

  const geminiStream = await genAI
    .getGenerativeModel({ model: "gemini-1.0-pro-001" })
    .generateContentStream(buildGoogleGenAIPrompt(messages) as any);

  // Convert the response into a friendly text-stream
  const stream = GoogleGenerativeAIStream(geminiStream);

  // Respond with the stream
  return new StreamingTextResponse(stream);
}

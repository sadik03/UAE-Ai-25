export const GEMINI_CONFIG = {
  apiKey: "AIzaSyCLtPsQVG32oqe2Xdk6SxCGcMmxhGF2iiw", // Replace with your actual API key
  baseUrl: "https://generativelanguage.googleapis.com/v1beta",
  model: "gemini-2.0-flash",
  maxOutputTokens: 8192,
  temperature: 0.7,
  topP: 0.8,
  topK: 40,
};

export const getGeminiConfig = () => GEMINI_CONFIG;
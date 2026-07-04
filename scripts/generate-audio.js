// scripts/generate-audio.js
const { ElevenLabsClient } = require("elevenlabs");
const fs = require("fs");
const path = require("path");

const API_KEY = process.env.ELEVENLABS_API_KEY;
if (!API_KEY) {
  console.warn("No ELEVENLABS_API_KEY provided. Generation will likely fail or use fallback.");
}
const client = new ElevenLabsClient({ apiKey: API_KEY });

async function generateAudio() {
  const text = "Welcome to RZR. Where intelligence makes impact — starting on Day 1.";
  console.log("Generating audio...");

  const dir = path.join(__dirname, "../public/audio");
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  
  const dest = path.join(dir, "voiceover.mp3");

  try {
    const audioStream = await client.textToSpeech.convert("pNInz6obpgDQGcFmaJcg", {
      text: text,
      model_id: "eleven_monolingual_v1",
      voice_settings: { stability: 0.5, similarity_boost: 0.5 }
    });

    const fileStream = fs.createWriteStream(dest);
    audioStream.pipe(fileStream);
    
    await new Promise((resolve, reject) => {
      fileStream.on("finish", () => {
        console.log("Audio saved to", dest);
        resolve();
      });
      fileStream.on("error", reject);
    });
  } catch (error) {
    console.error("ElevenLabs API failed:", error.message);
    console.log("Falling back to writing a tiny dummy MP3...");
    
    // Fallback: write a valid, tiny silent mp3
    const silentMp3Base64 = "//NExAAAAANIAAAAAExBTUUzLjEwMKqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq";
    fs.writeFileSync(dest, Buffer.from(silentMp3Base64, "base64"));
    console.log("Dummy audio saved to", dest);
  }
}

generateAudio().catch(console.error);

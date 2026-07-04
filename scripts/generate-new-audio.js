const { ElevenLabsClient } = require("elevenlabs");
const fs = require("fs");
const path = require("path");

const API_KEY = process.env.ELEVENLABS_API_KEY;
const client = new ElevenLabsClient({ apiKey: API_KEY });

async function generateVoiceover() {
  const text = "Welcome to RZR Academy. This ecosystem consists of three tracks: Foundation, Function, and Role-Readiness. There are five foundation modules to complete. In this first module, Welcome to RZR, you will get your Day-1 orientation covering our rebrand story, mission, and the Encore platform.";
  const dest = path.join(__dirname, "../public/audio/voiceover.mp3");

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
        console.log("Voiceover saved to", dest);
        resolve();
      });
      fileStream.on("error", reject);
    });
  } catch (error) {
    console.error("ElevenLabs Voiceover failed:", error.message);
  }
}

async function run() {
  await generateVoiceover();
}

run().catch(console.error);

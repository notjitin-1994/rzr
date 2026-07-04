const { ElevenLabsClient } = require("elevenlabs");

const API_KEY = process.env.ELEVENLABS_API_KEY;
const client = new ElevenLabsClient({ apiKey: API_KEY });

async function run() {
  try {
    const voices = await client.voices.getAll();
    console.log("Voices:", voices.voices.slice(0, 5).map(v => ({ id: v.voice_id, name: v.name })));
  } catch (err) {
    console.error("Failed to get voices:", err.message);
  }
}
run();

// Generate a simple ambient music track for the RZR welcome video
// Creates a 30-second WAV file with layered ambient pad + subtle pulse

import { writeFileSync, mkdirSync } from "fs";

const SAMPLE_RATE = 44100;
const DURATION_SEC = 30;
const NUM_CHANNELS = 1;
const BITS_PER_SAMPLE = 16;

const PAD_FREQS = [130.81, 164.81, 196.00, 261.63]; // C3, E3, G3, C4
const PULSE_FREQ = 55; // A1 sub-bass

function generateAmbientTrack(): Int16Array {
  const numSamples = SAMPLE_RATE * DURATION_SEC;
  const samples = new Int16Array(numSamples);

  for (let i = 0; i < numSamples; i++) {
    const t = i / SAMPLE_RATE;
    let sample = 0;

    for (const freq of PAD_FREQS) {
      const lfo = 0.15 + 0.05 * Math.sin(2 * Math.PI * 0.1 * t);
      sample += lfo * Math.sin(2 * Math.PI * freq * t);
    }

    const pulsePhase = (t % 2) * 2 - 1;
    if (pulsePhase > 0.7) {
      const pulseEnv = Math.exp(-3 * (pulsePhase - 0.7));
      sample += 0.08 * pulseEnv * Math.sin(2 * Math.PI * PULSE_FREQ * t);
    }

    sample += 0.02 * Math.sin(2 * Math.PI * 1200 * t) * Math.sin(2 * Math.PI * 0.5 * t);

    if (t < 2) sample *= t / 2;
    if (t > DURATION_SEC - 2) sample *= (DURATION_SEC - t) / 2;

    sample = Math.tanh(sample * 0.6);
    samples[i] = Math.max(-32768, Math.min(32767, Math.round(sample * 28000)));
  }

  return samples;
}

function writeWAV(filename: string, samples: Int16Array): void {
  const dataSize = samples.length * 2;
  const buffer = Buffer.alloc(44 + dataSize);

  buffer.write("RIFF", 0);
  buffer.writeUInt32LE(36 + dataSize, 4);
  buffer.write("WAVE", 8);
  buffer.write("fmt ", 12);
  buffer.writeUInt32LE(16, 16);
  buffer.writeUInt16LE(1, 20);
  buffer.writeUInt16LE(NUM_CHANNELS, 22);
  buffer.writeUInt32LE(SAMPLE_RATE, 24);
  buffer.writeUInt32LE(SAMPLE_RATE * NUM_CHANNELS * BITS_PER_SAMPLE / 8, 28);
  buffer.writeUInt16LE(NUM_CHANNELS * BITS_PER_SAMPLE / 8, 32);
  buffer.writeUInt16LE(BITS_PER_SAMPLE, 34);
  buffer.write("data", 36);
  buffer.writeUInt32LE(dataSize, 40);

  for (let i = 0; i < samples.length; i++) {
    buffer.writeInt16LE(samples[i], 44 + i * 2);
  }

  writeFileSync(filename, buffer);
  console.log(`Generated ${filename}`);
  console.log(`  Duration: ${DURATION_SEC}s, Size: ${(buffer.length / 1024).toFixed(1)}KB`);
}

mkdirSync("public/audio", { recursive: true });

const ambient = generateAmbientTrack();
writeWAV("public/audio/rzr-ambient.wav", ambient);

function generateSilence(durationSec: number, filename: string): void {
  const numSamples = SAMPLE_RATE * durationSec;
  const samples = new Int16Array(numSamples);
  writeWAV(filename, samples);
}

generateSilence(2, "public/audio/voiceover-act2.wav");
generateSilence(4, "public/audio/voiceover-act3.wav");
generateSilence(4, "public/audio/voiceover-act4.wav");
generateSilence(3, "public/audio/voiceover-act5.wav");

console.log("\nDone. Replace silence files in public/audio/ with ElevenLabs-generated WAVs for production voiceover.");
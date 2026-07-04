import wave
import struct
import math

SAMPLE_RATE = 44100
DURATION = 30
VOLUME = 8000 # Max is 32767

# A major chord frequencies: A (110Hz, 220Hz), C# (277.18Hz), E (329.63Hz)
frequencies = [110.0, 220.0, 277.18, 329.63]

wav_file = wave.open("public/audio/ambient.wav", "w")
wav_file.setnchannels(1) # Mono
wav_file.setsampwidth(2) # 2 bytes = 16 bit
wav_file.setframerate(SAMPLE_RATE)

num_samples = SAMPLE_RATE * DURATION

for i in range(num_samples):
    value = 0.0
    for f in frequencies:
        value += math.sin(2.0 * math.pi * f * (i / float(SAMPLE_RATE)))
    
    # average and scale
    value = value / len(frequencies)
    # simple envelope: fade in/out
    envelope = 1.0
    if i < SAMPLE_RATE: # 1 sec fade in
        envelope = i / SAMPLE_RATE
    elif i > num_samples - SAMPLE_RATE: # 1 sec fade out
        envelope = (num_samples - i) / SAMPLE_RATE
        
    value = int(value * VOLUME * envelope)
    data = struct.pack('<h', value)
    wav_file.writeframesraw(data)

wav_file.close()
print("Generated public/audio/ambient.wav")

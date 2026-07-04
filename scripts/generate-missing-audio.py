import asyncio
import edge_tts

async def main():
    voice = "en-US-AriaNeural"
    
    tasks = [
        {"text": "Welcome to RZR.", "dest": "public/audio/voiceover-act2.mp3"},
        {"text": "We operate across eight global offices.", "dest": "public/audio/voiceover-act3.mp3"},
        {"text": "Processing over seven million ad requests per second.", "dest": "public/audio/voiceover-act4.mp3"},
        {"text": "This is where intelligence makes impact.", "dest": "public/audio/voiceover-act5.mp3"},
        {"text": "Welcome to RZR Academy. This ecosystem consists of three tracks: Foundation, Function, and Role-Readiness. There are five foundation modules to complete. In this first module, Welcome to RZR, you will get your Day-1 orientation covering our rebrand story, mission, and the Encore platform.", "dest": "public/audio/voiceover.mp3"}
    ]
    
    for t in tasks:
        print(f"Generating {t['dest']}...")
        communicate = edge_tts.Communicate(t["text"], voice)
        await communicate.save(t["dest"])

if __name__ == "__main__":
    asyncio.run(main())

// src/components/QuranAudio.jsx

import { useEffect, useRef } from "react";

import verseAudio from "../assets/audio/verse-1.mp3";

function QuranAudio() {
    const audioRef = useRef(null);

    useEffect(() => {
        const audio = audioRef.current;

        if (!audio) return;

        audio.volume = 0.8;

        const startAudio = async () => {
            try {
                await audio.play();
                console.log("Quran audio started");
            } catch (error) {
                console.log(
                    "Autoplay was blocked by the browser:",
                    error
                );
            }
        };

        startAudio();
    }, []);

    return (
        <audio
            ref={audioRef}
            src={verseAudio}
            autoPlay
            preload="auto"
        />
    );
}

export default QuranAudio;
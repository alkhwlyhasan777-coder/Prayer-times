// src/components/QuranAudio.jsx

import { useEffect, useRef, useState } from "react";

import verseAudio from "../assets/audio/verse-1.mp3";

function QuranAudio() {
    const audioRef = useRef(null);

    const [isPlaying, setIsPlaying] = useState(false);
    const [isBlocked, setIsBlocked] = useState(false);

    useEffect(() => {
        const audio = audioRef.current;

        if (!audio) return;

        audio.volume = 0.8;

        const playAudio = async () => {
            try {
                await audio.play();

                setIsPlaying(true);
                setIsBlocked(false);
            } catch (error) {
                console.log("Autoplay blocked:", error);

                setIsBlocked(true);
                setIsPlaying(false);
            }
        };

        playAudio();
    }, []);

    const handlePlay = async () => {
        const audio = audioRef.current;

        if (!audio) return;

        try {
            await audio.play();

            setIsPlaying(true);
            setIsBlocked(false);
        } catch (error) {
            console.error(error);
        }
    };

    const handlePause = () => {
        const audio = audioRef.current;

        if (!audio) return;

        audio.pause();
        setIsPlaying(false);
    };

    return (
        <>
            <audio
                ref={audioRef}
                src={verseAudio}
                preload="auto"
                onEnded={() => setIsPlaying(false)}
            />

            {isBlocked && (
                <button
                    onClick={handlePlay}
                    className="
                        fixed
                        bottom-6
                        left-1/2
                        z-50
                        -translate-x-1/2
                        rounded-full
                        border
                        border-emerald-400/30
                        bg-slate-950/80
                        px-6
                        py-3
                        text-sm
                        font-semibold
                        text-emerald-400
                        shadow-xl
                        backdrop-blur-md
                        transition
                        hover:bg-emerald-500
                        hover:text-slate-950
                    "
                >
                    🔊 تشغيل تلاوة الآية
                </button>
            )}

            {isPlaying && (
                <button
                    onClick={handlePause}
                    className="
                        fixed
                        bottom-6
                        left-1/2
                        z-50
                        -translate-x-1/2
                        rounded-full
                        border
                        border-white/10
                        bg-slate-950/80
                        px-6
                        py-3
                        text-sm
                        font-semibold
                        text-white
                        shadow-xl
                        backdrop-blur-md
                    "
                >
                    🔇 إيقاف التلاوة
                </button>
            )}
        </>
    );
}

export default QuranAudio;
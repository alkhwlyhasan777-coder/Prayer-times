import { useEffect, useState } from "react";

import { CityProvider } from "./components/context/Context";
import { ThemeProvider } from "./components/context/ThemeContext";

import Location from "./components/Location";
import PrayerCards from "./components/PrayerCards";
import PrayerInfo from "./components/PrayerInfo";
import Footer from "./components/Footer";
import PrayerNotification from "./components/PrayerNotification";
import bg1 from "./assets/prayer-bg-1.jpg";
import bg2 from "./assets/prayer-bg-2.jpg";
import bg3 from "./assets/prayer-bg-3.avif";
import bg4 from "./assets/العشاء.png";
import bg5 from "./assets/prayer-bg.png";
import QuranSection from "./components/QuranSection";
import QuranAudio from "./components/QuranAudio";
import Header from "./components/Header";
const backgrounds = [bg3, bg2, bg1 , bg4 , bg5];

function App() {
    const [currentBg, setCurrentBg] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentBg((prev) => (prev + 1) % backgrounds.length);
        }, 5000);

        return () => clearInterval(interval);
    }, []);

    return (
        <ThemeProvider>
            <CityProvider>
                <div className="relative min-h-screen overflow-hidden bg-slate-950 text-white">

                    {/* Background Images */}
                    <div className="fixed inset-0 z-0 overflow-hidden">

                        {backgrounds.map((image, index) => (
                            <div
                                key={image}
                                className={`
                                    absolute
                                    inset-0
                                    bg-cover
                                    bg-center
                                    bg-no-repeat
                                    transition-opacity
                                    duration-1000
                                    ease-in-out
                                    ${
                                        currentBg === index
                                            ? "opacity-100"
                                            : "opacity-0"
                                    }
                                `}
                                style={{
                                    backgroundImage: `url(${image})`,
                                }}
                            />
                        ))}

                        {/* Dark Overlay */}
                        <div className="absolute inset-0 bg-slate-950/55" />

                        {/* Extra Gradient */}
                        <div
                            className="
                                absolute
                                inset-0
                                bg-gradient-to-b
                                from-slate-950/30
                                via-slate-950/20
                                to-slate-950/80
                            "
                        />
                    </div>
                        <Header/>
                        <PrayerNotification/>
                    {/* App Content */}
                    <div className="relative z-10">
                        <QuranSection/>
                        <main className="pt-32">
                            <Location />
                            <PrayerCards />
                            <PrayerInfo />
                        </main>
                        <QuranAudio/>
                        <Footer />

                    </div>
                </div>
            </CityProvider>
        </ThemeProvider>
    );
}

export default App;
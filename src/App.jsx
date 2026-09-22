// 
import { CityProvider } from "./components/context/Context";
import { ThemeProvider } from "./components/context/ThemeContext";


import Location from "./components/Location";
import PrayerCards from "./components/PrayerCards";
import PrayerInfo from "./components/PrayerInfo";

import logo from "./assets/prayer-bg.png";
import Footer from "./components/Footer";

function App() {
    return (
        <ThemeProvider>
            <CityProvider>
                <div className="relative min-h-screen overflow-hidden bg-slate-950 text-white">

                    {/* Full Screen Background */}
                    <div
                        className="
                            fixed
                            inset-0
                            z-0
                            bg-cover
                            bg-center
                            bg-no-repeat
                        "
                        style={{
                            backgroundImage: `url(${logo})`,
                        }}
                    />

                    {/* Dark Overlay */}
                    <div
                        className="
                            fixed
                            inset-0
                            z-0
                            bg-slate-950/65
                        "
                    />

                    {/* App Content */}
                    <div className="relative z-10">
                

                        <main>
                            <Location />
                            <PrayerCards />
                            <PrayerInfo />
                        </main>
                        <Footer />
                    </div>

                </div>
            </CityProvider>
        </ThemeProvider>
    );
}

export default App;
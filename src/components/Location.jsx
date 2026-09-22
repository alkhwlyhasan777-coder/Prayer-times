import {
    useContext,
    useEffect,
    useMemo,
    useState,
} from "react";
import logo from "../assets/prayer-bg.png";

import { CityContext } from "./context/Context";
const countries = [
    {
        value: "Egypt",
        label: "🇪🇬 مصر",
    },
    {
        value: "Saudi Arabia",
        label: "🇸🇦 السعودية",
    },
    {
        value: "United Arab Emirates",
        label: "🇦🇪 الإمارات",
    },
    {
        value: "Qatar",
        label: "🇶🇦 قطر",
    },
    {
        value: "Kuwait",
        label: "🇰🇼 الكويت",
    },
    {
        value: "Bahrain",
        label: "🇧🇭 البحرين",
    },
    {
        value: "Oman",
        label: "🇴🇲 عُمان",
    },
    {
        value: "Jordan",
        label: "🇯🇴 الأردن",
    },
    {
        value: "Palestine",
        label: "🇵🇸 فلسطين",
    },
    {
        value: "Lebanon",
        label: "🇱🇧 لبنان",
    },
    {
        value: "Iraq",
        label: "🇮🇶 العراق",
    },
    {
        value: "Syria",
        label: "🇸🇾 سوريا",
    },
    {
        value: "Turkey",
        label: "🇹🇷 تركيا",
    },
    {
        value: "Morocco",
        label: "🇲🇦 المغرب",
    },
    {
        value: "Algeria",
        label: "🇩🇿 الجزائر",
    },
    {
        value: "Tunisia",
        label: "🇹🇳 تونس",
    },
    {
        value: "United Kingdom",
        label: "🇬🇧 المملكة المتحدة",
    },
    {
        value: "United States",
        label: "🇺🇸 الولايات المتحدة",
    },
    {
        value: "Canada",
        label: "🇨🇦 كندا",
    },
    {
        value: "Germany",
        label: "🇩🇪 ألمانيا",
    },
    {
        value: "France",
        label: "🇫🇷 فرنسا",
    },
    {
        value: "Italy",
        label: "🇮🇹 إيطاليا",
    },
    {
        value: "Spain",
        label: "🇪🇸 إسبانيا",
    },
    {
        value: "Malaysia",
        label: "🇲🇾 ماليزيا",
    },
    {
        value: "Indonesia",
        label: "🇮🇩 إندونيسيا",
    },
    {
        value: "Pakistan",
        label: "🇵🇰 باكستان",
    },
    {
        value: "India",
        label: "🇮🇳 الهند",
    },
    {
        value: "Australia",
        label: "🇦🇺 أستراليا",
    },
];


const popularCities = {
    Egypt: [
        "Cairo",
        "Giza",
        "Alexandria",
        "Mansoura",
        "Tanta",
        "Aswan",
        "Luxor",
    ],

    "Saudi Arabia": [
        "Riyadh",
        "Jeddah",
        "Makkah",
        "Medina",
        "Dammam",
        "Taif",
    ],

    "United Arab Emirates": [
        "Dubai",
        "Abu Dhabi",
        "Sharjah",
        "Ajman",
        "Al Ain",
    ],

    Qatar: [
        "Doha",
        "Al Rayyan",
        "Al Wakrah",
    ],

    Kuwait: [
        "Kuwait City",
        "Hawally",
        "Salmiya",
    ],

    Bahrain: [
        "Manama",
        "Riffa",
        "Muharraq",
    ],

    Oman: [
        "Muscat",
        "Salalah",
        "Sohar",
    ],

    Jordan: [
        "Amman",
        "Zarqa",
        "Irbid",
        "Aqaba",
    ],

    Palestine: [
        "Jerusalem",
        "Gaza",
        "Ramallah",
        "Hebron",
    ],

    Lebanon: [
        "Beirut",
        "Tripoli",
        "Sidon",
    ],

    Iraq: [
        "Baghdad",
        "Basra",
        "Erbil",
        "Mosul",
    ],

    Syria: [
        "Damascus",
        "Aleppo",
        "Homs",
        "Latakia",
    ],

    Turkey: [
        "Istanbul",
        "Ankara",
        "Izmir",
        "Bursa",
    ],

    Morocco: [
        "Casablanca",
        "Rabat",
        "Marrakesh",
        "Fes",
        "Tangier",
    ],

    Algeria: [
        "Algiers",
        "Oran",
        "Constantine",
        "Annaba",
    ],

    Tunisia: [
        "Tunis",
        "Sfax",
        "Sousse",
    ],

    "United Kingdom": [
        "London",
        "Birmingham",
        "Manchester",
        "Liverpool",
        "Leeds",
    ],

    "United States": [
        "New York",
        "Los Angeles",
        "Chicago",
        "Houston",
        "Washington",
    ],

    Canada: [
        "Toronto",
        "Montreal",
        "Vancouver",
        "Ottawa",
    ],

    Germany: [
        "Berlin",
        "Hamburg",
        "Munich",
        "Frankfurt",
    ],

    France: [
        "Paris",
        "Marseille",
        "Lyon",
        "Toulouse",
    ],

    Italy: [
        "Rome",
        "Milan",
        "Naples",
        "Turin",
    ],

    Spain: [
        "Madrid",
        "Barcelona",
        "Valencia",
        "Seville",
    ],

    Malaysia: [
        "Kuala Lumpur",
        "George Town",
        "Johor Bahru",
    ],

    Indonesia: [
        "Jakarta",
        "Surabaya",
        "Bandung",
        "Medan",
    ],

    Pakistan: [
        "Karachi",
        "Lahore",
        "Islamabad",
        "Peshawar",
    ],

    India: [
        "Mumbai",
        "Delhi",
        "Hyderabad",
        "Bangalore",
    ],

    Australia: [
        "Sydney",
        "Melbourne",
        "Brisbane",
        "Perth",
    ],
};

// ========================================
// Format Time
// ========================================

function formatTime(time) {
    if (!time) {
        return "...";
    }

    const cleanTime = time.split(" ")[0];

    const [hours, minutes] =
        cleanTime.split(":");

    const date = new Date();

    date.setHours(
        Number(hours),
        Number(minutes),
        0,
        0
    );

    return date.toLocaleTimeString(
        "en-US",
        {
            hour: "numeric",
            minute: "2-digit",
            hour12: true,
        }
    );
}

// ========================================
// Convert API Time to Date
// ========================================

function createPrayerDate(time, tomorrow = false) {
    if (!time) {
        return null;
    }

    const cleanTime = time.split(" ")[0];

    const [hours, minutes] =
        cleanTime.split(":");

    const date = new Date();

    date.setHours(
        Number(hours),
        Number(minutes),
        0,
        0
    );

    if (tomorrow) {
        date.setDate(date.getDate() + 1);
    }

    return date;
}

// ========================================
// Countdown Timer
// ========================================

function CountdownTimer({ targetDate }) {
    const [timeLeft, setTimeLeft] = useState({
        hours: 0,
        minutes: 0,
        seconds: 0,
    });

    useEffect(() => {
        if (!targetDate) {
            return;
        }

        const updateCountdown = () => {
            const now = new Date();

            const difference =
                targetDate.getTime() -
                now.getTime();

            if (difference <= 0) {
                setTimeLeft({
                    hours: 0,
                    minutes: 0,
                    seconds: 0,
                });

                return;
            }

            const totalSeconds =
                Math.floor(
                    difference / 1000
                );

            const hours =
                Math.floor(
                    totalSeconds / 3600
                );

            const minutes =
                Math.floor(
                    (totalSeconds % 3600) / 60
                );

            const seconds =
                totalSeconds % 60;

            setTimeLeft({
                hours,
                minutes,
                seconds,
            });
        };

        updateCountdown();

        const interval = setInterval(
            updateCountdown,
            1000
        );

        return () =>
            clearInterval(interval);
    }, [targetDate]);

    return (
        <div className="flex justify-center gap-3 mt-6">

            {/* Hours */}

            <CountdownBox
                value={timeLeft.hours}
                label="ساعة"
            />

            {/* Minutes */}

            <CountdownBox
                value={timeLeft.minutes}
                label="دقيقة"
            />

            {/* Seconds */}

            <CountdownBox
                value={timeLeft.seconds}
                label="ثانية"
            />

        </div>
    );
}

// ========================================
// Countdown Box
// ========================================

function CountdownBox({
    value,
    label,
}) {
    return (
        <div className="flex flex-col items-center justify-center w-20 h-20 rounded-2xl bg-white/10 border border-white/10 backdrop-blur-sm">

            <span className="text-2xl font-bold text-white">
                {String(value).padStart(2, "0")}
            </span>

            <span className="text-xs text-slate-400 mt-1">
                {label}
            </span>

        </div>
    );
}

// ========================================
// Location Component
// ========================================

export default function Location() {

    const {
        country,
        setCountry,

        city,
        setCity,

        timings,
        date,
        meta,

        loading,
        error,
    } = useContext(CityContext);

    // ========================================
    // City Input
    // ========================================

    const [cityInput, setCityInput] =
        useState(city);

    // ========================================
    // Current Time
    // ========================================

    const [currentTime, setCurrentTime] =
        useState(new Date());

    // ========================================
    // Update Current Time
    // ========================================

    useEffect(() => {

        const interval = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);

        return () =>
            clearInterval(interval);

    }, []);

    // ========================================
    // Sync City
    // ========================================

    useEffect(() => {
        setCityInput(city);
    }, [city]);

    // ========================================
    // Cities For Selected Country
    // ========================================

    const citiesForCountry = useMemo(() => {

        return popularCities[country] || [];

    }, [country]);

    // ========================================
    // Change Country
    // ========================================

    const handleCountryChange = (event) => {

        const selectedCountry =
            event.target.value;

        setCountry(selectedCountry);

        const cities =
            popularCities[selectedCountry];

        if (
            cities &&
            cities.length > 0
        ) {
            const firstCity = cities[0];

            setCityInput(firstCity);

            setCity(firstCity);
        } else {
            setCityInput("");
        }
    };

    // ========================================
    // Search City
    // ========================================

    const handleSubmit = (event) => {

        event.preventDefault();

        const cleanCity =
            cityInput.trim();

        if (!cleanCity) {
            return;
        }

        setCity(cleanCity);
    };

    // ========================================
    // Select Popular City
    // ========================================

    const handleCitySelect = (selectedCity) => {

        setCityInput(selectedCity);

        setCity(selectedCity);
    };

    // ========================================
    // Next Prayer
    // ========================================

    const nextPrayer = useMemo(() => {

        if (!timings) {
            return null;
        }

        const prayers = [
            {
                key: "Fajr",
                name: "الفجر",
            },
            {
                key: "Dhuhr",
                name: "الظهر",
            },
            {
                key: "Asr",
                name: "العصر",
            },
            {
                key: "Maghrib",
                name: "المغرب",
            },
            {
                key: "Isha",
                name: "العشاء",
            },
        ];

        const now = new Date();

        for (const prayer of prayers) {

            const prayerDate =
                createPrayerDate(
                    timings[prayer.key]
                );

            if (
                prayerDate &&
                prayerDate > now
            ) {
                return {
                    ...prayer,
                    date: prayerDate,
                };
            }
        }

        // ========================================
        // Tomorrow Fajr
        // ========================================

        const tomorrowFajr =
            createPrayerDate(
                timings.Fajr,
                true
            );

        if (!tomorrowFajr) {
            return null;
        }

        return {
            key: "Fajr",
            name: "الفجر",
            date: tomorrowFajr,
        };

    }, [timings, currentTime]);

    // ========================================
    // Current Date
    // ========================================

    const formattedDate =
        currentTime.toLocaleDateString(
            "ar-EG",
            {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
            }
        );

    // ========================================
    // Loading
    // ========================================
// ========================================
// Loading
// ========================================

if (loading) {
    return (
        <section
            id="location"
            className="
                relative
                z-10
                w-full
                min-h-screen
                overflow-hidden
                py-12
                md:py-16
            "
        >
            <div className="relative z-10 w-full px-4 md:px-6 lg:px-8">
                <div className="animate-pulse">

                    <div className="mx-auto mb-4 h-8 w-56 rounded-xl bg-slate-800/50" />

                    <div className="mx-auto mb-10 h-5 w-80 max-w-full rounded-xl bg-slate-800/50" />

                    <div className="h-64 rounded-3xl bg-slate-800/50" />

                </div>
            </div>
        </section>
    );
}

// ========================================
// UI
// ========================================

return (
    <section
        id="location"
        className="
            relative
            z-10
            w-full
            min-h-screen
            overflow-hidden
            py-12
            md:py-16
        "
    >
        {/* Content */}
        <div className="relative z-10 w-full px-4 md:px-6 lg:px-8">

            {/* ========================================
                Header
            ======================================== */}

            <div className="mb-10 text-center">

                <span
                    className="
                        mb-4
                        inline-flex
                        items-center
                        gap-2
                        rounded-full
                        border
                        border-emerald-500/20
                        bg-emerald-500/10
                        px-4
                        py-2
                        text-sm
                        text-emerald-400
                    "
                >
                    🌍
                    <span>
                        الموقع
                    </span>
                </span>

                <h2
                    className="
                        text-3xl
                        font-bold
                        text-white
                        md:text-4xl
                    "
                >
                    اختر موقعك
                </h2>

                <p className="mt-3 text-slate-400">
                    اختر الدولة والمدينة للحصول على مواقيت الصلاة
                </p>

            </div>

            {/* ========================================
                Location Search
            ======================================== */}

            <div
                className="
                    rounded-3xl
                    border
                    border-white/10
                    bg-slate-900/35
                    p-5
                    shadow-xl
                    backdrop-blur-md
                    md:p-7
                "
            >

                <form
                    onSubmit={handleSubmit}
                    className="
                        grid
                        grid-cols-1
                        gap-4
                        md:grid-cols-[1fr_1fr_auto]
                    "
                >

                    {/* Country */}

                    <div>

                        <label
                            className="
                                mb-2
                                block
                                text-sm
                                font-medium
                                text-slate-300
                            "
                        >
                            الدولة
                        </label>

                        <select
                            value={country}
                            onChange={handleCountryChange}
                            className="
                                h-12
                                w-full
                                rounded-xl
                                border
                                border-white/10
                                bg-slate-800/60
                                px-4
                                text-white
                                outline-none
                                backdrop-blur-sm
                                transition
                                focus:border-emerald-500
                                focus:ring-2
                                focus:ring-emerald-500/20
                            "
                        >
                            {countries.map((item) => (
                                <option
                                    key={item.value}
                                    value={item.value}
                                    className="bg-slate-800"
                                >
                                    {item.label}
                                </option>
                            ))}
                        </select>

                    </div>

                    {/* City */}

                    <div>

                        <label
                            className="
                                mb-2
                                block
                                text-sm
                                font-medium
                                text-slate-300
                            "
                        >
                            المدينة
                        </label>

                        <input
                            type="text"
                            value={cityInput}
                            onChange={(event) =>
                                setCityInput(event.target.value)
                            }
                            placeholder="مثال: Cairo"
                            className="
                                h-12
                                w-full
                                rounded-xl
                                border
                                border-white/10
                                bg-slate-800/60
                                px-4
                                text-white
                                placeholder:text-slate-500
                                outline-none
                                backdrop-blur-sm
                                transition
                                focus:border-emerald-500
                                focus:ring-2
                                focus:ring-emerald-500/20
                            "
                        />

                    </div>

                    {/* Button */}

                    <div className="flex items-end">

                        <button
                            type="submit"
                            disabled={!cityInput.trim()}
                            className="
                                flex
                                h-12
                                w-full
                                items-center
                                justify-center
                                gap-2
                                rounded-xl
                                bg-emerald-500
                                px-7
                                font-bold
                                text-slate-950
                                transition
                                hover:bg-emerald-400
                                disabled:bg-slate-700
                                disabled:text-slate-500
                                md:w-auto
                            "
                        >
                            <span>
                                بحث
                            </span>
                        </button>

                    </div>

                </form>

                {/* ========================================
                    Popular Cities
                ======================================== */}

                {citiesForCountry.length > 0 && (
                    <div className="mt-7">

                        <p className="mb-3 text-sm text-slate-400">
                            مدن شائعة:
                        </p>

                        <div className="flex flex-wrap gap-2">

                            {citiesForCountry.map((cityName) => (
                                <button
                                    key={cityName}
                                    type="button"
                                    onClick={() =>
                                        handleCitySelect(cityName)
                                    }
                                    className={`
                                        rounded-full
                                        border
                                        px-4
                                        py-2
                                        text-sm
                                        transition

                                        ${
                                            city === cityName
                                                ? "border-emerald-500 bg-emerald-500 text-slate-950"
                                                : "border-white/10 bg-slate-800/60 text-slate-300 hover:border-emerald-500 hover:text-emerald-400"
                                        }
                                    `}
                                >
                                    {cityName}
                                </button>
                            ))}

                        </div>

                    </div>
                )}

                {/* ========================================
                    Error
                ======================================== */}

                {error && (
                    <div
                        className="
                            mt-5
                            rounded-xl
                            border
                            border-red-500/20
                            bg-red-500/10
                            p-4
                            text-red-400
                        "
                    >
                        <div className="flex gap-3">

                            <span>
                                ⚠️
                            </span>

                            <p>
                                {error}
                            </p>

                        </div>
                    </div>
                )}

            </div>

            {/* ========================================
                Current Location
            ======================================== */}

            {timings && (
                <div className="mt-8">

                    <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">

                        {/* Location Card */}

                        <div
                            className="
                                rounded-3xl
                                border
                                border-emerald-500/10
                                bg-gradient-to-br
                                from-emerald-500/10
                                to-slate-900/35
                                p-6
                                backdrop-blur-md
                                md:p-7
                                lg:col-span-2
                            "
                        >

                            <div
                                className="
                                    flex
                                    items-start
                                    justify-between
                                    gap-4
                                "
                            >

                                <div>

                                    <p className="mb-2 text-sm text-slate-400">
                                        مواقيت الصلاة في
                                    </p>

                                    <h3
                                        className="
                                            text-2xl
                                            font-bold
                                            text-white
                                            md:text-3xl
                                        "
                                    >
                                        {city}
                                    </h3>

                                    <p className="mt-1 text-emerald-400">
                                        {country}
                                    </p>

                                </div>

                                <div className="text-4xl">
                                    📍
                                </div>

                            </div>

                            <div className="mt-6 border-t border-white/10 pt-5">

                                <p className="text-slate-300">
                                    {formattedDate}
                                </p>

                                {date?.hijri && (
                                    <p className="mt-1 text-sm text-slate-500">

                                        {date.hijri.weekday?.ar}{" "}

                                        {date.hijri.day}{" "}

                                        {date.hijri.month?.ar}{" "}

                                        {date.hijri.year}

                                    </p>
                                )}

                            </div>

                        </div>

                        {/* Current Time */}

                        <div
                            className="
                                flex
                                flex-col
                                items-center
                                justify-center
                                rounded-3xl
                                border
                                border-white/10
                                bg-slate-900/35
                                p-6
                                text-center
                                backdrop-blur-md
                                md:p-7
                            "
                        >

                            <p className="text-sm text-slate-400">
                                الوقت الحالي
                            </p>

                            <p
                                dir="ltr"
                                className="
                                    mt-2
                                    text-3xl
                                    font-bold
                                    text-white
                                "
                            >
                                {currentTime.toLocaleTimeString(
                                    "en-US",
                                    {
                                        hour: "numeric",
                                        minute: "2-digit",
                                        second: "2-digit",
                                        hour12: true,
                                    }
                                )}
                            </p>

                            <p className="mt-2 text-sm text-slate-500">
                                {meta?.timezone || "التوقيت المحلي"}
                            </p>

                        </div>

                    </div>

                </div>
            )}

            {/* ========================================
                Next Prayer
            ======================================== */}

            {nextPrayer && (
                <div
                    className="
                        mt-6
                        rounded-3xl
                        border
                        border-emerald-500/20
                        bg-gradient-to-r
                        from-emerald-600/15
                        via-slate-900/35
                        to-slate-900/25
                        p-6
                        text-center
                        backdrop-blur-md
                        md:p-8
                    "
                >

                    <p className="font-medium text-emerald-400">
                        الصلاة القادمة
                    </p>

                    <h3
                        className="
                            mt-2
                            text-3xl
                            font-bold
                            text-white
                            md:text-4xl
                        "
                    >
                        {nextPrayer.name}
                    </h3>

                    <p className="mt-2 text-slate-400">
                        {formatTime(
                            timings?.[nextPrayer.key]
                        )}
                    </p>

                    <CountdownTimer
                        targetDate={nextPrayer.date}
                    />

                </div>
            )}

            {/* ========================================
                Additional Information
            ======================================== */}

            {timings && (
                <div
                    className="
                        mt-6
                        grid
                        grid-cols-2
                        gap-4
                        md:grid-cols-4
                    "
                >

                    <InfoCard
                        title="الشروق"
                        value={formatTime(timings.Sunrise)}
                        icon="🌅"
                    />

                    <InfoCard
                        title="الغروب"
                        value={formatTime(timings.Sunset)}
                        icon="🌇"
                    />

                    <InfoCard
                        title="الإمساك"
                        value={formatTime(timings.Imsak)}
                        icon="🌙"
                    />

                    <InfoCard
                        title="منتصف الليل"
                        value={formatTime(timings.Midnight)}
                        icon="🌌"
                    />

                </div>
            )}

        </div>
    </section>
);
}

// ========================================
// Info Card
// ========================================

function InfoCard({
    title,
    value,
    icon,
}) {
    return (
        <div className="p-5 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-lg shadow-black/10 text-center hover:bg-white/10 hover:border-emerald-400/30 hover:shadow-emerald-500/10 transition-all duration-300">

            <div className="text-2xl mb-2">
                {icon}
            </div>

            <p className="text-sm text-slate-400">
                {title}
            </p>

            <p className="text-lg font-bold text-white mt-1">
                {value}
            </p>

        </div>
    );
}
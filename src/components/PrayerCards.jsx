import { useContext, useEffect, useMemo, useState } from "react";

import Fajr from "../assets/Fajr.png";
import Shurooq from "../assets/الشروق.png";
import Dhuhr from "../assets/الظهر.png";
import Asr from "../assets/العصر .png";
import Maghrib from "../assets/المغرب.png";
import Isha from "../assets/العشاء.png";

import { CityContext } from "../components/context/Context.jsx";

/* =====================================================
   Format Time
===================================================== */

const formatTime = (time) => {
    if (!time) return "...";

    const cleanTime = time.split(" ")[0];

    const [hours, minutes] = cleanTime.split(":");

    const date = new Date();

    date.setHours(
        Number(hours),
        Number(minutes),
        0,
        0
    );

    return date.toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
    });
};

/* =====================================================
   Get Prayer Status
===================================================== */

const getPrayerStatus = (time) => {
    if (!time) return "upcoming";

    const now = new Date();

    const cleanTime = time.split(" ")[0];

    const [hours, minutes] = cleanTime.split(":");

    const prayerTime = new Date();

    prayerTime.setHours(
        Number(hours),
        Number(minutes),
        0,
        0
    );

    return prayerTime <= now ? "passed" : "upcoming";
};

/* =====================================================
   Prayer Cards
===================================================== */

function PrayerCards() {
    const {
        timings,
        loading,
        error,
    } = useContext(CityContext);

    const [currentTime, setCurrentTime] = useState(
        new Date()
    );

    /* =====================================================
       Update Current Time
    ===================================================== */

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    /* =====================================================
       Prayer Data
    ===================================================== */

    const prayers = useMemo(() => {
        if (!timings) return [];

        return [
            {
                id: 1,
                name: "الفجر",
                englishName: "Fajr",
                image: Fajr,
                time: timings.Fajr,
                type: "صلاة",
                description: "بداية وقت الفجر",
                icon: "🌙",
            },

            {
                id: 2,
                name: "الشروق",
                englishName: "Sunrise",
                image: Shurooq,
                time: timings.Sunrise,
                type: "شروق",
                description: "وقت شروق الشمس",
                icon: "🌅",
            },

            {
                id: 3,
                name: "الظهر",
                englishName: "Dhuhr",
                image: Dhuhr,
                time: timings.Dhuhr,
                type: "صلاة",
                description: "صلاة الظهر",
                icon: "☀️",
            },

            {
                id: 4,
                name: "العصر",
                englishName: "Asr",
                image: Asr,
                time: timings.Asr,
                type: "صلاة",
                description: "صلاة العصر",
                icon: "🌤️",
            },

            {
                id: 5,
                name: "المغرب",
                englishName: "Maghrib",
                image: Maghrib,
                time: timings.Maghrib,
                type: "صلاة",
                description: "صلاة المغرب",
                icon: "🌇",
            },

            {
                id: 6,
                name: "العشاء",
                englishName: "Isha",
                image: Isha,
                time: timings.Isha,
                type: "صلاة",
                description: "صلاة العشاء",
                icon: "🌌",
            },
        ];
    }, [timings]);

    /* =====================================================
       Find Next Prayer
    ===================================================== */

    const nextPrayer = useMemo(() => {
        if (!timings) return null;

        const now = new Date();

        const prayerList = [
            {
                name: "الفجر",
                time: timings.Fajr,
            },
            {
                name: "الظهر",
                time: timings.Dhuhr,
            },
            {
                name: "العصر",
                time: timings.Asr,
            },
            {
                name: "المغرب",
                time: timings.Maghrib,
            },
            {
                name: "العشاء",
                time: timings.Isha,
            },
        ];

        for (const prayer of prayerList) {
            if (!prayer.time) continue;

            const cleanTime =
                prayer.time.split(" ")[0];

            const [hours, minutes] =
                cleanTime.split(":");

            const prayerDate = new Date();

            prayerDate.setHours(
                Number(hours),
                Number(minutes),
                0,
                0
            );

            if (prayerDate > now) {
                return prayer.name;
            }
        }

        return "الفجر";
    }, [timings, currentTime]);

    /* =====================================================
       Loading
    ===================================================== */

    if (loading) {
        return (
            <section
                dir="rtl"
                className="
                    w-full
                    bg-slate-950
                    px-4
                    py-12
                "
            >
                <div className="w-full">

                    <div className="mb-10 text-center">

                        <div
                            className="
                                mx-auto
                                h-5
                                w-24
                                animate-pulse
                                rounded
                                bg-white/10
                            "
                        />

                        <div
                            className="
                                mx-auto
                                mt-3
                                h-10
                                w-64
                                animate-pulse
                                rounded
                                bg-white/10
                            "
                        />

                        <div
                            className="
                                mx-auto
                                mt-3
                                h-4
                                w-80
                                max-w-full
                                animate-pulse
                                rounded
                                bg-white/10
                            "
                        />

                    </div>

                    <div
                        className="
                            grid
                            w-full
                            grid-cols-1
                            gap-5
                            sm:grid-cols-2
                            md:grid-cols-3
                            lg:grid-cols-6
                        "
                    >
                        {Array.from({ length: 6 }).map(
                            (_, index) => (
                                <div
                                    key={index}
                                    className="
                                        h-72
                                        animate-pulse
                                        rounded-3xl
                                        border
                                        border-white/5
                                        bg-white/5
                                    "
                                />
                            )
                        )}
                    </div>

                </div>
            </section>
        );
    }

    /* =====================================================
       UI
    ===================================================== */

    return (
        <section
            id="prayers"
            dir="rtl"
            className="
                relative
                w-full
                overflow-hidden
                bg-slate-750
                px-4
                py-16
            "
        >

            {/* Background */}

            <div
                className="
                    pointer-events-none
                    absolute
                    -right-40
                    top-20
                    h-96
                    w-96
                    rounded-full
                    bg-emerald-500/5
                    blur-3xl
                "
            />

            <div
                className="
                    pointer-events-none
                    absolute
                    -left-40
                    bottom-20
                    h-96
                    w-96
                    rounded-full
                    bg-blue-500/5
                    blur-3xl
                "
            />

            {/* Full Width Container */}

            <div className="relative w-full">

                {/* =================================================
                    HEADER
                ================================================= */}

                <div className="mb-12 text-center">

                    <div
                        className="
                            mx-auto
                            mb-3
                            inline-flex
                            items-center
                            gap-2
                            rounded-full
                            border
                            border-emerald-400/10
                            bg-emerald-400/5
                            px-4
                            py-2
                        "
                    >

                        <span className="text-sm">
                            🕌
                        </span>

                        <span
                            className="
                                text-sm
                                font-medium
                                text-emerald-700
                            "
                        >
                            مواقيت اليوم
                        </span>

                    </div>

                    <h2
                        className="
                            mt-3
                            text-3xl
                            font-bold
                            tracking-tight
                            text-white 
                            md:text-4xl
                        "
                    >
                        مواقيت الصلاة
                    </h2>

                    <p
                        className="
                            mx-auto
                            mt-4
                            max-w-2xl
                            text-sm
                            leading-7
                            text-slate-400
                            md:text-base
                        "
                    >
                        تعرف على جميع مواقيت الصلاة والشروق
                        حسب الموقع الذي اخترته.
                    </p>

                </div>

                {/* =================================================
                    ERROR
                ================================================= */}

                {error && (
                    <div
                        className="
                            mb-8
                            rounded-2xl
                            border
                            border-red-500/20
                            bg-red-500/10
                            p-4
                            text-center
                            text-red-400
                        "
                    >
                        {error}
                    </div>
                )}

                {/* =================================================
                    CARDS
                ================================================= */}

                <div
                    className="
                        grid
                        w-full
                        grid-cols-1
                        gap-5
                        sm:grid-cols-2
                        md:grid-cols-3
                        lg:grid-cols-6
                    "
                >

                    {prayers.map((prayer) => {

                        const isNext =
                            prayer.name === nextPrayer;

                        const status =
                            getPrayerStatus(
                                prayer.time
                            );

                        const isPassed =
                            status === "passed";

                        return (
                            <div
                                key={prayer.id}
                                className={`
                                    group
                                    relative
                                    overflow-hidden
                                    rounded-3xl
                                    border
                                    p-5
                                    transition-all
                                    duration-300

                                    ${isNext
                                        ? "border-emerald-400/50 bg-emerald-400/10 shadow-xl shadow-emerald-950/30"
                                        : "border-white/10 bg-white/5 hover:-translate-y-2 hover:border-emerald-400/30 hover:bg-white/10"
                                    }

                                    ${isPassed
                                        ? "opacity-60"
                                        : "opacity-100"
                                    }
                                `}
                            >

                                {/* Next Prayer Badge */}

                                {isNext && (
                                    <div
                                        className="
                                            absolute
                                            right-3
                                            top-3
                                            flex
                                            items-center
                                            gap-1.5
                                            rounded-full
                                            bg-emerald-400/10
                                            px-2.5
                                            py-1
                                            text-[10px]
                                            font-medium
                                            text-emerald-400
                                            ring-1
                                            ring-emerald-400/20
                                        "
                                    >
                                        <span
                                            className="
                                                h-1.5
                                                w-1.5
                                                animate-pulse
                                                rounded-full
                                                bg-emerald-400
                                            "
                                        />

                                        القادمة
                                    </div>
                                )}

                                {/* Glow */}

                                <div
                                    className={`
                                        pointer-events-none
                                        absolute
                                        -right-12
                                        -top-12
                                        h-28
                                        w-28
                                        rounded-full
                                        blur-3xl
                                        transition-all
                                        duration-500

                                        ${isNext
                                            ? "bg-emerald-400/30"
                                            : "bg-emerald-400/5 group-hover:bg-emerald-400/15"
                                        }
                                    `}
                                />

                                {/* Number */}

                                <div
                                    className="
                                        absolute
                                        left-4
                                        top-4
                                        text-xs
                                        font-mono
                                        text-slate-700
                                    "
                                >
                                    0{prayer.id}
                                </div>
                                {/* Image */}

                                <div
                                    className={`
        relative
        mx-auto
        mb-5
        mt-4

        h-40
        w-full

        overflow-hidden
        rounded-2xl

        transition-all
        duration-500

        ${isNext
                                            ? `
                    ring-1
                    ring-emerald-400/40
                    shadow-[0_0_30px_rgba(16,185,129,0.20)]
                `
                                            : `
                    ring-1
                    ring-white/10
                    group-hover:ring-emerald-400/30
                `
                                        }
    `}
                                >
                                    {/* صورة الصلاة */}

                                    <img
                                        src={prayer.image}
                                        alt={prayer.name}
                                        className="
            absolute
            inset-0

            h-full
            w-full

            object-cover

            transition-all
            duration-500

            group-hover:scale-105
        "
                                    />

                                    {/* Overlay */}

                                    <div
                                        className="
            pointer-events-none
            absolute
            inset-0

            bg-gradient-to-t
            from-slate-950/40
            via-transparent
            to-white/5
        "
                                    />

                                    {/* Glow للصلاة القادمة */}

                                    {isNext && (
                                        <div
                                            className="
                pointer-events-none
                absolute
                inset-0
                bg-emerald-400/5
            "
                                        />
                                    )}
                                </div>
                                {/* Prayer Name */}

                                <h3
                                    className={`
                                        relative
                                        text-xl
                                        font-bold

                                        ${isNext
                                            ? "text-emerald-300"
                                            : "text-white"
                                        }
                                    `}
                                >
                                    {prayer.name}
                                </h3>

                                {/* English Name */}

                                <p
                                    className="
                                        mt-1
                                        text-[11px]
                                        uppercase
                                        tracking-wider
                                        text-white 
                                    "
                                >
                                    {prayer.englishName}
                                </p>

                                {/* Time */}

                                <div className="mt-4">

                                    <p
                                        dir="ltr"
                                        className={`
                                            font-mono
                                            text-2xl
                                            font-bold

                                            ${isNext
                                                ? "text-emerald-400"
                                                : " text-white "
                                            }
                                        `}
                                    >
                                        {formatTime(
                                            prayer.time
                                        )}
                                    </p>

                                    <p
                                        dir="ltr"
                                        className="
                                            mt-1
                                            text-[11px]
                                            text-white 
                                        "
                                    >
                                        {prayer.time
                                            ?.split(" ")[0] ||
                                            "..."}
                                    </p>

                                </div>

                                {/* Divider */}

                                <div
                                    className="
                                        my-4
                                        h-px
                                        bg-white/5
                                    "
                                />

                                {/* Description */}

                                <div
                                    className="
                                        flex
                                        items-center
                                        justify-center
                                        gap-2
                                        text-xs
                                        text-white 

                                    "
                                >

                                    <span>
                                        {prayer.icon}
                                    </span>



                                    <span className="text-white">
                                        {prayer.description}
                                    </span>

                                </div>

                            </div>
                        );
                    })}

                </div>

                {/* =================================================
                    SUMMARY
                ================================================= */}

                {!error && timings && (
                    <div
                        className="
                            mt-8
                            grid
                            w-full
                            grid-cols-2
                            gap-3
                            md:grid-cols-4
                        "
                    >

                        {/* Sunrise */}

                        <div
                            className="
                                rounded-2xl
                                border
                                border-white/10
                                bg-white/5
                                p-4
                                text-center
                                transition-all
                                duration-300
                                hover:bg-white/10
                            "
                        >
                            <p className="text-ms text-white">
                                الشروق
                            </p>

                            <p
                                className="
                                    mt-2
                                    font-semibold
                                    text-white
                                "
                            >
                                {formatTime(
                                    timings.Sunrise
                                )}
                            </p>
                        </div>

                        {/* Sunset */}

                        <div
                            className="
                                rounded-2xl
                                border
                                border-white/10
                                bg-white/5
                                p-4
                                text-center
                                transition-all
                                duration-300
                                hover:bg-white/10
                            "
                        >
                            <p className="text-ms text-white">
                                الغروب
                            </p>

                            <p
                                className="
                                    mt-2
                                    font-semibold
                                    text-white
                                "
                            >
                                {formatTime(
                                    timings.Sunset
                                )}
                            </p>
                        </div>

                        {/* Imsak */}

                        <div
                            className="
                                rounded-2xl
                                border
                                border-white/10
                                bg-white/5
                                p-4
                                text-center
                                transition-all
                                duration-300
                                hover:bg-white/10
                            "
                        >
                            <p className="text-ms text-white">
                                الإمساك
                            </p>

                            <p
                                className="
                                    mt-2
                                    font-semibold
                                    text-white
                                "
                            >
                                {formatTime(
                                    timings.Imsak
                                )}
                            </p>
                        </div>

                        {/* Midnight */}

                        <div
                            className="
                                rounded-2xl
                                border
                                border-white/10
                                bg-white/5
                                p-4
                                text-center
                                transition-all
                                duration-300
                                hover:bg-white/10
                            "
                        >
                            <p className="text-ms text-white">
                                منتصف الليل
                            </p>

                            <p
                                className="
                                    mt-2
                                    font-semibold
                                    text-white
                                "
                            >
                                {formatTime(
                                    timings.Midnight
                                )}
                            </p>
                        </div>

                    </div>
                )}

            </div>
        </section>
    );
}

export default PrayerCards;
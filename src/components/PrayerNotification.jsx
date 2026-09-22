import { useContext, useEffect, useMemo, useState } from "react";
import { CityContext } from "./context/Context";

const prayers = [
    {
        key: "Fajr",
        name: "الفجر",
        icon: "🌙",
    },
    {
        key: "Dhuhr",
        name: "الظهر",
        icon: "☀️",
    },
    {
        key: "Asr",
        name: "العصر",
        icon: "🌤️",
    },
    {
        key: "Maghrib",
        name: "المغرب",
        icon: "🌇",
    },
    {
        key: "Isha",
        name: "العشاء",
        icon: "🌌",
    },
];

// ========================================
// Create Prayer Date
// ========================================

function createPrayerDate(time, tomorrow = false) {
    if (!time) {
        return null;
    }

    const cleanTime = time.split(" ")[0];
    const [hours, minutes] = cleanTime.split(":");

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
// Format Prayer Time
// ========================================

function formatPrayerTime(time) {
    if (!time) {
        return "--:--";
    }

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
}

// ========================================
// Format Remaining
// ========================================

function formatRemaining(milliseconds) {
    if (milliseconds <= 0) {
        return "00:00:00";
    }

    const totalSeconds = Math.floor(
        milliseconds / 1000
    );

    const hours = Math.floor(
        totalSeconds / 3600
    );

    const minutes = Math.floor(
        (totalSeconds % 3600) / 60
    );

    const seconds = totalSeconds % 60;

    return [
        String(hours).padStart(2, "0"),
        String(minutes).padStart(2, "0"),
        String(seconds).padStart(2, "0"),
    ].join(":");
}

// ========================================
// Prayer Notification
// ========================================

function PrayerNotification() {
    const {
        city,
        country,
        timings,
        meta,
        loading,
    } = useContext(CityContext);

    const [currentTime, setCurrentTime] = useState(
        new Date()
    );

    const [isScrolled, setIsScrolled] = useState(false);

    const [isOpen, setIsOpen] = useState(false);

    // ========================================
    // Current Time
    // ========================================

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    // ========================================
    // Detect Scroll
    // ========================================

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 100);
        };

        window.addEventListener(
            "scroll",
            handleScroll,
            { passive: true }
        );

        handleScroll();

        return () => {
            window.removeEventListener(
                "scroll",
                handleScroll
            );
        };
    }, []);

    // ========================================
    // Next Prayer
    // ========================================

    const nextPrayer = useMemo(() => {
        if (!timings) {
            return null;
        }

        for (const prayer of prayers) {
            const prayerDate = createPrayerDate(
                timings[prayer.key]
            );

            if (
                prayerDate &&
                prayerDate > currentTime
            ) {
                return {
                    ...prayer,
                    date: prayerDate,
                };
            }
        }

        const tomorrowFajr = createPrayerDate(
            timings.Fajr,
            true
        );

        if (!tomorrowFajr) {
            return null;
        }

        return {
            key: "Fajr",
            name: "الفجر",
            icon: "🌙",
            date: tomorrowFajr,
        };
    }, [timings, currentTime]);

    if (loading || !nextPrayer) {
        return null;
    }

    const remaining =
        nextPrayer.date.getTime() -
        currentTime.getTime();

    const prayerTime =
        timings?.[nextPrayer.key];

    // ========================================
    // UI
    // ========================================

   return (
    <div dir="rtl">

        {/* =====================================================
            MOBILE
            Icon only
        ===================================================== */}

        <div
            className="
                fixed
                right-3
                top-20
                z-411110
                md:hidden
            "
        >
            {!isOpen ? (
                <button
                    type="button"
                    onClick={() => setIsOpen(true)}
                    aria-label="عرض الصلاة القادمة"
                    title="الصلاة القادمة"
                    className="
                        flex
                        h-12
                        w-12
                        items-center
                        justify-center
                        rounded-full
                        border
                        border-emerald-400/30
                        bg-slate-950/75
                        text-xl
                        shadow-xl
                        backdrop-blur-xl
                        transition-all
                        duration-300
                        hover:scale-105
                        hover:border-emerald-400/60
                    "
                >
                    {nextPrayer.icon}
                </button>
            ) : (
                <div
                    className="
                        w-[calc(100vw-1.5rem)]
                        max-w-[280px]
                        overflow-hidden
                        rounded-2xl
                        border
                        border-emerald-400/20
                        bg-slate-950/85
                        shadow-2xl
                        backdrop-blur-xl
                    "
                >
                    {/* Header */}

                    <div
                        className="
                            flex
                            items-center
                            justify-between
                            gap-3
                            border-b
                            border-white/10
                            p-3
                        "
                    >
                        <div className="flex items-center gap-3">

                            <div
                                className="
                                    flex
                                    h-10
                                    w-10
                                    shrink-0
                                    items-center
                                    justify-center
                                    rounded-xl
                                    bg-emerald-500/10
                                    text-xl
                                "
                            >
                                {nextPrayer.icon}
                            </div>

                            <div>
                                <p className="text-xs text-slate-400">
                                    الصلاة القادمة
                                </p>

                                <h3 className="mt-1 text-base font-bold text-white">
                                    {nextPrayer.name}
                                </h3>
                            </div>

                        </div>

                        <button
                            type="button"
                            onClick={() => setIsOpen(false)}
                            aria-label="إخفاء"
                            className="
                                flex
                                h-8
                                w-8
                                items-center
                                justify-center
                                rounded-lg
                                text-lg
                                text-slate-400
                                transition
                                hover:bg-white/10
                                hover:text-white
                            "
                        >
                            ×
                        </button>
                    </div>

                    {/* Countdown */}

                    <div className="p-3">

                        <div
                            className="
                                rounded-xl
                                border
                                border-white/10
                                bg-white/5
                                p-3
                                text-center
                            "
                        >
                            <p
                                dir="ltr"
                                className="
                                    font-mono
                                    text-xl
                                    font-bold
                                    tracking-wider
                                    text-emerald-400
                                "
                            >
                                {formatRemaining(remaining)}
                            </p>

                            <p className="mt-1 text-xs text-slate-500">
                                الوقت المتبقي
                            </p>
                        </div>

                        <div className="mt-3 flex items-center justify-between text-sm">
                            <span className="text-slate-400">
                                الوقت
                            </span>

                            <span className="font-semibold text-white">
                                {formatPrayerTime(prayerTime)}
                            </span>
                        </div>

                        <div className="mt-2 flex items-center justify-between text-sm">
                            <span className="text-slate-400">
                                الموقع
                            </span>

                            <span className="max-w-[150px] truncate font-semibold text-emerald-400">
                                {city}
                            </span>
                        </div>

                        <div className="mt-2 flex items-center justify-between text-sm">
                            <span className="text-slate-400">
                                التوقيت
                            </span>

                            <span className="max-w-[150px] truncate text-xs text-slate-500">
                                {meta?.timezone || "التوقيت المحلي"}
                            </span>
                        </div>

                    </div>

                    {/* Progress */}

                    <div className="h-1 bg-white/5">
                        <div
                            className="h-full bg-emerald-400 transition-all duration-1000"
                            style={{
                                width: `${Math.max(
                                    5,
                                    Math.min(
                                        100,
                                        (remaining /
                                            (1000 * 60 * 60)) *
                                            100
                                    )
                                )}%`,
                            }}
                        />
                    </div>

                </div>
            )}
        </div>

        {/* =====================================================
            DESKTOP
        ===================================================== */}

        <div
            className={`
                hidden
                md:block
                fixed
                z-40
                transition-all
                duration-500
                ease-in-out

                ${
                    isScrolled
                        ? `
                            right-4
                            top-20
                            w-[280px]

                            lg:right-6
                            lg:top-24
                        `
                        : `
                            left-0
                            right-0
                            top-33
                            px-3
                            pt-3
                        `
                }
            `}
        >

            {!isScrolled ? (

                /* Full Width Desktop */

                <div
                    className="
                        mx-auto
                        w-full
                        max-w-7xl
                        overflow-hidden
                        rounded-2xl
                        border
                        border-emerald-400/20
                        bg-slate-950/70
                        shadow-2xl
                        backdrop-blur-xl
                    "
                >

                    <div
                        className="
                            flex
                            items-center
                            justify-between
                            gap-4
                            px-4
                            py-3
                            md:px-6
                        "
                    >

                        <div className="flex items-center gap-3">

                            <div
                                className="
                                    flex
                                    h-11
                                    w-11
                                    shrink-0
                                    items-center
                                    justify-center
                                    rounded-xl
                                    bg-emerald-500/10
                                    text-xl
                                "
                            >
                                {nextPrayer.icon}
                            </div>

                            <div>

                                <p className="text-xs text-slate-400">
                                    الصلاة القادمة
                                </p>

                                <div className="flex items-center gap-2">

                                    <h3 className="text-lg font-bold text-white">
                                        {nextPrayer.name}
                                    </h3>

                                    <span className="text-sm text-emerald-400">
                                        {formatPrayerTime(prayerTime)}
                                    </span>

                                </div>

                            </div>

                        </div>

                        <div className="text-right">

                            <p className="text-xs text-slate-400">
                                الوقت المتبقي
                            </p>

                            <p
                                dir="ltr"
                                className="
                                    font-mono
                                    text-xl
                                    font-bold
                                    tracking-wider
                                    text-emerald-400
                                "
                            >
                                {formatRemaining(remaining)}
                            </p>

                        </div>

                        <div className="hidden border-r border-white/10 pr-5 sm:block">

                            <p className="text-xs text-slate-400">
                                الموقع
                            </p>

                            <p className="text-sm font-semibold text-white">
                                {city}
                                {country ? `، ${country}` : ""}
                            </p>

                            <p className="text-xs text-slate-500">
                                {meta?.timezone || "التوقيت المحلي"}
                            </p>

                        </div>

                    </div>

                    <div className="h-1 bg-white/5">
                        <div
                            className="h-full bg-emerald-400 transition-all duration-1000"
                            style={{
                                width: `${Math.max(
                                    5,
                                    Math.min(
                                        100,
                                        (remaining /
                                            (1000 * 60 * 60)) *
                                            100
                                    )
                                )}%`,
                            }}
                        />
                    </div>

                </div>

            ) : (

                /* Desktop Floating Card */

                !isOpen ? (

                    <button
                        type="button"
                        onClick={() => setIsOpen(true)}
                        aria-label="عرض الصلاة القادمة"
                        title="الصلاة القادمة"
                        className="
                            flex
                            h-14
                            w-14
                            items-center
                            justify-center
                            rounded-2xl
                            border
                            border-emerald-400/30
                            bg-slate-950/75
                            text-2xl
                            shadow-2xl
                            backdrop-blur-xl
                            transition-all
                            duration-300
                            hover:scale-105
                            hover:border-emerald-400/60
                        "
                    >
                        {nextPrayer.icon}
                    </button>

                ) : (

                    <div
                        className="
                            w-[280px]
                            overflow-hidden
                            rounded-2xl
                            border
                            border-emerald-400/20
                            bg-slate-950/80
                            shadow-2xl
                            backdrop-blur-xl
                        "
                    >

                        <div className="flex items-center justify-between border-b border-white/10 p-4">

                            <div className="flex items-center gap-3">

                                <div
                                    className="
                                        flex
                                        h-10
                                        w-10
                                        items-center
                                        justify-center
                                        rounded-xl
                                        bg-emerald-500/10
                                        text-xl
                                    "
                                >
                                    {nextPrayer.icon}
                                </div>

                                <div>
                                    <p className="text-xs text-slate-400">
                                        الصلاة القادمة
                                    </p>

                                    <h3 className="mt-1 text-lg font-bold text-white">
                                        {nextPrayer.name}
                                    </h3>
                                </div>

                            </div>

                            <button
                                type="button"
                                onClick={() => setIsOpen(false)}
                                className="text-lg text-slate-400 hover:text-white"
                            >
                                ×
                            </button>

                        </div>

                        <div className="p-4">

                            <div className="rounded-xl border border-white/10 bg-white/5 p-3 text-center">

                                <p
                                    dir="ltr"
                                    className="
                                        font-mono
                                        text-2xl
                                        font-bold
                                        tracking-wider
                                        text-emerald-400
                                    "
                                >
                                    {formatRemaining(remaining)}
                                </p>

                                <p className="mt-1 text-xs text-slate-500">
                                    الوقت المتبقي
                                </p>

                            </div>

                            <div className="mt-3 flex justify-between text-sm">
                                <span className="text-slate-400">
                                    الوقت
                                </span>

                                <span className="font-semibold text-white">
                                    {formatPrayerTime(prayerTime)}
                                </span>
                            </div>

                            <div className="mt-2 flex justify-between text-sm">
                                <span className="text-slate-400">
                                    الموقع
                                </span>

                                <span className="font-semibold text-emerald-400">
                                    {city}
                                </span>
                            </div>

                        </div>

                        <div className="h-1 bg-white/5">
                            <div
                                className="h-full bg-emerald-400 transition-all duration-1000"
                                style={{
                                    width: `${Math.max(
                                        5,
                                        Math.min(
                                            100,
                                            (remaining /
                                                (1000 * 60 * 60)) *
                                                100
                                        )
                                    )}%`,
                                }}
                            />
                        </div>

                    </div>
                )
            )}

        </div>
    </div>
);
}

export default PrayerNotification;
import { useContext } from "react";
import { CityContext } from "./context/Context";

function PrayerInfo() {
    const { date, meta, timings } = useContext(CityContext);

    if (!date || !timings) {
        return null;
    }

    return (
        <section
            dir="rtl"
            className="
                w-full
                bg-slate-750
                px-4
                py-10
            "
        >
            <div className="w-full">

                <div
                    className="
                        grid
                        w-full
                        grid-cols-1
                        gap-5
                        sm:grid-cols-2
                        lg:grid-cols-4
                    "
                >

                    {/* التاريخ الهجري */}
                    <div
                        className="
                            w-full
                            rounded-2xl
                            border
                            border-white/10
                            bg-white/5
                            p-5
                        "
                    >
                        <p className="text-sm text-slate-400">
                            التاريخ الهجري
                        </p>

                        <h3 className="mt-2 text-xl font-bold text-white">
                            {date.hijri.day}{" "}
                            {date.hijri.month.ar}{" "}
                            {date.hijri.year}
                        </h3>
                    </div>

                    {/* التاريخ الميلادي */}
                    <div
                        className="
                            w-full
                            rounded-2xl
                            border
                            border-white/10
                            bg-white/5
                            p-5
                        "
                    >
                        <p className="text-sm text-slate-400">
                            التاريخ الميلادي
                        </p>

                        <h3 className="mt-2 text-xl font-bold text-white">
                            {date.readable}
                        </h3>
                    </div>

                    {/* المنطقة الزمنية */}
                    <div
                        className="
                            w-full
                            rounded-2xl
                            border
                            border-white/10
                            bg-white/5
                            p-5
                        "
                    >
                        <p className="text-sm text-slate-400">
                            المنطقة الزمنية
                        </p>

                        <h3 className="mt-2 text-xl font-bold text-white">
                            {meta?.timezone || "غير متوفر"}
                        </h3>
                    </div>

                    {/* الإمساك */}
                    <div
                        className="
                            w-full
                            rounded-2xl
                            border
                            border-white/10
                            bg-white/5
                            p-5
                        "
                    >
                        <p className="text-sm text-slate-400">
                            الإمساك
                        </p>

                        <h3 className="mt-2 text-xl font-bold text-emerald-400">
                            {timings.Imsak || "--:--"}
                        </h3>
                    </div>

                </div>

            </div>
        </section>
    );
}

export default PrayerInfo;
// import { createContext, useEffect, useState } from "react";

// export const CityContext = createContext();

// export function CityProvider({ children }) {
//     const [city, setCity] = useState("Cairo");

//     const [prayerData, setPrayerData] = useState(null);
//     const [loading, setLoading] = useState(false);
//     const [error, setError] = useState("");

//     useEffect(() => {
//         const fetchPrayerData = async () => {
//             try {
//                 setLoading(true);
//                 setError("");

//                 const response = await fetch(
//                     `https://api.aladhan.com/v1/timingsByCity?city=${city}&country=Egypt&method=5`
//                 );

//                 if (!response.ok) {
//                     throw new Error("Failed to fetch data");
//                 }

//                 const result = await response.json();

//                 setPrayerData(result.data);
//             } catch (error) {
//                 console.error(error);
//                 setError("حدث خطأ أثناء جلب البيانات");
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchPrayerData();
//     }, [city]);

//     return (
//         <CityContext.Provider
//             value={{
//                 city,
//                 setCity,

//                 prayerData,
//                 timings: prayerData?.timings,

//                 date: prayerData?.date,
//                 meta: prayerData?.meta,

//                 loading,
//                 error,
//             }}
//         >
//             {children}
//         </CityContext.Provider>
//     );
// }
import { createContext, useEffect, useState } from "react";

export const CityContext = createContext();

const DEFAULT_LOCATION = {
    country: "Egypt",
    city: "Cairo",
};

export function CityProvider({ children }) {
    // =========================
    // Location State
    // =========================

    const [country, setCountry] = useState(() => {
        const savedLocation = localStorage.getItem("prayerLocation");

        if (savedLocation) {
            try {
                const parsedLocation = JSON.parse(savedLocation);
                return parsedLocation.country || DEFAULT_LOCATION.country;
            } catch {
                return DEFAULT_LOCATION.country;
            }
        }

        return DEFAULT_LOCATION.country;
    });

    const [city, setCity] = useState(() => {
        const savedLocation = localStorage.getItem("prayerLocation");

        if (savedLocation) {
            try {
                const parsedLocation = JSON.parse(savedLocation);
                return parsedLocation.city || DEFAULT_LOCATION.city;
            } catch {
                return DEFAULT_LOCATION.city;
            }
        }

        return DEFAULT_LOCATION.city;
    });

    // =========================
    // Prayer Data State
    // =========================

    const [prayerData, setPrayerData] = useState(null);

    const [loading, setLoading] = useState(false);

    const [error, setError] = useState("");

    // =========================
    // Fetch Prayer Times
    // =========================

    useEffect(() => {
        const fetchPrayerData = async () => {
            if (!country || !city) {
                return;
            }

            try {
                setLoading(true);
                setError("");

                const url =
                    `https://api.aladhan.com/v1/timingsByCity` +
                    `?city=${encodeURIComponent(city)}` +
                    `&country=${encodeURIComponent(country)}` +
                    `&method=5`;

                const response = await fetch(url);

                if (!response.ok) {
                    throw new Error("Failed to fetch prayer times");
                }

                const result = await response.json();

                if (result.code !== 200 || !result.data) {
                    throw new Error("Location not found");
                }

                setPrayerData(result.data);

                // Save last successful location
                localStorage.setItem(
                    "prayerLocation",
                    JSON.stringify({
                        country,
                        city,
                    })
                );
            } catch (error) {
                console.error("Prayer API Error:", error);

                setPrayerData(null);

                setError(
                    "لم نتمكن من العثور على مواقيت الصلاة لهذا الموقع. تأكد من اسم الدولة والمدينة."
                );
            } finally {
                setLoading(false);
            }
        };

        fetchPrayerData();
    }, [country, city]);

    // =========================
    // Context Values
    // =========================

    return (
        <CityContext.Provider
            value={{
                // Location
                country,
                setCountry,

                city,
                setCity,

                // Prayer Data
                prayerData,

                timings: prayerData?.timings,

                date: prayerData?.date,

                meta: prayerData?.meta,

                // Status
                loading,

                error,
            }}
        >
            {children}
        </CityContext.Provider>
    );
}
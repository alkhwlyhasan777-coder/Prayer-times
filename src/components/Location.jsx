// // // import 'components/location.css'
// // function Location() {
// //     return (
// //         <div className="location">
// //             <div>
// //                 <div className="data_location">
// //                     <div className="local">
// //                         <h2>يونيو <span>6</span> <span>2026</span> | <span>6:44</span></h2>
// //                         <p>مصر, الجيزة</p>
// //                     </div>
// //                     <div className="date">
// //                         <h2>متبقي علي صلاة المغرب</h2>
// //                         <p>1 : 23 : 55</p>
// //                     </div>
// //                 </div>
// //             </div>
// //         </div>
// //     )
// // }

// // export default Location
// import { useEffect, useState } from "react";

// function Location() {
//     const [currentTime, setCurrentTime] = useState(new Date());

//     useEffect(() => {
//         const interval = setInterval(() => {
//             setCurrentTime(new Date());
//         }, 1000);

//         return () => clearInterval(interval);
//     }, []);

//     const day = currentTime.getDate();
//     const month = currentTime.toLocaleString("ar-EG", { month: "long" });
//     const year = currentTime.getFullYear();
//     const time = currentTime.toLocaleTimeString("ar-EG", {
//         hour: "2-digit",
//         minute: "2-digit",
//         second: "2-digit",
//     });
//     const prayers = [
//         "الفجر",
//         "الشروق",
//         "الظهر",
//         "العصر",
//         "المغرب",
//         "العشاء",
//       ];
//     return (
//         <div className="location">
//             <div>
//                 <div className="data_location">
//                     <div className="local">
//                         <h2>
//                             {month} <span>{day}</span>{" "}
//                             <span>{year}</span> | <span>{time}</span>
//                         </h2>
//                         <p>مصر، الجيزة</p>
//                     </div>
//                     <div className="date">
//                         {prayers.map((prayer) => (
//                             <h2 key={prayer}>متبقي علي صلاة {prayer}</h2>
//                         ))}
//                         <p>01:23:55</p>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// }

// export default Location;
import { useEffect, useState } from "react";
import { useContext } from "react";
import { CityContext } from "./context/Context";
function Location() {
    const [currentTime, setCurrentTime] = useState(new Date());
    const [nextPrayer, setNextPrayer] = useState("");
    const [countdown, setCountdown] = useState("");
    const [timings, setTimings] = useState(null);
    const { city, setCity } = useContext(CityContext);
    
    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    useEffect(() => {
        const fetchPrayerTimes = async () => {
            try {
                const response = await fetch(
                    `https://api.aladhan.com/v1/timingsByCity?city=${city}&country=Egypt&method=5`
                );

                const data = await response.json();
                setTimings(data.data.timings);
                console.log(response);
            } catch (error) {
                console.error(error);
            }
        };
        fetchPrayerTimes();
    }, [city]);

    useEffect(() => {
        if (!timings) return;

        const prayers = [
            { name: "الفجر", time: timings.Fajr },
            { name: "الظهر", time: timings.Dhuhr },
            { name: "العصر", time: timings.Asr },
            { name: "المغرب", time: timings.Maghrib },
            { name: "العشاء", time: timings.Isha },
        ];

        const now = new Date();

        let upcomingPrayer = null;

        for (const prayer of prayers) {
            const [h, m] = prayer.time.split(":");

            const date = new Date();
            date.setHours(h, m, 0, 0);

            if (date > now) {
                upcomingPrayer = { ...prayer, date };
                break;
            }
        }

        if (!upcomingPrayer) {
            const [h, m] = timings.Fajr.split(":");

            const date = new Date();
            date.setDate(date.getDate() + 1);
            date.setHours(h, m, 0, 0);

            upcomingPrayer = { name: "الفجر", date };
        }

        const diff = upcomingPrayer.date - now;

        const h = Math.floor(diff / (1000 * 60 * 60));
        const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const s = Math.floor((diff % (1000 * 60)) / 1000);

        setNextPrayer(upcomingPrayer.name);

        setCountdown(
            `${h.toString().padStart(2, "0")} : ${m
                .toString()
                .padStart(2, "0")} : ${s.toString().padStart(2, "0")}`
        );
    }, [currentTime, timings]);

    const day = currentTime.getDate();
    const month = currentTime.toLocaleString("ar-EG", { month: "long" });
    const year = currentTime.getFullYear();

    const time = currentTime.toLocaleTimeString("ar-EG", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
    });

    return (
        <div className="location">
            <div className="data_location">
                
                {/* 🟢 الجزء العلوي */}
                <div className="local">
                    <h2>
                        {month} <span>{day}</span>{" "}
                        <span>{year}</span> | <span>{time}</span>
                    </h2>

                    <div className="city-selector">
                        <select
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                        >
                            <option value="Cairo">القاهرة</option>
                            <option value="Giza">الجيزة</option>
                            <option value="Alexandria">الإسكندرية</option>
                            <option value="Luxor">الأقصر</option>
                            <option value="Aswan">أسوان</option>
                            <option value="Hurghada">الغردقة</option>
                            <option value="Suez">السويس</option>
                            <option value="Port Said">بورسعيد</option>
                            <option value="Mansoura">المنصورة</option>
                            <option value="Sharm El-Sheikh">شرم الشيخ</option>

                        </select>
                    </div>
                </div>

                <div className="date">
                    <h2>
                        {nextPrayer
                            ? `متبقي على صلاة ${nextPrayer}`
                            : "جاري التحميل..."}
                    </h2>

                    <p>{countdown}</p>
                </div>
            </div>
        </div>
    );
}

export default Location;
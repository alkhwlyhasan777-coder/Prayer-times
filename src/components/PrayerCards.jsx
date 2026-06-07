import { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";

import Fajr from "../assets/Fajr.png";
import Shurooq from "../assets/الشروق.png";
import Dhuhr from "../assets/الظهر.png";
import Asr from "../assets/العصر .png";
import Maghrib from "../assets/المغرب.png";
import Isha from "../assets/العشاء.png";
import { useContext} from "react";
import { CityContext } from "../components/context/Context.jsx";
function PrayerCards() {
    const [timings, setTimings] = useState();
    const { city } = useContext(CityContext);
    
    useEffect(() => {
        const getPrayerTimes = async () => {
            try {
                const response = await fetch(
                    `https://api.aladhan.com/v1/timingsByCity?city=${city}&country=Egypt&method=5`
                );
    
                const data = await response.json();
                setTimings(data.data.timings);
            } catch (error) {
                console.error(error);
            }
        };
    
        getPrayerTimes();
    }, [city]);

    const prayers = [
        {
            name: "الفجر",
            image: Fajr,
            time: timings?.Fajr,
        },
        {
            name: "الشروق",
            image: Shurooq,
            time: timings?.Sunrise,
        },
        {
            name: "الظهر",
            image: Dhuhr,
            time: timings?.Dhuhr,
        },
        {
            name: "العصر",
            image: Asr,
            time: timings?.Asr,
        },
        {
            name: "المغرب",
            image: Maghrib,
            time: timings?.Maghrib,
        },
        {
            name: "العشاء",
            image: Isha,
            time: timings?.Isha,
        },
    ];
    const formatTime = (time) => {
    const [hours, minutes] = time.split(":");

    const date = new Date();
    date.setHours(hours);
    date.setMinutes(minutes);

    return date.toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
    });
};

    return (
        <Grid container spacing={3}>
            {prayers.map((prayer) => (
                <Grid
                    className="prayr-grid"
                    key={prayer.name}
                    size={{ xs: 12, sm: 6, md: 4, lg: 2 }}
                >
                    <Paper className="prayer-card">
                        <img
                            src={prayer.image}
                            alt={prayer.name}
                            className="prayer-image"
                        />

                        <h3>{prayer.name}</h3>
                        <p>{prayer.time ? formatTime(prayer.time) : "..."}</p>
                    </Paper>
                </Grid>
            ))}
        </Grid>
    );
}

export default PrayerCards;
// import Grid from "@mui/material/Grid";
// import Paper from "@mui/material/Paper";
// import Fajr from "../assets/Fajr.png";
// import Shurooq from "../assets/الشروق.png";
// import Dhuhr from "../assets/الظهر.png";
// import Asr from "../assets/العصر .png";
// import Maghrib from "../assets/المغرب.png";
// import Isha from "../assets/العشاء.png";
// const prayers = [
// {
//     name: "الفجر",
//     image: Fajr,
//     time: "05:12 AM",
// },
// {
//     name: "الشروق",
//     image: Shurooq,
//     time: "06:35 AM",
// },
// {
//     name: "الظهر",
//     image: Dhuhr,
//     time: "12:05 PM",
// },
// {
//     name: "العصر",
//     image: Asr,
//     time: "03:30 PM",
// },
// {
//     name: "المغرب",
//     image: Maghrib,
//     time: "06:45 PM",
// },
// {
//     name: "العشاء",
//     image: Isha,
//     time: "08:05 PM",
// },
// ];

// function PrayerCards() {
//     return (
//         <Grid container spacing={3}>
//             {prayers.map((prayer) => (
//                 <Grid
//                     key={prayer.name}
//                     size={{ xs: 12, sm: 6, md: 4, lg: 2 }}
//                 >
//                     <Paper className="prayer-card">
//                     <img
//                         src={prayer.image}
//                         alt={prayer.name}
//                         className="prayer-image"
//                     />
//                         <h3>{prayer.name}</h3>
//                         <p>{prayer.time}</p>
//                     </Paper>
//                 </Grid>
//             ))}
//         </Grid>
//     );
// }
// export default PrayerCards;
// // import Grid from "@mui/material/Grid";
// // import Paper from "@mui/material/Paper";
// // import { Fajr } from "../assets/الفجر.png";
// // import { Shurooq } from "../assets/الشروق.png";
// // import { Dhuhr } from "../assets/الظهر.png";
// // import { Asr } from "../assets/العصر.png";
// // import { Maghrib } from "../assets/المغرب.png";
// // import { Isha } from "../assets/العشاء.png";
// // const prayers = [
// //     "الفجر",
// //     "الشروق",
// //     "الظهر",
// //     "العصر",
// //     "المغرب",
// //     "العشاء",
// // ];

// // function PrayerCards() {
// //     return (
// //         <Grid container spacing={3}>
// //         {prayers.map((prayer) => (
// //             <Grid
// //             key={prayer}
// //             size={{ xs: 12, sm: 6, md: 4, lg: 2 }}
// //             >
// //                 <Paper className="prayer-card">
// //                     <img src={Fajr} alt="Fajr" />
// //                 <h3>{prayer}</h3>
// //                 <p>05:12 AM</p>
// //             </Paper>
// //             </Grid>
// //         ))}
// //         </Grid>
// //     );
// // }

// // export default PrayerCards;
import { useEffect, useState } from "react";

const verses = [
    {
        text: "إِنَّ اللَّهَ وَمَلَائِكَتَهُ يُصَلُّونَ عَلَى النَّبِيِّ ۚ يَا أَيُّهَا الَّذِينَ آمَنُوا صَلُّوا عَلَيْهِ وَسَلِّمُوا تَسْلِيمًا",
        surah: "سورة الأحزاب",
        ayah: "56",
    },

    {
        text: "حَافِظُوا عَلَى الصَّلَوَاتِ وَالصَّلَاةِ الْوُسْطَىٰ وَقُومُوا لِلَّهِ قَانِتِينَ",
        surah: "سورة البقرة",
        ayah: "238",
    },

    {
        text: "إِنَّ الصَّلَاةَ تَنْهَىٰ عَنِ الْفَحْشَاءِ وَالْمُنكَرِ",
        surah: "سورة العنكبوت",
        ayah: "45",
    },

    {
        text: "وَأَقِمِ الصَّلَاةَ لِذِكْرِي",
        surah: "سورة طه",
        ayah: "14",
    },

    {
        text: "وَأَقِمِ الصَّلَاةَ طَرَفَيِ النَّهَارِ وَزُلَفًا مِنَ اللَّيْلِ",
        surah: "سورة هود",
        ayah: "114",
    },

    {
        text: "إِنَّ الصَّلَاةَ كَانَتْ عَلَى الْمُؤْمِنِينَ كِتَابًا مَّوْقُوتًا",
        surah: "سورة النساء",
        ayah: "103",
    },
];

function QuranSection() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % verses.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const currentVerse = verses[currentIndex];

  return (
    <section
    id="quran"
      dir="rtl"
      className="
                relative
                flex
                min-h-screen
                w-full
                items-center
                justify-center
                overflow-hidden
                px-5
                py-16
            "
    >
      {/* Decorative Background */}
      <div
        className="
                    absolute
                    right-[-120px]
                    top-[-120px]
                    h-[350px]
                    w-[350px]
                    rounded-full
                    bg-emerald-500/10
                    blur-3xl
                "
      />

      <div
        className="
                    absolute
                    bottom-[-150px]
                    left-[-100px]
                    h-[350px]
                    w-[350px]
                    rounded-full
                    bg-emerald-400/10
                    blur-3xl
                "
      />

      {/* Main Content */}
      <div className="relative z-10 mx-auto w-full max-w-5xl text-center">

        {/* Small Heading */}
        <div className="mb-10">

          <span
            className="
                            inline-flex
                            items-center
                            gap-2
                            rounded-full
                            border
                            border-emerald-400/20
                            bg-emerald-400/10
                            px-5
                            py-2
                            text-sm
                            text-emerald-300
                            backdrop-blur-md
                        "
          >
    
            <span>آيات عن الصلاة</span>
            
          </span>

        </div>

        {/* Verse Card */}
        <div
          key={currentIndex}
           className="
    quran-verse-enter
    rounded-[2rem]
    border border-white/10
    bg-slate-700/15
    
    px-6 py-10
    shadow-2xl
    md:px-12 md:py-14
  "
        >

          {/* Top Ornament */}
          <div className="mb-8 text-3xl text-emerald-400/80">
            ❈
          </div>

          {/* Verse */}
          <p
            className="
    font-quran
    mx-auto
    max-w-4xl
    text-3xl
    font-bold
    leading-[2.3]
    text-white
    sm:text-4xl
    md:text-5xl
    lg:text-6xl
"
          >
            {currentVerse.text}
          </p>

          {/* Bottom Ornament */}
          <div className="mt-8 text-3xl text-emerald-400/80">
            ❈
          </div>

          {/* Reference */}
          <div className="mt-8">

            <p className="text-lg font-semibold text-emerald-400">
              {currentVerse.surah}
            </p>

            <p className="mt-2 text-sm text-slate-400">
              الآية {currentVerse.ayah}
            </p>

          </div>

        </div>

        {/* Progress Indicators */}
        <div className="mt-8 flex justify-center gap-2">

          {verses.map((_, index) => (
            <span
              key={index}
              className={`
                                h-1.5
                                rounded-full
                                transition-all
                                duration-700

                                ${index === currentIndex
                  ? "w-10 bg-emerald-400"
                  : "w-2 bg-white/20"
                }
                            `}
            />
          ))}

        </div>

        {/* Caption */}
        <p className="mt-6 text-sm text-slate-500">
          آيات مختارة تذكّر بعظمة الصلاة وأهميتها
        </p>

      </div>
    </section>
  );
}

export default QuranSection;
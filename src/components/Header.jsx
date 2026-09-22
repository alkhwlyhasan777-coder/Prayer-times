
function Header() {

    return (
        <header
            dir="rtl"
            className="
                fixed
                top-0
                left-0
                right-0
                z-50
                border-b
                border-white/10
                bg-slate-950/60
                backdrop-blur-xl
            "
        >
            <div
                className="
                    mx-auto
                    flex
                    h-16
                    w-full
                    items-center
                    justify-between
                    px-4
                    md:px-8
                "
        >{/* Navigation */}
          <nav className="hidden items-center gap-6 md:flex">
            <a
              href="#location"
              className="text-sm text-slate-300 transition hover:text-emerald-400"
            >
              الموقع
            </a>

            <a
              href="#prayers"
              className="text-sm text-slate-300 transition hover:text-emerald-400"
            >
              مواقيت الصلاة
            </a>

            <a
              href="#quran"
              className="text-sm text-slate-300 transition hover:text-emerald-400"
            >
              آيات
            </a>
          </nav>
                {/* Logo */}
                <a
                    href="#top"
                    className="flex items-center gap-3"
                >
                    <div
                        className="
                            flex
                            h-10
                            w-10
                            items-center
                            justify-center
                            rounded-xl
                            border
                            border-emerald-400/20
                            bg-emerald-400/10
                            text-lg
                        "
                    >
                        🕌
                    </div>

                    <div className="leading-tight">
                        <h1 className="text-base font-bold text-white md:text-lg">
                            Prayer Times
                        </h1>

                        <p className="text-[11px] text-slate-400">
                            مواقيت الصلاة
                        </p>
                    </div>
                </a>

                
            </div>
        </header>
    );
}

export default Header;
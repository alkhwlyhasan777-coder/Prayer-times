import logo from "../assets/logo.png";

function Header() {
    return (
        <header
            dir="rtl"
            className="
                fixed
                top-3
                left-1/2
                z-50
                w-[calc(100%-1.5rem)]
                max-w-2xl
                -translate-x-1/2

                rounded-full
                border
                border-white/10
                bg-slate-950/40
                backdrop-blur-xl

                md:top-5
                md:w-[calc(100%-2rem)]
            "
        >
            <div
                className="
                    flex
                    h-14
                    w-full
                    items-center
                    justify-center
                    px-4

                    sm:h-16
                    sm:px-6
                    md:px-8
                "
            >
                <nav
                    className="
                        flex
                        w-full
                        items-center
                        justify-center
                        gap-5

                        sm:gap-8
                        md:gap-12
                        lg:gap-16
                    "
                >
                    <a
                        href="#location"
                        className="
                            whitespace-nowrap
                            text-xs
                            text-slate-300
                            transition
                            duration-300
                            hover:text-emerald-400

                            sm:text-sm
                        "
                    >
                        الموقع
                    </a>

                    <a
                        href="#prayers"
                        className="
                            whitespace-nowrap
                            text-xs
                            text-slate-300
                            transition
                            duration-300
                            hover:text-emerald-400

                            sm:text-sm
                        "
                    >
                        مواقيت الصلاة
                    </a>

                    <a
                        href="#quran"
                        className="
                            whitespace-nowrap
                            text-xs
                            text-slate-300
                            transition
                            duration-300
                            hover:text-emerald-400

                            sm:text-sm
                        "
                    >
                        آيات
                    </a>
                </nav>
            </div>
        </header>
    );
}

export default Header;
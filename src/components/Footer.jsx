function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer
            dir="rtl"
            className="
                relative
                z-10
                border-t
                border-white/10
                bg-slate-950/60
                px-4
                py-10
                backdrop-blur-md
            "
        >
            <div className="mx-auto w-full max-w-7xl">

                <div
                    className="
                        grid
                        grid-cols-1
                        gap-8
                        text-center
                        md:grid-cols-3
                        md:text-right
                    "
                >

                    {/* Brand */}
                    <div>

                        <h3 className="text-xl font-bold text-white">
                            Prayer Times
                        </h3>

                        <p className="mt-3 max-w-md text-sm leading-7 text-slate-400">
                            تطبيق بسيط وسريع لعرض مواقيت الصلاة
                            حسب موقعك، مع عرض الصلاة القادمة والوقت المتبقي.
                        </p>

                    </div>

                    {/* Features */}
                    <div>

                        <h4 className="font-semibold text-white">
                            الخدمات
                        </h4>

                        <div className="mt-4 space-y-2 text-sm text-slate-400">

                            <p className="transition hover:text-emerald-400">
                                مواقيت الصلاة
                            </p>

                            <p className="transition hover:text-emerald-400">
                                الصلاة القادمة
                            </p>

                            <p className="transition hover:text-emerald-400">
                                اختيار الموقع
                            </p>

                        </div>

                    </div>

                    {/* Info */}
                    <div>

                        <h4 className="font-semibold text-white">
                            معلومات
                        </h4>

                        <div className="mt-4 space-y-2 text-sm text-slate-400">

                            <p>
                                🌍 دعم المواقع المختلفة
                            </p>

                            <p>
                                🕐 توقيت محلي
                            </p>

                            <p>
                                📱 تصميم متجاوب
                            </p>

                        </div>

                    </div>

                </div>

                {/* Bottom */}
                <div
                    className="
                        mt-8
                        flex
                        flex-col
                        items-center
                        justify-between
                        gap-4
                        border-t
                        border-white/10
                        pt-6
                        text-center
                        text-sm
                        text-slate-500
                        md:flex-row
                    "
                >

                    <p>
                        © {currentYear} Prayer Times. جميع الحقوق محفوظة.
                    </p>
                </div>

            </div>
        </footer>
    );
}

export default Footer;
import React from 'react'

const SparkleIcon = () => (
    <svg width="44" height="44" viewBox="0 0 44 44" fill="none">
        <path d="M22 2L24.2 19.8L42 22L24.2 24.2L22 42L19.8 24.2L2 22L19.8 19.8Z" fill="white" opacity="0.92"/>
        <path d="M22 9L23.4 20.6L35 22L23.4 23.4L22 35L20.6 23.4L9 22L20.6 20.6Z" fill="white" opacity="0.45"/>
    </svg>
)

const SunIcon = () => (
    <svg width="38" height="38" viewBox="0 0 38 38" fill="none">
        <circle cx="19" cy="19" r="7" fill="white" opacity="0.95"/>
        {[0, 45, 90, 135, 180, 225, 270, 315].map((deg, i) => (
            <line
                key={i}
                x1={19 + 10 * Math.cos((deg - 90) * Math.PI / 180)}
                y1={19 + 10 * Math.sin((deg - 90) * Math.PI / 180)}
                x2={19 + 14 * Math.cos((deg - 90) * Math.PI / 180)}
                y2={19 + 14 * Math.sin((deg - 90) * Math.PI / 180)}
                stroke="white" strokeWidth="2.5" strokeLinecap="round"
            />
        ))}
    </svg>
)

const BinocularsIcon = () => (
    <svg width="52" height="52" viewBox="0 0 50 50" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="14" cy="30" r="9"/>
        <circle cx="36" cy="30" r="9"/>
        <path d="M5 30 C5 19 11 15 14 15"/>
        <path d="M45 30 C45 19 39 15 36 15"/>
        <path d="M14 15 L20 23"/>
        <path d="M36 15 L30 23"/>
        <path d="M20 23 L30 23"/>
        <path d="M20 23 C20 19 23 17 25 17 C27 17 30 19 30 23"/>
    </svg>
)

const CameraIcon = () => (
    <svg width="52" height="52" viewBox="0 0 50 50" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M7 18 L7 38 C7 39.9 8.6 42 11 42 L39 42 C41.4 42 43 39.9 43 38 L43 18 C43 16.1 41.4 14 39 14 L34 14 L31 9 L19 9 L16 14 L11 14 C8.6 14 7 16.1 7 18Z"/>
        <circle cx="25" cy="28" r="8"/>
        <circle cx="25" cy="28" r="4.5"/>
        <circle cx="37" cy="19" r="2"/>
    </svg>
)

export default function Reasons() {
    return (
        <section className="px-4 py-10">
            {/* Header */}
            <div className="max-w-lg mx-auto mb-10 text-center">
                <h2 className="font-pangaia text-5xl font-bold text-[#1C1914]  tracking-tight mb-4">
                    Why Choose This<br />Safari Experience
                </h2>
                <p className="text-lg leading-relaxed text-gray-600">
                    This isn't just another tour. It's a transformation into the heart of Africa's wilderness.
                </p>
            </div>

            {/* Bento Grid */}
            <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-3">

                {/* ── LEFT COLUMN ── */}
                <div className="grid grid-rows-7 gap-3" style={{ minHeight: 620 }}>

                    {/* Card 1 — Wildlife (tall) */}
                    <div
                        className="row-span-4 rounded-[40px] p-7 flex flex-col justify-end relative overflow-hidden"
                        style={{
                            backgroundImage: 'url(https://images.unsplash.com/photo-1720663520883-aeb55b215bfb?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8YmlnJTIwNXxlbnwwfHwwfHx8MA%3D%3D)',
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                        }}
                    >
                        <div className="absolute inset-0 rounded-[40px] pointer-events-none bg-gradient-to-t from-black via-black/90 to-transparent"/>
                        <div className="relative mb-2">
                            <SparkleIcon />
                        </div>
                        <p className="relative font-pangaia text-3xl font-bold text-white leading-tight">
                            Get within metres of <br/> Africa's Big Five.
                            <sup className="text-xs align-super">1</sup>
                        </p>
                    </div>

                    {/* Card 2 — Guides (short) */}
                    <div className="row-span-3 rounded-[40px] bg-linear-to-t from-black to-black/70 p-7 flex items-center gap-5">
                        <div className="shrink-0">
                            <BinocularsIcon />
                        </div>
                        <p className="font-pangaia text-3xl font-semibold text-neutral-50 leading-snug">
                            Expert guides and <br/> master trackers.
                        </p>
                    </div>

                </div>

                {/* ── RIGHT COLUMN ── */}
                <div className="grid grid-rows-7 gap-3" style={{ minHeight: 620 }}>
                    {/* Card 3 — Photography (short) */}
                    <div
                        className="row-span-3 rounded-[40px] p-7 flex flex-col justify-end relative overflow-hidden"
                        style={{ background: 'linear-gradient(155deg, #3d0c02 0%, #8b2010 25%, #d44c10 55%, #f08c20 80%, #fde88a 100%)' }}
                    >
                        <div
                            className="absolute inset-0 rounded-[40px] pointer-events-none"
                            style={{ background: 'radial-gradient(ellipse at 30% 80%, rgba(253,232,138,0.18) 0%, transparent 55%)' }}
                        />
                        <div className="relative mb-2">
                            <SunIcon />
                        </div>
                        <p className="relative font-pangaia text-2xl font-bold text-white leading-tight">
                            Liquid-gold sunrise game drives ,<br/> every morning.
                            <sup className="text-xs align-super">2</sup>
                        </p>
                    </div>

                    {/* Card 4 — Sunrise (tall) */}
                    <div
                        className="row-span-4 rounded-[40px] p-7 flex flex-col justify-end relative overflow-hidden"
                        style={{
                            backgroundImage: 'url(https://images.unsplash.com/photo-1489493887464-892be6d1daae?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fGFmcmljYXxlbnwwfHwwfHx8MA%3D%3D)',
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                        }}
                    >
                        <div className="absolute inset-0 rounded-[40px] pointer-events-none bg-gradient-to-t from-black via-black/90 to-transparent"/>
                        <div className="relative mb-2">
                            <CameraIcon />
                        </div>
                        <p className="relative font-pangaia text-3xl font-bold text-white leading-tight">
                            Perfect golden light <br/> for wildlife photography.
                            <sup className="text-xs align-super">1</sup>
                        </p>
                    </div>





                </div>
            </div>

        </section>
    )
}
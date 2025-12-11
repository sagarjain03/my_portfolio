'use client';

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import TopBar from "./TopBar";
import Dock from "../dock/Dock";
import { useStore } from "@/store/useStore";
import WindowManager from "../window/WindowManager";
import IntroAnimation from "../intro/IntroAnimation";
import gsap from "gsap";
import { Rajdhani } from 'next/font/google';

const rajdhani = Rajdhani({ subsets: ['latin'], weight: ['400', '600', '700'] });

export default function Desktop() {
    const { windows } = useStore();
    const [introComplete, setIntroComplete] = useState(false);

    const questBoxRef = useRef(null);
    const titleRef = useRef(null);
    const line1Ref = useRef(null);
    const line2Ref = useRef(null);
    const bgMusicRef = useRef<HTMLAudioElement>(null);

    useEffect(() => {
        if (!introComplete) return;

        // Start background music on intro complete
        if (bgMusicRef.current) {
            bgMusicRef.current.muted = false;
            bgMusicRef.current.play().catch(err => console.log('Background music play error:', err));
        }

        // Only run animation if the quest box exists (windows.length === 0)
        if (windows.length > 0) return;

        const ctx = gsap.context(() => {
            const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

            // Initial State
            gsap.set(questBoxRef.current, { x: -100, opacity: 0, scale: 0.9 });
            gsap.set([titleRef.current, line1Ref.current, line2Ref.current], { opacity: 0, x: -20 });

            // Entrance
            tl.to(questBoxRef.current, {
                x: 0,
                opacity: 1,
                scale: 1,
                duration: 1,
                delay: 0.5
            })
                // Text Reveal
                .to([titleRef.current, line1Ref.current, line2Ref.current], {
                    opacity: 1,
                    x: 0,
                    stagger: 0.2,
                    duration: 0.5,
                })
                // Float
                .to(questBoxRef.current, {
                    y: -10,
                    duration: 2,
                    repeat: -1,
                    yoyo: true,
                    ease: "sine.inOut"
                });

        }, questBoxRef);

        return () => ctx.revert();
    }, [introComplete, windows.length]); // Re-run if window count changes

    return (
        <>
            {!introComplete && <IntroAnimation onComplete={() => setIntroComplete(true)} />}

            {/* Background Theme Music */}
            <audio 
                ref={bgMusicRef} 
                src="/audio/solo_theme_music.aac"
                loop
                muted
                preload="auto"
            />

            <div
                className={`w-full h-full relative bg-cover bg-center overflow-hidden transition-opacity duration-1000 ${rajdhani.className}`}
                style={{
                    opacity: introComplete ? 1 : 0
                }}
            >
                <Image
                    src="/images/background_solo.png"
                    alt="Solo Leveling Desktop Background"
                    fill
                    priority
                    quality={90}
                    className="object-cover -z-10"
                    draggable={false}
                />
                <TopBar />

                {/* FIX: Removed 'pointer-events-none' so WindowManager can receive clicks */}
                <div className="absolute inset-0 top-8 bottom-20 p-4 z-0">
                    <WindowManager />

                    {/* Quest Box (Only visible when no windows are open) */}
                    {windows.length === 0 && (
                        <div
                            ref={questBoxRef}
                            className="absolute left-6 top-20 md:left-12 md:top-32 w-80 md:w-96 p-[2px] bg-gradient-to-b from-blue-500/50 via-blue-900/20 to-transparent rounded-lg backdrop-blur-sm z-10"
                        >
                            <div className="bg-black/80 w-full h-full rounded-lg p-6 border border-blue-500/30 shadow-[0_0_20px_rgba(59,130,246,0.3)]">
                                <div className="flex items-center gap-2 mb-4 border-b border-blue-500/30 pb-2">
                                    <div className="w-3 h-3 rounded-full bg-red-500 animate-pulse"></div>
                                    <h2 ref={titleRef} className="text-blue-400 font-bold tracking-[0.2em] text-sm uppercase">
                                        System Notification
                                    </h2>
                                </div>

                                <div className="space-y-3">
                                    <p ref={line1Ref} className="text-2xl md:text-3xl font-bold text-white drop-shadow-md">
                                        QUEST: <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">EXPLORE PORTFOLIO</span>
                                    </p>
                                    <p ref={line2Ref} className="text-gray-400 text-sm md:text-base leading-relaxed">
                                        Welcome, Hunter. Access the applications in the dock below to view my skills, projects, and stats.
                                    </p>
                                </div>

                                <div className="mt-4 text-xs text-blue-500/60 font-mono text-right">
                                    ID: SJ-001 // STATUS: ONLINE
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                <Dock />
            </div >
        </>
    );
}
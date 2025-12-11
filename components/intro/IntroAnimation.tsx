'use client';

import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import Image from 'next/image';
// 1. Import cool Google Fonts (Make sure your Next.js config supports this or import in layout)
import { Cinzel, Rajdhani } from 'next/font/google';

// Configure fonts
const cinzel = Cinzel({ subsets: ['latin'], weight: ['700'] });
const rajdhani = Rajdhani({ subsets: ['latin'], weight: ['300', '500', '700'] });

export default function IntroAnimation({ onComplete }: { onComplete: () => void }) {
    const containerRef = useRef(null);
    const textTitleRef = useRef(null);
    const textSubRef = useRef(null);
    const characterRef = useRef(null);
    const bgRef = useRef(null);
    const audioRef = useRef<HTMLAudioElement>(null);
    const [complete, setComplete] = useState(false);

    useEffect(() => {
        // Play audio when intro loads
        if (audioRef.current) {
            // Attempt to play - browsers require user interaction or muted autoplay
            const playPromise = audioRef.current.play();
            if (playPromise !== undefined) {
                playPromise.catch(err => console.log('Audio autoplay blocked:', err));
            }
        }

        // Enable unmute on any user interaction
        const handleUserInteraction = () => {
            if (audioRef.current) {
                audioRef.current.muted = false;
                audioRef.current.play().catch(err => console.log('Audio play error:', err));
            }
        };

        document.addEventListener('click', handleUserInteraction, { once: true });
        document.addEventListener('keydown', handleUserInteraction, { once: true });

        const ctx = gsap.context(() => {
            const tl = gsap.timeline({
                onComplete: () => {
                    // Exit Animation
                    gsap.to(containerRef.current, {
                        opacity: 0,
                        y: -50,
                        duration: 0.8,
                        ease: "power2.in",
                        onComplete: () => {
                            setComplete(true);
                            onComplete();
                        }
                    });
                }
            });

            // --- Initial States ---
            gsap.set(containerRef.current, { opacity: 1 });
            // Character starts large and invisible
            gsap.set(characterRef.current, { opacity: 0, scale: 1.5, y: 100, filter: 'blur(10px)' });
            // Text starts pushed down
            gsap.set([textTitleRef.current, textSubRef.current], { opacity: 0, y: 40 });
            // Background starts dark
            gsap.set(bgRef.current, { scale: 1.2, opacity: 0 });

            // --- Animation Sequence ---
            
            // 1. Background slow zoom
            tl.to(bgRef.current, {
                opacity: 0.6,
                scale: 1,
                duration: 2,
                ease: "power2.out"
            })

            // 2. Character Slam/Impact Entry
            .to(characterRef.current, {
                opacity: 1,
                scale: 1,
                y: 0,
                filter: 'blur(0px)',
                duration: 1.2,
                ease: "expo.out"
            }, "-=1.5") // Overlap with bg

            // 3. Text Stagger Reveal
            .to(textTitleRef.current, {
                opacity: 1,
                y: 0,
                duration: 0.8,
                ease: "back.out(1.7)" // Slight overshoot for pop effect
            }, "-=0.8")
            .to(textSubRef.current, {
                opacity: 1,
                y: 0,
                duration: 0.8,
                ease: "power2.out"
            }, "-=0.6")

            // 4. Hold & Idle Animation (Floating effect)
            .add(() => {
                // Continuous floating motion for character
                gsap.to(characterRef.current, {
                    y: -15,
                    duration: 2,
                    repeat: -1,
                    yoyo: true,
                    ease: "sine.inOut"
                });
            })
            
            // 5. Wait before finishing
            .to({}, { duration: 2.5 }); 

        }, containerRef);

        return () => {
            ctx.revert();
            document.removeEventListener('click', handleUserInteraction);
            document.removeEventListener('keydown', handleUserInteraction);
        };
    }, [onComplete]);

    if (complete) return null;

    return (
        <div
            ref={containerRef}
            className={`fixed inset-0 z-[9999] bg-black text-white flex flex-col items-center justify-center overflow-hidden ${rajdhani.className}`}
        >
            {/* Audio Element */}
            <audio 
                ref={audioRef} 
                src="/audio/solo_leveling_arise.mp3"
                preload="auto"
                autoPlay
                // muted
            />

            {/* Dynamic Background */}
            <div ref={bgRef} className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-indigo-900/40 via-black to-black"></div>
                {/* Grid overlay for "System" feel */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_80%)]"></div>
            </div>

            <div className="flex flex-col md:flex-row items-center gap-2 md:gap-12 relative z-10 p-8 max-w-6xl w-full justify-center">
                
                {/* Character Image */}
                <div 
                    ref={characterRef} 
                    className="relative w-72 h-72 md:w-[500px] md:h-[500px] flex-shrink-0"
                >
                    <div className="absolute inset-0 bg-blue-500/20 blur-3xl rounded-full opacity-50 animate-pulse"></div>
                    <Image
                        src="/images/sung_jin_woo.png"
                        alt="Sun Jin Woo"
                        fill
                        className="object-contain drop-shadow-[0_0_25px_rgba(59,130,246,0.6)]"
                        priority
                    />
                </div>

                {/* Text Content */}
                <div className="text-center md:text-left flex flex-col justify-center max-w-xl">
                    <div ref={textTitleRef} className="overflow-hidden">
                        <h1 className={`${cinzel.className} text-4xl md:text-7xl font-bold text-white mb-2 leading-tight tracking-wider drop-shadow-[0_2px_10px_rgba(255,255,255,0.5)]`}>
                            WELCOME <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-500">
                                PLAYER
                            </span>
                        </h1>
                    </div>
                    
                    <div ref={textSubRef} className="mt-4 border-l-4 border-blue-500 pl-6 bg-blue-900/10 py-2 rounded-r-lg backdrop-blur-sm">
                        <p className="text-xl md:text-3xl text-blue-200 font-light tracking-widest uppercase">
                            Portfolio System Initialized
                        </p>
                        <p className="text-lg md:text-xl text-gray-400 mt-1 font-medium">
                            User: <span className="text-white font-bold">Sagar Jain</span>
                        </p>
                    </div>
                </div>
            </div>

            {/* Bottom pulsing text */}
            <div className="absolute bottom-10 animate-pulse text-blue-500/70 text-sm tracking-[0.3em] uppercase">
                Loading Assets...
            </div>
        </div>
    );
}
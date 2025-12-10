import React from 'react';
import { useStore } from "@/store/useStore";
import WindowFrame from "./WindowFrame";
import dynamic from 'next/dynamic';
import ReactNode from 'react';

// Lazy load app components to reduce initial bundle size
const Finder = dynamic(() => import("../apps/Finder"), { loading: () => <div className="h-full w-full bg-white/50 animate-pulse" /> });
const Safari = dynamic(() => import("../apps/Safari"), { loading: () => <div className="h-full w-full bg-white/50 animate-pulse" /> });
const Terminal = dynamic(() => import("../apps/Terminal"), { loading: () => <div className="h-full w-full bg-black/50 animate-pulse" /> });
const Mail = dynamic(() => import("../apps/Mail"), { loading: () => <div className="h-full w-full bg-white/50 animate-pulse" /> });
const Photos = dynamic(() => import("../apps/Photos"), { loading: () => <div className="h-full w-full bg-white/50 animate-pulse" /> });
const Trash = dynamic(() => import("../apps/Trash"), { loading: () => <div className="h-full w-full bg-white/50 animate-pulse" /> });

// Static mapping of app IDs to components
const AppComponents: Record<string, any> = {
    finder: Finder,
    safari: Safari,
    terminal: Terminal,
    mail: Mail,
    photos: Photos,
    trash: Trash,
};

export default function WindowManager() {
    const { windows } = useStore();

    return (
        <>
            {windows.map((window) => {
                const AppComponent = AppComponents[window.id];
                return (
                    <WindowFrame
                        key={window.id}
                        id={window.id}
                        title={window.title}
                        zIndex={window.zIndex}
                        isOpen={window.isOpen}
                        isMinimized={window.isMinimized}
                    >
                        {AppComponent ? <AppComponent /> : <div className="p-4">Content for {window.title}</div>}
                    </WindowFrame>
                );
            })}
        </>
    );
}

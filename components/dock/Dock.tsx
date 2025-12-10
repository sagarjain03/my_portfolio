import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef } from "react";
import { useStore } from "@/store/useStore";
import React from 'react';
import Image from "next/image";

const apps = [
    { id: "finder", title: "Finder", icon: "/images/finder.png" },
    { id: "safari", title: "Safari", icon: "/images/safari.png" },
    { id: "terminal", title: "Terminal", icon: "/images/terminal.png" },
    { id: "photos", title: "Awards", icon: "/images/photos.png" },
    { id: "mail", title: "Mail", icon: "/images/contact.png" },
    { id: "trash", title: "Trash", icon: "/images/trash.png" },
];

export default function Dock() {
    const mouseX = useMotionValue(Infinity);

    return (
        <div className="fixed bottom-4 left-1/2 -translate-x-1/2 h-20 flex items-end gap-3 px-4 pb-3 bg-white/20 backdrop-blur-2xl border border-white/20 rounded-2xl z-50">
            <div
                className="flex items-end gap-3"
                onMouseMove={(e) => mouseX.set(e.pageX)}
                onMouseLeave={() => mouseX.set(Infinity)}
            >
                {apps.map((app) => (
                    <DockIcon key={app.id} mouseX={mouseX} app={app} />
                ))}
            </div>
        </div>
    );
}

function DockIcon({ mouseX, app }: { mouseX: any; app: any }) {
    const ref = useRef<HTMLDivElement>(null);
    const openWindow = useStore((state) => state.openWindow);

    const distance = useTransform(mouseX, (val: number) => {
        const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
        return val - bounds.x - bounds.width / 2;
    });

    const widthSync = useTransform(distance, [-150, 0, 150], [50, 80, 50]);
    const width = useSpring(widthSync, { mass: 0.1, stiffness: 150, damping: 12 });

    return (
        <motion.div
            ref={ref}
            style={{ width, height: width }}
            className="rounded-2xl flex items-center justify-center cursor-pointer relative group"
            onClick={() => openWindow(app.id, app.title, null)}
            whileTap={{ scale: 0.8 }}
        >
            <Image
                src={app.icon}
                alt={app.title}
                fill
                className="object-contain drop-shadow-lg"
                sizes="80px"
            />
            <div className="absolute -top-16 left-1/2 -translate-x-1/2 bg-[#f5f5f5]/90 border border-black/10 text-black text-sm font-medium px-3 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-sm backdrop-blur-md pointer-events-none">
                {app.title}
                <div className="absolute left-1/2 -translate-x-1/2 -bottom-1 w-2 h-2 bg-[#f5f5f5]/90 border-b border-r border-black/10 rotate-45"></div>
            </div>
        </motion.div>
    );
}

'use client';

import React, { useState, useEffect, useRef } from "react";
import { useTime } from "@/hooks/useTime";
import Image from "next/image";
import { Battery } from "lucide-react";

interface MenuItem {
    label: string;
    action?: () => void;
    separator?: boolean;
}

const menuItems: Record<string, MenuItem[]> = {
    apple: [
        { label: "About This Mac" },
        { label: "System Settings...", separator: true },
        { label: "Sleep" },
        { label: "Restart..." },
        { label: "Shut Down..." },
        { label: "Lock Screen", separator: true },
        { label: "Log Out User..." },
    ],
    Portfolio: [
        { label: "About Finder" },
        { label: "Settings...", separator: true },
        { label: "Empty Trash..." },
        { label: "Hide Finder" },
        { label: "Hide Others" },
        { label: "Show All" },
    ],
    file: [
        { label: "New Finder Window" },
        { label: "New Folder" },
        { label: "New Smart Folder" },
        { label: "Close Window", separator: true },
        { label: "Get Info" },
    ],
    edit: [
        { label: "Undo" },
        { label: "Redo", separator: true },
        { label: "Cut" },
        { label: "Copy" },
        { label: "Paste" },
        { label: "Select All" },
    ],
    view: [
        { label: "as Icons" },
        { label: "as List" },
        { label: "as Columns" },
        { label: "as Gallery", separator: true },
        { label: "Enter Full Screen" },
    ],
    go: [
        { label: "Back" },
        { label: "Forward" },
        { label: "Enclosing Folder", separator: true },
        { label: "Recents" },
        { label: "Documents" },
        { label: "Desktop" },
        { label: "Downloads" },
    ],
    window: [
        { label: "Minimize" },
        { label: "Zoom" },
        { label: "Move Window to Left Side of Screen" },
        { label: "Move Window to Right Side of Screen" },
    ],
    help: [
        { label: "macOS Help" },
    ]
};

export default function TopBar() {
    const time = useTime();
    const [activeMenu, setActiveMenu] = useState<string | null>(null);
    const menuRef = useRef<HTMLDivElement>(null);

    const formatTime = (date: Date | null) => {
        if (!date) return "";
        return date.toLocaleTimeString("en-US", {
            weekday: "short",
            month: "short",
            day: "numeric",
            hour: "numeric",
            minute: "2-digit",
        });
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setActiveMenu(null);
            }
        };

        if (activeMenu) {
            document.addEventListener("mousedown", handleClickOutside);
        }
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [activeMenu]);

    const toggleMenu = (menu: string) => {
        setActiveMenu(activeMenu === menu ? null : menu);
    };

    return (
        <div ref={menuRef} className="h-8 w-full bg-black/20 backdrop-blur-md flex items-center justify-between px-4 text-white text-sm fixed top-0 left-0 z-[100] select-none shadow-sm transition-all duration-200">
            <div className="flex items-center gap-4">
                {/* Apple Menu */}
                <div className="relative">
                    <div
                        className={`relative w-4 h-4 cursor-pointer hover:opacity-80 ${activeMenu === 'apple' ? 'opacity-100' : 'opacity-90'}`}
                        onClick={() => toggleMenu('apple')}
                    >
                        <Image src="/images/apple.png" alt="Apple" fill className="object-contain" />
                    </div>
                    {activeMenu === 'apple' && <Dropdown items={menuItems.apple} />}
                </div>

                {/* App Name (Finder) */}
                <div className="relative">
                    <span
                        className="font-bold tracking-wide text-[13px] cursor-pointer"
                        onClick={() => toggleMenu('Portfolio')}
                    >
                        Portfolio
                    </span>
                    {activeMenu === 'Portfolio' && <Dropdown items={menuItems.Portfolio} />}
                </div>

                {/* Menus */}
                <div className="hidden sm:flex gap-4 opacity-90 text-[13px] font-medium">
                    {['File', 'Edit', 'View', 'Go', 'Window', 'Help'].map((menu) => (
                        <div key={menu} className="relative">
                            <span
                                className={`cursor-default px-2 py-0.5 rounded hover:bg-white/10 ${activeMenu === menu.toLowerCase() ? 'bg-white/10' : ''}`}
                                onClick={() => toggleMenu(menu.toLowerCase())}
                            >
                                {menu}
                            </span>
                            {activeMenu === menu.toLowerCase() && <Dropdown items={menuItems[menu.toLowerCase()]} />}
                        </div>
                    ))}
                </div>
            </div>

            {/* Right Side Controls */}
            <div className="flex items-center gap-4">
                <div className="flex items-center gap-3 opacity-90">
                    <Battery size={20} className="text-white/80" />

                    <div className="relative w-4 h-4">
                        <Image src="/icons/wifi.svg" alt="Wifi" fill className="object-contain invert" />
                    </div>

                    <div className="relative w-4 h-4">
                        <Image src="/icons/search.svg" alt="Search" fill className="object-contain invert" />
                    </div>

                    <div className="relative w-4 h-4">
                        <Image src="/icons/mode.svg" alt="Control Center" fill className="object-contain invert" />
                    </div>
                </div>
                <span className="text-[13px] font-medium">{formatTime(time)}</span>
            </div>
        </div>
    );
}

function Dropdown({ items }: { items: MenuItem[] }) {
    return (
        <div className="absolute top-7 left-0 w-48 bg-white/60 backdrop-blur-xl border border-white/20 shadow-xl rounded-lg py-1 flex flex-col z-[101]">
            {items.map((item, index) => (
                <div key={index} className="flex flex-col">
                    <div
                        className="px-4 py-1 text-sm text-black hover:bg-blue-500 hover:text-white cursor-default transition-colors"
                    >
                        {item.label}
                    </div>
                    {item.separator && <div className="h-px bg-black/10 mx-2 my-1" />}
                </div>
            ))}
        </div>
    );
}

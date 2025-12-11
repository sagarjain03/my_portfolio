import React, { useState } from 'react';
import { Heart, Image as ImageIcon, Award, MapPin, X, ChevronLeft, ChevronRight, Share } from "lucide-react";

// Mock Data for your achievements/photos
const galleryItems = [
    // --- Moments (Internships & Wins) ---
    {
        id: 1,
        title: "Internship Offer",
        subtitle: "Acceptance Letter",
        date: "May 01, 2024",
        image: "/dock_assets/internship_letter.png",
        category: "Moments",
        liked: false
    },
    {
        id: 2,
        title: "Win 1",
        subtitle: "Competition Win",
        date: "2024",
        image: "/dock_assets/memories/win1.png",
        category: "Awards",
        liked: true
    },
    {
        id: 3,
        title: "Win 2",
        subtitle: "Competition Win",
        date: "2024",
        image: "/dock_assets/memories/win2.png",
        category: "Awards",
        liked: false
    },

    // --- Certificates ---
    {
        id: 4,
        title: "Adobe Certificate",
        subtitle: "Professional Certificate",
        date: "2025",
        image: "/dock_assets/certificates/adobe.png",
        category: "Certificates",
        liked: false
    },
    {
        id: 5,
        title: "Appo Certificate",
        subtitle: "Professional Certificate",
        date: "2025",
        image: "/dock_assets/certificates/appo_certificate.png",
        category: "Certificates",
        liked: false
    },
    {
        id: 6,
        title: "Bit By Bit Certificate",
        subtitle: "Professional Certificate",
        date: "2025",
        image: "/dock_assets/certificates/bitByBit.png",
        category: "Certificates",
        liked: false
    },
    {
        id: 7,
        title: "Code For Cause Certificate",
        subtitle: "Professional Certificate",
        date: "2025",
        image: "/dock_assets/certificates/codeForCauseCertificate.png",
        category: "Certificates",
        liked: false
    },
    {
        id: 8,
        title: "Code Verse Certificate",
        subtitle: "Professional Certificate",
        date: "2025",
        image: "/dock_assets/certificates/codeVerse.png",
        category: "Certificates",
        liked: false
    },
    {
        id: 9,
        title: "Hack Mait Certificate",
        subtitle: "Professional Certificate",
        date: "2025",
        image: "/dock_assets/certificates/hackMaitCertificate.png",
        category: "Certificates",
        liked: false
    },
    {
        id: 10,
        title: "Hack With India Certificate",
        subtitle: "Professional Certificate",
        date: "2025",
        image: "/dock_assets/certificates/hackWithIndia.png",
        category: "Certificates",
        liked: false
    },
    {
        id: 11,
        title: "JIMS Certificate",
        subtitle: "Professional Certificate",
        date: "2025",
        image: "/dock_assets/certificates/jims.png",
        category: "Certificates",
        liked: false
    },
    {
        id: 12,
        title: "Snap Syntax Certificate",
        subtitle: "Professional Certificate",
        date: "2025",
        image: "/dock_assets/certificates/snapSyntax.png",
        category: "Certificates",
        liked: false
    },
    {
        id: 13,
        title: "Vihaan 7 Certificate",
        subtitle: "Professional Certificate",
        date: "2025",
        image: "/dock_assets/certificates/vihaan7.png",
        category: "Certificates",
        liked: false
    },
    {
        id: 14,
        title: "Vihaan 8 Certificate",
        subtitle: "Professional Certificate",
        date: "2025",
        image: "/dock_assets/certificates/vihaan8.png",
        category: "Certificates",
        liked: false
    },

    // --- Awards ---
    // --- More Moments (Memories) ---
    {
        id: 16,
        title: "JIMS Memory",
        subtitle: "Event Photo",
        date: "2023",
        image: "/dock_assets/memories/jims.png",
        category: "Moments",
        liked: false
    },
    {
        id: 17,
        title: "JIMS Memory 2",
        subtitle: "Event Photo",
        date: "2023",
        image: "/dock_assets/memories/jims2.png",
        category: "Moments",
        liked: false
    },
    {
        id: 18,
        title: "JIMS Memory 3",
        subtitle: "Event Photo",
        date: "2023",
        image: "/dock_assets/memories/jims3.png",
        category: "Moments",
        liked: false
    },
    {
        id: 19,
        title: "MAIT Memory",
        subtitle: "Event Photo",
        date: "2022",
        image: "/dock_assets/memories/mait.png",
        category: "Moments",
        liked: false
    },
    {
        id: 20,
        title: "MAIT Memory 2",
        subtitle: "Event Photo",
        date: "2022",
        image: "/dock_assets/memories/mait2.png",
        category: "Moments",
        liked: false
    },
    {
        id: 21,
        title: "Microsoft Memory",
        subtitle: "Top 10 at Microsoft",
        date: "2021",
        image: "/dock_assets/memories/Microsoft.png",
        category: "Awards",
        liked: true
    },
    {
        id: 22,
        title: "NSUT Memory",
        subtitle: "Event Photo",
        date: "2021",
        image: "/dock_assets/memories/NSUT.png",
        category: "Moments",
        liked: true
    },
    {
        id: 23,
        title: "NSUT Memory 2",
        subtitle: "Event Photo",
        date: "2021",
        image: "/dock_assets/memories/NSUT2.png",
        category: "Moments",
        liked: false
    },
    {
        id: 24,
        title: "Vihaan Memory",
        subtitle: "Event Photo",
        date: "2020",
        image: "/dock_assets/memories/vihaan.png",
        category: "Moments",
        liked: true
    },
];

export default function Photos() {
    const [selectedId, setSelectedId] = useState<number | null>(null);
    const [filter, setFilter] = useState("Library");

    const selectedItem = galleryItems.find(i => i.id === selectedId);
    
    // Filter logic
    const displayedItems = filter === "Library" 
        ? galleryItems 
        : filter === "Favorites" 
            ? galleryItems.filter(i => i.liked) 
            : galleryItems.filter(i => i.category === filter);

    return (
        <div className="flex h-full bg-white text-black overflow-hidden relative">
            
            {/* --- Left Sidebar (Album Navigation) --- */}
            <div className="w-56 bg-gray-50/80 backdrop-blur-xl border-r border-gray-200 flex flex-col pt-6 pb-4">
                <div className="px-5 mb-6">
                    <h2 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Apple Photos</h2>
                </div>
                
                <nav className="flex-1 space-y-0.5 px-3">
                    <SidebarItem icon={ImageIcon} label="Library" active={filter === "Library"} onClick={() => setFilter("Library")} />
                    <SidebarItem icon={Heart} label="Favorites" active={filter === "Favorites"} onClick={() => setFilter("Favorites")} />
                    
                    <div className="pt-4 px-2 mb-2">
                        <h2 className="text-xs font-bold text-gray-400 uppercase tracking-wider">Albums</h2>
                    </div>
                    <SidebarItem icon={Award} label="Awards" active={filter === "Awards"} onClick={() => setFilter("Awards")} />
                    <SidebarItem icon={Award} label="Certificates" active={filter === "Certificates"} onClick={() => setFilter("Certificates")} />
                    <SidebarItem icon={MapPin} label="Moments" active={filter === "Moments"} onClick={() => setFilter("Moments")} />
                </nav>
            </div>

            {/* --- Main Gallery Grid --- */}
            <div className="flex-1 h-full overflow-y-auto p-8">
                <div className="flex justify-between items-end mb-6">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">{filter}</h1>
                        <p className="text-gray-500 text-sm mt-1">{displayedItems.length} Photos</p>
                    </div>
                </div>

                {/* Masonry-ish Grid */}
                <div className="columns-2 md:columns-3 gap-4 space-y-4">
                    {displayedItems.map((item) => (
                        <div 
                            key={item.id} 
                            onClick={() => setSelectedId(item.id)}
                            className="break-inside-avoid group relative cursor-zoom-in rounded-xl overflow-hidden bg-gray-100 mb-4 hover:shadow-lg transition-all duration-300"
                        >
                            <img 
                                src={item.image} 
                                alt={item.title} 
                                className="w-full h-auto object-cover transform group-hover:scale-105 transition-transform duration-500"
                            />
                            {/* Hover Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                                <p className="text-white font-medium text-sm">{item.title}</p>
                                <p className="text-gray-300 text-xs">{item.date}</p>
                            </div>
                            {item.liked && (
                                <div className="absolute top-2 right-2 bg-white/20 backdrop-blur-md p-1.5 rounded-full text-white">
                                    <Heart size={12} fill="white" />
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>

            {/* --- Lightbox / Modal View --- */}
            {selectedItem && (
                <div className="absolute inset-0 z-50 bg-white/95 backdrop-blur-xl flex flex-col animate-in fade-in duration-200">
                    {/* Toolbar */}
                    <div className="h-14 flex items-center justify-between px-6 border-b border-gray-100">
                        <button onClick={() => setSelectedId(null)} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                            <ChevronLeft size={24} className="text-gray-600" />
                        </button>
                        <div className="flex gap-4">
                            <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                                <Heart size={20} className={selectedItem.liked ? "text-red-500 fill-red-500" : "text-gray-600"} />
                            </button>
                            <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                                <Share size={20} className="text-gray-600" />
                            </button>
                            <button onClick={() => setSelectedId(null)} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                                <X size={20} className="text-gray-600" />
                            </button>
                        </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1 flex items-center justify-center p-8 overflow-hidden">
                        <img 
                            src={selectedItem.image} 
                            alt={selectedItem.title} 
                            className="max-h-full max-w-full object-contain rounded-lg shadow-2xl" 
                        />
                    </div>

                    {/* Metadata Footer */}
                    <div className="h-20 bg-white border-t border-gray-100 px-8 flex items-center justify-between">
                        <div>
                            <h3 className="text-lg font-bold text-gray-900">{selectedItem.title}</h3>
                            <p className="text-gray-500 text-sm">{selectedItem.subtitle}</p>
                        </div>
                        <div className="text-right">
                            <p className="text-gray-900 font-medium text-sm">{selectedItem.date}</p>
                            <p className="text-gray-400 text-xs uppercase tracking-wide">{selectedItem.category}</p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

// Helper Components
function SidebarItem({ icon: Icon, label, active, onClick }: { icon: any, label: string, active: boolean, onClick: () => void }) {
    return (
        <button 
            onClick={onClick}
            className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${active ? 'bg-blue-100 text-blue-600' : 'text-gray-600 hover:bg-gray-100'}`}
        >
            <Icon size={18} className={active ? "text-blue-600" : "text-gray-400"} />
            {label}
        </button>
    );
}
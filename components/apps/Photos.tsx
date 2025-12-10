import React, { useState } from 'react';
import { Heart, Image as ImageIcon, Award, MapPin, X, ChevronLeft, ChevronRight, Share } from "lucide-react";

// Mock Data for your achievements/photos
const galleryItems = [
    {
        id: 1,
        title: "Hackathon Winner",
        subtitle: "1st Place @ CodeVerse 2025",
        date: "Oct 12, 2025",
        image: "https://source.unsplash.com/random/800x600/?hackathon,coding,team",
        category: "Awards",
        liked: true
    },
    {
        id: 2,
        title: "Google Cloud Certificate",
        subtitle: "Professional Cloud Architect",
        date: "Sep 05, 2025",
        image: "https://source.unsplash.com/random/600x800/?certificate,diploma",
        category: "Certificates",
        liked: false
    },
    {
        id: 3,
        title: "Team Presentation",
        subtitle: "Demo Day at Microsoft",
        date: "Aug 20, 2024",
        image: "https://source.unsplash.com/random/800x800/?presentation,meeting",
        category: "Moments",
        liked: true
    },
    {
        id: 4,
        title: "Open Source Contrib",
        subtitle: "Merged PR into Next.js",
        date: "July 15, 2024",
        image: "https://source.unsplash.com/random/800x500/?code,screen,github",
        category: "Moments",
        liked: false
    },
    {
        id: 5,
        title: "Best UI Design",
        subtitle: "Design Weekly Award",
        date: "June 10, 2024",
        image: "https://source.unsplash.com/random/700x700/?ui,design,app",
        category: "Awards",
        liked: true
    },
    {
        id: 6,
        title: "Internship Offer",
        subtitle: "Acceptance Letter",
        date: "May 01, 2024",
        image: "https://source.unsplash.com/random/600x400/?office,work",
        category: "Moments",
        liked: false
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
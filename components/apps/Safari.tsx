import React from 'react';
import { RotateCw, Shield, ChevronLeft, ChevronRight, ExternalLink } from "lucide-react";

const projects = [
    {
        title: "DropDrive",
        desc: "Secure Wipe Automation & Certification Tool. Cross-platform solution for cryptographically secure data wiping (HDD/SSD/NVMe) with NIST/DOD compliance. Features automated JSON/PDF certificate generation, multi-drive detection, and real-time monitoring.",
        tech: ["Node.js", "Electron", "C++", "System API"],
        image: "/projects/dropDrive/dropDrive.png",
        link: "https://drop-drive-website.vercel.app/"
    },
    {
        title: "AndThen",
        desc: "AI-Powered Interactive Storytelling Platform. A personalized narrative engine where personality scores shape the story. Features choose-your-own-adventure mechanics, immersive book themes, multiplayer collaboration, and a gamified XP system.",
        tech: ["React", "AI Integration", "Node.js", "MongoDB"],
        image: "/projects/andThen/andThen.png",
        link: "https://and-then-nine.vercel.app/"
    },
    {
        title: "NoBrain MERN",
        desc: "Visual Workflow Automation Platform. Node-based editor for designing complex workflows without coding. Integrates Google Gemini AI for text-to-workflow generation, distinct customization nodes, and a robust backend execution engine.",
        tech: ["MERN Stack", "React Flow", "Google Gemini AI", "JWT"],
        image: "/projects/noBrain/noBrain.png",
        link: "#"
    },
    {
        title: "Weatherly",
        desc: "Modern Weather Dashboard. Fast, responsive app built with React, Vite, and TypeScript. Features real-time weather data, dynamic icons, city search with history, and favorite locations, all styled with Tailwind CSS.",
        tech: ["React", "Vite", "TypeScript", "Tailwind CSS", "OpenWeatherMap API"],
        image: "/projects/weatherly/weatherly.png",
        link: "https://weatherly-three-kappa.vercel.app/"
    },
    {
        title: "Digital Escape Room",
        desc: "Interactive Puzzle Experience. Engaging escape room game with real-time mechanics and seamless Clerk authentication. Built with React, Vite, and Tailwind CSS for a responsive and immersive user interface.",
        tech: ["React", "Vite", "Clerk Auth", "Tailwind CSS"],
        image: "/projects/DigitalEscapeRoom/DigitalEscapeRoom.png",
        link: "https://digital-escape-room-one.vercel.app/"
    },
    {
        title: "3D Solar System",
        desc: "Interactive 3D Solar System. A 3D simulation of planets revolving using Three.js and GSAP. Features detailed textures, realistic background, and smooth animations.",
        tech: ["Three.js", "GSAP", "3D Modeling"],
        image: "/projects/Planet3D/planet.png",
        link: "https://3js-planet-project.vercel.app/"
    },
    {
        title: "Research Scholar System",
        desc: "AI-Driven Research Management. A prediction and tracking tool to prevent thesis delays. Tracks scholar activities, flags risks using ML models, and provides actionable insights for students and supervisors.",
        tech: ["Python", "scikit-learn", "Full Stack", "ML"],
        image: "/projects/reserachScholarSystem/rss.png",
        link: "https://research-scholar-system.vercel.app/"
    }
];

export default function Safari() {
    return (
        <div className="flex flex-col h-full bg-[#FBFBFB] text-black overflow-hidden">
            {/* Glassmorphic Toolbar */}
            <div className="h-12 bg-white/80 backdrop-blur-md border-b border-gray-200/80 flex items-center px-4 gap-4 shrink-0 z-10">
                <div className="flex gap-1">
                    <button className="p-1.5 rounded hover:bg-black/5 text-gray-500 transition-colors"><ChevronLeft size={18} /></button>
                    <button className="p-1.5 rounded hover:bg-black/5 text-gray-500 transition-colors"><ChevronRight size={18} /></button>
                </div>
                {/* Address Bar */}
                <div className="flex-1 bg-gray-100/80 h-8 rounded-lg flex items-center justify-center text-sm text-gray-600 border border-gray-200/50 shadow-sm gap-2 px-2 transition-all hover:bg-gray-100 group cursor-text">
                    <Shield size={12} className="text-gray-400 group-hover:text-green-600 transition-colors" />
                    <span className="selection:bg-blue-200">sagarjain.dev/projects</span>
                </div>
                <button className="p-1.5 rounded hover:bg-black/5 text-gray-500 transition-colors">
                    <RotateCw size={16} />
                </button>
            </div>

            {/* Content Area */}
            <div className="flex-1 overflow-y-auto overflow-x-hidden p-6 md:p-10 bg-gradient-to-b from-gray-50 to-[#FBFBFB]">
                <div className="max-w-6xl mx-auto">
                    <header className="text-center mb-12">
                        <h1 className="text-4xl font-bold text-gray-900 mb-3 tracking-tight">Featured Work</h1>
                        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                            A collection of technical projects spanning full-stack development, system utilities, and AI integrations.
                        </p>
                    </header>

                    {/* Project Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 pb-10">
                        {projects.map((project, index) => (
                            <ProjectCard key={index} {...project} />
                        ))}
                    </div>

                    <div className="text-center text-gray-400 text-sm py-8">
                        End of Results
                    </div>
                </div>
            </div>
        </div>
    );
}

// --- Amazing Project Card Component ---

function ProjectCard({ title, desc, tech, image, link }: { title: string, desc: string, tech: string[], image: string, link: string }) {
    return (
        <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="group block bg-white rounded-2xl overflow-hidden border border-gray-200/80 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 ease-out"
        >
            {/* Image Container with Zoom Effect */}
            <div className="relative h-48 overflow-hidden bg-gray-100">
                <div className="absolute inset-0 bg-black/5 group-hover:bg-black/0 transition-colors z-10"></div>
                {/* Using standard img tag for compatibility. Replace with next/image if preferred */}
                <img
                    src={image}
                    alt={title}
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500 ease-in-out"
                    loading="lazy"
                />
                {/* External Link Icon Overlay */}
                <div className="absolute top-4 right-4 bg-white/90 p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity z-20 shadow-sm backdrop-blur-sm">
                    <ExternalLink size={16} className="text-gray-700" />
                </div>
            </div>

            {/* Card Content */}
            <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                    {title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed mb-5 line-clamp-3">
                    {desc}
                </p>

                {/* Tech Tags */}
                <div className="flex flex-wrap gap-2">
                    {tech.map((t, i) => (
                        <span
                            key={i}
                            className="px-2.5 py-1 text-[11px] uppercase tracking-wider font-medium bg-gray-50 text-gray-600 rounded-md border border-gray-100 group-hover:border-blue-100 group-hover:bg-blue-50/50 group-hover:text-blue-700 transition-colors"
                        >
                            {t}
                        </span>
                    ))}
                </div>
            </div>
        </a>
    );
}
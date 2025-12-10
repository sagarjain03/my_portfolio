import React from 'react';
import { User, Shield, Terminal, Award, Mail } from "lucide-react";

export default function MobileView() {
    return (
        <div className="min-h-screen bg-gray-50 text-black p-4 pb-20">
            <div className="text-center mb-6 mt-4">
                <div className="w-20 h-20 bg-gray-200 rounded-full mx-auto mb-2 flex items-center justify-center text-xl font-bold text-gray-400">SJ</div>
                <h1 className="text-2xl font-bold">Sagar Jain</h1>
                <p className="text-gray-500">Full Stack Developer</p>
            </div>

            <div className="space-y-4">
                <MobileCard icon={User} title="About Me" desc="B.Tech IT Student @ MAIT" />
                <MobileCard icon={Shield} title="Projects" desc="DropDrive, Skill Trade..." />
                <MobileCard icon={Terminal} title="Skills" desc="Python, Next.js, React..." />
                <MobileCard icon={Award} title="Awards" desc="CodeVerse, Hack WithMAIT..." />
                <MobileCard icon={Mail} title="Contact" desc="thesagarjain@gmail.com" />
            </div>

            <div className="fixed bottom-0 left-0 w-full p-4 bg-white border-t border-gray-200 text-center text-xs text-gray-400">
                Visit on Desktop for full macOS experience
            </div>
        </div>
    );
}

function MobileCard({ icon: Icon, title, desc }: { icon: any, title: string, desc: string }) {
    return (
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4">
            <div className="p-2 bg-blue-50 text-blue-500 rounded-lg">
                <Icon size={24} />
            </div>
            <div>
                <div className="font-semibold">{title}</div>
                <div className="text-sm text-gray-500">{desc}</div>
            </div>
        </div>
    );
}

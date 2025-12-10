import React from 'react';
import { User, Book, Monitor, Cpu, Code2, Briefcase, Award, Mail, Github, Linkedin, ExternalLink } from "lucide-react";

export default function Finder() {
    return (
        <div className="flex h-full text-black font-sans selection:bg-blue-100">
            {/* Sidebar - Mac Style */}
            <div className="w-56 bg-gray-100/80 backdrop-blur-xl p-3 flex flex-col gap-1 border-r border-gray-300/50 pt-4">
                <div className="text-xs font-semibold text-gray-500 px-3 py-1 mb-1">Favorites</div>
                <SidebarItem icon={User} label="About Me" active />
                <SidebarItem icon={Code2} label="Skills & Tech" />
                <SidebarItem icon={Briefcase} label="Projects" />
                <SidebarItem icon={Award} label="Achievements" />
                <div className="text-xs font-semibold text-gray-500 px-3 py-1 mt-4 mb-1">System</div>
                <SidebarItem icon={Monitor} label="Applications" />
                <SidebarItem icon={Cpu} label="System Info" />
            </div>

            {/* Main Content */}
            <div className="flex-1 bg-white p-8 overflow-y-auto scrollbar-hide">
                {/* Header */}
                <div className="border-b border-gray-200 pb-6 mb-6">
                    <h1 className="text-3xl font-bold mb-2 tracking-tight">Sagar Jain</h1>
                    <p className="text-gray-600 font-medium flex items-center gap-2">
                        B.Tech IT Student @ MAIT (2023-2027) 
                        <span className="w-1.5 h-1.5 rounded-full bg-gray-400"></span>
                        CGPA: 8.8
                    </p>
                    <div className="flex gap-4 mt-4">
                        <SocialLink icon={Github} label="GitHub" />
                        <SocialLink icon={Linkedin} label="LinkedIn" />
                        <SocialLink icon={Mail} label="Email" />
                    </div>
                </div>

                <div className="space-y-8 max-w-4xl">
                    {/* Bio Section */}
                    <Section title="Bio">
                        <p className="text-gray-700 leading-relaxed text-lg">
                            I am a passionate Full Stack Developer and B.Tech Information Technology student at Maharaja Agrasen Institute of Technology. 
                            My journey involves deep-diving into native modules, system architecture, and modern web technologies. 
                            I love solving complex algorithmic problems and building scalable user interfaces that feel "magical" to use.
                        </p>
                    </Section>

                    {/* Education Section */}
                    <Section title="Education">
                        <div className="bg-gray-50 p-5 rounded-xl border border-gray-100 hover:border-blue-200 transition-colors">
                            <div className="flex justify-between items-start">
                                <div>
                                    <div className="font-bold text-lg text-gray-900">Maharaja Agrasen Institute of Technology</div>
                                    <div className="text-gray-600">B.Tech in Information Technology</div>
                                </div>
                                <span className="text-sm font-mono bg-blue-100 text-blue-700 px-2 py-1 rounded">2023 - 2027</span>
                            </div>
                            <div className="mt-2 text-sm text-gray-500">Current CGPA: 8.8</div>
                        </div>

                        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                            <SchoolCard 
                                level="Class XII (CBSE)" 
                                school="RPVV Nand Nagri" 
                                score="92%" 
                                year="2022"
                            />
                            <SchoolCard 
                                level="Class X (CBSE)" 
                                school="RPVV Nand Nagri" 
                                score="89%" 
                                year="2020"
                            />
                        </div>
                    </Section>

                    {/* Skills Section */}
                    <Section title="Technical Arsenal">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <h3 className="text-sm font-semibold text-gray-500 mb-3 uppercase tracking-wider">Languages</h3>
                                <div className="flex flex-wrap gap-2">
                                    {['C++', 'JavaScript (ES6+)', 'TypeScript', 'Python', 'Java', 'HTML5/CSS3'].map(skill => (
                                        <SkillBadge key={skill} name={skill} />
                                    ))}
                                </div>
                            </div>
                            <div>
                                <h3 className="text-sm font-semibold text-gray-500 mb-3 uppercase tracking-wider">Frameworks & Tools</h3>
                                <div className="flex flex-wrap gap-2">
                                    {['React.js', 'Next.js 14', 'Node.js', 'Tailwind CSS', 'Redux', 'Git/GitHub', 'Figma'].map(skill => (
                                        <SkillBadge key={skill} name={skill} />
                                    ))}
                                </div>
                            </div>
                        </div>
                    </Section>

                  

                  
                </div>

                {/* Footer */}
                <div className="mt-12 pt-6 border-t border-gray-200 text-center text-gray-400 text-sm">
                    © 2025 Sagar Jain. Designed with love & code.
                </div>
            </div>
        </div>
    );
}

// --- Sub Components for cleaner code ---

function SidebarItem({ icon: Icon, label, active }: { icon: any, label: string, active?: boolean }) {
    return (
        <div className={`group flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium cursor-pointer transition-all duration-200 ${active ? 'bg-blue-500 text-white shadow-md' : 'hover:bg-gray-200/50 text-gray-600'}`}>
            <Icon size={18} className={active ? "text-white" : "text-gray-500 group-hover:text-gray-700"} />
            <span>{label}</span>
        </div>
    );
}

function Section({ title, children }: { title: string, children: React.ReactNode }) {
    return (
        <div>
            <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                {title}
                <div className="h-px bg-gray-200 flex-1 ml-4" />
            </h2>
            {children}
        </div>
    );
}

function SkillBadge({ name }: { name: string }) {
    return (
        <span className="px-3 py-1 bg-gray-100 text-gray-700 text-sm font-medium rounded-full border border-gray-200 hover:bg-blue-50 hover:text-blue-600 hover:border-blue-200 transition-colors cursor-default">
            {name}
        </span>
    );
}

function SchoolCard({ level, school, score, year }: { level: string, school: string, score: string, year: string }) {
    return (
        <div className="bg-gray-50 p-4 rounded-lg border border-gray-100 hover:shadow-sm transition-shadow">
            <div className="flex justify-between items-center mb-1">
                <div className="text-sm font-bold text-gray-800">{level}</div>
                <div className="text-xs font-mono text-gray-400">{year}</div>
            </div>
            <div className="text-xs text-gray-500 mb-2">{school}</div>
            <div className="text-lg font-bold text-blue-600">{score}</div>
        </div>
    );
}

function ProjectCard({ title, tech, desc }: { title: string, tech: string, desc: string }) {
    return (
        <div className="group p-4 rounded-xl border border-gray-200 hover:border-blue-300 hover:bg-blue-50/30 transition-all cursor-pointer">
            <div className="flex justify-between items-center mb-2">
                <h3 className="font-bold text-gray-900 group-hover:text-blue-600 transition-colors">{title}</h3>
                <ExternalLink size={16} className="text-gray-400 group-hover:text-blue-500" />
            </div>
            <div className="text-xs font-medium text-blue-600 mb-2 uppercase tracking-wide">{tech}</div>
            <p className="text-sm text-gray-600 leading-relaxed">{desc}</p>
        </div>
    );
}

function SocialLink({ icon: Icon, label }: { icon: any, label: string }) {
    return (
        <button className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-medium transition-colors">
            <Icon size={16} />
            {label}
        </button>
    );
}
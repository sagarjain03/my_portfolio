import React from 'react';
import { Mail as MailIcon, Phone, Github, Linkedin, Send } from "lucide-react";

export default function Mail() {
    return (
        <div className="h-full flex flex-col bg-white">
            {/* Header */}
            <div className="p-4 border-b border-gray-200 flex justify-between items-center bg-gray-50">
                <h1 className="text-xl font-bold">Inbox</h1>
                <button className="px-3 py-1.5 bg-blue-500 text-white rounded-md flex items-center gap-2 text-sm hover:bg-blue-600 transition-colors">
                    <Send size={14} />
                    Compose
                </button>
            </div>

            <div className="flex flex-1 overflow-hidden">
                {/* Sidebar List */}
                <div className="w-64 border-r border-gray-200 overflow-y-auto bg-white">
                    <div className="p-3 border-b border-gray-100 bg-blue-50 border-l-4 border-l-blue-500">
                        <div className="font-bold text-sm">Sagar Jain</div>
                        <div className="text-xs text-gray-500 mb-1">Contact Details</div>
                        <div className="text-xs text-gray-400 truncate">I'd love to connect with you...</div>
                    </div>
                </div>

                {/* Detail View */}
                <div className="flex-1 p-8 overflow-y-auto bg-white">
                    <div className="flex justify-between items-start mb-6">
                        <div>
                            <h2 className="text-2xl font-bold mb-1">Let's Connect!</h2>
                            <div className="text-gray-500 text-sm">From: Sagar Jain &lt;thesagarjain@gmail.com&gt;</div>
                        </div>
                        <div className="text-sm text-gray-400">Today, 10:42 AM</div>
                    </div>

                    <div className="prose max-w-none text-gray-700 space-y-4">
                        <p>Hi there,</p>
                        <p>I'm always open to discussing new projects, creative ideas, or opportunities. Feel free to reach out using the details below:</p>

                        <div className="mt-8 grid gap-4 max-w-md">
                            <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg border border-gray-100">
                                <MailIcon className="text-blue-500" />
                                <div>
                                    <div className="text-xs text-gray-500 uppercase font-semibold">Email</div>
                                    <a href="mailto:thesagarjain@gmail.com" className="hover:text-blue-600">thesagarjain@gmail.com</a>
                                </div>
                            </div>

                            <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg border border-gray-100">
                                <Phone className="text-green-500" />
                                <div>
                                    <div className="text-xs text-gray-500 uppercase font-semibold">Phone</div>
                                    <div>+91 8700581166</div>
                                </div>
                            </div>

                            <div className="flex gap-4 mt-4">
                                <a href="https://github.com" target="_blank" rel="noreferrer" className="flex-1 p-3 bg-gray-900 text-white rounded-lg flex items-center justify-center gap-2 hover:bg-black transition-colors">
                                    <Github size={18} />
                                    GitHub
                                </a>
                                <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="flex-1 p-3 bg-blue-600 text-white rounded-lg flex items-center justify-center gap-2 hover:bg-blue-700 transition-colors">
                                    <Linkedin size={18} />
                                    LinkedIn
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

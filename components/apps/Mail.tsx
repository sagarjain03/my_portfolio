import React, { useState } from 'react';
import { Mail as MailIcon, Phone, Github, Linkedin, Send, X, Loader2 } from "lucide-react";

export default function Mail() {
    const [isComposeOpen, setIsComposeOpen] = useState(false);
    const [senderEmail, setSenderEmail] = useState('');
    const [message, setMessage] = useState('');
    const [isSending, setIsSending] = useState(false);
    const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');

    const handleSend = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSending(true);
        setStatus('idle');

        try {
            const response = await fetch('/api/send-email', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ senderEmail, message }),
            });

            const data = await response.json();

            if (response.ok) {
                setStatus('success');
                setTimeout(() => {
                    setIsComposeOpen(false);
                    setSenderEmail('');
                    setMessage('');
                    setStatus('idle');
                }, 2000);
            } else {
                console.error('Failed to send:', data.error);
                setStatus('error');
            }
        } catch (error) {
            console.error('Error sending email:', error);
            setStatus('error');
        } finally {
            setIsSending(false);
        }
    };

    return (
        <div className="h-full flex flex-col bg-white relative">
            {/* Header */}
            <div className="p-4 border-b border-gray-200 flex justify-between items-center bg-gray-50">
                <h1 className="text-xl font-bold">Inbox</h1>
                <button
                    onClick={() => setIsComposeOpen(true)}
                    className="px-3 py-1.5 bg-blue-500 text-black rounded-md flex items-center gap-2 text-sm hover:bg-blue-600 transition-colors"
                >
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

            {/* Compose Modal */}
            {isComposeOpen && (
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg shadow-xl w-full max-w-lg mx-4 flex flex-col overflow-hidden animate-in fade-in zoom-in duration-200">
                        <div className="p-3 bg-gray-100 border-b flex justify-between items-center">
                            <span className="font-semibold text-gray-700">New Message</span>
                            <button
                                onClick={() => setIsComposeOpen(false)}
                                className="text-gray-500 hover:text-gray-700 hover:bg-gray-200 rounded-md p-1"
                            >
                                <X size={18} />
                            </button>
                        </div>

                        <form onSubmit={handleSend} className="p-4 space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Your Email</label>
                                <input
                                    type="email"
                                    required
                                    value={senderEmail}
                                    onChange={(e) => setSenderEmail(e.target.value)}
                                    placeholder="name@example.com"
                                    className="w-full px-3 py-2 text-black border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                                <textarea
                                    required
                                    rows={6}
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                    placeholder="Type your message here..."
                                    className="w-full px-3 py-2 text-black border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                                />
                            </div>

                            <div className="flex justify-end items-center gap-3 pt-2">
                                {status === 'success' && (
                                    <span className="text-green-600 text-sm font-medium">Sent successfully!</span>
                                )}
                                {status === 'error' && (
                                    <span className="text-red-500 text-sm font-medium">Failed to send. Try again.</span>
                                )}

                                <button
                                    type="submit"
                                    disabled={isSending || status === 'success'}
                                    className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                                >
                                    {isSending ? (
                                        <>
                                            <Loader2 size={16} className="animate-spin" />
                                            Sending...
                                        </>
                                    ) : (
                                        <>
                                            <Send size={16} />
                                            Send Message
                                        </>
                                    )}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}

import React, { useState } from 'react';
import { FileText, Download, Trash2, RefreshCw, AlertCircle } from "lucide-react";

export default function Trash() {
    const [isEmptying, setIsEmptying] = useState(false);
    const [isEmpty, setIsEmpty] = useState(false);

    const handleDownload = () => {
        // Create a fake download link for demo purposes
        // In real app: window.open('/resume.pdf', '_blank');
        const link = document.createElement('a');
        link.href = '/resume.pdf'; // Ensure you have this file in your public folder
        link.download = 'Sagar_Jain_Resume.pdf';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const handleEmptyTrash = () => {
        setIsEmptying(true);
        setTimeout(() => {
            setIsEmpty(true);
            setIsEmptying(false);
        }, 1500);
    };

    const handleRestore = () => {
        setIsEmpty(false);
    }

    return (
        <div className="flex flex-col h-full bg-white text-black font-sans">
            {/* Toolbar */}
            <div className="h-12 bg-gray-100 border-b border-gray-200 flex items-center justify-between px-4 shrink-0">
                
                
                <div className="flex gap-2">
                    {!isEmpty && (
                        <button 
                            onClick={handleEmptyTrash}
                            disabled={isEmptying}
                            className="flex items-center gap-1.5 px-3 py-1 bg-white border border-gray-300 rounded-md text-xs font-medium text-gray-700 hover:bg-gray-50 active:bg-gray-100 transition-colors shadow-sm disabled:opacity-50"
                        >
                            {isEmptying ? <RefreshCw size={12} className="animate-spin"/> : <Trash2 size={12} />}
                            {isEmptying ? 'Emptying...' : 'Empty Trash'}
                        </button>
                    )}
                    {isEmpty && (
                         <button 
                         onClick={handleRestore}
                         className="flex items-center gap-1.5 px-3 py-1 bg-white border border-gray-300 rounded-md text-xs font-medium text-blue-600 hover:bg-blue-50 transition-colors shadow-sm"
                     >
                         <RefreshCw size={12} />
                         Undo
                     </button>
                    )}
                </div>
            </div>

            {/* Content Area */}
            <div className="flex-1 p-6 bg-white overflow-auto">
                {isEmpty ? (
                    <div className="h-full flex flex-col items-center justify-center text-gray-400">
                        <Trash2 size={48} strokeWidth={1} className="mb-4 text-gray-300" />
                        <p className="text-lg font-medium">Trash is empty</p>
                        <p className="text-sm">Items moved to trash will appear here.</p>
                    </div>
                ) : (
                    <div className="space-y-2">
                        <div className="text-xs font-medium text-gray-500 mb-4 pl-1">1 item selected</div>
                        
                        {/* The Resume File "Accidentally" in Trash */}
                        <div className="group flex items-center justify-between p-3 rounded-lg border border-gray-200 hover:border-blue-400 hover:bg-blue-50/30 transition-all cursor-default">
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center text-red-600 shadow-sm group-hover:scale-105 transition-transform">
                                    <FileText size={20} />
                                </div>
                                <div>
                                    <h4 className="text-sm font-semibold text-gray-900">Sagar_Jain_Resume_Final_v2.pdf</h4>
                                    <div className="flex items-center gap-2 text-xs text-gray-500 mt-0.5">
                                        <span className="bg-gray-100 px-1.5 rounded">PDF Document</span>
                                        <span>•</span>
                                        <span>2.4 MB</span>
                                        <span>•</span>
                                        <span>Deleted Yesterday</span>
                                    </div>
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex items-center gap-2">
                                <button 
                                    onClick={handleDownload}
                                    title="Recover & Download"
                                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 shadow-sm transition-all hover:-translate-y-0.5"
                                >
                                    <Download size={16} />
                                    Recover & Download
                                </button>
                            </div>
                        </div>

                        {/* Fun Warning Message */}
                        <div className="mt-4 flex gap-3 p-4 bg-yellow-50 rounded-lg border border-yellow-100 text-yellow-800 text-sm">
                            <AlertCircle size={20} className="shrink-0 text-yellow-600" />
                            <div>
                                <p className="font-semibold">Why is my resume in the trash?</p>
                                <p className="mt-1 text-yellow-700/80">
                                    Sometimes great candidates get lost in the pile. Don't let this one go! 
                                    Recover it now before the system auto-deletes it.
                                </p>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Status Bar */}
            <div className="h-8 bg-gray-50 border-t border-gray-200 flex items-center px-4 text-xs text-gray-500">
                {!isEmpty ? "1 item, 2.4 MB available" : "0 items"}
            </div>
        </div>
    );
}
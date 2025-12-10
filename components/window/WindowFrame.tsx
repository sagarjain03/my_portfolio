import React, { useRef, useEffect } from "react";
import { motion, useDragControls } from "framer-motion";
import { X, Minus, Maximize2 } from "lucide-react";
import { useStore } from "@/store/useStore";

interface WindowFrameProps {
    id: string;
    title: string;
    zIndex: number;
    isOpen: boolean;
    isMinimized: boolean;
    children: React.ReactNode;
}

export default function WindowFrame({ id, title, zIndex, isOpen, isMinimized, children }: WindowFrameProps) {
    const { closeWindow, minimizeWindow, focusWindow } = useStore();
    const dragControls = useDragControls();
    const constraintsRef = useRef(null);

    if (!isOpen || isMinimized) return null;

    return (
        <>
            {/* Constraints container - usually the desktop area */}
            {/* However, framer-motion drag constraints are usually relative to a parent. 
          We'll rely on the window manager or just basic drag for now. */}

            <motion.div
                drag
                dragControls={dragControls}
                dragListener={false} // Only drag using the header
                dragMomentum={false}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                style={{ zIndex }}
                className="absolute top-20 left-20 w-[800px] h-[500px] bg-mac-window backdrop-blur-xl rounded-xl shadow-2xl border border-white/20 flex flex-col overflow-hidden resize"
                onClick={() => focusWindow(id)}
            >
                {/* Header / Title Bar */}
                <div
                    className="h-8 bg-black/5 flex items-center px-4 justify-between cursor-default"
                    onPointerDown={(e) => {
                        focusWindow(id);
                        dragControls.start(e);
                    }}
                >
                    <div className="flex gap-2">
                        <button
                            onClick={(e) => { e.stopPropagation(); closeWindow(id); }}
                            className="w-3 h-3 rounded-full bg-red-500 hover:bg-red-600 flex items-center justify-center group"
                        >
                            <X size={8} className="text-black/0 group-hover:text-black/50" />
                        </button>
                        <button
                            onClick={(e) => { e.stopPropagation(); minimizeWindow(id); }}
                            className="w-3 h-3 rounded-full bg-yellow-500 hover:bg-yellow-600 flex items-center justify-center group"
                        >
                            <Minus size={8} className="text-black/0 group-hover:text-black/50" />
                        </button>
                        <button
                            // Maximize unimplemented for simplicity, or just toggle full width
                            className="w-3 h-3 rounded-full bg-green-500 hover:bg-green-600 flex items-center justify-center group"
                        >
                            <Maximize2 size={8} className="text-black/0 group-hover:text-black/50" />
                        </button>
                    </div>
                    <span className="text-sm font-medium text-black/70">{title}</span>
                    <div className="w-14" /> {/* Spacer for centering */}
                </div>

                {/* Content */}
                <div className="flex-1 overflow-auto bg-white/50">
                    {children}
                </div>
            </motion.div>
        </>
    );
}

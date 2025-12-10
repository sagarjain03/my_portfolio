import React from 'react';
import { useStore } from "@/store/useStore";
import WindowFrame from "./WindowFrame";
import Finder from "../apps/Finder";
import Safari from "../apps/Safari";
import Terminal from "../apps/Terminal";
import Mail from "../apps/Mail";
import Photos from "../apps/Photos";
import Trash from "../apps/Trash";
import ReactNode from 'react';

// Static mapping of app IDs to components
const AppComponents: Record<string, any> = {
    finder: Finder,
    safari: Safari,
    terminal: Terminal,
    mail: Mail,
    photos: Photos,
    trash: Trash, 
};

export default function WindowManager() {
    const { windows } = useStore();

    return (
        <>
            {windows.map((window) => {
                const AppComponent = AppComponents[window.id];
                return (
                    <WindowFrame
                        key={window.id}
                        id={window.id}
                        title={window.title}
                        zIndex={window.zIndex}
                        isOpen={window.isOpen}
                        isMinimized={window.isMinimized}
                    >
                        {AppComponent ? <AppComponent /> : <div className="p-4">Content for {window.title}</div>}
                    </WindowFrame>
                );
            })}
        </>
    );
}

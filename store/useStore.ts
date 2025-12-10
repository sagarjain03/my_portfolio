import { create } from 'zustand';

export interface WindowState {
    id: string;
    title: string;
    isOpen: boolean;
    isMinimized: boolean;
    zIndex: number;
    content: React.ReactNode;
}

interface StoreState {
    windows: WindowState[];
    activeWindowId: string | null;
    zIndexes: Record<string, number>;
    openWindow: (id: string, title: string, content: React.ReactNode) => void;
    closeWindow: (id: string) => void;
    minimizeWindow: (id: string) => void;
    focusWindow: (id: string) => void;
}

export const useStore = create<StoreState>((set) => ({
    windows: [],
    activeWindowId: null,
    zIndexes: {},
    openWindow: (id, title, content) =>
        set((state) => {
            const existingWindow = state.windows.find((w) => w.id === id);
            const maxZ = Math.max(0, ...Object.values(state.zIndexes));

            if (existingWindow) {
                return {
                    windows: state.windows.map((w) =>
                        w.id === id ? { ...w, isOpen: true, isMinimized: false, zIndex: maxZ + 1 } : w
                    ),
                    activeWindowId: id,
                    zIndexes: { ...state.zIndexes, [id]: maxZ + 1 },
                };
            }

            const newWindow: WindowState = {
                id,
                title,
                isOpen: true,
                isMinimized: false,
                zIndex: maxZ + 1,
                content,
            };

            return {
                windows: [...state.windows, newWindow],
                activeWindowId: id,
                zIndexes: { ...state.zIndexes, [id]: maxZ + 1 },
            };
        }),
    closeWindow: (id) =>
        set((state) => ({
            windows: state.windows.map((w) =>
                w.id === id ? { ...w, isOpen: false } : w
            ),
            activeWindowId: null,
        })),
    minimizeWindow: (id) =>
        set((state) => ({
            windows: state.windows.map((w) =>
                w.id === id ? { ...w, isMinimized: true } : w
            ),
            activeWindowId: null,
        })),
    focusWindow: (id) =>
        set((state) => {
            const maxZ = Math.max(0, ...Object.values(state.zIndexes));
            return {
                windows: state.windows.map((w) =>
                    w.id === id ? { ...w, zIndex: maxZ + 1, isMinimized: false } : w
                ),
                activeWindowId: id,
                zIndexes: { ...state.zIndexes, [id]: maxZ + 1 },
            };
        }),
}));

import dynamic from 'next/dynamic';

const Desktop = dynamic(() => import("@/components/desktop/Desktop"), {
    loading: () => <div className="h-screen w-screen bg-black" />
});
const MobileView = dynamic(() => import("@/components/mobile/MobileView"), {
    loading: () => <div className="h-screen w-screen bg-black" />
});

export default function Home() {
    return (
        <main className="h-screen w-screen overflow-hidden text-white">
            <div className="hidden md:block h-full w-full">
                <Desktop />
            </div>
            <div className="md:hidden h-full w-full overflow-auto">
                <MobileView />
            </div>
        </main>
    );
}

import Desktop from "@/components/desktop/Desktop";
import MobileView from "@/components/mobile/MobileView";

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

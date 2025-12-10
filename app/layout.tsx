import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
    title: "Sagar Jain - Portfolio",
    description: "macOS-style Portfolio Website",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body>{children}</body>
        </html>
    );
}

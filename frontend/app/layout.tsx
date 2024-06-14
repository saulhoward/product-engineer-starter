import "@/styles/globals.css";
import { QueryClientProvider, useQueryClient } from "@tanstack/react-query";

interface IRootLayoutProps {
    children: React.ReactNode;
}

export default function RootLayout(props: IRootLayoutProps) {
    const { children } = props;

    return (
        <html lang="en">
            <head></head>
            <body>
                {children}
                <div id="modal" />
            </body>
        </html>
    );
}

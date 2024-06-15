import "@/styles/globals.css";
import { QueryClientProvider, useQueryClient } from "@tanstack/react-query";

interface IRootLayoutProps {
    children: React.ReactNode;
}

export default function RootLayout(props: IRootLayoutProps) {
    const { children } = props;

    return (
        <html lang="en">
            <head>
                <title>Anterior Dashboard</title>
                <link rel="icon" href="/icon.svg" type="image/svg+xml" sizes="any"></link>
            </head>
            <body>
                {children}
                <div id="modal" />
            </body>
        </html>
    );
}

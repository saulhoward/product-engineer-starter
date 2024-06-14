"use client";

import axios from "axios";
import { DashboardProvider } from "@/context/dashboard-context";
import { Toaster } from "@/context/toaster";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

axios.defaults.baseURL = "http://localhost:8000";

export default function PriorAuthLayout({ children }: { children: React.ReactNode }) {
    const queryClient = new QueryClient();
    return (
        <QueryClientProvider client={queryClient}>
            <DashboardProvider>
                <Toaster />
                <div className="w-full flex flex-col">{children}</div>
            </DashboardProvider>
        </QueryClientProvider>
    );
}

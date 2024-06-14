"use client";

import * as React from "react";
import { useDashboard, useDashboardDispatch } from "@/context/dashboard-context";
import { Button } from "@/components/button";
import { useInterval } from "usehooks-ts";
import { useToast } from "@/context/use-toast";

const mockUploadDelay = 3000;

export default function GuidelinesUpload() {
    const { guidelinesFile } = useDashboard();
    const { toast } = useToast();
    const dispatch = useDashboardDispatch();
    const [isUploading, setIsUploading] = React.useState(false);

    // mock upload delay
    // NB - I am adding the timeout into the component, and not abstracting it
    // into the useDashboard context hook because timeout state updates should
    // be tied to components.
    useInterval(
        () => {
            setIsUploading(false);
            dispatch({ type: "setGuidelinesFile", file: { url: "/assets/guidelines.pdf" } });
            toast({ title: "Success", description: "Uploaded guidelines file" });
        },
        isUploading ? mockUploadDelay : null
    );

    const handleClick = () => {
        setIsUploading(true);
    };

    const isSuccess = guidelinesFile !== null;
    const disabled = isSuccess || isUploading;

    return (
        <div className="w-1/2 h-64 border-4 border-gray-200 border-dashed rounded flex flex-row items-center justify-center">
            <Button
                onClick={handleClick}
                isLoading={isUploading}
                isSuccess={isSuccess}
                disabled={disabled}
                variant="orange">
                {!isSuccess && <span>Simulate Guidelines Upload</span>}
                {isSuccess && <span>Guidelines File Uploaded</span>}
            </Button>
        </div>
    );
}

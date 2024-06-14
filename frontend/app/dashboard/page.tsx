"use client";

import { Button } from "@/components/button";
import GuidelinesUpload from "@/components/guidelines-upload";
import MedicalRecordUpload from "@/components/medical-record-upload";
import { WorkflowStage, useDashboard } from "@/context/dashboard-context";
import { Toaster } from "@/context/toaster";
import classNames from "classnames";
import { useRouter } from "next/navigation";

export const revalidate = 0;

export default function DashboardRoot() {
    const router = useRouter();
    const { workflowStage } = useDashboard();
    const CASE_ID = "case_891a_6fbl_87d1_4326";

    const handleContinue = () => {
        router.push(`/dashboard/case/${CASE_ID}`);
    };

    const showGuidelinesUpload =
        workflowStage === WorkflowStage.MEDICAL_RECORD ||
        workflowStage === WorkflowStage.MEDICAL_RECORD_AND_GUIDELINES;
    const showContinue = workflowStage === WorkflowStage.MEDICAL_RECORD_AND_GUIDELINES;

    return (
        <div className="w-full flex flex-col">
            <Toaster />
            <div className="w-full flex flex-col h-screen justify-center items-center">
                <div className="w-full flex flex-row gap-2 items-center">
                    <MedicalRecordUpload />
                    {showGuidelinesUpload && <GuidelinesUpload />}
                </div>

                <div className="w-full py-4 flex flex-row items-center justify-center h-28">
                    <Button
                        variant={showContinue ? "green" : "grey"}
                        disabled={!showContinue}
                        className={classNames("h-fit", showContinue ? "" : "opacity-60")}
                        onClick={handleContinue}>
                        Continue
                    </Button>
                </div>
            </div>
        </div>
    );
}

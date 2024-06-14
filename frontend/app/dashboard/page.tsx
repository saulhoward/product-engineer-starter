"use client";

import { usePostCasesCasesPost } from "@/api/default/default";
import { Button } from "@/components/button";
import GuidelinesUpload from "@/components/guidelines-upload";
import MedicalRecordUpload from "@/components/medical-record-upload";
import { WorkflowStage, useDashboard } from "@/context/dashboard-context";
import { useToast } from "@/context/use-toast";
import classNames from "classnames";
import { useRouter } from "next/navigation";

export const revalidate = 0;

export default function DashboardRoot() {
    const router = useRouter();
    const { workflowStage } = useDashboard();
    const createCase = usePostCasesCasesPost();
    const { toast } = useToast();

    const handleContinue = () => {
        createCase.mutate(undefined, {
            onError: () => {
                toast({ title: "Sorry, there was an error" });
            },
            onSuccess: (data) => {
                router.push(`/dashboard/case/${data.data.case_id}`);
            }
        });
    };

    const showGuidelinesUpload =
        workflowStage === WorkflowStage.MEDICAL_RECORD ||
        workflowStage === WorkflowStage.MEDICAL_RECORD_AND_GUIDELINES;
    const showContinue = workflowStage === WorkflowStage.MEDICAL_RECORD_AND_GUIDELINES;

    return (
        <div className="w-full px-16 flex flex-col h-screen justify-center items-center">
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
    );
}

"use client";

import { usePostCasesCasesPost } from "@/api/default/default";
import { Button } from "@/components/button";
import GuidelinesUpload from "@/components/guidelines-upload";
import MedicalRecordUpload from "@/components/medical-record-upload";
import { Separator } from "@/components/separator";
import { Title } from "@/components/title";
import { WorkflowStage, useDashboard, useDashboardDispatch } from "@/context/dashboard-context";
import { useToast } from "@/context/use-toast";
import classNames from "classnames";
import { useRouter } from "next/navigation";

export const revalidate = 0;

export default function DashboardRoot() {
    const router = useRouter();
    const { workflowStage } = useDashboard();
    const dispatch = useDashboardDispatch();
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
    const handleReset = () => {
        dispatch({ type: "resetFiles" });
    };

    const showGuidelinesUpload =
        workflowStage === WorkflowStage.MEDICAL_RECORD ||
        workflowStage === WorkflowStage.MEDICAL_RECORD_AND_GUIDELINES;
    const showContinue = workflowStage === WorkflowStage.MEDICAL_RECORD_AND_GUIDELINES;

    return (
        <div className="w-screen min-h-screen">
            <div className="flex items-center gap-6">
                <Title title="Anterior" />
            </div>
            <Separator />

            <div className="flex items-center gap-6">
                <div className="w-full p-16 flex flex-col h-full justify-center items-center">
                    <div className="w-full flex flex-row gap-2 items-center">
                        <MedicalRecordUpload />
                        {showGuidelinesUpload && <GuidelinesUpload />}
                    </div>

                    <div className="w-full py-4 flex gap-4 flex-col items-center justify-center h-56">
                        <Button
                            variant={showContinue ? "green" : "grey"}
                            disabled={!showContinue}
                            className={classNames("h-fit", showContinue ? "" : "opacity-60")}
                            onClick={handleContinue}>
                            Continue
                        </Button>
                        <Button
                            className={showContinue ? "visible" : "invisible"}
                            variant="ghost"
                            onClick={handleReset}>
                            Reset case
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}

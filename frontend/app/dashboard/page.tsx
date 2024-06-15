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
                <Title title="Dashboard" />
            </div>
            <Separator />
            <div className="flex items-center gap-6">
                <div className="w-full p-16 space-y-12 flex flex-col h-full justify-center items-center">
                    <div className="flex justify-between w-full items-center">
                        <HelpText workflowStage={workflowStage} />
                        <div className="w-full flex gap-4 flex-col items-end justify-center">
                            <Button
                                variant={showContinue ? "green" : "grey"}
                                disabled={!showContinue}
                                className={classNames(
                                    "h-fit mx-12",
                                    showContinue ? "" : "opacity-40"
                                )}
                                onClick={handleContinue}>
                                Open case report
                            </Button>
                        </div>
                    </div>
                    <div className="w-full flex flex-row gap-2 items-center">
                        <MedicalRecordUpload />
                        {showGuidelinesUpload && <GuidelinesUpload />}
                    </div>
                    <div className="w-full flex gap-4 flex-col items-end justify-center">
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

function helpTitle(workflowStage: WorkflowStage) {
    switch (workflowStage) {
        case WorkflowStage.INITIAL:
            return "Welcome to Anterior";
        case WorkflowStage.MEDICAL_RECORD:
            return "Medical Record accepted";
        case WorkflowStage.MEDICAL_RECORD_AND_GUIDELINES:
            return "Medical Record and Guidelines accepted";
    }
}

function helpBody(workflowStage: WorkflowStage) {
    switch (workflowStage) {
        case WorkflowStage.INITIAL:
            return "Please use the button to upload your Medical Record.";
        case WorkflowStage.MEDICAL_RECORD:
            return "Thank you. Now, please use the button to upload your Guidelines.";
        case WorkflowStage.MEDICAL_RECORD_AND_GUIDELINES:
            return "All done. You can now continue to view the Case Report.";
    }
}

function HelpText({ workflowStage }: { workflowStage: WorkflowStage }) {
    return (
        <div className="w-full space-y-2">
            <div className="font-semibold text-2xl text-slate-600">{helpTitle(workflowStage)}</div>
            <p className="prose-lg prose-slate">{helpBody(workflowStage)}</p>
        </div>
    );
}

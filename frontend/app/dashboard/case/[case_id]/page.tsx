"use client";

import { useParams, useRouter } from "next/navigation";
import { useGetCaseByIdCasesCaseIdGet } from "@/api/default/default";
import { Case, Status } from "@/api/api.schemas";
import { FaAngleDoubleDown, FaArrowDown, FaSpinner } from "react-icons/fa";
import { IoSparkles } from "react-icons/io5";
import { Separator } from "@/components/separator";
import { StepItem, TickCross } from "@/components/step";
import { useEffect, useState } from "react";
import { Button } from "@/components/button";
import { Title } from "@/components/title";
import classNames from "classnames";

function prettyDate(input: string) {
    const d = new Date(input);
    return `${d.toLocaleDateString()} ${d.toLocaleTimeString()}`;
}

export default function CaseResult() {
    const params = useParams<{ case_id: string }>();
    const [isError, setIsError] = useState(false);
    const getCase = useGetCaseByIdCasesCaseIdGet(params.case_id || "", {
        query: { enabled: !!params.case_id && !isError, refetchInterval: 2000 }
    });

    useEffect(() => {
        setIsError(getCase.isError);
    }, [getCase.isFetched]);
    const { isLoading } = getCase;
    const cse = getCase.data?.data;
    const isCompleted = cse ? cse.status === Status.completed : false;

    return (
        <div className="w-screen min-h-screen">
            <div className="flex items-center gap-6">
                <Title isLoading={isLoading} title={cse ? cse.procedure_name : ""} />
            </div>
            <Separator />
            {isError && <ErrorMsg />}
            {!isError && (
                <div className="grid grid-cols-2">
                    <div className="p-8 space-y-6">
                        <div className="grid grid-cols-9 gap-4">
                            <div className="col-span-4">
                                <Timestamp isLoading={isLoading} cse={cse} />
                            </div>
                            <div className="col-span-5">
                                {isCompleted && <CPTCodes isLoading={isLoading} cse={cse} />}
                                {cse && <StatusComponent status={cse.status} />}
                            </div>
                        </div>
                        <Summary isLoading={isLoading} cse={cse} />
                        {isCompleted && <Steps isLoading={isLoading} cse={cse} />}
                    </div>
                    <div className="flex">
                        <Separator orientation="vertical" />
                        <div className="p-16 pt-8 h-full w-full">
                            {isCompleted && (
                                <>
                                    {cse && <FinalDetermination isMet={cse.is_met} />}
                                    <div className="h-full w-full bg-blue-50 border rounded-sm" />
                                </>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

function StatusComponent({ status }: { status: Status }) {
    return (
        <>
            {status !== Status.completed && (
                <div className="border p-2 px-4 rounded-full w-auto">
                    <div className="flex gap-2 items-center">
                        {status === Status.processing && (
                            <>
                                <IoSparkles className="h-6 w-6 text-violet-500 animate-pulse" />
                                <span className="text-slate-600">
                                    Florence is processing your case...
                                </span>
                            </>
                        )}
                        {status === Status.submitted && (
                            <>
                                <FaAngleDoubleDown className="h-6 w-6 text-green-500 animate-pulse" />
                                <span className="text-slate-600">
                                    Anterior has received your case...
                                </span>
                            </>
                        )}
                    </div>
                </div>
            )}
        </>
    );
}

function CPTCodes({ isLoading, cse }: { isLoading: boolean; cse?: Case }) {
    return (
        <div className="flex flex-col">
            <div className="pb-4 text-lg text-slate-500">CPT codes</div>
            <div className="max-w-prose">
                {isLoading && <FaSpinner className="h-4 w-4 animate-spin" />}
                {cse && (
                    <div className="flex flex-wrap">
                        {cse.cpt_codes.map((c, i) => (
                            <div key={i} className="font-mono text-slate-800 pr-4">
                                {c}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

function Summary({ isLoading, cse }: { isLoading: boolean; cse?: Case }) {
    return (
        <div className="flex flex-col">
            <div className="pb-4 text-lg text-slate-500">Summary</div>
            <div className="border h-52 overflow-y-scroll p-2">
                <div className="max-w-prose">
                    {isLoading && <FaSpinner className="h-4 w-4 animate-spin" />}
                    {cse && <div className="prose prose-slate">{cse.summary}</div>}
                    {cse?.status !== Status.completed && (
                        <div className="space-y-2 p-4">
                            <Skeleton className="w-5/6" />
                            <Skeleton className="w-3/6" />
                            <Skeleton className="w-4/6" />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

function Skeleton({ className }: { className?: string }) {
    return (
        <div
            className={classNames("h-8 w-full bg-slate-300 rounded-xl animate-pulse", className)}
        />
    );
}

function Timestamp({ isLoading, cse }: { isLoading: boolean; cse?: Case }) {
    return (
        <div className="flex flex-col">
            <div className="pb-4 text-lg text-slate-500">Case created on</div>
            <div>{cse && <div className="text-slate-800">{prettyDate(cse.created_at)}</div>}</div>
        </div>
    );
}

function Steps({ isLoading, cse }: { isLoading: boolean; cse?: Case }) {
    return (
        <div className="flex flex-col">
            <div className="pb-4 text-lg text-slate-500">Steps</div>
            <div>
                {isLoading && <FaSpinner className="h-4 w-4 animate-spin" />}
                {cse && (
                    <div className="flex flex-col gap-4">
                        {cse.steps.map((s, i) => (
                            <StepItem key={i} step={s} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

function FinalDetermination({ isMet }: { isMet: boolean }) {
    const str = isMet ? "Case is met" : "Case is not met";
    return (
        <div className="flex gap-4 pb-6">
            <TickCross isTick={isMet} />
            <div className="text-lg text-slate-500">{str}</div>
        </div>
    );
}

function ErrorMsg() {
    const router = useRouter();
    return (
        <div className="w-full flex justify-center items-center py-24">
            <div className="border p-6 max-w-prose space-y-6">
                <div className="space-y-2">
                    <div className="text-lg text-slate-500">
                        Sorry, but we can&apos;t find that case
                    </div>
                    <div className="text-slate-600">
                        Please reload the page, or click on this link to go to the Dashboard.
                    </div>
                </div>
                <div className="flex w-full items-center justify-center">
                    <Button onClick={() => router.push("/dashboard")}>Go to the dashboard</Button>
                </div>
            </div>
        </div>
    );
}

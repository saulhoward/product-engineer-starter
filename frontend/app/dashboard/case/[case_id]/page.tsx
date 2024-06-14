"use client";

import { useParams } from "next/navigation";
import { useGetCaseByIdCasesCaseIdGet } from "@/api/default/default";
import { Case } from "@/api/api.schemas";
import { FaSpinner } from "react-icons/fa";
import { Separator } from "@/components/separator";

function prettyDate(input: string) {
    const d = new Date(input);

    return `${d.toLocaleDateString()} ${d.toLocaleTimeString()}`;
}

export default function CaseResult() {
    const params = useParams<{ case_id: string }>();
    const getCase = useGetCaseByIdCasesCaseIdGet(params.case_id || "", {
        query: { enabled: !!params.case_id }
    });

    if (getCase.isError) {
        return (
            <div className="w-full max-w-lg">
                <div>Sorry, there was an error.</div>
            </div>
        );
    }

    return (
        <div className="w-screen min-h-screen">
            <Title isLoading={getCase.isLoading} cse={getCase.data?.data} />
            <Separator />
            <div className="grid grid-cols-2">
                <div className="p-8 space-y-4">
                    <CPTCodes isLoading={getCase.isLoading} cse={getCase.data?.data} />
                    <Summary isLoading={getCase.isLoading} cse={getCase.data?.data} />
                </div>
                <Separator orientation="vertical" />
                <div></div>
            </div>
        </div>
    );
}

function Title({ isLoading, cse }: { isLoading: boolean; cse?: Case }) {
    return (
        <div className="p-4 px-8 text-lg inline-flex justify-center items-center">
            {isLoading && <FaSpinner className="h-4 w-4 animate-spin" />}
            {cse && (
                <div className="flex gap-4">
                    <div className="h-6 w-6">
                        <svg
                            height="100%"
                            viewBox="0 0 500 476"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg">
                            <g clip-path="url(#clip0_1_180)">
                                <path
                                    d="M284.242 83.9863L13.6405 271.721C5.0928 277.652 -0.00469675 287.396 3.24729e-06 297.799L0.0364032 386.148C0.0399032 393.749 2.2514 401.061 6.2454 407.28C7.3112 408.94 8.6674 410.299 10.2019 411.332L70.0809 454.881C70.5889 455.49 71.172 456.053 71.8647 456.535L82.8954 464.201C93.5394 471.599 106.191 475.564 119.154 475.564H299.039C302.542 475.564 305.382 472.724 305.382 469.222V335.096C305.382 331.593 302.542 328.753 299.039 328.753H237.443C231.39 328.753 225.491 330.662 220.584 334.207L113.871 411.31C108.648 415.084 101.578 415.029 96.4154 411.173L72.2147 393.099C67.3545 389.469 67.4717 382.147 72.4455 378.674L287.819 228.316C298.82 220.684 305.382 208.145 305.382 194.756V95.0494C305.382 84.1823 293.171 77.792 284.242 83.9863Z"
                                    fill="currentColor"
                                />
                                <path
                                    d="M14.9863 0C6.76075 0 0.0926514 6.6681 0.0926514 14.8936V71.204C0.0926514 76.813 2.83925 82.0666 7.44525 85.2676L81.5851 136.793C92.1609 144.143 106.192 144.143 116.768 136.793L244.463 48.0472C249.367 44.6388 255.197 42.812 261.169 42.812H341.571C347.995 42.812 353.203 48.0198 353.203 54.444V368.756C353.203 392.505 364.832 414.748 384.334 428.301L442.881 468.99C448.973 473.224 456.215 475.493 463.634 475.493H490.808C495.885 475.493 500 471.378 500 466.302V106.845C500 83.0967 488.371 60.8531 468.869 47.2999L416.236 10.7214C406.192 3.7412 394.254 0 382.022 0H14.9863Z"
                                    fill="currentColor"
                                />
                            </g>
                            <defs>
                                <clipPath id="clip0_1_180">
                                    <rect width="500" height="475.564" fill="white" />
                                </clipPath>
                            </defs>
                        </svg>
                    </div>

                    <div>{cse.procedure_name}</div>
                    <div>{prettyDate(cse.created_at)}</div>
                </div>
            )}
        </div>
    );
}

function CPTCodes({ isLoading, cse }: { isLoading: boolean; cse?: Case }) {
    return (
        <div className="flex flex-col">
            <div className="pb-4 text-lg text-slate-500">CPT codes</div>
            <div className="max-w-prose">
                {isLoading && <FaSpinner className="h-4 w-4 animate-spin" />}
                {cse && (
                    <div className="flex space-x-4">
                        {cse.cpt_codes.map((c, i) => (
                            <div key={i} className="font-mono">
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
                </div>
            </div>
        </div>
    );
}

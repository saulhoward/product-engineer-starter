import { Step } from "@/api/api.schemas";
import { Separator } from "@/components/separator";
import { prettyDate } from "@/utils/date";
import classNames from "classnames";
import { FaCheckCircle, FaMinusCircle } from "react-icons/fa";

export function StepItem({
    step,
    isSelected,
    onClick
}: {
    step: Step;
    isSelected: boolean;
    onClick: () => void;
}) {
    return (
        <button
            onClick={onClick}
            className={classNames(
                "flex space-x-4 items-center rounded-full p-2",
                isSelected ? "bg-blue-100" : "hover:bg-blue-100/50"
            )}>
            <TickCross isTick={step.is_met} />
            <div className="text-left">{step.question}</div>
        </button>
    );
}

export function TickCross({
    isTick,
    size = "default"
}: {
    isTick: boolean;
    size?: "sm" | "default";
}) {
    return (
        <div>
            {isTick && (
                <FaCheckCircle
                    className={classNames(
                        "text-green-600 bg-white rounded-full",
                        size === "sm" ? "h-4 w-4" : "h-8 w-8"
                    )}
                />
            )}
            {!isTick && (
                <FaMinusCircle
                    className={classNames(
                        "text-slate-400 bg-white rounded-full",
                        size === "sm" ? "h-4 w-4" : "h-8 w-8"
                    )}
                />
            )}
        </div>
    );
}

export function EvidenceComponent({ step }: { step: Step }) {
    return (
        <div className="w-full bg-slate-50 border rounded-sm p-8 space-y-8">
            <div className="space-y-2">
                <div className="text-slate-600">Step</div>
                <Separator />
                <div className="prose-lg">{step.question}</div>
                <div className="flex gap-2 items-center">
                    <TickCross isTick={step.is_met} size="sm" />
                    <div className="text-slate-600">Has been met</div>
                </div>
                <div className="flex gap-2 items-center">
                    <TickCross isTick={step.is_final} size="sm" />
                    <div className="text-slate-600">Is final</div>
                </div>
            </div>
            <div className="space-y-2">
                <div className="text-slate-600">Options</div>
                <Separator />
                {step.options.map((o, i) => (
                    <div key={i} className="flex gap-2 items-center">
                        <TickCross isTick={o.selected} size="sm" />
                        <div className="text-slate-600">{o.text}</div>
                    </div>
                ))}
            </div>
            <div className="space-y-2">
                <div className="text-slate-600">Evidence</div>
                <Separator />
                {step.evidence.map((o, i) => (
                    <div key={i} className="flex flex-col space-y-2">
                        <div className="flex space-x-2 items-center justify-between w-full">
                            <div className="font-mono">{o.page_number}</div>
                            <div className="text-slate-600 prose-sm">
                                {prettyDate(o.event_datetime)}
                            </div>
                        </div>
                        <div className="pr-4">{o.content}</div>
                    </div>
                ))}
            </div>
        </div>
    );
}

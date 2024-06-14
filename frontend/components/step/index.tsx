import { Step } from "@/api/api.schemas";
import { FaCheckCircle, FaMinusCircle } from "react-icons/fa";

export function StepItem({ step }: { step: Step }) {
    return (
        <div className="flex space-x-4 items-center">
            <TickCross isTick={step.is_met} />
            <div>{step.question}</div>
        </div>
    );
}

export function TickCross({ isTick }: { isTick: boolean }) {
    return (
        <div>
            {isTick && <FaCheckCircle className="text-green-600 h-8 w-8" />}
            {!isTick && <FaMinusCircle className="text-slate-400 h-8 w-8" />}
        </div>
    );
}

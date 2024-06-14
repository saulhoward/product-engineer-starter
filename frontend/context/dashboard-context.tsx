"use client";
import { createContext, useContext, useReducer, ReactNode, Dispatch } from "react";

interface IUploadedFile {
    url: string;
}

interface IDashboardContext {
    medicalRecord: IUploadedFile | null;
    guidelinesFile: IUploadedFile | null;
    workflowStage: WorkflowStage;
}

export enum WorkflowStage {
    INITIAL = "INITIAL",
    MEDICAL_RECORD = "MEDICAL_RECORD",
    MEDICAL_RECORD_AND_GUIDELINES = "MEDICAL_RECORD_AND_GUIDELINES"
}

const INITIAL_STATE: IDashboardContext = {
    medicalRecord: null,
    guidelinesFile: null,
    workflowStage: WorkflowStage.INITIAL
};

export type DashboardAction =
    | { type: "resetFiles" }
    | { type: "setMedicalRecord"; file: IUploadedFile }
    | { type: "setGuidelinesFile"; file: IUploadedFile };

function setWorkflowStage(state: IDashboardContext): WorkflowStage {
    if (state.medicalRecord !== null && state.guidelinesFile !== null) {
        return WorkflowStage.MEDICAL_RECORD_AND_GUIDELINES;
    } else if (state.medicalRecord !== null && state.guidelinesFile === null) {
        return WorkflowStage.MEDICAL_RECORD;
    }
    return WorkflowStage.INITIAL;
}

function reducer(state: IDashboardContext, action: DashboardAction): IDashboardContext {
    const next = () => {
        switch (action.type) {
            case "setMedicalRecord":
                return {
                    ...state,
                    medicalRecord: action.file
                };
            case "setGuidelinesFile":
                return {
                    ...state,
                    guidelinesFile: action.file
                };
            case "resetFiles":
                return INITIAL_STATE;
        }
    };
    const newState = next();
    newState.workflowStage = setWorkflowStage(newState);
    return newState;
}

const DashboardContext = createContext<IDashboardContext>(INITIAL_STATE);

const DashboardDispatchContext = createContext<Dispatch<DashboardAction>>(() => {});

export function DashboardProvider({ children }: { children: ReactNode }) {
    const [state, dispatch] = useReducer(reducer, INITIAL_STATE);
    return (
        <DashboardContext.Provider value={state}>
            <DashboardDispatchContext.Provider value={dispatch}>
                {children}
            </DashboardDispatchContext.Provider>
        </DashboardContext.Provider>
    );
}

export function useDashboard() {
    const context = useContext(DashboardContext);
    return context;
}

export function useDashboardDispatch() {
    return useContext(DashboardDispatchContext);
}

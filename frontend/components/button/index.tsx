import * as React from "react";
import { FaSpinner, FaCheck } from "react-icons/fa";
import classNames from "classnames";

const buttonStyles = {
    base: "inline-flex items-center justify-center py-2 px-4 rounded border-2 font-medium transition-colors",
    blue: "text-white bg-blue-500 border-blue-500",
    orange: "text-white bg-orange-500 border-orange-500",
    green: "text-white bg-green-600 border-green-600",
    grey: "text-white bg-slate-500 border-slate-500",
    ghost: "text-slate-500 bg-white border-transparent",
    success: "text-green-600 bg-white border-transparent flex gap-2 align-center justify-center"
};

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    isLoading?: boolean;
    isSuccess?: boolean;
    variant?: "blue" | "orange" | "green" | "grey" | "ghost";
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    (
        { className, isLoading = false, isSuccess = false, variant = "blue", children, ...props },
        ref
    ) => {
        let variantStyle = "";
        if (isSuccess) {
            variantStyle = buttonStyles.success;
        } else {
            switch (variant) {
                case "orange":
                    variantStyle = buttonStyles.orange;
                    break;
                case "green":
                    variantStyle = buttonStyles.green;
                    break;
                case "grey":
                    variantStyle = buttonStyles.grey;
                    break;
                case "ghost":
                    variantStyle = buttonStyles.ghost;
                    break;
                case "blue":
                default:
                    variantStyle = buttonStyles.blue;
            }
        }
        return (
            <button
                className={classNames(
                    buttonStyles.base,
                    variantStyle,
                    isLoading ? "flex gap-2" : "",
                    className
                )}
                ref={ref}
                {...props}>
                {isLoading && (
                    <>
                        <FaSpinner className="h-4 w-4 animate-spin" />
                        <div>{children}</div>
                    </>
                )}
                {!isLoading && isSuccess && (
                    <>
                        <FaCheck className="h-4 w-4" />
                        <div>{children}</div>
                    </>
                )}
                {!isLoading && !isSuccess && children}
            </button>
        );
    }
);
Button.displayName = "Button";

export { Button };

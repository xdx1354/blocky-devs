import React, { CSSProperties, useEffect } from "react";
import { HashLoader } from "react-spinners";
import { useExchangeContext } from "../utils/ExchangeContext";

type LoadingWidgetProps = {};

const override: CSSProperties = {
    display: "block",
    margin: "0 auto",
};

const LoadingWidget: React.FC<LoadingWidgetProps> = () => {
    const { started, completed, errors } = useExchangeContext();

    const [isOpen, setIsOpen] = React.useState(false);

    useEffect(() => {
        if (started || errors || completed) {
            setIsOpen(true);
        }
    }, [started, errors, completed]);

    if (!isOpen) {
        return null;
    }

    return (
        <div className="fixed inset-x-0 top-4 mx-auto z-10 w-full max-w-xs flex flex-row items-center justify-between p-4 bg-gray-800 rounded-xl shadow-md">
            <div className="flex flex-row items-center">
                {started && (
                    <div className="flex flex-row items-center">
                        <HashLoader
                            color={"#36d7b7"}
                            loading={true}
                            cssOverride={override}
                            size={30}
                            aria-label="Loading Spinner"
                            data-testid="loader"
                        />
                        <span className="ml-3 text-gray-700">Processing transaction...</span>
                    </div>
                )}

                {errors && (
                    <div className="flex flex-row items-center">
                        <span className="text-red-500 font-semibold">Error processing transaction. Please try again.</span>
                    </div>
                )}

                {completed && (
                    <div className="flex flex-row items-center">
                        <span className="text-green-500 font-semibold">Transaction completed successfully!</span>
                    </div>
                )}
            </div>

            <button
                className="text-gray-500 hover:text-gray-700 text-3xl"
                onClick={() => setIsOpen(false)}
            >
                &times;
            </button>
        </div>
    );
};

export default LoadingWidget;

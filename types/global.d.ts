export { };

declare global {
    interface Window {
        ReactNativeWebView?: {
            postMessage: (
                message: string
            ) => void;
        };

        PhonePeCheckout?: {
            transact: (params: {
                tokenUrl: string;
                type?: "IFRAME";
                callback?: (
                    response:
                        | "USER_CANCEL"
                        | "CONCLUDED"
                ) => void;
            }) => void;

            closePage: () => void;
        };
    }
}
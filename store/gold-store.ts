import { create } from "zustand";

interface GoldStore {
    amount: string;
    setAmount: (v: string) => void;

    livePrice: any;
    setLivePrice: (v: any) => void;

    breakdown: any;
    setBreakdown: (v: any) => void;

    verifyData: any;
    setVerifyData: (v: any) => void;

    orderId: string | null;
    setOrderId: (v: string | null) => void;

    txId: number | null;
    setTxId: (v: number | null) => void;
}

export const useGoldStore = create<GoldStore>((set) => ({
    amount: "",

    setAmount: (v) => set({ amount: v }),

    livePrice: null,
    setLivePrice: (v) => set({ livePrice: v }),

    breakdown: null,
    setBreakdown: (v) => set({ breakdown: v }),

    verifyData: null,
    setVerifyData: (v) => set({ verifyData: v }),

    orderId: null,
    setOrderId: (v) => set({ orderId: v }),

    txId: null,
    setTxId: (v) => set({ txId: v }),
}));
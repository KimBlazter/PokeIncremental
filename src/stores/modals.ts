import { create } from "zustand";

type ModalState = {
    openModalId: string | null;
    open: (id: string) => void;
    close: () => void;
    toggle: (id: string) => void;
};

export const useModalStore = create<ModalState>((set, get) => ({
    openModalId: null,
    open: (id) => set({ openModalId: id }),
    close: () => set({ openModalId: null }),
    toggle: (id) => {
        const current = get().openModalId;
        set({ openModalId: current === id ? null : id });
    },
}));

import { useGameStore } from "@/stores/game";

const storeToJson = () => {
    const fullStore = useGameStore.getState();

    const sortedStore = Object.entries(fullStore).reduce(
        (acc, [key, value]) => {
            if (typeof value === "function") return acc; // skip functions
            acc[key] = value;
            return acc;
        },
        {} as Record<string, unknown>
    );

    return sortedStore;
};

export const exportSave = (): string =>
    window.btoa(JSON.stringify(storeToJson()));

const decodeSave = (input: string): any => JSON.parse(window.atob(input));

export const importSave = (input: string) => {
    const { setState } = useGameStore;
    const decoded = decodeSave(input);

    Object.entries(decoded).forEach(([key, value]) => {
        if (typeof value === "function" || value === undefined) return;
        console.log(key, ":", value);
        setState({ [key]: value });
    });
};

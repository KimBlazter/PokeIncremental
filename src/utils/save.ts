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

const decodeSave = (input: string) =>
    JSON.parse(Buffer.from(input, "base64").toString());

export const exportSave = () => {
    const saveData = JSON.stringify(storeToJson());
    return Buffer.from(saveData).toString("base64");
};

export const importSave = (input: string) => {
    const { setState } = useGameStore;
    const decoded = decodeSave(input);

    Object.entries(decoded).forEach(([key, value]) => {
        if (typeof value === "function" || value === undefined) return;
        setState({ [key]: value });
    });
};

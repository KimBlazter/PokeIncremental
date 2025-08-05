import ResourceComponent from "./ResourceComponent";
import { useGameStore } from "@/stores/game";

const MIN_VISIBLE_SLOTS = 18;

export default function ResourcesComponent() {
    const discoveredResources = useGameStore(
        (state) => state.discoveredResources
    );
    const resources = useGameStore((state) => state.resources);

    const emptySlotsCount = Math.max(
        0,
        MIN_VISIBLE_SLOTS - discoveredResources.length
    );

    return (
        <div className="flex flex-col">
            <h2 className="text-mcInventoryText text-lg font-bold">
                Resources
            </h2>
            <div className="max-h-96 overflow-y-auto pb-4">
                <div className="flex flex-row flex-wrap pt-1">
                    {discoveredResources.map((resource) => {
                        return (
                            <ResourceComponent
                                resourceData={resources[resource]}
                                resourceKey={resource}
                                key={resource}
                            />
                        );
                    })}
                    {/* Empty slots */}
                    {Array.from({ length: emptySlotsCount }).map((_, idx) => (
                        <div key={idx} className="item-slot" />
                    ))}
                </div>
            </div>
        </div>
    );
}

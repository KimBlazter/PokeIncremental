import { Resource } from "@/stores/resources";
import ResourceComponent from "./ResourceComponent";
import { useGameStore } from "@/stores/game";

const MIN_VISIBLE_SLOTS = 18;

export default function ResourcesComponent() {
    const resources = useGameStore((state) => state.resources);

    const resourceKeys = Object.keys(resources).filter(
        (key) => resources[key as Resource].amount > 0
    ) as Resource[];

    const emptySlotsCount = Math.max(
        0,
        MIN_VISIBLE_SLOTS - resourceKeys.length
    );

    return (
        <div className="flex flex-col">
            <h2 className="text-mcInventoryText text-lg font-bold">
                Resources
            </h2>
            <div className="max-h-96 overflow-y-auto pb-4">
                <div className="flex flex-row flex-wrap pt-1">
                    {Object.keys(resources).map((resourceKey) => {
                        const resource = resourceKey as Resource;
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

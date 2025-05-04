import { Resource } from "@/stores/resources";
import ResourceComponent from "./ResourceComponent";
import { useGameStore } from "@/stores/game";

export default function ResourcesComponent() {
    const resources = useGameStore((state) => state.resources);
    return (
        <div className="flex flex-col">
            <h2 className="text-mcInventoryText text-lg font-bold">
                Resources
            </h2>
            <div className="flex flex-row flex-wrap pt-1">
                {Object.keys(resources).map((resourceKey) => {
                    return (
                        <ResourceComponent
                            resource={resourceKey as Resource}
                            count={resources[resourceKey as Resource]}
                        />
                    );
                })}
            </div>
        </div>
    );
}

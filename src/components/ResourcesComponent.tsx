import { Resource } from "@/stores/resources";

export default function ResourcesComponent({
    resources,
}: {
    resources: Record<Resource, number>;
}) {
    return (
        <div className="flex flex-col items-center w-20">
            {Object.keys(resources).map((resourceKey) => {
                return (
                    <div key={resourceKey}>
                        {resourceKey} : {resources[resourceKey as Resource]}
                    </div>
                );
            })}
        </div>
    );
}

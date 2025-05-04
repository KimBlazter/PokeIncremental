import { Resource } from "@/stores/resources";

export default function ResourceComponent({
    resource,
    count,
}: {
    resource: Resource;
    count: number;
}) {
    return (
        <div className="item-slot flex items-end justify-end p-0.5 text-end text-xs">
            {resource} {count}
        </div>
    );
}

import { Item } from "@/stores/items";

export default function ItemTooltipContent({ item }: { item: Item }) {
    return (
        <div className="mc-text-shadow letter-sp flex flex-col text-base tracking-normal">
            <div className="flex flex-col">
                <span className="mb-0.5 text-base text-amber-400">
                    {item.name}
                </span>
            </div>
        </div>
    );
}

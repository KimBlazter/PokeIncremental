import { Item } from "@/stores/items";
import clsx from "clsx";

export default function ItemDescription({
    item,
    className,
}: {
    item: Item;
    className?: string;
}) {
    return (
        <span
            className={clsx(
                "w-70 text-xs leading-3.5 tracking-normal text-wrap text-white/50",
                className
            )}
        >
            "{item.description}"
        </span>
    );
}

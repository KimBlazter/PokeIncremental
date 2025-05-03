import { Item } from "@/stores/items";

export default function ItemComponent({ item }: { item: Item }) {
    return (
        <div className="bg-mcSlotBackground hover:bg-mcSlotBackgroundHover border-l-mcSlotBorder border-t-bg-mcSlotBorder border-b-mcSlotHighlight border-r-mcSlotHighlight flex aspect-square size-12 flex-col items-center border-2 text-xs">
            {item.name}
        </div>
    );
}

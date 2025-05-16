import { Item } from "@/stores/items";
import { getTextureFromIdentifier } from "@/utils/item-models";
import clsx from "clsx";

export default function ItemComponent({ item }: { item: Item }) {
    return (
        <div className="item-slot relative flex items-center justify-center text-xs">
            <div
                aria-hidden
                className={clsx(
                    "icon-minecraft",
                    getTextureFromIdentifier(
                        item.textureIdentifier ?? "barrier"
                    )
                )}
            />
        </div>
    );
}

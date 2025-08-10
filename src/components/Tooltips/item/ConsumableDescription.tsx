import ItemIcon from "@/components/ItemIcon";
import { ConsumableItem } from "@/stores/items";
import { clsx } from "clsx";

export default function ConsumableDescription({
    item,
    className,
}: {
    item: ConsumableItem;
    className?: string;
}) {
    return (
        <div className={clsx("flex flex-col", className)}>
            <div className="flex flex-row items-center">
                <div className="mr-1.5 rounded-sm border border-purple-400 bg-purple-400/10">
                    <ItemIcon
                        texture={item.effect.icon}
                        className="[&_img]:image-auto size-6"
                        enchanted={true}
                    />
                </div>

                <h3 className="text-sm text-purple-400">
                    {item.effect.name}{" "}
                    <span className="text-xs tracking-tight text-white/50">
                        (effect)
                    </span>
                </h3>
            </div>

            <span className="w-70 text-xs leading-3.5 tracking-normal text-wrap text-white/80">
                {item.effect.description}
            </span>
        </div>
    );
}

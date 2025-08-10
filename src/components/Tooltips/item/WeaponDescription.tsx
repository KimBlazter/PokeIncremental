import type { WeaponItem } from "@/stores/items";
import clsx from "clsx";

export default function WeaponDescription({
    item,
    className,
}: {
    item: WeaponItem;
    className?: string;
}) {
    return (
        <div className={clsx("flex flex-col", className)}>
            <span className="text-xs text-white/70">
                Damage: <span className="text-green-400">+{item.damage}</span>
            </span>
            <span className="text-xs text-white/70">
                Attack speed:{" "}
                <span className="text-green-400">{item.attackSpeed}</span>
            </span>
        </div>
    );
}

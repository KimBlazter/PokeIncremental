import { GAME_ITEMS, GameItemKey } from "@/data/items";
import { Craft } from "@/stores/crafts";
import { useGameStore } from "@/stores/game";
import clsx from "clsx";
import ItemIcon from "../ItemIcon";

export default function CraftTooltipContent({ craft }: { craft: Craft }) {
    const resources = useGameStore((state) => state.resources);
    const hasItem = useGameStore((state) => state.hasItem);

    return (
        <div>
            <div className="flex flex-col">
                <span className="mb-0.5 text-base text-amber-400">
                    {craft.result.item.name}
                </span>

                <span className="flex flex-row">
                    cost:{" "}
                    <div className="ml-1 flex flex-row items-center gap-1">
                        {/* Resources */}
                        {craft.cost.resources?.map(({ material, amount }) => (
                            <span
                                key={`${amount}${material}`}
                                className={clsx(
                                    "flex flex-row items-center",
                                    resources[material].amount >= amount ?
                                        "text-green-400"
                                    :   "text-red-400"
                                )}
                            >
                                {amount}
                                {/* Texture icon */}
                                <ItemIcon
                                    className="[&_img]:!image-auto ml-0.5 size-7"
                                    texture={
                                        resources[material].texture ?? "barrier"
                                    }
                                />
                            </span>
                        ))}
                        {/* Item */}
                        {craft.cost.items?.map((item) => (
                            <span
                                key={item.key}
                                className={clsx(
                                    "flex flex-row items-center",
                                    (
                                        hasItem(
                                            GAME_ITEMS[item.key as GameItemKey]
                                                .id,
                                            item.amount
                                        )
                                    ) ?
                                        "text-green-400"
                                    :   "text-red-400"
                                )}
                            >
                                {item.amount ?? 1}
                                <ItemIcon
                                    className="[&_img]:!image-auto ml-0.5 size-7"
                                    texture={
                                        GAME_ITEMS[item.key as GameItemKey]
                                            .texture
                                    }
                                />
                            </span>
                        ))}
                    </div>
                </span>

                {/* Result */}
                <span className={"flex flex-row justify-start gap-1"}>
                    result: {craft.result.qty}
                    <ItemIcon
                        texture={craft.result.item.texture}
                        className="[&_img]:!image-auto size-7"
                    />
                </span>

                <p className="mt-2 text-white/50">
                    Craft a{" "}
                    <span className="text-amber-400 lowercase">
                        {craft.result.item.name}
                    </span>
                </p>
            </div>
        </div>
    );
}

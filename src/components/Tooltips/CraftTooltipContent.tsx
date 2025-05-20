import { GAME_ITEMS, GameItemKey } from "@/data/items";
import { Craft } from "@/stores/crafts";
import { useGameStore } from "@/stores/game";
import { getTextureFromIdentifier } from "@/utils/item-models";
import clsx from "clsx";

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
                                <div
                                    aria-hidden
                                    className={clsx(
                                        "icon-minecraft-sm ml-0.5",
                                        getTextureFromIdentifier(
                                            resources[material]
                                                .texture_identifier ?? "barrier"
                                        )
                                    )}
                                />
                            </span>
                        ))}
                        {/* Item */}
                        {craft.cost.items?.map((id) => (
                            <span
                                key={id}
                                className={clsx(
                                    "flex flex-row items-center",
                                    hasItem(GAME_ITEMS[id as GameItemKey].id) ?
                                        "text-green-400"
                                    :   "text-red-400"
                                )}
                            >
                                1
                                <div
                                    aria-hidden
                                    className={clsx(
                                        "icon-minecraft-sm ml-0.5",
                                        getTextureFromIdentifier(
                                            GAME_ITEMS[id as GameItemKey]
                                                .textureIdentifier ?? "barrier"
                                        )
                                    )}
                                />
                            </span>
                        ))}
                    </div>
                </span>

                <span className={"flex flex-row justify-start gap-1"}>
                    result: {craft.result.qty}
                    <div
                        aria-hidden
                        className={clsx(
                            "icon-minecraft-sm",
                            getTextureFromIdentifier(
                                craft.result.item.textureIdentifier ?? "barrier"
                            )
                        )}
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

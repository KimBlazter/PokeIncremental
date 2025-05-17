import { Craft } from "@/stores/crafts";
import { useGameStore } from "@/stores/game";
import { Resource } from "@/stores/resources";
import { getTextureFromIdentifier } from "@/utils/item-models";
import clsx from "clsx";

export default function CraftTooltipContent({ craft }: { craft: Craft }) {
    const resources = useGameStore((state) => state.resources);
    return (
        <div>
            <div className="flex flex-col">
                <span className="mb-0.5 text-base text-amber-400">
                    {craft.result.item.name}
                </span>
                <span className="flex flex-row justify-start gap-1">
                    cost:{" "}
                    <span
                        className={clsx(
                            (
                                resources[craft.cost.resource].amount >=
                                    craft.cost.amount
                            ) ?
                                "text-green-400"
                            :   "text-red-400"
                        )}
                    >
                        {craft.cost.amount}
                    </span>
                    <div
                        aria-hidden
                        className={clsx(
                            "icon-minecraft-sm",
                            getTextureFromIdentifier(
                                resources[craft.cost.resource as Resource]
                                    .texture_identifier ?? "barrier"
                            )
                        )}
                    />
                </span>
                <span className="flex flex-row justify-start gap-1">
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

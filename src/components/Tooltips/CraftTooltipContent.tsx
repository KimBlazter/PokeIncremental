import { Craft } from "@/stores/crafts";
import { useGameStore } from "@/stores/game";
import { getTextureFromIdentifier } from "@/utils/item-models";
import clsx from "clsx";

export default function CraftTooltipContent({ craft }: { craft: Craft }) {
    const resources = useGameStore((state) => state.resources);
    const items = useGameStore((state) => state.items);

    console.log("Craft Tooltip re-render");

    return (
        <div>
            <div className="flex flex-col">
                <span className="mb-0.5 text-base text-amber-400">
                    {craft.result.item.name}
                </span>
                {/* Resources requirement */}
                <span className="flex flex-row justify-start gap-1">
                    cost:{" "}
                    {craft.cost.resources?.map(({ material, amount }) => (
                        <div key={`${material}${amount}`}>
                            <span
                                className={clsx(
                                    resources[material].amount >= amount ?
                                        "text-green-400"
                                    :   "text-red-400"
                                )}
                            >
                                {amount}
                            </span>
                            <div
                                aria-hidden
                                className={clsx(
                                    "icon-minecraft-sm",
                                    getTextureFromIdentifier(
                                        resources[material]
                                            .texture_identifier ?? "barrier"
                                    )
                                )}
                            />
                        </div>
                    ))}
                    {/* Item requirement */}
                    {/* {craft.cost.items?.map((id: string) => {
                        console.log(id);
                        const itemData = items.find((item) => item.id === id);
                        // console.log(itemData);
                        return (
                            <div key={`${id}`}>
                                <div
                                    aria-hidden
                                    className={clsx(
                                        "icon-minecraft-sm",
                                        getTextureFromIdentifier(
                                            itemData?.textureIdentifier ??
                                                "barrier"
                                        )
                                    )}
                                />
                            </div>
                        );
                    })} */}
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

import { getTextureFromIdentifier } from "@/utils/item-models";
import clsx from "clsx";

export default function ItemIcon({
    textureIdentifier,
}: {
    textureIdentifier?: string;
}) {
    return (
        <div
            aria-hidden
            className={clsx(
                "icon-minecraft aspect-square",
                getTextureFromIdentifier(textureIdentifier ?? "barrier")
            )}
        />
    );
}

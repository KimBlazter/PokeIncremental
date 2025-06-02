import { getTextureFromIdentifier } from "@/utils/item-models";
import clsx from "clsx";

export default function ItemIcon({
    textureIdentifier,
    className,
    style,
}: {
    textureIdentifier?: string;
    className?: string;
    style?: React.CSSProperties;
}) {
    return (
        <div
            aria-hidden
            className={clsx(
                "icon-minecraft aspect-square",
                getTextureFromIdentifier(textureIdentifier ?? "barrier"),
                className
            )}
            style={style}
        />
    );
}

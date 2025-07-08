import { useState, useEffect } from "react";
import { getTextureFromIdentifier } from "@/utils/item-models";
import getTexture, { Texture } from "@/utils/spriteLoader";
import clsx from "clsx";

export default function ItemIcon({
    texture,
    className,
    style,
}: {
    texture?: Texture;
    className?: string;
    style?: React.CSSProperties;
}) {
    const [textureDataURL, setTextureDataURL] = useState<string | null>(null);

    useEffect(() => {
        if (texture) {
            getTexture(texture)
                .then(setTextureDataURL)
                .catch((error) => {
                    console.error(
                        `Failed to load texture for ${texture}:`,
                        error
                    );
                });
        }
    }, [texture]);

    if (textureDataURL) {
        return (
            <img
                src={textureDataURL}
                alt=""
                className={clsx("aspect-square p-1", className)}
                style={style}
            />
        );
    }

    return (
        <div
            aria-hidden
            className={clsx(
                "icon-minecraft aspect-square",
                getTextureFromIdentifier("barrier"),
                className
            )}
            style={style}
        />
    );
}

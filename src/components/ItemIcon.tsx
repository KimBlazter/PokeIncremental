import { useState, useEffect } from "react";
import { getTextureFromIdentifier } from "@/utils/item-models";
import getTexture, { Texture } from "@/utils/spriteLoader";
import clsx from "clsx";

export default function ItemIcon({
    texture,
    className,
    style,
    enchanted,
}: {
    texture?: Texture;
    className?: string;
    style?: React.CSSProperties;
    enchanted?: boolean;
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
            <div
                className={clsx("relative p-1 select-none", className)}
                style={style}
            >
                <img
                    src={textureDataURL}
                    alt=""
                    className="aspect-square h-full w-full"
                    draggable={false}
                />
                {enchanted && (
                    <div
                        className="enchanted"
                        style={{
                            mask: `url(${textureDataURL})`,
                            WebkitMask: `url(${textureDataURL})`,
                            maskSize: "calc(100% - 0.5rem)",
                            WebkitMaskSize: "calc(100% - 0.5rem)",
                            maskRepeat: "no-repeat",
                            WebkitMaskRepeat: "no-repeat",
                            maskPosition: "center",
                            WebkitMaskPosition: "center",
                        }}
                    />
                )}
            </div>
        );
    }

    return (
        <div className={clsx("relative", className)} style={style}>
            <div
                aria-hidden
                className={clsx(
                    "icon-minecraft aspect-square",
                    getTextureFromIdentifier("barrier")
                )}
            />
            {enchanted && (
                <div
                    className={clsx(
                        "enchanted",
                        getTextureFromIdentifier("barrier")
                    )}
                    style={{
                        background:
                            "linear-gradient(120deg, rgba(128, 0, 128, 0) 0%, rgba(186, 85, 211, 0.4) 45%, rgba(128, 0, 128, 0) 80%)",
                        backgroundSize: "200% 100%",
                        animation: "glintAnimation 2s linear infinite",
                        mixBlendMode: "color-dodge" as const,
                        filter: "blur(2px)",
                    }}
                />
            )}
        </div>
    );
}

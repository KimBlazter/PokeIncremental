import { useState, useEffect } from "react";
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
                .then((data) => {
                    setTextureDataURL(data.texture);
                })
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
    } else {
        return <div>No image</div>;
    }
}

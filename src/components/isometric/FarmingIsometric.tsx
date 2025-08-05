import { BlockEvent } from "@/types/isometric";
import { IsometricView } from "./IsometricView";
import { useIsometricGrid } from "@/hooks/useIsometricGrid";

export default function FarmingIsometric() {
    const { grid, updateBlock } = useIsometricGrid({
        width: 20,
        height: 20,
        blocks: [
            {
                id: "0",
                texture: "block:dirt",
                x: 0,
                y: 0,
                z: 0,
            },
            {
                id: "1",
                texture: "block:dirt",
                x: 1,
                y: 0,
                z: 0,
            },
            {
                id: "2",
                texture: "block:dirt",
                x: 2,
                y: 0,
                z: 0,
            },
            {
                id: "3",
                texture: "block:farmland",
                x: 0,
                y: 1,
                z: 0,
                data: {
                    isWatered: false,
                },
            },
            {
                id: "4",
                texture: "block:farmland",
                x: 1,
                y: 1,
                z: 0,
                data: {
                    isWatered: false,
                },
            },
            {
                id: "5",
                texture: "block:farmland",
                x: 2,
                y: 1,
                z: 0,
                data: {
                    isWatered: false,
                },
            },
        ],
    });

    const handleBlockClick = (event: BlockEvent) => {
        console.log("Block clicked:", event.block);

        if (event.block) {
            console.log("Clicked block data:", event.block);
            if (event.block.data && "isWatered" in event.block.data) {
                updateBlock(event.block.id, {
                    texture: "block:farmland_moist",
                    data: {
                        isWatered: true,
                    },
                });
            }
        }
    };

    return (
        <IsometricView
            grid={grid}
            onBlockClick={handleBlockClick}
            showCoordinates={true}
            showGrid={false}
            highlightColor="#00FF00"
        />
    );
}

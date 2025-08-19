import { useState } from "react";
import IsometricRenderer from "./IsometricRenderer";
import { Grid } from "@/types/isometric";
import { createBlock } from "@/utils/isometric";
import { farmingBlockTypes } from "@/data/isometric/farmingBlocks";

export default function FarmingIsometric() {
    const [grid, setGrid] = useState<Grid>({
        width: 15,
        height: 15,
        blocks: [
            createBlock("farmland", 2, 2, 0, "farm1", farmingBlockTypes, {
                moist: true,
                moistureLevel: 7,
            }),
            createBlock("farmland", 3, 2, 0, "farm2", farmingBlockTypes),
            createBlock("farmland", 4, 2, 0, "farm3", farmingBlockTypes, {
                moist: true,
                moistureLevel: 5,
            }),
            createBlock("carrot", 2, 2, 1, "carrot1", farmingBlockTypes, {
                growth: 1,
            }),
            createBlock("wheat", 4, 2, 1, "wheat1", farmingBlockTypes, {
                growth: 2,
            }),
            createBlock("haybale", 5, 2, 0, "haybale1", farmingBlockTypes),
        ],
    });
    return (
        <IsometricRenderer
            grid={grid}
            onGridChange={setGrid}
            blockTypes={farmingBlockTypes}
            tickInterval={2000}
        />
    );
}

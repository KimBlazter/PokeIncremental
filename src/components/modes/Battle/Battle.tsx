import { useGameStore } from "@/stores/game";
import AgeSelector from "@/components/ages/AgeSelector";
import ZoneSelector from "./ZoneSelector";
import ProgressBar from "@/components/ui/ProgressBar";
import MobDisplay from "@/components/MobDisplay";
import {
    FloatingNumbers,
    useFloatingNumbers,
} from "@/components/ui/FloatingNumbers";
import { useState } from "react";
import clsx from "clsx";
import ArmorsHotbar from "@/components/equipments/ArmorsHotbar";
import ToolsHotbar from "@/components/equipments/ToolsHotbar";

export default function Battle() {
    const combat = useGameStore((state) => state.combat);
    const attackOpponent = useGameStore((state) => state.attackOpponent);

    const [opponentKilled, setOpponentKilled] = useState(false);
    const [isAttacking, setIsAttacking] = useState(false);
    const [opponentDamaged, setOpponentDamaged] = useState(false);

    // Player floating numbers
    const {
        numbers: playerNumbers,
        spawnNumber: spawnPlayerNumber,
        removeNumber: removePlayerNumber,
    } = useFloatingNumbers();

    // Opponent floating numbers
    const {
        numbers: opponentNumbers,
        spawnNumber: spawnOpponentNumber,
        removeNumber: removeOpponentNumber,
    } = useFloatingNumbers();

    const handleAttackOpponent = () => {
        if (opponentKilled) return; // Prevent attacking if opponent is already killed

        setIsAttacking(true);
        setTimeout(() => setIsAttacking(false), 75); // Short click animation

        const { damageDealt, killed } = attackOpponent();

        // Trigger damage effect on opponent
        setOpponentDamaged(true);
        setTimeout(() => setOpponentDamaged(false), 100); // Short red flash duration

        if (killed) {
            setOpponentKilled(true);

            setTimeout(() => {
                useGameStore.getState().startCombat();
                setOpponentKilled(false);
            }, 500); // un peu plus long
        }

        spawnOpponentNumber(
            damageDealt.toString(),
            Math.random() * 100,
            Math.random() * 100,
            {
                color: killed ? "black" : "white",
                size: killed ? 2 : 1.25,
                borderColor: killed ? "white" : "rgba(0, 0, 0, 0.8)",
                borderWidth: 2,
            }
        );
    };

    return (
        <div className="flex h-full w-full flex-col">
            <AgeSelector />
            <ZoneSelector />
            <div className="relative flex h-full w-full items-center bg-gray-800">
                <ArmorsHotbar className="absolute left-0 z-10" />
                <ToolsHotbar className="absolute right-0 z-10" />

                <div className="flex h-5/9 w-full flex-row items-end justify-around">
                    {/* Player */}
                    <div className="flex flex-col items-center">
                        <FloatingNumbers
                            numbers={playerNumbers}
                            onNumberComplete={removePlayerNumber}
                        />
                        <h2 className="mb-1 text-base leading-4.5 font-bold select-none">
                            Player
                        </h2>
                        <div>
                            <ProgressBar
                                className="mb-2"
                                value={combat.playerHp}
                                maxValue={combat.maxPlayerHp}
                            />
                            <MobDisplay
                                className="size-25 -scale-x-100"
                                texture={"mob:steve"}
                            />
                        </div>
                    </div>
                    {/* Opponent */}
                    <div>
                        {combat.currentOpponent ?
                            <div className="relative flex flex-col-reverse items-center">
                                <FloatingNumbers
                                    numbers={opponentNumbers}
                                    onNumberComplete={removeOpponentNumber}
                                />
                                <div className="flex flex-col">
                                    <h2 className="mb-1 max-w-25 text-center text-base leading-4.5 font-bold select-none">
                                        {combat.currentOpponent.base.name}{" "}
                                        <span className="text-red-400">
                                            [Lv.
                                            {combat.currentOpponent.level}]
                                        </span>
                                    </h2>
                                    <ProgressBar
                                        className="mb-2"
                                        value={combat.opponentHp}
                                        maxValue={combat.currentOpponent.hp}
                                    />
                                    <div
                                        className="flex items-end justify-center"
                                        style={{
                                            height: `${Math.max(100 * (combat.currentOpponent.base.displaySize || 1), 100)}px`,
                                        }}
                                        onClick={handleAttackOpponent}
                                    >
                                        <MobDisplay
                                            className={clsx(
                                                "size-25 h-auto transition-all duration-500 ease-out",
                                                opponentKilled ?
                                                    "scale-40 rotate-50 opacity-0"
                                                :   "scale-100 rotate-0 opacity-100",
                                                isAttacking && "translate-x-2"
                                            )}
                                            texture={
                                                combat.currentOpponent.base
                                                    .texture
                                            }
                                            size={
                                                combat.currentOpponent.base
                                                    .displaySize || 1
                                            }
                                            isDamaged={opponentDamaged}
                                            style={{
                                                transformOrigin: "50% 100%",
                                            }}
                                        />
                                    </div>
                                </div>
                            </div>
                        :   <p>Select a zone to start battling!</p>}
                    </div>
                </div>
            </div>
        </div>
    );
}

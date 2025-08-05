import { useEffect, useState, useRef } from "react";
import { useGameStore } from "@/stores/game";

export function useGameLoop() {
    const [totalTicks, setTotalTicks] = useState(0); // Compteur total des ticks
    // can add 'seconds', removed because this file is shitty oh oh no no no
    const [, setSeconds] = useState(0); // Compteur de secondes
    const lastTickTime = useRef(Date.now()); // Dernière fois que la boucle a été exécutée

    useEffect(() => {
        const interval = setInterval(() => {
            const now = Date.now();
            const elapsedTime = now - lastTickTime.current; // Temps écoulé depuis le dernier tick

            setTotalTicks((prevTicks) => prevTicks + 1); // Incrémenter le compteur des ticks

            // Call combat tick every 100ms for smooth combat
            const tickCombat = useGameStore.getState().tickCombat;
            tickCombat();

            // Si 1 seconde s'est écoulée, on effectue l'action
            if (elapsedTime >= 1000) {
                setSeconds((prevSeconds) => prevSeconds + 1); // Incrémenter le compteur des secondes
                lastTickTime.current = now; // Réinitialiser le dernier temps de tick pour la prochaine seconde
            }
        }, 100); // La boucle tourne toutes les 100ms (10 fois par seconde)

        return () => clearInterval(interval); // Nettoyage au démontage du composant
    }, []); // Le useEffect ne se déclenche qu'une seule fois lors du montage du composant

    return { totalTicks };
}

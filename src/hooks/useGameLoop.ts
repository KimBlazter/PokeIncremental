import { useEffect, useState, useRef } from "react";

export function useGameLoop() {
    const [totalTicks, setTotalTicks] = useState(0); // Compteur total des ticks
    const [seconds, setSeconds] = useState(0); // Compteur de secondes
    const lastTickTime = useRef(Date.now()); // Dernière fois que la boucle a été exécutée

    useEffect(() => {
        const interval = setInterval(() => {
            const now = Date.now();
            const elapsedTime = now - lastTickTime.current; // Temps écoulé depuis le dernier tick

            setTotalTicks((prevTicks) => prevTicks + 1); // Incrémenter le compteur des ticks
            lastTickTime.current = now; // Mettre à jour le dernier temps de tick

            // Si 1 seconde s'est écoulée, on effectue l'action
            if (elapsedTime >= 1000) {
                setSeconds((prevSeconds) => prevSeconds + 1); // Incrémenter le compteur des secondes
                lastTickTime.current = now; // Réinitialiser le dernier temps de tick pour la prochaine seconde
            }
        }, 1000); // La boucle tourne toutes les 100ms (10 fois par seconde)

        return () => clearInterval(interval); // Nettoyage au démontage du composant
    }, []); // Le useEffect ne se déclenche qu'une seule fois lors du montage du composant

    return { totalTicks, seconds };
}

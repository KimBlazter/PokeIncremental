// Create pixel-perfect border for pixelated fonts
export function createPixelBorder(borderWidth: number, borderColor: string) {
    const shadows = [];
    for (let x = -borderWidth; x <= borderWidth; x++) {
        for (let y = -borderWidth; y <= borderWidth; y++) {
            if (x !== 0 || y !== 0) {
                shadows.push(`${x}px ${y}px 0 ${borderColor}`);
            }
        }
    }
    return shadows.join(", ");
}

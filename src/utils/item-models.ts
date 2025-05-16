export const getTextureFromIdentifier = (identifier: string): string =>
    `icon-minecraft-${identifier.replace("_", "-")}`;

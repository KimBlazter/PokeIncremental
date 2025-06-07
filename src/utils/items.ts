import { ToolItem } from "@/stores/items";
import { ResourceData } from "@/stores/resources";

export function isEffectiveTool(
    tool: ToolItem,
    resource: ResourceData
): boolean {
    return tool.toolType === resource.effective_tool;
}

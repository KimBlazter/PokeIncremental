import clsx from "clsx";
import { ReactNode, useState } from "react";
import ItemIcon from "../ItemIcon";
import { Texture } from "@/utils/spriteLoader";

namespace TabSwitcher {
    export type Tab = {
        title: string;
        icon?: Texture;
        backgroundImage?: string;
        content: ReactNode;
    };

    export interface Props {
        tabs: Tab[];
        defautTab?: number;
        className?: string;
    }
}

export default function TabSwitcher(props: TabSwitcher.Props) {
    const [currentTab, setCurrentTab] = useState<number>(props.defautTab ?? 0);
    return (
        <div className={clsx("flex w-full flex-col", props.className)}>
            {/* Tabs */}
            <div className="flex h-12 flex-row items-center">
                {props.tabs.map((tab, index) => (
                    <div key={index} className="relative w-full">
                        <div
                            onClick={() => setCurrentTab(index)}
                            className={clsx(
                                "inventory-border flex w-full flex-row items-center gap-1 border-b-0",
                                currentTab === index ? "z-5" : "brightness-85"
                            )}
                        >
                            <ItemIcon texture={tab.icon} className="h-10" />
                            <span className="h-auto text-black">
                                {tab.title}
                            </span>
                        </div>
                        <div
                            className={clsx(
                                "inventory-border absolute -bottom-2 z-4 h-2 w-full border-y-0",
                                currentTab === index && "z-6"
                            )}
                        ></div>
                        <div className="absolute -bottom-4 z-7 h-2 w-full px-2">
                            <div className="bg-mcInventoryBackground h-full w-full"></div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Tab content */}
            <div className="inventory-border z-5 h-full w-full">
                <div className="bg-mcInventoryBackground h-full w-full">
                    {props.tabs[currentTab].content}
                </div>
            </div>
        </div>
    );
}

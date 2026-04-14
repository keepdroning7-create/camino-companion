import { Map, BookOpen, Home, Compass, Backpack, Info } from "lucide-react";
import { cn } from "../lib/utils";

export type Tab = "home" | "map" | "stage" | "journal" | "pack" | "info";

interface BottomNavProps {
  activeTab: Tab;
  onChange: (tab: Tab) => void;
}

export function BottomNav({ activeTab, onChange }: BottomNavProps) {
  const navItems: { id: Tab; label: string; icon: React.ElementType }[] = [
    { id: "home", label: "Home", icon: Home },
    { id: "map", label: "Map", icon: Map },
    { id: "stage", label: "Stage", icon: Compass },
    { id: "journal", label: "Journal", icon: BookOpen },
    { id: "pack", label: "Packing", icon: Backpack },
    { id: "info", label: "Guide", icon: Info },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 pb-[env(safe-area-inset-bottom)] z-[500]">
      <div className="flex justify-around items-center h-16 max-w-md mx-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onChange(item.id)}
              className={cn(
                "flex flex-col items-center justify-center flex-1 h-full space-y-0.5 transition-colors",
                isActive ? "text-camino-blue" : "text-gray-400 hover:text-gray-600"
              )}
            >
              <Icon className={cn("w-5 h-5", isActive && "fill-camino-blue/10")} />
              <span className="text-[9px] font-medium">{item.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

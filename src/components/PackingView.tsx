import { useState, useEffect } from "react";
import { CheckSquare, Square, Weight } from "lucide-react";
import { cn } from "../lib/utils";

interface PackingItem {
  id: string;
  name: string;
  weightKg: number;
  essential: boolean;
  notes?: string;
}

interface PackingCategory {
  id: string;
  name: string;
  emoji: string;
  items: PackingItem[];
}

const PACKING_CATEGORIES: PackingCategory[] = [
  {
    id: "footwear",
    name: "Footwear",
    emoji: "👟",
    items: [
      { id: "boots", name: "Hiking boots (broken in!)", weightKg: 0.9, essential: true, notes: "CRITICAL: Never wear new boots. Break in for 6+ weeks before Camino." },
      { id: "sandals", name: "Sandals / flip-flops for albergue", weightKg: 0.2, essential: true, notes: "Your feet need to breathe after walking. Essential for albergue showers." },
      { id: "socks", name: "Hiking socks x3 pairs (wool)", weightKg: 0.2, essential: true, notes: "Merino wool preferred. Prevents blisters better than cotton." },
      { id: "gaiters", name: "Gaiters (optional, Galicia/mountains)", weightKg: 0.15, essential: false, notes: "Useful for wet Galician paths and mountain sections." },
    ]
  },
  {
    id: "clothing",
    name: "Clothing",
    emoji: "👕",
    items: [
      { id: "tshirt", name: "T-shirts x2 (merino wool)", weightKg: 0.3, essential: true, notes: "Merino wool: odor-resistant, quick-dry, temperature-regulating." },
      { id: "longsleeve", name: "Long-sleeve shirt x1", weightKg: 0.2, essential: true },
      { id: "pants", name: "Hiking pants/shorts x1", weightKg: 0.3, essential: true, notes: "Quick-dry fabric. Zip-off legs are versatile." },
      { id: "underwear", name: "Underwear x2 (merino/synthetic)", weightKg: 0.1, essential: true },
      { id: "rain", name: "Rain jacket (waterproof)", weightKg: 0.4, essential: true, notes: "Non-negotiable. Galicia averages 150+ rain days/year." },
      { id: "fleece", name: "Fleece / light insulation layer", weightKg: 0.3, essential: true, notes: "Nights in mountain albergues can be cold." },
      { id: "hat", name: "Sun hat / cap", weightKg: 0.1, essential: true, notes: "The Meseta sun in summer is brutal. UV protection essential." },
      { id: "buff", name: "Buff / neck gaiter", weightKg: 0.05, essential: false },
      { id: "gloves", name: "Light gloves (mountains)", weightKg: 0.08, essential: false, notes: "For early morning in Pyrenees and O Cebreiro sections." },
    ]
  },
  {
    id: "gear",
    name: "Gear & Equipment",
    emoji: "🎒",
    items: [
      { id: "pack", name: "Backpack 35-45L", weightKg: 1.2, essential: true, notes: "Pack weight rule: loaded pack should be max 10% of body weight." },
      { id: "liner", name: "Sleeping bag liner", weightKg: 0.3, essential: true, notes: "Required in all albergues. Saves you in cold conditions too." },
      { id: "poles", name: "Trekking poles", weightKg: 0.5, essential: false, notes: "Highly recommended. Reduces knee strain by up to 25% on descents." },
      { id: "headlamp", name: "Headlamp + spare batteries", weightKg: 0.1, essential: true, notes: "Essential for 5:30am pre-dawn starts in albergues." },
      { id: "water", name: "Water bottle / bladder 1.5L", weightKg: 0.2, essential: true, notes: "Minimum 1.5L capacity. More for Meseta stages (carry 2L)." },
      { id: "earplugs", name: "Earplugs x5 pairs", weightKg: 0.01, essential: true, notes: "40 pilgrims snoring in one room. You'll thank us." },
      { id: "eyemask", name: "Eye mask for sleeping", weightKg: 0.02, essential: false },
      { id: "towel", name: "Microfiber towel (small)", weightKg: 0.15, essential: true, notes: "Most albergues don't provide towels." },
      { id: "stone", name: "Stone from home for Cruz de Ferro", weightKg: 0.1, essential: true, notes: "SYMBOLIC: Bring a small stone from your hometown to lay at the Cruz de Ferro (Day 23 on Francés)." },
    ]
  },
  {
    id: "tech",
    name: "Tech & Navigation",
    emoji: "📱",
    items: [
      { id: "phone", name: "Phone + charger", weightKg: 0.3, essential: true },
      { id: "battery", name: "Portable battery (10,000mAh)", weightKg: 0.22, essential: true, notes: "Day-long walking = lots of GPS/maps use." },
      { id: "camera", name: "Camera (optional)", weightKg: 0.3, essential: false, notes: "Phone cameras are usually sufficient." },
      { id: "adapter", name: "EU power adapter (if needed)", weightKg: 0.05, essential: false },
    ]
  },
  {
    id: "documents",
    name: "Documents & Money",
    emoji: "📄",
    items: [
      { id: "credential", name: "Pilgrim Credential (Credencial)", weightKg: 0.02, essential: true, notes: "Get it at your pilgrim association or at St. Jean Pied de Port. Required for Compostela." },
      { id: "passport", name: "Passport / National ID", weightKg: 0.02, essential: true },
      { id: "insurance", name: "Travel/health insurance card", weightKg: 0.01, essential: true, notes: "European Health Insurance Card (EHIC) for EU citizens covers Spain." },
      { id: "cash", name: "Euros cash (€200+ for first week)", weightKg: 0.05, essential: true, notes: "Many albergues and small village bars are CASH ONLY. Keep €50 separate as emergency." },
      { id: "emergency", name: "Emergency contact card (laminated)", weightKg: 0.01, essential: true, notes: "Name, blood type, allergies, emergency contacts. Keep in wallet AND backpack." },
    ]
  },
  {
    id: "firstaid",
    name: "First Aid & Pharmacy",
    emoji: "💊",
    items: [
      { id: "compeed", name: "Blister kit (Compeed, needle, alcohol)", weightKg: 0.08, essential: true, notes: "THE most used item on the Camino. Get a full kit before you leave." },
      { id: "ibuprofen", name: "Ibuprofen / anti-inflammatory", weightKg: 0.05, essential: true, notes: "For joint pain. Don't use to push through injury — that makes it worse." },
      { id: "paracetamol", name: "Paracetamol", weightKg: 0.03, essential: true },
      { id: "antihistamine", name: "Antihistamine", weightKg: 0.03, essential: false },
      { id: "sunscreen", name: "Sunscreen SPF50+", weightKg: 0.1, essential: true, notes: "Reapply every 2 hours on Meseta. Burned shoulders are miserable." },
      { id: "insect", name: "Insect repellent", weightKg: 0.08, essential: false, notes: "Useful in Galicia during summer evenings." },
      { id: "electrolytes", name: "Electrolyte tablets / powder", weightKg: 0.05, essential: true, notes: "Sweating all day depletes salts. Cramping at night = low electrolytes." },
      { id: "bandage", name: "Adhesive bandages / medical tape", weightKg: 0.04, essential: true },
      { id: "vaseline", name: "Vaseline / anti-chafe balm", weightKg: 0.06, essential: true, notes: "Apply to feet, inner thighs, underarms before each day's walk." },
      { id: "prescription", name: "Prescription medications (30+ day supply)", weightKg: 0.1, essential: true, notes: "Carry prescription letter in English and Spanish." },
    ]
  },
  {
    id: "toiletries",
    name: "Toiletries",
    emoji: "🧴",
    items: [
      { id: "soap", name: "Travel shampoo/soap (biodegradable)", weightKg: 0.1, essential: true },
      { id: "toothbrush", name: "Toothbrush + toothpaste", weightKg: 0.08, essential: true },
      { id: "lipbalm", name: "Lip balm with SPF", weightKg: 0.02, essential: true, notes: "Wind and sun will destroy unprotected lips." },
      { id: "toilet", name: "Small toilet paper roll + bag", weightKg: 0.05, essential: true, notes: "For emergencies on trail. Many village bars have no paper." },
      { id: "nailclip", name: "Nail clippers", weightKg: 0.03, essential: true, notes: "Long toenails + downhill = black toenails. Clip before you start." },
    ]
  }
];

export function PackingView() {
  const [checked, setChecked] = useState<Record<string, boolean>>({});
  const [expandedCategory, setExpandedCategory] = useState<string | null>("footwear");

  useEffect(() => {
    const saved = localStorage.getItem("camino_packing");
    if (saved) setChecked(JSON.parse(saved));
  }, []);

  const toggleItem = (id: string) => {
    const next = { ...checked, [id]: !checked[id] };
    setChecked(next);
    localStorage.setItem("camino_packing", JSON.stringify(next));
  };

  const allItems = PACKING_CATEGORIES.flatMap(c => c.items);
  const totalWeight = allItems.reduce((acc, item) => checked[item.id] ? acc + item.weightKg : acc, 0);
  const totalItems = allItems.length;
  const checkedItems = allItems.filter(i => checked[i.id]).length;
  const essentialItems = allItems.filter(i => i.essential);
  const essentialChecked = essentialItems.filter(i => checked[i.id]).length;

  return (
    <div className="pb-24 pt-8 px-6 max-w-md mx-auto min-h-screen">
      <header className="mb-6">
        <h1 className="font-serif text-3xl text-camino-blue mb-1">Packing List</h1>
        <p className="text-gray-500 font-medium text-sm">What every pilgrim needs</p>
      </header>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3 mb-6">
        <div className="bg-white rounded-xl p-3 text-center border border-gray-100 shadow-sm">
          <p className="font-serif text-2xl text-camino-blue">{checkedItems}</p>
          <p className="text-xs text-gray-400 font-medium mt-0.5">of {totalItems} packed</p>
        </div>
        <div className="bg-white rounded-xl p-3 text-center border border-gray-100 shadow-sm">
          <p className="font-serif text-2xl text-green-600">{essentialChecked}</p>
          <p className="text-xs text-gray-400 font-medium mt-0.5">of {essentialItems.length} essential</p>
        </div>
        <div className="bg-white rounded-xl p-3 text-center border border-gray-100 shadow-sm">
          <div className="flex items-center justify-center space-x-1">
            <Weight className="w-4 h-4 text-camino-earth" />
            <p className="font-serif text-xl text-camino-earth">{totalWeight.toFixed(1)}</p>
          </div>
          <p className="text-xs text-gray-400 font-medium mt-0.5">kg selected</p>
        </div>
      </div>

      {/* Weight warning */}
      {totalWeight > 10 && (
        <div className="bg-red-50 border border-red-100 rounded-xl p-3 mb-5 text-sm text-red-700">
          <strong>Pack is getting heavy.</strong> Aim for max 10% of your body weight. Consider mailing non-essentials home.
        </div>
      )}

      {/* Categories */}
      <div className="space-y-3">
        {PACKING_CATEGORIES.map(cat => {
          const catChecked = cat.items.filter(i => checked[i.id]).length;
          const isExpanded = expandedCategory === cat.id;

          return (
            <div key={cat.id} className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
              <button
                onClick={() => setExpandedCategory(isExpanded ? null : cat.id)}
                className="w-full flex items-center justify-between p-4 text-left"
              >
                <div className="flex items-center space-x-3">
                  <span className="text-xl">{cat.emoji}</span>
                  <div>
                    <p className="font-semibold text-camino-blue text-sm">{cat.name}</p>
                    <p className="text-xs text-gray-400">{catChecked}/{cat.items.length} packed</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-16 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-camino-gold rounded-full transition-all"
                      style={{ width: `${(catChecked / cat.items.length) * 100}%` }}
                    />
                  </div>
                  <span className="text-gray-400 text-xs">{isExpanded ? "▲" : "▼"}</span>
                </div>
              </button>

              {isExpanded && (
                <div className="border-t border-gray-50">
                  {cat.items.map(item => (
                    <button
                      key={item.id}
                      onClick={() => toggleItem(item.id)}
                      className={cn(
                        "w-full flex items-start space-x-3 p-4 text-left border-b border-gray-50 last:border-0 transition-colors",
                        checked[item.id] ? "bg-green-50/40" : "hover:bg-gray-50"
                      )}
                    >
                      <div className="mt-0.5 shrink-0">
                        {checked[item.id]
                          ? <CheckSquare className="w-5 h-5 text-green-500" />
                          : <Square className="w-5 h-5 text-gray-300" />
                        }
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <p className={cn("text-sm font-medium leading-tight", checked[item.id] ? "line-through text-gray-400" : "text-gray-700")}>
                            {item.name}
                          </p>
                          <div className="flex items-center space-x-2 ml-2 shrink-0">
                            {item.essential && !checked[item.id] && (
                              <span className="text-xs bg-red-100 text-red-600 font-bold px-1.5 py-0.5 rounded">Must</span>
                            )}
                            <span className="text-xs text-gray-400">{item.weightKg * 1000}g</span>
                          </div>
                        </div>
                        {item.notes && !checked[item.id] && (
                          <p className="text-xs text-gray-500 mt-1 leading-relaxed">{item.notes}</p>
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

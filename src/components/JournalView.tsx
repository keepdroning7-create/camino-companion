import { useState, useEffect } from "react";
import { format } from "date-fns";
import { PenLine, Save, Plus, Minus, Euro, Utensils, Bed, Bus, ShoppingBag, BookOpen } from "lucide-react";
import { cn } from "../lib/utils";

interface JournalEntry {
  date: string;
  content: string;
}

interface Expense {
  id: string;
  amount: number;
  category: "food" | "albergue" | "transport" | "other";
  note: string;
}

type ActiveTab = "journal" | "sellos" | "budget";

const CATEGORY_CONFIG = {
  food: { label: "Jedzenie", icon: Utensils, color: "bg-orange-100 text-orange-700" },
  albergue: { label: "Noclegi", icon: Bed, color: "bg-blue-100 text-blue-700" },
  transport: { label: "Transport", icon: Bus, color: "bg-purple-100 text-purple-700" },
  other: { label: "Inne", icon: ShoppingBag, color: "bg-gray-100 text-gray-600" },
};

export function JournalView() {
  const today = format(new Date(), "yyyy-MM-dd");

  // Journal
  const [entries, setEntries] = useState<JournalEntry[]>([]);
  const [currentEntry, setCurrentEntry] = useState("");

  // Sellos
  const [sellos, setSellos] = useState<Record<string, number>>({});

  // Budget
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [expenseAmount, setExpenseAmount] = useState("");
  const [expenseNote, setExpenseNote] = useState("");
  const [expenseCategory, setExpenseCategory] = useState<Expense["category"]>("food");

  const [activeTab, setActiveTab] = useState<ActiveTab>("journal");

  useEffect(() => {
    const savedJournal = localStorage.getItem("camino_journal");
    if (savedJournal) setEntries(JSON.parse(savedJournal));

    const savedSellos = localStorage.getItem("camino_sellos");
    if (savedSellos) setSellos(JSON.parse(savedSellos));

    const savedExpenses = localStorage.getItem("camino_expenses");
    if (savedExpenses) setExpenses(JSON.parse(savedExpenses));
  }, []);

  // --- Journal ---
  const handleSave = () => {
    if (!currentEntry.trim()) return;
    const newEntries = [...entries];
    const existingIndex = newEntries.findIndex(e => e.date === today);
    if (existingIndex >= 0) {
      newEntries[existingIndex].content = currentEntry;
    } else {
      newEntries.unshift({ date: today, content: currentEntry });
    }
    setEntries(newEntries);
    localStorage.setItem("camino_journal", JSON.stringify(newEntries));
    setCurrentEntry("");
  };

  // --- Sellos ---
  const todaySellos = sellos[today] || 0;

  const changeSellos = (delta: number) => {
    const next = { ...sellos, [today]: Math.max(0, todaySellos + delta) };
    setSellos(next);
    localStorage.setItem("camino_sellos", JSON.stringify(next));
  };

  const totalSellos = Object.values(sellos).reduce((a, b) => a + b, 0);

  // --- Budget ---
  const todayExpenses = expenses.filter(e => e.date === today);
  const todayTotal = todayExpenses.reduce((a, e) => a + e.amount, 0);
  const tripTotal = expenses.reduce((a, e) => a + e.amount, 0);

  const addExpense = () => {
    const amount = parseFloat(expenseAmount);
    if (!amount || amount <= 0) return;
    const newExpense: Expense & { date: string } = {
      id: Date.now().toString(),
      date: today,
      amount,
      category: expenseCategory,
      note: expenseNote,
    };
    const next = [newExpense, ...expenses] as any[];
    setExpenses(next);
    localStorage.setItem("camino_expenses", JSON.stringify(next));
    setExpenseAmount("");
    setExpenseNote("");
  };

  const removeExpense = (id: string) => {
    const next = expenses.filter((e: any) => e.id !== id);
    setExpenses(next);
    localStorage.setItem("camino_expenses", JSON.stringify(next));
  };

  const tabs: { id: ActiveTab; label: string; icon: React.ElementType }[] = [
    { id: "journal", label: "Dziennik", icon: PenLine },
    { id: "sellos", label: "Sellos", icon: BookOpen },
    { id: "budget", label: "Budżet", icon: Euro },
  ];

  return (
    <div className="pb-24 pt-8 px-6 max-w-md mx-auto min-h-screen">
      <header className="mb-5">
        <h1 className="font-serif text-3xl text-camino-blue mb-1">Dziennik Pielgrzyma</h1>
        <p className="text-gray-500 font-medium text-sm">{format(new Date(), "d MMMM yyyy")}</p>
      </header>

      {/* Tab switcher */}
      <div className="flex space-x-2 mb-6">
        {tabs.map(t => (
          <button
            key={t.id}
            onClick={() => setActiveTab(t.id)}
            className={cn(
              "flex-1 flex items-center justify-center space-x-1.5 py-2.5 rounded-xl text-xs font-bold transition-all",
              activeTab === t.id
                ? "bg-camino-blue text-white"
                : "bg-white text-gray-500 border border-gray-200"
            )}
          >
            <t.icon className="w-3.5 h-3.5" />
            <span>{t.label}</span>
          </button>
        ))}
      </div>

      {/* JOURNAL TAB */}
      {activeTab === "journal" && (
        <div>
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-8">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2 text-camino-earth">
                <PenLine className="w-5 h-5" />
                <span className="font-medium text-sm">Dzisiaj</span>
              </div>
              <button
                onClick={handleSave}
                disabled={!currentEntry.trim()}
                className="flex items-center space-x-1 text-sm font-medium text-camino-blue disabled:opacity-50"
              >
                <Save className="w-4 h-4" />
                <span>Zapisz</span>
              </button>
            </div>
            <textarea
              value={currentEntry}
              onChange={(e) => setCurrentEntry(e.target.value)}
              placeholder="Co dzisiaj przeżyłeś na szlaku?"
              className="w-full h-40 resize-none outline-none text-gray-700 placeholder:text-gray-300 font-serif leading-relaxed"
            />
          </div>

          <div className="space-y-6">
            <h2 className="font-serif text-xl text-camino-blue mb-4">Poprzednie wpisy</h2>
            {entries.length === 0 ? (
              <p className="text-gray-400 text-center py-8 italic">Brak wpisów. Zacznij pisać dzisiaj.</p>
            ) : (
              entries.map((entry) => (
                <div key={entry.date} className="bg-white/50 rounded-xl p-5 border border-gray-100">
                  <p className="text-xs font-bold text-camino-earth uppercase tracking-wider mb-2">
                    {format(new Date(entry.date + "T12:00:00"), "d MMMM yyyy")}
                  </p>
                  <p className="text-gray-700 font-serif leading-relaxed whitespace-pre-wrap">{entry.content}</p>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* SELLOS TAB */}
      {activeTab === "sellos" && (
        <div>
          {/* Warning for last 100km */}
          <div className="bg-orange-50 border border-orange-100 rounded-2xl p-4 mb-5">
            <p className="text-xs font-bold text-orange-600 uppercase tracking-wider mb-1">Ważne — ostatnie 100 km</p>
            <p className="text-sm text-orange-700">Od Sarrii musisz mieć minimum <strong>2 sellos dziennie</strong>. Bez tego nie dostaniesz Composteli.</p>
          </div>

          {/* Today's stamp counter */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-6">
            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4 text-center">Dzisiaj zebrane pieczęcie</p>
            <div className="flex items-center justify-center space-x-6">
              <button
                onClick={() => changeSellos(-1)}
                disabled={todaySellos === 0}
                className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-gray-200 disabled:opacity-30 transition-colors"
              >
                <Minus className="w-6 h-6" />
              </button>
              <div className="text-center">
                <p className="font-serif text-6xl text-camino-blue font-bold leading-none">{todaySellos}</p>
                {todaySellos < 2 && (
                  <p className="text-xs text-orange-500 font-medium mt-2">Potrzebujesz min. 2 (ostatnie 100 km)</p>
                )}
                {todaySellos >= 2 && (
                  <p className="text-xs text-green-500 font-medium mt-2">Wymaganie spełnione ✓</p>
                )}
              </div>
              <button
                onClick={() => changeSellos(1)}
                className="w-12 h-12 rounded-full bg-camino-blue flex items-center justify-center text-white hover:bg-camino-blue/90 transition-colors"
              >
                <Plus className="w-6 h-6" />
              </button>
            </div>
          </div>

          {/* Total stamps */}
          <div className="bg-camino-sand rounded-2xl p-5 mb-6">
            <div className="flex items-center justify-between">
              <p className="text-sm font-semibold text-camino-blue">Łącznie przez całą drogę</p>
              <p className="font-serif text-2xl text-camino-earth font-bold">{totalSellos}</p>
            </div>
          </div>

          {/* History */}
          <h2 className="font-serif text-xl text-camino-blue mb-3">Historia sellos</h2>
          <div className="space-y-2">
            {Object.entries(sellos)
              .filter(([, count]) => count > 0)
              .sort(([a], [b]) => b.localeCompare(a))
              .map(([date, count]) => (
                <div key={date} className="bg-white rounded-xl p-4 flex items-center justify-between border border-gray-100">
                  <p className="text-sm text-gray-600">{format(new Date(date + "T12:00:00"), "d MMMM yyyy")}</p>
                  <div className="flex items-center space-x-2">
                    <div className="flex space-x-1">
                      {Array.from({ length: Math.min(count, 6) }).map((_, i) => (
                        <span key={i} className="w-5 h-5 rounded-full bg-camino-gold/80 flex items-center justify-center text-xs text-white font-bold">S</span>
                      ))}
                      {count > 6 && <span className="text-xs text-gray-400 font-medium">+{count - 6}</span>}
                    </div>
                    <span className="font-bold text-camino-blue">{count}</span>
                  </div>
                </div>
              ))}
            {Object.values(sellos).every(v => v === 0) && (
              <p className="text-gray-400 text-center py-8 italic">Brak zebranych pieczęci. Zacznij zbierać sellos!</p>
            )}
          </div>
        </div>
      )}

      {/* BUDGET TAB */}
      {activeTab === "budget" && (
        <div>
          {/* Totals */}
          <div className="grid grid-cols-2 gap-3 mb-5">
            <div className="bg-white rounded-2xl p-4 text-center border border-gray-100 shadow-sm">
              <p className="text-xs text-gray-400 font-medium mb-1">Dzisiaj</p>
              <p className="font-serif text-2xl text-camino-blue font-bold">€{todayTotal.toFixed(2)}</p>
            </div>
            <div className="bg-white rounded-2xl p-4 text-center border border-gray-100 shadow-sm">
              <p className="text-xs text-gray-400 font-medium mb-1">Całość</p>
              <p className="font-serif text-2xl text-camino-earth font-bold">€{tripTotal.toFixed(2)}</p>
            </div>
          </div>

          {/* Add expense */}
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 mb-5">
            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4">Dodaj wydatek</p>

            {/* Category selector */}
            <div className="grid grid-cols-4 gap-2 mb-4">
              {(Object.entries(CATEGORY_CONFIG) as [Expense["category"], typeof CATEGORY_CONFIG[keyof typeof CATEGORY_CONFIG]][]).map(([key, cfg]) => (
                <button
                  key={key}
                  onClick={() => setExpenseCategory(key)}
                  className={cn(
                    "flex flex-col items-center py-2 px-1 rounded-xl border text-xs font-medium transition-all",
                    expenseCategory === key
                      ? "border-camino-blue bg-camino-blue/5 text-camino-blue"
                      : "border-gray-100 text-gray-500"
                  )}
                >
                  <cfg.icon className="w-4 h-4 mb-1" />
                  {cfg.label}
                </button>
              ))}
            </div>

            <div className="flex space-x-2 mb-3">
              <div className="relative flex-1">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 font-medium">€</span>
                <input
                  type="number"
                  value={expenseAmount}
                  onChange={e => setExpenseAmount(e.target.value)}
                  placeholder="0.00"
                  className="w-full pl-7 pr-3 py-2.5 border border-gray-200 rounded-xl text-gray-700 outline-none focus:border-camino-blue text-sm"
                />
              </div>
              <input
                type="text"
                value={expenseNote}
                onChange={e => setExpenseNote(e.target.value)}
                placeholder="Notatka (opcja)"
                className="flex-[2] px-3 py-2.5 border border-gray-200 rounded-xl text-gray-700 outline-none focus:border-camino-blue text-sm"
              />
            </div>

            <button
              onClick={addExpense}
              disabled={!expenseAmount || parseFloat(expenseAmount) <= 0}
              className="w-full py-3 bg-camino-blue text-white rounded-xl font-semibold text-sm disabled:opacity-40 hover:bg-camino-blue/90 transition-colors"
            >
              Dodaj wydatek
            </button>
          </div>

          {/* Today's expenses */}
          <h2 className="font-serif text-xl text-camino-blue mb-3">Dzisiejsze wydatki</h2>
          {todayExpenses.length === 0 ? (
            <p className="text-gray-400 text-center py-6 italic text-sm">Brak wydatków dzisiaj.</p>
          ) : (
            <div className="space-y-2">
              {todayExpenses.map((expense: any) => {
                const cfg = CATEGORY_CONFIG[expense.category as Expense["category"]];
                return (
                  <div key={expense.id} className="bg-white rounded-xl p-4 flex items-center justify-between border border-gray-100">
                    <div className="flex items-center space-x-3">
                      <span className={cn("p-2 rounded-lg", cfg.color)}>
                        <cfg.icon className="w-4 h-4" />
                      </span>
                      <div>
                        <p className="text-sm font-medium text-gray-700">{cfg.label}</p>
                        {expense.note && <p className="text-xs text-gray-400">{expense.note}</p>}
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <p className="font-bold text-camino-earth">€{expense.amount.toFixed(2)}</p>
                      <button
                        onClick={() => removeExpense(expense.id)}
                        className="text-gray-300 hover:text-red-400 transition-colors text-lg leading-none"
                      >
                        ×
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

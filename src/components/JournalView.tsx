import { useState, useEffect } from "react";
import { format } from "date-fns";
import { PenLine, Save } from "lucide-react";

interface JournalEntry {
  date: string;
  content: string;
}

export function JournalView() {
  const [entries, setEntries] = useState<JournalEntry[]>([]);
  const [currentEntry, setCurrentEntry] = useState("");
  const today = format(new Date(), "yyyy-MM-dd");

  useEffect(() => {
    const saved = localStorage.getItem("camino_journal");
    if (saved) {
      setEntries(JSON.parse(saved));
    }
  }, []);

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

  return (
    <div className="pb-24 pt-8 px-6 max-w-md mx-auto min-h-screen">
      <header className="mb-8">
        <h1 className="font-serif text-3xl text-camino-blue mb-1">Pilgrim's Journal</h1>
        <p className="text-gray-500 font-medium text-sm">Record your spiritual journey</p>
      </header>

      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-8">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2 text-camino-earth">
            <PenLine className="w-5 h-5" />
            <span className="font-medium">{format(new Date(), "MMMM d, yyyy")}</span>
          </div>
          <button 
            onClick={handleSave}
            disabled={!currentEntry.trim()}
            className="flex items-center space-x-1 text-sm font-medium text-camino-blue disabled:opacity-50"
          >
            <Save className="w-4 h-4" />
            <span>Save</span>
          </button>
        </div>
        <textarea
          value={currentEntry}
          onChange={(e) => setCurrentEntry(e.target.value)}
          placeholder="What is God speaking to your heart today?"
          className="w-full h-40 resize-none outline-none text-gray-700 placeholder:text-gray-300 font-serif leading-relaxed"
        />
      </div>

      <div className="space-y-6">
        <h2 className="font-serif text-xl text-camino-blue mb-4">Past Entries</h2>
        {entries.length === 0 ? (
          <p className="text-gray-400 text-center py-8 italic">No entries yet. Begin your journal today.</p>
        ) : (
          entries.map((entry) => (
            <div key={entry.date} className="bg-white/50 rounded-xl p-5 border border-gray-100">
              <p className="text-xs font-bold text-camino-earth uppercase tracking-wider mb-2">
                {format(new Date(entry.date), "MMMM d, yyyy")}
              </p>
              <p className="text-gray-700 font-serif leading-relaxed whitespace-pre-wrap">
                {entry.content}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

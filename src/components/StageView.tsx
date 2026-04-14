import { Stage } from "../data/camino";
import { Play, Pause, SkipForward, SkipBack, Headphones, ChevronLeft, ChevronRight, Droplets, Info, AlertTriangle, Star, MapPin, CheckCircle2 } from "lucide-react";
import { useState } from "react";
import { cn } from "../lib/utils";

interface StageViewProps {
  stage: Stage;
  isPremium: boolean;
  onShowPaywall: () => void;
  onPrevStage?: () => void;
  onNextStage?: () => void;
  onCompleteStage?: () => void;
  hasPrev: boolean;
  hasNext: boolean;
  totalStages: number;
}

type Section = "devotion" | "practical" | "accommodation";

const difficultyConfig = {
  easy: { label: "Easy", color: "bg-green-100 text-green-700", bars: 1 },
  moderate: { label: "Moderate", color: "bg-yellow-100 text-yellow-700", bars: 2 },
  hard: { label: "Hard", color: "bg-orange-100 text-orange-700", bars: 3 },
  very_hard: { label: "Very Hard", color: "bg-red-100 text-red-700", bars: 4 },
};

const accommodationTypeConfig = {
  municipal: { label: "Municipal", color: "bg-blue-100 text-blue-700" },
  private: { label: "Private", color: "bg-purple-100 text-purple-700" },
  donativo: { label: "Donativo", color: "bg-amber-100 text-amber-700" },
  monastery: { label: "Monastery", color: "bg-camino-earth/10 text-camino-earth" },
  hotel: { label: "Hotel", color: "bg-gray-100 text-gray-600" },
};

export function StageView({ stage, isPremium, onShowPaywall, onPrevStage, onNextStage, onCompleteStage, hasPrev, hasNext, totalStages }: StageViewProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeSection, setActiveSection] = useState<Section>("devotion");

  const handlePlay = () => {
    if (!isPremium) {
      onShowPaywall();
      return;
    }
    setIsPlaying(!isPlaying);
  };

  const diff = difficultyConfig[stage.practical.difficulty];
  const maxElevation = Math.max(stage.elevationGain, stage.elevationLoss, 100);

  return (
    <div className="pb-24 pt-8 px-6 max-w-md mx-auto min-h-screen">
      {/* Header with navigation */}
      <header className="mb-6 text-center relative">
        <div className="flex items-center justify-between mb-2">
          <button
            onClick={onPrevStage}
            disabled={!hasPrev}
            className="w-10 h-10 flex items-center justify-center rounded-full bg-white shadow-sm border border-gray-100 disabled:opacity-30 text-camino-blue hover:bg-camino-sand transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <div>
            <p className="text-sm text-camino-earth font-semibold uppercase tracking-wider">Day {stage.day} / {totalStages}</p>
            <h1 className="font-serif text-2xl text-camino-blue mt-1">{stage.start}</h1>
            <p className="text-gray-500 text-sm">to {stage.end} · {stage.distance} km</p>
          </div>
          <button
            onClick={onNextStage}
            disabled={!hasNext}
            className="w-10 h-10 flex items-center justify-center rounded-full bg-white shadow-sm border border-gray-100 disabled:opacity-30 text-camino-blue hover:bg-camino-sand transition-colors"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </header>

      {/* Elevation Profile */}
      <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 mb-5">
        <div className="flex items-center justify-between mb-3">
          <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Elevation Profile</p>
          <span className={cn("text-xs font-semibold px-2 py-0.5 rounded-full", diff.color)}>{diff.label}</span>
        </div>
        <div className="flex items-end space-x-3 h-14">
          <div className="flex-1 flex flex-col items-center space-y-1">
            <div
              className="w-full bg-camino-gold/80 rounded-t-sm transition-all"
              style={{ height: `${(stage.elevationGain / maxElevation) * 44}px` }}
            />
            <p className="text-xs text-gray-500 font-medium">+{stage.elevationGain}m</p>
          </div>
          <div className="flex-1 flex flex-col items-center space-y-1">
            <div
              className="w-full bg-camino-blue/40 rounded-t-sm transition-all"
              style={{ height: `${(stage.elevationLoss / maxElevation) * 44}px` }}
            />
            <p className="text-xs text-gray-500 font-medium">-{stage.elevationLoss}m</p>
          </div>
          <div className="flex-1 flex flex-col items-center space-y-1">
            <div className="w-full flex items-end justify-center" style={{ height: '44px' }}>
              <p className="font-serif text-xl text-camino-blue font-bold">{stage.distance}</p>
            </div>
            <p className="text-xs text-gray-500 font-medium">km</p>
          </div>
        </div>
        <p className="text-xs text-gray-400 mt-2 font-medium">{stage.practical.terrain}</p>
      </div>

      {/* Section Tabs */}
      <div className="flex space-x-2 mb-5">
        {(["devotion", "practical", "accommodation"] as Section[]).map((s) => (
          <button
            key={s}
            onClick={() => setActiveSection(s)}
            className={cn(
              "flex-1 py-2 text-xs font-bold uppercase tracking-wider rounded-xl transition-all",
              activeSection === s
                ? "bg-camino-blue text-white"
                : "bg-white text-gray-500 border border-gray-100"
            )}
          >
            {s === "devotion" ? "Devotion" : s === "practical" ? "Route Info" : "Lodging"}
          </button>
        ))}
      </div>

      {/* DEVOTION TAB */}
      {activeSection === "devotion" && (
        <div>
          {/* Audio Player */}
          <div className="bg-camino-blue text-white rounded-2xl p-6 shadow-lg mb-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-10 -mt-10" />
            <div className="flex items-center space-x-3 mb-4">
              <Headphones className="w-5 h-5 text-camino-gold" />
              <span className="font-medium text-sm">Daily Audio Guide</span>
              {!isPremium && (
                <span className="ml-auto text-xs bg-camino-gold text-camino-blue font-bold px-2 py-0.5 rounded-full">PREMIUM</span>
              )}
            </div>
            <h3 className="font-serif text-xl mb-5">{stage.devotion.title}</h3>
            <div className="flex items-center justify-center space-x-8 mb-4">
              <button className="text-white/70 hover:text-white transition-colors">
                <SkipBack className="w-6 h-6" />
              </button>
              <button
                onClick={handlePlay}
                className="w-16 h-16 bg-camino-gold rounded-full flex items-center justify-center text-camino-blue hover:scale-105 transition-transform"
              >
                {isPlaying ? <Pause className="w-8 h-8" /> : <Play className="w-8 h-8 ml-1" />}
              </button>
              <button className="text-white/70 hover:text-white transition-colors">
                <SkipForward className="w-6 h-6" />
              </button>
            </div>
            <div className="flex items-center justify-between text-xs text-white/50 font-medium">
              <span>0:00</span>
              <span>{stage.devotion.audioDuration}</span>
            </div>
            <div className="w-full h-1 bg-white/20 rounded-full mt-2 overflow-hidden">
              <div className="w-0 h-full bg-camino-gold" />
            </div>
          </div>

          <div className="space-y-6">
            <section>
              <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Scripture</h4>
              <blockquote className="font-serif text-lg text-camino-blue italic border-l-4 border-camino-gold pl-4 py-1">
                {stage.devotion.scripture}
              </blockquote>
            </section>
            <section>
              <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Reflection</h4>
              <p className="text-gray-700 leading-relaxed">{stage.devotion.reflection}</p>
            </section>
            <section className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
              <h4 className="text-xs font-bold text-camino-earth uppercase tracking-wider mb-3">Pilgrim's Prayer</h4>
              <p className="font-serif text-camino-blue leading-relaxed">{stage.devotion.prayer}</p>
            </section>
          </div>
        </div>
      )}

      {/* PRACTICAL TAB */}
      {activeSection === "practical" && (
        <div className="space-y-4">
          {/* Tip of the Day */}
          <div className="bg-camino-gold/10 rounded-xl p-4 border border-camino-gold/30">
            <p className="text-xs font-bold text-camino-earth uppercase tracking-wider mb-2">Pilgrim Tip</p>
            <p className="text-gray-700 text-sm leading-relaxed">{stage.practical.tipOfTheDay}</p>
          </div>

          {/* Warnings */}
          {stage.practical.warnings && stage.practical.warnings.length > 0 && (
            <div className="bg-red-50 rounded-xl p-4 border border-red-100">
              <div className="flex items-center space-x-2 mb-3">
                <AlertTriangle className="w-4 h-4 text-red-500" />
                <p className="text-xs font-bold text-red-600 uppercase tracking-wider">Warnings</p>
              </div>
              <ul className="space-y-2">
                {stage.practical.warnings.map((w, i) => (
                  <li key={i} className="text-sm text-red-700 leading-relaxed">• {w}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Water Points */}
          <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
            <div className="flex items-center space-x-2 mb-3">
              <Droplets className="w-4 h-4 text-blue-500" />
              <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Water Points</p>
            </div>
            <ul className="space-y-1.5">
              {stage.practical.waterPoints.map((w, i) => (
                <li key={i} className="text-sm text-gray-600 flex items-start space-x-2">
                  <span className="text-blue-400 mt-0.5">•</span>
                  <span>{w}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
            <div className="flex items-center space-x-2 mb-3">
              <Info className="w-4 h-4 text-camino-earth" />
              <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Services Along Route</p>
            </div>
            <ul className="space-y-1.5">
              {stage.practical.services.map((s, i) => (
                <li key={i} className="text-sm text-gray-600 flex items-start space-x-2">
                  <span className="text-camino-earth mt-0.5">•</span>
                  <span>{s}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Highlights */}
          <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
            <div className="flex items-center space-x-2 mb-3">
              <Star className="w-4 h-4 text-camino-gold" />
              <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Highlights</p>
            </div>
            <ul className="space-y-1.5">
              {stage.practical.highlights.map((h, i) => (
                <li key={i} className="text-sm text-gray-600 flex items-start space-x-2">
                  <span className="text-camino-gold mt-0.5">★</span>
                  <span>{h}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {/* ACCOMMODATION TAB */}
      {activeSection === "accommodation" && (
        <div className="space-y-3">
          <p className="text-xs text-gray-400 font-medium text-center mb-4">
            Prices in EUR per person/night. Book ahead in high season (Jun–Sep).
          </p>
          {stage.accommodation.map((acc, i) => {
            const typeConf = accommodationTypeConfig[acc.type];
            return (
              <div key={i} className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <p className="font-semibold text-camino-blue text-sm leading-tight">{acc.name}</p>
                    <div className="flex items-center space-x-2 mt-1">
                      <span className={cn("text-xs font-bold px-2 py-0.5 rounded-full", typeConf.color)}>
                        {typeConf.label}
                      </span>
                      <span className="text-xs text-gray-400">{acc.beds} beds</span>
                    </div>
                  </div>
                  <div className="text-right ml-3">
                    <p className="font-bold text-camino-earth text-sm">
                      {acc.priceEur === "donation" ? "Donativo" : `€${acc.priceEur}`}
                    </p>
                    {acc.bookable && (
                      <p className="text-xs text-green-600 font-medium mt-0.5">Bookable</p>
                    )}
                  </div>
                </div>
                {acc.phone && (
                  <div className="flex items-center space-x-1 mt-2 pt-2 border-t border-gray-50">
                    <MapPin className="w-3 h-3 text-gray-400" />
                    <p className="text-xs text-gray-500 font-mono">{acc.phone}</p>
                  </div>
                )}
              </div>
            );
          })}
          <div className="bg-camino-sand rounded-xl p-4 mt-2">
            <p className="text-xs text-gray-600 leading-relaxed">
              <strong>Booking tip:</strong> Municipal albergues are first-come-first-served and open around 1-2pm. Private albergues can be booked in advance. Donativo albergues run on trust — leave what you can (€5-10 typical).
            </p>
          </div>
        </div>
      )}

      {/* Complete Stage Button */}
      {onCompleteStage && hasNext && (
        <div className="mt-8">
          <button
            onClick={onCompleteStage}
            className="w-full flex items-center justify-center space-x-2 py-4 rounded-2xl bg-green-500 text-white font-bold text-base shadow-md hover:bg-green-600 transition-colors"
          >
            <CheckCircle2 className="w-6 h-6" />
            <span>Etap ukończony — następny dzień</span>
          </button>
        </div>
      )}
    </div>
  );
}

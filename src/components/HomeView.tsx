import { CaminoRoute } from "../data/camino";
import { ChevronRight, MapPin, PlayCircle, CheckCircle2 } from "lucide-react";
import { cn } from "../lib/utils";

interface HomeViewProps {
  currentRoute: CaminoRoute;
  routes: CaminoRoute[];
  currentStageIndex: number;
  onGoToStage: () => void;
  onSelectRoute: (id: string) => void;
  onCompleteStage: () => void;
}

export function HomeView({ currentRoute, routes, currentStageIndex, onGoToStage, onSelectRoute, onCompleteStage }: HomeViewProps) {
  const currentStage = currentRoute.stages[currentStageIndex];
  const progress = ((currentStageIndex) / currentRoute.totalDays) * 100;

  return (
    <div className="pb-24 pt-8 px-6 max-w-md mx-auto min-h-screen">
      <header className="mb-6">
        <h1 className="font-serif text-3xl text-camino-blue mb-1">Camino Companion</h1>
        <p className="text-gray-500 font-medium text-sm">Your Spiritual Journey</p>
      </header>

      {/* Route Selector */}
      <div className="flex overflow-x-auto space-x-3 pb-4 mb-4 scrollbar-hide -mx-6 px-6">
        {routes.map(route => (
          <button
            key={route.id}
            onClick={() => onSelectRoute(route.id)}
            className={cn(
              "px-5 py-2.5 rounded-full whitespace-nowrap text-sm font-semibold transition-all shadow-sm",
              route.id === currentRoute.id 
                ? "bg-camino-blue text-white" 
                : "bg-white text-camino-blue border border-gray-200 hover:border-camino-blue/30"
            )}
          >
            {route.name}
          </button>
        ))}
      </div>

      {/* Progress Card */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-8">
        <div className="flex justify-between items-end mb-4">
          <div>
            <p className="text-xs text-gray-400 font-semibold uppercase tracking-wider mb-1">Overall Progress</p>
            <p className="font-serif text-2xl text-camino-blue">{currentStageIndex} <span className="text-lg text-gray-400">/ {currentRoute.totalDays} days</span></p>
          </div>
          <div className="text-right">
            <p className="text-xs text-gray-400 font-semibold uppercase tracking-wider mb-1">Distance</p>
            <p className="font-serif text-xl text-camino-earth">
              {currentRoute.stages.slice(0, currentStageIndex).reduce((acc, s) => acc + s.distance, 0).toFixed(1)} <span className="text-sm text-gray-400">/ {currentRoute.totalDistance} km</span>
            </p>
          </div>
        </div>
        <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
          <div 
            className="h-full bg-camino-gold transition-all duration-1000 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Today's Stage */}
      <h2 className="font-serif text-xl text-camino-blue mb-4">Today's Stage</h2>
      <button 
        onClick={onGoToStage}
        className="w-full text-left bg-camino-blue text-white rounded-2xl p-6 shadow-md hover:bg-camino-blue/95 transition-colors relative overflow-hidden group"
      >
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-10 -mt-10 transition-transform group-hover:scale-110" />
        
        <div className="flex items-center space-x-2 text-camino-gold mb-3">
          <MapPin className="w-4 h-4" />
          <span className="text-xs font-semibold tracking-wider uppercase">Day {currentStage.day}</span>
        </div>
        
        <h3 className="font-serif text-2xl mb-1">{currentStage.start}</h3>
        <p className="text-white/70 text-sm mb-6">to {currentStage.end}</p>
        
        <div className="flex items-center justify-between border-t border-white/10 pt-4">
          <div className="flex items-center space-x-2">
            <PlayCircle className="w-5 h-5 text-camino-gold" />
            <span className="text-sm font-medium">{currentStage.devotion.audioDuration} Audio Guide</span>
          </div>
          <ChevronRight className="w-5 h-5 text-white/50" />
        </div>
      </button>

      <button
        onClick={onCompleteStage}
        disabled={currentStageIndex >= currentRoute.stages.length - 1}
        className="w-full mt-3 flex items-center justify-center space-x-2 py-3.5 rounded-2xl bg-green-500 text-white font-semibold text-sm shadow-sm hover:bg-green-600 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
      >
        <CheckCircle2 className="w-5 h-5" />
        <span>Etap ukończony — następny dzień</span>
      </button>

      {/* Upcoming Stages List */}
      <h2 className="font-serif text-xl text-camino-blue mb-4 mt-8">Upcoming</h2>
      <div className="space-y-3">
        {currentRoute.stages.slice(currentStageIndex + 1, currentStageIndex + 4).map((stage) => (
          <div key={stage.id} className="bg-white rounded-xl p-4 flex items-center justify-between border border-gray-100">
            <div>
              <p className="text-xs text-camino-earth font-semibold mb-1">Day {stage.day}</p>
              <p className="font-medium text-camino-blue">{stage.end}</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-500">{stage.distance} km</p>
            </div>
          </div>
        ))}
        {currentRoute.stages.length <= currentStageIndex + 1 && (
          <p className="text-gray-400 text-sm italic text-center py-4">You have reached the end of the available stages for this route preview.</p>
        )}
      </div>
    </div>
  );
}

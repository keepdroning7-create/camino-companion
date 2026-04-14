import { useState, useEffect } from "react";
import { BottomNav, Tab } from "./components/BottomNav";
import { HomeView } from "./components/HomeView";
import { MapView } from "./components/MapView";
import { StageView } from "./components/StageView";
import { JournalView } from "./components/JournalView";
import { PackingView } from "./components/PackingView";
import { InfoView } from "./components/InfoView";
import { PaywallModal } from "./components/PaywallModal";
import { CAMINO_ROUTES } from "./data/camino";

const STORAGE_KEY = "camino_progress";

interface SavedProgress {
  routeId: string;
  stageIndex: number;
}

function loadProgress(): SavedProgress {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved) as SavedProgress;
      const route = CAMINO_ROUTES.find(r => r.id === parsed.routeId);
      if (route && parsed.stageIndex >= 0 && parsed.stageIndex < route.stages.length) {
        return parsed;
      }
    }
  } catch {}
  return { routeId: CAMINO_ROUTES[0].id, stageIndex: 0 };
}

export default function App() {
  const initial = loadProgress();
  const [activeTab, setActiveTab] = useState<Tab>("home");
  const [currentRouteId, setCurrentRouteId] = useState<string>(initial.routeId);
  const [currentStageIndex, setCurrentStageIndex] = useState(initial.stageIndex);
  const [isPremium, setIsPremium] = useState(false);
  const [showPaywall, setShowPaywall] = useState(false);

  useEffect(() => {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ routeId: currentRouteId, stageIndex: currentStageIndex })
    );
  }, [currentRouteId, currentStageIndex]);

  const currentRoute = CAMINO_ROUTES.find(r => r.id === currentRouteId) || CAMINO_ROUTES[0];

  const handleUnlock = () => {
    setIsPremium(true);
    setShowPaywall(false);
  };

  const handleSelectRoute = (routeId: string) => {
    setCurrentRouteId(routeId);
    setCurrentStageIndex(0);
  };

  const handleNextStage = () => {
    if (currentStageIndex < currentRoute.stages.length - 1) {
      setCurrentStageIndex(i => i + 1);
    }
  };

  const handlePrevStage = () => {
    if (currentStageIndex > 0) {
      setCurrentStageIndex(i => i - 1);
    }
  };

  const handleGoToStage = () => {
    setActiveTab("stage");
  };

  const handleCompleteStage = () => {
    if (currentStageIndex < currentRoute.stages.length - 1) {
      setCurrentStageIndex(i => i + 1);
      setActiveTab("home");
    }
  };

  return (
    <div className="min-h-screen bg-camino-sand font-sans text-gray-900">
      {activeTab === "home" && (
        <HomeView
          currentRoute={currentRoute}
          routes={CAMINO_ROUTES}
          currentStageIndex={currentStageIndex}
          onGoToStage={handleGoToStage}
          onSelectRoute={handleSelectRoute}
          onCompleteStage={handleCompleteStage}
        />
      )}

      {activeTab === "map" && (
        <MapView
          route={currentRoute}
          currentStageIndex={currentStageIndex}
        />
      )}

      {activeTab === "stage" && (
        <StageView
          stage={currentRoute.stages[currentStageIndex]}
          isPremium={isPremium}
          onShowPaywall={() => setShowPaywall(true)}
          onPrevStage={handlePrevStage}
          onNextStage={handleNextStage}
          onCompleteStage={handleCompleteStage}
          hasPrev={currentStageIndex > 0}
          hasNext={currentStageIndex < currentRoute.stages.length - 1}
          totalStages={currentRoute.stages.length}
        />
      )}

      {activeTab === "journal" && (
        <JournalView />
      )}

      {activeTab === "pack" && (
        <PackingView />
      )}

      {activeTab === "info" && (
        <InfoView />
      )}

      <BottomNav activeTab={activeTab} onChange={setActiveTab} />

      <PaywallModal
        isOpen={showPaywall}
        onClose={() => setShowPaywall(false)}
        onUnlock={handleUnlock}
      />
    </div>
  );
}

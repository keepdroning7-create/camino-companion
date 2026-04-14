import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, Polyline, Circle, useMap } from "react-leaflet";
import L from "leaflet";
import { CaminoRoute } from "../data/camino";
import { Navigation, Share2 } from "lucide-react";

// Fix Leaflet default icon issue in React
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

const customIcon = new L.Icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

const activeIcon = new L.Icon({
  iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-gold.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

// Component to update map center when route changes
function MapUpdater({ center }: { center: [number, number] }) {
  const map = useMap();
  useEffect(() => {
    map.setView(center, map.getZoom());
  }, [center, map]);
  return null;
}

interface MapViewProps {
  route: CaminoRoute;
  currentStageIndex: number;
}

export function MapView({ route, currentStageIndex }: MapViewProps) {
  const positions = route.stages.map(s => s.coordinates);
  const [userPos, setUserPos] = useState<[number, number] | null>(null);
  const [gpsError, setGpsError] = useState<string | null>(null);
  const [gpsLoading, setGpsLoading] = useState(false);
  const [watchId, setWatchId] = useState<number | null>(null);

  useEffect(() => {
    return () => {
      if (watchId !== null) navigator.geolocation.clearWatch(watchId);
    };
  }, [watchId]);

  const allPoints: [number, number][] = [
    route.startCoordinates,
    ...positions
  ];

  const currentCenter = route.stages[currentStageIndex]?.coordinates || route.startCoordinates;

  const handleShare = async () => {
    if (!userPos) {
      handleLocate();
      return;
    }
    const [lat, lng] = userPos;
    const url = `https://www.google.com/maps?q=${lat},${lng}`;
    const text = `Jestem na Camino tutaj: ${url}`;
    if (navigator.share) {
      try {
        await navigator.share({ title: "Moja lokalizacja", text, url });
      } catch {}
    } else {
      try {
        await navigator.clipboard.writeText(text);
        alert("Lokalizacja skopiowana do schowka");
      } catch {
        prompt("Skopiuj lokalizację:", text);
      }
    }
  };

  const handleLocate = () => {
    if (!navigator.geolocation) {
      setGpsError("GPS niedostępny");
      return;
    }
    if (watchId !== null) {
      navigator.geolocation.clearWatch(watchId);
      setWatchId(null);
      setUserPos(null);
      return;
    }
    setGpsLoading(true);
    setGpsError(null);
    const id = navigator.geolocation.watchPosition(
      (pos) => {
        setUserPos([pos.coords.latitude, pos.coords.longitude]);
        setGpsLoading(false);
      },
      () => {
        setGpsError("Nie można pobrać lokalizacji");
        setGpsLoading(false);
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 5000 }
    );
    setWatchId(id);
  };

  return (
    <div className="h-screen w-full relative pb-16">
      <div className="absolute top-0 left-0 right-0 z-[400] bg-gradient-to-b from-white/80 to-transparent pt-12 pb-6 px-6 pointer-events-none">
        <h1 className="font-serif text-2xl text-camino-blue drop-shadow-sm">{route.name}</h1>
      </div>

      {/* GPS + Share buttons */}
      <div className="absolute bottom-20 right-4 z-[400] flex flex-col items-end space-y-2">
        {gpsError && (
          <div className="bg-red-50 text-red-600 text-xs font-medium px-3 py-1.5 rounded-lg shadow">
            {gpsError}
          </div>
        )}
        {userPos && (
          <button
            onClick={handleShare}
            className="w-12 h-12 bg-white rounded-full shadow-md border border-gray-200 flex items-center justify-center text-camino-earth hover:bg-camino-sand transition-colors"
            title="Udostępnij lokalizację"
          >
            <Share2 className="w-5 h-5" />
          </button>
        )}
        <button
          onClick={handleLocate}
          disabled={gpsLoading}
          className="w-12 h-12 bg-white rounded-full shadow-md border border-gray-200 flex items-center justify-center text-camino-blue hover:bg-camino-sand transition-colors disabled:opacity-60"
          title="Moja lokalizacja"
        >
          <Navigation className={`w-5 h-5 ${gpsLoading ? "animate-pulse" : ""} ${userPos ? "fill-camino-blue" : ""}`} />
        </button>
      </div>
      
      <MapContainer 
        center={currentCenter} 
        zoom={10} 
        className="h-full w-full z-0"
        zoomControl={false}
      >
        <MapUpdater center={currentCenter} />
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        <Polyline 
          positions={allPoints} 
          color="#0f2c59" 
          weight={4} 
          opacity={0.6} 
          dashArray="10, 10" 
        />

        {route.stages.map((stage, index) => (
          <Marker
            key={stage.id}
            position={stage.coordinates}
            icon={index === currentStageIndex ? activeIcon : customIcon}
          >
            <Popup className="font-sans">
              <div className="p-1">
                <p className="text-xs text-camino-earth font-bold uppercase mb-1">Day {stage.day}</p>
                <p className="font-serif text-lg text-camino-blue leading-tight mb-2">{stage.end}</p>
                <p className="text-sm text-gray-600">{stage.distance} km</p>
              </div>
            </Popup>
          </Marker>
        ))}

        {userPos && (
          <>
            <Circle
              center={userPos}
              radius={50}
              pathOptions={{ color: "#2563eb", fillColor: "#3b82f6", fillOpacity: 0.6, weight: 2 }}
            />
            <Circle
              center={userPos}
              radius={200}
              pathOptions={{ color: "#3b82f6", fillColor: "#3b82f6", fillOpacity: 0.1, weight: 1 }}
            />
          </>
        )}
      </MapContainer>
    </div>
  );
}

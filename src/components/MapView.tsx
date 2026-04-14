import { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, Polyline, useMap } from "react-leaflet";
import L from "leaflet";
import { CaminoRoute } from "../data/camino";

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
  
  const allPoints: [number, number][] = [
    route.startCoordinates,
    ...positions
  ];

  const currentCenter = route.stages[currentStageIndex]?.coordinates || route.startCoordinates;

  return (
    <div className="h-screen w-full relative pb-16">
      <div className="absolute top-0 left-0 right-0 z-[400] bg-gradient-to-b from-white/80 to-transparent pt-12 pb-6 px-6 pointer-events-none">
        <h1 className="font-serif text-2xl text-camino-blue drop-shadow-sm">{route.name}</h1>
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
      </MapContainer>
    </div>
  );
}

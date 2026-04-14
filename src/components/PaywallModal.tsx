import { X, CheckCircle2, Headphones, Map, BookHeart } from "lucide-react";

interface PaywallModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUnlock: () => void;
}

export function PaywallModal({ isOpen, onClose, onUnlock }: PaywallModalProps) {
  if (!isOpen) return null;

  const features = [
    { icon: Headphones, text: "Daily Audio Devotions for all 33 stages" },
    { icon: Map, text: "Detailed GPS routing & elevation profiles" },
    { icon: BookHeart, text: "Unlimited journaling & spiritual prompts" },
  ];

  return (
    <div className="fixed inset-0 z-[500] flex items-center justify-center p-4 bg-camino-blue/80 backdrop-blur-sm">
      <div className="bg-white rounded-3xl w-full max-w-sm overflow-hidden shadow-2xl relative animate-in fade-in zoom-in duration-200">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 z-10"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="bg-camino-sand p-8 text-center border-b border-gray-100">
          <div className="w-16 h-16 bg-camino-gold/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-3xl">🐚</span>
          </div>
          <h2 className="font-serif text-2xl text-camino-blue mb-2">Unlock the Full Camino</h2>
          <p className="text-gray-600 text-sm">Deepen your pilgrimage with our complete spiritual guide.</p>
        </div>

        <div className="p-6">
          <ul className="space-y-4 mb-8">
            {features.map((f, i) => (
              <li key={i} className="flex items-start space-x-3">
                <CheckCircle2 className="w-5 h-5 text-camino-gold shrink-0 mt-0.5" />
                <span className="text-gray-700 text-sm">{f.text}</span>
              </li>
            ))}
          </ul>

          <button 
            onClick={onUnlock}
            className="w-full bg-camino-blue text-white rounded-xl py-4 font-semibold shadow-lg hover:bg-camino-blue/90 transition-colors flex flex-col items-center justify-center"
          >
            <span>Unlock Now</span>
            <span className="text-xs font-normal text-white/70 mt-0.5">$9.99 one-time purchase</span>
          </button>
          
          <p className="text-center text-xs text-gray-400 mt-4">
            Cancel anytime. Proceeds support Catholic missions.
          </p>
        </div>
      </div>
    </div>
  );
}

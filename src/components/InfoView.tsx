import { useState } from "react";
import { Phone, FileText, Award, HelpCircle, MessageCircle, ChevronDown, ChevronUp } from "lucide-react";
import { cn } from "../lib/utils";

type InfoSection = "emergency" | "credential" | "compostela" | "etiquette" | "faq" | "phrases";

interface FAQItem {
  q: string;
  a: string;
}

const FAQ_ITEMS: FAQItem[] = [
  { q: "When is the best time to walk the Camino?", a: "May–June and September–October are ideal: good weather, not peak crowds. July–August is the busiest (and hottest on the Meseta). Winter (Nov–Feb) is quiet but cold, with some services closed." },
  { q: "How fit do I need to be?", a: "If you can walk 15km comfortably, you can build up from there. Train for 2-3 months before by walking on weekends with your loaded pack. The biggest issue is feet and knees, not cardiovascular fitness." },
  { q: "How much does it cost per day?", a: "Budget pilgrims: €30-40/day (municipal albergue €8, meals €10-15, snacks). Mid-range: €50-70/day (private albergue €14-18, restaurant meals). The Camino can be very affordable." },
  { q: "Do I need to speak Spanish?", a: "Not required, but learning basic phrases helps enormously, especially in smaller villages. 'Buen Camino!' will get you very far. Many younger hospitaleros speak English." },
  { q: "Can I walk alone as a woman?", a: "Yes. The Camino is considered very safe. Women walk solo regularly and the pilgrim community is notably protective and supportive. Use common sense, inform someone of your route." },
  { q: "What happens if I get injured?", a: "Spain has excellent public healthcare. EU citizens with EHIC card get free emergency treatment. Non-EU: travel insurance is essential. For blisters: most albergues have medical kits or can direct you to the local health center (Centro de Salud)." },
  { q: "Should I book accommodation in advance?", a: "In peak season (July-August), booking 1-3 days ahead in popular locations (Pamplona, Burgos, León) is wise. Municipal albergues cannot be booked and open at 1pm. Private albergues can be reserved online (Booking.com, alberguescamino.com)." },
  { q: "What is the Botafumeiro?", a: "The Botafumeiro is a massive silver incense burner in the Santiago Cathedral, swung on a rope across the transept during Pilgrim Mass. Originally used to fumigate arriving pilgrims in the Middle Ages. One of the most dramatic liturgical moments in Catholicism." },
];

const SPANISH_PHRASES = [
  { phrase: "¡Buen Camino!", translation: "Good Camino! (universal pilgrim greeting)", phonetic: "bwen ka-MEE-no" },
  { phrase: "Un sello, por favor", translation: "A stamp, please (for credencial)", phonetic: "oon SEH-yo por fa-VOR" },
  { phrase: "¿Hay camas libres?", translation: "Are there beds available?", phonetic: "ay KA-mas LEE-bres" },
  { phrase: "¿Dónde está el albergue?", translation: "Where is the albergue?", phonetic: "DON-day es-TA el al-BER-gay" },
  { phrase: "Una cama en el albergue", translation: "One bed in the albergue", phonetic: "OO-na KA-ma en el al-BER-gay" },
  { phrase: "Menú del peregrino", translation: "Pilgrim's menu (set meal, usually €10-12)", phonetic: "me-NOO del pe-re-GREE-no" },
  { phrase: "Me duelen los pies", translation: "My feet hurt", phonetic: "may DWAY-len los PYAY-s" },
  { phrase: "¿Cuánto falta para Santiago?", translation: "How far to Santiago?", phonetic: "KWAN-to FAL-ta PA-ra san-TYA-go" },
  { phrase: "Tengo ampollas", translation: "I have blisters", phonetic: "TEN-go am-POY-yas" },
  { phrase: "Una cerveza / Un vino, por favor", translation: "A beer / A wine, please", phonetic: "OO-na ther-VAY-tha / oon VEE-no" },
];

export function InfoView() {
  const [active, setActive] = useState<InfoSection>("emergency");
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const tabs: { id: InfoSection; label: string; icon: React.ElementType }[] = [
    { id: "emergency", label: "Emergency", icon: Phone },
    { id: "credential", label: "Credencial", icon: FileText },
    { id: "compostela", label: "Compostela", icon: Award },
    { id: "etiquette", label: "Etiquette", icon: MessageCircle },
    { id: "faq", label: "FAQ", icon: HelpCircle },
    { id: "phrases", label: "Spanish", icon: MessageCircle },
  ];

  return (
    <div className="pb-24 pt-8 px-6 max-w-md mx-auto min-h-screen">
      <header className="mb-5">
        <h1 className="font-serif text-3xl text-camino-blue mb-1">Pilgrim Guide</h1>
        <p className="text-gray-500 font-medium text-sm">Everything you need to know</p>
      </header>

      {/* Tabs scroll */}
      <div className="flex overflow-x-auto space-x-2 pb-3 mb-5 -mx-6 px-6 scrollbar-hide">
        {tabs.map(t => (
          <button
            key={t.id}
            onClick={() => setActive(t.id)}
            className={cn(
              "flex items-center space-x-1.5 px-3 py-2 rounded-full whitespace-nowrap text-xs font-bold transition-all shrink-0",
              active === t.id
                ? "bg-camino-blue text-white"
                : "bg-white text-gray-500 border border-gray-200"
            )}
          >
            <t.icon className="w-3.5 h-3.5" />
            <span>{t.label}</span>
          </button>
        ))}
      </div>

      {/* EMERGENCY */}
      {active === "emergency" && (
        <div className="space-y-4">
          <div className="bg-red-50 rounded-2xl p-5 border border-red-100">
            <p className="text-xs font-bold text-red-600 uppercase tracking-wider mb-3">Emergency Numbers — Spain</p>
            <div className="space-y-3">
              {[
                { label: "General Emergency (Police, Fire, Ambulance)", number: "112" },
                { label: "Police (Nacional)", number: "091" },
                { label: "Medical Emergency", number: "061" },
                { label: "Guardia Civil (rural areas)", number: "062" },
              ].map(e => (
                <div key={e.number} className="flex justify-between items-center">
                  <p className="text-sm text-red-700 flex-1 pr-4">{e.label}</p>
                  <p className="font-mono font-bold text-red-600 text-lg">{e.number}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Pilgrim-Specific Contacts</p>
            <div className="space-y-3">
              {[
                { label: "Pilgrim Office Santiago (help desk)", number: "+34 981 568 846" },
                { label: "Asistencia al Peregrino (pilgrim aid)", number: "+34 981 552 419" },
                { label: "Camino Information (Xunta de Galicia)", number: "+34 981 542 558" },
                { label: "Cruz Roja (Red Cross Spain)", number: "+34 902 222 292" },
              ].map(c => (
                <div key={c.number} className="flex justify-between items-start">
                  <p className="text-sm text-gray-600 flex-1 pr-4">{c.label}</p>
                  <p className="font-mono text-sm text-camino-blue font-medium">{c.number}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Medical Info to Know</p>
            <div className="space-y-3">
              <div>
                <p className="text-sm font-semibold text-camino-blue mb-1">Centro de Salud (Health Center)</p>
                <p className="text-sm text-gray-600">Every town on the Camino has one. For non-emergency medical needs: blisters, sprains, infections. Show EHIC card (EU citizens). Usually open 8am–3pm weekdays.</p>
              </div>
              <div>
                <p className="text-sm font-semibold text-camino-blue mb-1">Farmacia (Pharmacy)</p>
                <p className="text-sm text-gray-600">Spanish pharmacists are highly trained and can treat minor injuries without a prescription. Blister kits, anti-inflammatories, antibiotics (some). Look for the green cross.</p>
              </div>
              <div>
                <p className="text-sm font-semibold text-camino-blue mb-1">Hospital de Peregrinos</p>
                <p className="text-sm text-gray-600">Santiago de Compostela has a dedicated Pilgrim Clinic near the cathedral. For pilgrim-specific injuries: knees, feet, tendinitis.</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* CREDENCIAL */}
      {active === "credential" && (
        <div className="space-y-4">
          <div className="bg-camino-sand rounded-2xl p-5">
            <p className="text-xs font-bold text-camino-earth uppercase tracking-wider mb-2">What is the Credencial?</p>
            <p className="text-sm text-gray-700 leading-relaxed">The Credencial del Peregrino (Pilgrim's Passport) is a paper booklet that records your journey. You collect official stamps (sellos) at albergues, churches, bars, and pilgrim offices along the route. It is your proof of pilgrimage and is required to receive the Compostela in Santiago.</p>
          </div>

          <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Where to Get Your Credencial</p>
            <ul className="space-y-2">
              {[
                "Pilgrim associations in your home country (cheapest, €2-5)",
                "St. Jean Pied de Port Pilgrim Office (Rue de la Citadelle — first building you see)",
                "Porto Cathedral (Sé do Porto) for Camino Português",
                "Irun Pilgrim Office for Camino del Norte",
                "Oviedo Cathedral for Camino Primitivo",
                "Many albergues on Day 1 of any route",
              ].map((item, i) => (
                <li key={i} className="flex items-start space-x-2 text-sm text-gray-600">
                  <span className="text-camino-gold font-bold shrink-0">{i + 1}.</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Stamp Rules</p>
            <div className="space-y-3">
              <div className="flex items-start space-x-3 p-3 bg-blue-50 rounded-xl">
                <span className="text-blue-500 text-lg">📍</span>
                <div>
                  <p className="text-sm font-semibold text-camino-blue">More than 100km from Santiago</p>
                  <p className="text-sm text-gray-600">Minimum 1 stamp per day is sufficient</p>
                </div>
              </div>
              <div className="flex items-start space-x-3 p-3 bg-orange-50 rounded-xl">
                <span className="text-orange-500 text-lg">📍📍</span>
                <div>
                  <p className="text-sm font-semibold text-orange-700">Last 100km (Sarria onward)</p>
                  <p className="text-sm text-gray-600">MINIMUM 2 stamps per day required. Don't forget — it's strictly checked.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Best Places to Collect Stamps</p>
            <ul className="space-y-1.5">
              {["Every albergue you sleep in (automatic)", "Churches along the route (most have stamps)", "The pilgrim office in each town", "Bars and cafés (ask 'Un sello, por favor')", "Tourist offices", "Monasteries and convents (often the most beautiful stamps)"].map((s, i) => (
                <li key={i} className="text-sm text-gray-600 flex items-center space-x-2">
                  <span className="w-1.5 h-1.5 bg-camino-gold rounded-full shrink-0" />
                  <span>{s}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {/* COMPOSTELA */}
      {active === "compostela" && (
        <div className="space-y-4">
          <div className="bg-camino-sand rounded-2xl p-5">
            <p className="text-xs font-bold text-camino-earth uppercase tracking-wider mb-2">What is the Compostela?</p>
            <p className="text-sm text-gray-700 leading-relaxed">The Compostela is the official certificate of completion of the Camino de Santiago, issued by the Cathedral Chapter. It is written in Latin and bears your name. It is one of the most meaningful documents you will ever receive — proof that you walked to the tomb of Saint James.</p>
          </div>

          <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Requirements</p>
            <div className="space-y-3">
              {[
                { req: "Walk minimum 100km on foot", detail: "The last 100km must be walked. Sarria is the last valid starting point on the Francés." },
                { req: "Cycle minimum 200km", detail: "By bicycle or horseback." },
                { req: "Complete the journey for spiritual/religious reasons", detail: "The Pilgrim Office asks your motivation. Touristic reasons still get the 'Certificado de Distancia' but not the Compostela." },
                { req: "Present a valid credencial with stamps", detail: "2 stamps/day minimum for last 100km. Officials examine every page." },
              ].map((item, i) => (
                <div key={i} className="flex items-start space-x-3">
                  <span className="text-green-500 font-bold text-lg shrink-0">✓</span>
                  <div>
                    <p className="text-sm font-semibold text-gray-700">{item.req}</p>
                    <p className="text-xs text-gray-500 mt-0.5">{item.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">How to Collect It</p>
            <div className="space-y-2">
              {[
                "Go to the Pilgrim Office: Rúa das Carretas 33, Santiago de Compostela",
                "Open daily 9:00am – 7:00pm (extended hours in summer)",
                "Queue can be 1-3 hours in peak season — arrive at opening or in afternoon",
                "Bring your credencial with all required stamps",
                "You'll be asked your motivation (religious/spiritual vs. tourist)",
                "The certificate is FREE",
                "A distance certificate ('Certificado de Distancia') is also available for any distance walked",
              ].map((step, i) => (
                <div key={i} className="flex items-start space-x-2 text-sm text-gray-600">
                  <span className="text-camino-blue font-bold shrink-0">{i + 1}.</span>
                  <span>{step}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-camino-blue/5 rounded-2xl p-5 border border-camino-blue/10">
            <p className="text-xs font-bold text-camino-blue uppercase tracking-wider mb-2">Pilgrim Mass</p>
            <p className="text-sm text-gray-700 leading-relaxed">The Pilgrim Mass is celebrated daily at <strong>12:00 noon</strong> in the Cathedral of Santiago de Compostela. Pilgrims' nationalities and start points from the previous day are announced. The Botafumeiro (giant incense burner) swings when funded. Arrive 45 minutes early for a seat. This mass is the spiritual culmination of the Camino.</p>
          </div>
        </div>
      )}

      {/* ETIQUETTE */}
      {active === "etiquette" && (
        <div className="space-y-4">
          <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Albergue Rules</p>
            <ul className="space-y-2.5">
              {[
                { rule: "Lights out at 10pm", detail: "Respect quiet hours. Use headlamp on lowest setting only." },
                { rule: "Rise quietly at 5-6am", detail: "Others may not be starting so early. Pack the night before." },
                { rule: "Don't monopolize shared spaces", detail: "Kitchen, bathrooms, charging points — share everything." },
                { rule: "Leave bunk area tidy", detail: "Strip your sleeping liner, leave no rubbish." },
                { rule: "Shoes off / wet gear outside", detail: "Wet boots in the dorm cause everyone's gear to smell." },
                { rule: "Shower promptly (10 min max)", detail: "50 pilgrims, often 4 showers. Be quick." },
                { rule: "No cooking smells at night", detail: "Many albergues prohibit cooking after 9pm." },
              ].map((item, i) => (
                <div key={i} className="flex items-start space-x-3">
                  <span className="text-camino-gold shrink-0 mt-0.5">•</span>
                  <div>
                    <p className="text-sm font-semibold text-gray-700">{item.rule}</p>
                    <p className="text-xs text-gray-500">{item.detail}</p>
                  </div>
                </div>
              ))}
            </ul>
          </div>

          <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Trail Etiquette</p>
            <ul className="space-y-2.5">
              {[
                { rule: "Greet every pilgrim: 'Buen Camino!'", detail: "This is the Camino's universal greeting. Always use it." },
                { rule: "Don't leave litter on the trail", detail: "Pack it out. Leave the Camino cleaner than you found it." },
                { rule: "Respect private property", detail: "Don't walk through farmland or camp on private land." },
                { rule: "Don't play music out loud on trail", detail: "The silence is a gift. Use headphones or walk without." },
                { rule: "Don't 'save' beds for friends", detail: "Albergues are first-come basis. This causes real conflict." },
                { rule: "Walk in silence through villages at dawn", detail: "Local residents are sleeping." },
              ].map((item, i) => (
                <div key={i} className="flex items-start space-x-3">
                  <span className="text-camino-gold shrink-0 mt-0.5">•</span>
                  <div>
                    <p className="text-sm font-semibold text-gray-700">{item.rule}</p>
                    <p className="text-xs text-gray-500">{item.detail}</p>
                  </div>
                </div>
              ))}
            </ul>
          </div>

          <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">The Pilgrim Mindset</p>
            <p className="text-sm text-gray-700 leading-relaxed italic font-serif text-camino-blue">
              "The Camino doesn't care how fast you walk. It cares how present you are. Slow down. Talk to the person beside you. Sit at the fountain. Watch the sunset from the hill. The destination is Santiago. The Camino is everywhere else."
            </p>
          </div>
        </div>
      )}

      {/* FAQ */}
      {active === "faq" && (
        <div className="space-y-2">
          {FAQ_ITEMS.map((item, i) => (
            <div key={i} className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
              <button
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                className="w-full flex items-start justify-between p-4 text-left space-x-3"
              >
                <p className="text-sm font-semibold text-camino-blue leading-snug flex-1">{item.q}</p>
                {openFaq === i
                  ? <ChevronUp className="w-4 h-4 text-gray-400 shrink-0 mt-0.5" />
                  : <ChevronDown className="w-4 h-4 text-gray-400 shrink-0 mt-0.5" />
                }
              </button>
              {openFaq === i && (
                <div className="px-4 pb-4 border-t border-gray-50">
                  <p className="text-sm text-gray-600 leading-relaxed pt-3">{item.a}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* SPANISH PHRASES */}
      {active === "phrases" && (
        <div className="space-y-3">
          <p className="text-sm text-gray-500 mb-4">Essential phrases for the Camino. Learning even a few will transform your experience with locals.</p>
          {SPANISH_PHRASES.map((p, i) => (
            <div key={i} className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
              <p className="font-serif text-lg text-camino-blue font-semibold">{p.phrase}</p>
              <p className="text-sm text-gray-600 mt-1">{p.translation}</p>
              <p className="text-xs text-camino-earth font-mono mt-1.5 bg-camino-sand/50 px-2 py-0.5 rounded inline-block">{p.phonetic}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

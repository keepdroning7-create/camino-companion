export interface Accommodation {
  name: string;
  type: "municipal" | "private" | "donativo" | "monastery" | "hotel";
  beds: number;
  priceEur: number | "donation";
  phone?: string;
  bookable: boolean;
}

export interface PracticalInfo {
  difficulty: "easy" | "moderate" | "hard" | "very_hard";
  terrain: string;
  waterPoints: string[];
  services: string[];
  highlights: string[];
  warnings?: string[];
  tipOfTheDay: string;
}

export interface Stage {
  id: string;
  day: number;
  start: string;
  end: string;
  distance: number; // km
  elevationGain: number; // m
  elevationLoss: number; // m
  coordinates: [number, number]; // [lat, lng] of the end point
  devotion: {
    title: string;
    scripture: string;
    reflection: string;
    prayer: string;
    audioDuration: string;
  };
  accommodation: Accommodation[];
  practical: PracticalInfo;
}

export interface CaminoRoute {
  id: string;
  name: string;
  description: string;
  totalDistance: number;
  totalDays: number;
  startLocation: string;
  startCoordinates: [number, number];
  stages: Stage[];
}

export const CAMINO_ROUTES: CaminoRoute[] = [
  {
    id: "frances",
    name: "Camino Francés",
    description: "The most popular and famous route, starting in the French Pyrenees.",
    totalDistance: 779,
    totalDays: 33,
    startLocation: "St. Jean Pied de Port",
    startCoordinates: [43.1635, -1.2374],
    stages: [
      {
        id: "frances-1",
        day: 1,
        start: "St. Jean Pied de Port",
        end: "Roncesvalles",
        distance: 25.1,
        elevationGain: 1250,
        elevationLoss: 450,
        coordinates: [43.0094, -1.3197],
        devotion: {
          title: "The Journey Begins",
          scripture: "Genesis 12:1 — 'Go from your country, your people and your father's household to the land I will show you.'",
          reflection: "Every pilgrimage begins with a departure. As you climb the Pyrenees today, you leave behind the comfort of the familiar. The physical strain mirrors the spiritual effort required to detach from daily worries and open yourself to God's voice. The two possible routes — Napoleon Pass and Valcarlos — remind us that there are many paths to the same destination. Choose according to your condition and the weather, not pride.",
          prayer: "Lord, grant me the strength for today's climb. As I leave my home behind, help me to walk towards You. Protect my steps and open my heart to the lessons of this journey. Amen.",
          audioDuration: "12:45"
        },
        accommodation: [
          { name: "Real Colegiata de Roncesvalles", type: "monastery", beds: 183, priceEur: 15, phone: "+34 948 760 000", bookable: true },
          { name: "Casa Sabina", type: "private", beds: 18, priceEur: 35, bookable: true },
          { name: "Hotel Roncesvalles", type: "hotel", beds: 26, priceEur: 55, bookable: true }
        ],
        practical: {
          difficulty: "very_hard",
          terrain: "Mountain paths, rocky trails, some asphalt",
          waterPoints: ["St. Jean: before departure (fill up!)", "Orisson (8km) — last reliable water on Napoleon route", "Refuge d'Orisson fountain"],
          services: ["Pilgrim office in St. Jean (get credencial here)", "Supermarket in St. Jean", "Restaurant/bar in Orisson (mid-route)", "Full services in Roncesvalles"],
          highlights: ["Col de Bentarte viewpoint (1357m)", "Boarder crossing into Spain", "Collegiate church of Roncesvalles", "Roland's battle site"],
          warnings: ["WEATHER: In bad weather/snow take the Valcarlos lower route (D34). Check weather before departing.", "The Napoleon Pass can be dangerous in winter and fog. Ask at Pilgrim Office.", "Start early — 25km with heavy climbing takes 7-9 hours."],
          tipOfTheDay: "Get your credencial (pilgrim passport) at the Pilgrim Office on Rue de la Citadelle before you start. Without it, you cannot collect stamps and will not receive the Compostela in Santiago."
        }
      },
      {
        id: "frances-2",
        day: 2,
        start: "Roncesvalles",
        end: "Zubiri",
        distance: 21.4,
        elevationGain: 350,
        elevationLoss: 700,
        coordinates: [42.9306, -1.5036],
        devotion: {
          title: "Finding the Rhythm",
          scripture: "Psalm 119:105 — 'Your word is a lamp for my feet, a light on my path.'",
          reflection: "After the dramatic crossing of the mountains, today's path through the beech forests of Navarre requires a different endurance — finding your rhythm. In our spiritual lives, dramatic conversion moments must give way to the steady, daily rhythm of walking with Christ. The forest is quiet, the path is clear. Learn to trust the yellow arrows.",
          prayer: "Jesus, be my companion on this path. When the descent is steep and my knees ache, remind me that You walked the rocky paths of Galilee. Teach me to find peace in steady prayer. Amen.",
          audioDuration: "10:20"
        },
        accommodation: [
          { name: "Albergue de Zubiri", type: "private", beds: 30, priceEur: 14, phone: "+34 948 304 329", bookable: false },
          { name: "Albergue Zaldiko", type: "private", beds: 50, priceEur: 14, bookable: true },
          { name: "Albergue El Palo de Avellano", type: "private", beds: 28, priceEur: 13, bookable: false }
        ],
        practical: {
          difficulty: "moderate",
          terrain: "Forest paths, some rocky descent, one river crossing",
          waterPoints: ["Burguete fountain (3km)", "Espinal bar (6km)", "Viskarret fountain", "Zubiri fountain"],
          services: ["Bar/cafe in Burguete", "Small shop in Espinal", "Restaurant and pharmacy in Zubiri", "Supermarket in Zubiri"],
          highlights: ["Beech forest of Erro Valley", "Medieval bridge 'Puente de la Rabia' in Zubiri", "Rolling green hills of Navarre"],
          warnings: ["The steep descent after Roncesvalles can be hard on knees — use trekking poles.", "Ankle sprains are common on rocky sections."],
          tipOfTheDay: "Treat your blisters tonight — not tomorrow. Compeed plasters, needle sterilized with flame, dry and tape. Prevention is better: Vaseline on feet before walking."
        }
      },
      {
        id: "frances-3",
        day: 3,
        start: "Zubiri",
        end: "Pamplona",
        distance: 20.4,
        elevationGain: 200,
        elevationLoss: 350,
        coordinates: [42.8125, -1.6458],
        devotion: {
          title: "Entering the City",
          scripture: "Hebrews 13:14 — 'For here we do not have an enduring city, but we are looking for the city that is to come.'",
          reflection: "Today you arrive in Pamplona, the first major city on the Camino. The noise and bustle can be jarring after the quiet of the mountains. How do we maintain inner peace when surrounded by the world's distractions? The pilgrim learns to carry the silence of the trail into the heart of the city. Walk through the old gate and feel history beneath your feet.",
          prayer: "Holy Spirit, guard my inner peace. As I enter the noise of the city, let me not lose the quiet voice I heard in the mountains. Help me to see Your face in the crowds. Amen.",
          audioDuration: "14:10"
        },
        accommodation: [
          { name: "Albergue Jesús y María", type: "private", beds: 114, priceEur: 10, phone: "+34 948 222 644", bookable: false },
          { name: "Albergue Municipal Casa Paderborn", type: "municipal", beds: 24, priceEur: 8, bookable: false },
          { name: "Albergue Hemingway", type: "private", beds: 24, priceEur: 16, bookable: true }
        ],
        practical: {
          difficulty: "easy",
          terrain: "Quiet roads, forest paths, city streets",
          waterPoints: ["Trinidad de Arre fountain", "Villava fountain", "Multiple fountains in Pamplona"],
          services: ["Full city services in Pamplona", "Hospital de Navarra (emergency)", "Pilgrim office at Casa del Peregrino", "Multiple supermarkets, pharmacies, gear shops"],
          highlights: ["Trinidad de Arre medieval bridge and chapel", "Pamplona's old city walls", "Plaza del Castillo", "Cathedral of Pamplona (13th century)"],
          warnings: ["During San Fermín (July 6-14) the city is packed and albergues fill by 8am.", "Pamplona is a rest day opportunity — visit the cathedral, get provisions."],
          tipOfTheDay: "The Pamplona Pilgrim Office (Casa del Peregrino, C/Ansoleaga 2) is open daily. Get your credencial stamped, check in, and they can answer route questions."
        }
      },
      {
        id: "frances-4",
        day: 4,
        start: "Pamplona",
        end: "Puente la Reina",
        distance: 24.2,
        elevationGain: 350,
        elevationLoss: 400,
        coordinates: [42.6723, -1.8135],
        devotion: {
          title: "Crossing the Hill of Forgiveness",
          scripture: "Romans 8:1 — 'There is now no condemnation for those who are in Christ Jesus.'",
          reflection: "The Alto del Perdón — Hill of Forgiveness — is one of the Camino's most iconic moments. The ridge of metal pilgrims marks thousands of years of people walking toward grace. As you cross it and see for the first time the wide plain of Navarre spreading toward Burgos, something shifts. What are you carrying that you need to leave on that hilltop?",
          prayer: "Father of mercies, on this hill of forgiveness I lay down the weight of my guilt, my failures, and my regrets. I receive Your forgiveness freely given through Christ. Help me to walk lighter from this place. Amen.",
          audioDuration: "13:00"
        },
        accommodation: [
          { name: "Albergue Jakue", type: "private", beds: 150, priceEur: 12, phone: "+34 948 341 017", bookable: true },
          { name: "Albergue Padres Reparadores", type: "monastery", beds: 100, priceEur: 10, bookable: false },
          { name: "Albergue El Cerco", type: "private", beds: 28, priceEur: 15, bookable: true }
        ],
        practical: {
          difficulty: "moderate",
          terrain: "Paved road, then rough mountain path to Alto del Perdón, descent to valley",
          waterPoints: ["Cizur Menor fountain", "Last water before Alto: Zariquiegui village", "Muruzábal fountain", "Puente la Reina multiple fountains"],
          services: ["Café/bar in Cizur Menor", "Bar in Zariquiegui (just before the climb)", "Full services in Puente la Reina", "Pharmacy in Puente la Reina"],
          highlights: ["Alto del Perdón (780m) — iron pilgrim silhouettes monument", "Panoramic view over Pamplona basin", "Puente la Reina's 11th-century Romanesque bridge", "Church of Santiago in Puente la Reina"],
          warnings: ["Alto del Perdón is windy and exposed — the descent is rough and steep with loose stones.", "No water for 12km from Zariquiegui to Muruzábal — carry 1.5L minimum."],
          tipOfTheDay: "At Puente la Reina, the Camino Aragonés joins. You will notice more pilgrims from this point. The Romanesque bridge at sunset is unmissable — it was rebuilt to carry medieval pilgrims and still carries you today."
        }
      },
      {
        id: "frances-5",
        day: 5,
        start: "Puente la Reina",
        end: "Estella",
        distance: 22.4,
        elevationGain: 300,
        elevationLoss: 280,
        coordinates: [42.6717, -2.0328],
        devotion: {
          title: "The Wine Fountain",
          scripture: "John 15:5 — 'I am the vine; you are the branches.'",
          reflection: "Near Irache, a Benedictine winery maintains a fountain that offers pilgrims a free glass of wine alongside water. It is a small, delightful grace — unexpected gift on a dusty path. How often does God place gifts along our way that we rush past? Today, slow down. Notice the vineyards, the medieval villages, the warmth of a stranger's smile. Every gift is a reminder of the Giver.",
          prayer: "Lord of all good gifts, open my eyes today to the small graces along this path. As I walk through these ancient vineyards, remind me that I am grafted into You. Amen.",
          audioDuration: "11:30"
        },
        accommodation: [
          { name: "Albergue ANFAS", type: "municipal", beds: 96, priceEur: 10, bookable: false },
          { name: "Albergue Rocamador", type: "private", beds: 64, priceEur: 14, bookable: true },
          { name: "Albergue Oncineda (monks)", type: "monastery", beds: 60, priceEur: 10, bookable: false }
        ],
        practical: {
          difficulty: "easy",
          terrain: "Quiet country roads, vineyard paths, gentle hills",
          waterPoints: ["Mañeru fountain", "Cirauqui fountain", "Irache Bodega wine + water fountain (FREE!)", "Villamayor de Monjardín", "Estella multiple"],
          services: ["Bar in Cirauqui", "Bodega Irache wine fountain (open 8am-8pm, free)", "Full services in Estella including hospital"],
          highlights: ["Cirauqui: ancient hilltop village with Roman road", "Bodega Irache wine fountain", "Monjardín castle ruins", "Estella's Royal Palace of the Kings of Navarre"],
          warnings: ["The wine fountain is for a taste, not unlimited drinking — you have more walking to do!", "Cirauqui's exit via Roman road is beautiful but slippery when wet."],
          tipOfTheDay: "Estella (Lizarra) is a great town for a rest day. The Pilgrim Office stamps, the central market has excellent local food, and the 12th-century San Pedro de la Rúa church is stunning."
        }
      },
      {
        id: "frances-6",
        day: 6,
        start: "Estella",
        end: "Los Arcos",
        distance: 21.5,
        elevationGain: 450,
        elevationLoss: 480,
        coordinates: [42.5690, -2.1992],
        devotion: {
          title: "The Simplicity of Walking",
          scripture: "Matthew 6:34 — 'Do not worry about tomorrow, for tomorrow will worry about itself.'",
          reflection: "The Camino's daily rhythm strips life to its essentials: walk, eat, sleep, pray. On today's rolling path through Navarre's southern plains, let the simplicity be a teacher. You don't need to solve tomorrow's problems today. You only need to take the next step. The yellow arrow will show you where to go.",
          prayer: "God of the present moment, free me from the anxiety of tomorrow. Teach me to trust that each step forward is enough. Amen.",
          audioDuration: "10:15"
        },
        accommodation: [
          { name: "Albergue Isaac Santiago", type: "donativo", beds: 40, priceEur: "donation", bookable: false },
          { name: "Albergue Casa de la Abuela", type: "private", beds: 20, priceEur: 14, bookable: true },
          { name: "Albergue de Los Arcos", type: "municipal", beds: 60, priceEur: 8, bookable: false }
        ],
        practical: {
          difficulty: "moderate",
          terrain: "Dirt paths, some asphalt, rolling hills with long exposed sections",
          waterPoints: ["Azqueta fountain (6km)", "Villamayor fountain (9km)", "Los Arcos multiple"],
          services: ["Bar in Azqueta", "Small shop in Los Arcos", "Pharmacy in Los Arcos"],
          highlights: ["Church of Santa María in Los Arcos (stunning interior)", "Rolling golden hills of Navarre", "Sunset views over the meseta"],
          warnings: ["Very exposed section in summer heat. Start early — by 6:30am if possible.", "Limited shade and water between Estella and Azqueta (9km)."],
          tipOfTheDay: "Donativo albergues (donation-based) are often the most authentic Camino experiences. The hospitaleros volunteer their time. Leave what you can — €5-10 is typical."
        }
      },
      {
        id: "frances-7",
        day: 7,
        start: "Los Arcos",
        end: "Logroño",
        distance: 28.1,
        elevationGain: 280,
        elevationLoss: 350,
        coordinates: [42.4650, -2.4456],
        devotion: {
          title: "Crossing into La Rioja",
          scripture: "Isaiah 43:19 — 'See, I am doing a new thing! Now it springs up; do you not perceive it?'",
          reflection: "Today you cross from Navarre into La Rioja, Spain's great wine region. Crossing borders — geographical or personal — is an act of trust. The Ebro River at Logroño marks the transition. What old patterns, old ways of thinking, are you being invited to leave on the other side?",
          prayer: "Lord of all transitions, as I cross into new territory today, help me to be open to the new things You are doing in my life. Amen.",
          audioDuration: "11:00"
        },
        accommodation: [
          { name: "Albergue Municipal de Logroño", type: "municipal", beds: 88, priceEur: 8, phone: "+34 941 260 645", bookable: false },
          { name: "Albergue Logroño", type: "private", beds: 76, priceEur: 14, bookable: true },
          { name: "La Laurel Albergue", type: "private", beds: 30, priceEur: 16, bookable: true }
        ],
        practical: {
          difficulty: "moderate",
          terrain: "Dirt track, road sections, cobblestone city entry",
          waterPoints: ["Sansol fountain", "Torres del Río fountain", "Viana multiple fountains", "Logroño city fountains"],
          services: ["Full services in Viana (town before Logroño)", "Logroño: large city, all services, hospital, gear shops", "Mercadona supermarket in Logroño"],
          highlights: ["Viana: beautiful medieval town, tomb of Cesare Borgia", "Stone bridge over the Ebro entering Logroño", "Logroño's Calle Laurel (famous pintxos street)", "Cathedral of La Redonda"],
          warnings: ["Logroño is a large city — navigation can be confusing. Follow yellow arrows carefully through industrial zones.", "Stock up here for the Meseta ahead — last big city for several days."],
          tipOfTheDay: "Logroño's Calle del Laurel is the best pintxos street on the entire Camino Francés. Budget €10-15 for an evening of small plates and local Rioja wine. You've earned it."
        }
      },
      {
        id: "frances-8",
        day: 8,
        start: "Logroño",
        end: "Nájera",
        distance: 29.4,
        elevationGain: 250,
        elevationLoss: 280,
        coordinates: [42.4161, -2.7323],
        devotion: {
          title: "Lake and Desert",
          scripture: "Psalm 23:2 — 'He makes me lie down in green pastures, he leads me beside quiet waters.'",
          reflection: "The path takes you alongside Grajera Lake in the morning — a moment of beauty before the industrial outskirts of Logroño. Then it becomes a long, exposed dirt track through vineyards. Life alternates like this: consolation and desolation, green pastures and dry paths. Both are part of the journey. Both are held by the same Shepherd.",
          prayer: "Good Shepherd, in the green moments of this day I will praise You. In the dry and exposed stretches, I will trust You. Lead me through both. Amen.",
          audioDuration: "10:45"
        },
        accommodation: [
          { name: "Albergue Municipal de Nájera", type: "municipal", beds: 90, priceEur: 8, bookable: false },
          { name: "Albergue El Peregrino de Nájera", type: "private", beds: 22, priceEur: 15, bookable: true },
          { name: "Albergue Puerta de Nájera", type: "private", beds: 24, priceEur: 14, bookable: true }
        ],
        practical: {
          difficulty: "easy",
          terrain: "Park path, then long exposed dirt track through vineyards, flat to gentle",
          waterPoints: ["Grajera Park fountain", "Navarrete fountain (halfway)", "Nájera multiple"],
          services: ["Bar/café in Navarrete", "Pharmacy in Navarrete", "Full services in Nájera"],
          highlights: ["Grajera Reservoir park", "Navarrete: beautiful hilltop village with pottery tradition", "Nájera's cliff-cut monastery of Santa María la Real", "Red rock cliffs of Nájera"],
          warnings: ["Very exposed section in summer — this is the La Rioja heat. Carry 2L of water from Navarrete.", "Start walking before 7am to beat the worst heat."],
          tipOfTheDay: "Navarrete (halfway) has a pottery tradition dating to Roman times. The local ceramics make beautiful but heavy souvenirs — consider mailing home rather than carrying."
        }
      },
      {
        id: "frances-9",
        day: 9,
        start: "Nájera",
        end: "Santo Domingo de la Calzada",
        distance: 21.2,
        elevationGain: 150,
        elevationLoss: 120,
        coordinates: [42.4400, -2.9537],
        devotion: {
          title: "The Miracle of the Rooster",
          scripture: "Luke 18:7 — 'Will not God bring about justice for his chosen ones, who cry out to him day and night?'",
          reflection: "Santo Domingo de la Calzada is famous for the miracle of the hanged innocent pilgrim — and the rooster and hen kept in the cathedral to this day. It is a story of divine justice arriving late, but arriving. In our own lives, we cry out for justice, for healing, for rescue. The Camino teaches patience. God's timing is not our timing, but His justice is real.",
          prayer: "God of justice and mercy, when I feel unheard, help me to persist in prayer like the widow in Your parable. I trust that You see, and that You will act. Amen.",
          audioDuration: "12:00"
        },
        accommodation: [
          { name: "Albergue de la Abadía Cistercense", type: "monastery", beds: 30, priceEur: 10, bookable: false },
          { name: "Casa del Santo (Cathedral)", type: "private", beds: 26, priceEur: 55, bookable: true },
          { name: "Albergue Municipal", type: "municipal", beds: 120, priceEur: 8, bookable: false }
        ],
        practical: {
          difficulty: "easy",
          terrain: "Mostly flat dirt track through vineyards and wheat fields",
          waterPoints: ["Azofra fountain (halfway)", "Santo Domingo multiple fountains"],
          services: ["Bar in Azofra", "Full services in Santo Domingo", "Hospital de la Calzada"],
          highlights: ["Santo Domingo Cathedral with live rooster and hen in a glass cage inside!", "El Santo Domingo's tomb in the cathedral", "Azofra: lovely village with good bars", "Medieval pilgrim hospital (now Parador hotel)"],
          warnings: [],
          tipOfTheDay: "Visit the Cathedral of Santo Domingo de la Calzada in the evening for a peaceful experience. The live chicken and rooster living inside the cathedral are a genuine medieval tradition — and a Camino must-see."
        }
      },
      {
        id: "frances-10",
        day: 10,
        start: "Santo Domingo de la Calzada",
        end: "Belorado",
        distance: 23.0,
        elevationGain: 200,
        elevationLoss: 190,
        coordinates: [42.4195, -3.1903],
        devotion: {
          title: "Entering Castile",
          scripture: "Deuteronomy 8:2 — 'Remember how the Lord your God led you all the way in the wilderness these forty years.'",
          reflection: "Today you cross from La Rioja into Castile and León — the great central plateau of Spain. The landscape opens up into vast wheat fields. The emptiness can feel daunting, but the ancient Israelites found God in the wilderness. Sometimes the wide, open, apparently empty places are where we hear most clearly.",
          prayer: "God of the wilderness, as this landscape opens before me, open my heart too. Strip away the noise and let me hear Your voice in the wide silence. Amen.",
          audioDuration: "10:30"
        },
        accommodation: [
          { name: "Albergue A Santiago", type: "private", beds: 38, priceEur: 13, bookable: true },
          { name: "Albergue El Corro", type: "private", beds: 26, priceEur: 14, bookable: true },
          { name: "Albergue Belorado", type: "municipal", beds: 36, priceEur: 8, bookable: false }
        ],
        practical: {
          difficulty: "easy",
          terrain: "Mostly flat dirt track along the N-120, then open Castilian plain",
          waterPoints: ["Grañón fountain (3km)", "Belorado multiple"],
          services: ["Bar/café in Grañón", "Pharmacy and supermarket in Belorado"],
          highlights: ["Grañón: tiny village with excellent donativo albergue", "Boundary cross between La Rioja and Castile", "Belorado's caves in the cliff face behind the church"],
          warnings: ["Long, exposed section without shade or services (15km). Load up on water and food in Grañón."],
          tipOfTheDay: "The donativo albergue in Grañón (just 3km from Santo Domingo) is run by a volunteer community and is one of the most beloved on the entire Camino. Consider stopping here for lunch even if you're continuing to Belorado."
        }
      },
      {
        id: "frances-11",
        day: 11,
        start: "Belorado",
        end: "San Juan de Ortega",
        distance: 24.7,
        elevationGain: 550,
        elevationLoss: 300,
        coordinates: [42.3703, -3.4256],
        devotion: {
          title: "The Forest of Oca",
          scripture: "Psalm 46:10 — 'Be still, and know that I am God.'",
          reflection: "The ancient Forest of Oca is dark and beautiful, a world apart from the open plains. In the dim quiet of the forest, the Camino slows us down. The saint whose hermitage awaits at the end — San Juan de Ortega — spent decades alone here building bridges for pilgrims. Service done in obscurity, for love alone, is the most Christlike service there is.",
          prayer: "Lord of forest and silence, still my racing mind today. In the dark and quiet, let me know that You are God. Give me a servant's heart like Juan de Ortega. Amen.",
          audioDuration: "11:45"
        },
        accommodation: [
          { name: "Albergue San Juan de Ortega (monastery)", type: "monastery", beds: 60, priceEur: 10, bookable: false },
          { name: "Rural Casa Zaldua (Villafranca Montes de Oca)", type: "private", beds: 12, priceEur: 16, bookable: true }
        ],
        practical: {
          difficulty: "moderate",
          terrain: "Flat to Villafranca, then forest climb through Montes de Oca, rocky descent",
          waterPoints: ["Villafranca Montes de Oca (halfway, last before forest)", "San Juan de Ortega"],
          services: ["Bar and small shop in Villafranca Montes de Oca", "Very limited services at San Juan de Ortega (bar and albergue only)"],
          highlights: ["Villafranca Montes de Oca: 12th-century pilgrim hospital ruins", "Forest of Oca: ancient, mysterious, beautiful", "Romanesque church of San Juan de Ortega", "Light effect in the church on spring/autumn equinox"],
          warnings: ["Stock up on food and water in Villafranca — San Juan de Ortega has almost nothing.", "The forest path can be muddy after rain. Gaiters recommended."],
          tipOfTheDay: "San Juan de Ortega monastery offers simple accommodation with an optional communal supper blessed by the monks. This is one of the most spiritually powerful stops on the Camino. If you're here at autumn equinox (Sept 21), watch the light beam illuminate the Annunciation capital in the church at noon."
        }
      },
      {
        id: "frances-12",
        day: 12,
        start: "San Juan de Ortega",
        end: "Burgos",
        distance: 26.5,
        elevationGain: 200,
        elevationLoss: 450,
        coordinates: [42.3440, -3.6969],
        devotion: {
          title: "The Cathedral City",
          scripture: "1 Kings 8:27 — 'But will God really dwell on earth? The heavens, even the highest heaven, cannot contain you.'",
          reflection: "Burgos Cathedral is one of the most magnificent Gothic buildings in the world — a human attempt to express the inexpressible. Walking into it after days on the trail, exhausted and humbled, changes the experience. We know now that stone and gold are not where God lives. He lives in the walking, the blisters, the shared meal, the stranger who becomes a friend.",
          prayer: "God who cannot be contained in cathedrals but chooses to dwell in us — thank You for the reminder that You walk with me on every road, not just the beautiful ones. Amen.",
          audioDuration: "13:30"
        },
        accommodation: [
          { name: "Albergue Municipal de Burgos", type: "municipal", beds: 150, priceEur: 8, phone: "+34 947 460 922", bookable: false },
          { name: "Albergue Divina Pastora", type: "private", beds: 26, priceEur: 12, bookable: false },
          { name: "Albergue Casa Slowway", type: "private", beds: 46, priceEur: 16, bookable: true }
        ],
        practical: {
          difficulty: "moderate",
          terrain: "Dirt track through villages, then long industrial suburbs, finally historic center",
          waterPoints: ["Ages fountain (start)", "Atapuerca village", "Orbaneja fountain", "Multiple in Burgos"],
          services: ["Full city: hospital, pharmacy, supermarkets, gear shops (Decathlon), bank", "Pilgrim office at Casa del Cordón"],
          highlights: ["Atapuerca: UNESCO World Heritage prehistoric cave site (oldest human remains in Europe)", "Burgos Cathedral (UNESCO) — El Cid's tomb inside", "Monastry of Las Huelgas", "Old city along the Arlanzón river"],
          warnings: ["The industrial approach to Burgos along the highway is grim and unavoidable. Put your headphones in and push through.", "Burgos is a good 'laundry and resupply' stop. Gear shops and pharmacies are excellent."],
          tipOfTheDay: "Burgos deserves a rest day. The Cathedral alone takes 2 hours. The Museum of Human Evolution (Atapuerca finds) is world-class and free. If you have blisters, there is an excellent pilgrim clinic (Clínica Universitaria) near the cathedral."
        }
      },
      {
        id: "frances-13",
        day: 13,
        start: "Burgos",
        end: "Hontanas",
        distance: 31.5,
        elevationGain: 200,
        elevationLoss: 300,
        coordinates: [42.2719, -4.0094],
        devotion: {
          title: "The Meseta Begins",
          scripture: "Lamentations 3:26 — 'It is good to wait quietly for the salvation of the Lord.'",
          reflection: "The Meseta — the great high plateau of Castile — begins today. Many pilgrims skip it by bus. This is a mistake. The Meseta is the Camino's desert, its interior journey. When the landscape holds nothing new for the eyes, the soul turns inward. Silence becomes prayer. Boredom becomes contemplation. The Meseta is where the real Camino happens.",
          prayer: "God of the vast and empty, I will not flee from the silence You have placed before me. Teach me to wait. Teach me to simply be in Your presence without needing to be entertained. Amen.",
          audioDuration: "12:15"
        },
        accommodation: [
          { name: "Albergue Juan de Yepes", type: "private", beds: 30, priceEur: 13, bookable: true },
          { name: "Albergue El Puntido", type: "private", beds: 24, priceEur: 12, bookable: false },
          { name: "Albergue Hontanas", type: "municipal", beds: 40, priceEur: 8, bookable: false }
        ],
        practical: {
          difficulty: "moderate",
          terrain: "Flat to rolling, exposed plateau, mainly dirt track",
          waterPoints: ["Tardajos fountain (8km)", "Rabé de las Calzadas (11km)", "Hontanas (31km — plan accordingly)"],
          services: ["Bar and fountain in Tardajos", "Bar in Rabé de las Calzadas", "Limited services in Hontanas"],
          highlights: ["First views of the vast Castilian Meseta", "Hontanas: village hidden in a valley, appearing suddenly like an oasis", "Wheat field horizons stretching 50km"],
          warnings: ["31.5km with almost no services after km 11. Carry 2L water and food from Burgos or Tardajos.", "This stage can be brutal in summer heat. Most pilgrims start at 5:30am."],
          tipOfTheDay: "Hontanas is a hidden gem — a tiny medieval village invisible until you're 100m from it. The albergue here is known for warmth and community. Have a beer at sunset and watch the swallows."
        }
      },
      {
        id: "frances-14",
        day: 14,
        start: "Hontanas",
        end: "Boadilla del Camino",
        distance: 28.5,
        elevationGain: 100,
        elevationLoss: 200,
        coordinates: [42.2831, -4.4275],
        devotion: {
          title: "Ruins Along the Way",
          scripture: "Isaiah 61:4 — 'They will rebuild the ancient ruins and restore the places long devastated.'",
          reflection: "Today's path passes the ruins of San Antón monastery — its Gothic arch still standing over the road, once a hospital for pilgrims with ergotism. What looked like abandonment became a monument. Our personal ruins — the broken relationships, the failed plans, the abandoned dreams — are not the end of the story. God is the great restorer.",
          prayer: "God of restoration, walk with me through the ruins of my own life today. Show me that nothing is beyond Your power to redeem and rebuild. Amen.",
          audioDuration: "11:00"
        },
        accommodation: [
          { name: "Albergue En el Camino", type: "private", beds: 58, priceEur: 13, phone: "+34 979 810 284", bookable: true },
          { name: "Albergue Boadilla del Camino", type: "municipal", beds: 30, priceEur: 7, bookable: false }
        ],
        practical: {
          difficulty: "easy",
          terrain: "Flat Meseta plateau, good dirt track, passes through Castrojeriz",
          waterPoints: ["Castrojeriz multiple fountains (15km)", "Canal de Castilla water point", "Boadilla fountain"],
          services: ["Full services in Castrojeriz (midpoint)", "Small bar in Boadilla", "Pharmacy in Castrojeriz"],
          highlights: ["Ruins of Convento de San Antón — Gothic arch over the road", "Castrojeriz: fascinating long medieval village along a ridge", "Castrojeriz castle ruins", "Boadilla's carved Rollo (medieval judicial column)"],
          warnings: ["After Castrojeriz, steep but short climb up to the plateau, then very flat and exposed for 12km."],
          tipOfTheDay: "Castrojeriz is spread along 1.5km of road. The Church of Santa María del Manzano has exceptional Romanesque-Gothic sculpture. Have lunch here and stock up — Boadilla has minimal services."
        }
      },
      {
        id: "frances-15",
        day: 15,
        start: "Boadilla del Camino",
        end: "Carrión de los Condes",
        distance: 25.0,
        elevationGain: 150,
        elevationLoss: 130,
        coordinates: [42.3383, -4.6026],
        devotion: {
          title: "The Halfway Point",
          scripture: "Philippians 3:13 — 'Forgetting what is behind and straining toward what is ahead.'",
          reflection: "You are approaching the halfway point of the Camino Francés. Take stock: What have you left behind? What has the first half taught you? The temptation at the halfway mark is either to be proud of how far you've come or discouraged by how far remains. Both miss the truth: you are exactly where you need to be, today.",
          prayer: "Lord, help me neither to cling to the past stages nor fear the ones ahead. Let today's walking be enough. Amen.",
          audioDuration: "10:45"
        },
        accommodation: [
          { name: "Albergue Santa María (Benedictine nuns)", type: "monastery", beds: 70, priceEur: "donation", bookable: false },
          { name: "Albergue Espíritu Santo", type: "private", beds: 54, priceEur: 13, bookable: true },
          { name: "Albergue El Resbalón", type: "private", beds: 30, priceEur: 14, bookable: true }
        ],
        practical: {
          difficulty: "easy",
          terrain: "Canal towpath, then flat road and track to Carrión",
          waterPoints: ["Canal de Castilla towpath (taps at lock houses)", "Frómista fountain (7km)", "Multiple in Carrión"],
          services: ["Full services in Frómista", "Full services in Carrión: pharmacy, supermarket, hospital"],
          highlights: ["Frómista's San Martín church — perfect Romanesque architecture, one of Spain's finest", "Canal de Castilla towpath — peaceful walking along historic canal", "Carrión de los Condes monastery of Santa Clara (Benedictine nuns, great hospitality)"],
          warnings: [],
          tipOfTheDay: "The Benedictine sisters at Santa María in Carrión offer a pilgrim blessing and pilgrim mass. The albergue is donation-based and wonderful. Even if you sleep elsewhere, attend their evening pilgrim blessing at 7pm."
        }
      },
      {
        id: "frances-16",
        day: 16,
        start: "Carrión de los Condes",
        end: "Terradillos de los Templarios",
        distance: 26.3,
        elevationGain: 100,
        elevationLoss: 120,
        coordinates: [42.3492, -4.9328],
        devotion: {
          title: "The Long Straight Road",
          scripture: "Romans 5:3-4 — 'We also glory in our sufferings, because we know that suffering produces perseverance; perseverance, character; and character, hope.'",
          reflection: "From Carrión, the Roman road stretches 17km in an almost perfectly straight line with no shade and no services. This is perhaps the most psychologically challenging section of the Meseta. But character is built on long straight roads just as much as on dramatic mountain passes. Keep walking. One step after another.",
          prayer: "God of endurance, today I choose to persevere not because it is easy, but because perseverance produces in me what You desire. Make me more like Christ in this difficult straight road. Amen.",
          audioDuration: "11:30"
        },
        accommodation: [
          { name: "Albergue Jacques de Molay", type: "private", beds: 52, priceEur: 12, bookable: true },
          { name: "Albergue Los Templarios", type: "private", beds: 36, priceEur: 13, bookable: true }
        ],
        practical: {
          difficulty: "hard",
          terrain: "17km straight Roman road with no shade, then track to village",
          waterPoints: ["NONE for 17km after Carrión — fill up completely", "Calzadilla de la Cueza fountain (17km, small village)", "Terradillos"],
          services: ["Bar in Calzadilla de la Cueza (17km)", "Very limited services in Terradillos"],
          highlights: ["Roman road: walking on stones laid 2000 years ago", "Absolute silence and vast sky of the Meseta", "Calzadilla de la Cueza: medieval village oasis"],
          warnings: ["CRITICAL: 17km with NO water or services. Fill 2L minimum before leaving Carrión.", "Start before 6am in summer. This is the hottest and most exposed stage.", "The monotony is real — podcasts/audiobooks help many pilgrims here."],
          tipOfTheDay: "Many pilgrims listen to spiritual podcasts, audiobooks, or simply walk in intentional silence on this Roman road. The monotony is a gift — use it for extended prayer or simply to practice being present without stimulation."
        }
      },
      {
        id: "frances-17",
        day: 17,
        start: "Terradillos de los Templarios",
        end: "Bercianos del Real Camino",
        distance: 24.6,
        elevationGain: 100,
        elevationLoss: 100,
        coordinates: [42.3519, -5.1806],
        devotion: {
          title: "The Wideness of Mercy",
          scripture: "Psalm 103:12 — 'As far as the east is from the west, so far has he removed our transgressions from us.'",
          reflection: "On the wide Meseta, with horizons 50km in every direction, it becomes possible to feel the wideness of God's mercy. Our sins, our failures, our guilt — God has cast them as far as the Meseta stretches. Today, receive that. Don't carry what has already been removed.",
          prayer: "Father, on this wide plain I receive Your forgiveness. What You have removed, I will not pick up again. I walk clean before You today. Amen.",
          audioDuration: "10:00"
        },
        accommodation: [
          { name: "Albergue La Perla Negra", type: "private", beds: 36, priceEur: 12, bookable: true },
          { name: "Albergue El Caminante", type: "private", beds: 30, priceEur: 11, bookable: false },
          { name: "Albergue Municipal", type: "municipal", beds: 24, priceEur: 7, bookable: false }
        ],
        practical: {
          difficulty: "easy",
          terrain: "Flat, open Meseta. Mix of dirt track and minor road.",
          waterPoints: ["Sahagún multiple fountains (halfway)", "Bercianos fountain"],
          services: ["Full services in Sahagún (midpoint): pharmacy, supermarket", "Pilgrim office in Sahagún"],
          highlights: ["Sahagún: Mozarabic brick churches (San Tirso, San Lorenzo) — UNESCO", "Arch of San Benito", "Sunflower fields in summer", "The 500km marker from St. Jean"],
          warnings: [],
          tipOfTheDay: "Sahagún (halfway point) has a Pilgrim Office with good information. The churches here use a unique Mudejar-Romanesque brick style you won't see anywhere else on the Camino. Worth a 30-minute detour."
        }
      },
      {
        id: "frances-18",
        day: 18,
        start: "Bercianos del Real Camino",
        end: "Mansilla de las Mulas",
        distance: 26.4,
        elevationGain: 100,
        elevationLoss: 150,
        coordinates: [42.4986, -5.1819],
        devotion: {
          title: "Mules and Humility",
          scripture: "Matthew 11:29 — 'Take my yoke upon you and learn from me, for I am gentle and humble in heart.'",
          reflection: "Mansilla de las Mulas — 'village of the mules' — was a key stop for medieval pilgrims supplying themselves for León. The humble mule, not the noble horse, was the pilgrim's companion. Christ chose a donkey for His entry into Jerusalem. There is something holy about the unpretentious, the practical, the steady. Are you trying to be the war horse or the mule?",
          prayer: "Gentle Lord, remove my pride and pretension. Give me the steadiness and humility of the mule — not glory-seeking, but faithful to the load and the road. Amen.",
          audioDuration: "10:15"
        },
        accommodation: [
          { name: "Albergue El Jardín del Camino", type: "private", beds: 38, priceEur: 13, bookable: true },
          { name: "Albergue Municipal Mansilla", type: "municipal", beds: 90, priceEur: 8, bookable: false },
          { name: "Albergue El Peregrinaje", type: "private", beds: 24, priceEur: 14, bookable: true }
        ],
        practical: {
          difficulty: "easy",
          terrain: "Flat, mostly quiet roads and dirt tracks, ends with well-preserved medieval walls",
          waterPoints: ["El Burgo Ranero (8km)", "Reliegos fountain (20km)", "Mansilla"],
          services: ["Bar and shop in El Burgo Ranero", "Full services in Mansilla de las Mulas"],
          highlights: ["Mansilla de las Mulas: best-preserved medieval walls on the entire Camino", "The flat Camino ending — León visible in the distance", "Storks' nests on church towers in every village"],
          warnings: ["Option: longer 'original' route via Villamoros — adds 5km but avoids main road."],
          tipOfTheDay: "Mansilla's medieval walls are exceptional and walkable. In the evening, sit at the Plaza del Grano and watch the swallows and storks. After the Meseta, these small medieval towns feel like paradise."
        }
      },
      {
        id: "frances-19",
        day: 19,
        start: "Mansilla de las Mulas",
        end: "León",
        distance: 18.4,
        elevationGain: 100,
        elevationLoss: 50,
        coordinates: [42.5987, -5.5671],
        devotion: {
          title: "León: Light Through Stone",
          scripture: "John 8:12 — 'I am the light of the world. Whoever follows me will never walk in darkness.'",
          reflection: "León's cathedral is famous for its stained glass — 1,800 square meters of medieval glass that transforms stone walls into a vessel of colored light. When you walk inside at noon, the floor becomes a tapestry of red and gold and blue. Stand there. Let the light wash over you. This is what God does to ordinary stone hearts: He fills them with His light until they glow.",
          prayer: "Lord, light of the world, fill me as the León windows fill the cathedral. Transform my ordinary stoniness into something that lets Your beauty shine through. Amen.",
          audioDuration: "14:00"
        },
        accommodation: [
          { name: "Albergue Benedictinas de Santa María de Carbajal", type: "monastery", beds: 130, priceEur: 8, bookable: false },
          { name: "Albergue William Shakespeare", type: "private", beds: 80, priceEur: 16, bookable: true },
          { name: "Albergue León", type: "private", beds: 100, priceEur: 14, bookable: true }
        ],
        practical: {
          difficulty: "easy",
          terrain: "Flat road approach, then city streets, industrial outskirts, historic center",
          waterPoints: ["Arcahueja fountain (6km)", "Multiple in León"],
          services: ["Full city: hospital, university clinics, Decathlon, gear shops, banks, pharmacies"],
          highlights: ["León Cathedral (Pulchra Leonina) — finest stained glass in Spain", "Basílica San Isidoro — Royal Pantheon (UNESCO)", "MUSAC contemporary art museum", "León's tapas bar culture (free tapas with every drink)"],
          warnings: ["León is a mandatory rest day city. Do not rush through it.", "The industrial approach from the east is lengthy and dull. Follow yellow arrows carefully."],
          tipOfTheDay: "In León, every bar gives you a FREE tapa with your drink — this is the local custom. Budget €15-20 for an evening of bar-hopping in the old city (Barrio Húmedo). León's food culture is one of the best in Spain."
        }
      },
      {
        id: "frances-20",
        day: 20,
        start: "León",
        end: "Villadangos del Páramo",
        distance: 21.0,
        elevationGain: 100,
        elevationLoss: 80,
        coordinates: [42.5192, -5.7822],
        devotion: {
          title: "Leaving the City",
          scripture: "Luke 9:62 — 'No one who puts a hand to the plow and looks back is fit for service in the kingdom of God.'",
          reflection: "Leaving León is always hard. The city gives comfort, culture, good food. Returning to the road requires choosing the Camino again, voluntarily. This is the daily reality of discipleship: not just one dramatic moment of commitment, but thousands of small daily re-choices. You chose the road again today. That matters.",
          prayer: "Lord, I choose the road again today. I walk away from comfort not because comfort is wrong, but because You are ahead of me and that is enough. Amen.",
          audioDuration: "10:00"
        },
        accommodation: [
          { name: "Albergue San Esteban", type: "private", beds: 48, priceEur: 12, bookable: true },
          { name: "Albergue Municipal Villadangos", type: "municipal", beds: 104, priceEur: 8, bookable: false }
        ],
        practical: {
          difficulty: "easy",
          terrain: "Long suburban exit from León then flat páramo plateau, road walking",
          waterPoints: ["Valverde de la Virgen fountain (10km)", "Villadangos"],
          services: ["Bar/café in La Virgen del Camino", "Bar in Valverde de la Virgen", "Small shop in Villadangos"],
          highlights: ["La Virgen del Camino: modern church facade with 13 larger-than-life bronze apostles", "Flat páramo with distant views of mountains ahead", "First distant glimpse of the hills before Astorga"],
          warnings: ["Road walking today — less pleasant. The alternative Camino route via Mazos de Arriba is longer (+5km) but more rural. Signposted from La Virgen del Camino."],
          tipOfTheDay: "Two routes from León: the direct main route via N-120 (follow yellow arrows) or the scenic Camino by Mozos de Arriba. The scenic route adds time but avoids road walking. Ask at the León albergue which most pilgrims recommend currently."
        }
      },
      {
        id: "frances-21",
        day: 21,
        start: "Villadangos del Páramo",
        end: "Astorga",
        distance: 27.5,
        elevationGain: 200,
        elevationLoss: 100,
        coordinates: [42.4569, -6.0558],
        devotion: {
          title: "The Gaudí Palace",
          scripture: "Proverbs 8:12 — 'I, wisdom, dwell together with prudence; I possess knowledge and discretion.'",
          reflection: "Astorga has two extraordinary buildings: the Cathedral, built over centuries of faith, and the Bishop's Palace designed by Gaudí — fantastical, organic, dreamlike. Beauty takes many forms. Wisdom recognizes the sacred whether it appears in Gothic convention or Modernist innovation. God is the Lord of both the traditional and the surprising.",
          prayer: "God of all beauty, expand my categories today. Let me see You in the expected and the unexpected, the ancient and the new. Amen.",
          audioDuration: "11:15"
        },
        accommodation: [
          { name: "Albergue de Peregrinos Siervas de María", type: "private", beds: 160, priceEur: 10, phone: "+34 987 616 034", bookable: false },
          { name: "Albergue San Javier", type: "private", beds: 90, priceEur: 14, bookable: true },
          { name: "Albergue Camino y Vía", type: "private", beds: 54, priceEur: 14, bookable: true }
        ],
        practical: {
          difficulty: "easy",
          terrain: "Flat to gently rolling, road and dirt track, some pavement",
          waterPoints: ["Hospital de Órbigo fountain (10km)", "San Justo de la Vega fountain", "Multiple in Astorga"],
          services: ["Hospital de Órbigo: medieval bridge, bars, shops (good lunch stop)", "Full services in Astorga", "Roman museum in Astorga"],
          highlights: ["Hospital de Órbigo: one of the longest medieval bridges in Spain — 20 arches over the Órbigo river", "Astorga Cathedral (mix of Romanesque, Gothic, Baroque)", "Gaudí's Episcopal Palace (now Museum of the Roads)"],
          warnings: ["Astorga is famous for 'mantecadas' (local almond pastries) — buy them here. Cheaper and better than anywhere else."],
          tipOfTheDay: "Hospital de Órbigo (10km) is a great lunch stop. The medieval bridge scene is outstanding. The town is famous for the 1434 jousting tournament of Don Suero de Quiñones — who fought 300 knights to prove his devotion. Pure Camino spirit."
        }
      },
      {
        id: "frances-22",
        day: 22,
        start: "Astorga",
        end: "Rabanal del Camino",
        distance: 20.8,
        elevationGain: 600,
        elevationLoss: 100,
        coordinates: [42.4800, -6.2878],
        devotion: {
          title: "Climbing into the Mountains",
          scripture: "Psalm 121:1-2 — 'I lift up my eyes to the mountains — where does my help come from? My help comes from the Lord.'",
          reflection: "The Maragatería mountains begin today. After the flat Meseta, the climb is welcome but demanding. Rabanal is a tiny medieval village that feels suspended in time — British pilgrim association maintains a Romanesque church here with Gregorian chant at evening prayer. In the mountains, God speaks. Climb toward Him.",
          prayer: "Lord of the mountains, as I climb today, lift my eyes beyond what I can see. My help comes from You, not from my own strength. Carry me where I cannot carry myself. Amen.",
          audioDuration: "12:30"
        },
        accommodation: [
          { name: "Albergue Gaucelmo (Confraternity of St James)", type: "private", beds: 40, priceEur: "donation", bookable: false },
          { name: "Albergue El Pilar", type: "private", beds: 32, priceEur: 13, bookable: false },
          { name: "Albergue de Rabanal", type: "private", beds: 24, priceEur: 14, bookable: true }
        ],
        practical: {
          difficulty: "moderate",
          terrain: "Gradual ascent from Astorga, rough mountain track after Foncebadón turn-off",
          waterPoints: ["Santa Catalina de Somoza (5km)", "El Ganso bar (12km)", "Rabanal"],
          services: ["Bar in Santa Catalina", "Bar in El Ganso", "Bar and small shop in Rabanal"],
          highlights: ["El Ganso: tiny village with a cowboy bar (El Cowboy Bar) — completely real and charming", "First true mountain climb of the second half", "Rabanal: medieval hamlet, Gregorian chant at 7pm in Iglesia San Salvador", "Albergue Gaucelmo run by the British Confraternity of St James"],
          warnings: ["Weather changes fast above 1000m. Pack rain jacket and layers.", "Tomorrow (Cruz de Ferro stage) is one of the most spiritually significant and difficult of the Camino. Prepare tonight."],
          tipOfTheDay: "Attend Gregorian chant evening prayer at 7pm in the Iglesia San Salvador in Rabanal — run by the Benedictine community of Silos. This is a deeply moving experience. Arrive 10 minutes early."
        }
      },
      {
        id: "frances-23",
        day: 23,
        start: "Rabanal del Camino",
        end: "Molinaseca",
        distance: 25.6,
        elevationGain: 450,
        elevationLoss: 1350,
        coordinates: [42.5128, -6.5372],
        devotion: {
          title: "The Cruz de Ferro",
          scripture: "Matthew 11:28 — 'Come to me, all you who are weary and burdened, and I will give you rest.'",
          reflection: "The Cruz de Ferro — Iron Cross — is the highest point on the Camino Francés (1504m). For centuries, pilgrims have laid a stone here, brought from home, as an act of laying down their burdens before God. It is one of the most powerful symbolic acts on any pilgrimage in the world. You brought a stone from home (or find one today). Lay it at the cross. Name the burden. Leave it. And walk down lighter.",
          prayer: "Lord, I lay this stone — and with it, [name your burden silently] — at the foot of Your cross. You carried the weight of the world. I trust You to carry this. I walk down from here lighter. Amen.",
          audioDuration: "15:30"
        },
        accommodation: [
          { name: "Albergue Santa Marina", type: "private", beds: 28, priceEur: 13, bookable: true },
          { name: "Albergue El Palacio", type: "private", beds: 22, priceEur: 15, bookable: true },
          { name: "Albergue Molinaseca Municipal", type: "municipal", beds: 60, priceEur: 8, bookable: false }
        ],
        practical: {
          difficulty: "hard",
          terrain: "Rocky mountain ascent, then dramatic and steep descent through slate villages",
          waterPoints: ["Foncebadón fountain (top of village)", "Cruz de Ferro area", "Manjarín small fountain", "El Acebo fountain", "Molinaseca river"],
          services: ["Bar in Foncebadón", "Bar in El Acebo", "Bars and river swimming in Molinaseca"],
          highlights: ["Cruz de Ferro — the most emotionally significant moment of the Camino", "Foncebadón: semi-abandoned village, wild and atmospheric", "Manjarín: hospitalero Tomás's legendary albergue with Templar insignia", "Descent through El Acebo: beautiful slate roofed village", "Molinaseca: river swimming village — utterly beautiful after hard descent"],
          warnings: ["In bad weather, the mountain crossing is serious. Wind and rain at 1500m can be dangerous.", "The descent is 1200m over 12km — brutal on knees. Trekking poles essential.", "BRING A STONE FROM HOME for the Cruz de Ferro — this is a once-in-a-lifetime spiritual act."],
          tipOfTheDay: "If you forgot to bring a stone from home, collect one at the beginning of today's stage near Rabanal. Many pilgrims spend 20-30 minutes at the Cruz de Ferro in prayer and silence. Do not rush it. This is the spiritual heart of the Camino Francés."
        }
      },
      {
        id: "frances-24",
        day: 24,
        start: "Molinaseca",
        end: "Ponferrada",
        distance: 7.9,
        elevationGain: 50,
        elevationLoss: 100,
        coordinates: [42.5461, -6.5969],
        devotion: {
          title: "The Templar Castle",
          scripture: "Ephesians 6:11 — 'Put on the full armor of God, so that you can take your stand against the devil's schemes.'",
          reflection: "Ponferrada's magnificent Templar Castle was built by the Knights Templar to protect pilgrims on this dangerous stretch of the Camino. For those who need protection on a journey, there are guardians. In our spiritual journey, we are not alone against spiritual opposition. We have armor, we have a shield, we have a sword. And we have the castle of God's presence as our refuge.",
          prayer: "Almighty God, You are my fortress and stronghold. Today I put on Your armor — truth, righteousness, the gospel of peace. Walk beside me, before me, behind me. Amen.",
          audioDuration: "9:30"
        },
        accommodation: [
          { name: "Albergue San Nicolas de Flüe", type: "private", beds: 182, priceEur: 10, bookable: false },
          { name: "Albergue Guiana", type: "private", beds: 126, priceEur: 12, bookable: true },
          { name: "Albergue Bierzo Plaza", type: "private", beds: 36, priceEur: 15, bookable: true }
        ],
        practical: {
          difficulty: "easy",
          terrain: "Easy flat walk along river and road into city",
          waterPoints: ["Molinaseca river (beautiful!)", "Ponferrada city fountains"],
          services: ["Full city services: hospital, supermarkets, pharmacies, gear shops, banks"],
          highlights: ["Templar Castle of Ponferrada (12th century) — one of the finest in Spain", "Old Quarter of Ponferrada", "El Bierzo wine region begins here", "Basilica of Nuestra Señora de la Encina"],
          warnings: ["Short stage today (7.9km) — consider continuing to Cacabelos (24km total) to save a day."],
          tipOfTheDay: "El Bierzo wine: Ponferrada is at the heart of El Bierzo DO — one of Spain's best red wine regions using the local Mencía grape. Order the local wine with dinner tonight. It's outstanding and you'll want to bring a bottle to Santiago."
        }
      },
      {
        id: "frances-25",
        day: 25,
        start: "Ponferrada",
        end: "Villafranca del Bierzo",
        distance: 24.1,
        elevationGain: 250,
        elevationLoss: 50,
        coordinates: [42.6044, -6.8122],
        devotion: {
          title: "The Door of Forgiveness",
          scripture: "John 10:9 — 'I am the gate; whoever enters through me will be saved.'",
          reflection: "Villafranca del Bierzo has a church — Santiago — with a special 'Puerta del Perdón' (Door of Forgiveness). In medieval times, pilgrims too ill to continue received full Compostela indulgence simply by touching this door. It is a reminder that God's grace meets us where we are, not only at the destination. For some pilgrims, this is the end of the Camino. For all of us, grace arrives before we complete the journey.",
          prayer: "Lord, thank You that Your grace does not wait for us to arrive at Santiago. It meets us in Villafranca, in the struggle, in the middle. I receive it today. Amen.",
          audioDuration: "12:00"
        },
        accommodation: [
          { name: "Albergue Municipal de Villafranca", type: "municipal", beds: 76, priceEur: 8, bookable: false },
          { name: "Albergue Leo", type: "private", beds: 36, priceEur: 15, bookable: true },
          { name: "Albergue El Castillo", type: "private", beds: 26, priceEur: 13, bookable: true }
        ],
        practical: {
          difficulty: "moderate",
          terrain: "Flat to gentle slope, along the valley floor, some road sections",
          waterPoints: ["Cacabelos fountain (12km)", "Pieros fountain", "Villafranca multiple"],
          services: ["Full services in Cacabelos (halfway)", "Pharmacy and supermarket in Villafranca", "Hospital in Ponferrada (30 min back)"],
          highlights: ["Cacabelos: excellent El Bierzo wine town, visit local bodega", "Villafranca del Bierzo: beautiful medieval market town", "Puerta del Perdón of Santiago Church", "Villafranca castle", "Start of the dramatic O Cebreiro climb visible ahead"],
          warnings: ["Tomorrow is the most dramatic climb of the second half: 28.7km to O Cebreiro with 1300m gain. Prepare: extra food, full water bottles, early start."],
          tipOfTheDay: "Stock up fully in Villafranca for tomorrow's major mountain stage to O Cebreiro. Supermarket, pharmacy, blister supplies — all available here but nothing substantial until O Cebreiro. Start tomorrow at dawn."
        }
      },
      {
        id: "frances-26",
        day: 26,
        start: "Villafranca del Bierzo",
        end: "O Cebreiro",
        distance: 28.7,
        elevationGain: 1300,
        elevationLoss: 200,
        coordinates: [42.7083, -7.0411],
        devotion: {
          title: "Crossing into Galicia",
          scripture: "Isaiah 40:31 — 'Those who hope in the Lord will renew their strength. They will soar on wings like eagles; they will run and not grow weary, they will walk and not be faint.'",
          reflection: "O Cebreiro is the most dramatic moment of the entire Camino. After the brutal climb through the last trees of Castile, you emerge onto a foggy mountain plateau and enter Galicia — the final region. The landscape changes completely: green, wet, Celtic, ancient. Pilgrims have been weeping with joy here for a thousand years. You will understand why when you arrive.",
          prayer: "Lord, I am exhausted and I am here. I have climbed and I have not fainted because You carried me when I could not carry myself. Thank You. I am in Galicia now. Let the last miles be holy. Amen.",
          audioDuration: "14:45"
        },
        accommodation: [
          { name: "Albergue Municipal O Cebreiro", type: "municipal", beds: 106, priceEur: 8, bookable: false },
          { name: "Casa Campelo", type: "private", beds: 20, priceEur: 35, bookable: true },
          { name: "Hostal O Cebreiro", type: "hotel", beds: 14, priceEur: 50, bookable: true }
        ],
        practical: {
          difficulty: "very_hard",
          terrain: "Extremely steep road climb (La Portela/Pradela route or main road), then mountain track to summit",
          waterPoints: ["Trabadelo fountain (8km)", "La Portela fountain", "Vega de Valcarce fountain", "Herrerías fountain", "La Faba fountain (last before summit)"],
          services: ["Bar in Herrerías", "Bar/café in La Faba (3km from top)", "Full services at O Cebreiro (albergue, bar, restaurant, shop)"],
          highlights: ["O Cebreiro church (pre-Romanesque, 9th century) — oldest church on the Camino", "Chalice of O Cebreiro (inspiration for Holy Grail legend)", "First 'pallozas' (round stone Galician huts)", "Panoramic views over Galicia (if clear)", "Crossing the Galician border"],
          warnings: ["This is the hardest climb since Day 1. Start at 5:30-6am.", "O Cebreiro is famous for fog and rain. Waterproof everything.", "The road route and the Pradela scenic route both work — Pradela is wilder and more beautiful."],
          tipOfTheDay: "The pre-Romanesque church of Santa María la Real in O Cebreiro is the oldest building on the entire Camino. The Chalice of O Cebreiro, held here, inspired the Holy Grail legend. Attend evening mass if possible — in Galician and Spanish, deeply moving."
        }
      },
      {
        id: "frances-27",
        day: 27,
        start: "O Cebreiro",
        end: "Triacastela",
        distance: 21.4,
        elevationGain: 350,
        elevationLoss: 1100,
        coordinates: [42.7553, -7.2367],
        devotion: {
          title: "Descent into Green",
          scripture: "Psalm 65:9 — 'You care for the land and water it; you enrich it abundantly.'",
          reflection: "After the summit, the descent into Galicia's lush valleys is one of the most beautiful days of the Camino. Green everywhere. Eucalyptus and oak. Stone villages and ancient churches. The contrast with the dry Meseta is startling. Sometimes God moves us through desert to abundance, through difficulty to beauty. The journey through the dry made this green more precious.",
          prayer: "Creator God, how beautiful is Your world! Thank You for every shade of green, for rain, for mountain streams, for the abundance of Galicia after the dryness of the Meseta. Amen.",
          audioDuration: "10:30"
        },
        accommodation: [
          { name: "Albergue Complexo Xacobeo", type: "private", beds: 56, priceEur: 12, bookable: true },
          { name: "Albergue Atrio", type: "private", beds: 28, priceEur: 14, bookable: true },
          { name: "Albergue Municipal Triacastela", type: "municipal", beds: 58, priceEur: 8, bookable: false }
        ],
        practical: {
          difficulty: "moderate",
          terrain: "Mountain descent on paths and road, beautiful Galician countryside, some eucalyptus forest",
          waterPoints: ["Liñares fountain", "San Roque fountain", "Alto do Poio fountain and bar", "Fonfría fountain", "Triacastela"],
          services: ["Bar in Alto do Poio (halfway)", "Bar in Fonfría", "Full services in Triacastela"],
          highlights: ["Alto do Poio: highest point of Galicia's Camino (1335m)", "Views over the Galician mountains", "Triacastela: medieval village, limestone quarry (medieval pilgrims carried limestone to Compostela for the cathedral)"],
          warnings: ["The descent is long (1100m over 20km) — protect knees with poles and trekking technique (zig-zag, short strides)."],
          tipOfTheDay: "From Triacastela there are two routes to Sarria: via Samos (7km longer, more beautiful with a major Benedictine monastery) or the direct route via San Xil (shorter). Samos is worth the extra time if your knees are OK."
        }
      },
      {
        id: "frances-28",
        day: 28,
        start: "Triacastela",
        end: "Sarria",
        distance: 18.7,
        elevationGain: 300,
        elevationLoss: 350,
        coordinates: [42.7803, -7.4139],
        devotion: {
          title: "The Last 100km",
          scripture: "Hebrews 12:1 — 'Let us run with perseverance the race marked out for us.'",
          reflection: "Sarria is the last point from which pilgrims can begin the Camino and still receive the Compostela (minimum 100km on foot, with stamps). You will see many new faces from here — fresh, unburdened, excited. Welcome them. They too are on a pilgrimage. And if you have walked further, do not judge those who walked less. The Camino belongs to everyone who walks it.",
          prayer: "Lord, as I meet new pilgrims in Sarria, give me a generous heart. Strip away any spiritual pride from my long walk. We all need You equally, regardless of how many kilometres we've covered. Amen.",
          audioDuration: "11:00"
        },
        accommodation: [
          { name: "Albergue Internacional de Sarria", type: "private", beds: 40, priceEur: 13, bookable: true },
          { name: "Albergue Mayor", type: "private", beds: 60, priceEur: 15, bookable: true },
          { name: "Albergue Oasis", type: "private", beds: 50, priceEur: 12, bookable: true }
        ],
        practical: {
          difficulty: "moderate",
          terrain: "Mix of forest path, road, and Galician country track (camiño de pedra)",
          waterPoints: ["Aguiada fountain", "San Xil fountain (direct route)", "Samos village (via Samos route)", "Sarria multiple"],
          services: ["Monastery of San Julián de Samos (via Samos)", "Full services in Sarria: pharmacy, hospital, supermarket", "Pilgrim office in Sarria"],
          highlights: ["Monastery of San Julián de Samos — Benedictine monastery, one of the oldest in Europe (via Samos route)", "Sarria's medieval Rúa Maior pilgrims' street", "Sarria castle tower", "First 'Galician rural roads' — ancient stone-paved paths between green hills"],
          warnings: ["From Sarria onward: get at least 2 stamps PER DAY (required for Compostela in last 100km). The stamp frequency increases.", "Accommodation books up faster after Sarria — more pilgrims. Book ahead or start very early."],
          tipOfTheDay: "IMPORTANT: From Sarria to Santiago (100km+) you need a minimum of 2 stamps per day in your credencial. Every bar, church, albergue, and tourist office will stamp you. Don't forget — the Pilgrim Office in Santiago checks this."
        }
      },
      {
        id: "frances-29",
        day: 29,
        start: "Sarria",
        end: "Portomarín",
        distance: 22.7,
        elevationGain: 450,
        elevationLoss: 600,
        coordinates: [42.8094, -7.6178],
        devotion: {
          title: "The Drowned Town",
          scripture: "Revelation 21:5 — 'He who was seated on the throne said, I am making everything new!'",
          reflection: "Portomarín is a town moved stone by stone in the 1960s when a reservoir flooded the original village. The medieval church of San Nicolás was dismantled, transported, and rebuilt on the hill. In dry years, the old submerged bridge and foundations re-emerge. Even what appears lost can be restored. God makes all things new — not by forgetting the past, but by lifting it out of the flood.",
          prayer: "God who restores all things, I give You the parts of my life that seem submerged and lost. You can lift them. You make all things new. Amen.",
          audioDuration: "11:30"
        },
        accommodation: [
          { name: "Albergue Ferramenteiro", type: "municipal", beds: 110, priceEur: 8, bookable: false },
          { name: "Albergue Villajardin", type: "private", beds: 50, priceEur: 14, bookable: true },
          { name: "Albergue Casa Cruceiro", type: "private", beds: 38, priceEur: 15, bookable: true }
        ],
        practical: {
          difficulty: "moderate",
          terrain: "Classic Galician: stone paths, green tunnels, hills and descents, ends with dramatic staircase bridge descent",
          waterPoints: ["Barbadelo fountain (4km)", "Morgade fountain", "Ferreirs fountain", "Portomarín multiple"],
          services: ["Bar in Barbadelo", "Bar in Morgade", "Full services in Portomarín"],
          highlights: ["Barbadelo: tiny church and hamlet, classic Camino start", "Galician stone-paved 'corredoiras' paths (sunken lanes between hedgerows)", "Arrival stairs at Portomarín's bridge — dramatic entrance", "Church-fortress of San Nicolás (Romanesque-Gothic)"],
          warnings: ["In very dry summers, the original flooded village re-emerges from the reservoir — eerie and beautiful.", "The stairs down to the bridge of Portomarín — wet stone, very slippery. Use handrail."],
          tipOfTheDay: "The stairs descending to Portomarín's bridge are slippery when wet. Look up — the view of the reservoir and mountains is stunning. This entrance to Portomarín is one of the most photographed moments of the Galician Camino."
        }
      },
      {
        id: "frances-30",
        day: 30,
        start: "Portomarín",
        end: "Palas de Rei",
        distance: 24.8,
        elevationGain: 600,
        elevationLoss: 580,
        coordinates: [42.8706, -7.8692],
        devotion: {
          title: "Four More Days",
          scripture: "Galatians 6:9 — 'Let us not become weary in doing good, for at the proper time we will reap a harvest if we do not give up.'",
          reflection: "Four more stages. The pilgrim's emotions at this point are complex: relief, anticipation, and sometimes sadness that the journey is ending. The Camino has become home. Santiago is both destination and departure. What you carry back into your ordinary life — that is the true harvest of everything you have walked.",
          prayer: "Lord, thank You for these weeks of walking. Help me not to rush these last days. Let me carry the lessons of the road back into my life. Amen.",
          audioDuration: "10:15"
        },
        accommodation: [
          { name: "Albergue Municipal Palas de Rei", type: "municipal", beds: 60, priceEur: 8, bookable: false },
          { name: "Albergue O Cruceiro", type: "private", beds: 60, priceEur: 13, bookable: true },
          { name: "Albergue Mesón de Benito", type: "private", beds: 18, priceEur: 16, bookable: true }
        ],
        practical: {
          difficulty: "moderate",
          terrain: "Rolling Galician hills, stone paths, eucalyptus and oak forest, numerous small villages",
          waterPoints: ["Gonzar fountain (7km)", "Castromaior fountain", "Ventas de Narón fountain", "Palas de Rei"],
          services: ["Bar in Gonzar", "Bar in Hospital de la Cruz", "Bar/café in Ventas de Narón (halfway)", "Full services in Palas de Rei"],
          highlights: ["Church of Santa María at Vilar de Donas (Romanesque, tomb of the Knights of Santiago)", "Rolling green Galician landscape", "Octopus (pulpo) country begins — try it for dinner"],
          warnings: ["Accommodation fills up fast in peak season (summer). Either book ahead or start walking at 6am.", "Many pilgrims rush these last stages. Resist the urge — walk slowly and intentionally."],
          tipOfTheDay: "You are now in pulpo (octopus) country. Galicia's traditional 'pulpo á feira' (boiled octopus with olive oil, paprika, salt) is the local specialty. Order it in Palas de Rei tonight — €12-15 for a full plate with local Albariño wine."
        }
      },
      {
        id: "frances-31",
        day: 31,
        start: "Palas de Rei",
        end: "Arzúa",
        distance: 28.8,
        elevationGain: 500,
        elevationLoss: 530,
        coordinates: [42.9278, -8.1625],
        devotion: {
          title: "The Cheese Towns",
          scripture: "Psalm 34:8 — 'Taste and see that the Lord is good; blessed is the one who takes refuge in him.'",
          reflection: "Galicia is a land of physical abundance: creamy Arzúa cheese, fresh bread, octopus, wine, rain-fed pastures. God is generous. The ordinary gifts of the earth — food, water, rest, human friendship — are themselves sacraments. The pilgrim who has walked 700km knows the taste of good bread in a way the tourist never will.",
          prayer: "God of ordinary gifts, teach me to taste Your goodness in the small things: food with friends, a cool fountain, a bed after a long day. All of it is grace. Amen.",
          audioDuration: "10:45"
        },
        accommodation: [
          { name: "Albergue Don Quijote", type: "private", beds: 74, priceEur: 14, bookable: true },
          { name: "Albergue Los Caminantes", type: "private", beds: 50, priceEur: 13, bookable: true },
          { name: "Albergue Municipal Arzúa", type: "municipal", beds: 60, priceEur: 8, bookable: false }
        ],
        practical: {
          difficulty: "moderate",
          terrain: "Rolling Galician countryside, stone paths, eucalyptus forest, multiple small rivers and streams",
          waterPoints: ["Casanova fountain", "Leboreiro fountain", "Furelos fountain", "Melide (midpoint)", "Arzúa"],
          services: ["Full services in Melide (halfway): pharmacy, supermarket, hospital", "Full services in Arzúa: pharmacy, supermarket"],
          highlights: ["Melide: pulpo capital of the Camino — Pulpería Ezequiel is legendary (open since 1950)", "Leboreiro: beautiful Romanesque church and medieval bridge", "Arzúa: famous for its soft creamy cheese (queso de Arzúa-Ulloa)"],
          warnings: ["Melide's 'Pulpería Ezequiel' will have a queue at lunchtime. Worth the wait.", "Santiago is now 2 days away. Many pilgrims become emotional here."],
          tipOfTheDay: "Melide is the undisputed pulpo capital of the Camino. Pulpería Ezequiel (Rúa San Antonio 9) has been serving pilgrims since 1950. Order a 'ración' of pulpo á feira with local wine. One of the most authentic Camino food experiences."
        }
      },
      {
        id: "frances-32",
        day: 32,
        start: "Arzúa",
        end: "O Pedrouzo",
        distance: 19.5,
        elevationGain: 300,
        elevationLoss: 330,
        coordinates: [42.9028, -8.3600],
        devotion: {
          title: "One More Sleep",
          scripture: "Psalm 126:1-2 — 'When the Lord restored the fortunes of Zion, we were like those who dreamed. Our mouths were filled with laughter, our tongues with songs of joy.'",
          reflection: "Tomorrow you arrive. After everything — the blisters, the rain, the Meseta, the mountains, the friendships made and lost along the way — tomorrow you will stand in the Plaza del Obradoiro. Tonight, sit with the anticipation. Thank God for every single person you met on this road. Every pilgrim you walked beside is a gift.",
          prayer: "Lord, I can hardly believe tomorrow is the day. Thank You for carrying me through every doubt and difficulty. Thank You for the people You placed beside me on this road. I am almost home. Amen.",
          audioDuration: "11:00"
        },
        accommodation: [
          { name: "Albergue O Pino", type: "municipal", beds: 120, priceEur: 8, bookable: false },
          { name: "Albergue A Calzada", type: "private", beds: 50, priceEur: 14, bookable: true },
          { name: "Albergue Porta de Santiago", type: "private", beds: 66, priceEur: 15, bookable: true }
        ],
        practical: {
          difficulty: "easy",
          terrain: "Rolling Galician forest and farmland, good paths, mainly flat to gentle",
          waterPoints: ["Multiple fountains along the route", "O Pedrouzo"],
          services: ["Bar in Santa Irene (15km)", "Full services in O Pedrouzo"],
          highlights: ["Santa Irene chapel (small, peaceful)", "First 'flechas amarillas' pointing toward Santiago's spires", "O Pedrouzo: last overnight before Santiago"],
          warnings: ["TONIGHT: Do NOT stay up drinking until 2am. You want to arrive tomorrow rested and present. Early to bed.", "Set your alarm for 5:30am to start in the dark and arrive with the first light."],
          tipOfTheDay: "Many pilgrims start the last stage at 5:30-6am to arrive at the Plaza del Obradoiro as the sun rises over the cathedral towers. It is one of the most moving experiences of a lifetime. Set your alarm."
        }
      },
      {
        id: "frances-33",
        day: 33,
        start: "O Pedrouzo",
        end: "Santiago de Compostela",
        distance: 20.0,
        elevationGain: 200,
        elevationLoss: 280,
        coordinates: [42.8782, -8.5448],
        devotion: {
          title: "¡Buen Camino! — You Are Home",
          scripture: "Revelation 7:17 — 'The Lamb at the center of the throne will be their shepherd; he will lead them to springs of living water. And God will wipe away every tear from their eyes.'",
          reflection: "You have arrived. Step into the Plaza del Obradoiro and look up at those twin Baroque towers. A thousand years of pilgrims stood where you are standing. Behind you: the Pyrenees, the Meseta, the Cruz de Ferro, the mountain passes, every blister, every kilometer, every prayer. Before you: the Cathedral of Santiago de Compostela. You walked here. God walked with you. Stand still for a moment. Let it be enough. You are home.",
          prayer: "Thank You. Thank You for the beginning, the middle, and the end. Thank You for the people, the path, and the Presence. Thank You for blisters and rain and panoramas and pilgrim dinners and silences and conversations. I arrived. You were here all along. Amen.",
          audioDuration: "18:00"
        },
        accommodation: [
          { name: "Albergue Seminario Menor (Cathedral)", type: "private", beds: 177, priceEur: 15, phone: "+34 981 031 768", bookable: true },
          { name: "Albergue Roots & Boots", type: "private", beds: 40, priceEur: 18, bookable: true },
          { name: "Albergue The Last Stamp", type: "private", beds: 36, priceEur: 18, bookable: true }
        ],
        practical: {
          difficulty: "easy",
          terrain: "Forest and eucalyptus path, then Monte do Gozo and final urban approach to Santiago",
          waterPoints: ["Multiple along the route", "Monte do Gozo fountain", "Santiago city fountains"],
          services: ["Pilgrim Office (for Compostela): Rúa das Carretas 33, open 9am-7pm daily", "Cathedral: Pilgrim Mass daily at 12:00 noon", "Full city services"],
          highlights: ["Monte do Gozo: 'Hill of Joy' — first view of the cathedral towers", "Entry through the old city gates (Porta do Camiño)", "Plaza del Obradoiro: ARRIVAL", "Pilgrim Mass at noon with the Botafumeiro (giant incense burner)", "The tomb of Saint James beneath the High Altar"],
          warnings: ["COMPOSTELA: Collect it at the Pilgrim Office, Rúa das Carretas 33. Bring your credencial. Queue early or go in the afternoon to avoid the longest waits.", "The Pilgrim Mass is at 12:00 noon. Arrive 45 minutes early to get a seat.", "Theft occurs in Santiago — tourist city. Secure valuables in your backpack."],
          tipOfTheDay: "After receiving your Compostela, hug the statue of Saint James at the High Altar (tradition: pilgrims embrace the silver statue behind the altar). Then go to the crypt and see his tomb. Then find your Camino friends. Then celebrate. You walked to Santiago. Ultreia!"
        }
      }
    ]
  },
  {
    id: "portugues",
    name: "Camino Portugués",
    description: "A beautiful coastal and inland route starting from Lisbon or Porto.",
    totalDistance: 240,
    totalDays: 14,
    startLocation: "Porto",
    startCoordinates: [41.1496, -8.6110],
    stages: [
      {
        id: "portugues-1",
        day: 1,
        start: "Porto",
        end: "Vilarinho",
        distance: 26.5,
        elevationGain: 250,
        elevationLoss: 200,
        coordinates: [41.3431, -8.6694],
        devotion: {
          title: "Setting Sail",
          scripture: "Matthew 4:19 — 'Come, follow me,' Jesus said, 'and I will send you out to fish for people.'",
          reflection: "Starting from the coastal city of Porto, we are reminded of the apostles who left their nets to follow Christ. The ocean breeze carries the call to adventure. What nets are you leaving behind today to follow Him more closely?",
          prayer: "Lord Jesus, as I take my first steps from Porto, give me the courage of the apostles. Help me to leave behind my attachments and trust completely in Your guidance. Amen.",
          audioDuration: "11:15"
        },
        accommodation: [
          { name: "Albergue de Peregrinos de Vilarinho", type: "municipal", beds: 40, priceEur: 8, bookable: false },
          { name: "Albergue O Abrigo", type: "private", beds: 22, priceEur: 14, bookable: true }
        ],
        practical: {
          difficulty: "moderate",
          terrain: "City streets, suburban roads, river path alongside the Douro and Ave rivers",
          waterPoints: ["Porto: fill up before leaving", "Matosinhos fountain", "Multiple along route"],
          services: ["Full services in Porto", "Bar/café in Matosinhos", "Basic services in Vilarinho"],
          highlights: ["Porto's historic Ribeira waterfront (UNESCO)", "Matosinhos fish market", "Vila do Conde medieval tower and royal monastery"],
          warnings: ["Porto city navigation: follow the yellow arrows through the old city. Can be confusing near the waterfront."],
          tipOfTheDay: "Get your credencial stamped at the Sé Cathedral in Porto before you begin — the Porto stamp is a coveted first stamp for Camino Português pilgrims."
        }
      },
      {
        id: "portugues-2",
        day: 2,
        start: "Vilarinho",
        end: "Barcelos",
        distance: 27.3,
        elevationGain: 320,
        elevationLoss: 300,
        coordinates: [41.5388, -8.6156],
        devotion: {
          title: "The Rooster's Call",
          scripture: "Luke 22:61 — 'The Lord turned and looked straight at Peter. Then Peter remembered the word the Lord had spoken to him.'",
          reflection: "Arriving in Barcelos, famous for the legend of the rooster that saved a pilgrim's life, we reflect on truth and justice. Like Peter, we sometimes fail, but the Lord's gaze is always full of mercy, inviting us to begin again.",
          prayer: "Merciful Lord, when I fail to witness to Your truth, look upon me with the same love You showed Peter. Give me the grace of true repentance and the courage to speak Your name. Amen.",
          audioDuration: "13:05"
        },
        accommodation: [
          { name: "Albergue Municipal de Barcelos", type: "municipal", beds: 50, priceEur: 8, bookable: false },
          { name: "Albergue Quinta de Santa Comba", type: "private", beds: 30, priceEur: 15, bookable: true }
        ],
        practical: {
          difficulty: "moderate",
          terrain: "Country roads, some forest paths, ends with long approach to Barcelos",
          waterPoints: ["Multiple village fountains along route", "Barcelos"],
          services: ["Bar/café in Póvoa de Varzim", "Full services in Barcelos: pharmacy, supermarket"],
          highlights: ["Barcelos famous Galo (Rooster) craft market (Thursdays)", "Barcelos medieval bridge and tower", "Barcelos potters and ceramics shops"],
          warnings: [],
          tipOfTheDay: "The famous Barcelos Rooster (Galo de Barcelos) is the symbol of the entire Camino. Buy one here — the authentic hand-painted ceramic versions come from local pottery families and make the most meaningful souvenir of the pilgrimage."
        }
      }
    ]
  },
  {
    id: "norte",
    name: "Camino del Norte",
    description: "The rugged and stunning northern coastal route along the Bay of Biscay.",
    totalDistance: 820,
    totalDays: 35,
    startLocation: "Irun",
    startCoordinates: [43.3390, -1.7894],
    stages: [
      {
        id: "norte-1",
        day: 1,
        start: "Irun",
        end: "San Sebastián",
        distance: 27.6,
        elevationGain: 800,
        elevationLoss: 750,
        coordinates: [43.3183, -1.9812],
        devotion: {
          title: "The Narrow Path",
          scripture: "Matthew 7:14 — 'But small is the gate and narrow the road that leads to life, and only a few find it.'",
          reflection: "The Camino del Norte begins with a challenging climb and stunning ocean views. The path is narrow and steep, much like the spiritual life. The beauty of the ocean reminds us of the vastness of God's love, which makes the difficult climb worthwhile.",
          prayer: "Creator God, as I walk this rugged coastline, let the beauty of Your creation lift my spirit. When the path is steep, remind me that You walk beside me. Amen.",
          audioDuration: "15:20"
        },
        accommodation: [
          { name: "Albergue Ondarreta", type: "municipal", beds: 76, priceEur: 14, bookable: true },
          { name: "Albergue de San Sebastián", type: "private", beds: 30, priceEur: 18, bookable: true }
        ],
        practical: {
          difficulty: "hard",
          terrain: "Coast and mountain mix, significant elevation changes, some road",
          waterPoints: ["Irún multiple fountains", "Pasaia fountain", "San Sebastián"],
          services: ["Full services in San Sebastián (Donostia)", "Pilgrim Office at Casa Consistorial"],
          highlights: ["Pasaia: beautiful fishing village with boat crossing", "San Sebastián: most beautiful city on the Camino — pintxos capital", "Bahía de la Concha beach", "Monte Urgull and Santa Clara Island"],
          warnings: ["The Norte has fewer pilgrims — more solitude, but also longer gaps between services. Plan accordingly."],
          tipOfTheDay: "San Sebastián (Donostia) has more Michelin stars per capita than anywhere outside Japan. Even on a pilgrim budget, the old quarter's pintxos bars offer world-class food for €2-3 per bite. Don't skip dinner here."
        }
      },
      {
        id: "norte-2",
        day: 2,
        start: "San Sebastián",
        end: "Zarautz",
        distance: 20.5,
        elevationGain: 550,
        elevationLoss: 500,
        coordinates: [43.2846, -2.1699],
        devotion: {
          title: "Walking on Water",
          scripture: "Matthew 14:29 — 'Then Peter got down out of the boat, walked on the water and came toward Jesus.'",
          reflection: "Keeping the ocean to our right, we are reminded of Peter's leap of faith. The Camino asks us to step out of our comfort zones and keep our eyes fixed on Jesus, rather than the stormy waves of our anxieties.",
          prayer: "Lord, give me the faith to step out of my boat. When the waves of doubt rise, help me to keep my eyes fixed firmly on You. Amen.",
          audioDuration: "12:40"
        },
        accommodation: [
          { name: "Albergue de Zarautz", type: "municipal", beds: 50, priceEur: 12, bookable: false },
          { name: "Albergue Txiki Polit", type: "private", beds: 20, priceEur: 15, bookable: true }
        ],
        practical: {
          difficulty: "moderate",
          terrain: "Coastal cliffs, beach sections, forest paths, significant ups and downs",
          waterPoints: ["Orio fountain", "Zarautz beach promenade"],
          services: ["Bar/restaurant in Orio", "Full services in Zarautz"],
          highlights: ["Clifftop views over Bay of Biscay", "Zarautz: long beach and Basque surfing culture", "Oria River crossing"],
          warnings: ["The coastal cliffs are exposed to wind and rain. Waterproof gear is essential on the Norte."],
          tipOfTheDay: "Zarautz has one of the longest beaches in the Basque Country. After the day's walk, wade into the Atlantic. The water is cold, but after hours of hiking it's heaven."
        }
      }
    ]
  },
  {
    id: "primitivo",
    name: "Camino Primitivo",
    description: "The original route taken by King Alfonso II in the 9th century — the oldest pilgrimage road.",
    totalDistance: 321,
    totalDays: 15,
    startLocation: "Oviedo",
    startCoordinates: [43.3614, -5.8494],
    stages: [
      {
        id: "primitivo-1",
        day: 1,
        start: "Oviedo",
        end: "Grado",
        distance: 25.8,
        elevationGain: 600,
        elevationLoss: 580,
        coordinates: [43.3886, -6.0722],
        devotion: {
          title: "The Original Call",
          scripture: "Jeremiah 6:16 — 'Stand at the crossroads and look; ask for the ancient paths, ask where the good way is, and walk in it, and you will find rest for your souls.'",
          reflection: "You are walking the oldest known Camino route. By tracing the steps of the very first pilgrims who followed King Alfonso II in 830 AD, you connect with a millennium of faith. What ancient truths is God inviting you to rediscover on this journey?",
          prayer: "God of history, as I walk this ancient path, connect my heart to the millions of pilgrims who have gone before me. Help me to find the 'good way' and rest for my soul. Amen.",
          audioDuration: "14:00"
        },
        accommodation: [
          { name: "Albergue de Peregrinos de Grado", type: "municipal", beds: 30, priceEur: 8, bookable: false },
          { name: "Casa Rural El Roble", type: "private", beds: 16, priceEur: 20, bookable: true }
        ],
        practical: {
          difficulty: "moderate",
          terrain: "Mix of road and forest path, several river crossings, some steep sections",
          waterPoints: ["Oviedo: fill up before leaving", "San Lázaro fountain", "Escamplero fountain", "Grado"],
          services: ["Oviedo: full city (cathedral, pharmacy, gear shops)", "Bar/café in Escamplero", "Full services in Grado"],
          highlights: ["Oviedo Cathedral — pre-Romanesque Cámara Santa with Sudarium of Oviedo", "Meadows and chestnut forests of Asturias", "Grado's medieval arcaded streets"],
          warnings: ["The Primitivo is the hardest Camino route in terms of terrain and altitude. Be well-prepared physically.", "Fewer services than Francés — always carry 2L of water and snacks."],
          tipOfTheDay: "Before leaving Oviedo, visit the Cámara Santa in the Cathedral — it holds the Sudarium of Oviedo (cloth said to have wrapped Christ's face), one of Christianity's most venerated relics. Many pilgrims begin their Primitivo with this powerful visit."
        }
      }
    ]
  }
];

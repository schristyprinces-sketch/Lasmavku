import { 
  Municipality, 
  Destination, 
  Accommodation, 
  TourPackage, 
  ItineraryItem, 
  Booking, 
  UserAccount,
  ISOEvaluation 
} from '../types/tourism';

export const INITIAL_MUNICIPALITIES: Municipality[] = [
  {
    id: 'lapuyan',
    name: 'Lapuyan',
    fullName: 'Municipality of Lapuyan',
    tagline: 'Ancestral Heartland of the Subanen & Highland Cascades',
    description: 'Lapuyan is revered as the cultural cradle of the Subanen indigenous people in Zamboanga del Sur. Nestled amid lush highlands and fertile river valleys, it preserves centuries-old Subanen customs, traditional brass-casting and weaving, alongside pristine highland waterfalls and sacred forest reserves.',
    history: 'Officially organized in 1957, Lapuyan has historically been the royal seat of Subanen Timuays (traditional chieftains). The town name derives from the Subanen term "Lupuyan", referring to a traditional cooking hearth where travelers gathered. It remains a celebrated sanctuary of indigenous knowledge systems and sustainable forestry.',
    culturalHeritage: 'Home to traditional Subanen Buklog ceremonies, authentic Galingan loom-weaving, and native musical ensembles including the Agong and Kulintang.',
    festivals: [
      {
        name: 'Subayan Festival',
        month: 'October',
        description: 'A vibrant municipal celebration showcasing Subanen indigenous rituals, traditional thanksgiving dances, and native sports.'
      },
      {
        name: 'Araw ng Lapuyan',
        month: 'March',
        description: 'Commemoration of the town’s founding anniversary featuring cultural street dancing and agro-industrial exhibits.'
      }
    ],
    reasonsToVisit: [
      'Experience living Subanen indigenous traditions and ancestral crafts',
      'Discover secluded mountain waterfalls and refreshing natural river pools',
      'Enjoy scenic highland views with cool, mist-kissed mornings',
      'Taste indigenous organic mountain rice and Subanen native delicacies'
    ],
    coverImage: 'https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=1600&q=80',
    accentColor: '#059669',
    tourismOffice: {
      officeName: 'Lapuyan Municipal Tourism & Cultural Affairs Office',
      address: '2nd Floor, Municipal Hall, Poblacion, Lapuyan, Zamboanga del Sur 7037',
      contactNumber: '+63 917 842 1920',
      email: 'tourism.lapuyan@zamsur.gov.ph',
      officerInCharge: 'Hon. Datu Roderick Lumok (Tourism Officer)',
      gcashAccountName: 'LGU LAPUYAN TOURISM TRUST FUND',
      gcashNumber: '0917-842-1920'
    },
    keyAttractionsPreview: ['Lapuyan Biga Waterfalls', 'Subanen Ancestral Heritage Center', 'Mahayag River Cascade']
  },
  {
    id: 'san_miguel',
    name: 'San Miguel',
    fullName: 'Municipality of San Miguel',
    tagline: 'Agro-Eco Sanctuary & Scenic Mountain Pass',
    description: 'San Miguel is an emerald agricultural haven in the interior of the Zamboanga del Sur peninsula. Surrounded by gently rolling hills and mist-covered ridges bordering the Mount Timolan range, San Miguel is famous for rich organic produce, river treks, and warm rural hospitality.',
    history: 'Created in 1960, San Miguel evolved from a trading post between highland Subanen communities and coastal merchants into a thriving agro-tourism hub. The town honors St. Michael the Archangel as its patron protector.',
    culturalHeritage: 'Blends Subanen agricultural traditions with Christian festivity traditions, highlighted by annual harvest thanksgiving rituals.',
    festivals: [
      {
        name: 'San Miguel Fiesta & Harvest Fair',
        month: 'September',
        description: 'Grand feast honoring St. Michael the Archangel with agro-fair showcases and cultural presentations.'
      }
    ],
    reasonsToVisit: [
      'Tour high-elevation vegetable and dragon fruit farm trails',
      'Trek along pristine river headwaters with crystal-clear waters',
      'Camp under starry skies with panoramic hill views',
      'Experience community-based farm-to-table culinary experiences'
    ],
    coverImage: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1600&q=80',
    accentColor: '#16a34a',
    tourismOffice: {
      officeName: 'San Miguel Municipal Tourism Operations Office',
      address: 'Municipal Complex, Poblacion, San Miguel, Zamboanga del Sur 7029',
      contactNumber: '+63 928 319 8450',
      email: 'tourism.sanmiguel@zamsur.gov.ph',
      officerInCharge: 'Maria Elena Ramos (Tourism Officer)',
      gcashAccountName: 'LGU SAN MIGUEL TOURISM REVENUE',
      gcashNumber: '0928-319-8450'
    },
    keyAttractionsPreview: ['Timolan Ridge Viewpoint', 'Tinangnan River Cascades', 'San Miguel Agri-Heritage Eco-Park']
  },
  {
    id: 'margosatubig',
    name: 'Margosatubig',
    fullName: 'Municipality of Margosatubig',
    tagline: 'Historic Coastal Haven & Marine Sanctuary Gateway',
    description: 'One of the oldest recorded coastal settlements in Zamboanga del Sur, Margosatubig sits gracefully along the sheltered waters of Dumanquillas and Maligay Bays. It boasts powdery white sand sandbars at Igat Island, a thriving marine sanctuary, and a sunset baywalk promenade.',
    history: 'Historically established as a Spanish military stronghold and commercial port in the late 19th century. The name is derived from "malangos na tubig" meaning sweet/fragrant waters, referring to natural fresh springs emerging near the coastline.',
    culturalHeritage: 'A rich melting pot of Maritime Subanen, Tausug, and Visayan seafaring cultures, celebrated through annual maritime fluvial processions.',
    festivals: [
      {
        name: 'Mahin Festival (Sea Festival)',
        month: 'April',
        description: 'A coastal maritime festival celebrating the bounty of the ocean with decorated boat regattas and beach sports.'
      },
      {
        name: 'Poblacion Fiesta & Fluvial Parade',
        month: 'December',
        description: 'Fluvial devotion and civic festivities honoring Our Lady of Peace and Good Voyage.'
      }
    ],
    reasonsToVisit: [
      'Take a boat to the secluded white sands and sandbars of Igat Island',
      'Snorkel above pristine coral gardens at the Poblacion Marine Reserve',
      'Indulge in fresh mud crabs, tiger prawns, and ocean catches',
      'Stroll along the picturesque seaside baywalk at golden hour'
    ],
    coverImage: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1600&q=80',
    accentColor: '#0284c7',
    tourismOffice: {
      officeName: 'Margosatubig Tourism & Coastal Resource Center',
      address: 'Port Boulevard, Poblacion, Margosatubig, Zamboanga del Sur 7035',
      contactNumber: '+63 939 521 7720',
      email: 'tourism.margosatubig@zamsur.gov.ph',
      officerInCharge: 'Capt. Joel Tan (Tourism & Ports Coordinator)',
      gcashAccountName: 'LGU MARGOSATUBIG TOURISM DEV TRUST',
      gcashNumber: '0939-521-7720'
    },
    keyAttractionsPreview: ['Igat Island Sandbar & Reef', 'Margosatubig Coastal Baywalk', 'Fish Sanctuary Boardwalk']
  },
  {
    id: 'vincenzo_sagun',
    name: 'Vincenzo A. Sagun',
    fullName: 'Municipality of Vincenzo A. Sagun',
    tagline: 'Triton Island Wonderland & Coastal Rock Formations',
    description: 'Occupying the dramatic southwestern tip of the peninsula, Vincenzo A. Sagun is a coastal paradise famed for Triton Island, towering limestone sea cliffs, hidden lagoons, and crystal-clear turquoise waters teeming with marine life.',
    history: 'Named in honor of former Zamboanga del Sur Congressman Vincenzo A. Sagun, the municipality was officially founded in 1982. Its secluded coastal bays have preserved remarkable biodiversity and untouched coral reefs.',
    culturalHeritage: 'Seafaring fishing communities known for traditional handline tuna fishing, coastal folklore, and environmental stewardship.',
    festivals: [
      {
        name: 'Sagun Coastal Harvest Festival',
        month: 'February',
        description: 'Thanksgiving for marine bounty, featuring street dance and sea-produce exhibits.'
      }
    ],
    reasonsToVisit: [
      'Marvel at Triton Island’s dramatic natural sea arch and white sand beaches',
      'Explore Biu-os sea caves and panoramic coastal cliff overlooks',
      'World-class snorkeling and free-diving along unspoiled drop-offs',
      'Relax in serene coastal coves undisturbed by commercial crowds'
    ],
    coverImage: 'https://images.unsplash.com/photo-1519046904884-53103b34b206?auto=format&fit=crop&w=1600&q=80',
    accentColor: '#0d9488',
    tourismOffice: {
      officeName: 'Vincenzo A. Sagun Tourism & Eco-Tourism Office',
      address: 'Municipal Government Center, Vincenzo A. Sagun, Zamboanga del Sur 7036',
      contactNumber: '+63 945 810 6321',
      email: 'tourism.vsagun@zamsur.gov.ph',
      officerInCharge: 'Annaliza Gomez (Senior Tourism Officer)',
      gcashAccountName: 'LGU VINCENZO SAGUN TOURISM FUND',
      gcashNumber: '0945-810-6321'
    },
    keyAttractionsPreview: ['Triton Island & Rock Formations', 'Biu-os Coastal Sea Caves', 'Kapatagan Beach Cove']
  },
  {
    id: 'kumalarang',
    name: 'Kumalarang',
    fullName: 'Municipality of Kumalarang',
    tagline: 'Mangrove Eco-Capital & Dumanquillas Bay Floating Haven',
    description: 'Kumalarang is a renowned eco-tourism jewel situated where tranquil rivers meet the mangrove-fringed waters of Dumanquillas Bay. It is celebrated for its community-managed mangrove boardwalks, scenic floating dining cottages, and Lake Dasay freshwater reserve.',
    history: 'Kumalarang was formally created in 1959. Historically known for trading along river estuaries, its local government and fishing communities have pioneered community-based mangrove reforestation and eco-tourism stewardship.',
    culturalHeritage: 'Blends riverine fishing traditions, Subanen wood carving, and innovative community ecotourism cooperatives.',
    festivals: [
      {
        name: 'Dumanquillas Mangrove & Sea Festival',
        month: 'May',
        description: 'Celebrates wetland conservation, mangrove propagation, and coastal seafood heritage.'
      }
    ],
    reasonsToVisit: [
      'Dine on fresh seafood aboard floating cottages floating over Dumanquillas Bay',
      'Stroll the kilometer-long bamboo boardwalk through protected century-old mangroves',
      'Cruise or kayak along peaceful scenic river estuaries',
      'Visit Lake Dasay for tranquil birdwatching and serene freshwater vistas'
    ],
    coverImage: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1600&q=80',
    accentColor: '#047857',
    tourismOffice: {
      officeName: 'Kumalarang Eco-Tourism & Protected Seas Office',
      address: 'Poblacion Waterfront, Kumalarang, Zamboanga del Sur 7013',
      contactNumber: '+63 916 450 9188',
      email: 'tourism.kumalarang@zamsur.gov.ph',
      officerInCharge: 'Engr. Felipe Alcantara (Eco-Tourism Supervisor)',
      gcashAccountName: 'LGU KUMALARANG ECO-TOURISM REVENUE',
      gcashNumber: '0916-450-9188'
    },
    keyAttractionsPreview: ['Kumalarang Mangrove Ecopark Boardwalk', 'Dumanquillas Floating Cottages', 'Lake Dasay Reserve']
  }
];

export const INITIAL_DESTINATIONS: Destination[] = [
  // LAPUYAN
  {
    id: 'dest-lapuyan-1',
    municipalityId: 'lapuyan',
    name: 'Lapuyan Biga Waterfalls & River Gorge',
    category: 'waterfall',
    shortDescription: 'Multi-tiered mountain waterfall cascading into a crystal turquoise natural swimming basin.',
    fullDescription: 'Tucked within the pristine mountain ranges of Lapuyan, Biga Waterfalls features three distinct tiers of cascading waters surrounded by lush mossy cliff faces and virgin Dipterocarp forests. The main plunge pool offers invigorating fresh spring water, shaded by giant fern trees and native hardwoods.',
    entryFee: 50,
    environmentalFee: 20,
    barangay: 'Brgy. Tiguha, Lapuyan',
    operatingHours: '06:00 AM - 05:00 PM Daily',
    contactInfo: '+63 917 842 1920',
    highlights: ['Three-tiered cool natural pool', 'Bamboo resting cottages', 'Guided forest nature walk', 'Subanen sacred spring tribute'],
    amenities: ['Cottages for rent', 'Restrooms', 'Life vests available', 'Local guides'],
    images: [
      'https://images.unsplash.com/photo-1432405972618-c60b0225b8f9?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80'
    ],
    isFeatured: true,
    coordinates: { lat: 7.6253, lng: 123.1895 },
    tips: ['Bring reef-safe sunscreen or swimwear', 'Hire a registered Subanen local guide', 'Respect designated sacred rock areas']
  },
  {
    id: 'dest-lapuyan-2',
    municipalityId: 'lapuyan',
    name: 'Subanen Ancestral Heritage & Weaving Hall',
    category: 'cultural_heritage',
    shortDescription: 'Living cultural center preserving indigenous Subanen textiles, epic chants, and handicrafts.',
    fullDescription: 'The Subanen Cultural Pavilion in Lapuyan stands as a landmark of indigenous identity. Visitors can witness master weavers creating traditional Galingan tapestries, inspect centuries-old brass agongs and heirloom jewelry, and learn the oral histories of Timuay royalty.',
    entryFee: 30,
    environmentalFee: 10,
    barangay: 'Brgy. Poblacion, Lapuyan',
    operatingHours: '08:00 AM - 05:00 PM (Mon-Sat)',
    contactInfo: '+63 917 842 1920',
    highlights: ['Live loom weaving demonstrations', 'Subanen tribal artifacts museum', 'Cultural dance performance space', 'Authentic souvenir crafts'],
    amenities: ['Souvenir shop', 'Air-conditioned gallery', 'Audio-visual guide room', 'Parking area'],
    images: [
      'https://images.unsplash.com/photo-1584824486509-112e4181ff6b?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?auto=format&fit=crop&w=1200&q=80'
    ],
    isFeatured: true,
    coordinates: { lat: 7.6310, lng: 123.1942 },
    tips: ['Photography of sacred artifacts is permitted with permission', 'Buy directly from indigenous master weavers to support livelihoods']
  },
  {
    id: 'dest-lapuyan-3',
    municipalityId: 'lapuyan',
    name: 'Mahayag River Cascade & Hanging Bridge',
    category: 'viewpoint',
    shortDescription: 'Scenic suspension footbridge overlooking rapids and panoramic highland ridges.',
    fullDescription: 'Spanning across the clear rushing waters of Mahayag River, this 80-meter wooden and cable hanging bridge provides thrilling river views, popular photography vistas, and access to local organic fruit orchards.',
    entryFee: 20,
    barangay: 'Brgy. Mahayag, Lapuyan',
    operatingHours: '06:00 AM - 06:00 PM',
    contactInfo: '+63 917 842 1920',
    highlights: ['Thrilling hanging bridge crossing', 'River boulder photography', 'Fresh fruit stalls', 'Riverside picnic pavilions'],
    amenities: ['Picnic benches', 'Fruit stands', 'Motorcycle parking'],
    images: [
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80'
    ],
    isFeatured: false,
    coordinates: { lat: 7.6402, lng: 123.1788 },
    tips: ['Cross in small batches of 5-8 people', 'Great spot for sunrise photography']
  },

  // SAN MIGUEL
  {
    id: 'dest-sanmiguel-1',
    municipalityId: 'san_miguel',
    name: 'Mount Timolan Foothills & Forest Viewdeck',
    category: 'viewpoint',
    shortDescription: 'Breathtaking 360-degree viewpoint overlooking mountain passes and misty vegetable terraces.',
    fullDescription: 'Perched on the high ridges of San Miguel bordering the Mount Timolan protected landscape, this landscaped viewdeck offers panoramic vistas stretching all the way towards the southern bays. Perfect for dawn sea-of-clouds viewing.',
    entryFee: 40,
    environmentalFee: 15,
    barangay: 'Brgy. Dumalian, San Miguel',
    operatingHours: '05:00 AM - 07:00 PM',
    contactInfo: '+63 928 319 8450',
    highlights: ['Sea of clouds during early morning', 'Telescope viewing platform', 'Mountain coffee cafe', 'Flower garden photo walk'],
    amenities: ['Highland cafe', 'Clean rest facilities', 'Campground space', 'Viewing pavilions'],
    images: [
      'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=80'
    ],
    isFeatured: true,
    coordinates: { lat: 7.6890, lng: 123.2450 },
    tips: ['Arrive by 5:30 AM to catch the morning mist', 'Bring a light windbreaker jacket']
  },
  {
    id: 'dest-sanmiguel-2',
    municipalityId: 'san_miguel',
    name: 'Tinangnan River Cascades & Natural Pools',
    category: 'waterfall',
    shortDescription: 'Gentle river cascades flowing through mossy boulders with shallow pools ideal for family swimming.',
    fullDescription: 'Tinangnan River is renowned for its clean and tranquil flowing waters. Shallow boulder pools allow safe swimming for both children and adults, surrounded by shady coconut groves and bamboo clusters.',
    entryFee: 30,
    barangay: 'Brgy. Tinangnan, San Miguel',
    operatingHours: '07:00 AM - 05:00 PM',
    contactInfo: '+63 928 319 8450',
    highlights: ['Safe shallow swimming sections', 'Natural rock slides', 'Shaded riverside cottages', 'Fresh coconut juice available'],
    amenities: ['Cottages', 'Grilling stations', 'Restrooms'],
    images: [
      'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=1200&q=80'
    ],
    isFeatured: false,
    coordinates: { lat: 7.6740, lng: 123.2620 },
    tips: ['Strict clean-as-you-go policy applies', 'Bring reusable food containers']
  },
  {
    id: 'dest-sanmiguel-3',
    municipalityId: 'san_miguel',
    name: 'San Miguel Agri-Heritage Eco-Park',
    category: 'agritourism',
    shortDescription: 'Sustainable demonstration farm featuring dragon fruit orchards, honeybee apiary, and organic harvests.',
    fullDescription: 'An interactive agro-tourism park where guests can harvest fresh dragon fruit, taste raw stingless bee honey, and learn about organic farming methodologies supported by the local municipal agriculture office.',
    entryFee: 50,
    barangay: 'Brgy. Poblacion Sur, San Miguel',
    operatingHours: '08:00 AM - 04:30 PM',
    contactInfo: '+63 928 319 8450',
    highlights: ['Dragon fruit picking (in season)', 'Stingless bee honey tasting', 'Farm-to-table snack parlor', 'Organic gardening workshop'],
    amenities: ['Organic cafe', 'Plant nursery', 'Conference gazebo', 'Parking'],
    images: [
      'https://images.unsplash.com/photo-1595974482597-4b8da8879bc5?auto=format&fit=crop&w=1200&q=80'
    ],
    isFeatured: false,
    coordinates: { lat: 7.6812, lng: 123.2389 },
    tips: ['Wear comfortable walking shoes and a sun hat', 'Honey products make great gifts']
  },

  // MARGOSATUBIG
  {
    id: 'dest-margo-1',
    municipalityId: 'margosatubig',
    name: 'Igat Island White Sandbar & Coral Gardens',
    category: 'island_beach',
    shortDescription: 'Idyllic offshore island with sparkling powdery white sand, coral reefs, and sea turtle sightings.',
    fullDescription: 'Igat Island is Margosatubig’s premier maritime attraction. A short 20-minute motorized outrigger boat ride from the municipal pier brings you to an uninhabited gem ringed by vibrant coral reefs, shallow sandbars at low tide, and azure waters perfect for snorkeling.',
    entryFee: 100,
    environmentalFee: 30,
    barangay: 'Offshore, Margosatubig',
    operatingHours: '06:00 AM - 04:30 PM',
    contactInfo: '+63 939 521 7720',
    highlights: ['Powdery white sandbar', 'Pristine live coral garden snorkeling', 'Sea turtle sightings', 'Beach picnic pavilions'],
    amenities: ['Boat transfers arranged via LGU', 'Rental snorkeling masks', 'Solar-powered eco-cottages', 'Lifeguard station'],
    images: [
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1510414842594-a61c69b5ae57?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1200&q=80'
    ],
    isFeatured: true,
    coordinates: { lat: 7.5510, lng: 123.1620 },
    tips: ['Register at the Margosatubig Tourism Pier before boarding', 'Bring zero-waste trash bags']
  },
  {
    id: 'dest-margo-2',
    municipalityId: 'margosatubig',
    name: 'Margosatubig Sunset Baywalk & Seafood Plaza',
    category: 'viewpoint',
    shortDescription: 'Bustling coastal promenade with street food stalls, fresh seafood dining, and picturesque sunsets.',
    fullDescription: 'Stretching along the town’s waterfront, the Margosatubig Baywalk comes alive in the late afternoon. Visitors gather to admire spectacular fiery sunsets over Dumanquillas Bay while sampling grilled tuna panga, barbecue, and local seafood delicacies.',
    entryFee: 0,
    barangay: 'Brgy. Poblacion, Margosatubig',
    operatingHours: 'Open 24 Hours (Best 04:30 PM - 09:30 PM)',
    contactInfo: '+63 939 521 7720',
    highlights: ['Stunning sunset vista over the bay', 'Lively night food stalls & fresh seafood', 'Coastal jogging trail', 'Historic lighthouse backdrop'],
    amenities: ['Public benches', 'Street lamps', 'Seafood grills', 'Clean public restrooms'],
    images: [
      'https://images.unsplash.com/photo-1518495973542-4542c06a5843?auto=format&fit=crop&w=1200&q=80'
    ],
    isFeatured: true,
    coordinates: { lat: 7.5780, lng: 123.1690 },
    tips: ['Try the grilled blue marlin and garlic butter mud crabs', 'Great place to interact with friendly locals']
  },
  {
    id: 'dest-margo-3',
    municipalityId: 'margosatubig',
    name: 'Poblacion Fish Sanctuary & Mangrove Boardwalk',
    category: 'ecopark_mangrove',
    shortDescription: 'Protected coastal sanctuary where thousands of reef fish breed among mangrove root labyrinths.',
    fullDescription: 'A protected marine reserve managed jointly by the LGU and local fisherfolk cooperatives. A wooden walkway extends into the reef flats where visitors can hand-feed schooling fish and observe marine conservation in action.',
    entryFee: 30,
    environmentalFee: 10,
    barangay: 'Brgy. Poblacion, Margosatubig',
    operatingHours: '08:00 AM - 05:00 PM',
    contactInfo: '+63 939 521 7720',
    highlights: ['Fish feeding observation deck', 'Mangrove nursery propagation', 'Marine biology educational tour'],
    amenities: ['Boardwalk path', 'Rest areas', 'Educational signboards'],
    images: [
      'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1200&q=80'
    ],
    isFeatured: false,
    coordinates: { lat: 7.5720, lng: 123.1740 },
    tips: ['Only purchase authorized fish feed from the gate']
  },

  // VINCENZO A. SAGUN
  {
    id: 'dest-vsagun-1',
    municipalityId: 'vincenzo_sagun',
    name: 'Triton Island Rock Formations & White Coves',
    category: 'island_beach',
    shortDescription: 'Zamboanga del Sur’s premier coastal marvel featuring towering sea arches and white sand lagoons.',
    fullDescription: 'Triton Island is a geological masterpiece with dramatic limestone cliffs emerging directly from neon-blue seas. Famous for its natural stone archway, hidden lagoon, and powdery white sand pocket beaches, Triton Island offers an unforgettable island-hopping and snorkeling experience.',
    entryFee: 120,
    environmentalFee: 30,
    barangay: 'Offshore Brgy. Biu-os, Vincenzo A. Sagun',
    operatingHours: '06:00 AM - 05:00 PM',
    contactInfo: '+63 945 810 6321',
    highlights: ['Iconic natural limestone sea arch', 'Hidden lagoon swim', 'Vibrant coral reef drop-offs', 'Crystal clear turquoise water'],
    amenities: ['Boat docking area', 'LGU trained life guides', 'Shaded rock shelters'],
    images: [
      'https://images.unsplash.com/photo-1519046904884-53103b34b206?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=1200&q=80'
    ],
    isFeatured: true,
    coordinates: { lat: 7.4910, lng: 123.1490 },
    tips: ['Drone photography yields stunning aerial shots of the arch and lagoon', 'Wear sturdy aqua shoes for limestone exploration']
  },
  {
    id: 'dest-vsagun-2',
    municipalityId: 'vincenzo_sagun',
    name: 'Biu-os Coastal Sea Caves & Cliff Overlook',
    category: 'viewpoint',
    shortDescription: 'Dramatic coastal cliffs carved by ocean swells with accessible tidal sea caves.',
    fullDescription: 'At the southern headland of Biu-os, crashing waves have sculpted cavernous passages into the rock face. At low tide, visitors can explore the illuminated interior chambers of the sea caves and climb up to the scenic coastal cliff viewpoint overlooking the Celebes Sea.',
    entryFee: 50,
    barangay: 'Brgy. Biu-os, Vincenzo A. Sagun',
    operatingHours: '07:00 AM - 04:30 PM (Tide-dependent)',
    contactInfo: '+63 945 810 6321',
    highlights: ['Spacious tidal sea caves', 'Panoramic ocean cliff views', 'Sea eagle nesting cliffs', 'Fossilized coral formations'],
    amenities: ['Handrail trail', 'Guide post', 'Safety helmets provided'],
    images: [
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80'
    ],
    isFeatured: false,
    coordinates: { lat: 7.4820, lng: 123.1550 },
    tips: ['Coordinate with tourism staff regarding the daily tidal schedule']
  },
  {
    id: 'dest-vsagun-3',
    municipalityId: 'vincenzo_sagun',
    name: 'Kapatagan White Sand Beach Cove',
    category: 'island_beach',
    shortDescription: 'Peaceful mainland white sand beach surrounded by coconut palms and gentle waters.',
    fullDescription: 'For visitors seeking a relaxing beach day on the mainland without taking a boat, Kapatagan Beach offers soft golden-white sands, serene coconut groves, and calm waters ideal for leisurely swimming and stand-up paddleboarding.',
    entryFee: 30,
    barangay: 'Brgy. Kapatagan, Vincenzo A. Sagun',
    operatingHours: '06:00 AM - 06:00 PM',
    contactInfo: '+63 945 810 6321',
    highlights: ['Calm swimming cove', 'Coconut shade', 'Beach volleyball area', 'Fresh seafood barbecue'],
    amenities: ['Beach cottages', 'Restrooms', 'Fresh water showers', 'Food stalls'],
    images: [
      'https://images.unsplash.com/photo-1510414842594-a61c69b5ae57?auto=format&fit=crop&w=1200&q=80'
    ],
    isFeatured: false,
    coordinates: { lat: 7.5050, lng: 123.1410 },
    tips: ['Fresh young coconut (buko) is sold straight from local trees']
  },

  // KUMALARANG
  {
    id: 'dest-kuma-1',
    municipalityId: 'kumalarang',
    name: 'Kumalarang Century Mangrove Ecopark Boardwalk',
    category: 'ecopark_mangrove',
    shortDescription: 'Expansive 1.2-kilometer raised bamboo boardwalk winding through protected century-old mangrove forest.',
    fullDescription: 'A premier eco-tourism destination in Mindanao, the Kumalarang Mangrove Ecopark preserves over 100 hectares of pristine coastal wetland. A secure raised boardwalk allows tourists to stroll beneath towering Rhizophora mangroves, spot exotic migratory birds, and reach the peaceful bay watchtower.',
    entryFee: 50,
    environmentalFee: 20,
    barangay: 'Brgy. Diplo, Kumalarang',
    operatingHours: '06:30 AM - 05:30 PM',
    contactInfo: '+63 916 450 9188',
    highlights: ['1.2-kilometer bamboo boardwalk', 'Century-old mangrove root arches', 'Birdwatching observation tower', 'Mangrove sapling adoption program'],
    amenities: ['Boardwalk rest stations', 'Souvenir hut', 'Interpretive center', 'Restrooms'],
    images: [
      'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=1200&q=80'
    ],
    isFeatured: true,
    coordinates: { lat: 7.7420, lng: 123.1410 },
    tips: ['Early morning is prime time for spotting kingfishers and herons', 'Planting a mangrove seedling costs only ₱30']
  },
  {
    id: 'dest-kuma-2',
    municipalityId: 'kumalarang',
    name: 'Dumanquillas Bay Floating Cottages & Seafood Haven',
    category: 'island_beach',
    shortDescription: 'Spacious floating cottages moored on the bay where guests dine on fresh mud crabs and swim in calm waters.',
    fullDescription: 'Anchored gracefully over the calm blue waters of Dumanquillas Bay, these floating cottages provide an unforgettable tropical dining experience. Groups can relax in open-air bamboo cottages, swim in designated netted water enclosures, and feast on newly harvested seafood cooked to order.',
    entryFee: 80,
    barangay: 'Brgy. Picanan, Kumalarang',
    operatingHours: '08:00 AM - 05:00 PM',
    contactInfo: '+63 916 450 9188',
    highlights: ['Floating open-air bamboo dining cottages', 'Enclosed safe swimming pools on the bay', 'Live mud crab and tiger prawn cooking', 'Paddleboat and kayak rentals'],
    amenities: ['Cottage with dining tables and hammocks', 'Grill areas', 'Life jackets', 'Boat transfer to cottage'],
    images: [
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1518495973542-4542c06a5843?auto=format&fit=crop&w=1200&q=80'
    ],
    isFeatured: true,
    coordinates: { lat: 7.7280, lng: 123.1550 },
    tips: ['Advance booking is recommended on weekends', 'Order the steamed mud crab with spiced vinegar']
  },
  {
    id: 'dest-kuma-3',
    municipalityId: 'kumalarang',
    name: 'Lake Dasay Natural Sanctuary',
    category: 'ecopark_mangrove',
    shortDescription: 'Serene freshwater mountain lake surrounded by dense rainforest and native wildlife.',
    fullDescription: 'Located inland in Kumalarang, Lake Dasay is a peaceful freshwater crater lake cradled by green mountains. Renowned for its calm mirror-like waters, it is a haven for kayakers, bird enthusiasts, and campers looking for tranquility away from city noise.',
    entryFee: 40,
    barangay: 'Brgy. Dasay, Kumalarang',
    operatingHours: '06:00 AM - 05:00 PM',
    contactInfo: '+63 916 450 9188',
    highlights: ['Mirror-like lake reflection photography', 'Non-motorized kayak paddling', 'Lakeside tent camping', 'Lush rainforest trails'],
    amenities: ['Campground', 'Wooden kayaks', 'Restrooms', 'Lakeside benches'],
    images: [
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80'
    ],
    isFeatured: false,
    coordinates: { lat: 7.7710, lng: 123.1250 },
    tips: ['Bring insect repellent for lake hiking trails', 'Campers must register before 4 PM']
  }
];

export const INITIAL_ACCOMMODATIONS: Accommodation[] = [
  {
    id: 'acc-lapuyan-1',
    municipalityId: 'lapuyan',
    name: 'Subanen Highland Eco-Lodge & Cultural Homestay',
    category: 'inn_homestay',
    description: 'Rustic bamboo and native mahogany cottages nestled amidst mountain gardens with view of the valley and traditional Subanen decor.',
    pricePerNight: 850,
    contactNumber: '+63 917 842 1920',
    email: 'stay@lapuyanecolodge.ph',
    address: 'Sitio Kapatagan, Brgy. Poblacion, Lapuyan, Zamboanga del Sur',
    amenities: ['Complimentary Subanen breakfast', 'Private balcony with valley view', 'Hot water shower', 'High-speed Starlink WiFi', 'On-site native cafe'],
    images: ['https://images.unsplash.com/photo-1587061949409-02df41d5e562?auto=format&fit=crop&w=1000&q=80'],
    rating: 4.8,
    roomsAvailable: 8
  },
  {
    id: 'acc-sanmiguel-1',
    municipalityId: 'san_miguel',
    name: 'Timolan Crest Mountain Resort & Villas',
    category: 'resort',
    description: 'Highland resort overlooking rolling vegetable terraces with cool mountain breeze, cozy family suites, and swimming pool.',
    pricePerNight: 1200,
    contactNumber: '+63 928 319 8450',
    email: 'reservations@timolancrest.com',
    address: 'Ridge Highway, Brgy. Dumalian, San Miguel, Zamboanga del Sur',
    amenities: ['Swimming pool', 'Air-conditioned rooms', 'Restaurant & grill', 'Campfire area', 'Parking'],
    images: ['https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1000&q=80'],
    rating: 4.7,
    roomsAvailable: 12
  },
  {
    id: 'acc-margo-1',
    municipalityId: 'margosatubig',
    name: 'Maligay Bay Harbour Hotel & Seafood Suites',
    category: 'hotel',
    description: 'Comfortable seaside hotel adjacent to the Margosatubig Baywalk and port, featuring modern rooms with ocean views and an open-air rooftop dining deck.',
    pricePerNight: 1100,
    contactNumber: '+63 939 521 7720',
    email: 'info@maligaybayhotel.ph',
    address: 'Port Boulevard, Poblacion, Margosatubig, Zamboanga del Sur',
    amenities: ['Ocean-view rooms', 'Air conditioning', 'Rooftop seafood bistro', 'High-speed WiFi', 'Boat tour concierge'],
    images: ['https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=1000&q=80'],
    rating: 4.9,
    roomsAvailable: 14
  },
  {
    id: 'acc-vsagun-1',
    municipalityId: 'vincenzo_sagun',
    name: 'Triton Cove Oceanfront Beach Casitas',
    category: 'resort',
    description: 'Secluded beachfront casitas steps away from the white sands of Kapatagan Beach with boat dispatch directly to Triton Island.',
    pricePerNight: 1350,
    contactNumber: '+63 945 810 6321',
    email: 'escapes@tritoncove.ph',
    address: 'Coast Road, Brgy. Kapatagan, Vincenzo A. Sagun, Zamboanga del Sur',
    amenities: ['Beachfront access', 'Air-conditioned casitas', 'Snorkel gear rental', 'Fresh seafood kitchen', 'Island transfer service'],
    images: ['https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?auto=format&fit=crop&w=1000&q=80'],
    rating: 4.9,
    roomsAvailable: 6
  },
  {
    id: 'acc-kuma-1',
    municipalityId: 'kumalarang',
    name: 'Dumanquillas Overwater Floating Cottage Suites',
    category: 'floating_cottage',
    description: 'Unique overwater bamboo suites floating above Dumanquillas Bay with gentle wave sounds, hammock balconies, and direct lagoon swimming access.',
    pricePerNight: 950,
    contactNumber: '+63 916 450 9188',
    email: 'stay@dumanquillasfloating.com',
    address: 'Waterfront, Brgy. Picanan, Kumalarang, Zamboanga del Sur',
    amenities: ['Overwater hammock net', 'Enclosed saltwater swimming pool', 'Fresh seafood dining delivered to room', 'Solar power & fans', 'Kayak access'],
    images: ['https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1000&q=80'],
    rating: 4.8,
    roomsAvailable: 7
  }
];

export const INITIAL_PACKAGES: TourPackage[] = [
  {
    id: 'pkg-grand-circuit',
    name: 'LASMAVKU Grand 5-Town Heritage & Coastal Odyssey',
    tagline: 'The Ultimate 3D2N Circuit Traversing Lapuyan, San Miguel, Margosatubig, Vincenzo Sagun & Kumalarang',
    scope: 'cross_municipality',
    participatingMunicipalityIds: ['lapuyan', 'san_miguel', 'margosatubig', 'vincenzo_sagun', 'kumalarang'],
    description: 'An all-inclusive multi-municipality tour package that unifies all five LASMAVKU towns. Experience Subanen ancestral heritage and waterfalls in Lapuyan, agro-eco ridge vistas in San Miguel, island-hopping to Igat Island in Margosatubig, rock arches at Triton Island in Vincenzo A. Sagun, and floating cottage feasts in Kumalarang.',
    durationDays: 3,
    durationNights: 2,
    pricePerPerson: 3850,
    minPax: 4,
    maxPax: 15,
    includedDestinationIds: [
      'dest-lapuyan-1',
      'dest-lapuyan-2',
      'dest-sanmiguel-1',
      'dest-margo-1',
      'dest-margo-2',
      'dest-vsagun-1',
      'dest-kuma-1',
      'dest-kuma-2'
    ],
    inclusions: [
      'Roundtrip air-conditioned coaster/van transfers across all 5 municipalities',
      'All municipal tourism registration fees & environmental charges',
      'Chartered island-hopping outrigger boats to Triton Island & Igat Island',
      'Full boarding meals (3 Lunches, 2 Dinners, 2 Breakfasts featuring local seafood & farm produce)',
      'Subanen Cultural Heritage Center demonstration & entrance',
      'Accredited DOT regional tour coordinator & municipal local guides',
      'Official QR-coded travel permit & travel insurance coverage'
    ],
    exclusions: [
      'Personal snacks and souvenir shopping',
      'Optional airfare / land transport to initial assembly point',
      'Alcoholic beverages'
    ],
    coverImage: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80',
    badge: 'Flagship Shared Circuit',
    isPublished: true,
    difficulty: 'Moderate'
  },
  {
    id: 'pkg-twin-coastal',
    name: 'Twin Coastal Wonders: Triton Island & Igat Island',
    tagline: '2D1N Island-Hopping & Marine Sanctuary Expedition in Vincenzo Sagun and Margosatubig',
    scope: 'cross_municipality',
    participatingMunicipalityIds: ['vincenzo_sagun', 'margosatubig'],
    description: 'Designed for beach lovers and underwater explorers! Discover the majestic limestone sea arch and turquoise lagoons of Triton Island in Vincenzo A. Sagun, combined with the pure white sandbar and turtle coral gardens of Igat Island in Margosatubig.',
    durationDays: 2,
    durationNights: 1,
    pricePerPerson: 2750,
    minPax: 3,
    maxPax: 12,
    includedDestinationIds: [
      'dest-vsagun-1',
      'dest-vsagun-2',
      'dest-margo-1',
      'dest-margo-2'
    ],
    inclusions: [
      'Boat charters for Triton Island and Igat Island excursions',
      'Snorkeling gear & life vests',
      'Seaside seafood dinner at Margosatubig Sunset Baywalk',
      'Lunch picnic on Igat Island sandbar',
      'LGU environmental permits and accredited coastguard guides'
    ],
    exclusions: [
      'Hotel accommodation (available as booking add-on)',
      'Personal snacks and tips'
    ],
    coverImage: 'https://images.unsplash.com/photo-1519046904884-53103b34b206?auto=format&fit=crop&w=1200&q=80',
    badge: 'Bestseller Coastal Tour',
    isPublished: true,
    difficulty: 'Easy'
  },
  {
    id: 'pkg-heritage-highland',
    name: 'Subanen Ancestral Trails & Highland Cascades',
    tagline: '2D1N Immersive Indigenous Culture and Mountain Waterfalls in Lapuyan and San Miguel',
    scope: 'cross_municipality',
    participatingMunicipalityIds: ['lapuyan', 'san_miguel'],
    description: 'Step into the cool mountain heart of Zamboanga del Sur. Learn living Subanen traditions, loom weaving, and ancient music in Lapuyan, hike to the emerald cascades of Biga Waterfalls, and gaze upon the misty sea-of-clouds atop Mount Timolan ridge in San Miguel.',
    durationDays: 2,
    durationNights: 1,
    pricePerPerson: 2200,
    minPax: 2,
    maxPax: 14,
    includedDestinationIds: [
      'dest-lapuyan-1',
      'dest-lapuyan-2',
      'dest-lapuyan-3',
      'dest-sanmiguel-1',
      'dest-sanmiguel-3'
    ],
    inclusions: [
      'Highland van transport between Lapuyan and San Miguel',
      'Entrance to Subanen Cultural Hall with live loom weaving demonstration',
      'Guided trek to Lapuyan Biga Waterfalls and Mahayag Bridge',
      'Mount Timolan Ridge Viewdeck sunrise excursion',
      'Organic Subanen native lunch and coffee tasting'
    ],
    exclusions: [
      'Accommodation (can be bundled at Subanen Eco-Lodge)',
      'Extra personal purchases'
    ],
    coverImage: 'https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=1200&q=80',
    badge: 'Highland & Culture',
    isPublished: true,
    difficulty: 'Moderate'
  },
  {
    id: 'pkg-kumalarang-eco',
    name: 'Kumalarang Mangrove & Floating Bay Escape',
    tagline: '1-Day Eco-Sanctuary Walk & Dumanquillas Bay Floating Feast',
    scope: 'single_lgu',
    primaryMunicipalityId: 'kumalarang',
    participatingMunicipalityIds: ['kumalarang'],
    description: 'An invigorating day-tour escaping into nature. Walk along the 1.2-km Kumalarang Mangrove Boardwalk, plant your own mangrove seedling, and cruise to a floating cottage on Dumanquillas Bay for an unforgettable feast of fresh crabs and prawns.',
    durationDays: 1,
    durationNights: 0,
    pricePerPerson: 1250,
    minPax: 2,
    maxPax: 20,
    includedDestinationIds: [
      'dest-kuma-1',
      'dest-kuma-2',
      'dest-kuma-3'
    ],
    inclusions: [
      'Full access to Kumalarang Mangrove Ecopark Boardwalk',
      '1 Adopted Mangrove Seedling with commemorative certificate',
      'Floating cottage rental and boat transfer on Dumanquillas Bay',
      'Sumptuous local seafood lunch (Crabs, fish, rice, fresh fruits)',
      'Lake Dasay natural sanctuary side-trip'
    ],
    exclusions: [
      'Van transport to Kumalarang (assembly at Kumalarang Tourism Office)',
      'Personal drinks and souvenirs'
    ],
    coverImage: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1200&q=80',
    badge: 'Single LGU Eco-Special',
    isPublished: true,
    difficulty: 'Easy'
  },
  {
    id: 'pkg-lapuyan-waterfalls',
    name: 'Lapuyan Waterfalls & Tribal Weaving Day Expedition',
    tagline: '1-Day Plunge into Cascading Falls and Subanen Living Heritage',
    scope: 'single_lgu',
    primaryMunicipalityId: 'lapuyan',
    participatingMunicipalityIds: ['lapuyan'],
    description: 'Experience Lapuyan in a day! Start with a cultural immersion at the Subanen Heritage Center, followed by a refreshing hike and swim in the cool waters of Biga Waterfalls, ending with scenic sunset photos at Mahayag Hanging Bridge.',
    durationDays: 1,
    durationNights: 0,
    pricePerPerson: 1100,
    minPax: 2,
    maxPax: 15,
    includedDestinationIds: [
      'dest-lapuyan-1',
      'dest-lapuyan-2',
      'dest-lapuyan-3'
    ],
    inclusions: [
      'Entrance fees to Biga Waterfalls and Cultural Heritage Center',
      'Traditional Subanen native lunch served in bamboo baskets',
      'Subanen community guide fee',
      'Certificate of cultural immersion'
    ],
    exclusions: [
      'Personal transport to Lapuyan Poblacion',
      'Souvenir purchases'
    ],
    coverImage: 'https://images.unsplash.com/photo-1432405972618-c60b0225b8f9?auto=format&fit=crop&w=1200&q=80',
    badge: 'Single LGU Explorer',
    isPublished: true,
    difficulty: 'Moderate'
  },
  {
    id: 'pkg-margo-island-escape',
    name: 'Margosatubig Igat Island & Heritage Bay Tour',
    tagline: '1-Day Island Sun, Snorkeling & Sunset Promenade',
    scope: 'single_lgu',
    primaryMunicipalityId: 'margosatubig',
    participatingMunicipalityIds: ['margosatubig'],
    description: 'Spend an unforgettable day exploring the turquoise waters and sandbars of Igat Island, followed by an afternoon tour of the Poblacion Fish Sanctuary and a relaxing stroll along the famous Margosatubig Sunset Baywalk.',
    durationDays: 1,
    durationNights: 0,
    pricePerPerson: 1350,
    minPax: 3,
    maxPax: 15,
    includedDestinationIds: [
      'dest-margo-1',
      'dest-margo-2',
      'dest-margo-3'
    ],
    inclusions: [
      'Boat transfer to Igat Island sandbar and reef sanctuary',
      'Snorkeling gear & life jackets',
      'Seafood picnic lunch on the island',
      'Fish feeding experience at Poblacion Sanctuary',
      'LGU environmental permits'
    ],
    exclusions: [
      'Travel to Margosatubig pier',
      'Dinner at the sunset baywalk'
    ],
    coverImage: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80',
    badge: 'Single LGU Coastal',
    isPublished: true,
    difficulty: 'Easy'
  }
];

export const INITIAL_ITINERARIES: ItineraryItem[] = [
  // GRAND CIRCUIT (pkg-grand-circuit) - DAY 1
  {
    id: 'itin-gc-d1-1',
    packageId: 'pkg-grand-circuit',
    dayNumber: 1,
    sequence: 1,
    timeSlot: '07:30 AM - 08:30 AM',
    activityTitle: 'Assembly & Cultural Briefing in Lapuyan',
    location: 'Lapuyan Municipal Tourism Hall',
    description: 'Welcome reception by the Lapuyan Municipal Tourism Office. Traditional Subanen greeting ritual, orientation, and issuance of LASMAVKU travel badge.',
    destinationId: 'dest-lapuyan-2',
    mealsIncluded: 'Welcome Mountain Brew & Native Rice Cakes'
  },
  {
    id: 'itin-gc-d1-2',
    packageId: 'pkg-grand-circuit',
    dayNumber: 1,
    sequence: 2,
    timeSlot: '08:30 AM - 10:30 AM',
    activityTitle: 'Subanen Living Heritage & Master Weaving Demonstration',
    location: 'Subanen Cultural Heritage Center, Lapuyan',
    description: 'Explore royal brass heirlooms, listen to epic oral chants, and watch master weavers create intricate Galingan textiles.',
    destinationId: 'dest-lapuyan-2'
  },
  {
    id: 'itin-gc-d1-3',
    packageId: 'pkg-grand-circuit',
    dayNumber: 1,
    sequence: 3,
    timeSlot: '11:00 AM - 02:00 PM',
    activityTitle: 'Biga Waterfalls Trek & Bamboo Basket Lunch',
    location: 'Lapuyan Biga Waterfalls',
    description: 'Trek to the three-tiered cascading waterfall. Enjoy swimming in the turquoise freshwater pools and savor a Subanen native lunch served in woven bamboo.',
    destinationId: 'dest-lapuyan-1',
    mealsIncluded: 'Native Chicken in Bamboo & Organic Mountain Rice'
  },
  {
    id: 'itin-gc-d1-4',
    packageId: 'pkg-grand-circuit',
    dayNumber: 1,
    sequence: 4,
    timeSlot: '02:45 PM - 05:30 PM',
    activityTitle: 'Highland Scenic Transfer to San Miguel Ridge',
    location: 'Mount Timolan Foothills, San Miguel',
    description: 'Scenic drive through misty mountain ridges to San Miguel. Sunset viewing from the viewdeck and dragon fruit tasting.',
    destinationId: 'dest-sanmiguel-1'
  },
  {
    id: 'itin-gc-d1-5',
    packageId: 'pkg-grand-circuit',
    dayNumber: 1,
    sequence: 5,
    timeSlot: '06:30 PM - 08:30 PM',
    activityTitle: 'Highland Welcome Dinner & Overnight',
    location: 'Timolan Crest Mountain Villas / Subanen Eco-Lodge',
    description: 'Highland farm-to-table dinner under the stars with live acoustic guitar and bonfires.',
    mealsIncluded: 'Dinner (Grilled highland pork & garden vegetables)'
  },

  // GRAND CIRCUIT - DAY 2
  {
    id: 'itin-gc-d2-1',
    packageId: 'pkg-grand-circuit',
    dayNumber: 2,
    sequence: 6,
    timeSlot: '06:00 AM - 07:30 AM',
    activityTitle: 'Sea of Clouds Sunrise & Breakfast in San Miguel',
    location: 'Timolan Crest Viewdeck, San Miguel',
    description: 'Watch the sunrise pierce through the rolling sea of clouds over the Zamboanga peninsula ridges.',
    destinationId: 'dest-sanmiguel-1',
    mealsIncluded: 'Breakfast with Native Batil Patung & Hot Cocoa'
  },
  {
    id: 'itin-gc-d2-2',
    packageId: 'pkg-grand-circuit',
    dayNumber: 2,
    sequence: 7,
    timeSlot: '08:30 AM - 12:30 PM',
    activityTitle: 'Triton Island Rock Arch & Sea Cave Island-Hopping',
    location: 'Triton Island, Vincenzo A. Sagun',
    description: 'Transfer to Vincenzo A. Sagun coastal pier. Outrigger boat excursion to Triton Island’s limestone arches, hidden lagoon swimming, and snorkeling.',
    destinationId: 'dest-vsagun-1'
  },
  {
    id: 'itin-gc-d2-3',
    packageId: 'pkg-grand-circuit',
    dayNumber: 2,
    sequence: 8,
    timeSlot: '01:00 PM - 02:30 PM',
    activityTitle: 'Fresh Ocean Harvest Lunch in Vincenzo Sagun',
    location: 'Kapatagan Beach Cove, Vincenzo A. Sagun',
    description: 'Beachside lunch featuring newly harvested yellowfin tuna, sea grapes (lato), and grilled calamari.',
    destinationId: 'dest-vsagun-3',
    mealsIncluded: 'Seafood Fiesta Lunch'
  },
  {
    id: 'itin-gc-d2-4',
    packageId: 'pkg-grand-circuit',
    dayNumber: 2,
    sequence: 9,
    timeSlot: '03:30 PM - 06:30 PM',
    activityTitle: 'Margosatubig Igat Island Sandbar & Sunset Baywalk',
    location: 'Margosatubig Baywalk & Port',
    description: 'Cruise to Margosatubig’s famous Igat Island sandbar for golden hour swims, followed by an evening walk along the Sunset Baywalk.',
    destinationId: 'dest-margo-1'
  },
  {
    id: 'itin-gc-d2-5',
    packageId: 'pkg-grand-circuit',
    dayNumber: 2,
    sequence: 10,
    timeSlot: '07:00 PM - 09:00 PM',
    activityTitle: 'Seaside Seafood Banquet & Port Hotel Check-in',
    location: 'Maligay Bay Harbour Hotel, Margosatubig',
    description: 'Dinner feast featuring Margosatubig mud crabs in sweet chili garlic and check-in to harbour suites.',
    destinationId: 'dest-margo-2',
    mealsIncluded: 'Dinner (Mud crabs & garlic rice)'
  },

  // GRAND CIRCUIT - DAY 3
  {
    id: 'itin-gc-d3-1',
    packageId: 'pkg-grand-circuit',
    dayNumber: 3,
    sequence: 11,
    timeSlot: '07:00 AM - 08:30 AM',
    activityTitle: 'Harbour Breakfast & Fish Sanctuary Walk',
    location: 'Poblacion Fish Sanctuary, Margosatubig',
    description: 'Hand-feed schooling reef fish at the coastal sanctuary before departing for Kumalarang.',
    destinationId: 'dest-margo-3',
    mealsIncluded: 'Breakfast'
  },
  {
    id: 'itin-gc-d3-2',
    packageId: 'pkg-grand-circuit',
    dayNumber: 3,
    sequence: 12,
    timeSlot: '09:30 AM - 11:30 AM',
    activityTitle: 'Century Mangrove Ecopark Boardwalk & Tree Planting',
    location: 'Kumalarang Mangrove Ecopark, Kumalarang',
    description: 'Walk along the 1.2-km raised bamboo boardwalk under giant mangrove arches. Plant an official mangrove sapling dedicated in your name.',
    destinationId: 'dest-kuma-1'
  },
  {
    id: 'itin-gc-d3-3',
    packageId: 'pkg-grand-circuit',
    dayNumber: 3,
    sequence: 13,
    timeSlot: '12:00 PM - 02:30 PM',
    activityTitle: 'Dumanquillas Bay Floating Cottage Grand Finale Lunch',
    location: 'Dumanquillas Bay Floating Cottages, Kumalarang',
    description: 'Celebrate the circuit culmination aboard a floating bamboo cottage with fresh seafood feast, hammock relaxation, and swimming in the calm bay.',
    destinationId: 'dest-kuma-2',
    mealsIncluded: 'Grand Seafood Buffet (Crabs, tiger prawns, grilled squid)'
  },
  {
    id: 'itin-gc-d3-4',
    packageId: 'pkg-grand-circuit',
    dayNumber: 3,
    sequence: 14,
    timeSlot: '03:00 PM - 04:30 PM',
    activityTitle: 'Lake Dasay Natural Sanctuary Visit & Departure',
    location: 'Lake Dasay, Kumalarang',
    description: 'Tranquil stop at freshwater Lake Dasay for group photos, souvenir awarding, and farewell ceremony before airport/terminal transfer.',
    destinationId: 'dest-kuma-3'
  },

  // TWIN COASTAL MARVELS (pkg-twin-coastal)
  {
    id: 'itin-tc-d1-1',
    packageId: 'pkg-twin-coastal',
    dayNumber: 1,
    sequence: 1,
    timeSlot: '08:00 AM - 09:00 AM',
    activityTitle: 'Registration & Coastal Briefing at Vincenzo Sagun',
    location: 'Vincenzo A. Sagun Tourism Wharf',
    description: 'Safety orientation, life vest fitting, and dispatch for Triton Island.',
    destinationId: 'dest-vsagun-1'
  },
  {
    id: 'itin-tc-d1-2',
    packageId: 'pkg-twin-coastal',
    dayNumber: 1,
    sequence: 2,
    timeSlot: '09:30 AM - 01:30 PM',
    activityTitle: 'Triton Island Rock Arch, Lagoon & Snorkeling',
    location: 'Triton Island',
    description: 'Explore the iconic natural limestone arch, swim in secluded turquoise lagoons, and snorkel vibrant coral drop-offs.',
    destinationId: 'dest-vsagun-1',
    mealsIncluded: 'Packed Beach Picnic Lunch'
  },
  {
    id: 'itin-tc-d1-3',
    packageId: 'pkg-twin-coastal',
    dayNumber: 1,
    sequence: 3,
    timeSlot: '02:30 PM - 04:30 PM',
    activityTitle: 'Biu-os Sea Caves & Ocean Cliff Overlook',
    location: 'Biu-os Coastal Sea Caves',
    description: 'Visit dramatic tidal caves and take in expansive views of the Celebes Sea.',
    destinationId: 'dest-vsagun-2'
  },
  {
    id: 'itin-tc-d1-4',
    packageId: 'pkg-twin-coastal',
    dayNumber: 1,
    sequence: 4,
    timeSlot: '05:30 PM - 08:30 PM',
    activityTitle: 'Transfer to Margosatubig & Sunset Baywalk Dinner',
    location: 'Margosatubig Sunset Baywalk',
    description: 'Golden hour stroll and fresh seafood dinner at the coastal promenade.',
    destinationId: 'dest-margo-2',
    mealsIncluded: 'Dinner (Grilled tuna & garlic shrimp)'
  },
  {
    id: 'itin-tc-d2-1',
    packageId: 'pkg-twin-coastal',
    dayNumber: 2,
    sequence: 5,
    timeSlot: '07:30 AM - 12:00 PM',
    activityTitle: 'Igat Island White Sandbar & Turtle Sanctuary',
    location: 'Igat Island, Margosatubig',
    description: 'Boat crossing to Igat Island. Walk on pristine sandbars, swim in azure waters, and snorkel with sea turtles.',
    destinationId: 'dest-margo-1',
    mealsIncluded: 'Island Seafood Lunch'
  },
  {
    id: 'itin-tc-d2-2',
    packageId: 'pkg-twin-coastal',
    dayNumber: 2,
    sequence: 6,
    timeSlot: '01:30 PM - 03:30 PM',
    activityTitle: 'Fish Sanctuary Tour & Souvenir Shopping',
    location: 'Poblacion Fish Sanctuary & Market, Margosatubig',
    description: 'Walk the mangrove boardwalk and purchase dried fish delicacies before journey home.',
    destinationId: 'dest-margo-3'
  }
];

export const INITIAL_BOOKINGS: Booking[] = [
  {
    id: 'book-001',
    bookingReference: 'LSM-2026-0814',
    packageId: 'pkg-grand-circuit',
    packageName: 'LASMAVKU Grand 5-Town Heritage & Coastal Odyssey',
    participatingMunicipalityIds: ['lapuyan', 'san_miguel', 'margosatubig', 'vincenzo_sagun', 'kumalarang'],
    touristId: 'usr-tourist-1',
    touristName: 'Christy Princes',
    touristEmail: 'schristyprinces@gmail.com',
    touristPhone: '0917-555-4321',
    emergencyContact: 'Roberto Princes (Father) - 0918-222-3344',
    travelDate: '2026-11-20',
    paxCount: 4,
    selectedHotelId: 'acc-lapuyan-1',
    selectedHotelName: 'Subanen Highland Eco-Lodge & Cultural Homestay',
    hotelNights: 2,
    pricePerPersonSnapshot: 3850,
    packageSubtotal: 15400,
    hotelSubtotal: 1700,
    environmentalFee: 400,
    totalAmount: 17500,
    specialRequests: 'Two travelers prefer vegetarian and seafood only dishes.',
    paymentStatus: 'verified_paid',
    bookingStatus: 'approved',
    gcashReceipt: {
      referenceNumber: '904812398511',
      senderName: 'Christy Princes',
      senderNumber: '0917-555-4321',
      amountSent: 17500,
      uploadedAt: '2026-10-10 14:32',
      receiptImageUrl: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=600&q=80'
    },
    qrToken: 'TOKEN-LSM-0814-VERIFIED-AUTH-ZAMSUR',
    qrCodeDataUrl: '',
    reviewedBy: 'Super Admin / Provincial Tourism',
    reviewedAt: '2026-10-10 16:15',
    createdAt: '2026-10-10 14:10'
  },
  {
    id: 'book-002',
    bookingReference: 'LSM-2026-0922',
    packageId: 'pkg-twin-coastal',
    packageName: 'Twin Coastal Wonders: Triton Island & Igat Island',
    participatingMunicipalityIds: ['vincenzo_sagun', 'margosatubig'],
    touristId: 'usr-tourist-2',
    touristName: 'Atty. Rafael Mercado',
    touristEmail: 'rafael.mercado@lawphil.com',
    touristPhone: '0920-888-9911',
    emergencyContact: 'Evelyn Mercado - 0917-123-4567',
    travelDate: '2026-11-25',
    paxCount: 6,
    selectedHotelId: 'acc-margo-1',
    selectedHotelName: 'Maligay Bay Harbour Hotel & Seafood Suites',
    hotelNights: 1,
    pricePerPersonSnapshot: 2750,
    packageSubtotal: 16500,
    hotelSubtotal: 1100,
    environmentalFee: 300,
    totalAmount: 17900,
    specialRequests: 'Please provide high-grade snorkeling goggles for elderly guest.',
    paymentStatus: 'receipt_submitted',
    bookingStatus: 'pending_review',
    gcashReceipt: {
      referenceNumber: '811902834710',
      senderName: 'Rafael Mercado',
      senderNumber: '0920-888-9911',
      amountSent: 17900,
      uploadedAt: '2026-10-11 09:20',
      receiptImageUrl: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=600&q=80'
    },
    qrToken: 'TOKEN-LSM-0922-PENDING-REV',
    createdAt: '2026-10-11 09:15'
  },
  {
    id: 'book-003',
    bookingReference: 'LSM-2026-1033',
    packageId: 'pkg-kumalarang-eco',
    packageName: 'Kumalarang Mangrove & Floating Bay Escape',
    participatingMunicipalityIds: ['kumalarang'],
    touristId: 'usr-tourist-3',
    touristName: 'Janice Dela Cruz',
    touristEmail: 'janice.dc@travelblog.ph',
    touristPhone: '0995-341-7788',
    emergencyContact: 'Carlo Cruz - 0995-111-2233',
    travelDate: '2026-12-05',
    paxCount: 5,
    selectedHotelId: 'acc-kuma-1',
    selectedHotelName: 'Dumanquillas Overwater Floating Cottage Suites',
    hotelNights: 1,
    pricePerPersonSnapshot: 1250,
    packageSubtotal: 6250,
    hotelSubtotal: 950,
    environmentalFee: 150,
    totalAmount: 7350,
    paymentStatus: 'verified_paid',
    bookingStatus: 'approved',
    gcashReceipt: {
      referenceNumber: '928374182903',
      senderName: 'Janice Dela Cruz',
      senderNumber: '0995-341-7788',
      amountSent: 7350,
      uploadedAt: '2026-10-09 11:00',
      receiptImageUrl: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=600&q=80'
    },
    qrToken: 'TOKEN-LSM-1033-VERIFIED-AUTH-ZAMSUR',
    reviewedBy: 'Kumalarang LGU Tourism',
    reviewedAt: '2026-10-09 13:40',
    createdAt: '2026-10-09 10:45'
  }
];

export const INITIAL_USERS: UserAccount[] = [
  {
    id: 'usr-tourist-1',
    username: 'christy.princes',
    fullName: 'Christy Princes',
    email: 'schristyprinces@gmail.com',
    phone: '0917-555-4321',
    role: 'tourist',
    title: 'Registered Tourist & Traveler'
  },
  {
    id: 'usr-lgu-lapuyan',
    username: 'admin.lapuyan',
    fullName: 'Datu Roderick Lumok',
    email: 'tourism.lapuyan@zamsur.gov.ph',
    phone: '0917-842-1920',
    role: 'lgu_admin',
    assignedMunicipalityId: 'lapuyan',
    title: 'Lapuyan Municipal Tourism Officer'
  },
  {
    id: 'usr-lgu-sanmiguel',
    username: 'admin.sanmiguel',
    fullName: 'Maria Elena Ramos',
    email: 'tourism.sanmiguel@zamsur.gov.ph',
    phone: '0928-319-8450',
    role: 'lgu_admin',
    assignedMunicipalityId: 'san_miguel',
    title: 'San Miguel Tourism Officer'
  },
  {
    id: 'usr-lgu-margo',
    username: 'admin.margosatubig',
    fullName: 'Capt. Joel Tan',
    email: 'tourism.margosatubig@zamsur.gov.ph',
    phone: '0939-521-7720',
    role: 'lgu_admin',
    assignedMunicipalityId: 'margosatubig',
    title: 'Margosatubig Ports & Tourism Head'
  },
  {
    id: 'usr-lgu-vsagun',
    username: 'admin.vsagun',
    fullName: 'Annaliza Gomez',
    email: 'tourism.vsagun@zamsur.gov.ph',
    phone: '0945-810-6321',
    role: 'lgu_admin',
    assignedMunicipalityId: 'vincenzo_sagun',
    title: 'Vincenzo A. Sagun Tourism Officer'
  },
  {
    id: 'usr-lgu-kumalarang',
    username: 'admin.kumalarang',
    fullName: 'Engr. Felipe Alcantara',
    email: 'tourism.kumalarang@zamsur.gov.ph',
    phone: '0916-450-9188',
    role: 'lgu_admin',
    assignedMunicipalityId: 'kumalarang',
    title: 'Kumalarang Eco-Tourism Supervisor'
  },
  {
    id: 'usr-superadmin',
    username: 'superadmin.zamsur',
    fullName: 'Atty. Victorina Alano',
    email: 'provincial.tourism@zamboangadelsur.gov.ph',
    phone: '0918-999-0011',
    role: 'super_admin',
    title: 'Provincial Tourism Coordinator & System Administrator'
  }
];

export const INITIAL_ISO_EVALUATIONS: ISOEvaluation[] = [
  {
    id: 'eval-001',
    evaluatorName: 'Engr. Felipe Alcantara',
    evaluatorRole: 'LGU Tourism Officer',
    municipalityAffiliation: 'Kumalarang Tourism Office',
    date: '2026-10-11',
    scores: {
      functionalSuitability: 4.8,
      performanceEfficiency: 4.9,
      usability: 4.7,
      reliability: 4.8,
      security: 4.9,
      maintainability: 4.8,
      portability: 4.9
    },
    qualitativeFeedback: 'The multi-municipality coordination and QR-code ticket validation solves our manual receipt verification challenges. Very easy for tourism gatekeepers to operate on mobile phones.'
  },
  {
    id: 'eval-002',
    evaluatorName: 'Christy Princes',
    evaluatorRole: 'Tourist / Traveler',
    date: '2026-10-11',
    scores: {
      functionalSuitability: 4.9,
      performanceEfficiency: 4.8,
      usability: 5.0,
      reliability: 4.8,
      security: 4.9,
      maintainability: 4.7,
      portability: 5.0
    },
    qualitativeFeedback: 'Transparent price calculation with GCash payment reference makes booking the 5-town circuit effortless. The printable QR ticket looks sleek and professional.'
  },
  {
    id: 'eval-003',
    evaluatorName: 'Prof. A. S. Macarambon',
    evaluatorRole: 'Academic Panel / Researcher',
    date: '2026-10-12',
    scores: {
      functionalSuitability: 4.9,
      performanceEfficiency: 4.8,
      usability: 4.8,
      reliability: 4.9,
      security: 5.0,
      maintainability: 5.0,
      portability: 4.9
    },
    qualitativeFeedback: 'The database design rigorously addresses the junction table between packages and destinations (tbl_package_destinations). Role-based access control between LGU Admins and Super Admin is properly isolated.'
  }
];

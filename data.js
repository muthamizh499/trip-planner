const touristData = {
  destinations: {
    tokyo: {
      name: "Tokyo",
      country: "Japan",
      coordinates: [35.6762, 139.6503],
      summary: "A dazzling metropolis blending ultra-modern technology, towering skyscrapers, and neon-lit streets with centuries-old temples, tranquil gardens, and rich culinary traditions.",
      bestTime: "March to May (Cherry Blossom) or September to November (Autumn foliage)",
      budgetLevel: "$$$",
      currency: "JPY (Japanese Yen)",
      currencySymbol: "¥",
      exchangeRate: 155.20, // 1 USD in JPY
      categories: ["Culture", "Food", "Tech", "Shopping"],
      attractions: [
        {
          name: "Senso-ji Temple",
          description: "Tokyo's oldest and most iconic Buddhist temple, located in Asakusa, featuring the famous Thunder Gate.",
          category: "Culture",
          coordinates: [35.7148, 139.7967]
        },
        {
          name: "Shibuya Crossing",
          description: "The world's busiest pedestrian intersection, surrounded by massive electronic screens and bustling shopping complexes.",
          category: "Modern",
          coordinates: [35.6595, 139.7005]
        },
        {
          name: "Meiji Jingu Shrine",
          description: "A serene Shinto shrine dedicated to Emperor Meiji, nestled in a massive forested park in Shibuya.",
          category: "Nature & Culture",
          coordinates: [35.6764, 139.6993]
        },
        {
          name: "Akihabara Electric Town",
          description: "The global hub for electronics, anime merchandise, manga culture, and maid cafes.",
          category: "Tech",
          coordinates: [35.6997, 139.7715]
        }
      ],
      costs: {
        budget: { accommodation: 4500, meals: 2500, transport: 800, activities: 1500 },
        moderate: { accommodation: 12000, meals: 6000, transport: 1500, activities: 4000 },
        luxury: { accommodation: 45000, meals: 20000, transport: 5000, activities: 12000 }
      },
      phrases: [
        { original: "こんにちは (Konnichiwa)", translation: "Hello", pronunciation: "Kon-nee-chee-wah" },
        { original: "ありがとう (Arigatou gozaimasu)", translation: "Thank you very much", pronunciation: "Ah-ree-gah-toh goh-zy-mah-suh" },
        { original: "すみません (Sumimasen)", translation: "Excuse me / Sorry", pronunciation: "Su-mee-mah-sen" },
        { original: "おいくらですか？ (O-ikura desu ka?)", translation: "How much is this?", pronunciation: "Oh-ee-koo-rah dess kah?" },
        { original: "英語が話せますか？ (Eigo ga hanasemasu ka?)", translation: "Can you speak English?", pronunciation: "Ay-goh gah hah-nah-seh-mah-suh kah?" }
      ],
      itinerary: [
        {
          day: 1,
          title: "Historic Tokyo & Neon Lights",
          activities: [
            "Morning: Visit **Senso-ji Temple** in Asakusa and stroll through Nakamise shopping street.",
            "Afternoon: Take a river cruise down the Sumida River to Odaiba, the futuristic shopping island.",
            "Evening: Experience the sensory overload of **Shibuya Crossing** and have dinner at an Izakaya."
          ]
        },
        {
          day: 2,
          title: "Shrines, Pop Culture & Fashion",
          activities: [
            "Morning: Take a peaceful walk through the forested grounds of **Meiji Jingu Shrine**.",
            "Afternoon: Explore the quirky fashion and street food in Harajuku (Takeshita Street) and Omotesando.",
            "Evening: Dive into geek culture in **Akihabara Electric Town** or see city views from Tokyo Metropolitan Government Building."
          ]
        },
        {
          day: 3,
          title: "Gardens & High-End Tokyo",
          activities: [
            "Morning: Wander the beautiful landscape of **Shinjuku Gyoen National Garden**.",
            "Afternoon: Explore luxury shopping and fine dining in Ginza, or visit Tsukiji Outer Market for fresh sushi.",
            "Evening: Walk through Roppongi Hills for digital art displays and modern bar scenes."
          ]
        }
      ]
    },
    paris: {
      name: "Paris",
      country: "France",
      coordinates: [48.8566, 2.3522],
      summary: "The global center for art, fashion, gastronomy, and culture. A city defined by its 19th-century cityscape, the winding Seine, and romantic sidewalk cafes.",
      bestTime: "April to June (Spring) or September to October (Autumn)",
      budgetLevel: "$$$",
      currency: "EUR (Euro)",
      currencySymbol: "€",
      exchangeRate: 0.92,
      categories: ["Culture", "Art", "Romantic", "Food"],
      attractions: [
        {
          name: "Eiffel Tower",
          description: "The iconic wrought-iron lattice tower on the Champ de Mars, offering breathtaking panoramas of the city.",
          category: "Sightseeing",
          coordinates: [48.8584, 2.2945]
        },
        {
          name: "Louvre Museum",
          description: "The world's largest art museum, home to the Mona Lisa and housed in a historic royal palace.",
          category: "Art",
          coordinates: [48.8606, 2.3376]
        },
        {
          name: "Notre-Dame Cathedral",
          description: "A masterpiece of French Gothic architecture, famed for its portals, stained-glass windows, and gargoyles.",
          category: "Culture",
          coordinates: [48.8530, 2.3499]
        },
        {
          name: "Montmartre & Sacré-Cœur",
          description: "A charming hilltop district renowned for its artistic history, winding cobblestone streets, and the white basilica.",
          category: "Romantic",
          coordinates: [48.8867, 2.3431]
        }
      ],
      costs: {
        budget: { accommodation: 35, meals: 20, transport: 8, activities: 12 }, // In EUR
        moderate: { accommodation: 110, meals: 55, transport: 15, activities: 35 },
        luxury: { accommodation: 380, meals: 180, transport: 60, activities: 90 }
      },
      phrases: [
        { original: "Bonjour", translation: "Hello / Good morning", pronunciation: "Bohn-zhoor" },
        { original: "Merci beaucoup", translation: "Thank you very much", pronunciation: "Mair-see boh-koo" },
        { original: "S'il vous plaît", translation: "Please", pronunciation: "Seel voo pleh" },
        { original: "C'est combien ?", translation: "How much is this?", pronunciation: "Say kohm-byan?" },
        { original: "Où sont les toilettes ?", translation: "Where are the restrooms?", pronunciation: "Oo sohn ley twah-let?" }
      ],
      itinerary: [
        {
          day: 1,
          title: "Monuments & Iconic Views",
          activities: [
            "Morning: Climb the **Eiffel Tower** early to beat the crowds, or enjoy views from Trocadéro.",
            "Afternoon: Walk along the Seine River, cross Pont Alexandre III, and stroll the Champs-Élysées to Arc de Triomphe.",
            "Evening: Embark on a relaxing Seine River Dinner Cruise to see Paris illuminated."
          ]
        },
        {
          day: 2,
          title: "Art & Artistic Neighborhoods",
          activities: [
            "Morning: Visit the world-famous **Louvre Museum** (book tickets in advance for Mona Lisa and Winged Victory).",
            "Afternoon: Wander through the beautiful Tuileries Garden and head to the bohemian streets of **Montmartre**.",
            "Evening: Relax outside the **Sacré-Cœur Basilica** to watch the sunset over the city rooftops."
          ]
        },
        {
          day: 3,
          title: "Gothic Wonders & Left Bank",
          activities: [
            "Morning: Visit the majestic Sainte-Chapelle for its stained glass, and view the exterior of **Notre-Dame Cathedral**.",
            "Afternoon: Explore the winding streets of the Latin Quarter and the peaceful Jardin du Luxembourg.",
            "Evening: Have a classic French dinner at a cozy bistro in Saint-Germain-des-Prés."
          ]
        }
      ]
    },
    rome: {
      name: "Rome",
      country: "Italy",
      coordinates: [41.9028, 12.4964],
      summary: "A potent mix of haunting ruins, awe-inspiring art, and vibrant street life. The Eternal City showcases nearly 3,000 years of globally influential art, architecture, and culture.",
      bestTime: "April to June or September to October",
      budgetLevel: "$$",
      currency: "EUR (Euro)",
      currencySymbol: "€",
      exchangeRate: 0.92,
      categories: ["Culture", "History", "Food"],
      attractions: [
        {
          name: "Colosseum",
          description: "The monumental 1st-century gladiatorial amphitheater, the ultimate symbol of the power of ancient Rome.",
          category: "History",
          coordinates: [41.8902, 12.4922]
        },
        {
          name: "Vatican Museums & St. Peter's",
          description: "Home to the Sistine Chapel, classical sculptures, and St. Peter's Basilica, the center of the Catholic Church.",
          category: "Art & Religion",
          coordinates: [41.9073, 12.4542]
        },
        {
          name: "Trevi Fountain",
          description: "The spectacular Baroque fountain where tossing a coin guarantees your return to the Eternal City.",
          category: "Sightseeing",
          coordinates: [41.9009, 12.4833]
        },
        {
          name: "Pantheon",
          description: "A former Roman temple, now a church, featuring the world's largest unreinforced concrete dome.",
          category: "History",
          coordinates: [41.8986, 12.4769]
        }
      ],
      costs: {
        budget: { accommodation: 30, meals: 18, transport: 5, activities: 15 },
        moderate: { accommodation: 95, meals: 45, transport: 12, activities: 30 },
        luxury: { accommodation: 300, meals: 140, transport: 50, activities: 75 }
      },
      phrases: [
        { original: "Ciao", translation: "Hello / Goodbye", pronunciation: "Chow" },
        { original: "Grazie mille", translation: "Thank you very much", pronunciation: "Graht-syee mee-leh" },
        { original: "Per favore", translation: "Please", pronunciation: "Pair fah-voh-reh" },
        { original: "Quanto costa?", translation: "How much does it cost?", pronunciation: "Kwan-toh kos-tah?" },
        { original: "Dov'è il bagno?", translation: "Where is the bathroom?", pronunciation: "Doh-veh eel bahn-yoh?" }
      ],
      itinerary: [
        {
          day: 1,
          title: "Ancient Rome",
          activities: [
            "Morning: Tour the **Colosseum** and walk through the ancient ruins of the Roman Forum and Palatine Hill.",
            "Afternoon: Climb the Capitoline Hill for overview views, then walk to Piazza Venezia.",
            "Evening: Have traditional Roman pasta (Carbonara or Cacio e Pepe) in the vibrant Trastevere neighborhood."
          ]
        },
        {
          day: 2,
          title: "Baroque Heart of Rome",
          activities: [
            "Morning: Marvel at the architecture of the **Pantheon**, then stroll around Piazza Navona.",
            "Afternoon: Throw a coin into the **Trevi Fountain** and climb the famous Spanish Steps.",
            "Evening: Enjoy a gelato near the fountain and dine at a local pizzeria in the Campo de' Fiori area."
          ]
        },
        {
          day: 3,
          title: "The Vatican & Renaissance",
          activities: [
            "Morning: Visit the **Vatican Museums** to see Michelangelo's Sistine Chapel ceiling.",
            "Afternoon: Enter St. Peter's Basilica and climb the dome for spectacular views of St. Peter's Square.",
            "Evening: Walk along Castel Sant'Angelo at dusk and enjoy a refined Roman dinner near the Tiber."
          ]
        }
      ]
    },
    cairo: {
      name: "Cairo",
      country: "Egypt",
      coordinates: [30.0444, 31.2357],
      summary: "Set on the legendary Nile River, Cairo is home to the Giza Plateau's pyramids, ancient treasures, and chaotic yet charming bazaars.",
      bestTime: "October to April (Cooler weather)",
      budgetLevel: "$",
      currency: "EGP (Egyptian Pound)",
      currencySymbol: "E£",
      exchangeRate: 47.90,
      categories: ["History", "Culture", "Adventure"],
      attractions: [
        {
          name: "Pyramids of Giza & Sphinx",
          description: "The last remaining ancient wonder of the world, built over 4,500 years ago as monumental tombs.",
          category: "History",
          coordinates: [29.9792, 31.1342]
        },
        {
          name: "The Egyptian Museum",
          description: "Housed in Tahrir Square, containing the world's most extensive collection of Pharaonic antiquities.",
          category: "History",
          coordinates: [30.0478, 31.2336]
        },
        {
          name: "Khan el-Khalili",
          description: "A famous colorful bazaar in Islamic Cairo, packed with spices, perfumes, brassware, and souvenirs.",
          category: "Shopping",
          coordinates: [30.0475, 31.2625]
        },
        {
          name: "Salah El-Din Al-Ayyubi Citadel",
          description: "A massive medieval Islamic fortification offering panoramic views of Cairo and housing the Mosque of Muhammad Ali.",
          category: "Culture",
          coordinates: [30.0299, 31.2619]
        }
      ],
      costs: {
        budget: { accommodation: 400, meals: 150, transport: 40, activities: 200 }, // in EGP
        moderate: { accommodation: 1500, meals: 450, transport: 120, activities: 550 },
        luxury: { accommodation: 6000, meals: 1500, transport: 600, activities: 1500 }
      },
      phrases: [
        { original: "السلام عليكم (Salam Alaykum)", translation: "Peace be upon you (Hello)", pronunciation: "Sah-lam ah-lay-koom" },
        { original: "شكراً (Shukran)", translation: "Thank you", pronunciation: "Shook-ran" },
        { original: "لو سمحت (Law samahat)", translation: "Please / Excuse me", pronunciation: "Law sah-mah-hat" },
        { original: "بكام ده؟ (Bekam dah?)", translation: "How much is this?", pronunciation: "Beh-kam dah?" },
        { original: "فين الحمام؟ (Fayn el-hammam?)", translation: "Where is the toilet?", pronunciation: "Fayn el-ham-mam?" }
      ],
      itinerary: [
        {
          day: 1,
          title: "The Ancient Wonders",
          activities: [
            "Morning: Head early to the **Giza Plateau** to marvel at the Great Pyramids and the Sphinx (ride a camel if desired).",
            "Afternoon: Have lunch overlooking the pyramids, then visit the Grand Egyptian Museum (GEM) or Saqqara step pyramid.",
            "Evening: Enjoy a dinner cruise along the Nile River with traditional music and belly dancing."
          ]
        },
        {
          day: 2,
          title: "Islamic Cairo & Bazaars",
          activities: [
            "Morning: Visit the **Salah El-Din Citadel** and the stunning Muhammad Ali Alabaster Mosque.",
            "Afternoon: Dive into the maze-like alleys of **Khan el-Khalili** bazaar. Shop for souvenirs and sip mint tea at El-Fishawy cafe.",
            "Evening: Walk around the historical Al-Muizz Street to see medieval Islamic architecture illuminated."
          ]
        },
        {
          day: 3,
          title: "Pharaohs & Parks",
          activities: [
            "Morning: Explore the treasures, golden masks, and mummies at the **Egyptian Museum** in Tahrir Square.",
            "Afternoon: Wander the beautiful, green expanse of Al-Azhar Park for scenic, elevated views of the Cairo skyline.",
            "Evening: Have dinner in Zamalek, an upscale district on a Nile island, home to trendy cafes."
          ]
        }
      ]
    },
    bali: {
      name: "Bali",
      country: "Indonesia",
      coordinates: [-8.4095, 115.1889],
      summary: "Known as the Island of the Gods, Bali offers forested volcanic mountains, iconic rice paddies, beaches, coral reefs, and a highly spiritual Hindu culture.",
      bestTime: "April to October (Dry season)",
      budgetLevel: "$",
      currency: "IDR (Indonesian Rupiah)",
      currencySymbol: "Rp",
      exchangeRate: 16200,
      categories: ["Relaxation", "Adventure", "Culture", "Nature"],
      attractions: [
        {
          name: "Ubud Monkey Forest",
          description: "A sanctuary and natural habitat of Balinese long-tailed monkeys, housing sacred ancient temples.",
          category: "Nature",
          coordinates: [-8.5192, 115.2608]
        },
        {
          name: "Tanah Lot Temple",
          description: "An iconic Hindu temple built on a wave-swept rock formation, famous for dramatic sunset views.",
          category: "Culture",
          coordinates: [-8.6212, 115.0868]
        },
        {
          name: "Tegalalang Rice Terraces",
          description: "Beautiful terraced hillsides of green rice paddies offering scenic views and ziplining adventures.",
          category: "Nature",
          coordinates: [-8.4285, 115.2787]
        },
        {
          name: "Uluwatu Temple",
          description: "A sea temple perched on a steep cliff, hosting nightly traditional Kecak fire dance performances.",
          category: "Culture",
          coordinates: [-8.8291, 115.0849]
        }
      ],
      costs: {
        budget: { accommodation: 150000, meals: 75000, transport: 80000, activities: 100000 }, // In IDR
        moderate: { accommodation: 600000, meals: 250000, transport: 200000, activities: 350000 },
        luxury: { accommodation: 2500000, meals: 800000, transport: 600000, activities: 1000000 }
      },
      phrases: [
        { original: "Halo", translation: "Hello", pronunciation: "Hah-loh" },
        { original: "Terima kasih", translation: "Thank you", pronunciation: "Teh-ree-mah kah-sih" },
        { original: "Sama-sama", translation: "You're welcome", pronunciation: "Sah-mah sah-mah" },
        { original: "Berapa harganya?", translation: "How much is this?", pronunciation: "Beh-rah-pah har-gah-nyah?" },
        { original: "Permisi", translation: "Excuse me", pronunciation: "Pair-mee-see" }
      ],
      itinerary: [
        {
          day: 1,
          title: "Ubud Culture & Nature",
          activities: [
            "Morning: Walk among the playful monkeys and banyan trees in the **Ubud Monkey Forest**.",
            "Afternoon: Visit the scenic **Tegalalang Rice Terraces** and try the famous jungle swings.",
            "Evening: Walk the Campuhan Ridge Walk at sunset and enjoy organic, local Balinese food in Ubud center."
          ]
        },
        {
          day: 2,
          title: "Temple Runs & Sunset Beats",
          activities: [
            "Morning: Visit the royal water palace, Tirta Empul, for a traditional spiritual purification ritual.",
            "Afternoon: Travel west to view the offshore **Tanah Lot Temple** standing amidst ocean waves.",
            "Evening: Head to Canggu or Seminyak beach for lively beach clubs, sunset cocktails, and fresh seafood."
          ]
        },
        {
          day: 3,
          title: "Cliffs & Fire Dances",
          activities: [
            "Morning: Chill out on the white sand beaches of Uluwatu (e.g., Padang Padang or Bingin Beach).",
            "Afternoon: Explore the dramatic clifftops surrounding the historic **Uluwatu Temple**.",
            "Evening: Watch the traditional **Kecak Fire Dance** at the cliff edge during sunset, followed by a beachside seafood BBQ at Jimbaran Bay."
          ]
        }
      ]
    },
    capetown: {
      name: "Cape Town",
      country: "South Africa",
      coordinates: [-33.9249, 18.4241],
      summary: "A port city on South Africa's southwest coast, on a peninsula beneath the imposing Table Mountain. Wineries, beaches, and historic sites abound.",
      bestTime: "November to March (Summer)",
      budgetLevel: "$$",
      currency: "ZAR (South African Rand)",
      currencySymbol: "R",
      exchangeRate: 18.25,
      categories: ["Nature", "Adventure", "Wine", "Food"],
      attractions: [
        {
          name: "Table Mountain",
          description: "A flat-topped mountain forming a prominent landmark overlooking Cape Town, accessible via cableway or hiking.",
          category: "Nature",
          coordinates: [-33.9628, 18.4098]
        },
        {
          name: "Cape of Good Hope",
          description: "A rocky headland on the Atlantic coast of the Cape Peninsula, offering dramatic ocean views and hiking trails.",
          category: "Adventure",
          coordinates: [-34.3568, 18.4740]
        },
        {
          name: "Boulders Beach",
          description: "A sheltered beach located near Simon's Town, famous for its wild colony of African Penguins.",
          category: "Nature",
          coordinates: [-34.1971, 18.4513]
        },
        {
          name: "V&A Waterfront",
          description: "A bustling harbor hub featuring shopping, restaurants, boat cruises, and the Zeitz MOCAA art museum.",
          category: "Shopping & Food",
          coordinates: [-33.9038, 18.4230]
        }
      ],
      costs: {
        budget: { accommodation: 350, meals: 180, transport: 60, activities: 150 }, // In ZAR
        moderate: { accommodation: 1200, meals: 450, transport: 150, activities: 450 },
        luxury: { accommodation: 4500, meals: 1500, transport: 600, activities: 1200 }
      },
      phrases: [
        { original: "Molo", translation: "Hello (Xhosa)", pronunciation: "Moh-loh" },
        { original: "Enkosi", translation: "Thank you (Xhosa)", pronunciation: "En-koh-see" },
        { original: "Howzit", translation: "How are things? (Slang)", pronunciation: "How-zit" },
        { original: "Lekker", translation: "Great / Delicious / Cool", pronunciation: "Lack-er" },
        { original: "Dankie", translation: "Thank you (Afrikaans)", pronunciation: "Dun-kee" }
      ],
      itinerary: [
        {
          day: 1,
          title: "Table Mountain & Waterfront",
          activities: [
            "Morning: Take the cableway up **Table Mountain** early for panoramic views of the peninsula.",
            "Afternoon: Descent and explore the historic Bo-Kaap neighborhood with its brightly colored houses.",
            "Evening: Head to the **V&A Waterfront** for shopping, live music, and dinner overlooking the harbor."
          ]
        },
        {
          day: 2,
          title: "Penguins & Dramatic Cape Cliffs",
          activities: [
            "Morning: Take a scenic drive along Chapman's Peak to Simon's Town and visit the penguins at **Boulders Beach**.",
            "Afternoon: Explore the wild landscape and view points at the **Cape of Good Hope** and Cape Point.",
            "Evening: Watch the sunset from Signal Hill, looking over the Atlantic Ocean."
          ]
        },
        {
          day: 3,
          title: "Wine & Coastal Walks",
          activities: [
            "Morning: Walk around the stunning Kirstenbosch National Botanical Garden.",
            "Afternoon: Go wine tasting in the historic Constantia Valley, the oldest wine-making region in the southern hemisphere.",
            "Evening: Relax on the beaches of Clifton or Camps Bay, and dine at a trendy coastal cafe."
          ]
        }
      ]
    },
    newyork: {
      name: "New York City",
      country: "USA",
      coordinates: [40.7128, -74.0060],
      summary: "The cultural, financial, and media capital of the world. Characterized by landmarks like Central Park, Broadway shows, and an unparalleled fast-paced energy.",
      bestTime: "September to November or April to June",
      budgetLevel: "$$$",
      currency: "USD (US Dollar)",
      currencySymbol: "$",
      exchangeRate: 1.00,
      categories: ["Shopping", "Modern", "Food", "Art"],
      attractions: [
        {
          name: "Central Park",
          description: "An expansive, green oasis in the middle of Manhattan, featuring lakes, bridges, and walking trails.",
          category: "Nature",
          coordinates: [40.7829, -73.9654]
        },
        {
          name: "Statue of Liberty",
          description: "The colossal neoclassical copper sculpture on Liberty Island, welcoming visitors and immigrants.",
          category: "History",
          coordinates: [40.6892, -74.0445]
        },
        {
          name: "Times Square & Broadway",
          description: "The neon-lit heart of the theater district, packed with giant billboard screens and street performers.",
          category: "Entertainment",
          coordinates: [40.7580, -73.9855]
        },
        {
          name: "Empire State Building",
          description: "An iconic Art Deco skyscraper offering breathtaking 360-degree views of the Manhattan skyline.",
          category: "Sightseeing",
          coordinates: [40.7484, -73.9857]
        }
      ],
      costs: {
        budget: { accommodation: 70, meals: 30, transport: 10, activities: 20 },
        moderate: { accommodation: 220, meals: 80, transport: 20, activities: 60 },
        luxury: { accommodation: 650, meals: 250, transport: 80, activities: 180 }
      },
      phrases: [
        { original: "Hey, how's it going?", translation: "Hello (casual)", pronunciation: "Hey, howz it go-ing?" },
        { original: "Thanks a lot", translation: "Thank you", pronunciation: "Thanks ah lot" },
        { original: "Can I get a slice?", translation: "Ordering pizza slice", pronunciation: "Can I get ah slice?" },
        { original: "Where's the subway?", translation: "Where is the metro?", pronunciation: "Wheres the sub-way?" },
        { original: "Keep the change", translation: "Tipping comment", pronunciation: "Keep the change" }
      ],
      itinerary: [
        {
          day: 1,
          title: "Midtown Landmarks",
          activities: [
            "Morning: Walk along Fifth Avenue, see St. Patrick's Cathedral, and explore Rockefeller Center.",
            "Afternoon: Wander the pathways, rowboats, and bridges of **Central Park**.",
            "Evening: Experience the brilliant neon lights of **Times Square** and catch a Broadway musical show."
          ]
        },
        {
          day: 2,
          title: "Statues, Skyscraper & Bridges",
          activities: [
            "Morning: Take the ferry to Liberty Island to see the **Statue of Liberty** and Ellis Island.",
            "Afternoon: Walk through Wall Street and the 9/11 Memorial, then cross the historic Brooklyn Bridge.",
            "Evening: Watch the city light up from the observation deck of the **Empire State Building** or Summit One Vanderbilt."
          ]
        },
        {
          day: 3,
          title: "Art & Trendy Neighborhoods",
          activities: [
            "Morning: Visit the Museum of Modern Art (MoMA) or the Metropolitan Museum of Art (The Met).",
            "Afternoon: Walk the High Line elevated park and shop/eat at Chelsea Market.",
            "Evening: Explore the dining and nightlife scene in Greenwich Village or SoHo."
          ]
        }
      ]
    },
    riodejaneiro: {
      name: "Rio de Janeiro",
      country: "Brazil",
      coordinates: [-22.9068, -43.1729],
      summary: "A huge seaside city in Brazil, famed for its Copacabana and Ipanema beaches, mountaintop Christ the Redeemer statue, and bustling Carnival festival.",
      bestTime: "December to March (Summer & Carnival)",
      budgetLevel: "$$",
      currency: "BRL (Brazilian Real)",
      currencySymbol: "R$",
      exchangeRate: 5.40,
      categories: ["Beach", "Nature", "Adventure", "Music"],
      attractions: [
        {
          name: "Christ the Redeemer",
          description: "The colossal art deco statue of Jesus Christ crowning the summit of Corcovado Mountain.",
          category: "Sightseeing",
          coordinates: [-22.9519, -43.2105]
        },
        {
          name: "Sugarloaf Mountain",
          description: "A peak rising out of the mouth of Guanabara Bay, reachable by glass-walled cableways.",
          category: "Nature",
          coordinates: [-22.9486, -43.1558]
        },
        {
          name: "Copacabana Beach",
          description: "A world-famous 4km crescent beach lined with bars, hotels, and a mosaic promenade.",
          category: "Beach",
          coordinates: [-22.9714, -43.1826]
        },
        {
          name: "Selarón Steps",
          description: "A world-famous set of outdoor steps covered in over 2,000 colorful tiles collected from around the world.",
          category: "Art",
          coordinates: [-22.9156, -43.1797]
        }
      ],
      costs: {
        budget: { accommodation: 80, meals: 45, transport: 15, activities: 30 }, // In BRL
        moderate: { accommodation: 280, meals: 120, transport: 35, activities: 100 },
        luxury: { accommodation: 950, meals: 400, transport: 150, activities: 350 }
      },
      phrases: [
        { original: "Olá / Tudo bem?", translation: "Hello / How are you?", pronunciation: "Oh-lah / Too-doo bang?" },
        { original: "Obrigado (m) / Obrigada (f)", translation: "Thank you", pronunciation: "Oh-bree-gah-doo / Oh-bree-gah-dah" },
        { original: "Por favor", translation: "Please", pronunciation: "Por fah-vor" },
        { original: "Quanto custa?", translation: "How much does it cost?", pronunciation: "Kwan-too koos-tah?" },
        { original: "Onde fica a praia?", translation: "Where is the beach?", pronunciation: "Ohn-jee fee-kah ah pry-ah?" }
      ],
      itinerary: [
        {
          day: 1,
          title: "Wonders & Icons",
          activities: [
            "Morning: Ride the cog train up Corcovado Mountain to see **Christ the Redeemer** up close.",
            "Afternoon: Explore the cobblestone streets of Santa Teresa and walk down the colorful **Selarón Steps**.",
            "Evening: Have a traditional Brazilian Rodízio BBQ dinner in Ipanema."
          ]
        },
        {
          day: 2,
          title: "Beaches & Bays",
          activities: [
            "Morning: Swim and sunbathe at **Copacabana Beach** or Ipanema Beach, trying fresh coconut water.",
            "Afternoon: Ride the cable cars up **Sugarloaf Mountain** for panoramic vistas of Rio's coastline.",
            "Evening: Listen to live bossa nova or samba music in Lapa, Rio's bohemian nightlife center."
          ]
        },
        {
          day: 3,
          title: "Nature & Modern Rio",
          activities: [
            "Morning: Hike or stroll inside the Tijuca National Forest, one of the world's largest urban rainforests.",
            "Afternoon: Visit the futuristic Museum of Tomorrow (Museu do Amanhã) at the rejuvenated Porto Maravilha.",
            "Evening: Watch the spectacular sunset from Arpoador Rock, where crowds cheer as the sun dips below the horizon."
          ]
        }
      ]
    }
  }
};

// Make it available in browser globally
if (typeof module !== 'undefined' && module.exports) {
  module.exports = touristData;
} else {
  window.touristData = touristData;
}

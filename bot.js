// ==========================================
// CHATBOT ENGINE & NATURAL LANGUAGE ENGINE
// ==========================================

class TouristBot {
  constructor(data) {
    this.data = data;
    this.activeCity = null;
    this.budgetTier = 'moderate';
    this.duration = 3;
    
    // Voice utilities
    this.synthesis = window.speechSynthesis;
    this.recognition = null;
    this.setupSpeechRecognition();
  }

  // Initialize Speech-to-Text
  setupSpeechRecognition() {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      this.recognition = new SpeechRecognition();
      this.recognition.continuous = false;
      this.recognition.lang = 'en-US';
      this.recognition.interimResults = false;
      this.recognition.maxAlternatives = 1;
    }
  }

  // Speak a message (TTS)
  speak(text, lang = 'en-US') {
    if (!this.synthesis) return;
    this.synthesis.cancel(); // Stop any current speech
    
    const utterance = new SpeechSynthesisUtterance(text);
    
    // Try to find a matching voice for the language
    const voices = this.synthesis.getVoices();
    const matchingVoice = voices.find(voice => voice.lang.startsWith(lang));
    if (matchingVoice) {
      utterance.voice = matchingVoice;
    }
    
    this.synthesis.speak(utterance);
  }

  // Parse user query and generate response HTML & metadata
  processMessage(text) {
    const input = text.toLowerCase().trim();
    let responseText = "";
    let cardHTML = null;
    let switchTab = null;
    let focusLocation = null;

    // 1. Context Resolution: Look for city names in user query
    let mentionedCity = null;
    for (const cityId in this.data.destinations) {
      const city = this.data.destinations[cityId];
      if (input.includes(cityId) || input.includes(city.name.toLowerCase())) {
        mentionedCity = cityId;
        this.activeCity = cityId;
        break;
      }
    }

    const city = this.activeCity ? this.data.destinations[this.activeCity] : null;

    // 2. Identify Intent matching
    
    // INTENT: GREETING & HELP
    if (input.match(/\b(hi|hello|hey|greetings|hola)\b/)) {
      responseText = "Hello there! 🌍 I am your **Smart Tourist Advisor**. I can suggest destinations, create custom itineraries, translate local phrases, estimate budgets, and show you local guides. Where are you planning to travel next?";
      cardHTML = this.createQuickHelpCard();
    }
    
    // INTENT: SUGGEST DESTINATION / RECOMMENDATIONS
    else if (input.includes("suggest") || input.includes("recommend") || input.includes("where should i go") || input.includes("ideas")) {
      responseText = "Here are a few handpicked destinations for you! What kind of vibe are you looking for? (e.g., adventure, relaxing, history, or culture)";
      cardHTML = this.createRecommendationCard(input);
      switchTab = "explore";
    }

    // INTENT: ITINERARY PLANNING
    else if (input.includes("itinerary") || input.includes("plan") || input.includes("schedule") || input.includes("days in") || input.match(/\b(day|days)\b/)) {
      // If a number of days is specified
      const dayMatch = input.match(/\b(\d+)\b/);
      if (dayMatch) {
        this.duration = Math.min(Math.max(parseInt(dayMatch[1]), 1), 3); // Cap at 3 days due to mock database
      }
      
      if (!city) {
        responseText = "I can definitely help you build an itinerary! Which city are you planning to visit? (e.g., Tokyo, Paris, Rome, Cairo, Bali, Cape Town)";
      } else {
        responseText = `Here is your customized **${this.duration}-Day Itinerary** for **${city.name}**! I've loaded the details in your main dashboard under the Itinerary tab so you can check off activities.`;
        cardHTML = this.createItineraryCard(city, this.duration);
        switchTab = "itinerary";
        focusLocation = city.coordinates;
      }
    }

    // INTENT: COST & BUDGET
    else if (input.includes("budget") || input.includes("cost") || input.includes("price") || input.includes("expensive") || input.includes("how much") || input.includes("money")) {
      // Detect budget tier adjustments
      if (input.includes("backpack") || input.includes("cheap") || input.includes("low budget")) {
        this.budgetTier = 'budget';
      } else if (input.includes("luxury") || input.includes("expensive") || input.includes("fancy")) {
        this.budgetTier = 'luxury';
      } else {
        this.budgetTier = 'moderate';
      }

      if (!city) {
        responseText = "I can estimate costs for your trip. Which destination are you looking at? (e.g. Tokyo, Paris, Bali)";
      } else {
        responseText = `Here is a budget breakdown for a **${this.budgetTier}** trip to **${city.name}**. I've detailed average daily costs for hotels, meals, transport, and leisure.`;
        cardHTML = this.createBudgetCard(city, this.budgetTier);
      }
    }

    // INTENT: WEATHER & CLIMATE
    else if (input.includes("weather") || input.includes("temperature") || input.includes("rain") || input.includes("climate") || input.includes("forecast") || input.includes("best time")) {
      if (!city) {
        responseText = "I can look up weather details and best travel windows. Which city are you interested in?";
      } else {
        responseText = `For **${city.name}**, the best time to visit is **${city.bestTime}**. Here is a quick snapshot of the local climate forecast:`;
        cardHTML = this.createWeatherCard(city);
      }
    }

    // INTENT: PHRASES & TRANSLATION
    else if (input.includes("speak") || input.includes("phrase") || input.includes("language") || input.includes("translate") || input.includes("say hello")) {
      if (!city) {
        responseText = "I can teach you local travel phrases. Which country or city are you headed to?";
      } else {
        responseText = `Here are some essential local expressions for **${city.name}** (${city.country}). Click the audio speaker icon to listen to their pronunciation!`;
        cardHTML = this.createPhrasesCard(city);
        switchTab = "guides";
      }
    }

    // INTENT: ATTRACTIONS / WHAT TO DO
    else if (input.includes("attraction") || input.includes("sightseeing") || input.includes("places") || input.includes("to do") || input.includes("see in")) {
      if (!city) {
        responseText = "Which city would you like to explore attractions for?";
      } else {
        responseText = `Here are the top landmarks and points of interest in **${city.name}**. You can see them mapped out in the Interactive Map!`;
        cardHTML = this.createAttractionsCard(city);
        switchTab = "map";
        focusLocation = city.coordinates;
      }
    }

    // FALLBACK IF CITY IS MENTIONED BUT NO SPECIFIC INTENT
    else if (mentionedCity) {
      responseText = `Ah, **${city.name}**! A beautiful place in ${city.country}. ${city.summary} Would you like to check the **itinerary**, **local phrases**, **weather**, **budget costs**, or **top attractions**?`;
      cardHTML = this.createCityMenuCard(city);
      focusLocation = city.coordinates;
    }

    // DEFAULT FALLBACK
    else {
      responseText = "I'm not quite sure how to answer that. 🧐 I can help you check weather, build itineraries, estimate budgets, find attractions, and translate local phrases. Try asking something like:\n- *'Show me an itinerary for Tokyo'* \n- *'What is the budget for Bali?'*\n- *'What are the sights in Rome?'*";
      cardHTML = this.createQuickHelpCard();
    }

    return {
      text: responseText,
      cardHTML: cardHTML,
      switchTab: switchTab,
      focusLocation: focusLocation,
      cityId: this.activeCity
    };
  }

  // Card: Quick Help / Welcome menu
  createQuickHelpCard() {
    return `
      <div class="chat-card">
        <div class="chat-card-title">💡 How can I help you?</div>
        <div class="chat-card-desc">Select an option below to plan your trip:</div>
        <div class="chat-card-actions">
          <button class="chat-card-btn chat-card-btn-primary" onclick="window.botAction('recommend')">🌟 Explore Ideas</button>
          <button class="chat-card-btn" onclick="window.botAction('help_itinerary')">🎒 Plan Trip</button>
        </div>
        <div class="chat-card-actions">
          <button class="chat-card-btn" onclick="window.botAction('help_budget')">💸 Cost Calculator</button>
          <button class="chat-card-btn" onclick="window.botAction('help_language')">🗣️ Phrasebooks</button>
        </div>
      </div>
    `;
  }

  // Card: Destination Recommendations
  createRecommendationCard(userInput) {
    let matches = [];
    const lowerInput = userInput.toLowerCase();
    
    // Categorization filter
    let targetCategory = null;
    if (lowerInput.includes("adventure") || lowerInput.includes("nature") || lowerInput.includes("hike") || lowerInput.includes("beach")) {
      targetCategory = "Adventure";
    } else if (lowerInput.includes("relax") || lowerInput.includes("beach") || lowerInput.includes("spa") || lowerInput.includes("slow")) {
      targetCategory = "Relaxation";
    } else if (lowerInput.includes("culture") || lowerInput.includes("history") || lowerInput.includes("museum") || lowerInput.includes("art")) {
      targetCategory = "Culture";
    } else if (lowerInput.includes("food") || lowerInput.includes("gastronomy") || lowerInput.includes("eat")) {
      targetCategory = "Food";
    }
    
    for (const key in this.data.destinations) {
      const dest = this.data.destinations[key];
      if (!targetCategory || dest.categories.some(cat => cat.toLowerCase() === targetCategory.toLowerCase())) {
        matches.push({ id: key, name: dest.name, country: dest.country, summary: dest.summary });
      }
    }
    
    // Slice to 3 matches
    matches = matches.slice(0, 3);
    if (matches.length === 0) {
      // Fallback: pick any 3
      matches = Object.keys(this.data.destinations).slice(0, 3).map(key => ({
        id: key, name: this.data.destinations[key].name, country: this.data.destinations[key].country
      }));
    }

    let itemsHTML = matches.map(m => `
      <div style="border-bottom:1px solid var(--border-color); padding: 0.5rem 0; display:flex; justify-content:space-between; align-items:center;">
        <div>
          <strong style="color:var(--text-main); font-size:0.85rem;">${m.name}</strong>
          <div style="color:var(--text-muted); font-size:0.75rem;">${m.country}</div>
        </div>
        <button class="chat-card-btn chat-card-btn-primary" style="flex:none; width:auto; padding:0.25rem 0.6rem;" onclick="window.botAction('city', '${m.id}')">Explore</button>
      </div>
    `).join('');

    return `
      <div class="chat-card">
        <div class="chat-card-title">🌍 Recommended for You</div>
        <div class="chat-card-desc">Here are top matches matching your style:</div>
        <div>${itemsHTML}</div>
      </div>
    `;
  }

  // Card: Dynamic Itinerary
  createItineraryCard(city, days) {
    let scheduleHTML = "";
    for (let i = 0; i < days; i++) {
      const dayData = city.itinerary[i];
      if (dayData) {
        scheduleHTML += `
          <div style="margin-top: 0.5rem; border-left: 2px solid var(--primary); padding-left: 0.5rem;">
            <div style="font-size:0.75rem; font-weight:700; color:var(--primary);">DAY ${dayData.day}: ${dayData.title}</div>
            <div style="font-size:0.75rem; color:var(--text-muted); line-height:1.3; margin-top:0.25rem;">${dayData.activities[0].substring(0, 75)}...</div>
          </div>
        `;
      }
    }
    
    return `
      <div class="chat-card">
        <div class="chat-card-title">🎒 ${days}-Day Itinerary loaded!</div>
        <div class="chat-card-desc">Here's a snapshot for <strong>${city.name}</strong>:</div>
        <div>${scheduleHTML}</div>
        <div class="chat-card-actions">
          <button class="chat-card-btn chat-card-btn-primary" onclick="window.botAction('tab', 'itinerary')">📅 Open Full Itinerary</button>
        </div>
      </div>
    `;
  }

  // Card: Budget Breakdown
  createBudgetCard(city, tier) {
    const cost = city.costs[tier];
    const unit = city.currencySymbol;
    const totalDaily = cost.accommodation + cost.meals + cost.transport + cost.activities;
    
    // Convert to USD roughly
    const totalUSD = (totalDaily / city.exchangeRate).toFixed(1);
    
    return `
      <div class="chat-card">
        <div class="chat-card-title">💸 ${city.name} Budget (${tier.toUpperCase()})</div>
        <div class="chat-card-desc">Estimated daily expenses in <strong>${city.currency}</strong>:</div>
        <div style="font-size: 0.8rem; display: flex; flex-direction: column; gap: 0.25rem;">
          <div style="display:flex; justify-content:space-between;"><span>🏨 Accommodation:</span> <strong>${unit}${cost.accommodation}</strong></div>
          <div style="display:flex; justify-content:space-between;"><span>🍔 Meals:</span> <strong>${unit}${cost.meals}</strong></div>
          <div style="display:flex; justify-content:space-between;"><span>🚌 Public Transit:</span> <strong>${unit}${cost.transport}</strong></div>
          <div style="display:flex; justify-content:space-between;"><span>🎟️ Attractions:</span> <strong>${unit}${cost.activities}</strong></div>
          <hr style="border: 0; border-top: 1px solid var(--border-color); margin: 0.35rem 0;">
          <div style="display:flex; justify-content:space-between; font-weight:700; color:var(--primary);">
            <span>💰 Total/Day:</span> 
            <span>${unit}${totalDaily} (~$${totalUSD} USD)</span>
          </div>
        </div>
        <div class="chat-card-actions">
          <button class="chat-card-btn" onclick="window.botAction('budget_tier', 'budget')">$ Budget</button>
          <button class="chat-card-btn" onclick="window.botAction('budget_tier', 'moderate')">$$ Moderate</button>
          <button class="chat-card-btn" onclick="window.botAction('budget_tier', 'luxury')">$$$ Luxury</button>
        </div>
      </div>
    `;
  }

  // Card: Weather Snapshot
  createWeatherCard(city) {
    // Generate simulated weather reading based on current season
    const month = new Date().getMonth(); // 0-11
    let temp = 20;
    let icon = "☀️";
    let status = "Sunny";
    
    if (city.name === "Tokyo") {
      temp = month >= 5 && month <= 8 ? 29 : month <= 2 || month === 11 ? 8 : 18;
      icon = temp > 25 ? "☀️" : temp < 10 ? "❄️" : "☁️";
      status = temp > 25 ? "Sunny" : temp < 10 ? "Cold & Clear" : "Mild & Cloudy";
    } else if (city.name === "Paris" || city.name === "Rome") {
      temp = month >= 5 && month <= 8 ? 26 : month <= 2 || month === 11 ? 9 : 17;
      icon = month >= 9 && month <= 10 ? "🌧️" : "☀️";
      status = month >= 9 && month <= 10 ? "Rain showers" : "Sunny intervals";
    } else if (city.name === "Cairo") {
      temp = month >= 5 && month <= 8 ? 36 : 20;
      icon = "☀️";
      status = "Hot & Sunny";
    } else if (city.name === "Bali") {
      temp = 30; // Always warm
      icon = month >= 10 || month <= 2 ? "⛈️" : "☀️";
      status = month >= 10 || month <= 2 ? "Tropical Monsoon" : "Clear skies";
    } else if (city.name === "Cape Town") {
      // Southern hemisphere inversion
      temp = month >= 5 && month <= 8 ? 15 : 25;
      icon = temp < 20 ? "🌧️" : "☀️";
      status = temp < 20 ? "Windy with rain" : "Pleasant Breeze";
    } else if (city.name === "New York City") {
      temp = month >= 5 && month <= 8 ? 28 : month <= 2 || month === 11 ? 2 : 14;
      icon = temp < 5 ? "❄️" : "☀️";
      status = temp < 5 ? "Freezing winds" : "Scattered clouds";
    } else if (city.name === "Rio de Janeiro") {
      temp = month >= 10 || month <= 2 ? 31 : 23;
      icon = "☀️";
      status = "Warm & Humid";
    }

    return `
      <div class="chat-card">
        <div class="chat-card-title">⛅ Weather Forecast: ${city.name}</div>
        <div style="display:flex; align-items:center; gap: 1rem; padding: 0.25rem 0;">
          <div style="font-size: 2.5rem;">${icon}</div>
          <div>
            <div style="font-size:1.5rem; font-weight:700; font-family:var(--font-header);">${temp}°C</div>
            <div style="font-size:0.8rem; color:var(--text-muted);">${status}</div>
          </div>
        </div>
        <div style="font-size:0.75rem; color:var(--text-muted); line-height: 1.4;">
          <strong>🗓️ Best Visit Period:</strong> ${city.bestTime}
        </div>
      </div>
    `;
  }

  // Card: Phrasebook
  createPhrasesCard(city) {
    let phraseRows = city.phrases.slice(0, 3).map((p, idx) => `
      <div style="display:flex; justify-content:space-between; align-items:center; border-bottom:1px solid var(--border-color); padding: 0.4rem 0;">
        <div>
          <div style="font-size:0.85rem; font-weight:700; color:var(--primary);">${p.original}</div>
          <div style="font-size:0.75rem; color:var(--text-muted); font-style:italic;">"${p.translation}"</div>
        </div>
        <button class="phrase-audio-btn" style="width:1.75rem; height:1.75rem;" onclick="window.speakPhrase('${city.name}', ${idx})">
          <svg width="12" height="12" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path></svg>
        </button>
      </div>
    `).join('');

    return `
      <div class="chat-card">
        <div class="chat-card-title">🗣️ Useful Local Expressions</div>
        <div class="chat-card-desc">Helpful phrases in the native tongue:</div>
        <div>${phraseRows}</div>
        <div class="chat-card-actions">
          <button class="chat-card-btn chat-card-btn-primary" onclick="window.botAction('tab', 'guides')">📖 View Complete Phrasebook</button>
        </div>
      </div>
    `;
  }

  // Card: Top Attractions
  createAttractionsCard(city) {
    let sightsHTML = city.attractions.slice(0, 3).map(a => `
      <div style="margin-top: 0.35rem;">
        <span style="font-size:0.85rem; font-weight:600; color:var(--text-main);">📌 ${a.name}</span>
        <div style="font-size:0.75rem; color:var(--text-muted); line-height:1.3; margin-top:0.15rem;">${a.description}</div>
      </div>
    `).join('');

    return `
      <div class="chat-card">
        <div class="chat-card-title">🏛️ Top Attractions in ${city.name}</div>
        <div style="display:flex; flex-direction:column; gap:0.5rem;">${sightsHTML}</div>
        <div class="chat-card-actions">
          <button class="chat-card-btn chat-card-btn-primary" onclick="window.botAction('tab', 'map')">🗺️ Pin on Interactive Map</button>
        </div>
      </div>
    `;
  }

  // Card: City Menu after mentioning a city
  createCityMenuCard(city) {
    return `
      <div class="chat-card">
        <div class="chat-card-title">📍 Exploring ${city.name}</div>
        <div class="chat-card-desc">Choose what you would like to retrieve for ${city.name}:</div>
        <div class="chat-card-actions">
          <button class="chat-card-btn chat-card-btn-primary" onclick="window.botAction('query', 'itinerary for ${city.name.toLowerCase()}')">🎒 Get Itinerary</button>
          <button class="chat-card-btn" onclick="window.botAction('query', 'weather in ${city.name.toLowerCase()}')">⛅ Weather</button>
        </div>
        <div class="chat-card-actions">
          <button class="chat-card-btn" onclick="window.botAction('query', 'budget for ${city.name.toLowerCase()}')">💸 Expenses</button>
          <button class="chat-card-btn" onclick="window.botAction('query', 'phrases for ${city.name.toLowerCase()}')">🗣️ Phrasebook</button>
        </div>
      </div>
    `;
  }
}

// Make it available in browser globally
if (typeof module !== 'undefined' && module.exports) {
  module.exports = TouristBot;
} else {
  window.TouristBot = TouristBot;
}

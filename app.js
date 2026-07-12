// ==========================================
// CORE APPLICATION HANDLER & UI MANAGER
// ==========================================

document.addEventListener("DOMContentLoaded", () => {
  // Global App State
  const state = {
    activeTab: 'explore',
    activeCity: 'tokyo', // Default city loaded in Itinerary/Map/Guides
    savedDestinations: JSON.parse(localStorage.getItem('saved_destinations')) || [],
    checkedActivities: JSON.parse(localStorage.getItem('checked_activities')) || {},
    currentTheme: localStorage.getItem('app_theme') || 'aurora',
    exchangeBase: 'USD',
    isRecording: false
  };

  // Instantiating Chatbot Brain
  const bot = new TouristBot(window.touristData);
  bot.activeCity = state.activeCity;

  // DOM Elements
  const chatHistory = document.getElementById("chatHistory");
  const chatInput = document.getElementById("chatInput");
  const sendBtn = document.getElementById("sendBtn");
  const micBtn = document.getElementById("micBtn");
  const sidebarNav = document.getElementById("sidebarNav");
  const tabContents = document.querySelectorAll(".tab-content");
  const workspaceTitle = document.getElementById("workspaceTitle");
  const workspaceSub = document.getElementById("workspaceSub");
  
  // Sidebar widgets
  const weatherTemp = document.getElementById("weatherTemp");
  const weatherLoc = document.getElementById("weatherLoc");
  const weatherIcon = document.getElementById("weatherIcon");
  const currencyAmount = document.getElementById("currencyAmount");
  const currencySelect = document.getElementById("currencySelect");
  const currencyResult = document.getElementById("currencyResult");
  
  // Theme selectors
  const themeBtns = document.querySelectorAll(".theme-btn");

  // Vector Map state variables
  // Handled through inline elements and active classes

  // ==========================================
  // INITIALIZATION
  // ==========================================
  initApp();

  function initApp() {
    applyTheme(state.currentTheme);
    setupThemeSwitchers();
    setupNavigation();
    setupWidgets();
    setupChat();
    setupVoice();
    
    // Initial renders
    renderExploreTab();
    loadCity(state.activeCity);
    
    // Welcome Bot message
    appendBotMessage("Hello! 🌍 I am your **Smart Tourist Advisor**. I'm here to help you plan your next adventure. Try searching for a destination in the Explore tab, or chat with me to build a custom itinerary, calculate costs, or translate key phrases! Where are you planning to go?");
    
    // Resize map trigger on tab switch
    setTimeout(() => {
      initMap();
    }, 100);
  }

  // ==========================================
  // VIEW & TAB CONTROLS
  // ==========================================
  function setupNavigation() {
    sidebarNav.addEventListener("click", (e) => {
      const link = e.target.closest(".nav-link");
      if (!link) return;

      const targetTab = link.dataset.tab;
      switchView(targetTab);

      // Mobile sidebar auto-collapse
      document.querySelector("aside.sidebar").classList.remove("active");
    });

    // Mobile layouts toggles
    document.getElementById("mobileChatToggle").addEventListener("click", () => {
      document.querySelector("aside.chat-panel").classList.toggle("active");
    });
    
    document.getElementById("mobileSidebarToggle").addEventListener("click", () => {
      document.querySelector("aside.sidebar").classList.toggle("active");
    });

    // Close buttons/clicks outside panels
    document.addEventListener("click", (e) => {
      if (window.innerWidth <= 1100) {
        const chatPanel = document.querySelector("aside.chat-panel");
        const chatToggle = document.getElementById("mobileChatToggle");
        if (!chatPanel.contains(e.target) && !chatToggle.contains(e.target) && chatPanel.classList.contains("active")) {
          chatPanel.classList.remove("active");
        }
      }
      if (window.innerWidth <= 768) {
        const sidebar = document.querySelector("aside.sidebar");
        const sidebarToggle = document.getElementById("mobileSidebarToggle");
        if (!sidebar.contains(e.target) && !sidebarToggle.contains(e.target) && sidebar.classList.contains("active")) {
          sidebar.classList.remove("active");
        }
      }
    });
  }

  function switchView(tabId) {
    state.activeTab = tabId;

    // Nav active link state
    document.querySelectorAll(".nav-link").forEach(link => {
      if (link.dataset.tab === tabId) {
        link.classList.add("active");
      } else {
        link.classList.remove("active");
      }
    });

    // Tab content visibility
    tabContents.forEach(content => {
      if (content.id === `${tabId}Tab`) {
        content.classList.add("active");
      } else {
        content.classList.remove("active");
      }
    });

    // Update Titles
    const cityData = window.touristData.destinations[state.activeCity];
    switch (tabId) {
      case 'explore':
        workspaceTitle.innerText = "Explore Destinations";
        workspaceSub.innerText = "Discover stunning cities, beaches, and cultural hubs around the world.";
        break;
      case 'itinerary':
        workspaceTitle.innerText = `${cityData.name} Itinerary`;
        workspaceSub.innerText = `Your day-by-day travel timeline for ${cityData.name}, ${cityData.country}.`;
        break;
      case 'guides':
        workspaceTitle.innerText = `${cityData.name} Local Guide`;
        workspaceSub.innerText = "Essential travel guides, custom phrasebook translations, and transit rules.";
        break;
      case 'map':
        workspaceTitle.innerText = "Interactive Travel Map";
        workspaceSub.innerText = `Pinpointing popular attractions in ${cityData.name}.`;
        // Initialize vector map interactions
        initMap();
        break;
    }
  }

  // Load target city into Itinerary, Guides, and Map workspace
  function loadCity(cityId) {
    state.activeCity = cityId;
    bot.activeCity = cityId;
    const cityData = window.touristData.destinations[cityId];
    if (!cityData) return;

    // Sidebar widgets updates
    updateWeatherWidget(cityData);
    updateCurrencyWidget(cityData);

    // Renders
    renderItinerary(cityData);
    renderGuides(cityData);
    updateMapPoints(cityData);

    // Switch labels if active tab depends on city details
    if (state.activeTab !== 'explore') {
      switchView(state.activeTab);
    }
  }

  // ==========================================
  // THEME MANAGER
  // ==========================================
  function setupThemeSwitchers() {
    themeBtns.forEach(btn => {
      btn.addEventListener("click", () => {
        const theme = btn.dataset.theme;
        applyTheme(theme);
      });
    });
  }

  function applyTheme(theme) {
    state.currentTheme = theme;
    localStorage.setItem('app_theme', theme);

    // Remove old classes
    document.documentElement.className = "";
    themeBtns.forEach(b => b.classList.remove("active"));

    // Add new class
    if (theme !== 'aurora') {
      document.documentElement.classList.add(`theme-${theme}`);
    }

    // Set Active Button
    const activeBtn = document.querySelector(`.theme-btn[data-theme="${theme}"]`);
    if (activeBtn) activeBtn.classList.add("active");

    // CSS variables handle visual changes automatically
  }

  // ==========================================
  // WIDGETS MANAGER
  // ==========================================
  function setupWidgets() {
    // Currency Convert Amount Event
    currencyAmount.addEventListener("input", calculateCurrency);
    currencySelect.addEventListener("change", calculateCurrency);
  }

  function updateWeatherWidget(cityData) {
    weatherLoc.innerText = `${cityData.name}, ${cityData.country}`;
    // Simple simulated weather logic
    const hour = new Date().getHours();
    const isNight = hour < 6 || hour > 18;
    
    let temp = 22;
    let icon = "☀️";
    if (cityData.name === "Tokyo") temp = 19;
    else if (cityData.name === "Paris") temp = 15;
    else if (cityData.name === "Cairo") temp = 29;
    else if (cityData.name === "Bali") temp = 30;
    else if (cityData.name === "New York City") temp = 12;

    if (temp > 28) icon = "☀️";
    else if (temp < 15) icon = "🌧️";
    else icon = "☁️";

    if (isNight && icon === "☀️") icon = "🌙";

    weatherTemp.innerText = `${temp}°C`;
    weatherIcon.innerText = icon;
  }

  function updateCurrencyWidget(cityData) {
    const selector = document.getElementById("currencySelect");
    selector.innerHTML = `
      <option value="${cityData.exchangeRate}" data-symbol="${cityData.currencySymbol}" selected>
        ${cityData.currency.split(' ')[0]} (${cityData.currencySymbol})
      </option>
      <option value="1" data-symbol="$">USD ($)</option>
    `;
    
    calculateCurrency();
  }

  function calculateCurrency() {
    const amt = parseFloat(currencyAmount.value) || 0;
    const cityData = window.touristData.destinations[state.activeCity];
    if (!cityData) return;

    const rate = parseFloat(currencySelect.value);
    const targetSymbol = currencySelect.options[currencySelect.selectedIndex].dataset.symbol;

    if (currencySelect.value == "1") {
      // Input is USD, target is local currency
      const result = (amt * cityData.exchangeRate).toFixed(2);
      currencyResult.innerText = `${cityData.currencySymbol}${result} ${cityData.currency.split(' ')[0]}`;
    } else {
      // Input is local currency, target is USD
      const result = (amt / cityData.exchangeRate).toFixed(2);
      currencyResult.innerText = `$${result} USD`;
    }
  }

  // ==========================================
  // EXPLORE TAB RENDER
  // ==========================================
  function renderExploreTab() {
    const grid = document.getElementById("exploreGrid");
    grid.innerHTML = "";

    // Filters Controls
    const continentSelect = document.getElementById("filterContinent");
    const budgetSelect = document.getElementById("filterBudget");
    const searchInput = document.getElementById("searchDest");

    const filterDestinations = () => {
      grid.innerHTML = "";
      const continentVal = continentSelect.value.toLowerCase();
      const budgetVal = budgetSelect.value;
      const searchVal = searchInput.value.toLowerCase();

      for (const key in window.touristData.destinations) {
        const dest = window.touristData.destinations[key];
        
        // Simple search query match
        const matchesSearch = dest.name.toLowerCase().includes(searchVal) || 
                              dest.country.toLowerCase().includes(searchVal) ||
                              dest.summary.toLowerCase().includes(searchVal);
        
        // Budget match
        const matchesBudget = !budgetVal || dest.budgetLevel === budgetVal;

        // Continent Match (mock categorization based on coordinates/country)
        let continent = 'europe';
        if (["tokyo"].includes(key)) continent = 'asia';
        else if (["cairo"].includes(key)) continent = 'africa';
        else if (["newyork"].includes(key)) continent = 'america';
        else if (["riodejaneiro"].includes(key)) continent = 'america';
        else if (["capetown"].includes(key)) continent = 'africa';
        else if (["bali"].includes(key)) continent = 'asia';

        const matchesContinent = !continentVal || continent === continentVal;

        if (matchesSearch && matchesBudget && matchesContinent) {
          const isSaved = state.savedDestinations.includes(key);
          const bannerUrl = getCityBannerMock(key);

          const card = document.createElement("div");
          card.className = "destination-card";
          card.innerHTML = `
            <div class="card-banner" style="background-image: url('${bannerUrl}')">
              <div class="card-tags">
                ${dest.categories.map(cat => `<span class="tag">${cat}</span>`).join('')}
              </div>
              <div class="card-budget">${dest.budgetLevel}</div>
            </div>
            <div class="card-body">
              <div class="card-title-row">
                <div>
                  <h3 class="card-title">${dest.name}</h3>
                  <span class="card-country">${dest.country}</span>
                </div>
              </div>
              <p class="card-desc">${dest.summary}</p>
              <div class="card-footer">
                <button class="card-btn card-btn-primary" data-action="explore" data-id="${key}">🎒 Plan Trip</button>
                <button class="card-btn bookmark-btn ${isSaved ? 'active' : ''}" data-action="bookmark" data-id="${key}">
                  <svg width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path></svg>
                  <span>${isSaved ? 'Saved' : 'Save'}</span>
                </button>
              </div>
            </div>
          `;
          grid.appendChild(card);
        }
      }
      
      if (grid.children.length === 0) {
        grid.innerHTML = `
          <div style="grid-column: 1/-1; text-align: center; padding: 4rem; color: var(--text-muted);">
            🔍 No destinations match your filter criteria. Try expanding your search parameters!
          </div>
        `;
      }
    };

    // Filter Listeners
    continentSelect.addEventListener("change", filterDestinations);
    budgetSelect.addEventListener("change", filterDestinations);
    searchInput.addEventListener("input", filterDestinations);

    // Grid Actions Event delegation
    grid.addEventListener("click", (e) => {
      const btn = e.target.closest("button");
      if (!btn) return;

      const action = btn.dataset.action;
      const cityId = btn.dataset.id;

      if (action === 'explore') {
        loadCity(cityId);
        switchView('itinerary');
      } else if (action === 'bookmark') {
        toggleBookmark(cityId, btn);
      }
    });

    filterDestinations();
    renderSavedList();
  }

  function getCityBannerMock(cityId) {
    // Fallback Unsplash collection values for demo matching
    const links = {
      tokyo: 'https://images.unsplash.com/photo-1540959733332-eab4deceeaf7?w=500&auto=format&fit=crop&q=60',
      paris: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=500&auto=format&fit=crop&q=60',
      rome: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=500&auto=format&fit=crop&q=60',
      cairo: 'https://images.unsplash.com/photo-1539650116574-8efeb43e2750?w=500&auto=format&fit=crop&q=60',
      bali: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=500&auto=format&fit=crop&q=60',
      capetown: 'https://images.unsplash.com/photo-1580060839134-75a5edca2e99?w=500&auto=format&fit=crop&q=60',
      newyork: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=500&auto=format&fit=crop&q=60',
      riodejaneiro: 'https://images.unsplash.com/photo-1483729558449-99ef09a8c325?w=500&auto=format&fit=crop&q=60'
    };
    return links[cityId] || 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=500&auto=format&fit=crop&q=60';
  }

  function toggleBookmark(cityId, btnElement) {
    const idx = state.savedDestinations.indexOf(cityId);
    if (idx > -1) {
      state.savedDestinations.splice(idx, 1);
      if (btnElement) {
        btnElement.classList.remove("active");
        btnElement.querySelector("span").innerText = "Save";
      }
    } else {
      state.savedDestinations.push(cityId);
      if (btnElement) {
        btnElement.classList.add("active");
        btnElement.querySelector("span").innerText = "Saved";
      }
    }
    localStorage.setItem('saved_destinations', JSON.stringify(state.savedDestinations));
    renderSavedList();
  }

  function renderSavedList() {
    const list = document.getElementById("savedList");
    if (!list) return;
    
    list.innerHTML = "";
    
    if (state.savedDestinations.length === 0) {
      list.innerHTML = `
        <div style="font-size: 0.75rem; color: var(--text-muted); text-align: center; padding: 1rem;">
          💼 No saved trips yet. Click save on explore cards!
        </div>
      `;
      return;
    }

    state.savedDestinations.forEach(cityId => {
      const city = window.touristData.destinations[cityId];
      if (!city) return;

      const item = document.createElement("div");
      item.className = "nav-item";
      item.style.display = "flex";
      item.style.alignItems = "center";
      item.style.justifyContent = "space-between";
      item.style.padding = "0.25rem 0.5rem";
      
      const link = document.createElement("button");
      link.className = "nav-link";
      link.style.flex = "1";
      link.style.border = "none";
      link.style.padding = "0.5rem";
      link.innerHTML = `
        <svg width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M12 2a10 10 0 1 0 10 10H12V2z"></path></svg>
        <span>${city.name}</span>
      `;
      link.addEventListener("click", () => {
        loadCity(cityId);
        switchView('itinerary');
      });

      const removeBtn = document.createElement("button");
      removeBtn.className = "chat-clear-btn";
      removeBtn.style.padding = "0.5rem";
      removeBtn.innerHTML = `
        <svg width="12" height="12" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M18 6L6 18M6 6l12 12"></path></svg>
      `;
      removeBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        toggleBookmark(cityId);
        renderExploreTab(); // refresh active state
      });

      item.appendChild(link);
      item.appendChild(removeBtn);
      list.appendChild(item);
    });
  }

  // ==========================================
  // ITINERARY TAB RENDER
  // ==========================================
  function renderItinerary(cityData) {
    const container = document.getElementById("itineraryTab");
    container.innerHTML = `
      <div class="itinerary-header-box">
        <div class="itinerary-city-info">
          <h3>${cityData.name}, ${cityData.country}</h3>
          <p>🎒 3-Day Itinerary recommendations generated by AI</p>
        </div>
        <div class="itinerary-actions">
          <button class="card-btn" id="itineraryMapBtn">🗺️ View Map</button>
          <button class="card-btn card-btn-primary" id="itineraryShareBtn">🗣️ Speak Plan</button>
        </div>
      </div>
      <div class="timeline" id="itineraryTimeline"></div>
    `;

    const timeline = document.getElementById("itineraryTimeline");

    cityData.itinerary.forEach((dayData, dIdx) => {
      const dayCard = document.createElement("div");
      dayCard.className = "timeline-item";
      dayCard.innerHTML = `
        <div class="timeline-dot">${dayData.day}</div>
        <div class="timeline-card">
          <h4>${dayData.title}</h4>
          <div class="timeline-activities">
            ${dayData.activities.map((act, aIdx) => {
              const actKey = `${state.activeCity}_d${dayData.day}_a${aIdx}`;
              const checked = state.checkedActivities[actKey] ? 'checked' : '';
              return `
                <div class="activity-item">
                  <div class="activity-checkbox ${checked}" data-key="${actKey}">
                    <svg width="10" height="10" fill="none" stroke="currentColor" stroke-width="3" viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"></polyline></svg>
                  </div>
                  <div class="activity-text">${act}</div>
                </div>
              `;
            }).join('')}
          </div>
        </div>
      `;
      timeline.appendChild(dayCard);
    });

    // Checkbox click listener
    timeline.addEventListener("click", (e) => {
      const checkbox = e.target.closest(".activity-checkbox");
      if (!checkbox) return;

      const key = checkbox.dataset.key;
      checkbox.classList.toggle("checked");

      if (checkbox.classList.contains("checked")) {
        state.checkedActivities[key] = true;
      } else {
        delete state.checkedActivities[key];
      }

      localStorage.setItem('checked_activities', JSON.stringify(state.checkedActivities));
    });

    // Itinerary action buttons
    document.getElementById("itineraryMapBtn").addEventListener("click", () => {
      switchView('map');
    });

    document.getElementById("itineraryShareBtn").addEventListener("click", () => {
      const overviewText = `${cityData.name} Travel Itinerary. Day 1: ${cityData.itinerary[0].title}. Day 2: ${cityData.itinerary[1].title}. Day 3: ${cityData.itinerary[2].title}. Enjoy your trip!`;
      bot.speak(overviewText);
    });
  }

  // ==========================================
  // LOCAL GUIDES RENDER
  // ==========================================
  function renderGuides(cityData) {
    const container = document.getElementById("guidesTab");
    container.innerHTML = `
      <div class="guide-tabs">
        <button class="guide-tab-btn active" data-guide="phrases">🗣️ Phrasebook</button>
        <button class="guide-tab-btn" data-guide="tips">💡 Local Wisdom & Tips</button>
      </div>
      <div id="guidesWorkspace"></div>
    `;

    const guideWorkspace = document.getElementById("guidesWorkspace");
    
    // Default show phrasebook
    renderPhrasebook(cityData, guideWorkspace);

    // Tab clicks event delegation
    container.querySelector(".guide-tabs").addEventListener("click", (e) => {
      const btn = e.target.closest(".guide-tab-btn");
      if (!btn) return;

      container.querySelectorAll(".guide-tab-btn").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");

      const guideType = btn.dataset.guide;
      if (guideType === 'phrases') {
        renderPhrasebook(cityData, guideWorkspace);
      } else {
        renderTips(cityData, guideWorkspace);
      }
    });
  }

  function renderPhrasebook(cityData, container) {
    container.innerHTML = `
      <div class="phrase-grid" id="phraseGrid"></div>
    `;
    const grid = container.querySelector("#phraseGrid");

    cityData.phrases.forEach((phrase, idx) => {
      const card = document.createElement("div");
      card.className = "phrase-card";
      card.innerHTML = `
        <div class="phrase-content">
          <span class="phrase-original">${phrase.original}</span>
          <span class="phrase-pron">Pronounced: ${phrase.pronunciation}</span>
          <span class="phrase-trans">"${phrase.translation}"</span>
        </div>
        <button class="phrase-audio-btn" data-index="${idx}">
          <svg width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path></svg>
        </button>
      `;

      card.querySelector(".phrase-audio-btn").addEventListener("click", () => {
        // Find language code base for speech
        let lang = "en-US";
        if (cityData.name === "Tokyo") lang = "ja-JP";
        else if (cityData.name === "Paris") lang = "fr-FR";
        else if (cityData.name === "Rome") lang = "it-IT";
        else if (cityData.name === "Cairo") lang = "ar-EG";
        else if (cityData.name === "Bali") lang = "id-ID";
        else if (cityData.name === "Rio de Janeiro") lang = "pt-BR";
        
        bot.speak(phrase.original.split(' (')[0], lang);
      });

      grid.appendChild(card);
    });

    // Make window audio trigger globally available for chatbot cards
    window.speakPhrase = (cityName, phraseIdx) => {
      const city = window.touristData.destinations[cityName.toLowerCase().replace(/ /g, '')];
      if (!city) return;
      const phrase = city.phrases[phraseIdx];
      
      let lang = "en-US";
      if (city.name === "Tokyo") lang = "ja-JP";
      else if (city.name === "Paris") lang = "fr-FR";
      else if (city.name === "Rome") lang = "it-IT";
      else if (city.name === "Cairo") lang = "ar-EG";
      else if (city.name === "Bali") lang = "id-ID";
      else if (city.name === "Rio de Janeiro") lang = "pt-BR";

      bot.speak(phrase.original.split(' (')[0], lang);
    };
  }

  function renderTips(cityData, container) {
    container.innerHTML = `
      <div class="local-tips-box">
        <div class="tip-item">
          <div class="tip-icon">🗺️</div>
          <div class="tip-details">
            <h5>Getting Around (Transit)</h5>
            <p>
              ${cityData.name === "Tokyo" ? "Highly organized rail networks. Purchase a prepaid IC Card (Suica/Pasmo) for tap-on entry." : ""}
              ${cityData.name === "Paris" ? "The Metro is the fastest transport. Consider buying a paper ticket bundle (Carnet) or Navigo card." : ""}
              ${cityData.name === "Rome" ? "Historic sights are walking distance. Use Metro Line A & B for longer city transits." : ""}
              ${cityData.name === "Cairo" ? "Ride Uber for safe fixed-rate transits. Cairo metro is efficient but crowded during peak hours." : ""}
              ${cityData.name === "Bali" ? "Rent a scooter if experienced, or download Grab/Gojek rideshare applications for private cars." : ""}
              ${cityData.name === "Cape Town" ? "Use MyCiTi buses or Uber. Avoid walking deserted areas at night." : ""}
              ${cityData.name === "New York City" ? "Purchase a MetroCard or tap with OMNY at any subway turnstile. Subway runs 24/7." : ""}
              ${cityData.name === "Rio de Janeiro" ? "Metro is safe and clean. Use registered yellow cabs or Uber apps, especially at night." : ""}
            </p>
          </div>
        </div>
        <div class="tip-item">
          <div class="tip-icon">🤝</div>
          <div class="tip-details">
            <h5>Cultural Etiquette</h5>
            <p>
              ${cityData.name === "Tokyo" ? "Tipping is strictly not customary. Avoid talking loudly on trains and bow slightly when greeting." : ""}
              ${cityData.name === "Paris" ? "Greeting with 'Bonjour' when entering shops is mandatory politeness. Keep voice volumes moderate." : ""}
              ${cityData.name === "Rome" ? "Cover shoulders and knees when entering religious shrines (churches). Water from fontanelle is free to drink." : ""}
              ${cityData.name === "Cairo" ? "Dress modestly in religious areas. Tipping (Baksheesh) is deeply embedded in service culture here." : ""}
              ${cityData.name === "Bali" ? "Dress modestly when entering temple grounds (sarongs are required). Don't step on ground offerings." : ""}
              ${cityData.name === "Cape Town" ? "Tipping 10-15% is expected at sit-down dining. Always tip car guards looking after your vehicle." : ""}
              ${cityData.name === "New York City" ? "Tipping 18-20% is standard in restaurants. Keep walking pace brisk on sidewalks." : ""}
              ${cityData.name === "Rio de Janeiro" ? "Dress casual and beachy. Locals are warm and highly physical when greeting (hugs/kisses)." : ""}
            </p>
          </div>
        </div>
        <div class="tip-item">
          <div class="tip-icon">👮</div>
          <div class="tip-details">
            <h5>Safety Precautions</h5>
            <p>
              ${cityData.name === "Tokyo" ? "One of the safest cities globally. Keep alert of tourist trap bars in Roppongi or Kabukicho." : ""}
              ${cityData.name === "Paris" ? "Be highly vigilant against pickpockets near Eiffel Tower, Louvre, and crowded subways." : ""}
              ${cityData.name === "Rome" ? "Watch bags on packed tourist buses (Bus 64 is notorious) and avoid buying items from illegal street vendors." : ""}
              ${cityData.name === "Cairo" ? "Cross busy streets carefully. Ignore street hustlers or guides claiming museum access is blocked." : ""}
              ${cityData.name === "Bali" ? "Drink bottled water only (avoid tap water) to prevent 'Bali Belly'. Check local scooter laws." : ""}
              ${cityData.name === "Cape Town" ? "Stick to populated avenues. Do not hike Table Mountain alone; take cableways at sunset." : ""}
              ${cityData.name === "New York City" ? "Safe overall, but stay alert in subway stations late at night. Avoid empty subway cars." : ""}
              ${cityData.name === "Rio de Janeiro" ? "Leave valuables in hotel safes. Be alert on beaches (keep bags close) and avoid favelas alone." : ""}
            </p>
          </div>
        </div>
      </div>
    `;
  }

  // ==========================================
  // VECTOR MAP WORKSPACE
  // ==========================================
  function initMap() {
    const pinsContainer = document.getElementById("mapPinsContainer");
    if (!pinsContainer) return;

    pinsContainer.querySelectorAll(".map-pin").forEach(pin => {
      if (!pin.dataset.hasListener) {
        pin.addEventListener("click", () => {
          const cityId = pin.dataset.id;
          loadCity(cityId);
        });
        pin.dataset.hasListener = "true";
      }
    });

    updateMapPoints(window.touristData.destinations[state.activeCity]);
  }

  function updateMapPoints(cityData) {
    const pinsContainer = document.getElementById("mapPinsContainer");
    if (!pinsContainer) return;

    // Highlight active pin
    pinsContainer.querySelectorAll(".map-pin").forEach(pin => {
      if (pin.dataset.id === state.activeCity) {
        pin.classList.add("active");
      } else {
        pin.classList.remove("active");
      }
    });

    // Populate Sidebar info card
    const sidebar = document.getElementById("mapDetailSidebar");
    if (sidebar) {
      sidebar.innerHTML = `
        <div class="map-detail-header">
          <h3>${cityData.name}</h3>
          <span>📍 ${cityData.country}</span>
        </div>
        <p class="map-detail-summary">${cityData.summary}</p>
        <div class="map-detail-attractions">
          <h4>Top Landmarks</h4>
          \${cityData.attractions.map(attr => \`
            <div class="map-detail-attraction-item">
              <span class="map-detail-attraction-title">\${attr.name}</span>
              <span class="map-detail-attraction-desc">\${attr.description}</span>
            </div>
          \`).join('')}
        </div>
      `;
    }
  }

  // ==========================================
  // CHAT WINDOW CONTROLS
  // ==========================================
  function setupChat() {
    // Send event click
    sendBtn.addEventListener("click", handleUserSend);
    
    // Input enter event
    chatInput.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        handleUserSend();
      }
    });

    // Clear history click
    document.getElementById("clearChatBtn").addEventListener("click", () => {
      chatHistory.innerHTML = "";
      appendBotMessage("Conversation logs cleared! Where are we exploring next? 🗺️");
    });
  }

  function handleUserSend() {
    const text = chatInput.value.trim();
    if (!text) return;

    chatInput.value = "";
    
    // User bubble
    appendUserMessage(text);

    // Show bot typing indicator
    const typingElement = showBotTyping();

    // Process Bot Response after artificial delay
    setTimeout(() => {
      // Remove typing indicator
      typingElement.remove();
      
      const botResponse = bot.processMessage(text);
      appendBotMessage(botResponse.text, botResponse.cardHTML);

      // Perform view updates based on response
      if (botResponse.cityId && botResponse.cityId !== state.activeCity) {
        loadCity(botResponse.cityId);
      }
      if (botResponse.switchTab) {
        switchView(botResponse.switchTab);
      }
      // Map centers visually on selected city pin automatically via state.activeCity update
    }, 800 + Math.random() * 500);
  }

  function appendUserMessage(text) {
    const time = getFormattedTime();
    const bubble = document.createElement("div");
    bubble.className = "chat-msg chat-msg-user";
    bubble.innerHTML = `
      <div class="msg-bubble">${escapeHTML(text)}</div>
      <span class="msg-time">${time}</span>
    `;
    chatHistory.appendChild(bubble);
    scrollChatBottom();
  }

  function appendBotMessage(text, cardHTML = null) {
    const time = getFormattedTime();
    const bubble = document.createElement("div");
    bubble.className = "chat-msg chat-msg-bot";
    
    // Format markdown stars (bold formatting)
    const formattedText = parseMarkdownBold(text);

    let html = `
      <div class="msg-bubble">${formattedText}</div>
    `;

    if (cardHTML) {
      html += cardHTML;
    }

    html += `<span class="msg-time">${time}</span>`;
    
    bubble.innerHTML = html;
    chatHistory.appendChild(bubble);
    scrollChatBottom();
  }

  function showBotTyping() {
    const bubble = document.createElement("div");
    bubble.className = "chat-msg chat-msg-bot";
    bubble.innerHTML = `
      <div class="msg-bubble" style="padding: 0.65rem 1rem;">
        <div class="typing-indicator">
          <div class="typing-dot"></div>
          <div class="typing-dot"></div>
          <div class="typing-dot"></div>
        </div>
      </div>
    `;
    chatHistory.appendChild(bubble);
    scrollChatBottom();
    return bubble;
  }

  function scrollChatBottom() {
    chatHistory.scrollTop = chatHistory.scrollHeight;
  }

  function getFormattedTime() {
    const now = new Date();
    return now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }

  function escapeHTML(str) {
    return str.replace(/[&<>'"]/g, 
      tag => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[tag] || tag)
    );
  }

  function parseMarkdownBold(str) {
    // Basic formatting replacement: **text** -> <strong>text</strong>
    return str.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
              .replace(/\*(.*?)\*/g, '<em>$1</em>')
              .replace(/\n/g, '<br>');
  }

  // ==========================================
  // SPEECH CONTROL BRIDGES
  // ==========================================
  function setupVoice() {
    if (!bot.recognition) {
      micBtn.style.display = "none"; // Hide button if SpeechRec is not supported
      return;
    }

    bot.recognition.onstart = () => {
      state.isRecording = true;
      micBtn.classList.add("recording");
      chatInput.placeholder = "Listening... Speak now";
    };

    bot.recognition.onend = () => {
      state.isRecording = false;
      micBtn.classList.remove("recording");
      chatInput.placeholder = "Ask your advisor...";
    };

    bot.recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      chatInput.value = transcript;
      handleUserSend();
    };

    bot.recognition.onerror = (e) => {
      console.error("Speech Recognition Error:", e);
      state.isRecording = false;
      micBtn.classList.remove("recording");
      chatInput.placeholder = "Ask your advisor...";
    };

    micBtn.addEventListener("click", () => {
      if (state.isRecording) {
        bot.recognition.stop();
      } else {
        bot.recognition.start();
      }
    });
  }

  // ==========================================
  // GLOBAL BOT ACTION BRIDGES (for interactive cards)
  // ==========================================
  window.botAction = (action, val = null) => {
    switch (action) {
      case 'recommend':
        chatInput.value = "Recommend me some travel destinations";
        handleUserSend();
        break;
      case 'help_itinerary':
        chatInput.value = `Suggest an itinerary for ${window.touristData.destinations[state.activeCity].name}`;
        handleUserSend();
        break;
      case 'help_budget':
        chatInput.value = `What is the budget for ${window.touristData.destinations[state.activeCity].name}?`;
        handleUserSend();
        break;
      case 'help_language':
        chatInput.value = `Local phrases for ${window.touristData.destinations[state.activeCity].name}`;
        handleUserSend();
        break;
      case 'city':
        loadCity(val);
        chatInput.value = `Tell me about ${window.touristData.destinations[val].name}`;
        handleUserSend();
        break;
      case 'budget_tier':
        chatInput.value = `Estimate a ${val} budget for ${window.touristData.destinations[state.activeCity].name}`;
        handleUserSend();
        break;
      case 'query':
        chatInput.value = val;
        handleUserSend();
        break;
      case 'tab':
        switchView(val);
        break;
    }
  };
});

# Technology Stack — Mobile

## Options Evaluated

| Option | Pros | Cons |
|---|---|---|
| **React Native + Phaser** | Web tech reuse | Phaser not ideal on RN |
| **Unity (C#)** | Best mobile perf, huge ecosystem | Rewrite from scratch |
| **Godot (GDScript)** | Lightweight, open-source | Smaller ecosystem |
| **Capacitor + current codebase** | Fastest path, reuse existing code | Performance ceiling |
| **Flutter + Flame** | Dart, cross-platform, performant | Smaller community |

---

## Recommendation: Capacitor (Phase 1) → Unity (Phase 2)

### Phase 1: Validate with Capacitor
*Timeline: 2–4 weeks*

Wrap the existing Vite/Phaser web game in **Capacitor** to create a native-feeling mobile app:

```bash
npm install @capacitor/core @capacitor/cli
npx cap init "Iron Dominion" "com.irondominion.mobile"
npx cap add ios
npx cap add android
npx vite build
npx cap copy
npx cap open ios   # Opens Xcode
```

**Goal:** Ship a testable version on TestFlight quickly. Validate the core gameplay loop on mobile. Identify UX pain points.

**Limitations:**
- Phaser on WebView → slightly lower perf than native
- No native ads SDK (not needed based on monetization)
- Memory limits on older devices

### Phase 2: Native with Unity (if Phase 1 validates)
*Timeline: 3–6 months*

Rewrite in Unity if:
- Capacitor performance is unacceptable on mid-range devices
- Phaser WebView crashes on < 3GB RAM devices
- Advanced graphics (shaders, particles) are needed

---

## Phase 1 Tech Stack (Capacitor)

| Layer | Technology |
|---|---|
| Game engine | Phaser 3 (existing) |
| Language | TypeScript (existing) |
| Build | Vite (existing) |
| Mobile wrapper | Capacitor 6 |
| iOS | WKWebView + Capacitor runtime |
| Android | WebView (Chromium) + Capacitor |
| IAP | `@capacitor-community/in-app-purchases` |
| Analytics | `@capacitor-firebase/analytics` |
| Haptics | `@capacitor/haptics` (native feel) |

---

## Performance Targets (Capacitor)

| Metric | Target | Acceptable |
|---|---|---|
| FPS (mid-range device) | 60fps | 30fps |
| Load time to playable | < 3s | < 5s |
| Memory usage | < 200MB | < 350MB |
| Battery drain per hour | < 8% | < 15% |

Test devices:
- iPhone SE 3 (low-end iOS)
- iPhone 15 (high-end iOS)  
- Samsung Galaxy A34 (mid-range Android)
- Pixel 6a (mid-range Android)

---

## Level Data Format

Levels are stored as JSON and loaded at runtime:

```typescript
interface LevelConfig {
  id: string;           // "ch1_l1"
  chapter: number;      // 1–5
  name: string;         // "First Track"
  map: {
    width: number;
    height: number;
    terrain: TerrainCell[][];
    cities: CityPlacement[];
    resources: ResourcePlacement[];
  };
  economy: {
    startingFunds: number;
    trackCostMultiplier: number;
    revenueMultiplier: number;
    maintenanceMultiplier: number;
  };
  available: {
    trainTypes: TrainType[];
    stationTypes: StationType[];
    // Note: no techEras — upgrades are applied globally via the Meta-Hub, not per-level
  };
  objectives: {
    primary: Objective;
    bonus: Objective[];
  };
  starConditions: StarConditions;
  timeLimitMonths: number | null;
}
```

---

## Persistent Player State

RP and upgrades are **global and persistent** — they must survive app restarts, device switches, and level replays.

### What Gets Persisted

| State | Storage | Notes |
|---|---|---|
| RP balance | `@capacitor/preferences` (key-value) | Simple integer |
| Purchased upgrades | `@capacitor/preferences` or SQLite | Array of upgrade node IDs |
| Level star ratings | SQLite (via `@capacitor-community/sqlite`) | Per-level record |
| Career rank | Derived from level records | Computed, not stored |

### Upgrade Application Flow

```
Player taps "Play Level"
  ↓
Load purchased upgrades from storage
  ↓
Apply upgrade bonuses → modify level config at runtime
  (e.g. T1 Steel Rails → trackCostMultiplier: 0.9)
  ↓
Level starts with bonuses already baked in
```

> The level JSON config `trackCostMultiplier`, `revenueMultiplier` etc. are the tuning knobs that upgrades modify at runtime. Level designers set baseline values; upgrades shift them.

---

## File Size Budget

| Asset | Budget |
|---|---|
| Game code (JS bundle) | < 2MB |
| Base terrain textures | < 5MB |
| Train sprites | < 3MB |
| UI assets | < 2MB |
| Audio (base sounds) | < 5MB |
| **Total base app** | **< 20MB** |

Cosmetic packs: downloaded on-demand, ~2–5MB each.

---

## App Store Checklist

### iOS
- [ ] Privacy manifest (PrivacyInfo.xcprivacy)
- [ ] App Tracking Transparency (if analytics)
- [ ] Screenshots: 6.9", 6.5", 5.5", iPad 13"
- [ ] Age rating: 4+
- [ ] IAP products created in App Store Connect

### Android
- [ ] Target API 35 (2025 requirement)
- [ ] 64-bit ARM build
- [ ] App Bundle (AAB) not APK
- [ ] Data safety form

---

## Capacitor Setup Commands

```bash
# In iron-dominion-mobile (new project based on iron-dominion)
npm create vite@latest . -- --template vanilla-ts
npm install phaser
npm install @capacitor/core @capacitor/cli @capacitor/haptics
npm install @capacitor-community/in-app-purchases

# Initialize
npx cap init "Iron Dominion" "com.fordprefect.irondominion" --web-dir=dist

# Add platforms
npx cap add ios
npx cap add android

# Build + sync
npm run build && npx cap sync
```

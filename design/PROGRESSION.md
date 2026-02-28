# Player Progression & Meta-Game

## Progression Layers

The game has **3 layers** of progression:

```
Layer 3: COLLECTION       → Train skins, map themes, achievements
Layer 2: META-GAME        → RP upgrade tree, career rank, unlockables
Layer 1: CAMPAIGN         → 60 levels, 5 chapters, star rating
```

Each layer provides a different retention loop.

---

## Layer 1: Campaign Progression

```
Chapter 1 (10 levels)
    ↓ complete any 8/10
Chapter 2 (12 levels) ← paywall trigger
    ↓ complete any 10/12
Chapter 3 (14 levels)
    ...
```

> **Soft locks:** The player needs 80% of levels to advance — they can skip 2 hard levels per chapter. Skipped levels remain accessible for replaying to earn more RP.

### Star Economy
Stars are the gating currency for campaign advancement:

| Stars Earned | Unlock |
|---|---|
| 10 ⭐ | Cosmetic: Classic Red Engine skin |
| 25 ⭐ | Bonus level: "The Highland Run" |
| 50 ⭐ | Cosmetic: Vintage map theme |
| 100 ⭐ | Endless mode unlocked |
| 150 ⭐ | Cosmetic: Neon Bullet skin |
| 180 ⭐ (max) | "Tycoon" title + gold badge |

---

## Layer 2: Meta-Game — Research Points (RP) Upgrade System

> **Research Points are a meta currency.** They are never generated or spent during a level. They are earned when a level is completed and spent in the **Meta-Hub** between levels.

### How RP is Earned

See `ECONOMY.md` Section 5 for the full reward table. Summary:

| Star Rating | Base RP | Chapter 1 | Chapter 3 | Chapter 5 |
|---|---|---|---|---|
| ⭐ | 20 | 20 | 40 | 60 |
| ⭐⭐ | 35 | 35 | 70 | 105 |
| ⭐⭐⭐ | 50 | 50 | 100 | 150 |

RP carries over indefinitely — it is never reset.

---

### The Upgrade Hub

The Upgrade Hub is accessed from the **world map screen** between levels. It organises upgrades into **3 branches**, each with a tiered tree:

```
┌──────────────────────────────────────────────┐
│  🔬 Research Hub              RP: 340        │
├──────────────┬───────────────┬───────────────┤
│  🛤️ TRACKS   │  🚂 ENGINES   │  🚃 CARRIAGES  │
├──────────────┼───────────────┼───────────────┤
│  [T1] Steel  │  [E1] Boiler  │  [C1] Padding  │
│  Rails       │  Efficiency   │  Upgrade       │
│  80 RP  ✅   │  80 RP  ✅    │  60 RP  ✅     │
│              │               │                │
│  [T2] Graded │  [E2] Faster  │  [C2] Mail     │
│  Earthworks  │  Piston       │  Sorting Car   │
│  150 RP  🔒  │  150 RP  🔒   │  100 RP  🔒    │
│              │               │                │
│  [T3] Iron   │  [E3] Dual    │  [C3] Dining   │
│  Bridge      │  Drive        │  Car           │
│  250 RP  🔒  │  250 RP  🔒   │  200 RP  🔒    │
│              │               │                │
│  [T4] Signal │  [E4] Diesel  │  [C4] Freight  │
│  Network     │  Conversion   │  Expansion     │
│  400 RP  🔒  │  400 RP  🔒   │  350 RP  🔒    │
│              │               │                │
│  [T5] Hi-Speed│ [E5] Turbo   │  [C5] Maglev   │
│  Rail         │ Diesel       │  Pod           │
│  600 RP  🔒  │  600 RP  🔒   │  600 RP  🔒    │
└──────────────┴───────────────┴───────────────┘
```

> **Gate rule:** Each tier requires the previous tier to be purchased first (within the same branch). Branches are independent of each other.

---

### Upgrade Effects

#### 🛤️ Tracks Branch

| Node | Name | Effect |
|---|---|---|
| T1 | Steel Rails | Track build cost –10% |
| T2 | Graded Earthworks | Mountain/wetland build cost –20% |
| T3 | Iron Bridge | River crossing cost –30% |
| T4 | Signal Network | All trains move +15% speed |
| T5 | Hi-Speed Rail | Unlocks Hi-Speed track type (2× speed, 3× cost) |

#### 🚂 Engines Branch

| Node | Name | Effect |
|---|---|---|
| E1 | Boiler Efficiency | All steam engine maintenance –15% |
| E2 | Faster Piston | Steam train speed +10% |
| E3 | Dual Drive | All engines speed +10% additional |
| E4 | Diesel Conversion | Diesel engine cost –20% |
| E5 | Turbo Diesel | Diesel trains revenue mult +0.3× |

#### 🚃 Carriages Branch

| Node | Name | Effect |
|---|---|---|
| C1 | Padding Upgrade | Passenger revenue +10% |
| C2 | Mail Sorting Car | Mail train capacity +20% |
| C3 | Dining Car | Luxury train revenue mult +0.5× |
| C4 | Freight Expansion | Freight train capacity +25% |
| C5 | Maglev Pod | Maglev passenger revenue +30% |

---

### Meta-Game — Career Rank

A persistent **Career Rank** tracks overall player skill:

| Rank | Requirement | Badge |
|---|---|---|
| 🔧 Station Apprentice | Start | Grey |
| 🚂 Track Foreman | 10 levels complete | Bronze |
| 🏭 Railway Manager | 25 levels, 50 ⭐ | Silver |
| 🏛️ Regional Director | 40 levels, 100 ⭐ | Gold |
| 👑 Railway Tycoon | All 60 levels, 150 ⭐ | Platinum |

Career Rank is shown on the profile screen and level select.

---

## Daily Challenges

A new challenge every 24 hours (drives recurring sessions):

| Challenge Type | Example |
|---|---|
| **Speed Run** | Complete level 5 in under 6 months |
| **Minimalist** | Connect 3 cities with a budget of $6,000 |
| **Train Limit** | Earn $2,000/month with only 1 train |
| **No Demolish** | Complete level 8 without demolishing anything |
| **Star Hunt** | Get 3 stars on any Chapter 1 level |

Rewards: cosmetic shards, **bonus RP**, special badge.

---

## Endless Mode (Post-Game)

Unlocked after 100 stars. Procedurally generated maps, infinite play:

| Feature | Detail |
|---|---|
| Map size | Grows as network expands |
| Difficulty | Scales with months elapsed |
| Leaderboard | Weekly high score by revenue |
| No win state | Keep growing until bankruptcy |

> Upgrades purchased in the Upgrade Hub **apply to Endless Mode** — giving the meta-progression meaning beyond the campaign.

---

## New Player Funnel

```
Install
  ↓
Tutorial (Level 1 — 2 min, forced)
  ↓
Level 2–3 (gentle ramp, 5 min each)
  ↓
[First RP earned — Meta-Hub introduced after Level 1]
  ↓
Player purchases T1 Steel Rails (80 RP)
  ↓
Plays Level 4 — notices cheaper tracks
  ↓
Chapter 1 complete (~1 hour total play)
  ↓
[Paywall shown — soft prompt, not forced]
  ↓
Daily challenge introduced
  ↓
[Day 7 retention target]
```

---

## Engagement Triggers

| Trigger | Timing | Message |
|---|---|---|
| Return push notification | 23 hrs after last session | "New daily challenge ready 🚂" |
| Milestone notification | On rank up | "You're now a Railway Manager!" |
| Re-engagement (3 days inactive) | 72 hrs | "Your empire awaits..." |

> All notifications are **opt-in only** at first launch. iOS/Android permission requested after Chapter 1 complete.

---

## Session Design

Target session length: **10–15 minutes**

| Scenario | Session |
|---|---|
| First time | Tutorial → Level 1 → Upgrade Hub intro → Level 2 (15 min) |
| Returning player | Daily challenge + 1 level + check upgrades (10 min) |
| Weekend session | 3–5 levels + upgrade spending (30–45 min) |
| Late-game | Endless mode session (open-ended) |

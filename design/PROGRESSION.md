# Player Progression & Meta-Game

## Progression Layers

The game has **3 layers** of progression:

```
Layer 3: COLLECTION       → Train skins, map themes, achievements
Layer 2: META-GAME        → Tech tree, career rank, unlockables
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

> **Soft locks:** The player needs 80% of levels to advance — they can skip 2 hard levels per chapter.

### Star Economy
Stars from levels unlock bonus content:

| Stars Earned | Unlock |
|---|---|
| 10 ⭐ | Cosmetic: Classic Red Engine skin |
| 25 ⭐ | Bonus level: "The Highland Run" |
| 50 ⭐ | Cosmetic: Vintage map theme |
| 100 ⭐ | Endless mode unlocked |
| 150 ⭐ | Cosmetic: Neon Bullet skin |
| 180 ⭐ (max) | "Tycoon" title + gold badge |

---

## Layer 2: Meta-Game — Career Rank

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

Rewards: cosmetic shards, RP bonus, special badge.

---

## Endless Mode (Post-Game)

Unlocked after 100 stars. Procedurally generated maps, infinite play:

| Feature | Detail |
|---|---|
| Map size | Grows as network expands |
| Difficulty | Scales with months elapsed |
| Leaderboard | Weekly high score by revenue |
| No win state | Keep growing until bankruptcy |

---

## New Player Funnel

```
Install
  ↓
Tutorial (Level 1 — 2 min, forced)
  ↓
Level 2–3 (gentle ramp, 5 min each)
  ↓
[Day 1 — ask for Review if 3 ⭐ earned]
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
| First time | Tutorial → Level 1 → Level 2 (15 min) |
| Returning player | Daily challenge + 1 level (10 min) |
| Weekend session | 3–5 levels (30–45 min) |
| Late-game | Endless mode session (open-ended) |

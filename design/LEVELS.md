# Level Design & Campaign Arc

## Campaign Philosophy

The campaign is structured as **a journey through the Railway Age** — from laying the first track in a small valley to managing a transcontinental empire. Each level is a self-contained puzzle with a clear win condition.

---

## Level Structure

Every level has exactly:

| Element | Description |
|---|---|
| **Map** | Fixed hex grid, pre-placed terrain and cities |
| **Starting funds** | Fixed per level (no carryover) |
| **Objective(s)** | 1 primary + 0–2 bonus objectives |
| **Time limit** | Optional (adds challenge stars) |
| **Unlocked features** | Subset of full game features |

### Win Conditions (types)
- 💰 **Revenue**: Earn $X in monthly income
- 🚂 **Network**: Connect N cities
- 📦 **Delivery**: Deliver X cargo within Y months
- 🏆 **Profit**: Reach positive net profit
- ⏱️ **Speed**: Complete network in under N months

### Fail Conditions
- Funds drop to $0 (bankruptcy)
- Time limit exceeded (optional per level)

---

## Campaign World — 5 Chapters

### Chapter 1: Valley Rails (Levels 1–10)
*Steam Era — flat terrain, 2–3 cities*

| Level | Name | Primary Objective | New Feature |
|---|---|---|---|
| 1 | First Track | Connect 2 cities | Track building |
| 2 | The Freight Run | Earn $500/month | Freight trains |
| 3 | Station Master | Build 3 stations | Station types |
| 4 | Mountain Bypass | Connect over hills | Terrain costs |
| 5 | Mail Express | Deliver mail in 12 months | Mail trains |
| 6 | The Coach Line | 2 passenger routes | Passenger trains |
| 7 | River Crossing | Build across water | Bridge cost |
| 8 | Resource Rush | Deliver 3 resource types | Resource tiles |
| 9 | Rival Junction | Out-earn the rival | Competition intro |
| 10 | Valley Empire | 5 cities, $2000/month | Chapter boss |

### Chapter 2: Industrial Heartland (Levels 11–22)
*Steam → Diesel transition — factories, mines, more cities*

| Level | Name | Highlight |
|---|---|---|
| 11 | Coal Country | Resource extraction loop |
| 12 | Steel Highway | Long-distance freight |
| 13 | The Mixed Consist | Mixed train optimization |
| 14 | Luxury Service | Luxury trains, revenue premium |
| 15 | The Tycoon | Reach $10,000 balance |
| 16 | Diesel Dawn | First diesel unlock |
| 17 | Suburban Sprawl | Dense city network |
| 18 | The Trade Route | Cross-map cargo chains |
| 19 | Efficiency Drive | Reduce maintenance below $X |
| 20 | Grand Junction | 10-city hub |
| 21 | The Merger | Absorb 2 rival routes |
| 22 | Heartland King | Chapter boss |

### Chapter 3: Electric Age (Levels 23–36)
*Electric era — speed matters, signal optimization*

### Chapter 4: The Global Network (Levels 37–50)
*All eras — massive maps, complex optimisation*

### Chapter 5: The Future (Levels 51–60)
*Maglev + Hyperloop — near-future tech*

---

## Difficulty Stars System

Each level awards **1–3 stars** based on efficiency::

| Stars | Condition |
|---|---|
| ⭐ | Complete primary objective |
| ⭐⭐ | Complete with $X surplus funds remaining |
| ⭐⭐⭐ | Complete all bonus objectives within time |

Stars unlock **cosmetic rewards** and speed up chapter progression.

---

## Level Complexity Curve

```
Complexity
    │
 ███│                                              ████
 ██ │                             ██████       ████
 █  │              ████       ████      ███████
 █  │   ████   ████    ███████
 ░  │███    ███
    └────────────────────────────────────────── Level
        1-10     11-22    23-36   37-50   51-60
       Valley  Industrial Electric Global  Future
```

---

## Tutorial Flow (First 3 Levels)

```
Level 1:
  → Tap to place track (2 tiles shown)
  → "Connect the cities!" 
  → Buy a freight train (pre-selected)
  → Watch train run → win

Level 2:
  → Three cities shown
  → "Build a route that earns $500/month"
  → Introduce income display
  → Speed controls introduced

Level 3:
  → Introduce station types
  → Show cost difference
  → Multiple valid solutions (open-ended)
```

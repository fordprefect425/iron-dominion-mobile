# Economy Parameters & Balancing

> This sheet defines all numerical parameters for the mobile level economy. Values are tunable per-level using a config JSON.

---

## 1. Starting Funds by Chapter

| Chapter | Starting Funds | Rationale |
|---|---|---|
| 1 (Valley) | $5,000 – $15,000 | Tight — teaches frugality |
| 2 (Industrial) | $12,000 – $30,000 | Medium scope |
| 3 (Electric) | $25,000 – $60,000 | Larger networks |
| 4 (Global) | $50,000 – $150,000 | Complex infra |
| 5 (Future) | $100,000 – $500,000 | Prestige levels |

---

## 2. Build Costs

### Track

| Terrain | Cost per Hex | Rationale |
|---|---|---|
| Flat (grassland) | $500 | Baseline |
| Forest | $750 | 1.5× |
| Mountain | $1,500 | 3× — major decision |
| Desert | $600 | 1.2× |
| Wetland | $1,000 | 2× |
| River crossing | $2,000 | Special |

### Stations

| Type | Build Cost | Monthly Maintenance |
|---|---|---|
| Halt (small) | $1,000 | $30 |
| Station | $3,000 | $100 |
| Junction | $5,000 | $150 |
| Terminal | $15,000 | $200 |

> **Mobile Simplification:** Consider collapsing to 2 station types (Basic / Grand) for the first 2 chapters.

---

## 3. Train Costs & Stats

| Train | Era | Cost | Speed | Capacity | Maintenance | Revenue Mult |
|---|---|---|---|---|---|---|
| Freight | Steam | $5,000 | 0.15 | 100 | $50/mo | 1.0× |
| Passenger | Steam | $8,000 | 0.25 | 60 | $80/mo | 2.0× |
| Mail | Steam | $4,000 | 0.30 | 40 | $40/mo | 1.2× |
| Mixed | Diesel | $6,000 | 0.20 | 70 | $65/mo | 1.3× |
| Luxury | Diesel | $12,000 | 0.20 | 30 | $120/mo | 3.0× |
| Express | Electric | $15,000 | 0.40 | 80 | $150/mo | 2.5× |
| Commuter | Electric | $10,000 | 0.35 | 120 | $100/mo | 1.5× |
| Bullet | Maglev | $25,000 | 0.55 | 90 | $200/mo | 4.0× |
| Hyperloop | Maglev | $50,000 | 0.80 | 50 | $350/mo | 5.0× |

---

## 4. Revenue Formula

```
Route Revenue (per completion) =
    route_length_hexes
    × 100                         ← base per hex
    × train_type_multiplier
    × (1 + tech_revenue_bonus%)
    × terrain_efficiency_factor   ← 0.8 for mountains, 1.0 flat
```

### Revenue per Train per Month (estimates)
*(Assumes 10-hex route, 1× speed, completes ~3 trips/month)*

| Train | Trips/month | Revenue/trip | Monthly Revenue | Net (after maintenance) |
|---|---|---|---|---|
| Freight | 3 | $1,000 | $3,000 | **+$2,950** |
| Passenger | 3 | $2,000 | $6,000 | **+$5,920** |
| Mail | 4 | $1,200 | $4,800 | **+$4,760** |
| Mixed | 3 | $1,300 | $3,900 | **+$3,835** |
| Luxury | 3 | $3,000 | $9,000 | **+$8,880** |
| Express | 5 | $2,500 | $12,500 | **+$12,350** |
| Commuter | 4 | $1,500 | $6,000 | **+$5,900** |
| Bullet | 6 | $4,000 | $24,000 | **+$23,800** |
| Hyperloop | 8 | $5,000 | $40,000 | **+$39,650** |

---

## 5. Tech Tree Research Points

| Source | RP per Month |
|---|---|
| Per station owned | +10 RP |
| 2% of monthly income | variable |
| Level bonus (first time) | +50 RP flat |

### Tech Costs (unchanged from desktop)

| Era | Cheapest Tech | Most Expensive |
|---|---|---|
| Steam | 400 RP | 800 RP |
| Diesel | 1,200 RP | 2,000 RP |
| Electric | 2,500 RP | 4,000 RP |
| Maglev | 6,000 RP | 10,000 RP |

> **Mobile Consideration:** Research is gated by chapter — Diesel unlocks only from Chapter 2 regardless of RP.

---

## 6. Difficulty Levers (per level config)

These values can be tuned in each level's JSON config:

```json
{
  "levelId": "ch1_l1",
  "startingFunds": 8000,
  "trackCostMultiplier": 1.0,
  "trainCostMultiplier": 1.0,
  "revenueMultiplier": 1.0,
  "maintenanceMultiplier": 1.0,
  "availableTrainTypes": ["freight"],
  "availableStationTypes": ["halt", "station"],
  "timeLimitMonths": null,
  "objectives": {
    "primary": { "type": "connect_cities", "count": 2 },
    "bonus": []
  },
  "starConditions": {
    "oneStar": "complete_primary",
    "twoStar": "funds_remaining_gt_2000",
    "threeStar": "complete_in_lt_6_months"
  }
}
```

---

## 7. Economy Health Checks

When balancing a level, verify:

| Check | Target |
|---|---|
| Can player afford 1 train after initial infrastructure? | Yes |
| Does first train break even within 3 months? | Yes |
| Initial build cost < 60% of starting funds? | Yes |
| Is $3-star condition ~20% harder than $2-star? | Yes |
| Does bankruptcy require 2+ consecutive bad decisions? | Yes |

---

## 8. Mobile Session Economy

Mobile sessions are short (~10 min). The game economy needs to match:

| Phase | Duration | What happens |
|---|---|---|
| Build phase | 2–4 min | Player builds network |
| Early income | 1–2 min | First trains run, revenue trickles |
| Growth | 2–4 min | Expand, optimize |
| Resolution | 1 min | Win/fail evaluation |

> **Key:** Players should see positive income within **2 minutes of starting a level**. Negative revenue for too long = abandoned session.

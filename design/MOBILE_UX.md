# Mobile UX & Touch Design

## Screen Layout

```
┌─────────────────────────────────────┐  ← Status bar (safe area)
│  💰 $8,000  |  Jan 1840  |  ▶ ▶▶   │  ← Top HUD (compact)
├─────────────────────────────────────┤
│                                     │
│                                     │
│          HEX MAP VIEWPORT           │
│       (pinch-zoom, drag-pan)        │
│                                     │
│                                     │
│                                     │
├─────────────────────────────────────┤
│  [ 🛤️ Track ]  [ 🏛️ Station ]         │  ← Context toolbar
│  [ 🚂 Train  ]  [ 🗑️ Demolish ]       │
└─────────────────────────────────────┘  ← Home indicator safe area
```

---

## Touch Interactions

| Gesture | Action |
|---|---|
| **Tap hex** | Select / place building |
| **Drag** | Pan map |
| **Pinch** | Zoom in/out |
| **Double-tap** | Center on hex |
| **Long-press hex** | Context menu (info/demolish) |
| **Swipe up toolbar** | Expand build menu |
| **Swipe down** | Dismiss panel |

### Hit Area Minimums
- All buttons: **44×44pt minimum** (Apple HIG standard)
- Hex tiles at default zoom: ~60×60pt ✅
- At max zoom-out: may need overlay tap-targets if < 44pt

---

## Hex Grid Sizing

| Zoom Level | Hex Screen Size | Interaction |
|---|---|---|
| Max zoom in | ~120pt | Easy precision building |
| Default | ~60pt | Comfortable for most |
| Max zoom out | ~30pt | Overview only, no building |

> Block building when zoomed out past threshold — show "Zoom in to build" toast.

---

## Top HUD (Minimal)

Keep the mobile HUD to **3 items max** during a level. RP is **never shown during gameplay** — it lives exclusively on the Meta-Hub screen between levels.

| Item | Always Visible | Tap Action |
|---|---|---|
| 💰 Balance | ✅ | Opens economy details |
| 📅 Date/Speed | ✅ | Tap to cycle speed |
| 🎯 Objective | ✅ | Opens objectives sheet |

> Remove: Income/Expenses/Net from always-visible HUD. Move to expanded economy sheet (tap balance to see).
> Research Points (RP) are never displayed during a level. They appear only on the world map and upgrade hub.

---

## Bottom Toolbar

### Default State (no tool selected)
```
[ 🛤️ Track ] [ 🏛️ Station ] [ 🚂 Train ] [ ⚙️ More ]
```

### Track Mode Active
```
[ ✕ Cancel ] [ Track Cost: $500 ]         [ ✏️ Building... ]
```

### Train Purchase Sheet (bottom sheet, slides up)
```
┌─────────────────────────────────────┐
│  🚂 Choose Train                  ✕ │
│  Route: Valley → Millbrook          │
│                                     │
│  ┌─────────┐  ┌─────────┐          │
│  │ Freight │  │Passenger│          │
│  │  $5,000 │  │  $8,000 │          │
│  └─────────┘  └─────────┘          │
│  ┌─────────┐  ┌─────────┐          │
│  │  Mail   │  │  🔒 More│          │
│  │  $4,000 │  │ Research│          │
│  └─────────┘  └─────────┘          │
└─────────────────────────────────────┘
```

---

## Win / Fail Screens

### Win Screen
```
┌──────────────────────────────┐
│    🏆  LEVEL COMPLETE!       │
│                              │
│    ⭐ ⭐ ⭐                   │
│                              │
│  Valley → Millbrook done! 🎉 │
│  Earned: $12,400             │
│  Months used: 8/12           │
│                              │
│  [ Next Level ]  [ Replay ]  │
└──────────────────────────────┘
```

### Fail Screen
```
┌──────────────────────────────┐
│    💸  BANKRUPT              │
│                              │
│  You ran out of funds.       │
│                              │
│  Tip: Build shorter routes   │
│  first to earn early income  │
│                              │
│  [ Try Again ]  [ Menu ]     │
└──────────────────────────────┘
```

---

## Meta-Hub Screen (Between Levels)

The Meta-Hub is the **world map screen** the player returns to after every level. It is the only place RP is visible and spendable.

```
┌──────────────────────────────────────────┐  ← Safe area
│  👑 Railway Manager    🔬 RP: 340        │  ← Career rank + RP balance
├──────────────────────────────────────────┤
│                                          │
│        [ WORLD MAP / CHAPTER SELECT ]    │  ← Tap chapter to expand levels
│                                          │
│   Ch.1 Valley ████████░░  8/10 ⭐ 23     │
│   Ch.2 Industrial ░░░░░░  locked         │
│                                          │
├──────────────────────────────────────────┤
│  [ 🔬 Upgrade Hub ]   [ 👤 Profile ]     │  ← Bottom nav
│  [ 📅 Daily Challenge ] [ ⚙️ Settings ]  │
└──────────────────────────────────────────┘
```

### Upgrade Hub Entry Point

Tapping **🔬 Upgrade Hub** slides in the full 3-branch upgrade grid (see `PROGRESSION.md` for the upgrade tree):

```
┌──────────────────────────────────────────┐
│  🔬 Upgrade Hub              RP: 340   ✕ │
├──────────────┬───────────────┬────────────┤
│  🛤️ Tracks   │  🚂 Engines   │  🚃 Cars   │
│              │               │            │
│  T1 ✅ 80RP  │  E1 ✅ 80RP  │ C1 ✅ 60RP │
│  T2 🔒 150RP │  E2 🔒 150RP │ C2 🔒 100RP│
│  T3 🔒 250RP │  E3 🔒 250RP │ C3 🔒 200RP│
│  ...         │  ...          │ ...        │
└──────────────┴───────────────┴────────────┘
│               [ Buy — 150 RP ]            │
└──────────────────────────────────────────┘
```

> Selecting a node shows its name, effect description, RP cost, and a **Buy** button. The button is greyed out if the player has insufficient RP or the previous tier is not purchased.

---

## Notifications (Mobile)

Replace the desktop notification feed with **toast popups**:

- Max 1 visible at a time
- Duration: 2.5 seconds
- Slide in from bottom, above toolbar
- Tap to dismiss

```
╔═══════════════════════════════╗
║  🚂 Freight 1 completed route ║
║     +$1,000 earned            ║
╚═══════════════════════════════╝
```

---

## Orientation

- **Primary: Portrait** (thumb-reach for toolbar at bottom)
- **Landscape: Supported** (wider map, side toolbar)
- Lock to portrait for Chapter 1 (tutorial simplicity)

---

## Accessibility

| Feature | Implementation |
|---|---|
| Large text | Scale HUD text with system font size |
| Color blind | Never use color alone (use icons + labels) |
| Sound | All feedback duplicated visually |
| Reduced motion | Disable train animations if set |

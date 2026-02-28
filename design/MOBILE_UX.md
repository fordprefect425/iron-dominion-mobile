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

Keep the mobile HUD to **3–4 items max**:

| Item | Always Visible | Tap Action |
|---|---|---|
| 💰 Balance | ✅ | Opens economy details |
| 📅 Date/Speed | ✅ | Tap to cycle speed |
| 🎯 Objective | ✅ | Opens objectives sheet |
| 🔬 Research RP | Chapter 2+ | Opens tech tree |

> Remove: Income/Expenses/Net from always-visible HUD. Move to expanded economy sheet (tap balance to see).

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

// ============================================
// LEVEL DEFINITIONS — Designer-Editable Config
// ============================================
// Edit this file to add/modify levels.
// No other files need to change for level content tweaks.
//
// ─── DIFFICULTY FORMULA (Chapter 1) ─────────────────────────────────────────
//
//   All parameters are derived from a normalised difficulty index:
//
//     t = (levelIndex − 1) / 9          // 0.0 at L1 → 1.0 at L10
//
//   Map size (grows with t):
//     mapWidth(t)          = round(18 + t × 22)       // 18 → 40
//     mapHeight(t)         = round(13 + t × 17)       // 13 → 30
//
//   Time budget (evenly spaced +20 months per level):
//     timeLimitMonths(i)   = 200 + (i − 1) × 20       // 200 → 380
//
//   Starting resources (decrease gently — player is expected to build skills):
//     startingFunds(t)     = round_1k(55 000 − t × 15 000)   // $55K → $40K
//     bankruptcyThreshold  = −round_1k(13 000 − t × 3 000)   // −$13K → −$10K
//
//   Star thresholds (fraction of time limit required to earn each star):
//     3★ fraction(t)  = 0.40 − t × 0.08      // 40% → 32%
//     2★ fraction(t)  = 0.70 − t × 0.06      // 70% → 64%
//
//   City generation (tighter packing as maps grow):
//     minCityDistance = t < 0.3 → 3  |  t < 0.7 → 4  |  else → 5
//     targetCities    = max(8, round(mapArea / (minCityDistance² × 2.5)))
//
// ─── STAR RATING PHILOSOPHY ──────────────────────────────────────────────────
//   ⭐     (1 star) — Objective complete at any point before the hard time limit
//   ⭐⭐   (2 stars) — Objective complete within ~65–70% of the time limit
//   ⭐⭐⭐ (3 stars) — Objective complete within ~32–40% of the time limit
// ─────────────────────────────────────────────────────────────────────────────

export type ObjectiveType =
    | 'connect_cities'      // Connect N cities with stations + 1 running train
    | 'monthly_income'      // Achieve $X net income/month
    | 'build_stations'      // Build N stations
    | 'run_trains'          // Have N trains running simultaneously
    | 'total_revenue';      // Earn $X in cumulative total revenue

export interface StarThresholds {
    /** 3 stars: Finish within N months */
    three: { maxMonths: number; };
    /** 2 stars: Finish within N months */
    two: { maxMonths: number; };
    // 1 star: any completion before the hard time limit
}

export interface LevelDefinition {
    id: string;
    chapter: number;
    name: string;
    description: string;        // Short flavour text shown in hub
    timeLimitMonths: number;    // Hard time limit — triggers loss if exceeded
    bankruptcyThreshold: number; // Funds below this → loss
    objective: {
        type: ObjectiveType;
        target: number;         // Meaning depends on type (N cities, $X income, etc.)
        label: string;          // Human-readable text shown in the objective badge
    };
    stars: StarThresholds;
    mapSeed?: number;           // Optional fixed map seed (omit for random)
    startingFunds?: number;     // Override default $50,000 if set
    mapWidth?: number;          // Custom map width (default 40)
    mapHeight?: number;         // Custom map height (default 30)
    minCityDistance?: number;   // Override city spacing (default 5)
    targetCities?: number;      // Override max spawned cities
}

// ============================================
//   CHAPTER 1 — Valley Rails
//
//   L   t     mapW×H   timeLimit  3★    2★    sf      bt
//   ─── ───── ──────── ─────────  ───── ───── ──────  ───────
//   1   0.000  18×13     200 mo    80    140  $55 000  −$13 000
//   2   0.111  20×15     220 mo    85    155  $53 000  −$13 000
//   3   0.222  23×17     240 mo    90    165  $52 000  −$12 000
//   4   0.333  25×19     260 mo    95    175  $50 000  −$12 000
//   5   0.444  28×21     280 mo   100    190  $48 000  −$12 000
//   6   0.556  30×22     300 mo   105    200  $47 000  −$11 000
//   7   0.667  33×24     320 mo   110    210  $45 000  −$11 000
//   8   0.778  35×26     340 mo   115    220  $43 000  −$11 000
//   9   0.889  38×28     360 mo   120    235  $42 000  −$10 000
//  10   1.000  40×30     380 mo   120    245  $40 000  −$10 000
// ============================================
export const LEVELS: LevelDefinition[] = [
    // ── L1 ── t = 0.000 ──────────────────────────────────────────────────────
    {
        id: 'ch1_l1',
        chapter: 1,
        name: 'First Track',
        description: 'Learn the basics. Connect two cities and run your first train.',
        timeLimitMonths: 200,
        bankruptcyThreshold: -13000,
        mapWidth: 18,
        mapHeight: 13,
        minCityDistance: 3,
        targetCities: 10,
        startingFunds: 55000,
        objective: {
            type: 'connect_cities',
            target: 2,
            label: 'Connect 2 cities',
        },
        stars: {
            three: { maxMonths: 80 },   // 40% of 200
            two:   { maxMonths: 140 },  // 70% of 200
        },
    },

    // ── L2 ── t = 0.111 ──────────────────────────────────────────────────────
    {
        id: 'ch1_l2',
        chapter: 1,
        name: 'The Freight Run',
        description: 'Freight pays the bills. Get your monthly income above $400.',
        timeLimitMonths: 220,
        bankruptcyThreshold: -13000,
        mapWidth: 20,
        mapHeight: 15,
        minCityDistance: 3,
        targetCities: 13,
        startingFunds: 53000,
        objective: {
            type: 'monthly_income',
            target: 400,
            label: 'Earn $400/month net',
        },
        stars: {
            three: { maxMonths: 85 },   // ~39% of 220
            two:   { maxMonths: 155 },  // ~70% of 220
        },
    },

    // ── L3 ── t = 0.222 ──────────────────────────────────────────────────────
    {
        id: 'ch1_l3',
        chapter: 1,
        name: 'Station Master',
        description: 'Expand your network. Build 3 stations across the region.',
        timeLimitMonths: 240,
        bankruptcyThreshold: -12000,
        mapWidth: 23,
        mapHeight: 17,
        minCityDistance: 3,
        targetCities: 17,
        startingFunds: 52000,
        objective: {
            type: 'build_stations',
            target: 3,
            label: 'Build 3 stations',
        },
        stars: {
            three: { maxMonths: 90 },   // ~38% of 240
            two:   { maxMonths: 165 },  // ~69% of 240
        },
    },

    // ── L4 ── t = 0.333 ──────────────────────────────────────────────────────
    {
        id: 'ch1_l4',
        chapter: 1,
        name: 'Three-City Junction',
        description: 'The region is growing. Link three cities and keep costs under control.',
        timeLimitMonths: 260,
        bankruptcyThreshold: -12000,
        mapWidth: 25,
        mapHeight: 19,
        minCityDistance: 4,
        targetCities: 12,
        startingFunds: 50000,
        objective: {
            type: 'connect_cities',
            target: 3,
            label: 'Connect 3 cities',
        },
        stars: {
            three: { maxMonths: 95 },   // ~37% of 260
            two:   { maxMonths: 175 },  // ~67% of 260
        },
    },

    // ── L5 ── t = 0.444 ──────────────────────────────────────────────────────
    {
        id: 'ch1_l5',
        chapter: 1,
        name: 'Mail Express',
        description: 'Speed matters. Build a mail route and maintain a healthy income.',
        timeLimitMonths: 280,
        bankruptcyThreshold: -12000,
        mapWidth: 28,
        mapHeight: 21,
        minCityDistance: 4,
        targetCities: 15,
        startingFunds: 48000,
        objective: {
            type: 'monthly_income',
            target: 750,
            label: 'Earn $750/month net',
        },
        stars: {
            three: { maxMonths: 100 },  // ~36% of 280
            two:   { maxMonths: 190 },  // ~68% of 280
        },
    },

    // ── L6 ── t = 0.556 ──────────────────────────────────────────────────────
    {
        id: 'ch1_l6',
        chapter: 1,
        name: 'The Coach Line',
        description: 'Premium passengers await. Get two trains running simultaneously.',
        timeLimitMonths: 300,
        bankruptcyThreshold: -11000,
        mapWidth: 30,
        mapHeight: 22,
        minCityDistance: 4,
        targetCities: 17,
        startingFunds: 47000,
        objective: {
            type: 'run_trains',
            target: 2,
            label: 'Run 2 trains at once',
        },
        stars: {
            three: { maxMonths: 105 },  // ~35% of 300
            two:   { maxMonths: 200 },  // ~67% of 300
        },
    },

    // ── L7 ── t = 0.667 ──────────────────────────────────────────────────────
    {
        id: 'ch1_l7',
        chapter: 1,
        name: 'River Crossing',
        description: 'Bridge the divide. Connect four cities across a wide and varied landscape.',
        timeLimitMonths: 320,
        bankruptcyThreshold: -11000,
        mapWidth: 33,
        mapHeight: 24,
        minCityDistance: 4,
        targetCities: 20,
        startingFunds: 45000,
        objective: {
            type: 'connect_cities',
            target: 4,
            label: 'Connect 4 cities',
        },
        stars: {
            three: { maxMonths: 110 },  // ~34% of 320
            two:   { maxMonths: 210 },  // ~66% of 320
        },
    },

    // ── L8 ── t = 0.778 ──────────────────────────────────────────────────────
    {
        id: 'ch1_l8',
        chapter: 1,
        name: 'Resource Rush',
        description: 'Industrial boom. Amass $10,000 in total revenue from your routes.',
        timeLimitMonths: 340,
        bankruptcyThreshold: -11000,
        mapWidth: 35,
        mapHeight: 26,
        minCityDistance: 5,
        targetCities: 15,
        startingFunds: 43000,
        objective: {
            type: 'total_revenue',
            target: 10000,
            label: 'Earn $10,000 total revenue',
        },
        stars: {
            three: { maxMonths: 115 },  // ~34% of 340
            two:   { maxMonths: 220 },  // ~65% of 340
        },
    },

    // ── L9 ── t = 0.889 ──────────────────────────────────────────────────────
    {
        id: 'ch1_l9',
        chapter: 1,
        name: 'Rival Junction',
        description: 'Competition is fierce. Out-earn the market with a $1,500 monthly profit.',
        timeLimitMonths: 360,
        bankruptcyThreshold: -10000,
        mapWidth: 38,
        mapHeight: 28,
        minCityDistance: 5,
        targetCities: 17,
        startingFunds: 42000,
        objective: {
            type: 'monthly_income',
            target: 1500,
            label: 'Earn $1,500/month net',
        },
        stars: {
            three: { maxMonths: 120 },  // ~33% of 360
            two:   { maxMonths: 235 },  // ~65% of 360
        },
    },

    // ── L10 ── t = 1.000 ─────────────────────────────────────────────────────
    {
        id: 'ch1_l10',
        chapter: 1,
        name: 'Valley Empire',
        description: 'The grand finale. Connect five cities and build a railway empire across the full valley.',
        timeLimitMonths: 380,
        bankruptcyThreshold: -10000,
        mapWidth: 40,
        mapHeight: 30,
        minCityDistance: 5,
        targetCities: 19,
        startingFunds: 40000,
        objective: {
            type: 'connect_cities',
            target: 5,
            label: 'Connect 5 cities',
        },
        stars: {
            three: { maxMonths: 120 },  // ~32% of 380
            two:   { maxMonths: 245 },  // ~64% of 380
        },
    },
];

// ============================================
//   Lookup helpers (used by scenes)
// ============================================
export function getLevelById(id: string): LevelDefinition | undefined {
    return LEVELS.find(l => l.id === id);
}

export function getLevelsByChapter(chapter: number): LevelDefinition[] {
    return LEVELS.filter(l => l.chapter === chapter);
}

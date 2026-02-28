// ============================================
// LEVEL DEFINITIONS — Designer-Editable Config
// ============================================
// Edit this file to add/modify levels.
// No other files need to change for level content tweaks.
//
// STAR RATING PHILOSOPHY:
//   ⭐     (1 star) — Objective complete, any financial state
//   ⭐⭐   (2 stars) — Objective complete with positive funds + positive net income
//   ⭐⭐⭐ (3 stars) — Objective complete within ~33% of time limit + strong finances
// ============================================

export type ObjectiveType =
    | 'connect_cities'      // Connect N cities with stations + 1 running train
    | 'monthly_income'      // Achieve $X net income/month
    | 'build_stations'      // Build N stations
    | 'run_trains'          // Have N trains running simultaneously
    | 'total_revenue';      // Earn $X in cumulative total revenue

export interface StarThresholds {
    /** 3 stars: must hit ALL of these in addition to the objective */
    three: {
        maxMonths?: number;          // Finish within N months (~33% of time limit)
        minFunds?: number;           // Still have $X left
        minMonthlyNet?: number;      // Net income/month at time of completion
    };
    /** 2 stars: must hit ALL of these */
    two: {
        minFunds?: number;           // Still solvent
        minMonthlyNet?: number;      // Net income positive or better
    };
    // 1 star: any completion — no extra conditions
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
}

// ============================================
//   CHAPTER 1 — Valley Rails
//
//   Time limit  | 3★ maxMonths | Ratio
//   ------------|--------------|------
//   180 mo      | 60 mo        | 33%
//   240 mo      | 80 mo        | 33%
//   300 mo      | 100 mo       | 33%
//   360 mo      | 120 mo       | 33%
//   480 mo      | 160 mo       | 33%
// ============================================
export const LEVELS: LevelDefinition[] = [
    {
        id: 'ch1_l1',
        chapter: 1,
        name: 'First Track',
        description: 'Learn the basics. Connect two cities and run your first train.',
        timeLimitMonths: 180,
        bankruptcyThreshold: -5000,
        objective: {
            type: 'connect_cities',
            target: 2,
            label: 'Connect 2 cities',
        },
        stars: {
            // 3★: fast start, still well-funded, profitable
            three: { maxMonths: 60, minFunds: 15000, minMonthlyNet: 200 },
            // 2★: solvent and breaking even
            two: { minFunds: 0, minMonthlyNet: 0 },
        },
    },
    {
        id: 'ch1_l2',
        chapter: 1,
        name: 'The Freight Run',
        description: 'Freight pays the bills. Get your monthly income above $500.',
        timeLimitMonths: 240,
        bankruptcyThreshold: -5000,
        objective: {
            type: 'monthly_income',
            target: 500,
            label: 'Earn $500/month net',
        },
        stars: {
            // 3★: hit income target early, with strong surpluses
            three: { maxMonths: 80, minFunds: 10000, minMonthlyNet: 1500 },
            // 2★: profitable, any funds remaining
            two: { minFunds: 0, minMonthlyNet: 500 },
        },
    },
    {
        id: 'ch1_l3',
        chapter: 1,
        name: 'Station Master',
        description: 'Expand your network. Build stations across the region.',
        timeLimitMonths: 240,
        bankruptcyThreshold: -5000,
        objective: {
            type: 'build_stations',
            target: 3,
            label: 'Build 3 stations',
        },
        stars: {
            // 3★: built out fast while staying cash-positive
            three: { maxMonths: 80, minFunds: 8000, minMonthlyNet: 100 },
            // 2★: still have funds and not losing money
            two: { minFunds: 0, minMonthlyNet: 0 },
        },
    },
    {
        id: 'ch1_l4',
        chapter: 1,
        name: 'Mountain Bypass',
        description: 'Rugged terrain ahead. Connect cities across difficult terrain.',
        timeLimitMonths: 300,
        bankruptcyThreshold: -8000,
        objective: {
            type: 'connect_cities',
            target: 3,
            label: 'Connect 3 cities',
        },
        stars: {
            // 3★: connected 3 cities quickly, still profitable
            three: { maxMonths: 100, minFunds: 5000, minMonthlyNet: 500 },
            // 2★: any funds, not losing money each month
            two: { minFunds: 0, minMonthlyNet: 0 },
        },
    },
    {
        id: 'ch1_l5',
        chapter: 1,
        name: 'Mail Express',
        description: 'Speed matters. Build a mail route and meet your income target fast.',
        timeLimitMonths: 240,
        bankruptcyThreshold: -5000,
        objective: {
            type: 'monthly_income',
            target: 1000,
            label: 'Earn $1,000/month net',
        },
        stars: {
            // 3★: hit income target quickly with a strong surplus
            three: { maxMonths: 80, minFunds: 12000, minMonthlyNet: 2500 },
            // 2★: hit exactly $1k/mo, still solvent
            two: { minFunds: 0, minMonthlyNet: 1000 },
        },
    },
    {
        id: 'ch1_l6',
        chapter: 1,
        name: 'The Coach Line',
        description: 'Premium passengers await. Get 2 trains running simultaneously.',
        timeLimitMonths: 300,
        bankruptcyThreshold: -5000,
        objective: {
            type: 'run_trains',
            target: 2,
            label: 'Run 2 trains at once',
        },
        stars: {
            // 3★: running 2 trains early and making money
            three: { maxMonths: 100, minFunds: 15000, minMonthlyNet: 800 },
            // 2★: 2 trains running, positive net
            two: { minFunds: 0, minMonthlyNet: 0 },
        },
    },
    {
        id: 'ch1_l7',
        chapter: 1,
        name: 'River Crossing',
        description: 'Bridge the divide. Connect 4 cities across a wide map.',
        timeLimitMonths: 300,
        bankruptcyThreshold: -10000,
        objective: {
            type: 'connect_cities',
            target: 4,
            label: 'Connect 4 cities',
        },
        stars: {
            // 3★: ambitious build completed under 1/3 of time limit
            three: { maxMonths: 100, minFunds: 5000, minMonthlyNet: 1000 },
            // 2★: connected 4 cities without going bust
            two: { minFunds: 0, minMonthlyNet: 0 },
        },
    },
    {
        id: 'ch1_l8',
        chapter: 1,
        name: 'Resource Rush',
        description: 'Industrial boom. Amass $10,000 in total revenue from your routes.',
        timeLimitMonths: 360,
        bankruptcyThreshold: -8000,
        objective: {
            type: 'total_revenue',
            target: 10000,
            label: 'Earn $10,000 total revenue',
        },
        stars: {
            // 3★: hit the revenue target quickly with strong finances
            three: { maxMonths: 120, minFunds: 20000, minMonthlyNet: 1500 },
            // 2★: hit revenue, positive net income
            two: { minFunds: 0, minMonthlyNet: 200 },
        },
    },
    {
        id: 'ch1_l9',
        chapter: 1,
        name: 'Rival Junction',
        description: 'Competition is fierce. Out-earn the market with $2,000/month.',
        timeLimitMonths: 360,
        bankruptcyThreshold: -10000,
        objective: {
            type: 'monthly_income',
            target: 2000,
            label: 'Earn $2,000/month net',
        },
        stars: {
            // 3★: dominant performance — $2k/mo hit fast with large war chest
            three: { maxMonths: 120, minFunds: 30000, minMonthlyNet: 4000 },
            // 2★: hit exactly $2k/mo, some funds remaining
            two: { minFunds: 5000, minMonthlyNet: 2000 },
        },
    },
    {
        id: 'ch1_l10',
        chapter: 1,
        name: 'Valley Empire',
        description: 'The grand finale. Connect 5 cities and build a railway empire.',
        timeLimitMonths: 480,
        bankruptcyThreshold: -15000,
        objective: {
            type: 'connect_cities',
            target: 5,
            label: 'Connect 5 cities',
        },
        stars: {
            // 3★: empire built efficiently — 5 cities under 1/3 of time + empire-level income
            three: { maxMonths: 160, minFunds: 40000, minMonthlyNet: 4000 },
            // 2★: 5 cities connected, healthy balance sheet
            two: { minFunds: 10000, minMonthlyNet: 1000 },
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

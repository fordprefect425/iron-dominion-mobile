// ============================================
// LEVEL DEFINITIONS — Designer-Editable Config
// ============================================
// Edit this file to add/modify levels.
// No other files need to change for level content tweaks.
//
// STAR RATING PHILOSOPHY:
//   ⭐     (1 star) — Objective complete within time limit
//   ⭐⭐   (2 stars) — Objective complete within ~66% of time limit
//   ⭐⭐⭐ (3 stars) — Objective complete within ~33% of time limit
// ============================================

export type ObjectiveType =
    | 'connect_cities'      // Connect N cities with stations + 1 running train
    | 'monthly_income'      // Achieve $X net income/month
    | 'build_stations'      // Build N stations
    | 'run_trains'          // Have N trains running simultaneously
    | 'total_revenue';      // Earn $X in cumulative total revenue

export interface StarThresholds {
    /** 3 stars: Finish within N months (~33% of time limit) */
    three: { maxMonths: number; };
    /** 2 stars: Finish within N months (~66% of time limit) */
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
        timeLimitMonths: 240,
        bankruptcyThreshold: -15000,
        mapWidth: 20,
        mapHeight: 15,
        minCityDistance: 3,
        targetCities: 15,
        startingFunds: 70000,
        objective: {
            type: 'connect_cities',
            target: 2,
            label: 'Connect 2 cities',
        },
        stars: {
            // 3★: 60 months (~25% of 240)
            three: { maxMonths: 60 },
            // 2★: 120 months (~50% of 240)
            two: { maxMonths: 120 },
        },
    },
    {
        id: 'ch1_l2',
        chapter: 1,
        name: 'The Freight Run',
        description: 'Freight pays the bills. Get your monthly income above $500.',
        timeLimitMonths: 240,
        bankruptcyThreshold: -10000,
        mapWidth: 24,
        mapHeight: 18,
        minCityDistance: 3,
        targetCities: 15,
        startingFunds: 60000,
        objective: {
            type: 'monthly_income',
            target: 500,
            label: 'Earn $500/month net',
        },
        stars: {
            // 3★: 80 months (~33% of 240)
            three: { maxMonths: 80 },
            // 2★: 160 months (~66% of 240)
            two: { maxMonths: 160 },
        },
    },
    {
        id: 'ch1_l3',
        chapter: 1,
        name: 'Station Master',
        description: 'Expand your network. Build stations across the region.',
        timeLimitMonths: 240,
        bankruptcyThreshold: -10000,
        mapWidth: 28,
        mapHeight: 21,
        minCityDistance: 4,
        targetCities: 18,
        startingFunds: 50000,
        objective: {
            type: 'build_stations',
            target: 3,
            label: 'Build 3 stations',
        },
        stars: {
            // 3★: 80 months (~33% of 240)
            three: { maxMonths: 80 },
            // 2★: 160 months (~66% of 240)
            two: { maxMonths: 160 },
        },
    },
    {
        id: 'ch1_l4',
        chapter: 1,
        name: 'The Expanding Frontier',
        description: 'A vast, sparse landscape. Connect 4 cities without going bankrupt. Resources are highly spread out.',
        timeLimitMonths: 240,
        bankruptcyThreshold: -5000,
        mapWidth: 20,
        mapHeight: 15,
        minCityDistance: 5,
        targetCities: 18,
        startingFunds: 45000,
        objective: {
            type: 'connect_cities',
            target: 4,
            label: 'Connect 4 cities',
        },
        stars: {
            // 3★: 80 months (~33% of 240)
            three: { maxMonths: 80 },
            // 2★: 160 months (~66% of 240)
            two: { maxMonths: 160 },
        },
    },
    {
        id: 'ch1_l5',
        chapter: 1,
        name: 'Mail Express',
        description: 'Speed matters. Build a mail route and meet your income target fast.',
        timeLimitMonths: 240,
        bankruptcyThreshold: -8000,
        mapWidth: 24,
        mapHeight: 18,
        objective: {
            type: 'monthly_income',
            target: 1000,
            label: 'Earn $1,000/month net',
        },
        stars: {
            // 3★: 80 months (~33% of 240)
            three: { maxMonths: 80 },
            // 2★: 160 months (~66% of 240)
            two: { maxMonths: 160 },
        },
    },
    {
        id: 'ch1_l6',
        chapter: 1,
        name: 'The Coach Line',
        description: 'Premium passengers await. Get 2 trains running simultaneously.',
        timeLimitMonths: 300,
        bankruptcyThreshold: -8000,
        mapWidth: 28,
        mapHeight: 21,
        objective: {
            type: 'run_trains',
            target: 2,
            label: 'Run 2 trains at once',
        },
        stars: {
            // 3★: 100 months (~33% of 300)
            three: { maxMonths: 100 },
            // 2★: 200 months (~66% of 300)
            two: { maxMonths: 200 },
        },
    },
    {
        id: 'ch1_l7',
        chapter: 1,
        name: 'River Crossing',
        description: 'Bridge the divide. Connect 4 cities across a wide map.',
        timeLimitMonths: 300,
        bankruptcyThreshold: -10000,
        mapWidth: 32,
        mapHeight: 24,
        objective: {
            type: 'connect_cities',
            target: 4,
            label: 'Connect 4 cities',
        },
        stars: {
            // 3★: 100 months (~33% of 300)
            three: { maxMonths: 100 },
            // 2★: 200 months (~66% of 300)
            two: { maxMonths: 200 },
        },
    },
    {
        id: 'ch1_l8',
        chapter: 1,
        name: 'Resource Rush',
        description: 'Industrial boom. Amass $10,000 in total revenue from your routes.',
        timeLimitMonths: 360,
        bankruptcyThreshold: -8000,
        mapWidth: 36,
        mapHeight: 27,
        objective: {
            type: 'total_revenue',
            target: 10000,
            label: 'Earn $10,000 total revenue',
        },
        stars: {
            // 3★: 120 months (~33% of 360)
            three: { maxMonths: 120 },
            // 2★: 240 months (~66% of 360)
            two: { maxMonths: 240 },
        },
    },
    {
        id: 'ch1_l9',
        chapter: 1,
        name: 'Rival Junction',
        description: 'Competition is fierce. Out-earn the market with $2,000/month.',
        timeLimitMonths: 360,
        bankruptcyThreshold: -10000,
        mapWidth: 36,
        mapHeight: 27,
        objective: {
            type: 'monthly_income',
            target: 2000,
            label: 'Earn $2,000/month net',
        },
        stars: {
            // 3★: 120 months (~33% of 360)
            three: { maxMonths: 120 },
            // 2★: 240 months (~66% of 360)
            two: { maxMonths: 240 },
        },
    },
    {
        id: 'ch1_l10',
        chapter: 1,
        name: 'Valley Empire',
        description: 'The grand finale. Connect 5 cities and build a railway empire.',
        timeLimitMonths: 480,
        bankruptcyThreshold: -15000,
        mapWidth: 40,
        mapHeight: 30,
        objective: {
            type: 'connect_cities',
            target: 5,
            label: 'Connect 5 cities',
        },
        stars: {
            // 3★: 160 months (~33% of 480)
            three: { maxMonths: 160 },
            // 2★: 320 months (~66% of 480)
            two: { maxMonths: 320 },
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

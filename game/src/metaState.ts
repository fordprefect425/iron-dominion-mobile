// ============================================
// META STATE — Persistent RP & Upgrades
// Saved to localStorage; survives page refreshes
// ============================================

const META_STORAGE_KEY = 'iron-dominion-mobile-meta';

export interface MetaState {
    researchPoints: number;
    purchasedUpgrades: string[];   // array so it survives JSON round-trip
    levelStars: Record<string, 0 | 1 | 2 | 3>;  // key = "ch1_l1"
    careerLevelsComplete: number;
}

export function createMetaState(): MetaState {
    return {
        researchPoints: 0,
        purchasedUpgrades: [],
        levelStars: {},
        careerLevelsComplete: 0,
    };
}

export function loadMeta(): MetaState {
    try {
        const raw = localStorage.getItem(META_STORAGE_KEY);
        if (!raw) return createMetaState();
        const parsed = JSON.parse(raw) as MetaState;
        // Safety: ensure arrays exist
        if (!Array.isArray(parsed.purchasedUpgrades)) parsed.purchasedUpgrades = [];
        if (!parsed.levelStars) parsed.levelStars = {};
        return parsed;
    } catch {
        return createMetaState();
    }
}

export function saveMeta(meta: MetaState): void {
    try {
        localStorage.setItem(META_STORAGE_KEY, JSON.stringify(meta));
    } catch {
        // Storage unavailable — fail silently
    }
}

export function resetMeta(): void {
    localStorage.removeItem(META_STORAGE_KEY);
}

// RP reward per star, scaled by chapter multiplier
const RP_BASE: Record<1 | 2 | 3, number> = { 1: 40, 2: 70, 3: 100 };
const CHAPTER_MULTIPLIER: Record<number, number> = { 1: 1, 2: 1.5, 3: 2, 4: 2.5, 5: 3 };

export function computeRPReward(stars: 1 | 2 | 3, chapter: number): number {
    const mult = CHAPTER_MULTIPLIER[chapter] ?? 1;
    return Math.round(RP_BASE[stars] * mult);
}

export function awardLevelRP(
    meta: MetaState,
    levelId: string,
    stars: 1 | 2 | 3,
    chapter: number
): number {
    const previousBest = (meta.levelStars[levelId] ?? 0) as 0 | 1 | 2 | 3;
    const rp = computeRPReward(stars, chapter);

    // Only award RP for improvement beyond previous best
    const prevRP = previousBest > 0 ? computeRPReward(previousBest as 1 | 2 | 3, chapter) : 0;
    const rpDelta = Math.max(0, rp - prevRP);

    meta.researchPoints += rpDelta;
    meta.levelStars[levelId] = Math.max(previousBest, stars) as 0 | 1 | 2 | 3;

    if (stars > previousBest) {
        meta.careerLevelsComplete = Object.keys(meta.levelStars).filter(k => meta.levelStars[k] > 0).length;
    }

    saveMeta(meta);
    return rpDelta;
}

export function purchaseUpgrade(meta: MetaState, upgradeId: string, cost: number): boolean {
    if (meta.researchPoints < cost) return false;
    if (meta.purchasedUpgrades.includes(upgradeId)) return false;

    meta.researchPoints -= cost;
    meta.purchasedUpgrades.push(upgradeId);
    saveMeta(meta);
    return true;
}

export function hasUpgrade(meta: MetaState, upgradeId: string): boolean {
    return meta.purchasedUpgrades.includes(upgradeId);
}

export function getCareerRank(meta: MetaState): { title: string; badge: string; emoji: string } {
    const levels = meta.careerLevelsComplete;
    const stars = (Object.values(meta.levelStars) as number[]).reduce((a, b) => a + b, 0);

    if (levels >= 60 && stars >= 150) return { title: 'Railway Tycoon', badge: 'Platinum', emoji: '👑' };
    if (levels >= 40 && stars >= 100) return { title: 'Regional Director', badge: 'Gold', emoji: '🏛️' };
    if (levels >= 25 && stars >= 50) return { title: 'Railway Manager', badge: 'Silver', emoji: '🏭' };
    if (levels >= 10) return { title: 'Track Foreman', badge: 'Bronze', emoji: '🚂' };
    return { title: 'Station Apprentice', badge: 'Grey', emoji: '🔧' };
}

// ============================================
// UPGRADE TREE — Meta-game persistent upgrades
// 3 branches: Tracks, Engines, Carriages
// Purchased with RP in the Upgrade Hub (between levels)
// ============================================

import type { MetaState } from './metaState';
import { hasUpgrade } from './metaState';

export type UpgradeBranch = 'tracks' | 'engines' | 'carriages';

export interface UpgradeNode {
    id: string;
    branch: UpgradeBranch;
    tier: number;         // 1–5, must buy previous tier first
    name: string;
    icon: string;
    description: string;
    effect: string;       // human-readable effect
    cost: number;         // RP cost
    prerequisiteId: string | null; // null for tier 1
}

export const UPGRADE_TREE: UpgradeNode[] = [
    // ========== TRACKS BRANCH ==========
    {
        id: 'track_t1',
        branch: 'tracks',
        tier: 1,
        name: 'Steel Rails',
        icon: '🛤️',
        description: 'Higher-grade steel reduces track laying costs across all terrain.',
        effect: 'Track build cost –10%',
        cost: 80,
        prerequisiteId: null,
    },
    {
        id: 'track_t2',
        branch: 'tracks',
        tier: 2,
        name: 'Graded Earthworks',
        icon: '⛏️',
        description: 'Better surveying and earthmoving cuts mountain and wetland costs.',
        effect: 'Mountain & wetland build cost –20% additional',
        cost: 150,
        prerequisiteId: 'track_t1',
    },
    {
        id: 'track_t3',
        branch: 'tracks',
        tier: 3,
        name: 'Iron Bridge',
        icon: '🌉',
        description: 'Pre-fabricated iron bridge sections slash river crossing costs.',
        effect: 'River crossing cost –30%',
        cost: 250,
        prerequisiteId: 'track_t2',
    },
    {
        id: 'track_t4',
        branch: 'tracks',
        tier: 4,
        name: 'Signal Network',
        icon: '🚦',
        description: 'Automated signaling allows trains to run at higher safe speeds.',
        effect: 'All train speeds +15%',
        cost: 400,
        prerequisiteId: 'track_t3',
    },
    {
        id: 'track_t5',
        branch: 'tracks',
        tier: 5,
        name: 'Hi-Speed Rail',
        icon: '⚡',
        description: 'Precision civil engineering enables dedicated high-speed corridors.',
        effect: 'All train speeds +10% additional (cumulative with T4)',
        cost: 600,
        prerequisiteId: 'track_t4',
    },

    // ========== ENGINES BRANCH ==========
    {
        id: 'engine_t1',
        branch: 'engines',
        tier: 1,
        name: 'Boiler Efficiency',
        icon: '🔥',
        description: 'Improved boiler insulation cuts steam engine running costs.',
        effect: 'All train maintenance –15%',
        cost: 80,
        prerequisiteId: null,
    },
    {
        id: 'engine_t2',
        branch: 'engines',
        tier: 2,
        name: 'Faster Piston',
        icon: '⚙️',
        description: 'Lighter piston assemblies raise steam train top speeds.',
        effect: 'All train speeds +10%',
        cost: 150,
        prerequisiteId: 'engine_t1',
    },
    {
        id: 'engine_t3',
        branch: 'engines',
        tier: 3,
        name: 'Dual Drive',
        icon: '🔩',
        description: 'Dual-bogie drive systems improve traction on all locomotive types.',
        effect: 'All train speeds +10% additional',
        cost: 250,
        prerequisiteId: 'engine_t2',
    },
    {
        id: 'engine_t4',
        branch: 'engines',
        tier: 4,
        name: 'Diesel Conversion',
        icon: '⛽',
        description: 'Factory-fitted diesel retrofit kits reduce diesel train purchase costs.',
        effect: 'Diesel & mixed train purchase cost –20%',
        cost: 400,
        prerequisiteId: 'engine_t3',
    },
    {
        id: 'engine_t5',
        branch: 'engines',
        tier: 5,
        name: 'Turbo Diesel',
        icon: '🚀',
        description: 'Turbocharged diesel engines dramatically increase freight revenue.',
        effect: 'Mixed & luxury train revenue +25%',
        cost: 600,
        prerequisiteId: 'engine_t4',
    },

    // ========== CARRIAGES BRANCH ==========
    {
        id: 'carriage_t1',
        branch: 'carriages',
        tier: 1,
        name: 'Padding Upgrade',
        icon: '🛋️',
        description: 'Improved passenger seats command a premium fare.',
        effect: 'Passenger train revenue +10%',
        cost: 60,
        prerequisiteId: null,
    },
    {
        id: 'carriage_t2',
        branch: 'carriages',
        tier: 2,
        name: 'Mail Sorting Car',
        icon: '📮',
        description: 'On-board sorting vans increase mail train throughput.',
        effect: 'Mail train capacity +20%',
        cost: 100,
        prerequisiteId: 'carriage_t1',
    },
    {
        id: 'carriage_t3',
        branch: 'carriages',
        tier: 3,
        name: 'Dining Car',
        icon: '🍽️',
        description: 'First-class dining cars make luxury trains extremely profitable.',
        effect: 'Luxury train revenue +30%',
        cost: 200,
        prerequisiteId: 'carriage_t2',
    },
    {
        id: 'carriage_t4',
        branch: 'carriages',
        tier: 4,
        name: 'Freight Expansion',
        icon: '📦',
        description: 'Extended freight wagons carry more cargo per trip.',
        effect: 'Freight train capacity +25%',
        cost: 350,
        prerequisiteId: 'carriage_t3',
    },
    {
        id: 'carriage_t5',
        branch: 'carriages',
        tier: 5,
        name: 'Maglev Pod',
        icon: '🧲',
        description: 'Next-gen maglev passenger pods redefine revenue potential.',
        effect: 'Bullet & hyperloop train revenue +30%',
        cost: 600,
        prerequisiteId: 'carriage_t4',
    },
];

export function getUpgradesByBranch(branch: UpgradeBranch): UpgradeNode[] {
    return UPGRADE_TREE.filter(u => u.branch === branch).sort((a, b) => a.tier - b.tier);
}

export function canPurchaseUpgrade(meta: MetaState, upgradeId: string): { ok: boolean; reason?: string } {
    const node = UPGRADE_TREE.find(u => u.id === upgradeId);
    if (!node) return { ok: false, reason: 'Unknown upgrade' };
    if (hasUpgrade(meta, upgradeId)) return { ok: false, reason: 'Already purchased' };
    if (node.prerequisiteId && !hasUpgrade(meta, node.prerequisiteId)) {
        const pre = UPGRADE_TREE.find(u => u.id === node.prerequisiteId);
        return { ok: false, reason: `Requires: ${pre?.name ?? node.prerequisiteId}` };
    }
    if (meta.researchPoints < node.cost) {
        return { ok: false, reason: `Need ${node.cost} RP (have ${Math.floor(meta.researchPoints)})` };
    }
    return { ok: true };
}

// ============ Bonus Getters (applied at level start) ============

export interface UpgradeBonuses {
    trackCostMult: number;        // e.g. 0.9 = 10% cheaper
    mountainCostMult: number;
    riverCostMult: number;
    trainSpeedMult: number;       // e.g. 1.1 = 10% faster
    maintenanceMult: number;      // e.g. 0.85 = 15% cheaper
    passengerRevenueMult: number;
    mailCapacityMult: number;
    luxuryRevenueMult: number;
    freightCapacityMult: number;
    maglevRevenueMult: number;
    dieselCostMult: number;
    dieselRevenueMult: number;
}

export function computeUpgradeBonuses(meta: MetaState): UpgradeBonuses {
    const bonuses: UpgradeBonuses = {
        trackCostMult: 1,
        mountainCostMult: 1,
        riverCostMult: 1,
        trainSpeedMult: 1,
        maintenanceMult: 1,
        passengerRevenueMult: 1,
        mailCapacityMult: 1,
        luxuryRevenueMult: 1,
        freightCapacityMult: 1,
        maglevRevenueMult: 1,
        dieselCostMult: 1,
        dieselRevenueMult: 1,
    };

    if (hasUpgrade(meta, 'track_t1')) bonuses.trackCostMult *= 0.90;
    if (hasUpgrade(meta, 'track_t2')) bonuses.mountainCostMult *= 0.80;
    if (hasUpgrade(meta, 'track_t3')) bonuses.riverCostMult *= 0.70;
    if (hasUpgrade(meta, 'track_t4')) bonuses.trainSpeedMult *= 1.15;
    if (hasUpgrade(meta, 'track_t5')) bonuses.trainSpeedMult *= 1.10;

    if (hasUpgrade(meta, 'engine_t1')) bonuses.maintenanceMult *= 0.85;
    if (hasUpgrade(meta, 'engine_t2')) bonuses.trainSpeedMult *= 1.10;
    if (hasUpgrade(meta, 'engine_t3')) bonuses.trainSpeedMult *= 1.10;
    if (hasUpgrade(meta, 'engine_t4')) bonuses.dieselCostMult *= 0.80;
    if (hasUpgrade(meta, 'engine_t5')) bonuses.dieselRevenueMult *= 1.25;

    if (hasUpgrade(meta, 'carriage_t1')) bonuses.passengerRevenueMult *= 1.10;
    if (hasUpgrade(meta, 'carriage_t2')) bonuses.mailCapacityMult *= 1.20;
    if (hasUpgrade(meta, 'carriage_t3')) bonuses.luxuryRevenueMult *= 1.30;
    if (hasUpgrade(meta, 'carriage_t4')) bonuses.freightCapacityMult *= 1.25;
    if (hasUpgrade(meta, 'carriage_t5')) bonuses.maglevRevenueMult *= 1.30;

    return bonuses;
}

// ============================================
// UNIFIED UPGRADE TREE — Single progression system
// 3 branches: Locomotives, Infrastructure, Rolling Stock
// All purchased with RP in the Upgrade Hub (between levels)
// Historically grounded — based on Research.md
// ============================================

import type { MetaState } from './metaState';
import { hasUpgrade } from './metaState';

export type UpgradeBranch = 'infrastructure' | 'rolling_stock';

export interface UpgradeNode {
    id: string;
    branch: UpgradeBranch;
    tier: number;         // 1–5, must buy previous tier first
    name: string;
    icon: string;
    description: string;
    effect: string;       // human-readable effect
    historicalFact: string;
    yearIntroduced: number;
    cost: number;         // RP cost
    prerequisiteId: string | null; // null for tier 1
    unlocksTrainType?: string;     // e.g. 'passenger', 'luxury'
}

export const UPGRADE_TREE: UpgradeNode[] = [
    // ========== 🛤️ INFRASTRUCTURE BRANCH — Track & signalling ==========
    {
        id: 'infra_t1',
        branch: 'infrastructure',
        tier: 1,
        name: 'Steel Rails',
        icon: '🛤️',
        description: 'Higher-grade steel replaces brittle iron, enabling heavier and faster trains without catastrophic fracture.',
        effect: 'Track build cost –10%',
        historicalFact: 'Early railways used cast iron rails that cracked frequently. The shift to steel in the late 19th century was essential for sustained increases in axle loads and speed.',
        yearIntroduced: 1860,
        cost: 80,
        prerequisiteId: null,
    },
    {
        id: 'infra_t2',
        branch: 'infrastructure',
        tier: 2,
        name: 'Graded Earthworks',
        icon: '⛏️',
        description: 'Better surveying and earthmoving techniques cut construction costs on difficult terrain.',
        effect: 'Mountain & wetland build cost –20%',
        historicalFact: 'Victorian railway engineers like Brunel and Stephenson moved mountains of earth by hand. The Great Western Railway alone required cutting through hills and bridging valleys for over 100 miles.',
        yearIntroduced: 1840,
        cost: 200,
        prerequisiteId: 'infra_t1',
    },
    {
        id: 'infra_t3',
        branch: 'infrastructure',
        tier: 3,
        name: 'Iron Bridge',
        icon: '🌉',
        description: 'Pre-fabricated iron bridge sections dramatically reduce river crossing costs and construction time.',
        effect: 'River crossing cost –30%',
        historicalFact: 'Robert Stephenson\'s Britannia Bridge (1850) over the Menai Strait used revolutionary tubular iron construction. Each span weighed 1,500 tons and was floated into position.',
        yearIntroduced: 1850,
        cost: 350,
        prerequisiteId: 'infra_t2',
    },
    {
        id: 'infra_t4',
        branch: 'infrastructure',
        tier: 4,
        name: 'Block Signalling',
        icon: '🚦',
        description: 'Automated track circuits and interlocking allow trains to run at higher safe speeds with less risk of collision.',
        effect: 'All train speeds +15%',
        historicalFact: 'The closed track circuit was invented in 1872, enabling automatic detection of trains in track sections. Combined with interlocking (patented 1856), it made safe high-speed operations possible.',
        yearIntroduced: 1872,
        cost: 500,
        prerequisiteId: 'infra_t3',
    },
    {
        id: 'infra_t5',
        branch: 'infrastructure',
        tier: 5,
        name: 'ETCS Digital Control',
        icon: '📡',
        description: 'Digital train control with continuous cab supervision. Radio-based authority replaces lineside signals.',
        effect: 'Revenue +20%',
        historicalFact: 'ETCS (European Train Control System) transmits speed profiles and movement authority directly to the cab via radio. At Level 2, lineside signals become optional — capacity jumps 30%.',
        yearIntroduced: 1996,
        cost: 800,
        prerequisiteId: 'infra_t4',
    },

    // ========== 🚃 ROLLING STOCK BRANCH — Service types & revenue ==========
    {
        id: 'stock_t1',
        branch: 'rolling_stock',
        tier: 1,
        name: 'Padded Coaches',
        icon: '🛋️',
        description: 'Improved passenger seats and enclosed compartments command a premium fare.',
        effect: 'Passenger train revenue +10%',
        historicalFact: 'Early railway coaches were literally stagecoach bodies mounted on rail frames. First-class passengers sat in enclosed compartments; third-class rode in open wagons exposed to the weather.',
        yearIntroduced: 1840,
        cost: 80,
        prerequisiteId: null,
    },
    {
        id: 'stock_t2',
        branch: 'rolling_stock',
        tier: 2,
        name: 'Mail Sorting Van',
        icon: '📮',
        description: 'On-board sorting vans allow mail to be processed during transit, increasing throughput.',
        effect: 'Mail train capacity +20%',
        historicalFact: 'The Travelling Post Office (TPO) sorted mail at high speed. Specially designed apparatus could pick up and drop off mailbags without stopping — the ultimate efficiency trick.',
        yearIntroduced: 1838,
        cost: 200,
        prerequisiteId: 'stock_t1',
    },
    {
        id: 'stock_t3',
        branch: 'rolling_stock',
        tier: 3,
        name: 'Orient Express Dining',
        icon: '🍽️',
        description: 'First-class dining and sleeping cars with vestibule gangways. Luxury rail travel at its finest.',
        effect: 'Unlocks Luxury trains',
        historicalFact: 'The Orient Express (1883) set the standard for luxury rail. The Pullman vestibule (patented 1887) enabled safe movement between cars and prevented telescoping in crashes — comfort AND safety.',
        yearIntroduced: 1883,
        cost: 350,
        prerequisiteId: 'stock_t2',
        unlocksTrainType: 'luxury',
    },
    {
        id: 'stock_t4',
        branch: 'rolling_stock',
        tier: 4,
        name: 'Metropolitan Carriages',
        icon: '🏙️',
        description: 'Dense urban rail carriages for daily commuters. High capacity, frequent stops, compact design.',
        effect: 'Unlocks Commuter trains',
        historicalFact: 'The Metropolitan Railway (1863) was the world\'s first underground railway. Its A Class locomotives used condensers to reduce tunnel steam — the template for every metro system that followed.',
        yearIntroduced: 1863,
        cost: 500,
        prerequisiteId: 'stock_t3',
        unlocksTrainType: 'commuter',
    },
    {
        id: 'stock_t5',
        branch: 'rolling_stock',
        tier: 5,
        name: 'Maglev Pod',
        icon: '🧲',
        description: 'Next-gen magnetic levitation pods eliminate friction entirely. The future of ultra-high-speed rail.',
        effect: 'Unlocks Bullet & Hyperloop trains, +30% revenue',
        historicalFact: 'The N700S Shinkansen (2020) uses silicon-carbide power electronics — a world first for high-speed rail. JR Central\'s network has carried over 10 billion passengers with zero fatal derailments.',
        yearIntroduced: 2020,
        cost: 800,
        prerequisiteId: 'stock_t4',
        unlocksTrainType: 'bullet', // also unlocks hyperloop (handled in code)
    },
];

// ============ Query helpers ============

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

// ============ Train type unlocking from meta state ============

export function getUnlockedTrainTypesFromMeta(meta: MetaState): string[] {
    // Train types are now determined by which locomotive templates you own
    const types = new Set<string>();
    for (const loco of meta.ownedLocomotives) {
        // Import-free: map templateId → trainType directly
        const typeMap: Record<string, string> = {
            rocket: 'freight', patentee: 'passenger', american_440: 'mail',
            zephyr: 'mixed', orient_express: 'luxury', bb_9004: 'express',
            metropolitan_a: 'commuter', ice_1: 'bullet', n700s: 'hyperloop',
        };
        const tt = typeMap[loco.templateId];
        if (tt) types.add(tt);
    }
    // Rolling Stock branch still unlocks luxury/commuter/bullet+hyperloop
    for (const node of UPGRADE_TREE) {
        if (!node.unlocksTrainType) continue;
        if (hasUpgrade(meta, node.id)) {
            types.add(node.unlocksTrainType);
            if (node.id === 'stock_t5') types.add('hyperloop');
        }
    }
    // Freight always available
    types.add('freight');
    return Array.from(types);
}

// ============ Bonus Getters (applied at level start) ============

export interface UpgradeBonuses {
    trackCostMult: number;        // e.g. 0.9 = 10% cheaper
    mountainCostMult: number;
    riverCostMult: number;
    trainSpeedMult: number;       // e.g. 1.15 = 15% faster
    maintenanceMult: number;      // e.g. 0.85 = 15% cheaper
    passengerRevenueMult: number;
    mailCapacityMult: number;
    luxuryRevenueMult: number;
    freightCapacityMult: number;
    maglevRevenueMult: number;
    dieselCostMult: number;
    dieselRevenueMult: number;
    revenueMult: number;          // general revenue multiplier from ETCS
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
        revenueMult: 1,
    };

    // Infrastructure branch
    if (hasUpgrade(meta, 'infra_t1')) bonuses.trackCostMult *= 0.90;
    if (hasUpgrade(meta, 'infra_t2')) bonuses.mountainCostMult *= 0.80;
    if (hasUpgrade(meta, 'infra_t3')) bonuses.riverCostMult *= 0.70;
    if (hasUpgrade(meta, 'infra_t4')) bonuses.trainSpeedMult *= 1.15;
    if (hasUpgrade(meta, 'infra_t5')) bonuses.revenueMult *= 1.20;

    // Rolling Stock branch (stat bonuses from tiers without train unlocks)
    if (hasUpgrade(meta, 'stock_t1')) bonuses.passengerRevenueMult *= 1.10;
    if (hasUpgrade(meta, 'stock_t2')) bonuses.mailCapacityMult *= 1.20;
    // stock_t3 (Orient Express) unlocks luxury — no additional stat
    // stock_t4 (Metropolitan) unlocks commuter — no additional stat
    if (hasUpgrade(meta, 'stock_t5')) bonuses.maglevRevenueMult *= 1.30;

    return bonuses;
}

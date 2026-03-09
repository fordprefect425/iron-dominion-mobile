// ============================================
// LOCOMOTIVE TEMPLATES & OWNED LOCOMOTIVES
// Persistent collectible engines purchased with RP
// ============================================

import type { Train } from './gameState';

// ============ Locomotive Template ============
// A class of engine — defines base stats. Players buy instances of these.

export interface LocomotiveTemplate {
    id: string;
    name: string;
    icon: string;
    trainType: Train['type'];   // maps to existing train type for gameplay
    rpCost: number;             // RP to purchase one instance
    baseSpeed: number;
    baseCapacity: number;
    baseMaintenance: number;
    color: number;              // hex color for rendering
    description: string;
    historicalFact: string;
    yearIntroduced: number;
}

// ============ Owned Locomotive ============
// A specific instance the player owns, persists across levels.

export interface OwnedLocomotive {
    instanceId: number;
    templateId: string;
    name: string;               // e.g. "Rocket #1"
    level: 1 | 2 | 3;          // ★ / ★★ / ★★★
}

// ============ Upgrade Constants ============

const LEVEL_SPEED_MULT: Record<number, number> = { 1: 1.00, 2: 1.20, 3: 1.45 };
const LEVEL_CAPACITY_MULT: Record<number, number> = { 1: 1.00, 2: 1.15, 3: 1.35 };
const LEVEL_MAINT_MULT: Record<number, number> = { 1: 1.00, 2: 0.90, 3: 0.80 };

// Upgrade cost as fraction of purchase RP
const UPGRADE_COST_FRACTION: Record<number, number> = { 2: 0.5, 3: 1.0 };

// Purchase price (gold) to deploy a new instance of this locomotive in a level
export const DEPLOY_COST_MAP: Record<Train['type'], number> = {
    freight: 5000,
    passenger: 8000,
    mail: 4000,
    mixed: 6000,
    luxury: 12000,
    express: 15000,
    commuter: 10000,
    bullet: 25000,
    hyperloop: 50000,
};

// ============ 9 Templates ============

export const LOCO_TEMPLATES: LocomotiveTemplate[] = [
    {
        id: 'rocket',
        name: "Stephenson's Rocket",
        icon: '🚂',
        trainType: 'freight',
        rpCost: 50,
        baseSpeed: 0.15,
        baseCapacity: 100,
        baseMaintenance: 50,
        color: 0x8B6914,
        description: 'The Rainhill Trials winner (1829). Multi-tubular boiler established the template for all steam locomotives.',
        historicalFact: 'Built by Robert Stephenson & Co., Rocket won the 1829 Rainhill Trials and proved steam traction was viable for mainline railways.',
        yearIntroduced: 1829,
    },
    {
        id: 'patentee',
        name: 'Patentee 2-2-2',
        icon: '🧳',
        trainType: 'passenger',
        rpCost: 80,
        baseSpeed: 0.25,
        baseCapacity: 60,
        baseMaintenance: 80,
        color: 0x4A6FA5,
        description: 'The first widely exported passenger locomotive (1833). Stable and fast enough for scheduled service.',
        historicalFact: 'Germany\'s first locomotive "Adler" (1835) was based on the Patentee pattern. The design became a de facto European standard.',
        yearIntroduced: 1833,
    },
    {
        id: 'american_440',
        name: '4-4-0 "American"',
        icon: '📮',
        trainType: 'mail',
        rpCost: 80,
        baseSpeed: 0.30,
        baseCapacity: 40,
        baseMaintenance: 40,
        color: 0xB44A3E,
        description: 'The iconic American Standard (1855). Fast, reliable, versatile — perfect for mail and general service.',
        historicalFact: 'The General (1855) is preserved at the Southern Museum. The 4-4-0 was so ubiquitous it was simply called "the American type."',
        yearIntroduced: 1855,
    },
    {
        id: 'zephyr',
        name: 'Pioneer Zephyr',
        icon: '⛽',
        trainType: 'mixed',
        rpCost: 120,
        baseSpeed: 0.20,
        baseCapacity: 70,
        baseMaintenance: 65,
        color: 0x7A7D85,
        description: 'Stainless-steel diesel streamliner (1934). Proved internal combustion could replace steam for mainline rail.',
        historicalFact: 'The Pioneer Zephyr\'s 1934 dawn-to-dusk Denver-to-Chicago run (1,015 miles non-stop) is an ASME landmark.',
        yearIntroduced: 1934,
    },
    {
        id: 'orient_express',
        name: 'Orient Express',
        icon: '👑',
        trainType: 'luxury',
        rpCost: 200,
        baseSpeed: 0.20,
        baseCapacity: 30,
        baseMaintenance: 120,
        color: 0xD4A843,
        description: 'First-class dining and sleeping cars (1883). The pinnacle of luxury rail travel.',
        historicalFact: 'The Orient Express pioneered luxury rail. Pullman vestibule coaches (1887) enabled safe movement between cars — comfort AND safety.',
        yearIntroduced: 1883,
    },
    {
        id: 'bb_9004',
        name: 'BB 9004 Electric',
        icon: '⚡',
        trainType: 'express',
        rpCost: 250,
        baseSpeed: 0.40,
        baseCapacity: 80,
        baseMaintenance: 150,
        color: 0x2E86C1,
        description: 'French electric speed record holder (1955). 331 km/h proved electric traction could support extreme speeds.',
        historicalFact: 'BB 9004 and CC 7107 both reached 331 km/h in March 1955, directly informing the later TGV programme.',
        yearIntroduced: 1955,
    },
    {
        id: 'metropolitan_a',
        name: 'Metropolitan A Class',
        icon: '🏙️',
        trainType: 'commuter',
        rpCost: 200,
        baseSpeed: 0.35,
        baseCapacity: 120,
        baseMaintenance: 100,
        color: 0x27AE60,
        description: 'First underground railway traction (1864). High capacity commuter service for dense urban networks.',
        historicalFact: 'The Metropolitan Railway (1863) was the world\'s first underground railway. Its template is followed by every metro system today.',
        yearIntroduced: 1864,
    },
    {
        id: 'ice_1',
        name: 'ICE 1 High-Speed',
        icon: '🧲',
        trainType: 'bullet',
        rpCost: 400,
        baseSpeed: 0.55,
        baseCapacity: 90,
        baseMaintenance: 200,
        color: 0xE74C3C,
        description: 'Germany\'s 280 km/h flagship trainset (1991). Premium comfort with 9.6 MW of power.',
        historicalFact: 'ICE 1 set a new benchmark for passenger comfort in 1991 that became an explicit design specification for high-speed rail worldwide.',
        yearIntroduced: 1991,
    },
    {
        id: 'n700s',
        name: 'N700S Shinkansen',
        icon: '🚀',
        trainType: 'hyperloop',
        rpCost: 600,
        baseSpeed: 0.80,
        baseCapacity: 50,
        baseMaintenance: 350,
        color: 0x9B59B6,
        description: 'The cutting edge of high-speed rail (2020). SiC power electronics — a world first.',
        historicalFact: 'JR Central\'s Shinkansen network has carried over 10 billion passengers with zero fatal derailments.',
        yearIntroduced: 2020,
    },
];

// ============ Helper Functions ============

export function getTemplate(templateId: string): LocomotiveTemplate | undefined {
    return LOCO_TEMPLATES.find(t => t.id === templateId);
}

/**
 * Compute effective stats for an owned locomotive at its current level.
 */
export function getLocoStats(owned: OwnedLocomotive): { speed: number; capacity: number; maintenance: number; color: number; trainType: Train['type'] } {
    const tmpl = getTemplate(owned.templateId);
    if (!tmpl) {
        return { speed: 0.15, capacity: 50, maintenance: 50, color: 0x888888, trainType: 'freight' };
    }
    return {
        speed: tmpl.baseSpeed * LEVEL_SPEED_MULT[owned.level],
        capacity: Math.round(tmpl.baseCapacity * LEVEL_CAPACITY_MULT[owned.level]),
        maintenance: Math.round(tmpl.baseMaintenance * LEVEL_MAINT_MULT[owned.level]),
        color: tmpl.color,
        trainType: tmpl.trainType,
    };
}

/**
 * RP cost to upgrade a locomotive from currentLevel to currentLevel+1.
 * Returns 0 if already max level.
 */
export function getUpgradeCost(templateId: string, currentLevel: number): number {
    if (currentLevel >= 3) return 0;
    const tmpl = getTemplate(templateId);
    if (!tmpl) return 0;
    const nextLevel = currentLevel + 1;
    return Math.round(tmpl.rpCost * (UPGRADE_COST_FRACTION[nextLevel] ?? 0));
}

/**
 * Get star string for display: ★, ★★, ★★★
 */
export function getStarDisplay(level: number): string {
    return '★'.repeat(level);
}

/**
 * Get the operating fee (gold) to deploy a locomotive of a given type.
 */
export function getDeployCost(trainType: Train['type']): number {
    return DEPLOY_COST_MAP[trainType] ?? 5000;
}

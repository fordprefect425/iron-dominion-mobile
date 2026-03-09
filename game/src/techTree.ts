// ============================================
// TECH TREE & RESEARCH SYSTEM
// Historically grounded locomotive progression
// ============================================

export interface Technology {
    id: string;
    name: string;
    icon: string;
    era: 'steam' | 'diesel' | 'electric' | 'maglev';
    cost: number; // research points to unlock
    prerequisites: string[];
    description: string;
    historicalFact: string; // educational blurb from real railway history
    yearIntroduced: number; // real-world year
    effects: TechEffect[];
}

export interface TechEffect {
    type: 'unlock_train' | 'speed_bonus' | 'capacity_bonus' | 'maintenance_reduction' | 'revenue_bonus' | 'unlock_track';
    value: string | number; // train type name or percentage
}

export interface ResearchState {
    points: number;
    pointsPerMonth: number;
    unlocked: Set<string>;
    currentResearch: string | null;
    progress: number; // 0-1 for current research
}

export function createResearchState(): ResearchState {
    return {
        points: 0,
        pointsPerMonth: 0,
        unlocked: new Set(['stephensons_rocket']), // start with basic tech
        currentResearch: null,
        progress: 0,
    };
}

// ============ TECH DEFINITIONS ============
// Based on Research.md — decade-by-decade global locomotive evolution

export const TECH_TREE: Technology[] = [
    // === STEAM ERA (1829–1900) ===
    {
        id: 'stephensons_rocket',
        name: "Stephenson's Rocket",
        icon: '🚂',
        era: 'steam',
        cost: 0,
        prerequisites: [],
        description: 'The Rainhill Trials winner (1829). Multi-tubular boiler and blastpipe draughting established the template for all steam locomotives.',
        historicalFact: 'Built by Robert Stephenson & Co., Rocket won the 1829 Rainhill Trials and is preserved in the Science Museum, London. It proved steam traction was viable for mainline railways.',
        yearIntroduced: 1829,
        effects: [{ type: 'unlock_train', value: 'freight' }],
    },
    {
        id: 'patentee_express',
        name: 'Patentee 2-2-2',
        icon: '🧳',
        era: 'steam',
        cost: 500,
        prerequisites: ['stephensons_rocket'],
        description: 'The first widely exported passenger locomotive type (1833). Its 2-2-2 wheel arrangement provided stability for faster speeds.',
        historicalFact: 'The Patentee design was exported across Europe, becoming a de facto standard template. Germany\'s first locomotive "Adler" (1835) was based on this British pattern.',
        yearIntroduced: 1833,
        effects: [{ type: 'unlock_train', value: 'passenger' }],
    },
    {
        id: 'american_440',
        name: '4-4-0 "American"',
        icon: '📮',
        era: 'steam',
        cost: 400,
        prerequisites: ['stephensons_rocket'],
        description: 'The iconic American Standard type (1855). Fast, reliable, and versatile — perfect for mail and general service across a continent.',
        historicalFact: 'The General, built in 1855 by Rogers, Ketchum & Grosvenor, is preserved at the Southern Museum. The 4-4-0 became so ubiquitous it was simply called "the American type."',
        yearIntroduced: 1855,
        effects: [{ type: 'unlock_train', value: 'mail' }],
    },
    {
        id: 'consolidation_280',
        name: 'Consolidation 2-8-0',
        icon: '🔩',
        era: 'steam',
        cost: 600,
        prerequisites: ['stephensons_rocket'],
        description: 'The global heavy-freight archetype (1866). More driving wheels meant more adhesion and pulling power for larger trains.',
        historicalFact: 'Named "Consolidation" after the merger of several railways, the 2-8-0 was first commercially manufactured by Baldwin in 1866 and was used on every continent for over 80 years.',
        yearIntroduced: 1866,
        effects: [{ type: 'capacity_bonus', value: 15 }],
    },
    {
        id: 'improved_boiler',
        name: 'High-Pressure Boiler',
        icon: '🔥',
        era: 'steam',
        cost: 800,
        prerequisites: ['consolidation_280'],
        description: 'Higher steam pressure enables faster and more powerful locomotives. A critical step toward the express passenger era.',
        historicalFact: 'Boiler pressure increased from ~50 psi in the 1830s to over 200 psi by the 1890s. NYC No. 999 claimed 112.5 mph in 1893, sparking the speed record era.',
        yearIntroduced: 1870,
        effects: [{ type: 'speed_bonus', value: 15 }],
    },
    {
        id: 'mallet_articulated',
        name: 'Mallet Articulated',
        icon: '⛰️',
        era: 'steam',
        cost: 1000,
        prerequisites: ['improved_boiler'],
        description: 'Articulated compound locomotives (1888) conquered mountain grades that defeated rigid-frame engines.',
        historicalFact: 'Anatole Mallet patented the articulated compound concept in the mid-1880s. This lineage culminated in Union Pacific\'s Big Boy (1941) — 300 psi boiler, the largest steam locomotive ever built.',
        yearIntroduced: 1888,
        effects: [
            { type: 'capacity_bonus', value: 15 },
            { type: 'maintenance_reduction', value: 10 },
        ],
    },
    {
        id: 'mallard_a4',
        name: 'Mallard A4 Class',
        icon: '💨',
        era: 'steam',
        cost: 1200,
        prerequisites: ['improved_boiler'],
        description: 'The pinnacle of steam speed (1938). Streamlined design and optimized engineering achieved 126 mph — an unbroken steam record.',
        historicalFact: 'LNER 4468 Mallard set the world steam speed record of 126 mph on 3 July 1938 on the East Coast Main Line. The record still stands and the locomotive is preserved at the National Railway Museum, York.',
        yearIntroduced: 1938,
        effects: [{ type: 'speed_bonus', value: 10 }],
    },

    // === DIESEL ERA (1934–1960) ===
    {
        id: 'pioneer_zephyr',
        name: 'Pioneer Zephyr',
        icon: '⛽',
        era: 'diesel',
        cost: 1500,
        prerequisites: ['improved_boiler'],
        description: 'The stainless-steel diesel streamliner (1934) that proved internal combustion could replace steam for passenger rail.',
        historicalFact: 'The Pioneer Zephyr\'s 1934 dawn-to-dusk Denver-to-Chicago run (1,015 miles non-stop) is an ASME landmark. Its stainless-steel construction by Budd Company revolutionized coach design.',
        yearIntroduced: 1934,
        effects: [{ type: 'unlock_train', value: 'mixed' }],
    },
    {
        id: 'orient_express',
        name: 'Orient Express Service',
        icon: '👑',
        era: 'diesel',
        cost: 2000,
        prerequisites: ['pioneer_zephyr', 'patentee_express'],
        description: 'Premium dining and sleeping cars transform rail into a luxury experience. First-class cross-continental travel.',
        historicalFact: 'The original Orient Express (1883) pioneered luxury rail, but the concept matured with vestibule coaches (patented 1887) that prevented telescoping in crashes and enabled enclosed dining cars.',
        yearIntroduced: 1883,
        effects: [{ type: 'unlock_train', value: 'luxury' }],
    },
    {
        id: 'emd_f7',
        name: 'EMD F7 Diesel',
        icon: '📊',
        era: 'diesel',
        cost: 1800,
        prerequisites: ['pioneer_zephyr'],
        description: 'The mass-produced diesel-electric (1949) that ended the steam era. 1,500 hp, standardized, and vastly cheaper to maintain.',
        historicalFact: 'The EMD F7 was built in such numbers that it became the symbol of post-war American dieselization. Its operational economics — no water stops, no ash pits — made steam obsolete virtually overnight.',
        yearIntroduced: 1949,
        effects: [{ type: 'maintenance_reduction', value: 20 }],
    },
    {
        id: 'big_boy',
        name: 'Big Boy 4-8-8-4',
        icon: '🏋️',
        era: 'diesel',
        cost: 1200,
        prerequisites: ['pioneer_zephyr'],
        description: 'Peak heavy-haul steam power (1941). Union Pacific\'s giants hauled massive freights over the Wasatch mountains.',
        historicalFact: 'UP Big Boy No. 4014 weighs over 600 tons fully loaded. Only 25 were built, but they represent the absolute pinnacle of steam locomotive engineering — 300 psi boiler, 68-inch drivers.',
        yearIntroduced: 1941,
        effects: [{ type: 'capacity_bonus', value: 25 }],
    },

    // === ELECTRIC ERA (1955–2000) ===
    {
        id: 'bb_9004',
        name: 'BB 9004 Electric',
        icon: '⚡',
        era: 'electric',
        cost: 3000,
        prerequisites: ['pioneer_zephyr'],
        description: 'The French electric speed record holder (1955). 331 km/h proved electric traction could support extreme speeds.',
        historicalFact: 'In March 1955, French locomotives BB 9004 and CC 7107 both reached 331 km/h, directly informing the later TGV programme. This shifted high-speed ambition from steam to electric.',
        yearIntroduced: 1955,
        effects: [
            { type: 'unlock_train', value: 'express' },
            { type: 'unlock_track', value: 'electrified' },
        ],
    },
    {
        id: 'etcs_signalling',
        name: 'ETCS Digital Signalling',
        icon: '🚦',
        era: 'electric',
        cost: 2500,
        prerequisites: ['bb_9004'],
        description: 'Automated digital train control replaces manual signalling. Continuous speed supervision and radio-based movement authority.',
        historicalFact: 'ETCS evolved from track circuits (1872), interlocking (1856), and automatic block signalling (1893). At Level 2, lineside signals become optional — authority is transmitted directly to the cab.',
        yearIntroduced: 1996,
        effects: [{ type: 'revenue_bonus', value: 20 }],
    },
    {
        id: 'metropolitan_a',
        name: 'Metropolitan A Class',
        icon: '🏙️',
        era: 'electric',
        cost: 2800,
        prerequisites: ['bb_9004', 'patentee_express'],
        description: 'The world\'s first underground railway traction (1864). Condensing steam adapted for tunnels, later replaced by electric motors.',
        historicalFact: 'The Metropolitan Railway A Class (1864) used condensers to reduce tunnel steam. When the Underground was electrified, it proved urban rail could move millions daily — the template for every metro system.',
        yearIntroduced: 1864,
        effects: [{ type: 'unlock_train', value: 'commuter' }],
    },
    {
        id: 'tgv_sud_est',
        name: 'TGV Sud-Est',
        icon: '🛤️',
        era: 'electric',
        cost: 4000,
        prerequisites: ['bb_9004', 'big_boy'],
        description: 'The train that defined high-speed rail (1981). Paris–Lyon in 2 hours on dedicated track with integrated signalling.',
        historicalFact: 'The TGV Sud-Est entering service in 1981 created the modern high-speed rail template: dedicated alignments, articulated trainsets, and cab signalling at 270 km/h. France now has 2,800 km of LGV.',
        yearIntroduced: 1981,
        effects: [
            { type: 'speed_bonus', value: 30 },
            { type: 'unlock_track', value: 'highspeed' },
        ],
    },

    // === MODERN ERA (2000+) ===
    {
        id: 'ice_1',
        name: 'ICE 1 High-Speed',
        icon: '🧲',
        era: 'maglev',
        cost: 6000,
        prerequisites: ['bb_9004', 'tgv_sud_est'],
        description: 'Germany\'s 280 km/h flagship trainset (1991). 9.6 MW of power with premium comfort — wider cars, air conditioning, restaurant car.',
        historicalFact: 'ICE 1 entered service in 1991 with construction beginning in 1989. Deutsche Bahn set a new benchmark for passenger comfort that became an explicit design specification, not just a nice-to-have.',
        yearIntroduced: 1991,
        effects: [{ type: 'unlock_train', value: 'bullet' }],
    },
    {
        id: 'n700s_shinkansen',
        name: 'N700S Shinkansen',
        icon: '🚀',
        era: 'maglev',
        cost: 10000,
        prerequisites: ['ice_1'],
        description: 'The cutting edge of high-speed rail (2020). SiC power electronics — world\'s first in Shinkansen — reduce weight and improve efficiency.',
        historicalFact: 'The N700S uses silicon carbide (SiC) main converters, a world first for high-speed rail. JR Central\'s Shinkansen network has carried over 10 billion passengers with zero fatal derailments.',
        yearIntroduced: 2020,
        effects: [{ type: 'unlock_train', value: 'hyperloop' }],
    },
    {
        id: 'coradia_ilint',
        name: 'Coradia iLint',
        icon: '🌿',
        era: 'maglev',
        cost: 8000,
        prerequisites: ['ice_1', 'etcs_signalling'],
        description: 'The world\'s first hydrogen fuel cell passenger train (2022). Zero-emission rail where electrification is uneconomic.',
        historicalFact: 'Alstom\'s Coradia iLint entered commercial service in 2022 in Lower Saxony, Germany. It proves hydrogen rail is viable for regional routes — the next step in decarbonising transport beyond the wires.',
        yearIntroduced: 2022,
        effects: [
            { type: 'maintenance_reduction', value: 30 },
            { type: 'revenue_bonus', value: 25 },
        ],
    },
    {
        id: 'flirt_akku',
        name: 'FLIRT Akku Battery',
        icon: '🔋',
        era: 'maglev',
        cost: 7000,
        prerequisites: ['ice_1'],
        description: 'Battery-electric multiple unit (2023). Runs on electrified sections then switches to battery for gaps in the wires.',
        historicalFact: 'Stadler\'s FLIRT Akku entered service in October 2023 in Germany. Battery traction fills the "last mile" gap — electrify the trunk, run on batteries for the branches.',
        yearIntroduced: 2023,
        effects: [
            { type: 'capacity_bonus', value: 40 },
            { type: 'speed_bonus', value: 20 },
        ],
    },
];

// ============ HELPER FUNCTIONS ============

export function getTech(id: string): Technology | undefined {
    return TECH_TREE.find(t => t.id === id);
}

export function canResearch(state: ResearchState, techId: string): { ok: boolean; reason?: string } {
    if (state.unlocked.has(techId)) return { ok: false, reason: 'Already researched' };

    const tech = getTech(techId);
    if (!tech) return { ok: false, reason: 'Unknown technology' };

    for (const prereq of tech.prerequisites) {
        if (!state.unlocked.has(prereq)) {
            const prereqTech = getTech(prereq);
            return { ok: false, reason: `Requires: ${prereqTech?.name ?? prereq}` };
        }
    }

    if (state.points < tech.cost) {
        return { ok: false, reason: `Need ${tech.cost} RP (have ${Math.floor(state.points)})` };
    }

    return { ok: true };
}

export function unlockTech(state: ResearchState, techId: string): boolean {
    const check = canResearch(state, techId);
    if (!check.ok) return false;

    const tech = getTech(techId)!;
    state.points -= tech.cost;
    state.unlocked.add(techId);
    return true;
}

export function getUnlockedTrainTypes(state: ResearchState): string[] {
    const types: string[] = [];
    for (const techId of state.unlocked) {
        const tech = getTech(techId);
        if (!tech) continue;
        for (const effect of tech.effects) {
            if (effect.type === 'unlock_train') {
                types.push(effect.value as string);
            }
        }
    }
    return types;
}

export function getSpeedBonus(state: ResearchState): number {
    let bonus = 0;
    for (const techId of state.unlocked) {
        const tech = getTech(techId);
        if (!tech) continue;
        for (const effect of tech.effects) {
            if (effect.type === 'speed_bonus') bonus += effect.value as number;
        }
    }
    return bonus;
}

export function getCapacityBonus(state: ResearchState): number {
    let bonus = 0;
    for (const techId of state.unlocked) {
        const tech = getTech(techId);
        if (!tech) continue;
        for (const effect of tech.effects) {
            if (effect.type === 'capacity_bonus') bonus += effect.value as number;
        }
    }
    return bonus;
}

export function getMaintenanceReduction(state: ResearchState): number {
    let reduction = 0;
    for (const techId of state.unlocked) {
        const tech = getTech(techId);
        if (!tech) continue;
        for (const effect of tech.effects) {
            if (effect.type === 'maintenance_reduction') reduction += effect.value as number;
        }
    }
    return Math.min(reduction, 75); // cap at 75%
}

export function getRevenueBonus(state: ResearchState): number {
    let bonus = 0;
    for (const techId of state.unlocked) {
        const tech = getTech(techId);
        if (!tech) continue;
        for (const effect of tech.effects) {
            if (effect.type === 'revenue_bonus') bonus += effect.value as number;
        }
    }
    return bonus;
}

export function getEraForTech(era: string): Technology[] {
    return TECH_TREE.filter(t => t.era === era);
}

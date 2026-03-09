// ============================================
// UPGRADE HUB SCENE — Between-levels progression
// Locomotive Shop + Infrastructure & Rolling Stock upgrades
// ============================================
import Phaser from 'phaser';
import { loadMeta, purchaseUpgrade, buyLocomotive, upgradeLocomotive } from '../metaState';
import { UPGRADE_TREE, getUpgradesByBranch, canPurchaseUpgrade } from '../upgradeTree';
import type { UpgradeBranch } from '../upgradeTree';
import { LOCO_TEMPLATES, getLocoStats, getStarDisplay, getUpgradeCost, getTemplate } from '../locomotives';

export class UpgradeHubScene extends Phaser.Scene {
    constructor() { super({ key: 'UpgradeHubScene' }); }

    create(): void {
        this.buildUI();
    }

    private buildUI(): void {
        const container = document.getElementById('upgrade-hub') as HTMLElement;
        if (!container) return;
        container.style.display = 'flex';
        this.renderUpgradeHub(container);
    }

    private renderUpgradeHub(container: HTMLElement): void {
        const meta = loadMeta();
        const upgradeBranches: { id: UpgradeBranch; label: string; icon: string }[] = [
            { id: 'infrastructure', label: 'Infrastructure', icon: '🛤️' },
            { id: 'rolling_stock', label: 'Rolling Stock', icon: '🚃' },
        ];

        container.innerHTML = `
        <div class="upgrade-screen">
            <div class="upgrade-header">
                <h2 style="font-size: 32px; letter-spacing: 2px; text-transform: uppercase;">UPGRADE HUB</h2>
                <div class="upgrade-rp-badge" style="font-size: 18px; padding: 8px 16px;">
                    <img src="assets/ui/icon_rp.png" style="width:20px; height:20px; vertical-align:middle; margin-right:4px;">
                    ${Math.floor(meta.researchPoints)} <span style="color:var(--text-secondary); font-size:14px;">RP</span>
                </div>
                <button class="upgrade-back-btn" id="upgrade-back" style="font-family: var(--font-display); font-size: 16px; font-weight: 700; padding: 10px 20px;">[ CLOSE ]</button>
            </div>

            <div class="upgrade-branches" style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 16px; padding: 0 16px;">
                <!-- Locomotive Shop Column -->
                <div class="upgrade-branch">
                    <div class="branch-header">🚂 Locomotive Shop</div>

                    <!-- Owned Collection -->
                    <div style="margin-bottom: 12px; padding: 8px; background: rgba(212,168,67,0.06); border: 1px solid rgba(212,168,67,0.12); border-radius: 6px;">
                        <div style="font-size: 11px; color: var(--gold-light); text-transform: uppercase; letter-spacing: 1px; margin-bottom: 6px;">Your Collection (${meta.ownedLocomotives.length})</div>
                        ${meta.ownedLocomotives.length === 0
                ? '<p style="color: var(--text-secondary); font-size: 12px;">No locomotives yet.</p>'
                : meta.ownedLocomotives.map(loco => {
                    const stats = getLocoStats(loco);
                    const tmpl = getTemplate(loco.templateId);
                    const stars = getStarDisplay(loco.level);
                    const upgCost = getUpgradeCost(loco.templateId, loco.level);
                    const canUpgrade = loco.level < 3 && meta.researchPoints >= upgCost;
                    return `
                            <div style="display: flex; justify-content: space-between; align-items: center; padding: 6px 8px; margin-bottom: 4px; background: rgba(255,255,255,0.03); border-radius: 4px; border: 1px solid rgba(255,255,255,0.06);">
                                <div>
                                    <span>${tmpl?.icon ?? '🚂'}</span>
                                    <strong style="font-size: 12px;">${loco.name}</strong>
                                    <span style="color: var(--gold); margin-left: 2px;">${stars}</span>
                                    <br/><span style="font-size: 10px; color: var(--text-secondary);">${stats.trainType} • spd ${(stats.speed * 100).toFixed(0)}% • cap ${stats.capacity} • mnt ${stats.maintenance}</span>
                                </div>
                                <div>
                                    ${loco.level < 3
                            ? `<button class="node-buy-btn ${canUpgrade ? '' : 'disabled'}" data-upgrade-loco="${loco.instanceId}" ${canUpgrade ? '' : 'disabled'}
                                           style="font-size: 10px; padding: 4px 8px;">
                                           ⬆ ${upgCost} RP
                                       </button>`
                            : '<span style="font-size: 10px; color: var(--gold);">MAX</span>'
                        }
                                </div>
                            </div>`;
                }).join('')}
                    </div>

                    <!-- Buy Section -->
                    <div style="font-size: 11px; color: var(--text-secondary); text-transform: uppercase; letter-spacing: 1px; margin-bottom: 6px;">Unlock Locomotive Blueprints</div>
                    <div class="branch-nodes">
                        ${LOCO_TEMPLATES.map(tmpl => {
                    const isOwned = meta.ownedLocomotives.some(l => l.templateId === tmpl.id);
                    const canAfford = meta.researchPoints >= tmpl.rpCost && !isOwned;
                    return `
                            <div class="upgrade-node ${isOwned ? 'purchased' : canAfford ? 'available' : 'locked'}" style="margin-bottom: 8px;">
                                <div class="node-icon">${tmpl.icon}</div>
                                <div class="node-name">${tmpl.name}</div>
                                <div style="font-size: 10px; color: var(--gold-dark); font-family: var(--font-mono); margin: 2px 0;">${tmpl.yearIntroduced}</div>
                                <div class="node-effect" style="font-size: 11px;">${tmpl.description}</div>
                                <div style="font-size: 10px; color: var(--text-secondary); margin-top: 3px;">${tmpl.trainType} • spd ${(tmpl.baseSpeed * 100).toFixed(0)}% • cap ${tmpl.baseCapacity}</div>
                                <div class="node-footer">
                                    ${isOwned
                            ? '<span class="node-purchased">✓ Owned</span>'
                            : `<span class="node-cost">${tmpl.rpCost} RP</span>
                                       <button class="node-buy-btn ${canAfford ? '' : 'disabled'}" data-buy-loco="${tmpl.id}" ${canAfford ? '' : 'disabled'}>
                                           ${canAfford ? 'Unlock' : 'Need RP'}
                                       </button>`
                        }
                                </div>
                            </div>`;
                }).join('')}
                    </div>
                </div>

                <!-- Infrastructure & Rolling Stock Columns -->
                ${upgradeBranches.map(branch => {
                    const nodes = getUpgradesByBranch(branch.id);
                    return `
                    <div class="upgrade-branch">
                        <div class="branch-header">${branch.icon} ${branch.label}</div>
                        <div class="branch-nodes">
                            ${nodes.map(node => {
                        const purchased = meta.purchasedUpgrades.includes(node.id);
                        const check = canPurchaseUpgrade(meta, node.id);
                        const stateClass = purchased ? 'purchased' : check.ok ? 'available' : 'locked';
                        return `
                                <div class="upgrade-node ${stateClass}" data-upgrade-id="${node.id}">
                                    <div class="node-icon">${node.icon}</div>
                                    <div class="node-name">${node.name}</div>
                                    <div style="font-size: 10px; color: var(--gold-dark); font-family: var(--font-mono); margin: 2px 0;">${node.yearIntroduced}</div>
                                    <div class="node-effect">${node.effect}</div>
                                    ${purchased ? `<div style="font-size: 10px; color: var(--text-secondary); margin-top: 4px; padding: 4px 6px; background: rgba(212,168,67,0.06); border-left: 2px solid var(--gold-dark); border-radius: 2px; line-height: 1.3;">📜 ${node.historicalFact}</div>` : ''}
                                    <div class="node-footer">
                                        ${purchased
                                ? '<span class="node-purchased">✓ Purchased</span>'
                                : `<span class="node-cost">${node.cost} RP</span>
                                                   <button class="node-buy-btn ${check.ok ? '' : 'disabled'}"
                                                     data-buy="${node.id}" ${check.ok ? '' : 'disabled'}>
                                                     ${check.ok ? 'Buy' : (check.reason ?? 'Locked')}
                                                   </button>`
                            }
                                    </div>
                                </div>`;
                    }).join('')}
                        </div>
                    </div>`;
                }).join('')}
            </div>

            <div class="upgrade-footer">
                <span class="upgrade-hint" style="color: var(--gold-light); font-weight: bold; text-transform: uppercase; font-size: 12px; letter-spacing: 1px;">💡 Upgrades & locomotives apply to all future levels permanently.</span>
            </div>
        </div>`;

        // Wire buy-locomotive buttons
        container.querySelectorAll('[data-buy-loco]').forEach(btn => {
            btn.addEventListener('click', () => {
                const tmplId = btn.getAttribute('data-buy-loco') ?? '';
                const latestMeta = loadMeta();
                if (buyLocomotive(latestMeta, tmplId)) {
                    this.renderUpgradeHub(container);
                }
            });
        });

        // Wire upgrade-locomotive buttons
        container.querySelectorAll('[data-upgrade-loco]').forEach(btn => {
            btn.addEventListener('click', () => {
                const id = parseInt(btn.getAttribute('data-upgrade-loco') ?? '0');
                const latestMeta = loadMeta();
                if (upgradeLocomotive(latestMeta, id)) {
                    this.renderUpgradeHub(container);
                }
            });
        });

        // Wire infrastructure/rolling stock buy buttons
        container.querySelectorAll('[data-buy]').forEach(btn => {
            btn.addEventListener('click', () => {
                const id = btn.getAttribute('data-buy') ?? '';
                const node = UPGRADE_TREE.find(u => u.id === id);
                if (!node) return;
                const latestMeta = loadMeta();
                if (purchaseUpgrade(latestMeta, id, node.cost)) {
                    this.renderUpgradeHub(container);
                }
            });
        });

        // Back button
        document.getElementById('upgrade-back')?.addEventListener('click', () => {
            container.style.display = 'none';
            this.scene.start('MetaHubScene');
        });
    }
}

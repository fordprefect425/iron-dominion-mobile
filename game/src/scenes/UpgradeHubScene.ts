// ============================================
// UPGRADE HUB SCENE — Between-levels upgrade screen
// ============================================
import Phaser from 'phaser';
import { loadMeta, purchaseUpgrade } from '../metaState';
import { UPGRADE_TREE, getUpgradesByBranch, canPurchaseUpgrade } from '../upgradeTree';
import type { UpgradeBranch } from '../upgradeTree';

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
        const branches: { id: UpgradeBranch; label: string; icon: string }[] = [
            { id: 'tracks', label: 'Tracks', icon: '🛤️' },
            { id: 'engines', label: 'Engines', icon: '🚂' },
            { id: 'carriages', label: 'Carriages', icon: '🚃' },
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

            <div class="upgrade-branches">
                ${branches.map(branch => {
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
                                    <div class="node-effect">${node.effect}</div>
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
                <span class="upgrade-hint" style="color: var(--gold-light); font-weight: bold; text-transform: uppercase; font-size: 12px; letter-spacing: 1px;">💡 Upgrades apply to all future levels permanently.</span>
            </div>
        </div>`;

        // Buy buttons
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

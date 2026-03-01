// ============================================
// LEVEL COMPLETE SCENE — Star result + RP award
// ============================================
import Phaser from 'phaser';
import { loadMeta, awardLevelRP, computeRPReward } from '../metaState';

export interface LevelCompleteData {
    levelId: string;
    levelName: string;
    chapter: number;
    stars: 1 | 2 | 3;
    fundsRemaining: number;
    monthsUsed: number;
    totalRevenue: number;
}

export class LevelCompleteScene extends Phaser.Scene {
    constructor() { super({ key: 'LevelCompleteScene' }); }

    create(data: LevelCompleteData): void {
        const meta = loadMeta();
        const previousBest = (meta.levelStars[data.levelId] ?? 0) as 0 | 1 | 2 | 3;
        const rpEarned = awardLevelRP(meta, data.levelId, data.stars, data.chapter);
        const totalRP = computeRPReward(data.stars, data.chapter);
        const isImprovement = data.stars > previousBest;

        const container = document.getElementById('level-complete') as HTMLElement;
        if (!container) return;
        container.style.display = 'flex';

        // Hide normal game UI
        const gameOverlay = document.getElementById('ui-overlay');
        if (gameOverlay) gameOverlay.style.display = 'none';

        const starsHtml = Array.from({ length: 3 }).map((_, idx) =>
            idx < data.stars
                ? '<img src="assets/ui/icon_star.png" style="width:48px; height:48px; object-fit:contain; filter:drop-shadow(0 4px 12px rgba(255,200,50,0.6))" alt="*">'
                : '<img src="assets/ui/icon_star.png" style="width:48px; height:48px; object-fit:contain; opacity:0.25; filter:grayscale(1)" alt="-">'
        ).join(' ');

        container.innerHTML = `
        <div class="level-complete-backdrop">
            <div class="lc-glow"></div>
            <div class="level-complete-card">
                <div class="lc-header">
                    <div class="lc-title-badge">COMPLETE</div>
                    <div class="lc-level-name">LEVEL ${data.levelId}: ${data.levelName}</div>
                </div>

                <div class="lc-stars" style="display:flex; justify-content:center; gap:24px; margin: 16px 0;">${starsHtml}</div>

                <div class="lc-stats-card">
                    <div class="lc-stat">
                        <span class="lc-stat-label">Revenue Earned:</span>
                        <span class="lc-stat-value gold">$${data.totalRevenue.toLocaleString()}</span>
                    </div>
                    <div class="lc-stat">
                        <span class="lc-stat-label">Funds Remaining:</span>
                        <span class="lc-stat-value">$${data.fundsRemaining.toLocaleString()}</span>
                    </div>
                    <div class="lc-stat">
                        <span class="lc-stat-label">Months Used:</span>
                        <span class="lc-stat-value">${data.monthsUsed} months</span>
                    </div>
                </div>

                <div class="lc-rp-reward ${rpEarned > 0 ? 'rp-earned' : ''}" style="margin-top: 8px;">
                    <img src="assets/ui/icon_rp.png" style="width:22px; height:22px; object-fit:contain; vertical-align:middle;" alt="RP">
                    ${rpEarned > 0
                ? `<span style="font-family: var(--font-mono); color: var(--gold-light);">+${rpEarned} RP earned! ${isImprovement ? '🎉 New best!' : ''}</span>`
                : `<span style="font-family: var(--font-mono); color: var(--text-secondary);">${totalRP} RP (no improvement)</span>`}
                </div>

                <div class="lc-actions" style="margin-top: 16px; display: flex; flex-direction: column; gap: 16px; align-items: center;">
                    <button class="lc-btn primary" id="lc-next" style="width: 100%; border: 1px solid var(--gold); background: var(--metal-bg); color: var(--gold-light); font-family: var(--font-display); font-size: 20px; font-weight: 700; padding: 14px 24px; border-radius: var(--radius-sm); cursor: pointer; box-shadow: inset 0 0 10px rgba(212, 168, 67, 0.2); transition: all 0.2s;">NEXT LEVEL &gt;</button>
                    <div style="display: flex; gap: 16px; width: 100%;">
                        <button class="lc-btn secondary" id="lc-replay" style="flex: 1; border: 1px solid rgba(212,168,67,0.4); background: rgba(0,0,0,0.4); color: var(--gold); font-family: var(--font-display); font-size: 18px; font-weight: 600; padding: 12px; border-radius: var(--radius-sm); cursor: pointer; transition: all 0.2s;">↻ Replay</button>
                        <button class="lc-btn tertiary" id="lc-hub" style="flex: 1; border: 1px solid rgba(212,168,67,0.4); background: rgba(0,0,0,0.4); color: var(--gold); font-family: var(--font-display); font-size: 18px; font-weight: 600; padding: 12px; border-radius: var(--radius-sm); cursor: pointer; transition: all 0.2s;">🧭 Map</button>
                    </div>
                </div>
            </div>
        </div>`;

        // Animate stars in sequence
        const starEls = container.querySelectorAll('.lc-stars');
        starEls.forEach((el, i) => {
            el.classList.add('star-animate-' + (i + 1));
        });

        document.getElementById('lc-next')?.addEventListener('click', () => {
            container.style.display = 'none';
            if (gameOverlay) gameOverlay.style.display = '';
            // Move to next level (simple: go back to hub, next is highlighted)
            this.scene.start('MetaHubScene');
        });

        document.getElementById('lc-replay')?.addEventListener('click', () => {
            container.style.display = 'none';
            if (gameOverlay) gameOverlay.style.display = '';
            this.scene.start('GameScene', {
                levelId: data.levelId,
                chapter: data.chapter,
                freePlay: false,
            });
        });

        document.getElementById('lc-hub')?.addEventListener('click', () => {
            container.style.display = 'none';
            this.scene.start('MetaHubScene');
        });
    }
}

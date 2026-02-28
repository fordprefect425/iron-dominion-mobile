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
                    <div class="lc-title-badge">LEVEL COMPLETE</div>
                    <div class="lc-level-name">${data.levelName}</div>
                </div>

                <div class="lc-stars" style="display:flex; justify-content:center; gap:10px; margin: 20px 0;">${starsHtml}</div>

                <div class="lc-star-legend">
                    <span>1★ Complete</span>
                    <span>2★ Profitable</span>
                    <span>3★ Fast</span>
                </div>

                <div class="lc-stats-card">
                    <div class="lc-stat">
                        <span class="lc-stat-label">Revenue Earned</span>
                        <span class="lc-stat-value gold">$${data.totalRevenue.toLocaleString()}</span>
                    </div>
                    <div class="lc-stat">
                        <span class="lc-stat-label">Funds Remaining</span>
                        <span class="lc-stat-value">$${data.fundsRemaining.toLocaleString()}</span>
                    </div>
                    <div class="lc-stat">
                        <span class="lc-stat-label">Months Used</span>
                        <span class="lc-stat-value">${data.monthsUsed}</span>
                    </div>
                </div>

                <div class="lc-rp-reward ${rpEarned > 0 ? 'rp-earned' : ''}">
                    <img src="assets/ui/icon_rp.png" style="width:22px; height:22px; object-fit:contain; vertical-align:middle;" alt="RP">
                    ${rpEarned > 0
                ? `<span>+${rpEarned} RP earned! ${isImprovement ? '🎉 New best!' : ''}</span>`
                : `<span>${totalRP} RP (no improvement)</span>`}
                </div>

                <div class="lc-actions">
                    <button class="lc-btn primary" id="lc-next">NEXT LEVEL →</button>
                    <div class="lc-secondary-actions">
                        <button class="lc-btn secondary" id="lc-replay">↺ Replay</button>
                        <button class="lc-btn tertiary" id="lc-hub">🗺️ Map</button>
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

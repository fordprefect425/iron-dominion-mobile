// ============================================
// LEVEL FAILED SCENE — Time out or Bankruptcy
// ============================================
import Phaser from 'phaser';

export type LossReason = 'timeout' | 'bankruptcy';

export interface LevelFailedData {
    levelId: string;
    levelName: string;
    chapter: number;
    reason: LossReason;
    monthsUsed: number;
    timeLimit: number;   // only relevant for timeout
    fundsAtFail: number; // only relevant for bankruptcy
}

const REASON_COPY: Record<LossReason, { icon: string; title: string; subtitle: string; tip: string }> = {
    timeout: {
        icon: '⏰',
        title: 'Time Expired!',
        subtitle: 'You ran out of time before completing the objective.',
        tip: '💡 Build your first station immediately and run a train — speed is rewarded.',
    },
    bankruptcy: {
        icon: '💸',
        title: 'Bankrupt!',
        subtitle: 'Your company\'s finances collapsed before the objective was met.',
        tip: '💡 Keep expenses low early. Build fewer, more efficient routes rather than many unprofitable ones.',
    },
};

export class LevelFailedScene extends Phaser.Scene {
    constructor() { super({ key: 'LevelFailedScene' }); }

    create(data: LevelFailedData): void {
        const container = document.getElementById('level-failed') as HTMLElement;
        if (!container) return;
        container.style.display = 'flex';

        const copy = REASON_COPY[data.reason];

        container.innerHTML = `
        <div class="level-failed-backdrop">
            <div class="lf-glow"></div>
            <div class="level-failed-card">
                <div class="lf-header">
                    <div class="lf-reason-icon">${copy.icon}</div>
                    <h2 class="lf-title">${copy.title}</h2>
                    <div class="lf-level-name">${data.levelName}</div>
                </div>

                <div class="lf-subtitle">${copy.subtitle}</div>

                <div class="lf-stats-card">
                    ${data.reason === 'timeout' ? `
                    <div class="lf-stat">
                        <span class="lf-stat-label">Time Limit</span>
                        <span class="lf-stat-value">${data.timeLimit} months</span>
                    </div>
                    <div class="lf-stat">
                        <span class="lf-stat-label">Months Used</span>
                        <span class="lf-stat-value">${data.monthsUsed}</span>
                    </div>` : `
                    <div class="lf-stat">
                        <span class="lf-stat-label">Funds at Failure</span>
                        <span class="lf-stat-value negative">$${data.fundsAtFail.toLocaleString()}</span>
                    </div>
                    <div class="lf-stat">
                        <span class="lf-stat-label">Months Survived</span>
                        <span class="lf-stat-value">${data.monthsUsed}</span>
                    </div>`}
                </div>

                <div class="lf-tip">${copy.tip}</div>

                <div class="lf-actions">
                    <button class="lf-btn primary" id="lf-retry">↺ TRY AGAIN</button>
                    <button class="lf-btn secondary" id="lf-hub">🗺️ BACK TO MAP</button>
                </div>
            </div>
        </div>`;

        document.getElementById('lf-retry')?.addEventListener('click', () => {
            container.style.display = 'none';
            const overlay = document.getElementById('ui-overlay');
            if (overlay) overlay.style.display = '';
            this.scene.start('GameScene', {
                levelId: data.levelId,
                chapter: data.chapter,
                freePlay: false,
            });
        });

        document.getElementById('lf-hub')?.addEventListener('click', () => {
            container.style.display = 'none';
            this.scene.start('MetaHubScene');
        });
    }
}

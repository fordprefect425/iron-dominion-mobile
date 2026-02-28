// ============================================
// META HUB SCENE — World map between levels
// ============================================
import Phaser from 'phaser';
import { loadMeta, getCareerRank } from '../metaState';
import { getLevelsByChapter } from '../levels';

export class MetaHubScene extends Phaser.Scene {
    constructor() { super({ key: 'MetaHubScene' }); }

    preload(): void {
        this.load.audio('bgm_menu', 'audio/Steel & Skyline Swing.mp3');
    }

    create(): void {
        // Hide loading screen (MetaHubScene is the boot scene, not GameScene)
        const loading = document.getElementById('loading-screen');
        if (loading) {
            const bar = document.getElementById('loading-bar');
            if (bar) bar.style.width = '100%';
            setTimeout(() => {
                loading.style.opacity = '0';
                loading.style.transition = 'opacity 0.6s ease';
                setTimeout(() => loading.remove(), 700);
            }, 300);
        }

        // Play hub music if not already playing
        if (!this.sound.get('bgm_menu') || !this.sound.get('bgm_menu')?.isPlaying) {
            this.sound.stopAll();
            this.sound.add('bgm_menu', { loop: true, volume: 0.5 }).play();
        }

        this.buildUI();
    }

    private buildUI(): void {
        const meta = loadMeta();
        const rank = getCareerRank(meta);
        const totalStars = (Object.values(meta.levelStars) as number[]).reduce((a, b) => a + b, 0);
        const container = document.getElementById('meta-hub') as HTMLElement;
        if (!container) return;
        container.style.display = 'flex';

        // Hide game canvas overlay during hub
        const gameOverlay = document.getElementById('ui-overlay');
        if (gameOverlay) gameOverlay.style.display = 'none';

        // Read chapter 1 levels from the designer config
        const ch1Levels = getLevelsByChapter(1);

        container.innerHTML = `
        <div class="hub-screen">
            <!-- Top Bar -->
            <div class="hub-top-bar">
                <div class="hub-rank">${rank.emoji} ${rank.title} <span class="hub-badge">${rank.badge}</span></div>
                <div class="hub-rp"><img src="assets/ui/icon_rp.png" class="resource-icon-img" alt="RP" style="vertical-align: text-bottom"> <span id="hub-rp-value">${Math.floor(meta.researchPoints)} RP</span></div>
            </div>

            <!-- Chapter heading -->
            <div class="hub-chapter-header">
                <h2>🗺️ Chapter 1: Valley Rails</h2>
                <p class="hub-chapter-sub">Complete levels to earn Research Points. Spend them in the Upgrade Hub.</p>
            </div>

            <!-- Level Grid -->
            <div class="hub-level-grid" id="hub-level-grid">
                ${ch1Levels.map((lvl, i) => {
            const starsInt = meta.levelStars[lvl.id] ?? 0;
            // Generate star images instead of unicode stars
            const starsHtml = Array.from({ length: 3 }).map((_, idx) =>
                idx < starsInt
                    ? '<img src="assets/ui/icon_star.png" style="width:16px; height:16px; object-fit:contain; filter:drop-shadow(0 2px 4px rgba(0,0,0,0.5))" alt="*">'
                    : '<img src="assets/ui/icon_star.png" style="width:16px; height:16px; object-fit:contain; opacity:0.3; filter:grayscale(1)" alt="-">'
            ).join(' ');
            const prevId = i > 0 ? ch1Levels[i - 1].id : null;
            const isLocked = prevId !== null && (meta.levelStars[prevId] ?? 0) === 0;
            return `
                    <button class="hub-level-btn ${isLocked ? 'locked' : ''}" data-level="${lvl.id}" ${isLocked ? 'disabled' : ''} title="${lvl.description}">
                        <span class="level-num">${i + 1}</span>
                        <span class="level-name">${lvl.name}</span>
                        <span class="level-stars" style="display:flex; gap:2px;">${starsHtml}</span>
                    </button>`;
        }).join('')}
            </div>

            <!-- Stars progress -->
            <div class="hub-stars-row" style="display:flex; align-items:center; justify-content:center; gap:8px;">
                <span><img src="assets/ui/icon_star.png" style="width:18px; height:18px; object-fit:contain; filter:drop-shadow(0 2px 4px rgba(0,0,0,0.5))" alt="*"> ${totalStars} / ${ch1Levels.length * 3} stars</span>
            </div>

            <!-- Bottom Nav -->
            <div class="hub-bottom-nav">
                <button class="hub-nav-btn" id="hub-upgrade-btn">🔬 Upgrade Hub</button>
                <button class="hub-nav-btn secondary" id="hub-sandbox-btn">🗺️ Free Play</button>
                <button class="hub-nav-btn exit-btn" id="hub-exit-btn">✕ Exit Game</button>
            </div>
        </div>

        <!-- Exit confirm dialog -->
        <div id="exit-dialog" class="exit-dialog" style="display:none">
            <div class="exit-dialog-card">
                <div class="exit-dialog-title">🛑 Exit Game?</div>
                <div class="exit-dialog-sub">Your progress is saved automatically.</div>
                <div class="exit-dialog-actions">
                    <button class="exit-confirm-btn" id="exit-confirm">✓ Yes, Exit</button>
                    <button class="exit-cancel-btn" id="exit-cancel">← Keep Playing</button>
                </div>
            </div>
        </div>`;

        // Level buttons
        container.querySelectorAll('.hub-level-btn:not([disabled])').forEach(btn => {
            btn.addEventListener('click', () => {
                const levelId = btn.getAttribute('data-level') ?? '';
                this.launchLevel(levelId);
            });
        });

        // Upgrade Hub
        document.getElementById('hub-upgrade-btn')?.addEventListener('click', () => {
            container.style.display = 'none';
            this.scene.start('UpgradeHubScene');
        });

        // Free Play (original sandbox mode)
        document.getElementById('hub-sandbox-btn')?.addEventListener('click', () => {
            container.style.display = 'none';
            if (gameOverlay) gameOverlay.style.display = '';
            this.scene.start('GameScene', { levelId: null, freePlay: true });
        });

        // Exit Game
        document.getElementById('hub-exit-btn')?.addEventListener('click', () => {
            const dialog = document.getElementById('exit-dialog');
            if (dialog) dialog.style.display = 'flex';
        });
        document.getElementById('exit-cancel')?.addEventListener('click', () => {
            const dialog = document.getElementById('exit-dialog');
            if (dialog) dialog.style.display = 'none';
        });
        document.getElementById('exit-confirm')?.addEventListener('click', () => {
            this.exitGame();
        });
    }

    private launchLevel(levelId: string): void {
        const container = document.getElementById('meta-hub');
        if (container) container.style.display = 'none';
        const gameOverlay = document.getElementById('ui-overlay');
        if (gameOverlay) gameOverlay.style.display = '';
        const ch1Levels = getLevelsByChapter(1);
        const lvl = ch1Levels.find(l => l.id === levelId);
        this.scene.start('GameScene', { levelId, chapter: lvl?.chapter ?? 1, freePlay: false });
    }

    private exitGame(): void {
        // Try Capacitor native exit first (iOS/Android)
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const cap = (window as any).Capacitor;
        if (cap?.isNativePlatform?.()) {
            // Call Capacitor's App.exitApp() via runtime eval — avoids bundling the native module in web builds
            try {
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                (window as any).Capacitor.Plugins.App.exitApp();
            } catch {
                window.close();
            }
            return;
        }
        // Web fallback
        const closed = window.open('', '_self');
        if (closed) { closed.close(); return; }
        window.close();
        // If window.close() was blocked, show a message
        setTimeout(() => {
            const dialog = document.getElementById('exit-dialog');
            if (dialog) dialog.innerHTML = `
                <div class="exit-dialog-card">
                    <div class="exit-dialog-title">📵 Close This Tab</div>
                    <div class="exit-dialog-sub">Your browser blocked auto-close.<br>Please close this tab manually.</div>
                    <div class="exit-dialog-actions">
                        <button class="exit-cancel-btn" onclick="document.getElementById('exit-dialog').style.display='none'">OK</button>
                    </div>
                </div>`;
        }, 300);
    }
}

// ============================================
// IRON DOMINION MOBILE — Main Entry Point
// ============================================
import Phaser from 'phaser';
import { GameScene } from './scenes/GameScene';
import { MetaHubScene } from './scenes/MetaHubScene';
import { UpgradeHubScene } from './scenes/UpgradeHubScene';
import { LevelCompleteScene } from './scenes/LevelCompleteScene';
import { LevelFailedScene } from './scenes/LevelFailedScene';

// Animate loading bar while initializing
const loadingBar = document.getElementById('loading-bar');
const loadingStatus = document.getElementById('loading-status');
let loadProgress = 0;

function animateLoading() {
  loadProgress = Math.min(loadProgress + Math.random() * 15, 85);
  if (loadingBar) loadingBar.style.width = `${loadProgress}%`;
  if (loadProgress < 85) {
    const messages = [
      'Laying down tracks...', 'Surveying terrain...', 'Building stations...',
      'Stoking the engines...', 'Charting routes...', 'Loading resources...',
    ];
    if (loadingStatus) loadingStatus.textContent = messages[Math.floor(Math.random() * messages.length)];
    setTimeout(animateLoading, 200 + Math.random() * 300);
  }
}
animateLoading();

// Phaser config — all scenes registered, start on MetaHubScene
const config: Phaser.Types.Core.GameConfig = {
  type: Phaser.WEBGL,
  parent: 'game-container',
  width: window.innerWidth,
  height: window.innerHeight,
  backgroundColor: '#1e2029', // Rich, deep atmospheric color for map background
  antialias: true,
  // Scenes: MetaHubScene first (boot screen), then GameScene + hub scenes
  scene: [MetaHubScene, GameScene, UpgradeHubScene, LevelCompleteScene, LevelFailedScene],
  scale: {
    mode: Phaser.Scale.RESIZE,
    autoCenter: Phaser.Scale.CENTER_BOTH,
  },
  input: {
    mouse: {
      preventDefaultWheel: true,
    }
  },
  render: {
    pixelArt: false,
    antialias: true,
  },
};

const game = new Phaser.Game(config);

// Handle window resize
window.addEventListener('resize', () => {
  game.scale.resize(window.innerWidth, window.innerHeight);
});

// Pause game when backgrounded (saves battery on mobile)
document.addEventListener('visibilitychange', () => {
  const scene = game.scene.getScene('GameScene');
  if (!scene) return;
  if (document.hidden) {
    scene.scene.pause();
  } else {
    scene.scene.resume();
  }
});

// Handle Mute Button globally
const btnMute = document.getElementById('btn-mute');
const muteIcon = document.getElementById('mute-icon');
if (btnMute && muteIcon) {
  btnMute.addEventListener('click', (e) => {
    e.preventDefault();
    if (!game.sound) return;

    // Toggle global mute state
    game.sound.mute = !game.sound.mute;

    // Update icon
    muteIcon.textContent = game.sound.mute ? '🔇' : '🔊';
  });
}

export { game };

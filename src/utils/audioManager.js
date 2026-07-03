class AudioManager {
  constructor() {
    this.sounds = {};
    this.enabled = true;
  }

  load(name, src, options = {}) {
    if (this.sounds[name]) return;

    const audio = new Audio(src);
    audio.preload = "auto";
    audio.volume = options.volume ?? 0.4;
    audio.loop = options.loop ?? false;

    this.sounds[name] = audio;
  }

  play(name) {
    if (!this.enabled) return;

    const audio = this.sounds[name];
    if (!audio) return;

    audio.pause();
    audio.currentTime = 0;
    audio.play().catch(() => {});
  }

  playLoop(name) {
    if (!this.enabled) return;

    const audio = this.sounds[name];
    if (!audio) return;

    audio.play().catch(() => {});
  }

  stop(name) {
    const audio = this.sounds[name];
    if (!audio) return;

    audio.pause();
    audio.currentTime = 0;
  }
}

const audioManager = new AudioManager();

export default audioManager;

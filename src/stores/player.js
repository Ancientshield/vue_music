import { defineStore } from 'pinia';
import { Howl } from 'howler';
import helpers from '../includes/helper.js';

export default defineStore('player', {
  state: () => ({
    current_song: {},
    sound: {},
    seek: '00:00',
    duration: '00:00',
    playerProgress: '0%',
  }),
  actions: {
    async newSong(song) {
      if (this.sound instanceof Howl) {
        this.sound.unload();
      }

      this.current_song = song;

      this.sound = new Howl({
        src: [song.url],
        html5: true,
      });

      this.sound.play();

      // event listener
      this.sound.on('play', () => {
        // handle the event
        requestAnimationFrame(this.progress);
      });
    },
    async toggleAudio() {
      if (!this.sound.playing) {
        return;
      }

      if (this.sound.playing()) {
        this.sound.pause();
      } else {
        this.sound.play();
      }
    },
    progress() {
      this.seek = helpers.formatTime(this.sound.seek());
      this.duration = helpers.formatTime(this.sound.duration());

      // 不要漏掉 %
      this.playerProgress = `${(this.sound.seek() / this.sound.duration()) * 100}%`;

      // actions 不是 recursive
      // 所以要不斷回調，就要確認是否正在 playing() 中
      if (this.sound.playing()) {
        requestAnimationFrame(this.progress);
      }
    },
    updateSeek(event) {
      if (!this.sound.playing) {
        return;
      }

      // the documents width is 2000 pixels, The timeline is 1000 pixels.
      // If we click in the middle of the timeline, we would expect the client x property to be 500.
      // However, browser will return 1000.
      // Because the click is registered relative to the document in the cneter.
      // 所以要針對監聽事件物件解構
      // x 代表 document 上 player bar 已進行的相對長度
      // width 代表 總長度

      const { x, width } = event.currentTarget.getBoundingClientRect();
      const clickX = event.clientX - x;
      const percentage = clickX / width;
      const seconds = this.sound.duration() * percentage;

      // seek([seek], [id])
      // Get/set the position of playback for a sound. This method optionally takes 0, 1 or 2 arguments.
      // seek: Number optional The position to move current playback to (in seconds).
      // id: Number optional The sound ID. If none is passed, the first sound will seek.

      this.sound.seek(seconds);

      // Clear listener after first call.
      // sound.once('load', function(){
      //   sound.play();
      // });

      this.sound.once('seek', this.progress);
    },
  },
  getters: {
    playing: (state) => {
      if (state.sound.playing) {
        return state.sound.playing();
      }

      return false;
    },
  },
});

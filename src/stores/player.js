import { defineStore } from 'pinia';
import { Howl } from 'howler';

export default defineStore('player', {
  state: () => ({
    currnet_song: {},
    sound: {},
    seek: '00:00',
    duration: '00:00',
    playerProgress: '0%',
  }),
  actions: {
    async newSong(song) {
      this.currnet_song = song;

      this.sound = new Howl({
        src: [song.url],
        html5: true,
      });

      this.sound.play();

      // event listener
      this.sound.on('play',()=>{
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
    progress(){
      this.seek = this.sound.seek();
      this.duration = this.sound.duration();

      // actions 不是 recursive
      // 所以要不斷回調，就要確認是否正在 playing() 中
      if(this.sound.playing()){
        requestAnimationFrame(this.progress);
      }
    }
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

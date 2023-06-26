import { defineStore } from 'pinia';
import { Howl } from 'howler';

export default defineStore('player', {
  state: () => ({
    currnet_song: {},
    sound: {},
  }),
  actions: {
    async newSong(song) {
      this.currnet_song = song;

      this.sound = new Howl({
        src: [song.url],
        html5: true,
      });

      this.sound.play();
    },
  },
});

<template>
  <!-- Main Content -->
  <section class="container mx-auto mt-6">
    <div class="md:grid md:grid-cols-3 md:gap-4">
      <div class="col-span-1">
        <app-upload :addSong="addSong" />
        <!-- <app-upload ref="upload" /> -->
      </div>
      <div class="col-span-2">
        <div class="bg-white rounded border border-gray-200 relative flex flex-col">
          <div class="px-6 pt-6 pb-5 font-bold border-b border-gray-200">
            <span class="card-title">My Songs</span>
            <i class="fa fa-compact-disc float-right text-green-400 text-2xl"></i>
          </div>
          <div class="p-6">
            <!-- Composition Items -->
            <composition-item
              v-for="(song, i) in songs"
              :key="song.docID"
              :song="song"
              :updateSong="updateSong"
              :index="i"
              :updateUnsavedFlag="updateUnsavedFlag"
            />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
// import useUserStore from '../stores/user.js';
import AppUpload from '../components/Upload.vue';
import CompositionItem from '../components/components/CompositionItem.vue';
import { songsCollection, auth } from '../includes/firebase.js';

export default {
  name: 'manage',
  components: {
    AppUpload,
    CompositionItem,
  },
  data() {
    return {
      songs: [],
      unsaveFlag: false,
    };
  },
  async created() {
    const snapshot = await songsCollection.where('uid', '==', auth.currentUser.uid).get();

    snapshot.forEach(this.addSong);
  },
  methods: {
    updateSong(i, values) {
      this.songs[i].modified_name = values.modified_name;
      this.songs[i].genre = values.genre;
    },
    removeSong(i) {
      this.songs.splice(i, 1);
    },
    addSong(){
      const song = {
        ...document.data(),
        docID: document.id,
      };

      this.songs.push(song);
    },
    updateUnsavedFlag(value){
      this.unsaveFlag = value;
    }
  },
  beforeRouteLeave (to, from, next) {
    // ...
  }
  // beforeRouteLeave(to, from, next) {
  //   this.$refs.upload.cancelUploads();
  //   next();
  // },
  // BeforeRouteEnter(to, from, next) {
  //   const store = useUserStore();
  //   if (store.userLoggedIn) {
  //     next();
  //   } else {
  //     next({ name: 'home' });
  //   }
  //   console.log('beforeRouteEnter Guard');
  //   next();
  // },
};
</script>

<template>
  <div id="app">
    <div class="search-container">
      <app-search></app-search>
    </div>
    <div class="artist-detail-container" v-show="isArtistSelected">
      <app-artist-name :artistName="artistName"></app-artist-name>
      <app-albums></app-albums>
    </div>
    <div v-show="isAlbumClicked" id="trackContainer">
      <app-tracks></app-tracks>
    </div>
  </div>
</template>

<script>
import Search from "./components/Search.vue";
import Albums from "./components/Album/Albums.vue";
import Tracks from "./components/Tracks.vue";
import Artistname from "./components/Artistname.vue";
import { searchEventBus } from "./main.js";
import { albumEventBus } from "./main.js";
export default {
  components: {
    "app-search": Search,
    "app-albums": Albums,
    "app-tracks": Tracks,
    "app-artist-name": Artistname
  },
  data: function() {
    return {
      isArtistSelected: false,
      isAlbumClicked: false,
      artistName: ""
    }
  },
  methods: {
    scrollToTrackTable() {
      var container = this.$el.querySelector("#trackContainer");
      container.scrollIntoView({behavior: 'smooth'});
    }
  },
  created() {
    searchEventBus.$on("artistClicked", data => {
      this.isArtistSelected = true;
      this.artistName = data.artist.name;
    });
    albumEventBus.$on("albumClicked", data => {
      this.isAlbumClicked = true;
      setTimeout(()=>{
        this.scrollToTrackTable();
      },100);
    });
  }
};
</script>

<style>
* {
  box-sizing: border-box;
}
body {
  font: 16px Arial;
  background: #1c1c1c;
}
.search-container {
  text-align: center;
}

.artist-detail-container {
  padding: 1rem 2rem 1rem 2rem;
}
</style>

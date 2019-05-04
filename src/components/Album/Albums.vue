<template>
  <div v-if="albums.length>0">
    <div class="album-txt">Albums({{albums.length}})</div>
    <div class="album-container">
      <template v-for="(album,i) in albums">
        <app-album v-bind:key="album.id" :album="album" :albumIndex="i"></app-album>
      </template>
    </div>
  </div>
  <div v-else :style="{color: color}">No results found</div>
</template>
<script>
import Album from "./Album.vue";
import { searchEventBus } from "../../main.js";
export default {
  components: {
    "app-album": Album
  },
  data: function() {
    return {
      albums: [],
      color: "white",
      selectedArtist: ""
    };
  },
  methods: {
    fetchAlbumsList(artistId) {
      var data = {
        artistId: artistId
      };
      return this.$http.post("http://localhost:5000/albums", data);
    }
  },
  created() {
    searchEventBus.$on("artistClicked", data => {
      this.selectedArtist = data;
      this.artistName = this.selectedArtist.artist.name;
      this.fetchAlbumsList(this.selectedArtist.artist.id)
        .then(
          response => {
            return response.json();
          },
          error => {}
        )
        .then(albumsResponse => {
          this.albums = albumsResponse.data;
        });
    });
  }
};
</script>
<style scoped>
.album-txt {
  color: aqua;
  margin-top: 1rem;
  font-size: 1.5rem;
}
.album-container {
  align-items: center;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  grid-row-gap: 20px;
  grid-column-gap: 10px;
  margin-top: 1rem;
}
</style>



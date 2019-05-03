<template>
  <div v-if="albums.length>0">
    <div class="album-txt">Albums</div>
    <div class="album-container">
      <template v-for="album in albums">
        <app-album v-bind:key="album.id" :album="album"></app-album>
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
  grid-template-columns: repeat(4, 1fr);
  grid-row-gap: 10px;
  grid-column-gap: 5px;
  margin-top: 1rem;
}
@media only screen and (max-width: 576px) {
  .album-container {
    grid-template-columns: repeat(1, 1fr);
  }
}
@media only screen and (min-width: 768px) {
  .album-container {
    grid-template-columns: repeat(2, 1fr);
  }
}
@media only screen and (min-width: 992px) {
  .album-container {
    grid-template-columns: repeat(3, 1fr);
  }
}
@media only screen and (min-width: 1200px) {
  .album-container {
    grid-template-columns: repeat(4, 1fr);
  }
}
</style>



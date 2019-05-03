<template>
  <div v-if="albums.length>0">
    <div class="album-txt">Albums</div>
    <div class="album-container">
      <template v-for="album in albums">
        <div v-bind:key="album.id">
          <div class="img-container">
            <img @click="onAlbumClick(album)" :src="album.cover_medium">
          </div>
          <span class="album-caption">{{album.title}}</span>
        </div>
      </template>
    </div>
  </div>
  <div v-else :style="{color: color}">No results found</div>
</template>
<script>
import { searchEventBus } from "../main.js";
export default {
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
    },
    onAlbumClick(selectedAlbum) {
      console.log(selectedAlbum);
    }
  },
  created() {
    searchEventBus.$on("artistClicked", data => {
      console.log(data);
      this.selectedArtist = data;
      this.fetchAlbumsList(this.selectedArtist.artist.id)
        .then(
          response => {
            return response.json();
          },
          error => {}
        )
        .then(albumsResponse => {
          console.log(albumsResponse);
          this.albums = albumsResponse.data;
        });
    });
  }
};
</script>
<style scoped>
.search-container {
  text-align: center;
}
.search-result-txt {
  color: white;
  margin-top: 1rem;
  font-size: 1.5rem;
  border-bottom: 1px solid lightgray;
}
.album-txt {
  color: aqua;
  margin-top: 1rem;
  font-size: 1.5rem;
}
.search-items-txt {
  margin-left: 10px;
}
.album-container {
  align-items: center;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-row-gap: 10px;
  grid-column-gap: 5px;
  margin-top: 1rem;
}
.album-detail-container {
  display: grid;
  grid-template-columns: 250px auto;
  grid-column-gap: 10px;
  background: #2a2a2a;
  font-size: 16px;
  margin-top: 4rem;
}
.album-img-container {
  margin-top: -3rem;
}
.album-caption {
  display: block;
  color: white;
  font-size: 15px;
  color: aqua;
}
.img-container:hover {
  cursor: pointer;
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



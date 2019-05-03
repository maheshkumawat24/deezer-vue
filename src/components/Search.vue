<template>
  <div class="autocomplete">
    <input
      type="text"
      name="artists"
      v-model="searchQuery"
      @input="onChange"
      placeholder="search artists"
    >
    <div v-if="!isArtistSelected">
      <div class="autocomplete-items">
        <div
          class="search-items"
          @click="onArtistClick(artist)"
          v-for="artist in artists"
          v-bind:key="artist.id"
        >{{artist.artist.name}}</div>
      </div>
    </div>
  </div>
</template>
<script>
import { searchEventBus } from '../main.js';
export default {
  data: function() {
    return {
      searchQuery: "",
      artists: [],
      isArtistSelected: false
    };
  },
  methods: {
    onChange() {
      console.log(process.env.ROOT_API );
      console.log(this.searchQuery);
      this.fetchArtists(this.searchQuery)
        .then(
          response => {
            return response.json();
          },
          error => {
            // error handleing code goes here
            console.log(error);
          }
        )
        .then(results => {
          this.isArtistSelected = false;
          this.artists = results.data;
        });
    },

    fetchArtists(searchQuery) {
      var searchQuery = {
        artistName: this.searchQuery
      };
      return this.$http.post("http://localhost:5000/search", searchQuery);
    },

    onArtistClick(selectedArtist) {
      this.artists = [];
      this.isArtistSelected = true;
      searchEventBus.onArtistClick(selectedArtist);
    },

    handleClickOutSide(evt) {
      if (!this.$el.contains(evt.target)) {
        this.isArtistSelected = true;
      }
    }
  },
  mounted() {
    console.log("yeah");
    document.addEventListener("click", this.handleClickOutSide);
  },
  destroyed() {
    document.removeEventListener("click", this.handleClickOutSide);
  }
};
</script>
<style scoped>

.autocomplete {
  position: relative;
  display: inline-block;
  width: 50%;
}
input {
  border: 1px solid transparent;
  background-color: #232323;
  padding: 10px;
  font-size: 16px;
}
input[type="text"] {
  background-color: #232323;
  width: 100%;
  color: #8a8a8a;
}
input[type="submit"] {
  color: #000;
  background: aqua;
}
.autocomplete-items {
  position: absolute;
  border-bottom: none;
  border-top: none;
  z-index: 99;
  top: 100%;
  left: 0;
  right: 0;
  height: 300px;
  overflow-y: auto;
}
.autocomplete-items div {
  padding: 10px;
  cursor: pointer;
  border-bottom: 1px solid #1c1c1c;
  font-size: 16px;
  text-align: left;
}
.autocomplete-items div:hover {
  /*when hovering an item:*/
  background-color: #e9e9e9;
}
.search-items {
  background-color: #232323;
  color: #8a8a8a;
}
</style>

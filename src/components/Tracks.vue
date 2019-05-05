<template>
  <div class="album-detail-container">
    <div class="album-img-container">
      <img :src="selectedAlbum.cover_medium">
    </div>
    <div>
      <div class="album-txt">{{selectedAlbum.title}}</div>
      <table class="table-normal">
        <thead>
          <tr>
            <th>#</th>
            <th>Title</th>
            <th>Artist</th>
            <th>Time</th>
            <th>Released</th>
          </tr>
        </thead>
        <tr v-for="(track,i) in tracks" v-bind:key="track.id">
          <td>{{i+1}}</td>
          <td>{{track.title}}</td>
          <td>{{track.artist.name}}</td>
          <td>{{convertSecondsToMinutes(track.duration)}}</td>
          <td>2011</td>
        </tr>
      </table>
    </div>
  </div>
</template>
<script>
import { albumEventBus } from "../main.js";
export default {
  data: function() {
    return {
      selectedAlbum: "",
      tracks: []
    };
  },
  methods: {
    fetchTrackList(trackUrl) {
      var data = {
        trackLink: trackUrl
      };
      return this.$http.post("http://localhost:5000/track", data);
    },
    convertSecondsToMinutes(duration) {
        var minutes = Math.floor(duration / 60);
        var seconds = duration - minutes * 60;
        return this.str_pad_left(minutes, '0', 2) + ':' + this.str_pad_left(seconds, '0', 2);
    },
    str_pad_left(string, pad, length) {
        return (new Array(length + 1).join(pad) + string).slice(-length);
    }
  },
  created() {
    albumEventBus.$on("albumClicked", data => {
      this.selectedAlbum = data;
      this.fetchTrackList(this.selectedAlbum.tracklist)
        .then(
          response => {
            return response.json();
          },
          error => {}
        )
        .then(trackListResponse => {
          console.log(trackListResponse);
          this.tracks = trackListResponse.data;
        });
    });
  }
};
</script>
<style scoped>
.album-detail-container {
    display: grid;
    grid-template-columns: 200px auto;
    grid-column-gap: 10px;
    background: #2a2a2a;
    font-size:16px;
    margin-top: 4rem;
}
.album-img-container{
    margin-top: -3rem;
}
.album-txt {
    color: aqua;
    margin-top: 1rem;
    font-size: 1.5rem;
}
.table-normal {
  position: relative;
  margin: 10px auto;
  padding: 0;
  width: 100%;
  height: auto;
  border-collapse: collapse;
  text-align: center;
}
.table-normal thead tr {
  font-weight: bold;
  color: #fff;
}
.table {
  border-collapse: collapse;
  border-spacing: 0;
  width: 80%;
  border: 1px solid;
}
th,
td {
  text-align: left;
  padding: 8px;
  color: white;
  max-width: 100px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
tr {
  border-bottom: 1px solid #1c1c1c;
}
tr:last-child {
  border-bottom: none;
}
img {
  width: 200px;
  height: 200px;
}
</style>

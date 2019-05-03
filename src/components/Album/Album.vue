<template>
  <div>
    <div class="img-container">
      <img @click="onAlbumClick()" :src="album.cover_medium">
    </div>
    <span class="album-caption">{{album.title}}</span>
  </div>
</template>
<script>
import { albumEventBus } from "../../main.js";

export default {
  props: {
    'album': {
      type: Object,
      required: true
    }
  },
  methods: {
    onAlbumClick() {
      albumEventBus.onAlbumClick(this.album);
    }
  }
};
</script>
<style scoped>
.album-caption {
  display: block;
  color: white;
  font-size: 15px;
  color: aqua;
}
.img-container:hover {
   cursor: pointer;
}
</style>


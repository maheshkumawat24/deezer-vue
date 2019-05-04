<template>
  <div>
    <div class="img-container">
      <img @click="onAlbumClick()" :src="album.cover_medium">
    </div>
    <div class="album-caption">{{album.title}}</div>
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
  text-align:center;
  font-size: 15px;
  color: aqua;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  width:200px;
}
img:hover {
   cursor: pointer;
}
img {
  width: 200px;
  height: 200px;
}
</style>


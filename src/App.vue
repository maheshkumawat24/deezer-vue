<template>
  <div id="app">
    <div class="search-container">
      <app-search></app-search>
    </div>
    <div>
      <app-album></app-album>
    </div>
  </div>
</template>

<script>
import Search from "./components/Search.vue";
import Album from "./components/Album.vue";
export default {
  components: {
    "app-search": Search,
    "app-album": Album
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

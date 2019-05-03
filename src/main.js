import Vue from 'vue';
import VueResource from 'vue-resource';
import App from './App.vue';
Vue.use(VueResource);
export const searchEventBus = new Vue({
  methods: {
    onArtistClick(data) {
      this.$emit('artistClicked',data);
    } 
  }
});
export const albumEventBus = new Vue({
  methods: {
    onAlbumClick(data) {
      this.$emit('albumClicked', data);
    }
  }
})


new Vue({
  el: '#app',
  render: h => h(App)
})

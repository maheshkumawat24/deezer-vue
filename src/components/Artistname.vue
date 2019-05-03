<template>
  <div class="search-result-txt">Search results for "{{artistName}}"</div>
</template>
<script>
    export default {
        props: {
            'artistName': {
                type: String,
                required: true
            }
        }
    }
</script>
<style scoped>
.search-result-txt {
  color: white;
  margin-top: 1rem;
  font-size: 1.5rem;
  border-bottom: 1px solid lightgray;
}
</style>
<template>

  <div class="pageMain">
    <wiki-page />
  </div>
  
</template>

<script>

import wikiPage from '../components/wikipage.vue'

export default {
  name: 'wikiText',

  components: {
    wikiPage,
  },
}
</script>
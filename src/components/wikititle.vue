<template>
  <div class="wiki-title-roup">
    <v-skeleton-loader v-if="loading" type="heading"></v-skeleton-loader>
    <h1 class="wiki-title" v-else>{{ title }}</h1>

    <wikitab />

    <v-divider></v-divider>

    <small class="wiki-subtitle">欢迎来到EGW，自由——开放——共享是我们最大的目标！</small>
  </div>
</template>

<script>
import wikitab from './wikitab.vue'

export default {

  name: 'wikititle',

  components: {
    wikitab,
  },

  props: {
    title: String,
    loading: Boolean
  }
}

</script>
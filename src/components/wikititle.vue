<template>
  <div class="wiki-title-roup">
    <v-skeleton-loader v-if="loading" type="heading"></v-skeleton-loader>
    <h1 class="wiki-title" v-else>{{ title }}

      <v-tooltip bottom v-if="protection.level >= 1">
        <template v-slot:activator="{ on, attrs }">
          <v-icon color="warning" dark v-bind="attrs" v-on="on">
            mdi-lock-outline
          </v-icon>
        </template>
        <span>本页面受到保护，等级{{ protection.level }}</span>
      </v-tooltip>

    </h1>

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
  mounted(){

  },

  props: {
    title: String,
    loading: Boolean,
    protection: {

      type: Object,

      default: function () {
      return { level: 0 }
    }

    }
  }
}

</script>
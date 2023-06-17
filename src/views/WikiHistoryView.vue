<template>
  <v-col cols="12">

    <wikititle :loading="loading" :title="wiki.title" />

    <v-list>
      <v-list-item v-for="(error, index) in errorReport" :key="index">
        <v-list-item-icon>
          <v-icon>mdi-alert-circle-outline</v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title>
            <span class="bender" style="color:gray">#{{ error.node }}</span> - {{ error.operation }}
          </v-list-item-title>
          <v-list-item-subtitle class="bender">[!] {{ error.error }}</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </v-list>

  </v-col>
</template>
<script>

import axios from 'axios'
import wikititle from '../components/wikititle.vue'

export default {
  name: 'wikiText',

  data: () => ({

    loading: false,
    wiki: {
      title: 'Title'
    },

    errorReport: [{
      node: 'param',
      operation: 'check',
      error: 'faild'
    }
    ],

  }),

  async mounted() {

    this.wiki.title = '页面历史：' + this.$route.params.pathMatch

  },

  components: {
    wikititle
  },

}
</script>
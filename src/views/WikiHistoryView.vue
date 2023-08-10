<template>
  <v-col cols="12">

    <wikititle :loading="loading" :title="wiki.title" />

    <v-list>
      <v-list-item v-for="(error, index) in history" :key="index">
        <!--
          <v-list-item-icon>
          <v-icon>mdi-alert-circle-outline</v-icon>
        </v-list-item-icon>
        -->

        <v-list-item-content>
          <v-list-item-title>
            <span class="bender" style="color:gray">{{ error.creator }}</span> - {{ error.comment }}
          </v-list-item-title>
          <v-list-item-subtitle class="bender"><v-icon small>mdi-calendar-clock</v-icon> {{ error.creation_time
          }}</v-list-item-subtitle>
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

    history: [{
      creator: 'param',
      comment: 'check',
      creation_time: 'faild'
    }
    ],

  }),

  async mounted() {

    this.wiki.title = '页面历史：' + this.$route.params.pathMatch

    try {

      this.history = await this.fetchWikiHistoryByTitle(this.$route.params.pathMatch)

    } catch (e) {

      this.$throwError('wiki', 'Acquisition of Wiki History', e)

    }

  },

  components: {
    wikititle
  },

  methods: {
    async fetchWikiHistoryByTitle(title) {

      try {

        let row = await axios.get(`${this.$globalApiURL}/wiki?action=getWikiHistory&title=${title}`)
        let wikiHistory = row.data

        console.log(wikiHistory)

        return (wikiHistory)

      } catch (e) {

        throw e

      }

    }
  }

}
</script>
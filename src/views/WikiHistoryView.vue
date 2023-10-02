<template>
  <v-col cols="12">

    <wikititle :loading="loading" :title="wiki.title" />

    <v-skeleton-loader v-if="loading" type="paragraph, image, paragraph"></v-skeleton-loader>

    <div class="history-page-msg" v-html="msg"></div>

    <v-list v-if="!loading && !isNotFound">
      <v-list-item v-for="(history, index) in history" :key="index">

        <v-list-item-content>

          <v-list-item-title>
            <span class="bender" style="color:gray">{{ history.creator }}</span> - {{ history.comment }}
          </v-list-item-title>

          <v-list-item-subtitle class="bender">
            <v-icon small>mdi-calendar-clock</v-icon> {{ history.creation_time }}
          </v-list-item-subtitle>

        </v-list-item-content>
      </v-list-item>

    </v-list>

    <div class="notFoundError" style="text-align: center;" v-if="isNotFound">
      <v-icon x-large>mdi-access-point-network-off</v-icon>
      <h1>PAGE NOT FOUND</h1>
    </div>

  </v-col>
</template>
<script>

import axios from 'axios'
import wikititle from '../components/wikititle.vue'

export default {
  name: 'wikiText',

  data: () => ({

    loading: true,
    wiki: {
      title: 'Title'
    },
    msg: '',

    history: [{
      creator: '',
      comment: '',
      creation_time: ''
    }
    ],

    isNotFound: false

  }),

  async mounted() {

    this.wiki.title = '页面历史：' + this.$route.params.pathMatch

    try {

      this.history = await this.fetchWikiHistoryByTitle(this.$route.params.pathMatch)

    } catch (e) {

      //this.$throwError('wiki', 'Acquisition of Wiki History', e)
      if (e.code == 'ERR_BAD_REQUEST') {

        this.isNotFound = true

      } else {

        this.$throwError('wiki', 'Acquisition of Wiki History', e)
        console.error(e)

      }

    }
    this.loading = false

  },

  components: {
    wikititle
  },

  methods: {
    async fetchWikiHistoryByTitle(title) {

      try {

        let row = await axios.get(`${this.$globalApiURL}/wiki?action=getWikiHistory&title=${title}`)
        let wikiHistory = row.data

        return (wikiHistory)

      } catch (e) {

        throw e

      }

    }
  }

}
</script>
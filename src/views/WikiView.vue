<template>
  <!--<wiki-page />-->
  <v-col cols="12">

    <wikititle :loading="loading" :title="wiki.title" :protection="wiki.protection" />

    <div class="wiki-main my-2">

      <v-skeleton-loader v-if="loading" type="paragraph, image, paragraph"></v-skeleton-loader>
      <div class="wiki-text my-2" v-else v-html="wiki.text"></div>

      <v-col class="category" v-if="!Object.keys(wiki.category).length == 0">
        <small>分类</small>
        <v-chip v-for="item in wiki.category" :key="item" class="ma-2" color="blue" label text-color="white">
          <v-icon left>
            mdi-label
          </v-icon>
          {{ item }}
        </v-chip>
      </v-col>

    </div>

  </v-col>
</template>

<script>

import axios from 'axios'
import wikititle from '../components/wikititle.vue'

export default {
  name: 'wikiText',

  data: () => ({

    wiki: {
      title: 'Title',
      text: '',
      category: [],

      protection: {
        level: 0
      }
    },

    snackbar: {
      status: false,
      color: 'primary',
      msg: ''
    },

    wiki_tab: 0,
    loading: true

  }),

  async mounted() {

    if (this.$route.params.pathMatch == '') window.location.href = this.$globalDefaultPage
    if (this.$route.params.pathMatch.endsWith('/')) window.location.href = this.$route.params.pathMatch.slice(0, -1)

    this.wiki.title = this.$route.params.pathMatch

    await this.fetchWikiContent()

  },

  watch: {
    '$route.params.pathMatch': async function (after, before) {

      this.loading = true

      if (after == '') {

        window.location.href = this.$globalDefaultPage

      } else {

        this.wiki.title = after

      }

      await this.fetchWikiContent()

    },
    'wiki_tab': async function (after, before) {

      if (after == before) return

      switch (after) {
        case 0:
          //wiki条目

          window.location.href = '/#/' + this.$route.params.pathMatch.replace(/\/discuss$/, '')
          break
        case 1:
          //wiki条目讨论页

          if (!this.$route.params.pathMatch.endsWith('/discuss')) window.location.href = '/#/' + this.$route.params.pathMatch + '/discuss'

          break
      }

    }

  },

  methods: {

    async fetchWikiContent() {

      const wikiTitle = this.$route.params.pathMatch
      this.wiki.title = wikiTitle

      try {

        const wikiContent = await this.fetchWikiByTitle(wikiTitle)
        this.wiki.text = wikiContent.content
        this.wiki.category = wikiContent.category
        this.wiki.protection.level = wikiContent.protection_level

      } catch (e) {

        if (e.code == 'ERR_BAD_REQUEST') {

          this.wiki.text = `<b>名为${wikiTitle}的页面不存在，你可以：创建此页面 或 搜索页面。</b>`

          this.wiki.category = []
          this.wiki.protection.level = 0

        } else {

          this.$throwError('wiki', 'Acquisition of Wiki Pages', e)
          console.error(e)

        }

      }

      this.loading = false

    },
    fetchWikiByTitle(title) {

      return new Promise(async (resolve, reject) => {

        axios
          .get(`${this.$globalApiURL}/wiki?title=${title}`)
          .then((res) => {
            
            resolve({
              content: res.data.pages.content,
              protection_level: res.data.pages.protection_level,
              category: res.data.categories,

            })


          }).catch(e => {

            reject(e)

          })

      })

    }

  },
  components: {
    wikititle
  },

}
</script>
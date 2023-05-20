<template>
  <v-container fluid>

    <v-snackbar v-model="snackbar.status" timeout="4000" text :color="snackbar.color">
      {{ snackbar.msg }}

      <template v-slot:action="{ attrs }">
        <v-btn color="primary" text v-bind="attrs" @click="snackbar.status = false">
          Close
        </v-btn>
      </template>
    </v-snackbar>


      <v-row>
        <v-col cols="12">

          <div class="wiki-title-roup">
            <h1 class="wiki-title">{{ wiki.title }}</h1>

            <template>

              <v-tabs v-model="wiki_tab" class="wiki-tabs">
                <v-tab>条目</v-tab>
                <v-tab>讨论</v-tab>

                <v-spacer></v-spacer>

                <v-tab>编辑</v-tab>
                <v-tab>历史</v-tab>
              </v-tabs>

            </template>

            <v-divider></v-divider>

            <small class="wiki-subtitle">欢迎来到EGW，自由——开放——共享是我们最大的目标！</small>
          </div>

          <div class="wiki-text my-2" v-html="wiki.text"></div>

        </v-col>

        <v-col class="category" v-if="!wiki.category">
          <v-card fluid outlined>
            <v-card-title><v-icon class="mx-1">mdi-folder</v-icon> 分类</v-card-title>
            <v-card-text>

              <v-chip v-for="item in wiki.category" :key="item" class="ma-2" color="blue" label text-color="white">
                <v-icon left>
                  mdi-label
                </v-icon>
                {{ item }}
              </v-chip>

            </v-card-text>
          </v-card>
        </v-col>

      </v-row>
  </v-container>
</template>

<script>

function showSnackBar(that, content, color = 'success') {

  that.snackbar.color = color
  that.snackbar.msg = content
  that.snackbar.status = true

}

import axios from 'axios'

export default {
  name: 'wikiPage',
  data: () => ({

    wiki: {
      title: 'Title',
      text: '',
      category: []
    },

    snackbar: {
      status: false,
      color: 'primary',
      msg: ''
    },

    wiki_tab: 0,

  }),
  async mounted() {

    if(this.$route.params.pathMatch == '') window.location.href = '/#/Homepage'
    if(this.$route.params.pathMatch.endsWith('/')) window.location.href = $route.params.pathMatch.slice(0, -1)

    await this.fetchWikiContent()

  },
  watch: {

    '$route.params.pathMatch': async function (after, before) {
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

          if(!this.$route.params.pathMatch.endsWith('/discuss')) window.location.href = '/#/' + this.$route.params.pathMatch + '/discuss'

          break
      }

    }

  },
  methods: {

    async fetchWikiContent() {

      const wikiTitle = this.$route.params.pathMatch
      this.wiki.title = wikiTitle

      try {

        const wikiContent = await getContentByTitle(this.$globalApiURL, wikiTitle)
        this.wiki.text = wikiContent.content
        this.wiki.category = wikiContent.category

      } catch (e) {

        console.log(e)

        if (e.code == 'ERR_BAD_REQUEST') {

          this.wiki.text = `<b>名为${wikiTitle}的页面不存在，你可以：创建此页面 或 搜索页面。</b>`
          this.wiki.category = []

        } else {

          showSnackBar(this, '出现错误，请重试', 'error')

        }

      }
    }
  },
}

function getContentByTitle(apiURL, title) {

  return new Promise(async (resolve, reject) => {

    axios
      .get(`${apiURL}/wiki?title=${title}`)
      .then((res) => {

        resolve({
          content: res.data.wiki.content,
          category: res.data.category
        })


      }).catch(e => {

        reject(e)

      })

  })

}
</script>
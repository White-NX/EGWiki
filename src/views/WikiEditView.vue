<template>
  <v-col cols="12">
    <wikititle :loading="loading" :title="'编辑中: ' + title" />

    <v-skeleton-loader v-if="loading" type="image"></v-skeleton-loader>
    <v-textarea v-else outlined name="input-7-4" label="edit" :value="value" class="my-1" rows="20"></v-textarea>

    <v-btn depressed color="primary">
      提交
    </v-btn>
    
    <p class="my-2">在提交之前，您必须确保您认同您即将发布的文本将遵循CC BY-NC-SA 3.0许可协议发布。</p>

  </v-col>
</template>

<script>
import wikititle from '@/components/wikititle.vue'
import axios from 'axios'

export default {
  data: () => ({

    loading: false,

    title: '',
    value: ''

  }),

  async mounted() {

    this.title = this.$route.params.pathMatch

    this.loading = true

    this.fetchWikiByTitle(this.$globalApiURL, this.title).then((row) => {

      this.value = row.content

    }).catch(e => {

      if (e.code != 'ERR_BAD_REQUEST') {

        this.$throwError('wiki', 'Acquisition of SORCE Wiki Pages', e)

      }

    }).finally(() => {

      this.loading = false

    })

  },

  methods: {

    async fetchWikiByTitle(apiURL, title) {

      return new Promise(async (resolve, reject) => {

        axios
          .get(`${apiURL}/wiki?title=${title}&source=false`)
          .then((res) => {

            resolve({
              content: res.data.pages[0].content,
              category: res.data.category
            })


          }).catch(e => {

            reject(e)

          })

      })

    }

  },

  components: {
    wikititle
  }

}
</script>
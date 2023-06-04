<template>
  <v-col cols="12">
    <wikititle :loading="loading" :title="'编辑中: ' + title" />

    <v-skeleton-loader v-if="loading" type="image"></v-skeleton-loader>
    <v-textarea v-else outlined name="input-7-4" label="edit" :value="value" class="my-2" rows="20"></v-textarea>
    
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

    this.fetchWikiByTitle(this.$globalApiURL, this.title).then((row)=>{

      this.value = row.content

    }).catch(e=>{

      console.error(e)

    }).finally(()=>{

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
              content: res.data.wiki.content,
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
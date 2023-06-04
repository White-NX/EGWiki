<template>
  <v-tabs v-model="wiki_tab" class="wiki-tabs">
    <v-tab>条目</v-tab>
    <v-tab>讨论</v-tab>

    <v-spacer></v-spacer>

    <v-tab>编辑</v-tab>
    <v-tab>历史</v-tab>
  </v-tabs>
</template>

<script>

export default {
  name: 'wikitab',

  data: () => ({

    wiki_tab: 0

  }),
  watch: {
    'wiki_tab': async function (after, before) {

      switch (after) {
        case 0:
          //wiki条目

          window.location.href = '/#/' + this.$route.params.pathMatch.replace(/\/discuss$/, '')

          break
        case 1:
          //wiki条目讨论页

          if (!this.$route.params.pathMatch.endsWith('/discuss')) window.location.href = '/#/' + this.$route.params.pathMatch + '/discuss'

          break
        case 2:
          //wiki编辑页

          window.location.href = '/#/edit/' + this.$route.params.pathMatch
      }

    }
  },
  mounted() {

    if (window.location.hash.split('/')[1] == 'edit') this.wiki_tab = 2

  }
}
</script>
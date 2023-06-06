<template>
  <v-col cols="12">

    <wikititle :loading="loading" :title="wiki.title" />
    <v-card>
      <v-card-text class="py-0">
        <v-timeline dense>
          <v-slide-x-reverse-transition group hide-on-leave>
            <v-timeline-item color="primary" key="1" small fill-dot>
              <v-alert :value="true" color="primary" icon="mdi-pen" class="white--text">
                <div class="efail-banner-updates mx-9">
                  <div class="efail-banner-updates-1">
                    <div class="efail-banner-updates-title">13<span></span>
                      <div>27</div>
                    </div>
                  </div>
                </div>
                Lorem ipsum dolor sit amet, no nam oblique veritus. Commune scaevola imperdiet nec ut, sed euismod
                convenire
                principes at. Est et nobis iisque percipit, an vim zril disputando voluptatibus, vix an salutandi
                sententiae.

                <v-divider class="theme--dark my-2"></v-divider>

                <div style="display:inline-flex">

                  <v-chip close-icon="mdi-close-outline"> <v-icon
                      left>mdi-account-circle-outline</v-icon>:OPERATOR:</v-chip>

                  <v-spacer></v-spacer>

                  <v-btn class="mx-2" color="white">预览</v-btn>
                  <v-btn class="mx-2 white--text" color="red">回退</v-btn>

                </div>

              </v-alert>
            </v-timeline-item>
          </v-slide-x-reverse-transition>
        </v-timeline>
      </v-card-text>
    </v-card>

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
    }

  }),

  async mounted() {

    this.wiki.title = '页面历史：' + this.$route.params.pathMatch

  },

  components: {
    wikititle
  },

}
</script>
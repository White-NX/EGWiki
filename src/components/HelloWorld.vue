<template>
  <v-row>
    <v-col class="main">
      <v-layout wrap>
        <v-flex lg8 xs12>
          <v-col class="mb-4">
            <h1 class="display-2 font-weight-bold mb-3">
              欢迎来到EGW <b>WORKSTATION</b>
            </h1>
            <p class="subheading font-weight-regular">
              EGW WORKSTATION是一个帮助开发者进行短代码开发建立的简易平台。致力于通过简单、功能丰富的框架维持EGW短代码的运行。
            </p>
            <p>[heimu]当然，这家伙不稳定的时候也很多（:P[/heimu]</p>
          </v-col>
        </v-flex>
        <v-flex lg4 xs12>
          <v-card>
            <template slot="progress">
              <v-progress-linear color="deep-purple" height="10" indeterminate></v-progress-linear>
            </template>
            <v-card-title>当前WORKSTATION：</v-card-title>
            <v-card-text>
              <div style="color: black;">拥有<b><span class="strong">数量</span></b>个<br>正在运行的短代码；<br><br>
                当前，框架总量大小为：<br><b><span class="strong">大小</span></b>Kib
              </div>
            </v-card-text>
            <v-divider class="mx-4"></v-divider>
          </v-card>
          <br>
          <v-card>
            <template slot="progress">
              <v-progress-linear color="deep-purple" height="10" indeterminate></v-progress-linear>
            </template>
            <v-card-title>
              <h3>搜索WORKSTATION的短代码</h3>
            </v-card-title>
            <v-card-text>
              <div>
                <template>
                  <v-text-field>
                    <v-icon slot="prepend" color="black">
                      mdi-magnify
                    </v-icon>
                  </v-text-field>
                </template>
              </div>
            </v-card-text>
            <v-divider class="mx-4"></v-divider>
          </v-card>
        </v-flex>
      </v-layout>
      <v-col class="mb-5" cols="12">
        <h2 class="headline font-weight-bold mb-3">
          What's next?
        </h2>

        <v-row justify="center">
          <a v-for="(next, i) in whatsNext" :key="i" :href="next.href" class="subheading mx-3" target="_blank">
            {{ next.text }}
          </a>
        </v-row>
      </v-col>

      <v-col class="mb-5" cols="12">
        <h2 class="headline font-weight-bold mb-3">
          Important Links
        </h2>

        <v-row justify="center">
          <a v-for="(link, i) in importantLinks" :key="i" :href="link.href" class="subheading mx-3" target="_blank">
            {{ link.text }}
          </a>
        </v-row>
      </v-col>

      <v-col class="mb-5" cols="12">
        <h2 class="headline font-weight-bold mb-3">
          Ecosystem
        </h2>

        <v-row justify="center">
          <a v-for="(eco, i) in ecosystem" :key="i" :href="eco.href" class="subheading mx-3" target="_blank">
            {{ eco.text }}
          </a>
        </v-row>
      </v-col>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: 'HelloWorld',

  data: () => ({
    ecosystem: [
      {
        text: 'vuetify-loader',
        href: 'https://github.com/vuetifyjs/vuetify-loader',
      },
      {
        text: 'github',
        href: 'https://github.com/vuetifyjs/vuetify',
      },
      {
        text: 'awesome-vuetify',
        href: 'https://github.com/vuetifyjs/awesome-vuetify',
      },
    ],
    importantLinks: [
      {
        text: 'Documentation',
        href: 'https://vuetifyjs.com',
      },
      {
        text: 'Chat',
        href: 'https://community.vuetifyjs.com',
      },
      {
        text: 'Made with Vuetify',
        href: 'https://madewithvuejs.com/vuetify',
      },
      {
        text: 'Twitter',
        href: 'https://twitter.com/vuetifyjs',
      },
      {
        text: 'Articles',
        href: 'https://medium.com/vuetify',
      },
    ],
    whatsNext: [
      {
        text: 'Explore components',
        href: 'https://vuetifyjs.com/components/api-explorer',
      },
      {
        text: 'Select a layout',
        href: 'https://vuetifyjs.com/getting-started/pre-made-layouts',
      },
      {
        text: 'Frequently Asked Questions',
        href: 'https://vuetifyjs.com/getting-started/frequently-asked-questions',
      },
    ],
  }),
}
</script>

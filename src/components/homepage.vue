<template>
  <v-row>
    <v-col class="pageMain">
      <v-layout wrap>
        <v-flex lg8 xs12>
          <v-col class="mb-4">
            <h1 class="display-2 font-weight-bold mb-3">
              欢迎来到EGW <b>WORKSTATION</b>
            </h1>
            <p class="subheading font-weight-regular">
              EGW WORKSTATION是一个帮助EGW开发者进行短代码开发和开源而建立的简易平台。致力于通过简单、功能丰富的框架维持EGW短代码的运行。
            </p>
            <p>[heimu]当然，这家伙不稳定的时候也很多（:P[/heimu]</p>
          </v-col>
          <v-card style="margin: 10px">
            <template slot="progress">
              <v-progress-linear color="deep-purple" height="10" indeterminate></v-progress-linear>
            </template>
            <v-card-title>许可协议<v-icon slot="prepend" color="black">
                mdi-license
              </v-icon></v-card-title>
            <v-card-text>
              <div style="color: black;">
                [heimu]开源！开源！还是██的开源！[/heimu]<br>本站所有的开放源代码都使用GPL许可协议进行开源。当您任何以形式修改本站公开源代码时，您必须保证它不是闭源的，并且必须采用GPL许可协议进行开源。
                <br>
                <v-divider></v-divider>
                <br>
                <h3>技术栈</h3>
                <v-chip class="ma-2" color="yellow">
                  <v-icon left>
                    mdi-language-javascript
                  </v-icon>
                  <b>javascript</b>：标签识别与执行
                </v-chip>
                <v-chip class="ma-2" color="green">
                  <v-icon left>
                    mdi-vuejs
                  </v-icon>
                  <b>Vuejs</b>：本站前端
                </v-chip>
              </div>
            </v-card-text>
            
          </v-card>
        </v-flex>
        <v-flex lg4 xs12>
          <v-card>
            <template slot="progress">
              <v-progress-linear color="deep-purple" height="10" indeterminate></v-progress-linear>
            </template>
            <v-card-title>当前WORKSTATION：</v-card-title>
            <v-card-text>
              <div style="color: black;">拥有<b><span class="strong">{{
                stati_data['labelNum']
              }}</span></b>个<br>正在运行的短代码；<br><br>
                当前，框架总量大小为：<br><b><span class="strong">{{ stati_data['totalSize'] }}</span></b>Kb
              </div>
            </v-card-text>
            
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
              使用内置搜索器搜索（不支持源代码搜索）
              <div>
                <template>
                  <v-text-field id="search">
                    <v-icon slot="prepend" color="black">
                      mdi-magnify
                    </v-icon>
                  </v-text-field>
                </template>
              </div>
            </v-card-text>
          </v-card>
        </v-flex>
      </v-layout>

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
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: 'mainText',

  data: () => ({
    stati_data: {
      'totalSize': '1.0',
      'labelNum': '2'
    },
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

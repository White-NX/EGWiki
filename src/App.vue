<template>
  <v-app>
    <v-app-bar app elevation="2" outlined class="blurred" dark color="primary">
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>

      <div class="d-flex">
        <span class="strong"><b>EGW</b>
        </span>
      </div>

      <v-text-field label="搜索" dense class="search-bar mx-4" hide-details outlined clearable style="max-width:300px;"
        prepend-inner-icon="mdi-magnify-expand"></v-text-field>

      <v-spacer></v-spacer>

      <ThrowError :error-report="errorReport" :on-throw-error="onThrowError" />

      <template v-if="isUserLogin">

        <v-menu open-on-hover bottom offset-y :close-on-content-click="false">
          <template v-slot:activator="{ on, attrs }">
            <v-avatar color="black" size="45" v-bind="attrs" v-on="on">W</v-avatar>
          </template>

          <v-card width="400">
            <v-card-text>

              <v-card flat class="user-id-card">
                <v-card-text>
                  <v-list-item>
                    <v-list-item-icon>
                      <v-avatar color="primary" size="60">W</v-avatar>
                    </v-list-item-icon>

                    <v-list-item-content>
                      <v-list-item-title>
                        {{ loginUsername }}
                      </v-list-item-title>
                      <v-list-item-subtitle class="bender"># 权限组</v-list-item-subtitle><v-btn
                        outlined><v-icon>mdi-account-cog-outline</v-icon> 管理账户</v-btn>
                    </v-list-item-content>
                  </v-list-item>
                </v-card-text>
              </v-card>

              <v-list>
                <template v-for="(menuItems, menuCategory) in userOptions">
                  <v-list-group :key="menuCategory" no-action>
                    <template v-slot:activator>
                      <v-list-item-content>
                        <v-list-item-title>{{ menuCategory }}</v-list-item-title>
                      </v-list-item-content>
                    </template>

                    <v-list-item v-for="(menuItem, index) in menuItems" :key="index" @click="navigateTo(menuItem.url)">
                      <v-list-item-content>
                        <v-list-item-title>{{ menuItem.name }}</v-list-item-title>
                      </v-list-item-content>
                    </v-list-item>
                  </v-list-group>
                </template>
              </v-list>

              <v-divider class="my-1"></v-divider>

              <v-btn block large elevation="0"><v-icon>mdi-logout</v-icon> 退出登录</v-btn>

            </v-card-text>
          </v-card>
        </v-menu>

        <v-btn text icon @click="$vuetify.theme.dark = !$vuetify.theme.dark"><v-icon>mdi-theme-light-dark</v-icon></v-btn>

      </template>
      <loginDialog :dialog="dialog" v-else></loginDialog>

    </v-app-bar>

    <v-navigation-drawer v-model="drawer" left app permanent class="wiki-sidebar">

      <v-list-item class="wiki-sidebar-title">
        <v-list-item-content>

          <v-list-item-title class="text-h6">
            Eyling GalgameWiki
          </v-list-item-title>

          <v-list-item-subtitle>
            欢迎来到EGW！
          </v-list-item-subtitle>

        </v-list-item-content>
      </v-list-item>

      <sidebar :items="items" :scheme="scheme"></sidebar>

    </v-navigation-drawer>

    <v-main>
      <router-view />
    </v-main>

    <v-footer padless>
      <v-col class="text-center" cols="12">
        {{ new Date().getFullYear() }} — <strong>Eyling GalgameWiki</strong>
      </v-col>
    </v-footer>
  </v-app>
</template>

<script>
import axios from 'axios'
import Cookies from 'js-cookie'
import store from './plugins/store'
import throwError from '@/components/throwError.vue'
import ThrowError from '@/components/throwError.vue'

import loginDialog from '@/components/topbarFunctions/loginDialog.vue'
import sidebar from '@/components/topbarFunctions/sidebar.vue'

export default {
  name: "App",
  data: () => ({
    dialog: false,

    onThrowError: false,
    errorReport: [],

    drawer: false,
    items: [
      { title: "主页", icon: "mdi-home-outline", url: "/#/" },
      { title: "关于", icon: "mdi-information-outline", url: "/#/about" },
    ],
    scheme: [
      {
        topic: "其他",
        items: [
          { title: "帮助", icon: "mdi-home-outline", url: "/#/help" },
          { title: "关于", icon: "mdi-information-outline", url: "/#/about" },
        ]
      }
    ],

    userOptions: {
      "站点": [
        { "name": "关注页面", "url": "https://example.com" },
        { "name": "贡献", "url": "https://example.com" }
      ],
      "我": [
        { "name": "消息", "url": "……" }
      ]
    },

  }),
  async mounted() {
    await this.setDrawerState();
    this.$dataBus.$on("throwError", (error) => {
      this.errorReport.push(error);
      this.onThrowError = true;
    });
  },
  computed: {
    isUserLogin() {
      if (Cookies.get("username") != undefined) {
        store.commit("setLoginState", {
          isLogin: true,
          username: Cookies.get("username"),
          session: Cookies.get('sessionKey')
        });
        return true;
      }
      else {
        store.commit("setLoginState", {
          isLogin: false,
          username: Cookies.get("username")
        });
        return false;
      }
    },
    loginUsername() {
      return Cookies.get("username");
    }
  },
  methods: {
    submitForm() {
      this.isvalid = true;
      axios.post(this.$globalApiURL + "/auth?type=login", {
        username: this.username,
        password: this.password
      }).then(res => {
        var obj = res.data;
        switch (obj.errorCode) {
          case "011/012":
            this.loginFaildReason = "用户名或密码错误";
            this.loginFaild = true;
            break;
          case 200:
            this.loginFaild = false;
            this.loginSuccess = true;
            Cookies.set("username", obj.username, {
              expires: 7
            });
            Cookies.set("sessionKey", obj.sessionKey, {
              expires: 7
            });
            location.reload(true);
            break;
        }
      }).catch((e) => {
        if (e.response != 200) {
          this.loginFaild = true;
          this.loginFaildReason = e;
        }
      });
    },
    validates() {
      //this.isvalid = this.$refs.loginForm.validate();
    },
    logout() {
      Cookies.remove("username");
      Cookies.remove("sessionKey");
      location.reload(true);
    },
    async setDrawerState() {
      if (this.$vuetify.breakpoint.smAndDown) {
        this.drawer = false; // 在小屏幕上收起侧边栏
      }
      else {
        this.drawer = true; // 在大屏幕上展开侧边栏
      }
    },
  },
  comments: {
    throwError
  },
  components: { ThrowError, loginDialog, sidebar }
}
</script>

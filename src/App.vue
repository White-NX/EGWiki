<template>
  <v-app>
    <v-app-bar app elevation="2" outlined class="blurred" dark color="primary">
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <div class="d-flex">
        <span class="strong"><b>工作站</b>
        </span>
      </div>
      <v-spacer></v-spacer>
      <v-dialog v-model="dialog" persistent max-width="320">
        <template v-slot:activator="{ on, attrs }" v-if="!isUserLogin">
          <v-btn text v-bind="attrs" v-on="on">
            <span class="mr-2">管理员登录</span>
            <v-icon>
              mdi-security
            </v-icon>
          </v-btn>
        </template>
        <v-card>
          <v-card-title class="text-h5">
            登录
          </v-card-title>
          <v-card-text>欢迎您来到Eyling GalgameWiki！</v-card-text>
          <v-card-text>
            <v-alert dense outlined type="error" v-if="loginFaild">
              登录失败。{{ loginFaildReason }}
            </v-alert>
            <v-alert dense text type="success" v-if="loginSuccess">
              <strong>登录成功！</strong>欢迎回来，主人
            </v-alert>
            <div class="form-data">
              <v-form ref="loginForm" @input="validates">
                <v-text-field label="账号" :rules="usernameRules" hide-details="auto" v-model="username"></v-text-field>
                <v-text-field label="密码" :rules="passwordRules" hide-details="auto" type="password"
                  v-model="password"></v-text-field>
                <br>
                <v-btn color="red darken-1" text @click="dialog = false">
                  取消
                </v-btn>
                <v-btn color="primary darken-1" text :disabled="!isvalid" @click="submitForm">
                  登录
                </v-btn>
              </v-form>
            </div>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
          </v-card-actions>
        </v-card>
      </v-dialog>

      <v-btn v-if="isUserLogin" text>
        {{ loginUsername }}
      </v-btn>
      <v-btn v-if="isUserLogin">
        <span class="mr-2">管理</span>
        <v-icon>
          mdi-security
        </v-icon>
      </v-btn>
    </v-app-bar>
    <v-navigation-drawer v-model="drawer" left fixed temporary>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="text-h6">
            EGW Workstation
          </v-list-item-title>
          <v-list-item-subtitle>
            欢迎来到EGW！
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
      <v-list dense nav v-for="item in items" :key="item.title" link>
        <v-list-item :href="item.url">
          <v-list-item-icon><v-icon>{{ item.icon }}</v-icon></v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
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

export default {
  name: 'App',
  data: () => ({
    dialog: false,
    username: '',
    password: '',
    loginFaildReason: '',
    loginFaild: false,
    loginSuccess: '',
    isvalid: true,
    usernameRules: [
      v => !!v || '用户名必填',
      v => (v && v.length <= 20) || '用户名必须少于20位'
    ],
    passwordRules: [
      v => !!v || '密码必填',
      v => (v && v.length <= 30) || '密码必须少于30位'
    ],
    formValid: true,

    drawer: false,
    items: [
      { title: '主页', icon: 'mdi-home-outline', url: '/#/' },
      { title: '关于', icon: 'mdi-information-outline', url: '/#/about' },
    ]
  }),
  computed: {
    isUserLogin() {
      if (Cookies.get('username') != undefined) {

        store.commit('setLoginState', {
          isLogin: true,
          username: Cookies.get('username')
        })

        return true
      } else {
        store.commit('setLoginState', {
          isLogin: false,
          username: Cookies.get('username')
        })

        return false
      }
    },
    loginUsername() {

      return Cookies.get('username')

    }
  },
  methods: {
    submitForm() {
      console.log('try to login')
      this.isvalid = true
      axios.post(this.$globalApiURL + '/auth?type=login', {
        username: this.username,
        password: this.password
      }).then(res => {

        var obj = res.data

        switch (obj.errorCode) {
          case '011/012':
            this.loginFaildReason = '用户名或密码错误'
            this.loginFaild = true

            break
          case '200':
            this.loginFaild = false
            this.loginSuccess = true

            Cookies.set('username', obj.username, {
              expires: 7
            })
            Cookies.set('sessionKey', obj.sessionKey, {
              expires: 7
            })

            location.reload(true)
            break
        }

      }).catch((e) => {
        if (e.response != 200) {
          this.loginFaild = true
          this.loginFaildReason = e
        }
      })
    },
    validates() {
      this.isvalid = this.$refs.loginForm.validate()
    },
    logout() {
      Cookies.remove('username')
      Cookies.remove('sessionKey')

      location.reload(true)
    }
  },
  mounted() {



  }

}
</script>

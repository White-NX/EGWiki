<template>
  <v-dialog v-model="dialog" persistent max-width="320">

    <template v-slot:activator="{ on, attrs }">
      <v-btn text v-bind="attrs" v-on="on">
        <span class="mr-2">登录</span>
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
          <strong>登录成功！</strong>欢迎回来！
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
</template>
<script>
import axios from 'axios'
import Cookies from 'js-cookie'
import store from '@/plugins/store'
import throwError from '@/components/throwError.vue'
import ThrowError from '@/components/throwError.vue'

export default {
  name: "loginDialog",
  props: {
    dialog: Boolean,
    isUserLogin: Boolean
  },
  data: () => ({
    username: "",
    password: "",
    loginFaildReason: "",
    loginFaild: false,
    loginSuccess: "",
    isvalid: true,

    usernameRules: [
      v => !!v || "用户名必填",
      v => (v && v.length <= 20) || "用户名必须少于20位"
    ],
    passwordRules: [
      v => !!v || "密码必填",
      v => (v && v.length <= 30) || "密码必须少于30位"
    ],
    formValid: true,

  }),
  methods: {
    submitForm() {
      this.isvalid = false;
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
      }).finally(() => {
        this.isvalid = true
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
  },
}

</script>
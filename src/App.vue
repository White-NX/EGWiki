<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <div class="d-flex">
        <span class="strong"><b>WORKST</b>
        </span>
      </div>
      <v-spacer></v-spacer>
      <v-dialog v-model="dialog" persistent max-width="290">
        <template v-slot:activator="{ on, attrs }">
          <v-btn text v-bind="attrs" v-on="on">
            <span class="mr-2">管理员登录</span>
            <v-icon>
              mdi-security
            </v-icon>
          </v-btn>
        </template>
        <v-card>
          <v-card-title class="text-h5">
            管理员身份登录
          </v-card-title>
          <v-card-text>由于Label的危险性，一般用户将不被允许修改Label。管理员则需要<b>指定的账号密码登录</b>。</v-card-text>
          <v-card-text>
            <div class="form-data">
              <v-form ref="loginForm" @input="validates">
                <v-text-field label="账号" :rules="usernameRules" hide-details="auto" v-model="username"></v-text-field>
                <v-text-field label="密码" :rules="passwordRules" hide-details="auto" type="password" v-model="password"></v-text-field>
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
      <v-btn href="https://eyling.top" target="_blank" text>
        <span class="mr-2">回到主站</span>
        <v-icon>mdi-open-in-new</v-icon>
      </v-btn>
    </v-app-bar>

    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: 'App',
  data: () => ({
    dialog: false,
    username: '',
    password: '',
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
  }),
  computed: {
    isUserLogin() {
      return false;
    },
  },
  methods: {
    submitForm() {
      console.log('try to login');
      if (!this.valid) {
        return {
          dialog: false
        }
      }
    },
    validates (){
      this.isvalid = this.$refs.loginForm.validate();
    },
  },
  mounted(){
    this.validates();
  }
};
</script>

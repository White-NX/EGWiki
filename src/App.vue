<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark
    >
      <div class="d-flex">
        <span class="strong">EGW | <b>WORKSTATION</b>
          </span>
      </div>

      <v-spacer></v-spacer>

      <v-btn
        href="https://eyling.top"
        target="_blank"
        text
      >
        <span class="mr-2">回到主站</span>
        <v-icon>mdi-open-in-new</v-icon>
      </v-btn>
    </v-app-bar>

    <v-main>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>


export default {
  name: 'App',

  data: () => ({
    //
  }),
};
</script>

<template>
  <v-container fluid>
    <v-row>
      <div class="pageMain">
        <h1>DEBUG</h1>
        <p>{{ JSON.stringify(this.$store.state) }}</p>
      </div>
    </v-row>
  </v-container>
</template>

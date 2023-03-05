<template>
  <v-container fluid>
    <v-row>
      <v-col>
        <div class="pageMain">
          <h1>DEBUG</h1>
          <p>{{ JSON.stringify(this.$store.state) }}</p>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

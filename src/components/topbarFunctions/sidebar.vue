<template>
  <v-list dense nav class="wiki-sidebar-menu">
    <v-list-item v-for="item in items" :key="item.title" :href="item.url">
      <v-list-item-icon>
        <v-icon>{{ item.icon }}</v-icon>
      </v-list-item-icon>

      <v-list-item-content>
        <v-list-item-title>{{ item.title }}</v-list-item-title>
      </v-list-item-content>
    </v-list-item>

    <div v-if="scheme" v-for="item in scheme" :key="item.topic">

      <v-list-item>
        <v-list-item-subtitle>
          {{ item.topic }}
          <v-divider></v-divider>
        </v-list-item-subtitle>
      </v-list-item>

      <v-list-item v-for="items in item.items" :href="items.url" :key="items.title">
        <v-list-item-icon>
          <v-icon>{{ items.icon }}</v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title>{{ items.title }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </div>

    <v-card outlined class="powered-card my-2" href="https://github.com/White-NX/zeroSuono.js">
      <v-card-text class="text-center">
        由 <strong>ZeroSuono.js</strong> 构建
      </v-card-text>
    </v-card>

  </v-list>
</template>
<script>
export default {
  name: 'sidebar',
  props: {
    items: Array,
    scheme: Array
  },
}
</script>
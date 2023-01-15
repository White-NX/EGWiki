<template>
  <v-col class="pageMain">
    <monaco :codes="content" :readOnly="false" :current="corrent">
    </monaco>
  </v-col>
</template>

<script>
export default {
  name: 'editpage',

  data: () => ({
    dialog: false,
    content: 'console.log("wow")',
  }),
}
</script>
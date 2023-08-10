<template>
  <v-dialog v-model="onThrowError" max-width="500">

    <v-card>
      <v-card-title class="text-h5 striped-bg-error">
        <v-icon color="white" class="mx-1">mdi-alert</v-icon> <span style="color:white">数据同步失败</span>
      </v-card-title>

      <v-card-text class="my-2">

        <span class="subtitle-1">试图通过标准互联网链接与EGW骨干网络进行同步时失败。部分资源缺失或无法获取：</span>
        <v-divider class="my-1"></v-divider>

        <v-list>
          <v-list-item v-for="(error, index) in errorReport" :key="index">
            <v-list-item-icon>
              <v-icon>mdi-alert-circle-outline</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>
                <span class="bender" style="color:gray">#{{ error.node }}</span> - {{ error.operation }}
              </v-list-item-title>
              <v-list-item-subtitle class="bender">[!] {{ error.error }}</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-list>

      </v-card-text>

      <v-divider></v-divider>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary" text @click="refleshPage()">
          <v-icon>mdi-refresh</v-icon> Re-Link
        </v-btn>

      </v-card-actions>
    </v-card>

  </v-dialog>
</template>

<script>
export default {
  name: 'throwError',

  data: () => ({
  }),
  props: {
    errorReport: Array,
    onThrowError: Boolean
  },
  methods: {
    refleshPage() {
      location.reload();
    }
  }

}
</script>
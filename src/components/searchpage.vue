<template>
  <v-col class="pageMain">
    <v-card style="width:100%" elevation outlined class="normalShadow">
      <v-card-text>
        <v-layout>
          <v-flex>
            <v-text-field label="搜索" hide-details="auto">
              <v-icon slot="prepend">
                mdi-magnify
              </v-icon>
            </v-text-field>
          </v-flex>
          <v-btn slot="append" dark large>搜索</v-btn>
        </v-layout>
        <v-divider class="my-2"></v-divider>
        共{{ result_number }}个结果
      </v-card-text>
    </v-card>

    <v-col lg="6" md="6" sm="12" xs="12" v-for="item in items" :key="item.name">
      <v-card elevation-0 outlined>
        <v-card-title>
          <a :href="'/#/edit?label=' + item.name">{{ item.name }}</a><v-icon small class="mx-1">mdi-open-in-new</v-icon>
          <v-chip color="indigo" text-color="white" small>
            <v-avatar left>
              <v-icon>mdi-account-circle</v-icon>
            </v-avatar>
            {{ item.author }}
          </v-chip>
        </v-card-title>
        <v-card-text>
          {{ item.description }}
        </v-card-text>
      </v-card>
    </v-col>

    <template>
      <div class="text-center my-2">
        <v-pagination v-model="page" :length="6"></v-pagination>
      </div>
    </template>

  </v-col>
</template>

<script>
export default {
  name: 'searchPage',

  data: () => ({
    result_number: 1145141,
    page: 1,
    items: [
      {
        name: 'heimu',
        author: 'WhiteNX',
        description: '[heimu]是一个用于在页面上展示黑幕的label.'
      },
      {
        name: 'steam',
        author: 'WhiteNX',
        description: '[steam]是一个在页面上展示steam购买链接的label，方便用户浏览steam商店。'
      }
    ]
  }),
}
</script>

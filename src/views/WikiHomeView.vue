<template>
  <v-container fluid align-center>
    <v-row>
      <v-col class="my-2">
        <v-row>

          <v-col md="8" sm="12" xs="8" cols="12">
            <center>
              <h1 class="my-1">欢迎来到Eyling GalgameWiki！
                <v-chip class="ma-2" color="primary" label>
                  <v-icon left>
                    mdi-alpha
                  </v-icon>
                  αlpha测试
                </v-chip>
              </h1>
            </center>

            <v-col>
              <v-card outlined elevation>
                <v-card-title><v-icon class="mx-1">mdi-decagram-outline</v-icon><strong>快来看看！</strong></v-card-title>
                <v-card-text>

                  <h2>Braban! -The bonds of melody-，柚子社的起源之作。</h2>

                  <v-row>

                    <v-col cols="4">
                      <v-card><v-img src="https://picsum.photos/id/66/300/200" height="auto"></v-img></v-card>
                    </v-col>

                    <v-col cols="8">
                      主角香住纯所就读的赤城山学园由于学生人数过少，而被迫在他升高二的那一年开始与县立圆山学园合并。理所当然他所属的管乐部也要合并。可是，圆山学园管乐部却以＂不接受程度低下的社员入部＂为由而拒绝，于是赤城山学园管乐部的顾问老师新开地和音向圆山学园管乐部提出挑战：在5月的音乐祭中演奏分数较低的一方就必须废部。

                      <br /><br />圆山学园管乐部曾在去年的县大会获得银牌，新学期成为赤城山学园管乐部部长的纯，该如何率领部员们逃过被废部的危机？
                    </v-col>

                  </v-row>

                  <v-btn block large outlined elevation class="my-2">查看更多！</v-btn>
                </v-card-text>
              </v-card>
            </v-col>

            <v-col>
              <v-card outlined elevation>
                <v-card-title><v-icon class="mx-1">mdi-star-four-points</v-icon><strong>柚子社专题</strong></v-card-title>
                <v-card-text>

                  YUZUSOFT（日语：ゆずソフト）是日本ユノス公司的成人游戏品牌，通称柚子社。

                  <v-container>
                    <v-row>
                      <v-col cols="12" md="4" v-for="(topics, index) in movies" :key="index">
                        <v-card>
                          <v-img :src="topics.image" height="300px"></v-img>
                          <v-card-title>{{ topics.title }}</v-card-title>
                          <v-card-text>{{ topics.description }}</v-card-text>
                        </v-card>
                      </v-col>
                    </v-row>
                  </v-container>

                  <v-btn block large outlined elevation class="my-2">查看更多！</v-btn>
                </v-card-text>
              </v-card>
            </v-col>

          </v-col>

          <v-col md="4" sm="12" xs="4" cols="12">
            <v-card elevation outlined class="tranShadow my-2" href="/#/wiki">
              <div class="center">
                <v-card-title><v-icon large class="mx-1">mdi-plus</v-icon>新建条目！</v-card-title>
                <v-card-text class="center"><i>灵感正在迸发！</i></v-card-text>
              </div>
            </v-card>
            <v-card>
              <v-card-title>最近修改</v-card-title>
              <v-card-text>

                <v-list dense nav>
                  <v-list-item v-for="item in items" :key="item.title" link>
                    <v-list-item-icon>
                      <v-icon>{{ item.icon }}</v-icon>
                    </v-list-item-icon>
                    <v-list-item-content>
                      <v-list-item-title>{{ item.title }}</v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                </v-list>
              </v-card-text>
            </v-card>

          </v-col>
        </v-row>

      </v-col>
    </v-row>

  </v-container>
</template>

<script>
export default {
  data() {
    return {
      colors: [
        'indigo',
        'warning',
        'pink darken-2',
        'red lighten-1',
        'deep-purple accent-4',
      ],
      slides: [
        'First',
        'Second',
        'Third',
        'Fourth',
        'Fifth',
      ],
      items: [
        { title: 'Dashboard', icon: 'mdi-view-dashboard' },
        { title: 'Photos', icon: 'mdi-image' },
        { title: 'About', icon: 'mdi-help-box' },
        { title: 'wow', icon: 'mdi-view-dashboard' },
        { title: 'pit', icon: 'mdi-image' },
        { title: 'math', icon: 'mdi-help-box' },
      ],
      right: null,
      movies: [
        {
          title: '流浪地球',
          description: '一部中国科幻电影，讲述了人类为了拯救地球，决定采取摧毁地球的方法，将地球推出太阳系的故事。',
          image: 'https://picsum.photos/id/66/300/200'
        },
        {
          title: '盗梦空间',
          description: '一部科幻电影，讲述了一群人利用潜意识进入他人梦境，从而实现盗取梦境主人的秘密的故事。',
          image: 'https://picsum.photos/id/80/300/200'
        },
        {
          title: '盗梦空间',
          description: '一部科幻电影，讲述了一群人利用潜意识进入他人梦境，从而实现盗取梦境主人的秘密的故事。',
          image: 'https://picsum.photos/id/80/300/200'
        },
      ],

    }
  }
}
</script>
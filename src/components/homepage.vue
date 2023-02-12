<template>
  <v-container fluid>
    <v-row>
      <div class="pageMain">
        <center>
          <h1 class="my-4">欢迎来到EGW WORKSTATION</h1>
          <p>EGW WORKSTATION是一个致力于改善Eyling GalgameWiki短代码开发环境的开发平台。<br>是Eyling GalgameWiki基础设施建设计划的一部分。</p>
        </center>

        <v-col cols="12">
          <v-card style="width:100%" elevation outlined class="normalShadow">
            <v-card-text>以此开始：
              <v-layout>
                <v-flex>
                  <v-text-field label="搜索" hide-details="auto">
                    <v-icon slot="prepend">
                      mdi-magnify
                    </v-icon>
                  </v-text-field>
                </v-flex>
                <v-btn slot="append" dark large href="/#/search">搜索</v-btn>
              </v-layout>
            </v-card-text>
            <br>
          </v-card>
        </v-col>

        <v-col>
          <v-row>
            <v-col md="6" sm="12" xs="6" cols="12">
              <v-card>
                <v-card-title><v-icon class="mx-1">mdi-hand-clap</v-icon> GKD！朕要上手！</v-card-title>
                <v-card-text>
                  天啊！您试图参与我们开发的速度简直就像一位<b>身经百战的急急国王！</b>我们竭诚欢迎您加入我们的开发。或者<b>干脆地把我们的代码拿走</b>。
                  <v-card elevation="0" outlined class="striped-bg my-1">
                    <v-layout>
                      <v-col>
                        <v-btn class="mx-1 frosted" outlined elevation large v-for="repo in code_repo" :key="repo.name"
                          :href="repo.url">
                          <v-icon left dark>{{ repo.icon }}</v-icon>
                          {{ repo.name }}
                        </v-btn>
                      </v-col>
                    </v-layout>
                    <v-card-text>我们致力于维持Eyling
                      GalgameWiki基础设施的开源开放，但是，受限于代码编写水平，有一些代码我们将<b>不得不充分优化后放出</b>，所以，有一些代码仓库无法访问，但是——这些代码仓库是确实存在的。</v-card-text>
                  </v-card>
                  <v-divider class="my-2"></v-divider>
                  <v-card elevation outlined class="tranShadow" :href="apiDocumentationURL" target="_blank">
                    <div class="center">
                      <v-card-title><v-icon large class="mx-1">mdi-code-tags</v-icon>API文档</v-card-title>
                      <v-card-text class="center">基于本站的labelCORE API的开发用文档</v-card-text>
                    </div>
                  </v-card>
                  <v-btn block large outlined elevation class="my-2">申请成为本站管理员</v-btn>
                </v-card-text>
              </v-card>
            </v-col>
            <v-col md="6" sm="12" xs="6" cols="12">
              <v-card>
                <v-card-title><v-icon class="mx-1">mdi-code-brackets</v-icon>开始label开发</v-card-title>
                <v-card-text>
                  目前，我们的label的执行程序对于用户提供的代码有风险，对于攻击者来说，这相当于直接给他们在页面上执行任意javascript代码的机会，当我们解决任意javascript代码执行的问题后，将向用户开放安全的编辑区域。
                  <v-card elevation outlined class="tranShadow my-2" v-for="item in cards" :key="item.name"
                    :href="item.url">
                    <div class="center">
                      <v-card-title><v-icon large class="mx-1">{{ item.icon }}</v-icon>{{ item.title }}</v-card-title>
                      <v-card-text class="center"><i>{{ item.text }}</i></v-card-text>
                    </div>
                  </v-card>
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>
        </v-col>

        <v-col cols="12">
          <v-card class="my-2">
            <v-card-title>统计数据</v-card-title>
            <v-card-text>
              <v-container fluid wrap>
                <v-row>
                  <v-col lg="4" md="4" cols="12">
                    <v-card outlined elevation>
                      <v-card-title>Label数量</v-card-title>
                      <v-card-text class="bender largeText" style="font-size: 30px">{{
                        statics_data.label_num.toLocaleString()
                      }}</v-card-text><br>
                    </v-card>
                  </v-col>
                  <v-col lg="4" md="4" cols="12">
                    <v-card outlined elevation>
                      <v-card-title>API调用次数</v-card-title>
                      <v-card-text class="bender largeText" style="font-size: 30px">{{
                        statics_data.api_calls.toLocaleString()
                      }}</v-card-text><br>
                    </v-card>
                  </v-col>
                  <v-col lg="4" md="4" cols="12">
                    <v-card outlined elevation>
                      <v-card-title>Label提交次数</v-card-title>
                      <v-card-text class="bender largeText" style="font-size: 30px">{{
                        statics_data.label_pr.toLocaleString()
                      }}</v-card-text><br>
                    </v-card>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>
          </v-card>
        </v-col>

        <v-card elevation outlined class="normalShadow">
          <v-card-title>Label总览
          </v-card-title>
          <v-container wrap fluid>
            <v-row>
              <v-col md="6" sm="12" xs="6">
                <v-card>
                  <v-card-title><v-icon class="mx-1">mdi-information-outline</v-icon>信息与告示</v-card-title>
                  <v-card-text>
                    <v-card elevation="0" outlined class="striped-bg-warn my-1">
                      <v-card-title class="bender"><v-icon
                          class="mx-1">mdi-alert-outline</v-icon>ANNOUNCEMENT</v-card-title>
                      <v-card-text style="color: black">
                        一般信息类模板都会被<b>大规模使用</b>，盲目地修改会造成各种问题，故遇到问题需要修改时，建议在群组内进行公开讨论。
                        <v-btn block large outlined elevation text
                          class="my-2"><v-icon>mdi-account-group-outline</v-icon>进入讨论页</v-btn>
                      </v-card-text>
                    </v-card>
                    <v-divider class="my-2"></v-divider>
                    <div style="color: black">
                      <ul>
                        <li>页面告示</li>
                        <li>条目信息</li>
                      </ul>
                    </div>
                    <v-btn block large outlined elevation
                      class="my-2"><v-icon>mdi-package-variant</v-icon>查看衍生模板</v-btn>
                  </v-card-text>
                </v-card>
              </v-col>
              <v-col md="6" sm="12" xs="6">
                <v-card>
                  <v-card-title><v-icon class="mx-1">mdi-tools</v-icon>页面与操作</v-card-title>
                  <v-card-text style="color:black">
                    <ul>
                      <li>页面问题报告</li>
                      <li>挂删</li>
                    </ul>
                    <v-btn block large outlined elevation
                      class="my-2"><v-icon>mdi-package-variant</v-icon>查看衍生模板</v-btn>
                  </v-card-text>
                </v-card>
              </v-col>
            </v-row>
          </v-container>
          <br>
        </v-card>
      </div>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'mainText',

  data: () => ({
    stati_data: {
      'totalSize': '1.0',
      'labelNum': '2'
    },
    code_repo: [
      {
        name: 'label执行器',
        icon: 'mdi-jquery',
        url: 'https://github.com/White-NX/chocolate'
      },
      {
        name: 'EGW Label后端',
        icon: 'mdi-server',
        url: 'https://github.com/White-NX/labelbackend',
      },
      {
        name: '本站源代码',
        icon: 'mdi-vuetify',
        url: 'https://github.com/White-NX/labeleditor'
      }
    ],
    apiDocumentationURL: '/docs/RosmontisAPI2.0.html',
    cards: [
      {
        title: '新建label',
        icon: 'mdi-lightbulb-on-outline',
        text: '我有个好点子！',
        url: '#'
      },
      {
        title: '测试场',
        icon: 'mdi-test-tube',
        text: '让我逝世！',
        url: '#'
      },
      {
        title: '汇报问题',
        icon: 'mdi-bug',
        text: '你写的这是什么bug？',
        url: '#'
      }
    ],
    statics_data: {
      label_num: 1145141919,
      api_calls: 1919810,
      label_pr: 9810

    }
  })
}
</script>

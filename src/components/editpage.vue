<template>
  <v-col class="pageMain">

    <v-overlay :value="loadingOverlay" z-index="10">
      <v-card color="primary" dark width="320">
        <v-card-text>
          请稍等……
          <v-progress-linear indeterminate color="white" class="mb-0"></v-progress-linear>
        </v-card-text>
      </v-card>
    </v-overlay>

    <v-dialog v-model="errorDialog" persistent max-width="320">
      <v-card>
        <v-card-title class="text-h5">
          <v-icon>mdi-alert-octagon</v-icon> 工口发生
        </v-card-title>
        <v-card-text>
          在加载模板文件时出现问题：{{ errorMSG }}
        </v-card-text>
        <v-card-text>
          <v-btn block color="primary" outlined @click="refreshPage">刷新并重试</v-btn>
        </v-card-text>
        <v-card-actions>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-snackbar v-model="snackbar" timeout="4000" text :color="snackbarColor">
      {{ snackbarText }}

      <template v-slot:action="{ attrs }">
        <v-btn color="primary" text v-bind="attrs" @click="snackbar = false">
          Close
        </v-btn>
      </template>
    </v-snackbar>

    <v-tabs color="primary" v-model="tab">
      <v-tab v-for="(tab, index) in tabs" :key="index" @click="setTab(index)">
        <v-icon>{{ tab.icon }}</v-icon>{{ tab.text }}
      </v-tab>
    </v-tabs>

    <v-divider></v-divider>

    <v-layout wrap class="my-2">
      <v-flex lg8 xs12>
        <h1>编辑中：<b>{{ labelInfo.name }} / {{ this.files[this.selectedFile].name }}</b></h1>
        <v-divider></v-divider>
        <v-expansion-panels>
          <v-expansion-panel>
            <v-expansion-panel-header>
              页面焦点
            </v-expansion-panel-header>
            <v-expansion-panel-content>
              <v-alert outlined type="warning" text>
                <h3>你正在编辑并非你创建的label</h3>
                一些意外修改可能会造成问题，请确保在明确此次改动的目的和方式基础上进行修改。
              </v-alert>
              <v-alert outlined type="info" text v-if="labelInfo.uniUse == true">
                <h3>{{ labelInfo.name }}被标记为强泛用性</h3>
                这意味着该模板被广泛使用，稳定性和实用性已经被确认，无需大规模更改。
              </v-alert>
              <v-alert outlined type="info" text v-if="labelInfo.isLock == true">
                <h3>{{ labelInfo.name }}正在被他人(username)编辑</h3>
                如果你执意进行编辑可能会造成编辑冲突，如果你有编辑需要，可以将编辑请求告知此时的编辑人员或者等待对方编辑完毕。
              </v-alert>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
        <br />
        <monaco :codes="content" :current="current" v-if="current != undefined" :language="lang"
          v-on:update:contentBody="handleUpdateContentBody"></monaco>
      </v-flex>

      <v-flex lg4 xs12>
        <v-col class="rightSideBar">
          <v-card elevation="0" outlined class="my-4">
            <v-card-title>关于</v-card-title>
            <v-card-text style="font-size:12pt; color:black">
              <v-chip color="indigo" text-color="white" small class="my-1">
                <v-avatar left>
                  <v-icon>mdi-account-circle</v-icon>
                </v-avatar>
                {{ labelDetails.author }}
              </v-chip><br />
              {{ labelDetails.description }}
            </v-card-text>
          </v-card>
          <v-card elevation="0" outlined class="my-4">
            <template slot="progress">
              <v-progress-linear color="deep-purple" height="10" indeterminate></v-progress-linear>
            </template>
            <v-card-title>文件列表</v-card-title>
            <v-card-text>
              <v-btn-toggle dense>
                <v-btn @click="doAddingFile = !doAddingFile">
                  <v-icon>mdi-file-plus</v-icon>
                  新建文件
                </v-btn>
                <v-dialog v-model="doDeletingFile" persistent max-width="320">
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn depressed v-bind="attrs" v-on="on">
                      <v-icon>mdi-delete</v-icon>删除文件
                    </v-btn>
                  </template>
                  <v-card>
                    <v-card-title class="text-h5">
                      删除文件确认
                    </v-card-title>
                    <v-card-text>你确认删除{{ this.files[this.selectedFile].name }}吗？此次操作<b>将在修改提交后进行。</b></v-card-text>
                    <v-card-text>
                      <v-btn block color="error" outlined @click="deleteLabelFile">删除</v-btn><br>
                      <v-btn block color="success" outlined @click="doDeletingFile = false">还是算了</v-btn>
                    </v-card-text>
                    <v-card-actions>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
              </v-btn-toggle>
              <v-card elevation="0" outlined class="my-1" v-if="doAddingFile">
                <v-card-text>新建文件：
                  <v-text-field label="文件名称" hide-details="auto" :rules="fileNameRules" @input="checkFileName"
                    ref="fileName" v-model.trim="fileName"></v-text-field>
                  <v-row class="my-1">
                    <v-col cols="6" xs="12">
                      <v-btn outlined block color="primary" @click="doAddingFile = false;">取消</v-btn>
                    </v-col>
                    <v-col cols="6" xs="12">
                      <v-btn outlined block color="success" @click="addFile" :disabled="isFileNameVaild">确定</v-btn>
                    </v-col>
                  </v-row>
                </v-card-text>
              </v-card>
              <v-list dense>
                <v-list-item-group v-model="selectedFile" color="primary">
                  <v-list-item v-for="(item, i) in files" :key="i">
                    <v-list-item-content>
                      <v-list-item-title v-text="item.name"></v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                </v-list-item-group>
              </v-list>
            </v-card-text>
          </v-card>
          <v-card elevation="0" outlined>
            <template slot="progress">
              <v-progress-linear color="deep-purple" height="10" indeterminate></v-progress-linear>
            </template>
            <v-card-title>{{ labelInfo.name }} 操作</v-card-title>
            <v-card-text>
              <h3>操作</h3><br>
              <template style="color:black">
                <v-col id="label_action">
                  <v-layout wrap>
                    <v-flex lg8 xs12>
                      <b>删除此label</b><br>这样做会失去这个label
                    </v-flex>
                    <v-flex lg4 xs12>
                      <v-dialog v-model="deletedialog" persistent max-width="320">
                        <template v-slot:activator="{ on, attrs }">
                          <v-btn depressed color="error" v-bind="attrs" v-on="on">
                            删除label
                          </v-btn>
                        </template>
                        <v-card>
                          <v-card-title class="text-h5">
                            删除Label
                          </v-card-title>
                          <v-alert prominent type="error">
                            <v-row align="center">
                              <v-col class="grow">
                                如果您不仔细阅读对话框内的文字可能会造成严重后果！
                              </v-col>
                            </v-row>
                          </v-alert>
                          <v-card-text>本次操作将<b>难以被撤销</b>，该Label的一切源代码将会被删除。<br>如果您知晓了此风险，请在下方输入：
                            <code>delete:{{ labelInfo.name }}</code></v-card-text>
                          <v-card-text>
                            <v-text-field hide-details="auto" v-model="declaration"
                              v-on:input="isDeclarationMatch"></v-text-field><br>
                            <v-btn block color="error" outlined :disabled="!declarationMatch">行动吧！</v-btn><br>
                            <v-btn block color="success" outlined @click="deletedialog = false">还是算了</v-btn>
                          </v-card-text>
                          <v-card-actions>
                          </v-card-actions>
                        </v-card>
                      </v-dialog>
                    </v-flex>
                  </v-layout>
                  <br><v-divider></v-divider><br>
                  <v-layout wrap>
                    <v-flex lg8 xs12>
                      <b>提交label</b><br>将此次修改作为更新进行提交
                    </v-flex>
                    <v-flex lg4 xs12>
                      <v-dialog v-model="prLabelDialog" persistent max-width="320">
                        <template v-slot:activator="{ on, attrs }">
                          <v-btn depressed color="success" v-bind="attrs" v-on="on" @click="labelChanged">
                            提交label
                          </v-btn>
                        </template>
                        <v-card>
                          <v-card-title class="text-h5">
                            提交
                          </v-card-title>
                          <v-card-text>你将要提交以下修改：<br /><br />

                            <b>删除：</b><br />
                            <ul>
                              <li v-for="(item, i) in compareChange.deleted" :key="i">{{ item.name }}</li>
                            </ul><br />
                            <b>新增：</b><br />
                            <ul>
                              <li v-for="(item, i) in compareChange.added" :key="i">{{ item.name }}</li>
                            </ul>
                          </v-card-text>
                          <v-card-text>
                            <v-btn block color="primary" outlined @click="update">提交</v-btn><br>
                            <v-btn block color="success" outlined @click="prLabelDialog = false">还是算了</v-btn>
                          </v-card-text>
                          <v-card-actions>
                          </v-card-actions>
                        </v-card>
                      </v-dialog>
                    </v-flex>
                  </v-layout>
                  <br><v-divider></v-divider><br>
                  <v-layout wrap>
                    <v-flex lg8 xs12>
                      <b>锁定label</b><br>锁定此label以防止编辑冲突
                    </v-flex>
                    <v-flex lg4 xs12>
                      <v-btn depressed color="warning">
                        锁定label
                      </v-btn>
                    </v-flex>
                  </v-layout>
                </v-col>
              </template>
            </v-card-text>
          </v-card>
        </v-col>
      </v-flex>
    </v-layout>
    <v-card class="my-4 striped-bg">
      <v-card-title class="bender"><v-icon large>mdi-file-document-outline</v-icon>文档 | DOCUMENTATION</v-card-title>
      <v-card-text>
        <v-card elevation="0" outlined>
          <v-card-text style="font-size:12pt; color:black" v-html="documentation">
          </v-card-text>
        </v-card>
        <v-card class="my-2" elevation="0" outlined>
          <v-card-title class="bender"><v-icon large>mdi-scale-balance</v-icon>LICENSE</v-card-title>
          <v-card-text>
            如<b>无特别声明（如在label的核心文件{js、css等}、文档文件{README.md等}等文件内明确表明的声明）</b>，此label将遵循GNU General Public License
            v3.0协议进行开源。
          </v-card-text>
        </v-card>
      </v-card-text>
    </v-card>
  </v-col>
</template>

<script>
import axios from 'axios'

function getFileType(fileName) {
  const extension = fileName.split('.').pop()
  switch (extension) {
    case 'js':
      return 'javascript'
    case 'css':
      return 'css'
    case 'md':
      return 'markdown'
    case 'json':
      return 'json'
    default:
      return 'text'
  }
}

function showSnackBar(that, content, color = 'success') {

  that.snackbarColor = color
  that.snackbarText = content
  that.snackbar = true

}

export default {
  name: 'editpage',
  data: () => ({
    dialog: false,
    deletedialog: false,
    PICdialog: false,
    doDeletingFile: false,
    prLabelDialog: false,
    errorDialog: false,

    errorMSG: '',

    tab: 0,
    tabs: [
      {
        icon: 'mdi-code-brackets',
        text: '编辑',
      },
      {
        icon: 'mdi-source-pull',
        text: '修改记录'
      },
      {
        icon: 'mdi-bug',
        text: '问题'
      },
      {
        icon: 'mdi-cog',
        text: '设置'
      }
    ],
    labelDetails: {
      description: '',
      author: '',
    },

    snackbar: false,
    snackbarText: '',
    snackbarColor: 'primary',

    loadingOverlay: false,

    current: 0,
    content: '',
    lang: 'javascript',

    declaration: '',
    declarationMatch: false,
    declarationM: '',

    selectedFile: 0,
    files: [
      { name: '加载中……' },
    ],


    labelInfo: {
      name: '',
      size: 100,
      PIC: '',
      uniUse: true,
      isLock: true
    },

    documentation: '<i>文档正在加载……</i>',

    doAddingFile: false,

    fileName: '',

    compareChange: {
      deleted: '',
      added: ''
    },

    fileNameRules: [
      value => {
        if (!value) return false

        const regex = /^[^\\/:*?"<>|]+$/
        const windowsKeywords = ['CON', 'PRN', 'AUX', 'NUL', 'COM1', 'COM2', 'COM3', 'COM4', 'COM5', 'COM6', 'COM7', 'COM8', 'COM9', 'LPT1', 'LPT2', 'LPT3', 'LPT4', 'LPT5', 'LPT6', 'LPT7', 'LPT8', 'LPT9']

        if (!regex.test(value)) return '不符合文件名规则，请勿输入特殊字符。'
        if (windowsKeywords.includes(value.toUpperCase())) return '文件名不能是系统关键字'
        if (value.length > 30) return '文件名不能超过30个字符'

        var files = JSON.parse(sessionStorage.getItem('files'))
        for (var i = 0; i < files.length; i++) {

          if (value == files[i].name) {
            return '此文件已存在。'
          }

        }

        return true
      }
    ],
    isFileNameVaild: true

  }),
  methods: {
    checkFileName() {

      this.isFileNameVaild = !this.$refs.fileName.validate()

    },

    refreshPage() {

      window.location.reload();

    },

    setTab(index) {

      this.tab = index;

    },

    isDeclarationMatch() {
      console.log(this.declaration)

      if (this.declaration == 'delete:' + this.labelInfo.name) {

        this.declarationMatch = true

      } else {

        this.declarationMatch = false

      }
    },

    handleUpdateContentBody(contents) {

      sessionStorage.setItem(this.files[this.selectedFile].name, contents)

    },

    deleteLabelFile() {

      this.doDeletingFile = false

      var fileName = this.files[this.selectedFile].name

      if (fileName == 'config.json') {

        this.loadingOverlay = false
        showSnackBar(this, '错误：配置文件不可删除', 'error')
        return

      }

      var files = JSON.parse(sessionStorage.getItem('files'))
      files = files.filter(f => f.name != fileName)

      this.files = files
      this.selectedFile--
      sessionStorage.setItem('files', JSON.stringify(files))

      showSnackBar(this, '文件在此次修改提交后将被删除。', 'success')

    },

    addFile() {

      this.doAddingFile = false

      var files = JSON.parse(sessionStorage.getItem('files'))
      files.push({
        name: this.fileName,
        type: 'file'
      })
      this.files = files;
      sessionStorage.setItem('files', JSON.stringify(files))

      sessionStorage.setItem(this.fileName, '');

      showSnackBar(this, this.fileName + '将在此次修改提交后将被创建。', 'success')

      this.fileName = ''

    },

    labelChanged() {

      //文件增删
      const origin = JSON.parse(sessionStorage.getItem('files_bak'))
      const changed = JSON.parse(sessionStorage.getItem('files'))

      this.compareChange.deleted = origin.filter(item => !changed.some(c => c.name === item.name))
      this.compareChange.added = changed.filter(item => !origin.some(o => o.name === item.name))

    },

    update() {

      const label = this.$route.params.content

      for (var i = 0; i < this.files.length; i++) {

        var updatedFileName = this.files[i].name
        var updatedFile = sessionStorage.getItem(updatedFileName)

        if (updatedFile != null) {

          axios
            .post(`${this.$globalApiURL}/label?type=labelAction&name=${label}&fileName=${updatedFileName}`, 
            updatedFile,
            {
              withCredentials: true
            })
            .then((res) => {

              if (res.data.errorCode == 200) {

                console.log('Successfully updated file' + updatedFileName)

              } else {

                throw new Error(res.data.errorCode)

              }

            })
            .catch((error) => {

              if (error == 401) {

                showSnackBar(this, '登录无效', 'error')

              } else {

                showSnackBar(this, '提交失败，错误代码：' + error, 'error')

              }

            })

        }

      }

    }


  },
  mounted() {

    this.loadingOverlay = true;

    //请求API获取页面内容
    const label = this.$route.params.content
    this.labelInfo.name = label

    if (typeof label == 'undefined' || label == '') {

      window.location.href = '/#/search'
      this.documentation = '<b>错误：没有指定label。</b>'

      return

    }

    axios
      .get(`${this.$globalApiURL}/label?type=getLabelTree&name=${label}`)
      .then((res) => {

        this.files = res.data.data.children

        sessionStorage.setItem('files', JSON.stringify(this.files))
        sessionStorage.setItem('files_bak', JSON.stringify(this.files))

        this.loadingOverlay = false

      })
      .catch((error) => {

        if (error instanceof TypeError && error.message.includes('children')) { //没有输出正确的数据格式，一般就是404

          this.errorMSG = '找不到label.'

        } else {

          this.errorMSG = error

        }

        this.errorDialog = true
        this.loadingOverlay = false
      })

    axios
      .get(`${this.$globalApiURL}/label?type=labelAction&name=${label}&fileName=README.md`)
      .then((res) => {

        if (typeof res.data.errorCode != 'undefined') {
          this.documentation = '<b>此label没有文档文件。</b>'
          return
        }

        this.documentation = res.data
      })
      .catch((error) => {

        this.documentation = '<b>文档加载失败。</b><br>错误信息：' + error
        showSnackBar(this, '文档加载失败。' + error, 'error')

      })



    axios
      .get(`${this.$globalApiURL}/label?type=labelAction&name=${label}&fileName=config.json`)
      .then((res) => {

        this.lang = 'json'
        this.content = JSON.stringify(res.data)
        this.current++

        this.labelDetails.author = res.data.author
        this.labelDetails.description = res.data.description

      })
      .catch((error) => {

        showSnackBar(this, '模板加载失败。' + error, 'error');

      })
  },
  watch: {
    selectedFile: function () {
      const label = this.$route.params.content

      var sessionContents = sessionStorage.getItem(this.files[this.selectedFile].name)

      if (sessionContents != null) {

        this.lang = getFileType(this.files[this.selectedFile].name)
        this.content = sessionContents
        this.current++

        return

      }

      axios
        .get(`${this.$globalApiURL}/label?type=labelAction&name=${label}&fileName=${this.files[this.selectedFile].name}&source=true`)
        .then((res) => {

          if (
            typeof res.data != 'string' &&
            typeof res.data != 'undefined' &&
            typeof res.data != 'object'
          ) {

            res.data = res.data.toString()

          }

          this.lang = getFileType(this.files[this.selectedFile].name)
          if (this.lang == 'json') {

            this.content = JSON.stringify(res.data)

          } else {

            this.content = res.data

          }

          this.current++

        })
        .catch((error) => (this.content = `console.error('An error occurred. Error message: ${error}')`))

    }
  }
}

function compareChange() {

  const origin = JSON.parse(sessionStorage.getItem('files_bak'))
  const changed = JSON.parse(sessionStorage.getItem('files'))

  const deleted = origin.filter(item => !changed.some(c => c.name === item.name));
  const added = changed.filter(item => !origin.some(o => o.name === item.name));

  return {
    deleted: deleted,
    added: added
  }

}
</script>
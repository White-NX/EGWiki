const { defineConfig } = require('@vue/cli-service')
const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin')

module.exports = defineConfig({
  transpileDependencies: [
    'vuetify'
  ],
  lintOnSave: false,
  configureWebpack: {
    plugins: [
      new MonacoWebpackPlugin()
    ]
  },
})

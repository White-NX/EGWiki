import Vue from 'vue'

const throwError = {

  install(Vue) {

    Vue.prototype.$throwError = function (node, operation, error) {

      this.$nextTick(() => {

        this.$dataBus.$emit('throwError', { node, operation, error })

      })

    }

  }

}

Vue.use(throwError)

export default throwError
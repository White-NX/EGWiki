import Monaco from './editor.vue';

export default{
  install: function(Vue, options){
    Vue.component('monaco', Monaco)
  }
}
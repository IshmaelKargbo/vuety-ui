import Vue from 'vue'
import App from './App.vue'
import './assets/tailwind.css';
import vco from 'v-click-outside';

import Select from './components/Select.vue';
import Option from './components/Option.vue';

Vue.use(vco);
Vue.config.productionTip = false;


export default {
  install(Vue: any) {
    Vue.component('we-select', Select)
    Vue.component('we-option', Option)
  }
}


new Vue({
  render: h => h(App)
}).$mount('#app')

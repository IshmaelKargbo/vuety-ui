import Vue from 'vue'
import App from './App.vue'
import './assets/tailwind.css';
import vco from 'v-click-outside';

import Select from './components/Select.vue';
import Option from './components/Option.vue';
import Input from './components/Input.vue';
import InputTag from './components/InputTag.vue';
import Datepicker from './components/Datepicker.vue';
import Radio from './components/Radio.vue';
import Switch from './components/Switch.vue';
import Label from './components/Label.vue';

Vue.use(vco);
Vue.config.productionTip = false;


export default {
  install(Vue: any) {
    Vue.component('vuety-select', Select)
    Vue.component('vuety-option', Option)
    Vue.component('vuety-input', Input)
    Vue.component('vuety-input-tag', InputTag)
    Vue.component('vuety-datepicker', Datepicker)
    Vue.component('vuety-switch', Switch)
    Vue.component('vuety-radio', Radio)
    Vue.component('vuety-label', Label)
  }
}

new Vue({
  render: h => h(App)
}).$mount('#app')

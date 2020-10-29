<template>
  <div id="app" class="p-10 bg-gray-200">
    <select-vue placeholder="Testing" error="Yaa">
      <option-vue value="c1">Sierra leone</option-vue>
      <option-vue value="c2">Ghana</option-vue>
      <option-vue value="c3">Togo</option-vue>
    </select-vue>
    <input-vue placeholder="Enter email" error="Weee" />
    <datepicker-vue placeholder="Enter email" error="Weee" />
    <radio-vue name="gender" value="Male" error="false" :checked="true">Male</radio-vue>
    <radio-vue name="gender" value="Female">Female</radio-vue>
    <switch-vue />
  </div>
</template>

<script>
import DatepickerVue from "./components/Datepicker.vue";
import InputVue from "./components/Input.vue";
import OptionVue from "./components/Option.vue";
import RadioVue from './components/Radio.vue';
import SelectVue from "./components/Select.vue";
import SwitchVue from './components/Switch.vue';

export default {
  data() {
    return {
      select: ["c1", "c2"],
    };
  },
  components: {
    SelectVue,
    OptionVue,
    InputVue,
    DatepickerVue,
    RadioVue,
    SwitchVue
  },
};
</script>

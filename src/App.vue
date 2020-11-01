<template>
  <div id="app" class="p-10 bg-gray-200">
    <select-vue placeholder="Testing" error="Yaa" v-model="country">
      <option-vue value="Sierra Leone">Sierra Leone</option-vue>
      <option-vue value="Ghana">Ghana</option-vue>
      <option-vue value="Togo">Togo</option-vue>
    </select-vue>
    <input-vue placeholder="Enter email" error="Weee" />
    <datepicker-vue placeholder="Enter email" error="Weee" />
    <radio-vue name="gender" value="Male" :checked="true">Male</radio-vue>
    <radio-vue name="gender" value="Female">Female</radio-vue>
    <label-vue required>Testing</label-vue>
    <switch-vue />
    <input-tag-vue tag="+232" error="Hello" />
  </div>
</template>

<script>
import DatepickerVue from "./components/Datepicker.vue";
import InputVue from "./components/Input.vue";
import InputTagVue from "./components/InputTag.vue";
import LabelVue from "./components/Label.vue";
import OptionVue from "./components/Option.vue";
import RadioVue from "./components/Radio.vue";
import SelectVue from "./components/Select.vue";
import SwitchVue from "./components/Switch.vue";

export default {
  data() {
    return {
      country: "",
    };
  },
  components: {
    SelectVue,
    OptionVue,
    InputVue,
    DatepickerVue,
    RadioVue,
    SwitchVue,
    LabelVue,
    InputTagVue,
  },
};
</script>

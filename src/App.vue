<template>
  <div id="app" class="p-10 bg-gray-200">
    <select-vue multiple error="Please select option">
      <option-vue value="c1">Sierra leone</option-vue>
      <option-vue value="c2">Ghana</option-vue>
      <option-vue value="c3">Togo</option-vue>
    </select-vue>
  </div>
</template>

<script>
import OptionVue from "./components/Option.vue";
import SelectVue from "./components/Select.vue";

export default {
  data() {
    return {
      select: ["c1", "c2"],
    };
  },
  components: {
    SelectVue,
    OptionVue,
  },
};
</script>

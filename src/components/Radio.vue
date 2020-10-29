<template>
  <div id="radio">
    <input
      :id="value"
      :checked="checked"
      type="radio"
      @click="click(value)"
      :name="name"
      class="hidden"
    />
    <label
      :for="value"
      :class="{ 'text-red-700': error }"
      class="flex items-center cursor-pointer"
    >
      <span
        :class="[{ 'border-red-700': error }]"
        class="w-4 h-4 inline-block mr-2 border bg-white rounded-full"
      ></span>
      <p><slot></slot></p>
    </label>
  </div>
</template>

<script>
export default {
  props: {
    name: { type: String, required: true },
    checked: { default: false },
    value: { type: String, required: true },
    error: { type: Boolean, default: false },
  },
  methods: {
    click(value) {
      this.$emit("change", value);
    },
  },
};
</script>

<style>
#radio input[type="radio"] + label span {
  transition: background 0.2s, transform 0.2s;
}

#radio input[type="radio"]:checked + label span {
  background-color: #0099e8;
  border: 1px;
  box-shadow: 0px 0px 0px 3px white inset;
}
</style>
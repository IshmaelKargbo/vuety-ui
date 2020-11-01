<template>
  <div>
    <div class="text-gray-800">
      <div class="flex">
        <p><slot></slot></p>
        <span class="text-red-500 font-semibold" v-show="required">*</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    required: Boolean,
  },
};
</script>
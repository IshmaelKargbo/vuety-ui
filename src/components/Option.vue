<template>
  <li
    class="border-b cursor-pointer px-3 py-2 font-normal hover:bg-gray-100 focus:bg-gray-200 focus:outline-none"
  >
    <input type="hidden" :value="value" />
    <p><slot></slot></p>
  </li>
</template>

<script>
export default {
  props: ["value"],
};
</script>
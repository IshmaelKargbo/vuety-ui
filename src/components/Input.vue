<template>
  <div>
    <div
      class="p-3 flex rounded-md border bg-gray-100 items-center"
      :class="{ 'border-red-500': error }"
    >
      <input
        :type="type"
        class="bg-transparent focus:outline-none w-full"
        :placeholder="placeholder"
        @input="input"
        @keyup="keyup"
        :min="min"
        :value="value"
      />
    </div>
    <!-- Select - Error -->
    <p v-if="eMessage" class="text-red-500 text-sm pt-1 pl-1">
      {{ error }}
    </p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      eMessage: false,
    };
  },
  props: {
    error: {
      default: "",
    },
    type: {
      default: "text",
    },
    value: {
      default: "",
    },
    placeholder: {
      default: "",
    },
    min: {
      default: 0,
    },
  },
  methods: {
    input({ target }) {
      this.$emit("input", target.value);
    },
    keyup({ target }) {
      this.$emit("keyup", target.value);
    },
    errorHandler() {
      if (this.error) {
        this.eMessage = true;

        setTimeout(() => {
          this.eMessage = false;
        }, 5000);
      }
    },
  },
  mounted() {
    if (this.error) {
      this.errorHandler();
    }
  },
  watch: {
    error(data) {
      if (data) {
        this.errorHandler();
      }
    },
  },
};
</script>
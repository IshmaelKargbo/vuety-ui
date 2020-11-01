<template>
  <div>
    <div
      :class="{ 'border-red-500': error }"
      class="border rounded-md flex focus:outline-none p-2 bg-white"
    >
      <p
        v-if="tag"
        class="border-r pr-2 mr-2"
        :class="{ 'border-red-600': error }"
      >
        {{ tag }}
      </p>
      <input
        type="text"
        :id="inputId"
        class="w-full focus:outline-none bg-transparent placeholder-gray-500"
        :value="value"
        autocomplete="off"
        @input="input"
        :placeholder="placeholder"
      />
    </div>
    <p v-if="eMessage" class="text-red-500 text-sm pt-1 pl-1">
      {{ error }}
    </p>
  </div>
</template>

<script>
export default {
  props: {
    placeholder: String,
    error: {
      default: "",
    },
    value: String,
    tag: String,
  },
  methods: {
    input({ target }) {
      this.$emit("input", target.value);
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
  data() {
    return {
      inputId: `_${Math.random().toString(36).substr(2, 9)}`,
      eMessage: false,
    };
  },
  mounted() {
    if (this.error) {
      this.errorHandler();
    }
  },
  watch: {
    tag(f) {
      if (f) {
        document.querySelector(`#${this.inputId}`).focus();
      }
    },
    error(data) {
      if (data) {
        this.errorHandler();
      }
    },
  },
};
</script>

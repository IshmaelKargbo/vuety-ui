<template>
  <div>
    <input
      type="checkbox"
      :disabled="disabled"
      @change="update"
      :checked="value"
      class="iu-switch appearance-none relative bg-white focus:outline-none rounded-full shadow-inner border"
    />
  </div>
</template>

<script>
export default {
  props: {
    value: Boolean,
    disabled: Boolean
  },
  methods: {
    update({ target }) {
      this.$emit('input', target.checked)
      this.$emit('change', target.checked)
    },
  },
}
</script>
<style>
.iu-switch:checked {
  background: #0099e8;
}

.iu-switch {
  width: 30px;
  height: 15px;
}

.iu-switch::before {
  content: '';
  position: absolute;
  width: 15px;
  height: 15px;
  border-radius: 20px;
  left: 0;
  background: white;
  transform: scale(1.1);
  margin-top: -2px;
  transition: 0.5s;
  box-shadow: 0 2px 5px #003e6c;
  top: 0;
}

.iu-switch:checked::before {
  left: 15px;
}
</style>
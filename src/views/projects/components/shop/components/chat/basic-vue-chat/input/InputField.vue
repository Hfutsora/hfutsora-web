<template>
  <div class="input__field">
    <input
      :value="value"
      type="text"
      name="message"
      class="input"
      v-focus="focusState"
      @blur="$emit('blur-focus:update', false)"
      @input="$emit('input', $event.target.value)"><br>
  </div>
</template>

<script>
export default {
  name: 'InputField',
  props: {
    value: {
      type: String,
      default: '',
      required: false,
    },
    focusState: {
      type: Boolean,
      default: true,
    },
  },
  directives: {
    focus: {
    // 指令的定义
      inserted(el) {
        el.focus();
      },
      update(el, { value }) {
        if (value) {
          el.focus();
        }
      },
    },
  },
  created() {
    document.onkeypress = (e) => {
      const keycode = document.all ? event.keyCode : e.which;
      if (keycode === 13 && this.$route.name === 'ServicerChat') {
        this.$emit('newOwnMessage');
      }
    };
  },
  methods: {
    send(event) {
      this.$emit('newOwnMessage', event);
    },
  },
};
</script>

<style lang="scss" scoped>
.input:focus {
  outline: 1px solid red;
}
</style>

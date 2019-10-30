<template>
  <div>
    <label for="input" class="label">
      <slot name="label"></slot>
    </label>
    <div class="input-area">
      <slot name="head-icon"></slot>
      <input
        :type="type"
        id="input"
        :value="value"
        :placeholder="placeholder"
        class="input"
        @input="$emit('input', $event.target.value)" />
      <slot name="tail-icon"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'InputComponent',
  props: {
    value: {
      type: String,
      default: '',
    },
    placeholder: {
      type: String,
      default: '请输入',
    },
    type: {
      type: String,
      default: 'text',
    },
  },
};
</script>

<style lang="scss" scoped>
.label {
  font-size: 14px;
  font-family: "Microsoft YaHei";
  color: rgb(58, 175, 159);
}
.input-area {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid rgb(221, 221, 221);
}
.input {
  border: none;
  color: #555555;
  font-size: 14px;
  width: 100%;
  padding: 13px 1rem;
}
</style>
